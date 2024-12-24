describe('Login Test', () => {
    it('should return 500 when the server fails', () => {
      // Menggunakan intercept untuk memodifikasi request
      cy.intercept('POST', 'https://cashflow.assist.id/auth/login', (req) => {
        cy.log("testing")
        req.reply({
          statusCode: 500,
          body: { message: 'Internal Server Error' }
        });
      }).as('loginRequest');
    
      // Mengunjungi halaman login
      cy.visit('https://cashflow.assist.id/auth/login');
      
      // Mengisi form login dengan data valid
      cy.get('#email').type('damaresya947@gmail.com');
      cy.get('#password').type('12345678');
      cy.get('[data-testid="login-submit-button"]').click();
      
      // Tunggu intercept request dan verifikasi status code
      cy.wait('@loginRequest').then((interception) => {
        // Pastikan intercept berhasil dan status code yang diterima adalah 500
        expect(interception.response.statusCode).to.eq(500);
      });
      
      // Verifikasi UI menampilkan pesan error
      cy.get('.error-message').should('contain', 'Internal Server Error');
    });
  });
  