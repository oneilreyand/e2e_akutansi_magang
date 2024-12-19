describe('test website cashflow assist id', () => {
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
            .type('tes tign@emailcom')
        cy.get('[data-testid="login-submit-button"]')
            .click()
        cy.get('#password-helper-text')
            .should('be.visible')
            .and('contain', 'Password adalah bidang yang diperlukan')
    })
    // test case 3
    it.only('ketika tidak mengisi apapun', () => {
        cy.get('#email').should('be.visible')
        cy.get('[data-testid="login-submit-button"]').should('be.visible').click()
        cy.get('#email-helper-text').contains('Email adalah bidang yang diperlukan')
        cy.get('#password-helper-text').contains('Password adalah bidang yang diperlukan')
    })
})