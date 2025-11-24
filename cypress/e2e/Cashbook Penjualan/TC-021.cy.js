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
  });

  it('Sistem menampilkan total penjualan Belum Dibayar, Telat Dibayar, dan Pelunasan Diterima', () => {
    cy.visit('https://uat-cashbook.assist.id/admin/sales');
    // menclose pop up
    cy.get('.qcw-trigger-btn > .svelte-7gdhvy').click();

    // Validasi nominal Belum Dibayar ada dan berformat Rp
    cy.get(':nth-child(1) > .MuiPaper-root > .MuiCardContent-root > .css-kdbf65 > .MuiStack-root > .MuiTypography-h5')
      .should('be.visible')
      .and('contain.text', 'Rp')
      .and('not.contain.text', 'NaN')
      .and('not.contain.text', 'undefined');

    // Validasi nominal Telat Dibayar ada dan berformat Rp
    cy.get(':nth-child(2) > .MuiPaper-root > .MuiCardContent-root > .css-kdbf65 > .MuiStack-root > .MuiTypography-h5')
      .should('be.visible')
      .and('contain.text', 'Rp')
      .and('not.contain.text', 'NaN')
      .and('not.contain.text', 'undefined');

    // Validasi nominal Pelunasan Diterima ada dan berformat Rp
    cy.get(':nth-child(3) > .MuiPaper-root > .MuiCardContent-root > .css-kdbf65 > .MuiStack-root > .MuiTypography-h5')
      .should('be.visible')
      .and('contain.text', 'Rp')
      .and('not.contain.text', 'NaN')
      .and('not.contain.text', 'undefined');

    cy.log('Semua total penjualan berhasil ditampilkan dengan format yang benar');
  });

  it('Sistem dapat berpindah halaman pada tabel penjualan', () => {
    cy.visit('https://uat-cashbook.assist.id/admin/sales');
    // menclose pop up
    cy.get('.qcw-trigger-btn > .svelte-7gdhvy').click();

    // Skip validasi page 1, langsung klik page 2
    cy.get(':nth-child(3) > .MuiButtonBase-root').click();
    cy.wait(2000);
    cy.get('table').should('be.visible');
    cy.get('tbody tr').should('have.length.gt', 0);

    // Klik page 3
    cy.get(':nth-child(4) > .MuiButtonBase-root').click();
    cy.wait(2000);
    cy.get('table').should('be.visible');
    cy.get('tbody tr').should('have.length.gt', 0);

    cy.log('Pagination berfungsi dengan baik - dapat berpindah halaman');
  });
});