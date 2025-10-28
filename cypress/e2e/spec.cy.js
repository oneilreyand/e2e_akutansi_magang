describe('pengujian  web akuntasi', () => {
  beforeEach(() => {
       cy.visit('https://uat-cashbook.assist.id/')
    cy.get('#email').type('raska23si@mahasiswa.pcr.ac.id')
    cy.get('#password').type('12345678')
    cy.get('[data-testid="login-submit-button"]').click()
    cy.get('[data-testid="drawer-item-sales"]').click()
  });
  
  
  it('mengunjungi laman penjualan', () => {
    cy.get('.MuiTypography-h5 > span').should('have.text', 'Penjualan');
  });

   it('mengidentifikasi Penulisan penjualan baru', () => {
    cy.get('.css-aidtzz > .MuiButtonBase-root').should('have.text', 'Penjualan Baru');
    
  });


    
  });

