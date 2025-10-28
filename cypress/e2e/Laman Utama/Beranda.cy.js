describe('Pengujian Laman Beranda Assist.id', () => {
  
  beforeEach(() => {
    // Login fresh setiap test untuk menghindari state dependency
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
      // Verifikasi response berhasil
      expect(response.status).to.eq(200);
      
      // Simpan token atau session jika needed
      const token = response.body.token;
       window.sessionStorage.setItem('token', token);
       window.localStorage.setItem('token', token);
      cy.log('Login berhasil via API');
      cy.visit('https://uat-cashbook.assist.id')
    });
  });

  it('Menampilkan laman beranda dengan benar', () => {
    cy.get('[data-testid="drawer-item-dashboard"]').should('be.visible');
    cy.get('.MuiTypography-h5').should('contain.text', 'Beranda');
  });

  it('Mengaktifkan filter Arus Kas Bulanan dan Tahunan', () => {
    // Arus Kas Bulanan
    cy.get('.MuiGrid2-grid-lg-5 .MuiSelect-select')
      .first()
      .click();
    cy.get('[role="listbox"]').contains('Bulanan').click();
    cy.wait(1000);

    // Arus Kas Tahunan
    cy.get('.MuiGrid2-grid-lg-7 .MuiSelect-select')
      .first()
      .click();
    cy.get('[role="listbox"]').contains('Tahunan').click();
  });

  it('Menampilkan dan mengklik filter Penjualan Bulanan dan Tahunan', () => {
    // Penjualan Bulanan
    cy.get('.MuiPaper-root .MuiSelect-select')
      .eq(2)
      .click();
    cy.get('[role="listbox"]').contains('Bulanan').click();

    // Scroll ke bawah sebelum lanjut
    cy.scrollTo('bottom');

    // Penjualan Tahunan
    cy.get('.MuiPaper-root .MuiSelect-select')
      .eq(3)
      .click();
    cy.get('[role="listbox"]').contains('Tahunan').click();
  });

  it('Memastikan tombol Laba Rugi dan Biaya Operasional berfungsi', () => {
    // Laba Rugi Bulanan
    cy.get('.Mui-selected').should('be.visible');

    // Biaya Operasional
    cy.scrollTo('bottom');
    cy.get('.MuiPaper-root .MuiSelect-select')
      .eq(4)
      .click();
    cy.get('[role="listbox"]').contains('Bulanan').click();
  });
});