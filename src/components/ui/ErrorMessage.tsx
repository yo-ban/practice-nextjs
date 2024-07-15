import React from 'react';

// エラーメッセージコンポーネントのpropsの型定義
interface ErrorMessageProps {
    message: string;  // 表示するエラーメッセージ
}

// 再利用可能なエラーメッセージコンポーネント
const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    return (
        <p className="text-red-500 text-sm mt-1">{message}</p>
    );
};

export default ErrorMessage;