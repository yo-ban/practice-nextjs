import React, { useState } from 'react';
import ErrorMessage from '@/components/ui/ErrorMessage';
import Button from '@/components/ui/Button';
import InputField from '@/components/ui/InputField';
import { motion } from 'framer-motion'; // framer-motionをインポート

// AddTodoForm の props の型定義
interface AddTodoFormProps {
    onAdd: (title: string) => void;
}

// カスタムバリデーション関数
const validateTodoTitle = (title: string): string | null => {
    if (title.trim() === '') {
        return 'Todoのタイトルを入力してください。';
    }
    
    if (title.length > 50) {
        return 'Todoのタイトルは50文字以内で入力してください。';
    }
    
    return null; // バリデーション成功
};

const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAdd }) => {
    // 入力されたTodoのタイトルを管理するstate
    const [title, setTitle] = useState<string>('');
    // エラーメッセージを管理するstate
    const [error, setError] = useState<string>('');

    // フォーム送信時の処理
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // デフォルトのフォーム送信動作を防止
        
        // カスタムバリデーション関数を使用
        const validationError = validateTodoTitle(title);
        if (validationError) {
            setError(validationError);
            return;
        }

        // バリデーションが成功した場合
        onAdd(title.trim()); // 親コンポーネントから渡された onAdd 関数を呼び出し
        setTitle(''); // 入力フィールドをクリア
        setError(''); // エラーメッセージをクリア
    };

    return (
        // アニメーション付きのフォームコンテナを追加
        <motion.form 
            onSubmit={handleSubmit} 
            className="mb-6 p-4 bg-gray-100 rounded-lg shadow-sm"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="flex flex-col space-y-2"> {/* 縦方向のスペースを追加 */}
                {/* Todo タイトル入力フィールド */}
                <InputField
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                        setError(''); // 入力時にエラーメッセージをクリア
                    }}
                    placeholder="新しい ToDo を入力"
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {/* エラーメッセージ表示 */}
                {error && <ErrorMessage message={error} />}
                {/* 追加ボタン */}
                <Button
                    type="submit"
                    variant="primary"
                    className="w-full"
                >
                    追加
                </Button>
            </div>
        </motion.form>
    );
};

export default AddTodoForm;