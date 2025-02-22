import React from 'react';

// ボタンコンポーネントのpropsの型定義
interface ButtonProps {
    onClick?: () => void;  // クリックイベントハンドラ
    children: React.ReactNode;  // ボタンの中身（テキストやアイコンなど）
    variant?: 'primary' | 'secondary' | 'danger';  // ボタンの種類
    disabled?: boolean;  // 無効化状態（任意）
    type?: 'button' | 'submit' | 'reset';  // ボタンのtype属性（任意、デフォルトは 'button'）
    className?: string;  // 追加のクラス名（任意）
}

// 再利用可能なボタンコンポーネント
const Button: React.FC<ButtonProps> = ({
    onClick,
    children,
    variant,
    disabled = false,
    type = 'button',
    className = ''
}) => {
    // variantに基づいてクラスを決定
    const getVariantClass = () => {
        switch (variant) {
            case 'primary':
                return 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500';
            case 'secondary':
                return 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400';
            case 'danger':
                return 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500';
            default:
                return 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400';
        }
    };

    // 基本クラスとvariantクラスを結合
    const buttonClass = `
        px-4 py-2 rounded-lg font-medium transition duration-300 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-opacity-50
        ${getVariantClass()}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
    `;

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            type={type}
            className={buttonClass}
        >
            {children}
        </button>
    );
};

export default Button;