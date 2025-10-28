describe('Pengujian Laman Beranda Assist.id', () => {


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

  it('Menampilkan laman Kas & bank', () => {
    cy.get('[data-testid="drawer-item-cash-bank"]').click();
    cy.get('.MuiTypography-h5').should('contain.text', 'Kas & Bank');
    
    // Gunakan selektor yang lebih spesifik berdasarkan struktur
    cy.get('.MuiSelect-select > span').click();
    
    // Tunggu dropdown terbuka
    cy.get('ul[role="listbox"]').should('be.visible');
    
    // Pilih opsi pertama dari dropdown
    // cy.get('ul[role="listbox"] li').first().click();

    cy.get('.MuiSelect-select > span').click();

    // laman akun baru
    cy.get('[data-value="addNewAccountCashBank"]').click();

    cy.get('.MuiButton-default').contains('Batal').click();

    // cy.get('ul[role="listbox"] li').first().click();

    cy.get('.MuiSelect-select > span').click();
    
    cy.wait(10000);
  });
});