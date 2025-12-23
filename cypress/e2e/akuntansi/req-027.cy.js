describe("Status Jatuh Tempo sehari sebelum termin habis -> Pada halaman pembelian status jatuh tempo di set sehari sebelum termin habis", () => {
  beforeEach(() => {
    cy.apiLogin("jodica23si@mahasiswa.pcr.ac.id", "12345678");
    cy.visitDashboard("b1e0a510-c451-11f0-a063-db13fc9e471b");
  });

  const penjualan = "https://dev-cashbook.assist.id/admin/sales";
  it.only(`Sistem menampilkan status "Jatuh Tempo" ketika tanggal transaksi sama dengan atau sebelum tanggal hari ini`, () => {
    cy.intercept("GET", "**api/penjualan**", {
      body: {
        totalData: 0,
        results: [],
      },
    }).as("getPenjualan");
    cy.visit(penjualan);
    cy.get("img.svelte-7gdhvy").click();
    cy.wait("@getPenjualan");
    cy.contains("button", "Penjualan Baru").click();

    // Coba ketik sesuatu di input
    cy.get("#idPelanggan").type("Jodica");
    // Tunggu dropdown muncul
    cy.get('li[role="option"]', { timeout: 10000 }).first().click();

    cy.get("#address").click().type("Pekanbaru");

    cy.get(
      '[data-testid="input-penjualan.0.product_id"] > .MuiInputBase-root'
    ).click();
    cy.get('li[role="option"]').first().click({ force: true });

    cy.contains("button", "Konfirmasi Simpan").click();
    cy.contains("button", "Lanjutkan").click();
    cy.get("table tbody tr:nth-child(1)")
      .should("have.length", 1)
      .should("contain", "Jatuh Tempo");
  });

  it(`Sistem menampilkan status "Belum Dibayar" pada tabel ketika tanggal transaksi setelah tanggal hari ini`, () => {
    cy.intercept("GET", "**api/penjualan**", {
      body: {
        totalData: 0,
        results: [],
      },
    }).as("getPenjualan");
    cy.visit(penjualan);
    cy.get("img.svelte-7gdhvy").click();
    cy.wait("@getPenjualan");
    cy.contains("button", "Penjualan Baru").click();
    cy.get('[data-testid="input-idPelanggan"] > .MuiInputBase-root').click();
    cy.get('svg[data-testid="CalendarIcon"]').first().click();
    cy.contains("button", "25").click();
    cy.get(".MuiAutocomplete-popper li").first().click();
    cy.get("#address").click().type("Pekanbaru");
    cy.get(
      '[data-testid="input-penjualan.0.product_id"] > .MuiInputBase-root'
    ).click();
    cy.get(".MuiAutocomplete-popper li").first().click();
    cy.contains("button", "Konfirmasi Simpan").click();
    cy.contains("button", "Lanjutkan").click();
    cy.get("table tbody tr:nth-child(1)")
      .should("have.length", 1)
      .should("contain", "Belum Dibayar");
  });
});
