describe('AutoLogin', () => {
    beforeEach(() => {
        cy.restoreLocalStorage(); // Memulihkan localStorage sebelum setiap test
        cy.session('user-session', () => {
            // Login hanya dilakukan satu kali
            cy.visit('https://cashflow.assist.id');
            cy.loginWithUI('rayhanrayandra.work.id@gmail.com', 'Nz6}+#8y');
        });
    });

    afterEach(() => {
        cy.saveLocalStorage(); // Menyimpan localStorage setelah setiap test
    });

    it('Mengakses halaman dashboard', () => {
        cy.visit('https://cashflow.assist.id/admin/dashboard/');
        cy.contains('Beranda')
        .should('be.visible');
    });

    it('Mengakses halaman reports', () => {
        cy.visit('https://cashflow.assist.id/admin/reports/');
        cy.contains('Laporan')
        .should('be.visible');
    });

    it('Mengakses halaman cash-bank', () => {
        cy.visit('https://cashflow.assist.id/admin/cash-bank/');
        cy.contains('Kas & Bank')
        .should('be.visible');
    });

    it('Mengakses halaman sales', () => {
        cy.visit('https://cashflow.assist.id/admin/sales/');
        cy.contains('Penjualan')
        .should('be.visible');
    });

    it('Mengakses halaman purchases', () => {
        cy.visit('https://cashflow.assist.id/admin/purchases/');
        cy.contains('Pembelian')
        .should('be.visible');
    });

    it('Mengakses halaman Biaya', () => {
        cy.visit('https://cashflow.assist.id/admin/expenses/');
        cy.contains('Biaya')
        .should('be.visible');
    });
});
