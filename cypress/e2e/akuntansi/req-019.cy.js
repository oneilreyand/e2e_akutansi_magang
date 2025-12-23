describe("Create New Penjualan -> Menyimpan data penjualan baru (form berhasil dikirim)", () => {
  beforeEach(() => {
    cy.apiLogin("jodica23si@mahasiswa.pcr.ac.id", "12345678");
    cy.visitDashboard("b1e0a510-c451-11f0-a063-db13fc9e471b");
  });

  const penjualan = "https://dev-cashbook.assist.id/admin/sales";
  it("Sistem berhasil menyimpan data penjualan baru ketika seluruh field wajib telah diisi dengan benar", () => {
    cy.visit(penjualan);
    cy.get("img.svelte-7gdhvy").click();
    cy.contains("Button", "Penjualan Baru").click();
    cy.get('[data-testid="input-idPelanggan"] > .MuiInputBase-root').click();
    cy.get(".MuiAutocomplete-popper li").first().click();
    cy.get("#address").click().type("Pekanbaru");
    cy.get(
      '[data-testid="input-penjualan.0.product_id"] > .MuiInputBase-root'
    ).click();
    cy.get(".MuiAutocomplete-popper li").first().click();
    cy.contains("button", "Konfirmasi Simpan").click();
    cy.contains("button", "Lanjutkan").click();
    cy.contains("Penjualan berhasil ditambahkan").should("exist");
    cy.get("table tbody tr:first").should("contain", "24/11/25");
  });
});
