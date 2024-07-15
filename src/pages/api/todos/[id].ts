import { NextApiRequest, NextApiResponse } from 'next';
import { todoRepository } from '@/lib/todoRepository';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query; // クエリパラメータからIDを取得

    switch (req.method) {
        case 'PUT':
            try {
                const { title, completed } = req.body; // リクエストボディからタイトルと完了状態を取得
                if (title === undefined && completed === undefined) {
                    return res.status(400).json({ error: 'No update data provided' }); // 更新データがない場合は400エラーを返す
                }
                // 更新データがない場合は既存の値を保持
                const existingTodo = await todoRepository.getById(Number(id));
                const updatedTitle = title !== undefined ? title : existingTodo?.title;
                const updatedCompleted = completed !== undefined ? completed : existingTodo?.completed;

                const updatedTodo = await todoRepository.update(Number(id), { title: updatedTitle, completed: updatedCompleted }); // クエリを実行

                if (updatedTodo) {
                    res.status(200).json(updatedTodo); // 更新されたTodoをレスポンスとして返す
                } else {
                    res.status(404).json({ error: 'Todo not found' }); // Todoが見つからない場合は404エラーを返す
                }
            } catch (error) {
                console.error('Error updating todo:', error); // エラーログをコンソールに出力
                res.status(500).json({ error: 'Internal Server Error' }); // 500エラーを返す
            }
            break;
        case 'DELETE':
            try {
                // Todoを削除
                const changes = await todoRepository.delete(Number(id));
                if (changes) {
                    res.status(200).json({ message: 'Todo deleted successfully' }); // 削除成功メッセージを返す
                } else {
                    res.status(404).json({ error: 'Todo not found' }); // Todoが見つからない場合は404エラーを返す
                }
            } catch (error) {
                console.error('Error deleting todo:', error); // エラーログをコンソールに出力
                res.status(500).json({ error: 'Internal Server Error' }); // 500エラーを返す
            }
            break;

        default:
            res.setHeader('Allow', ['PUT', 'DELETE']); // 許可されているメソッドをヘッダーに設定
            res.status(405).end(`Method ${req.method} Not Allowed`); // 405エラーレスポンスを返す
    }
}