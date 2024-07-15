import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import TodoList from '@/components/features/TodoList';
import { expect } from '@jest/globals';
import { SWRConfig } from 'swr';

// fetchのモックをテストの外で定義
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('TodoList component', () => {
    beforeEach(() => {
        // 各テストの前にモックをリセット
        mockFetch.mockClear();
    });

    test('renders todo list when fetch is successful', async () => {
        // 成功時のレスポンスをモック
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => [{ id: 1, title: 'Test Todo', completed: false }],
        });

        render(
            <SWRConfig value={{ provider: () => new Map() }}>
                <TodoList />
            </SWRConfig>
        );

        // ローディング状態の確認
        expect(screen.getByText('Loading...')).toBeInTheDocument();

        // Todo項目が表示されるまで待機
        await waitFor(() => {
            expect(screen.getByText('Test Todo')).toBeInTheDocument();
        });

        // Add Todo フォームが表示されていることを確認
        expect(screen.getByPlaceholderText('新しい ToDo を入力')).toBeInTheDocument();
    });

    test('shows error message when fetch fails', async () => {
        // エラー時のレスポンスをモック
        mockFetch.mockRejectedValueOnce(new Error('API error'));

        render(
            <SWRConfig value={{ provider: () => new Map(), dedupingInterval: 0 }}>
                <TodoList />
            </SWRConfig>
        );

        // エラーメッセージが表示されるまで待機 
        await waitFor(() => {
            expect(screen.getByText('Todoの取得中にエラーが発生しました')).toBeInTheDocument();
        });
    });
});