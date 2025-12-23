describe("Price Adjustment -> Menyesuaikan harga per produk langsung di tabel", () => {
  beforeEach(() => {
    cy.apiLogin("jodica23si@mahasiswa.pcr.ac.id", "12345678");
    cy.visitDashboard("b1e0a510-c451-11f0-a063-db13fc9e471b");
  });
  const penjualan = "https://dev-cashbook.assist.id/admin/sales";
  it("Sistem menyesuaikan total harga secara otomatis saat user mengubah harga produk langsung di tabel", () => {
    cy.visit(penjualan);
    cy.get("img.svelte-7gdhvy").click();
    cy.contains("button", "Penjualan Baru").click();
    cy.get(
      '[data-testid="input-penjualan.0.product_id"] > .MuiInputBase-root'
    ).click();
    cy.get(".MuiAutocomplete-popper li").first().click();

    cy.get('[name="penjualan.0.price"]').click().type("{selectAll}50000");

    cy.contains("h6", "Rp 50.000").should("exist");
  });
});
