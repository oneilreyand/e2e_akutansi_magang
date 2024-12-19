describe('Login Page', () => {
    
    it('Jika alamat email kosong muncul warning bahwa email required', () => {
        cy.visit('https://cashflow.assist.id/')
        cy.get('#email')
            .should('be.visible')
            .clear()
        cy.get('[data-testid="login-submit-button"]')
            .click()
        cy.get('#email-helper-text')
            .should("be.visible")
            .contains('Email adalah bidang yang diperlukan')
            
    })

    it('Jika password kosong muncul warning bahwa password required', () => {
        cy.visit('https://cashflow.assist.id/')
        cy.get('#password')
            .should('be.visible')
            .clear()
        cy.get('[data-testid="login-submit-button"]')
            .click()
        cy.get('#password-helper-text')
            .should("be.visible")
            .contains('Password adalah bidang yang diperlukan')       
    })

    it('Jika alamat email di isi dengan domain yang tidak valid maka muncul warning alamat email harus valid', () => {
        cy.visit('https://cashflow.assist.id/')
        cy.get('#email')
            .should('be.visible')
            .type('invalidEmail')
        cy.get('[data-testid="login-submit-button"]')
            .click()
        cy.get('#email-helper-text')
            .should("be.visible")
            .contains('Email harus menjadi email yang valid')
            
    })

    it('Jika alamat email di isi dengan domain yang valid namun password kosong maka muncul warning bahwa password required', () => {
        cy.visit('https://cashflow.assist.id/')
        cy.get('#email')
            .should('be.visible')
            .type('validEmail@gmail.com')
        cy.get('[data-testid="login-submit-button"]')
            .click()
        cy.get('#password-helper-text')
            .should("be.visible")
            .contains('Password adalah bidang yang diperlukan')    
            
    })

    it('Jika alamat email di isi dengan domain yang valid dan password di isi namun password salah maka muncul warning bahwa password required', () => {
        cy.visit('https://cashflow.assist.id/')
        cy.get('#email')
            .should('be.visible')
            .type('validEmail@gmail.com')
        cy.get('#password')
            .should('be.visible')
            .type('1234567890')
        cy.get('[data-testid="login-submit-button"]')
            .click()
        cy.get('.MuiAlert-message')
            .should('be.visible')  
            
    })

    // it.only('Fitur sembunyikan password bila di tekan iconnya akan berubah ', () => {
    //     cy.visit('https://cashflow.assist.id/')
    //     cy.get('.MuiInputAdornment-root > .MuiButtonBase-root')
    //         .click()
    //     cy.get('.MuiInputAdornment-root > .MuiButtonBase-root')
    //         .should('have.attr', 'data-testid', 'VisibilityIcon')

            
    })

    it.only('Fitur sembunyikan password bila ditekan, akan memperlihatkan password', () => {
        cy.visit('https://cashflow.assist.id/');
        cy.get('#password')
            .click();
        cy.get('#password')
            .type('asal123')
            .should('have.attr', 'type', 'password');
        cy.wait(1000)
        cy.get('.MuiInputAdornment-root > .MuiButtonBase-root')
            .click();
        cy.get('#password')
            .should('have.attr', 'type', 'text');
    })
    
            
  })