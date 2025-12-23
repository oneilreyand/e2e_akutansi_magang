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
Cypress.Commands.add("apiLogin", (email, password) => {
  cy.request({
    method: "POST",
    url: "https://api-dev-cashbook.assist.id/api/login",
    headers: {
      "Content-Type": "application/json",
    },
    body: { email, password },
  }).then((response) => {
    expect(response.status).to.eq(200);
    const token = response.body.token;
    cy.setCookie("token", token);
    window.localStorage.setItem("token", token);
  });
});

Cypress.Commands.add("visitDashboard", (companyId) => {
  cy.visit("https://dev-cashbook.assist.id/admin/dashboard", {
    timeout: 20000,
  });
  if (companyId) {
    cy.get('[data-testid="listCompany-dropdown"]', { timeout: 20000 }).click();

    cy.get(`[data-testid="listCompany-item-${companyId}"]`, {
      timeout: 20000,
    }).click();
  }
});

Cypress.Commands.add("waitForNetworkIdle", (idleTime = 5000) => {
  let timeout;
  let pendingRequests = 0;

  const finish = () => {
    if (pendingRequests === 0) return true;
  };

  cy.window().then((win) => {
    win.XMLHttpRequest.prototype.realOpen = win.XMLHttpRequest.prototype.open;

    win.XMLHttpRequest.prototype.open = function (...args) {
      pendingRequests++;
      this.addEventListener("loadend", () => {
        pendingRequests--;
      });
      return this.realOpen(...args);
    };
  });

  return cy.wrap(null).should(() => finish());
});
