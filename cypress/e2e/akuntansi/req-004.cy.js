describe("Breadcrumbs Navigator -> Navigasi breadcrumb di halaman Penjualan, Penjualan Baru, Detail Penjualan, Transaksi, dan Pembayaran", () => {
  beforeEach(() => {
    cy.apiLogin("jodica23si@mahasiswa.pcr.ac.id", "12345678");
    cy.visitDashboard("b1e0a510-c451-11f0-a063-db13fc9e471b");
  });

  const penjualan = "https://dev-cashbook.assist.id/admin/sales";
  const dashboard = "https://dev-cashbook.assist.id/admin/dashboard";

  it("Sistem menampilkan breadcrumb Penjualan ketika berada di halaman Penjualan", () => {
    cy.visit(dashboard);
    cy.get('a[href="/admin/sales"]').click();
    cy.get(".MuiBreadcrumbs-root")
      .should("contain", "Beranda")
      .and("contain", "/")
      .and("contain", "Penjualan");
  });

  it.only("Sistem menampilkan breadcrumb Penjualan Baru ketika berada di halaman Penjualan Baru", () => {
    cy.visit(penjualan);
    cy.contains("button", "Penjualan Baru").click();
    cy.get(".MuiBreadcrumbs-root")
      .should("contain", "Beranda")
      .and("contain", "/")
      .and("contain", "Penjualan")
      .and("contain", "/")
      .and("contain", "Penjualan Baru");
  });

  it.only("Sistem menampilkan breadcrumb Detail Penjualan ketika berada di halaman Detail Penjualan", () => {
    cy.visit(penjualan);
    cy.get('button:contains("INV/")').first().click();
    cy.get(".MuiBreadcrumbs-root")
      .should("contain", "Beranda")
      .and("contain", "/")
      .and("contain", "Penjualan")
      .and("contain", "/")
      .and("contain", "Detail Penjualan");
  });
});
