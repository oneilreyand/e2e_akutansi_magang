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
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
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

// menambahkan customc command untuk login
Cypress.Commands.add("loginWithUI", (email, password) => {
    cy.session([email, password], () => {
      cy.visit("https://cashflow.assist.id/auth/login");
      cy.get('#email').should('be.visible').type(email);
      cy.get('#password').should('be.visible').type(password);
      cy.get('[data-testid="login-submit-button"]').should('be.visible').click();
      cy.url().should('include', "https://cashflow.assist.id/admin/dashboard");
    });
  });