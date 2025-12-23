describe("Limit Credit -> Tidak bisa menambahkan penjualan ketika melebihi saldo piutang", () => {
  beforeEach(() => {
    cy.apiLogin("jodica23si@mahasiswa.pcr.ac.id", "12345678");
    cy.visitDashboard("b1e0a510-c451-11f0-a063-db13fc9e471b");
  });

  const penjualan = "https://dev-cashbook.assist.id/admin/sales";
  it("Pelanggan tidak dapat menambahkan transaksi ketika limit kredit piutang telah mencapai batas maksimal", () => {});
});
