import React from 'react';
import { render, screen } from '@testing-library/react';
import Checkbox from '@/components/ui/Checkbox';
import '@testing-library/jest-dom';

describe('Checkboxコンポーネント', () => {
    const mockOnChange = jest.fn();

    test('チェックされた状態のチェックボックスが正しくレンダリングされる', () => {
        render(<Checkbox checked={true} onChange={mockOnChange} />);
        const checkboxElement = screen.getByRole('checkbox');
        expect(checkboxElement).toBeChecked();
    });

    test('チェックされていない状態のチェックボックスが正しくレンダリングされる', () => {
        render(<Checkbox checked={false} onChange={mockOnChange} />);
        const checkboxElement = screen.getByRole('checkbox');
        expect(checkboxElement).not.toBeChecked();
    });

    test('ラベル付きのチェックボックスが正しくレンダリングされる', () => {
        render(<Checkbox checked={false} onChange={mockOnChange} label="チェックボックス" />);
        const checkboxElement = screen.getByText('チェックボックス');
        expect(checkboxElement).toBeInTheDocument();
    });

});