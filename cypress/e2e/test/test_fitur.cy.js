describe('template spec', () => {
    it.only('Test halaman login jika alamat email kosong', () => {
        cy.visit('https://cashflow.assist.id/')
        cy.get('#email')
            .should('be.visible')
            .clear()
            cy.get('[data-testid="login-submit-button"]')
            .click()
            
    })

    it('Test halaman login jika password kosong', () => {
        cy.visit('https://cashflow.assist.id/')
        cy.get('#password')
            .should('be.visible')
            .clear()
    })
  })