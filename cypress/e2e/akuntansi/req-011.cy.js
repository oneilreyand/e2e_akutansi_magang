describe("Label & Placeholder Validation -> Penulisan label, placeholder, dan komponen UI harus valid", () => {
  beforeEach(() => {
    cy.apiLogin("jodica23si@mahasiswa.pcr.ac.id", "12345678");
    cy.visitDashboard("b1e0a510-c451-11f0-a063-db13fc9e471b");
  });
  const penjualan = "https://dev-cashbook.assist.id/admin/sales";
  it("Validasi label dan placeholder pada halaman Penjualan", () => {
    cy.visit(penjualan);
    cy.get("img.svelte-7gdhvy").click();
    cy.contains("button", "Penjualan Baru").click();

    // Validasi basic - pastikan semua field penting ada
    cy.contains("legend", "Nomor").should("exist");
    cy.contains("legend", "Nama Pelanggan").should("exist");
    cy.contains("legend", "Tgl Transaksi").should("exist");
    cy.contains("legend", "Jatuh Tempo").should("exist");
    cy.contains("legend", "Syarat Pembayaran").should("exist");
    cy.contains("legend", "Alamat Penagihan").should("exist");
    cy.contains("legend", "Nama Produk").should("exist");

    // Validasi placeholder
    cy.get("#idPelanggan").should("exist");
    cy.get('input[placeholder*="DD/MM/YYYY"]').should("exist");
    cy.get("#paymentTerms").should("exist");
    cy.get("#address-label").should("exist");
    // cy.get("#penjualan.0.product_id").should("exist");
  });

  it("Validasi komponen UI field input dan tombol", () => {
    cy.visit(penjualan);
    cy.get("img.svelte-7gdhvy").click();
    cy.contains("button", "Penjualan Baru").click();

    // Validasi dasar - semua komponen utama ada
    cy.get("input").should("have.length.at.least", 3);
    cy.get("button").should("have.length.at.least", 2);
    cy.get("textarea, select").should("exist");

    // Validasi tombol aksi
    cy.contains("button", "Simpan").should("exist");
    cy.contains("button", "Batalkan").should("exist");
  });
});
