describe("Test auto login", () => {
    beforeEach(() => {
      cy.loginWithUI("damaresya947@gmail.com", "12345678");
    });
  
    it("Test case 1 : mencari icon menu", () => {
      cy.visit("https://cashflow.assist.id/admin/dashboard");
      cy.get('[data-testid="appbar-menu-button"]').click();
    });
    it("Test case 2 : mencari icon beranda", () => {
      cy.visit("https://cashflow.assist.id/admin/dashboard");
      cy.get('[data-testid="drawer-item-dashboard"]').click();
    });
    it("Test case 3 : mencari icon laporan", () => {
      cy.visit("https://cashflow.assist.id/admin/dashboard");
      cy.get('[data-testid="drawer-item-reports"]').click()
    });
    it("Test case 4 : mencari icon kas dan bank", () => {
      cy.visit("https://cashflow.assist.id/admin/dashboard");
      cy.get('[data-testid="drawer-item-cash-bank"]').click();
    });
    it("Test case 5 mencari icon sales", () => {
      cy.visit("https://cashflow.assist.id/admin/dashboard");
      cy.get('[data-testid="drawer-item-sales"]').click();
    });
  });