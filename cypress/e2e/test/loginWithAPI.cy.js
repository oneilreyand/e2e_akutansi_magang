describe('Test API Login', () => {
    beforeEach(() => {
      cy.loginWithAPI('damaresya947@gmail.com', '12345678');
    })
    it('test 1', () => {
      cy.visit('https://cashflow.assist.id/auth/login');
      cy.get('[data-testid="login-title"]').should("be.visible").contains("Masuk ke akunmu")
    });
    it('test 2', () => {
      cy.visit('https://cashflow.assist.id/auth/login');
      cy.get('[data-testid="login-subtitle"]').should("be.visible").contains("Masukkan email dan passwordmu yang terdaftar dibawah ini")
    });
    it('test 3', () => {
      cy.visit('https://cashflow.assist.id/auth/login');
      cy.get(':nth-child(1) > .MuiFormLabel-root').should("be.visible").contains("Alamat email")
    });
    it('test 4', () => {
      cy.visit('https://cashflow.assist.id/auth/login');
      cy.get(':nth-child(2) > .MuiFormLabel-root').should("be.visible").contains("Password")
    });
    it('test 5', () => {
      cy.visit('https://cashflow.assist.id/auth/login');
      cy.get('[data-testid="login-submit-button"]').should("be.visible")
    });
  });
  