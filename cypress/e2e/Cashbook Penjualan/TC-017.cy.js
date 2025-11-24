describe('Penjualan', () => {
  beforeEach(() => {
    cy.request({
      method: 'POST',
      url: 'https://api-uat-cashbook.assist.id/api/login',
      body: {
        email: 'raska23si@mahasiswa.pcr.ac.id',
        password: '12345678'
      },
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      const token = response.body.token;
      window.sessionStorage.setItem('token', token);
      window.localStorage.setItem('token', token);
      cy.log('Login berhasil via API');
    });
  }); // <- ini penutup beforeEach yang benar

  it('Sistem menampilkan breadcrumb Detail Penjualan ketika berada di halaman Detail Penjualan', () => {
    cy.intercept('GET', '**/api/penjualan**', (req) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(req.continue());
        }, 3000);
      });
    }).as('fetchPenjualan');

    cy.visit('https://uat-cashbook.assist.id/admin/sales');
    
    // Tunggu halaman load
    cy.get('.MuiBreadcrumbs-ol > :nth-child(1) > .MuiTypography-root')
      .should('be.visible')
      .and('contain.text', 'Beranda');
    
    // Validasi breadcrumb kedua
    cy.get(':nth-child(3) > .MuiTypography-root > span')
      .should('be.visible')
      .and('contain.text', 'Penjualan');

    // Melakukan click pada Detail Penjualan dari daftar Penjualan terbaru
    cy.get(':nth-child(1) > :nth-child(2) > [aria-label="Detail Penjualan"] > a > .MuiButtonBase-root').click();

    // Validasi breadcrumb ketiga
    cy.get(':nth-child(5) > .MuiTypography-root > span')
      .should('be.visible')
      .and('contain.text', 'Detail Penjualan');
  });
}); 