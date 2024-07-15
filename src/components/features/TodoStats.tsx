import React from 'react';

interface TodoStatsProps {
    totalTodos: number;
    completedTodos: number;
}

const TodoStats: React.FC<TodoStatsProps> = ({ totalTodos, completedTodos }) => {
    return (
        <div className="bg-gray-100 p-4 mt-4 rounded-md">
            <h2 className="text-lg font-semibold mb-2">Todo統計</h2>
            <p>全タスク数: {totalTodos}</p>
            <p>完了タスク数: {completedTodos}</p>
            <p>完了率: {totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0}%</p>
        </div>
    );
};

export default TodoStats;