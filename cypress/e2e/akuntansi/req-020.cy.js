describe("Detail View -> Menampilkan detail invoice, pelanggan, dan transaksi penjualan", () => {
  beforeEach(() => {
    cy.apiLogin("jodica23si@mahasiswa.pcr.ac.id", "12345678");
    cy.visitDashboard("b1e0a510-c451-11f0-a063-db13fc9e471b");
  });

  const penjualan = "https://dev-cashbook.assist.id/admin/sales";
  it("Sistem menampilkan detail invoice saat pengguna menekan kolom Nomor pada tabel Penjualan", () => {
    cy.visit(penjualan);
    cy.get("img.svelte-7gdhvy").click();
    cy.contains("button", "INV/0006").click();
    cy.get("h5", "Detail Penjualan").should("exist");
  });
  it("Sistem menampilkan detail pelanggan saat pengguna menekan kolom Nama Pelanggan pada tabel Penjualan", () => {
    cy.visit(penjualan);
    cy.get("img.svelte-7gdhvy").click();
    cy.get("table tbody tr:first-child").contains("Rayhan").click();
    cy.get("h5", "Detail Kontak").should("exist");
  });
  it("Sistem menampilkan detail transaksi pembayaran saat pengguna menekan Nomor Transaksi pada tabel riwayat pembayaran di halaman detail invoice", () => {
    cy.visit(penjualan);
    cy.get("img.svelte-7gdhvy").click();
    cy.get("h5", "Detail Kontak").should("exist");
    cy.contains("button", "INV/0004").click();
    cy.contains("button", "PJINV/0003").click();
    cy.get("h5", "Detail Pembayaran").should("exist");
  });
});
