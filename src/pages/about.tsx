import React from 'react';
import { GetStaticProps } from 'next';

// ページコンポーネントの型定義
interface AboutPageProps {
    lastUpdated: string;
}

// Aboutページコンポーネント
const AboutPage: React.FC<AboutPageProps> = ({ lastUpdated }) => {
    return (
        <div className="max-w-2xl mx-auto mt-8 p-4">
            <h1 className="text-3xl font-bold mb-4">About Todo App</h1>

            <p className="mb-4">
                This Todo application is a simple yet powerful tool to manage your daily tasks.
                Built with Next.js, it demonstrates the use of modern web technologies and best practices.
            </p>

            <h2 className="text-2xl font-semibold mb-2">Features:</h2>
            <ul className="list-disc pl-5 mb-4">
                <li>Add new tasks</li>
                <li>Mark tasks as completed</li>
                <li>Delete tasks</li>
                <li>View task statistics</li>
            </ul>

            <p className="text-sm text-gray-600">
                Last updated: {lastUpdated}
            </p>
        </div>
    );
};

// getStaticProps関数でSSGを実装
export const getStaticProps: GetStaticProps<AboutPageProps> = async () => {
    // 現在の日時を取得（ビルド時の日時になります）
    const lastUpdated = new Date().toLocaleString();

    // ページコンポーネントにpropsとして渡すデータを返す
    return {
        props: {
            lastUpdated,
        },
        // 1時間ごとにページを再生成する（オプション）
        revalidate: 3600,
    };
};

export default AboutPage;