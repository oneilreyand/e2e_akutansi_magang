// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
import "cypress-localstorage-commands";
// -- This is a parent command --
Cypress.Commands.add('loginWithUI', (email, password) => {
    cy.visit('https://cashflow.assist.id/')

    cy.get('#email')
        .type(email)
    cy.get('#password')
        .type(password)
    cy.get('[data-testid="login-submit-button"]')
        .click()

    cy.url()
        .should('eq', 'https://cashflow.assist.id/admin/dashboard')
})

Cypress.Commands.add('loginWithAPI', (email, password) => {
    cy.request({
        method: 'POST',
        url: 'https://cashflow.assist.id/api/login',
        body: { email, password }
            })
        .then((response) => {
    cy.setCookie('authToken', response.body.token);
    });
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })