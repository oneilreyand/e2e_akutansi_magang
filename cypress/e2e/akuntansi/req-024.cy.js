describe("Unique Identifier -> Nomor invoice dan nomor transaksi tidak boleh duplikat", () => {
  beforeEach(() => {
    cy.apiLogin("jodica23si@mahasiswa.pcr.ac.id", "12345678");
    cy.visitDashboard("b1e0a510-c451-11f0-a063-db13fc9e471b");
  });
  const penjualan = "https://dev-cashbook.assist.id/admin/sales";
  it("Sistem tidak mengizinkan pembuatan penjualan baru dengan nomor invoice yang sudah ada", () => {
    cy.intercept("GET", "**api/penjualan**", {
      body: {
        totalData: 1,
        results: [
          {
            id: "1",
            nomor: "INV/0001",
          },
        ],
      },
    }).as("getPenjualan");
    // Visit Halaman Penjualan
    cy.visit(penjualan);
    cy.get("img.svelte-7gdhvy").click();

    // Buka Penjualan Baru
    cy.contains("buttons", "Penjualan Baru").click();
    cy.get("#nomor").type("INV/0001");
    cy.get('[data-testid="input-idPelanggan"] > .MuiInputBase-root').click();
    cy.get(".MuiAutocomplete-popper li").first().click();
    cy.get("#address").click().type("Pekanbaru");
    cy.get(
      '[data-testid="input-penjualan.0.product_id"] > .MuiInputBase-root'
    ).click();
    cy.get(".MuiAutocomplete-popper li").first().click();
    cy.contains("button", "Konfirmasi Simpan").click();
    cy.contains("button", "Lanjutkan").click();
    cy.contains(
      `Gagal menambahkan penjualan, "Nomor invoice INV/0001 sudah ada."`
    );
  });
});
