describe("Required Input Validation -> Field wajib harus diisi agar form penjualan dapat dikirim", () => {
  beforeEach(() => {
    cy.apiLogin("jodica23si@mahasiswa.pcr.ac.id", "12345678");
    cy.visitDashboard("b1e0a510-c451-11f0-a063-db13fc9e471b");
  });
  const penjualan = "https://dev-cashbook.assist.id/admin/sales";
  it("Sistem menampilkan error saat menekan tombol Konfirmasi Simpan, ketika field required tidak diisi", () => {
    cy.visit(penjualan);
    cy.get("img.svelte-7gdhvy").click();
    cy.contains("button", "Penjualan Baru").click();

    // Klik Simpan tanpa isi field required
    cy.contains("button", "Konfirmasi Simpan").click();
    cy.contains("button", "Lanjutkan").click();

    // Validasi error messages muncul
    cy.contains(/harus diisi|harus dipilih|/).should("be.visible");

    // Validasi field utama punya error state
    cy.contains("Mohon periksa kembali form").should("exist");
  });
});
