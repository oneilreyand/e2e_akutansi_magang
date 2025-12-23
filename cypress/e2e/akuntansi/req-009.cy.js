describe("Pagination -> Menampilkan pagination dan total data yang ditampilkan", () => {
  beforeEach(() => {
    cy.apiLogin("jodica23si@mahasiswa.pcr.ac.id", "12345678");
    cy.visitDashboard("b1e0a510-c451-11f0-a063-db13fc9e471b");
  });

  const penjualan = "https://dev-cashbook.assist.id/admin/sales";
  it("Sistem menampilkan pagination dan total data yang ditampilkan pada tabel Penjualan", () => {
    cy.intercept("GET", "**api/penjualan*", {
      body: {
        totalData: 100,
        results: [],
      },
    }).as("getPenjualan");
    cy.visit(penjualan);
    cy.wait("@getPenjualan");
    cy.get("img.svelte-7gdhvy").click();
    cy.get('button[aria-label="Go to next page"]').click();
    cy.contains("Menampilkan 11 - 20 dari 100 data").should("be.visible");
    cy.get('button[aria-label="Go to previous page"]').click();
    cy.contains("Menampilkan 1 - 10 dari 100 data").should("be.visible");
  });
});
