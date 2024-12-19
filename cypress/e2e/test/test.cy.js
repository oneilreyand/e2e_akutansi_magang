describe('test website cashflow assist id bagian login', () => {
    before(() => {
        cy.visit('https://cashflow.assist.id/')
    })
    // test case 1
    it('tes halaman login kalau email diisi tanpa password', () => {
        cy.get('#email')
            .should('be.visible')
            .type('testing@email.com')
        cy.get('[data-testid="login-submit-button"]')
            .click()
        cy.get('#password-helper-text')
            .should('be.visible')
            .and('contain', 'Password adalah bidang yang diperlukan')
    })
    // test case 2
    it('tes halaman login ketika email salah dalam penulisan', () => {
        cy.get('#email')
            .should('be.visible')
            .type('tes tignemailcom')
        cy.get('[data-testid="login-submit-button"]')
            .click()
        cy.get('#email-helper-text')
            .should('be.visible').contains("Email harus menjadi email yang valid")
    })
    // test case 3
    it('ketika tidak mengisi apapun', () => {
        cy.get('#email').should('be.visible')
        cy.get('[data-testid="login-submit-button"]')
            .should('be.visible')
            .click()
        cy.get('#email-helper-text')
            .contains('Email adalah bidang yang diperlukan')
            .should('be.visible')
        cy.get('#password-helper-text')
            .contains('Password adalah bidang yang diperlukan')
            .should('be.visible')
    })
    // test case 4
    it('ketika login menggunakan akun yang salah atau tidak ada', () => {
        cy.get('#email')
            .should('be.visible')
            .type("testing@email.com")
        cy.get('#password')
            .should('be.visible')
            .type("password")
        cy.get('[data-testid="login-submit-button"]')
            .should('be.visible')
            .click()
        cy.get('.MuiSnackbar-root > .MuiPaper-root')
            .should('be.visible')
            .contains('Login failed: Error: Account not found')
    })
    // test case 5
    it('ketika hanya mengisi password', () => {
        cy.get('#password')
            .should('be.visible')
            .type("password")
        cy.get('[data-testid="login-submit-button"]')
            .should('be.visible')
            .click()
        cy.get('#email-helper-text')
            .contains('Email adalah bidang yang diperlukan')
            .should('be.visible')
    })
    // test case 6
    it.only('memeriksa icon mata pada password', () => {
        cy.get('#password')
            .should('be.visible')
            .type('password')
        cy.get('[data-testid="VisibilityIcon"]', { timeout: 10000 })
            .should('be.visible')
            .click()
        cy.get('#password')
            .should('be.visible')
            .and('have.value', 'password')

    })
})