describe("Add/Drop Product Field -> Menambah atau menghapus baris produk pada form penjualan", () => {
  beforeEach(() => {
    cy.apiLogin("jodica23si@mahasiswa.pcr.ac.id", "12345678");
    cy.visitDashboard("b1e0a510-c451-11f0-a063-db13fc9e471b");
  });

  const penjualan = "https://dev-cashbook.assist.id/admin/sales";
  it("Sistem memungkinkan user menambah dan menghapus baris produk pada form penjualan", () => {
    cy.visit(penjualan);
    cy.get("img.svelte-7gdhvy").click();
    cy.contains("button", "Penjualan Baru").click();
    cy.contains("button", "Baris Baru").click();
    cy.get("tbody tr").should("have.length", 3);
    cy.get("tbody tr:nth-last-child(2)")
      .find('[aria-label="Hapus baris"]')
      .click();
    cy.get("tbody tr").should("have.length", 2);
  });
});
