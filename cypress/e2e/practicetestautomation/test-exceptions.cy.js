describe('Test Exceptions', () => {
  it('NoSuchElementException', () => {
    cy.visit('https://practicetestautomation.com/')
    cy.get('#menu-item-20').click()
    cy.contains('a','Test Exceptions').click()
    cy.get('#add_btn').click()
    cy.get('#row2 .input-field', { timeout: 10000 }).should('exist').and('be.visible')
  })

//   it('ElementNotInteractableException', () => {
//     cy.visit('https://practicetestautomation.com/')
//     cy.get('#menu-item-20').click()
//     cy.contains('a','Test Exceptions').click()
//     cy.get('#add_btn').click()
//     cy.get('#row2 .input-field', { timeout: 10000 }).should('exist').and('be.visible').type('Apple')
//     cy.get('#save_btn', { timeout: 10000 }).should('be.visible').click()
//     cy.get('#confirmation').should('contain', 'Row 2 was saved')
//   })
})