'use client';

import React, { useState, useEffect } from "react";
import useSWR from "swr";
import TodoItem from '@/components/features/TodoItem';
import AddTodoForm from '@/components/features/AddTodoForm';
import ErrorMessage from "@/components/ui/ErrorMessage";
import Button from "@/components/ui/Button";
import Image from 'next/image';
import Link from "next/link";
import dynamic from 'next/dynamic';

// Todoの型定義
interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

// TodoStatsコンポーネントを動的にインポート
const DynamicTodoStats = dynamic(() => import('@/components/features/TodoStats'), {
    loading: () => <p>統計情報を読み込み中...</p>,
    ssr: false // サーバーサイドレンダリングを無効化
});

// データをフェッチする関数
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const TodoList: React.FC = () => {

    // SWRでデータを取得
    const { data: todos, error, mutate } = useSWR<Todo[]>('/api/todos', fetcher);

    // 統計情報を表示するかどうかを管理
    const [showStats, setShowStats] = useState(false);

    // ローディング中の表示
    if (!todos) return <div>Loading...</div>;

    // エラーがある場合の表示
    if (error) return <ErrorMessage message={error.message} />;

    // 新しいTodoを追加する関数
    const addTodo = async (title: string) => {
        try {
            const response = await fetch('/api/todos', {
                method: 'POST', // POSTメソッドでリクエスト
                headers: {
                    'Content-Type': 'application/json', // JSON形式で送信
                },
                body: JSON.stringify({ title }), // リクエストボディにタイトルを設定
            });
            if (!response.ok) {
                throw new Error('Todoの追加に失敗しました'); // エラーハンドリング
            }
            const newTodo = await response.json(); // レスポンスをJSONに変換
            mutate([...(todos || []), newTodo]); // 新しいTodoを状態に追加
        } catch (err) {
            console.error(err); // エラーをコンソールに出力
        }
    };

    // Todoの完了状態を切り替える関数
    const toggleTodo = async (id: number) => {
        try {
            const todoToUpdate = todos?.find(todo => todo.id === id); // 更新するTodoを検索
            if (!todoToUpdate) return;

            const response = await fetch(`/api/todos/${id}`, {
                method: 'PUT', // PUTメソッドでリクエスト
                headers: {
                    'Content-Type': 'application/json', // JSON形式で送信
                },
                body: JSON.stringify({ completed: !todoToUpdate.completed }), // 完了状態を反転して送信
            });
            if (!response.ok) {
                throw new Error('Todoの更新に失敗しました'); // エラーハンドリング
            }
            const updatedTodo = await response.json(); // レスポンスをJSONに変換
            mutate(todos?.map(todo => todo.id === id ? updatedTodo : todo)); // 更新されたTodoを状態に反映
        } catch (err) {
            console.error(err); // エラーをコンソールに出力
        }
    };

    // Todoを削除する関数
    const deleteTodo = async (id: number) => {
        try {
            const response = await fetch(`/api/todos/${id}`, {
                method: 'DELETE', // DELETEメソッドでリクエスト
            });
            if (!response.ok) {
                throw new Error('Todoの削除に失敗しました'); // エラーハンドリング
            }
            mutate(todos?.filter(todo => todo.id !== id)); // 削除されたTodoを状態から除外
        } catch (err) {
            console.error(err); // エラーをコンソールに出力
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8">
            <div className="flex items-center justify-center mb-4">
                <div className="flex items-center">
                <Image
                    src="/todo-icon.png"
                    alt="Todo Icon"
                    width={50}
                    height={50}
                    priority
                />
                <h1 className="text-2xl font-bold mb-4">Todoリスト</h1>
                </div>
                <Link href="/about" className="text-blue-500 hover:text-blue-700">
                    About
                </Link>
            </div>
            {/* Todoリスト */}
            <AddTodoForm onAdd={addTodo} />
            {/* todos配列をマップしてTodoItemコンポーネントをレンダリング */}
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id} // Reactのリスト・レンダリングには一意のkey propが必要
                    id={todo.id}
                    title={todo.title}
                    completed={todo.completed}
                    onToggle={toggleTodo} // 完了状態切り替え関数を渡す
                    onDelete={deleteTodo} // 削除関数を渡す
                />
            ))}
            {/* 統計情報を表示するボタン */}
            <Button 
                onClick={() => setShowStats(!showStats)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                {showStats ? '統計情報を隠す' : '統計情報を表示'}
            </Button>
            {showStats && (
                <DynamicTodoStats 
                    totalTodos={todos.length} 
                    completedTodos={todos.filter(todo => todo.completed).length} 
                />
            )}
        </div>
    );
};

export default TodoList;
