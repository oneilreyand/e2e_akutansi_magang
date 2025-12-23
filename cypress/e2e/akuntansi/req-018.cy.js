describe("Pricing Logic -> Perhitungan diskon, pajak, harga termasuk pajak, pemotongan harga, dan biaya pengiriman", () => {
  beforeEach(() => {
    cy.apiLogin("jodica23si@mahasiswa.pcr.ac.id", "12345678");
    cy.visitDashboard("b1e0a510-c451-11f0-a063-db13fc9e471b");
  });

  const penjualan = "https://dev-cashbook.assist.id/admin/sales";
  it("Sistem menghitung total harga penjualan berdasarkan diskon, pajak, harga termasuk pajak, pemotongan harga, dan biaya pengiriman dengan benar", () => {
    cy.visit(penjualan);
    cy.get("img.svelte-7gdhvy").click();
    cy.contains("Button", "Penjualan Baru").click();
    cy.get(
      '[data-testid="input-penjualan.0.product_id"] > .MuiInputBase-root'
    ).click();
    cy.get(".MuiAutocomplete-popper li").first().click();
    cy.get('[name="penjualan.0.price"]').click().type("{selectAll}1000000");
    cy.get('[name="penjualan.0.discount"]').click().type("{selectAll}10");
    cy.get(
      '[data-testid="input-penjualan.0.tax"] > .MuiInputBase-root'
    ).click();
    cy.contains("li", "PPN").click();
    cy.get('[name="deliveryFee"]').click().type("{selectAll}50000");
    cy.contains("h6", "Rp 1.049.000").should("exist");
  });
});
