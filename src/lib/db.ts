import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// データベース接続を非同期で初期化する関数
async function initializeDatabase() {
    // SQLiteデータベースを開く
    const db = await open({
        filename: './todos.sqlite', // データベースファイルのパス
        driver: sqlite3.Database // SQLite3ドライバーを使用
    });

    // todosテーブルが存在しない場合は作成
    await db.exec(`
        CREATE TABLE IF NOT EXISTS todos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            completed BOOLEAN DEFAULT 0
        )
    `);

    return db;
}

// データベース接続をエクスポート
export const dbPromise = initializeDatabase();