describe("Read-Only Field -> Field total harga & tanggal jatuh tempo tidak dapat diedit manual", () => {
  beforeEach(() => {
    cy.apiLogin("jodica23si@mahasiswa.pcr.ac.id", "12345678");
    cy.visitDashboard("b1e0a510-c451-11f0-a063-db13fc9e471b");
  });

  const penjualan = "https://dev-cashbook.assist.id/admin/sales";
  it("Sistem tidak mengizinkan user mengedit field Total Harga dan Tanggal Jatuh Tempo secara manual", () => {
    cy.visit(penjualan);
    cy.get("img.svelte-7gdhvy").click();
    cy.contains("button", "Penjualan Baru").click();

    cy.get(
      '[data-testid="input-penjualan.0.product_id"] > .MuiInputBase-root'
    ).click();
    cy.get(".MuiAutocomplete-popper li").first().click();

    // Cukup validasi attribute disabled ada
    cy.get('[name="penjualan.0.total"]').should("have.attr", "disabled");
    cy.get('input[disabled][placeholder="DD/MM/YYYY"]').should(
      "have.attr",
      "disabled"
    );
  });
});
