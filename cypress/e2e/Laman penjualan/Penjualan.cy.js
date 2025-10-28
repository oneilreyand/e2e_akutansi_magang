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


    it('manipulasi data penjualan', () => {
        // Intercept request GET /api/penjualan and manipulate response
        cy.intercept('GET', '**/api/penjualan**', {
        statusCode: 200,
        body: { totalData : 200, 
        results: [] }

        }).as('manipulasiPenjualan');
        cy.visit('https://uat-cashbook.assist.id/admin/sales');

    

  });
   
});