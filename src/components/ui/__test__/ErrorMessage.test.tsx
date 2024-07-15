import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { expect } from '@jest/globals';

describe('ErrorMessageコンポーネント', () => {
    test('エラーメッセージが正しく表示される', () => {
        const testMessage = 'テストエラーメッセージ';
        render(<ErrorMessage message={testMessage} />);
        const messageElement = screen.getByText(testMessage);
        expect(messageElement).toBeInTheDocument();
    });

    test('正しいCSSクラスが適用されている', () => {
        render(<ErrorMessage message="エラー" />);
        const messageElement = screen.getByText('エラー');
        expect(messageElement).toHaveClass('text-red-500');
        expect(messageElement).toHaveClass('text-sm');
        expect(messageElement).toHaveClass('mt-1');
    });
});