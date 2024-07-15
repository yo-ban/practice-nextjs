import { dbPromise } from '@/lib/db';

// Todoインターフェースの定義
export interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

// todoRepositoryオブジェクトの定義
export const todoRepository = {
    // すべてのTodoを取得するメソッド
    async getAll(): Promise<Todo[]> {
        const db = await dbPromise; // データベース接続を取得
        return db.all('SELECT * FROM todos'); // todosテーブルからすべてのレコードを取得
    },

    // IDでTodoを取得するメソッド
    async getById(id: number): Promise<Todo | undefined> {
        const db = await dbPromise; // データベース接続を取得
        return db.get('SELECT * FROM todos WHERE id = ?', id); // 指定されたIDのTodoを取得
    },

    // 新しいTodoを作成するメソッド
    async create(title: string): Promise<Todo> {
        const db = await dbPromise; // データベース接続を取得
        const result = await db.run('INSERT INTO todos (title) VALUES (?)', title); // 新しいTodoを挿入
        const id = (result as any).lastID; // 挿入されたレコードのIDを取得
        return this.getById(id) as Promise<Todo>; // 挿入されたTodoを取得して返す
    },

    // Todoを更新するメソッド
    async update(id: number, data: Partial<Todo>): Promise<Todo | null> {
        const db = await dbPromise; // データベース接続を取得
        const setColumns = Object.keys(data).map(key => `${key} = ?`).join(', '); // 更新するカラムを動的に生成
        const values = Object.values(data); // 更新する値を配列に変換
        await db.run(`UPDATE todos SET ${setColumns} WHERE id = ?`, ...values, id); // 指定されたIDのTodoを更新
        return this.getById(id) as Promise<Todo>; // 更新されたTodoを取得して返す
    },

    // Todoを削除するメソッド
    async delete(id: number): Promise<boolean> {
        const db = await dbPromise; // データベース接続を取得
        const result = await db.run('DELETE FROM todos WHERE id = ?', id); // 指定されたIDのTodoを削除
        return (result as any).changes > 0; // 削除が成功したかどうかを返す
    }
};