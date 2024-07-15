import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from '@/components/ui/Button';
import '@testing-library/jest-dom';

describe('Buttonコンポーネント', () => {
    test('正しいテキストでボタンがレンダリングされる', () => {
        render(<Button>クリックしてください</Button>);
        const buttonElement = screen.getByText('クリックしてください');
        expect(buttonElement).toBeInTheDocument();
    });

    test('variant propに基づいて正しいCSSクラスが適用される', () => {
        render(<Button variant="primary">プライマリーボタン</Button>);
        const primaryButton = screen.getByText('プライマリーボタン');
        expect(primaryButton).toHaveClass('bg-blue-500');

        render(<Button variant="secondary">セカンダリーボタン</Button>);
        const secondaryButton = screen.getByText('セカンダリーボタン');
        expect(secondaryButton).toHaveClass('bg-gray-200');
    });

    test('disabled propがtrueの場合、ボタンが無効化される', () => {
        render(<Button disabled>無効化されたボタン</Button>);
        const disabledButton = screen.getByText('無効化されたボタン');
        expect(disabledButton).toBeDisabled();
    });
});