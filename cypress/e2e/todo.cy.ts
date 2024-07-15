describe('Todo アプリケーション', () => {
    beforeEach(() => {
        // 各テストの前にトップページにアクセスし、Todoを追加
        cy.visit('/');
        // cy.get('input[placeholder="新しい ToDo を入力"]').type('E2Eテストを書く');
        // cy.contains('追加').click();
    });

    it('Todoリストのアイコンが表示される', () => {
        cy.get('img[alt="Todo Icon"]').should('be.visible');
    });

    it('Aboutページにアクセスして内容を確認できる', () => {
        // Aboutリンクをクリック
        cy.contains('About').click();

        // URLが/aboutであることを確認
        cy.url().should('include', '/about');

        // ページのタイトルを確認
        cy.contains('h1', 'About Todo App').should('be.visible');

        // 機能リストが表示されていることを確認
        cy.contains('Features:').should('be.visible');
        cy.contains('Add new tasks').should('be.visible');
        cy.contains('Mark tasks as completed').should('be.visible');
        cy.contains('Delete tasks').should('be.visible');
        cy.contains('View task statistics').should('be.visible');

        // Last updated 情報が表示されていることを確認
        cy.contains('Last updated:').should('be.visible');
    });

    it('新しいTodoを追加できる', () => {
        // 新しいTodoのタイトル
        const newTodo = 'E2Eテストを書く';

        // 入力フィールドにタイトルを入力
        cy.get('input[placeholder="新しい ToDo を入力"]').type(newTodo);

        // 追加ボタンをクリック
        cy.contains('追加').click();

        // 新しいTodoが表示されていることを確認
        cy.contains(newTodo).should('be.visible');

    });

    // 新しいテストケース：Todoの完了状態を切り替えられる
    it('Todoの完了状態を切り替えられる', () => {
        // チェックボックスをクリック
        cy.get('input[type="checkbox"]').first().click();

        // Todoのテキストに取り消し線が付いていることを確認
        cy.contains('E2Eテストを書く').should('have.css', 'text-decoration', 'line-through solid rgb(107, 114, 128)');

        // もう一度チェックボックスをクリックして、取り消し線が消えることを確認
        cy.get('input[type="checkbox"]').first().click();
        cy.contains('E2Eテストを書く').should('not.have.css', 'text-decoration', 'line-through solid rgb(107, 114, 128)');
    });

    // 新しいテストケース：Todoを削除できる
    it('Todoを削除できる', () => {
        // 新しいTodoのタイトル
        const newTodo = 'E2Eテストを書く';

        // 新しいTodoを追加
        cy.get('input[placeholder="新しい ToDo を入力"]').type(newTodo);
        cy.contains('追加').click();

        // 最後に追加されたTodoのdata-testid属性を取得
        cy.get('[data-testid^="todo-item-"]').last().invoke('attr', 'data-testid').then((testId) => {
            // そのTodoの削除ボタンをクリック
            cy.get(`[data-testid="${testId}"]`).find('button').contains('削除').click();

            // 削除されたことを確認
            cy.get(`[data-testid="${testId}"]`).should('not.exist');
        });
    });

    it('入力せずに追加ボタンをクリックするとエラーメッセージが表示される', () => {
        // 追加ボタンをクリック（入力フィールドは空のまま）
        cy.contains('追加').click();

        // エラーメッセージが表示されることを確認
        cy.contains('Todoのタイトルを入力してください。').should('be.visible');
    });

    it('統計情報を表示・非表示できる', () => {
        // 統計情報を表示ボタンをクリック
        cy.contains('統計情報を表示').click();

        // 統計情報が表示されることを確認
        cy.contains('Todo統計').should('exist');

        // 統計情報を非表示ボタンをクリック
        cy.contains('統計情報を隠す').click();

        // 統計情報が非表示されることを確認
        cy.contains('Todo統計').should('not.exist');
    });

});