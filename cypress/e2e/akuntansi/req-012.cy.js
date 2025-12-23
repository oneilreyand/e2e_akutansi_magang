describe("Populate Dropdown -> Menampilkan data pelanggan, produk, salesman dari API", () => {
  beforeEach(() => {
    cy.apiLogin("jodica23si@mahasiswa.pcr.ac.id", "12345678");
    cy.visitDashboard("b1e0a510-c451-11f0-a063-db13fc9e471b");
  });
  const penjualan = "https://dev-cashbook.assist.id/admin/sales";
  it.only("Sistem menampilkan daftar pelanggan dari API pada halaman Penjualan Baru", () => {
    const mockPelanggan = {
      totalData: 3,
      results: [
        { id: "1", nama: "Pelanggan A" },
        { id: "2", nama: "Pelanggan B" },
        { id: "3", nama: "Pelanggan C" },
      ],
    };
    // Intercept API yang lebih spesifik - mungkin ada parameter search
    cy.intercept("GET", "**/api/kontak/list**", {
      statusCode: 200,
      body: mockPelanggan,
    }).as("getKontak");
    cy.visit(penjualan);
    cy.get("img.svelte-7gdhvy").click();
    cy.contains("button", "Penjualan Baru").click();
    // Klik dropdown dulu, baru tunggu API call
    cy.get("#idPelanggan").click();
    // Tunggu API call setelah dropdown diklik
    cy.wait("@getKontak");
    // Validasi dropdown dengan data
    cy.get(".MuiAutocomplete-popper", { timeout: 10000 })
      .should("be.visible")
      .within(() => {
        cy.get("li").should("have.length", 4); //expectnya 4 karena + 1 tombol Tambah Pelanggan Baru (3 kontak + 1 Tambah Pelanggan Baru)
        cy.contains("Pelanggan A").should("exist");
      });
  });
});
