describe("View Attachments -> Melihat dokumen lampiran pada halaman detail penjualann", () => {
  beforeEach(() => {
    cy.apiLogin("jodica23si@mahasiswa.pcr.ac.id", "12345678");
    cy.visitDashboard("b1e0a510-c451-11f0-a063-db13fc9e471b");
  });

  const penjualan = "https://dev-cashbook.assist.id/admin/sales";
  it("Sistem menampilkan dokumen lampiran pada halaman detail penjualan", () => {
    cy.visit(penjualan);
    cy.get("img.svelte-7gdhvy").click();
    cy.get("table tbody tr").contains("INV/0007").click();
    cy.contains("h6", "Lampiran").should("exist");
    cy.get('img[alt*=".png"]')
      .should("exist")
      .and("be.visible")
      .and("have.attr", "src")
      .and("not.be.empty");
  });

  it('Sistem menampilkan pesan "-" ketika data penjualan tidak memiliki dokumen lampiran', () => {
    cy.visit(penjualan);
    cy.get("img.svelte-7gdhvy").click();
    cy.get("table tbody tr").contains("INV/0006").click();
    cy.contains("h6", "Lampiran")
      .parent() // Ke MuiListItemText-root
      .find("p.MuiTypography-body2")
      .should("contain", "-");
  });
});
