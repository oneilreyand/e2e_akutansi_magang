describe('Login Test', () => {
  it('Success Login', () => {
    cy.visit('https://practicetestautomation.com/')
    cy.get('#menu-item-20').click()
    cy.contains('a','Test Login Page').click()
    cy.get('#username').type('student')
    cy.get('#password').type('Password123')
    cy.get('#submit').click()
    cy.get('h1.post-title').should('contain', 'Logged In Successfully')
  })

  it('Negative Username Test', () => {
    cy.visit('https://practicetestautomation.com/')
    cy.get('#menu-item-20').click()
    cy.contains('a','Test Login Page').click()
    cy.get('#username').type('incorrectUser')
    cy.get('#password').type('Password123')
    cy.get('#submit').click()
    cy.get('#error').should('contain', 'Your username is invalid')
  })

  it('Negative Password Test', () => {
    cy.visit('https://practicetestautomation.com/')
    cy.get('#menu-item-20').click()
    cy.contains('a','Test Login Page').click()
    cy.get('#username').type('student')
    cy.get('#password').type('incorrectPassword')
    cy.get('#submit').click()
    cy.get('#error').should('contain', 'Your password is invalid')
  })
})