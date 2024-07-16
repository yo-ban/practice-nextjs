'use client';

import React, { useState } from "react";
import useSWR from "swr";
import TodoItem from '@/components/features/TodoItem';
import AddTodoForm from '@/components/features/AddTodoForm';
import ErrorMessage from "@/components/ui/ErrorMessage";
import Button from "@/components/ui/Button";
import Image from 'next/image';
import Link from "next/link";
import dynamic from 'next/dynamic';
import { motion } from "framer-motion";

// Todoの型定義
interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

// TodoStatsコンポーネントを動的にインポート
const DynamicTodoStats = dynamic(() => import('@/components/features/TodoStats'), {
    loading: () => <p className="text-gray-500 italic">統計情報を読み込み中...</p>,
    ssr: false // サーバーサイドレンダリングを無効化
});

// データをフェッチする関数
const fetcher = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error('APIリクエストに失敗しました');
    }
    return res.json();
};

const TodoList: React.FC = () => {

    // SWRでデータを取得
    const { data: todos, error, mutate } = useSWR<Todo[]>('/api/todos', fetcher);

    // 統計情報を表示するかどうかを管理
    const [showStats, setShowStats] = useState(false);

    // エラーがある場合の表示
    if (error) return <ErrorMessage message="Todoの取得中にエラーが発生しました" />;

    // ローディング中の表示
    if (!todos) return <div>Loading...</div>;

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
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg"
        >
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                    <Image
                        src="/todo-icon.png"
                        alt="Todo Icon"
                        width={40}
                        height={40}
                        className="rounded-full"
                        priority
                    />
                    <h1 className="text-3xl font-bold text-gray-800">Todoリスト</h1>
                </div>
                <Link href="/about" className="text-blue-600 hover:text-blue-800 transition duration-300">
                    About
                </Link>
            </div>
            {/* Todoリスト */}
            <AddTodoForm onAdd={addTodo} />
            {/* todos配列をマップしてTodoItemコンポーネントをレンダリング */}
            <motion.ul className="space-y-3 mt-6">
                {todos.map((todo) => (
                    <motion.li
                        key={todo.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <TodoItem
                            key={todo.id} // Reactのリスト・レンダリングには一意のkey propが必要
                            id={todo.id}
                            title={todo.title}
                            completed={todo.completed}
                            onToggle={toggleTodo} // 完了状態切り替え関数を渡す
                            onDelete={deleteTodo} // 削除関数を渡す
                        />
                    </motion.li>
                ))}
            </motion.ul>
            {/* 統計情報を表示するボタン */}
            <Button
                onClick={() => setShowStats(!showStats)}
                variant="primary"
                className="mt-6 w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
                {showStats ? '統計情報を隠す' : '統計情報を表示'}
            </Button>

            {showStats && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.0 }}
                >
                    <DynamicTodoStats
                        totalTodos={todos.length}
                        completedTodos={todos.filter(todo => todo.completed).length}
                    />
                </motion.div>
            )}
        </motion.div>
    );
};

export default TodoList;
