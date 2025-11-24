describe('Penjualan - Pencarian Sederhana', () => {
  beforeEach(() => {
    cy.request({
      method: 'POST',
      url: 'https://api-uat-cashbook.assist.id/api/login',
      body: {
        email: 'raska23si@mahasiswa.pcr.ac.id',
        password: '12345678'
      },
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      const token = response.body.token;
      window.sessionStorage.setItem('token', token);
      window.localStorage.setItem('token', token);
    });

    cy.visit('https://uat-cashbook.assist.id/admin/sales');
    cy.get('.qcw-trigger-btn > .svelte-7gdhvy').click();
    cy.get('.MuiTableContainer-root', { timeout: 10000 }).should('be.visible');
  });

  it('Pencarian dengan berbagai keyword', () => {
    // Pencarian "Jojo"
    cy.get('.css-20tnkx > .MuiFormControl-root > .MuiInputBase-root')
      .type('Jojo');
    cy.wait(2000);

    // Pencarian "int"
    cy.get('.css-20tnkx > .MuiFormControl-root > .MuiInputBase-root')
      .clear()
      .type('int');
    cy.wait(2000);

    // Pencarian "IN/0020"
    cy.get('.css-20tnkx > .MuiFormControl-root > .MuiInputBase-root')
      .clear()
      .type('IN/0020');
    cy.wait(2000);
  });
});