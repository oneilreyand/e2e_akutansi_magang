describe("Limit Input -> Batasi panjang karakter atau jumlah data sesuai batasan seperti diskon, pajak, harga bayar", () => {
  beforeEach(() => {
    cy.apiLogin("jodica23si@mahasiswa.pcr.ac.id", "12345678");
    cy.visitDashboard("b1e0a510-c451-11f0-a063-db13fc9e471b");
  });
  const penjualan = "https://dev-cashbook.assist.id/admin/sales";
  const pengaturan = "https://dev-cashbook.assist.id/admin/settings";
  it("Validasi batas input pajak pada halaman Pengaturan Pajak", () => {
    cy.visit(pengaturan);
    cy.contains("span", "Pengaturan Pajak").click();
    cy.contains("button", "Tambah Pajak").click();
    cy.get("#tax_effective_percentage")
      .focus()
      .type("110", { force: true })
      .should("not.have.value", "110%");
  });

  it.only("Validasi batas maksimum input harga bayar per produk", () => {
    cy.visit(penjualan);
    cy.get("img.svelte-7gdhvy").click();
    cy.contains("button", "Penjualan Baru").click();
    cy.get(
      '[data-testid="input-penjualan.0.product_id"] > .MuiInputBase-root'
    ).click();
    cy.get(".MuiAutocomplete-popper li", { timeout: 10000 }).first().click();

    cy.get('input[value="Rp 130.000"]')
      .first()
      .click({ force: true })
      .clear()
      .type("1000000000000000,1", { force: true })
      .should(($input) => {
        // Validasi panjang value, bukan jumlah element
        const value = $input.val().replace(/[^\d]/g, "");
        expect(value.length).to.be.at.most(17);
      });
  });
});
