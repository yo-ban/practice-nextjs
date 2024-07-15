import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InputField from '@/components/ui/InputField';
import '@testing-library/jest-dom';

describe('InputField コンポーネント', () => {
    const mockOnChange = jest.fn();

    test('プレースホルダーが正しく表示される', () => {
        render(<InputField value="" onChange={mockOnChange} placeholder="テスト入力" />);
        const inputElement = screen.getByPlaceholderText('テスト入力');
        expect(inputElement).toBeInTheDocument();
    });

    test('値が正しく表示される', () => {
        render(<InputField value="テスト値" onChange={mockOnChange} placeholder="入力してください" />);
        const inputElement = screen.getByDisplayValue('テスト値');
        expect(inputElement).toBeInTheDocument();
    });

    test('onChange イベントが正しく発火する', () => {
        render(<InputField value="" onChange={mockOnChange} placeholder="入力してください" />);
        const inputElement = screen.getByPlaceholderText('入力してください');
        fireEvent.change(inputElement, { target: { value: '新しい値' } });
        expect(mockOnChange).toHaveBeenCalledTimes(1);
    });

    test('type プロパティが正しく設定される', () => {
        render(<InputField value="" onChange={mockOnChange} placeholder="パスワード" type="password" />);
        const inputElement = screen.getByPlaceholderText('パスワード');
        expect(inputElement).toHaveAttribute('type', 'password');
    });

    test('className プロパティが正しく適用される', () => {
        render(<InputField value="" onChange={mockOnChange} placeholder="入力" className="custom-class" />);
        const inputElement = screen.getByPlaceholderText('入力');
        expect(inputElement).toHaveClass('custom-class');
    });
});