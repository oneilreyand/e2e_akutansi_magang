describe('AutoLogin', () => {
    beforeEach(() => {
        cy.getCookie('authToken'); // Memulihkan cookie sebelum setiap test
        cy.loginWithAPI('rayhanrayandra.work.id@gmail.com', 'Nz6}+#8y');
    });

    it('Mengakses halaman dashboard', () => {
        cy.visit('https://cashflow.assist.id/admin/dashboard/');
        cy.contains('Beranda')
        .should('be.visible')
        cy.wait(500)
    });

    it('Mengakses halaman reports', () => {
        cy.visit('https://cashflow.assist.id/admin/reports/');
        cy.contains('Laporan')
        .should('be.visible')
        cy.wait(500)
    });

    it('Mengakses halaman cash-bank', () => {
        cy.visit('https://cashflow.assist.id/admin/cash-bank/');
        cy.contains('Kas & Bank')
        .should('be.visible')
        cy.wait(500)
    });

    it('Mengakses halaman sales', () => {
        cy.visit('https://cashflow.assist.id/admin/sales/');
        cy.contains('Penjualan')
        .should('be.visible')
        cy.wait(500)
    });

    it('Mengakses halaman purchases', () => {
        cy.visit('https://cashflow.assist.id/admin/purchases/');
        cy.contains('Pembelian')
        .should('be.visible')
        cy.wait(500)
    });

    it('Mengakses halaman Biaya', () => {
        cy.visit('https://cashflow.assist.id/admin/expenses/');
        cy.contains('Biaya')
        .should('be.visible')
        cy.wait(500)
    });
});
