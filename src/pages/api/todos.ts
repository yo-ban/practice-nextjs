import { NextApiRequest, NextApiResponse } from 'next';
import { todoRepository } from '@/lib/todoRepository';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    switch (req.method) {
        case 'GET':
            try {
                // すべてのTodoを取得
                const todos = await todoRepository.getAll();
                // 取得したTodoをレスポンスとして返す
                res.status(200).json(todos);
            } catch (error) {
                // エラーログをコンソールに出力
                console.error('Error fetching todos:', error);
                // エラーレスポンスを返す
                res.status(500).json({ error: 'Internal Server Error' });
            }
            break;

        case 'POST':
            try {
                const { title } = req.body;
                if (!title) {
                    return res.status(400).json({ error: 'Title is required' });
                }
                // 新しいTodoを挿入
                const newTodo = await todoRepository.create(title);
                res.status(201).json(newTodo);
            } catch (error) {
                console.error('Error creating todo:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
            break;

        default:
            // 許可されているメソッドをヘッダーに設定
            res.setHeader('Allow', ['GET', 'POST']);
            // 405エラーレスポンスを返す
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}