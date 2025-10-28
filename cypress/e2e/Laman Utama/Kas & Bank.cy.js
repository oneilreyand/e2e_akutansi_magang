describe('Pengujian Laman Beranda Assist.id', () => {
  const baseUrl = 'https://uat-cashbook.assist.id/';
  const validEmail = 'raska23si@mahasiswa.pcr.ac.id';
  const validPassword = '12345678';

  beforeEach(() => {
    cy.visit(baseUrl);
    cy.get('#email').type(validEmail);
    cy.get('#password').type(validPassword);
    cy.get('[data-testid="login-submit-button"]').click();
    cy.url().should('include', '/dashboard');
  });

  it('Menampilkan laman Kas & bank', () => {
    cy.get('[data-testid="drawer-item-cash-bank"]').click();
    cy.get('.MuiTypography-h5').should('contain.text', 'Kas & Bank');
    
    // Gunakan selektor yang lebih spesifik berdasarkan struktur
    cy.get('.MuiBox-root .MuiInputBase-root .MuiSelect-select').click();
    
    // Tunggu dropdown terbuka
    cy.get('ul[role="listbox"]').should('be.visible');
    
    // Pilih opsi pertama dari dropdown
    cy.get('ul[role="listbox"] li').first().click();
    
    cy.wait(10000);
  });
});