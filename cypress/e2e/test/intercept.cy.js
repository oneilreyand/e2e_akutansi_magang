describe('Intercept and Modify Login Request', () => {
    it('should modify the email in login request', () => {
      // Intercept request dan modifikasi properti email
      cy.intercept('POST', 'https://api-cashflow.assist.id/api/login', (req) => {
        // Pastikan body request ada sebelum memodifikasi
        if (req.body) {
          // Ubah properti email di body request
          req.body.email = 'rayhanrayandra.work.id@gmail.com',
          req.body.password = 'Nz6}+#8y';
        }
      }).as('modifiedLoginRequest');
  
      // Kunjungi halaman login
      cy.visit('https://cashflow.assist.id/');
  
      // Isi form login
      cy.get('#email').type('asep123@ayaayawae'); // Ganti selector sesuai aplikasi
      cy.get('#password').type('password123'); // Ganti selector sesuai aplikasi
      cy.get('[data-testid="login-submit-button"]').click(); // Ganti selector sesuai aplikasi
  
      // Tunggu permintaan login terjadi dan periksa data yang dimodifikasi
      cy.wait('@modifiedLoginRequest').then((interception) => {
        // Pastikan email telah diubah menjadi 'Asep123@123'
        expect(interception.request.body).to.have.property('email', 'rayhanrayandra.work.id@gmail.com')
        cy.log('berhasil')
  
        // Anda juga bisa memeriksa data lainnya, seperti password
        expect(interception.request.body).to.have.property('password', 'Nz6}+#8y');
      });
    });
  });
  