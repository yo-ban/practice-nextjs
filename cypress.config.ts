import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000", // アプリケーションのベースURL
    supportFile: false, // デフォルトのサポートファイルを無効化
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
