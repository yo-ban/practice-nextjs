import React from 'react';
import Button from '@/components/ui/Button';
import Checkbox from '@/components/ui/Checkbox';
import { motion } from 'framer-motion'; 

// TodoItemのpropsの型定義
interface TodoItemProps {
    id: number;
    title: string;
    completed: boolean;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}

// TodoItemコンポーネント
const TodoItem: React.FC<TodoItemProps> = ({ id, title, completed, onToggle, onDelete }) => {
    return (
        // アニメーション付きのコンテナを追加
        <motion.div 
            className="flex items-center justify-between p-4 border-b bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            whileHover={{ scale: 1.02 }} // ホバー時に少し拡大
            data-testid={`todo-item-${id}`}
        >
            <div className="flex items-center space-x-3"> {/* 間隔を追加 */}
                {/* チェックボックス */}
                <Checkbox
                    checked={completed}
                    onChange={() => onToggle(id)} // チェックボックスの状態が変更されたら onToggle 関数を呼び出す
                />
                {/* Todoのタイトル */}
                <span className={`text-lg ${completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                    {title}
                </span>
            </div>
            {/* 削除ボタン */}
            <Button            
                onClick={() => onDelete(id)} // ボタンがクリックされたら onDelete 関数を呼び出す
                variant='danger'
                className="text-red-500 hover:text-red-700 transition-colors duration-300"
            >
                削除
            </Button>
        </motion.div>
    );
};

export default TodoItem;