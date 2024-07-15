import React from 'react';

// チェックボックスコンポーネントのpropsの型定義
interface CheckboxProps {
    checked: boolean;  // チェックされているかどうか
    onChange: (checked: boolean) => void;  // 状態変更時のコールバック関数
    label?: string;  // チェックボックスのラベル（任意）
}

// 再利用可能なチェックボックスコンポーネント
const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, label }) => {
    // チェックボックスの状態が変更されたときのハンドラ
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.checked);
    };

    return (
        <label className="flex items-center space-x-2 cursor-pointer">
            <input
                type="checkbox"
                checked={checked}
                onChange={handleChange}
                className="
                    form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out
                    border border-gray-300 rounded
                    focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                "
            />
            {label && <span className="text-gray-700">{label}</span>}
        </label>
    );
};

export default Checkbox;