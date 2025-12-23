describe("User Authentication -> Hanya user login yang bisa mengakses halaman penjualan", () => {
  beforeEach(() => {
    cy.apiLogin("jodica23si@mahasiswa.pcr.ac.id", "12345678");
    cy.visitDashboard("b1e0a510-c451-11f0-a063-db13fc9e471b");
  });

  const penjualan = "https://dev-cashbook.assist.id/admin/sales";
  it("Sistem mengizinkan pengguna yang sudah login untuk mengakses halaman Penjualan", () => {
    // Akses halaman Penjualan
    cy.visit(penjualan);
    cy.get("img.svelte-7gdhvy").click();

    // Validasi berhasil akses
    cy.url().should("include", "/sales");
    cy.get("table").should("be.visible");
  });

  it("Sistem mengarahkan pengguna ke halaman login ketika mencoba mengakses halaman Penjualan tanpa login", () => {
    // Clear semua authentication data
    cy.clearCookies();
    cy.clearLocalStorage();

    // Coba akses halaman Penjualan tanpa login
    cy.visit(penjualan, { failOnStatusCode: false });

    // Validasi di-redirect ke login
    cy.url().should("include", "/login");
    cy.contains("button", "Masuk").should("exist");
  });
});
