describe('Pengujian Laman Beranda Assist.id', () => {
  const baseUrl = 'https://uat-cashbook.assist.id/';
  const validEmail = 'raska23si@mahasiswa.pcr.ac.id';
  const validPassword = '12345678';

  beforeEach(() => {
    // Login fresh setiap test untuk menghindari state dependency
    cy.visit(baseUrl);
    cy.get('#email').type(validEmail);
    cy.get('#password').type(validPassword);
    cy.get('[data-testid="login-submit-button"]').click();
    cy.url().should('include', '/dashboard');
  });
    it('Menampilkan laman Kas & bank ', () => {
    cy.get('[data-testid="drawer-item-cash-bank"] > .MuiListItemText-root > .MuiTypography-root').click();
    cy.get('.MuiTypography-h5').should('contain.text', 'Kas & Bank');

  });
  cy.get('.MuiBox-root > .MuiInputBase-root > .MuiSelect-select').click();
    cy.get('#\:r1h3\: > .Mui-selected').click();
    cy.wait(1000);




  });