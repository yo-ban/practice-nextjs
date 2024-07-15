import React from 'react';
import Button from '@/components/ui/Button';
import Checkbox from '@/components/ui/Checkbox';

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
        <div className="flex items-center justify-between p-4 border-b" data-testid={`todo-item-${id}`}>
            <div className="flex items-center">
                {/* チェックボックス */}
                <Checkbox
                    checked={completed}
                    onChange={() => onToggle(id)} // チェックボックスの状態が変更されたら onToggle 関数を呼び出す
                />
                {/* Todoのタイトル */}
                <span className={completed ? 'line-through text-gray-500' : ''}>
                    {title}
                </span>
            </div>
            {/* 削除ボタン */}
            <Button            
                onClick={() => onDelete(id)} // ボタンがクリックされたら onDelete 関数を呼び出す
                variant='danger'
                className="text-red-500 hover:text-red-7000"
            >
                削除
            </Button>
        </div>
    );
};

export default TodoItem;