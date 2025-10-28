describe('Pengujian Laman Laporan Assist.id', () => {
  const baseUrl = 'https://uat-cashbook.assist.id/';
  const validEmail = 'raska23si@mahasiswa.pcr.ac.id';
  const validPassword = '12345678';

  beforeEach(() => {
    cy.visit(baseUrl);
    cy.get('#email').type(validEmail);
    cy.get('#password').type(validPassword);
    cy.get('[data-testid="login-submit-button"]').click();
    cy.url().should('include', '/dashboard');
    
    // Navigasi ke laman laporan
    cy.get('[data-testid="drawer-item-reports"]').click();
    cy.url().should('include', '/reports');
  });

  it('Memverifikasi autentikasi pada laman laporan', () => {
    cy.get('[data-testid="drawer-item-reports"] > .MuiListItemText-root > .MuiTypography-root')
      .should('be.visible')
      .and('contain.text', 'Laporan');
  });

  it('Menguji tombol neraca dan kembali', () => {
    cy.get(':nth-child(1) > .MuiPaper-root > .MuiCardContent-root > .MuiButtonBase-root')
      .should('contain.text', 'Lihat Laporan').click();
    
    cy.get(':nth-child(3) > .MuiTypography-root > span')
    
    cy.get('[data-testid="drawer-item-reports"]').click();
    cy.url().should('include', '/reports');
  });

  it('Menguji tombol Arus kas dan kembali', () => {
    cy.get(':nth-child(2) > .MuiPaper-root > .MuiCardContent-root > .MuiButtonBase-root')
      .should('be.visible')
      .click();
    
    cy.get(':nth-child(3) > .MuiTypography-root > span')
    cy.get('[data-testid="drawer-item-reports"]').click();
    cy.url().should('include', '/reports');
  });

  it('Menguji tombol laba Rugi dan kembali', () => {
    cy.get(':nth-child(3) > .MuiPaper-root > .MuiCardContent-root > .MuiButtonBase-root')
      .should('be.visible')
      .click();
    
    cy.get(':nth-child(3) > .MuiTypography-root > span')
    cy.get('[data-testid="drawer-item-reports"]').click();
    cy.url().should('include', '/reports');
  });

  it('Menguji tombol Buku Besar dan kembali ', () => {
    cy.get(':nth-child(4) > .MuiPaper-root > .MuiCardContent-root > .MuiButtonBase-root')
      .should('be.visible')
      .click();
    
    cy.get(':nth-child(3) > .MuiTypography-root > span')
    cy.get('[data-testid="drawer-item-reports"]').click();
    cy.url().should('include', '/reports');
  });

  it('Menguji tombol Neraca Saldo dan Kembali', () => {
    cy.get(':nth-child(5) > .MuiPaper-root > .MuiCardContent-root > .MuiButtonBase-root')
      .should('be.visible')
      .click();
    
   cy.get(':nth-child(3) > .MuiTypography-root > span')
    cy.get('[data-testid="drawer-item-reports"]').click();
    cy.url().should('include', '/reports');
  });

  it('Menguji tombol jurnal dan kembali', () => {
    cy.get(':nth-child(6) > .MuiPaper-root > .MuiCardContent-root > .MuiButtonBase-root')
      .should('be.visible')
      .click();
    
   cy.get(':nth-child(3) > .MuiTypography-root > span')
    cy.get('[data-testid="drawer-item-reports"]').click();
    cy.url().should('include', '/reports');
  });
});