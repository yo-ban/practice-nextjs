import prisma from '@/lib/prisma';

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
        return prisma.todo.findMany(); // todosテーブルからすべてのレコードを取得
    },

    // IDでTodoを取得するメソッド
    async getById(id: number): Promise<Todo | null> {
        return prisma.todo.findUnique(
            { 
                where: { id } 
            }
        ); // 指定されたIDのTodoを取得
    },

    // 新しいTodoを作成するメソッド
    async create(title: string): Promise<Todo> {
        return prisma.todo.create(
            { 
                data: { title } 
            }
        ); // 新しいTodoを挿入
    },

    // Todoを更新するメソッド
    async update(id: number, data: Partial<Todo>): Promise<Todo | null> {
        return prisma.todo.update(
            { 
                where: { id },
                data
            }
        ); // 指定されたIDのTodoを更新
    },

    // Todoを削除するメソッド
    async delete(id: number): Promise<boolean> {
        const result = await prisma.todo.delete(
            { 
                where: { id } 
            }
        ); // 指定されたIDのTodoを削除
        return !!result; // 削除が成功したかどうかを返す
    }
};