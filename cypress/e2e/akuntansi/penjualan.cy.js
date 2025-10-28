describe("Menu Penjualan", () => {
  beforeEach(() => {
    cy.visit("https://uat-cashbook.assist.id/");
    cy.get("#email").type("jodica23si@mahasiswa.pcr.ac.id");
    cy.get("#password").type("12345678");
    cy.get('[data-testid="login-submit-button"]').click();
  });

  // it('Berhasil akses halamanan Penjualan', () => {
  //     cy.wait(5000)
  //     cy.get('.MuiTypography-h5 > span').should('be.visible')
  // })

  it("Tidak ada data yang ditampilkan", () => {
    // https://api-uat-cashbook.assist.id/api/penjualan/overview?companyId=ab78f6b2-afdd-11f0-9aae-9bbc0c8b2cba
    cy.intercept("GET", "**/api/penjualan*").as("getPenjualan");
    cy.contains("span", "Penjualan").click();
    cy.wait("@getPenjualan").its("response.statusCode").should("eq", 200);
    cy.contains("p", "Menampilkan 0 - 0 dari 0 data").should("be.visible");
  });

  it.only("get element sulit", () => {
    // cy.visit('https://uat-cashbook.assist.id/admin/sales/create')
    cy.get('[data-testid="drawer-item-sales"]').click();
    cy.contains("Penjualan Baru").click();
    cy.get(":nth-child(5) > .MuiGrid2-container > :nth-child(2)").should(
      "have.text",
      "Rp 0"
    );
  });
});
