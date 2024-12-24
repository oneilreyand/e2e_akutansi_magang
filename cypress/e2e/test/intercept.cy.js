describe('Metode request untuk Login Request', () => {
  
    it('should test API login dengan respons 401 menggunakan intercept', () => {
      // Data login yang valid sesuai dengan struktur API
      cy.visit('https://cashflow.assist.id');
  
      // Intercept permintaan POST ke API login dengan endpoint yang sesuai
      cy.intercept('POST', 'https://api-cashflow.assist.id/api/login', {
        statusCode: 500, // Mock respons dengan status 401 (Unauthorized)
        body: {
          message: 'GABISA MASUK LU NYET' // Pesan error yang ditampilkan saat login gagal
        }
      }).as('loginRequest')
  
      // Ketik email yang valid
      cy.get('#email')
        .should('be.visible')
        .type('rayhanrayandra.work.id@gmail.com')
  
      // Ketik password yang valid
      cy.get('#password')
        .should('be.visible')
        .type('Nz6}+#8y')
  
      // Klik tombol login
      cy.get('[data-testid="login-submit-button"]')
        .should('be.enabled')
        .click()
  
      // Tunggu permintaan yang sudah di-intercept
      cy.wait('@loginRequest').then((interception) => {
        // Verifikasi bahwa payload request sesuai dengan struktur API yang diharapkan
        expect(interception.request.body).to.deep.equal({
          email: 'rayhanrayandra.work.id@gmail.com',
          password: 'Nz6}+#8y',
          rememberMe: false
        })
  
        // Verifikasi bahwa status code respons adalah 401 seperti yang di-intercept
        expect(interception.response.statusCode).to.equal(500)
        
        // Verifikasi bahwa pesan error sesuai dengan respons yang dikembalikan
        expect(interception.response.body).to.have.property('message', 'GABISA MASUK LU NYET')
      })
  
      // Verifikasi bahwa tombol login tetap terlihat dan pesan error sesuai ditampilkan
      cy.get('.MuiAlert-message') // Selector tombol login yang sama
        .should('be.visible')
        .and('contain', 'Login failed')
  
    })
  })
  