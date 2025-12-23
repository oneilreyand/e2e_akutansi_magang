describe("Functional Tab -> Menampilkan jumlah penjualan Belum Dibayar, Telat Bayar, dan Pembayaran 30 hari terakhir pada halaman penjualan", () => {
  beforeEach(() => {
    cy.apiLogin("jodica23si@mahasiswa.pcr.ac.id", "12345678");
    cy.visitDashboard("b1e0a510-c451-11f0-a063-db13fc9e471b");
  });

  const penjualan = "https://dev-cashbook.assist.id/admin/sales";

  it("Sistem menampilkan jumlah penjualan yang Belum Dibayar pada kartu ringkasan", () => {
    cy.intercept("GET", "**/api/penjualan/overview*", {
      statusCode: 200,
      body: {
        belumDibayar: {
          total: 1,
          nominal: 50000,
        },
      },
    }).as("getBelumDibayar");
    cy.visit(penjualan);
    cy.wait("@getBelumDibayar");
    cy.contains("p", "Belum Dibayar")
      .closest(".MuiCard-root")
      .within(() => {
        cy.get(".MuiBadge-badge").should("not.contain", "0");
        cy.get(".MuiTypography-h5").should("not.contain", "Rp 0");
      });
  });

  it.only("Sistem menampilkan jumlah penjualan yang Telat Dibayar pada kartu ringkasan", () => {
    cy.intercept("GET", "**/api/penjualan/overview*", {
      statusCode: 200,
      body: {
        telatBayar: {
          total: 99,
          nominal: 130000,
        },
      },
    }).as("getTelatDibayar");
    cy.visit(penjualan);
    cy.wait("@getTelatDibayar");
    cy.contains("p", "Telat Dibayar")
      .closest(".MuiCard-root")
      .within(() => {
        cy.get(".MuiBadge-badge")
          .should("not.contain", "0")
          .and("not.contain", "+");
        cy.get(".MuiTypography-h5").should("not.contain", "Rp 0");
      });
  });

  it.only("Sistem menampilkan jumlah penjualan yang Pelunasan Diterima (30 Hari Terakhir) pada kartu ringkasan", () => {
    cy.intercept("GET", "**/api/penjualan/overview*", {
      statusCode: 200,
      body: {
        pelunasanDiterima: {
          total: 100,
          nominal: 43000,
        },
      },
    }).as("getPelunasanDiterima");
    cy.visit(penjualan);
    cy.wait("@getPelunasanDiterima");
    cy.contains("p", "Pelunasan Diterima (30 Hari Terakhir)")
      .closest(".MuiCard-root")
      .within(() => {
        cy.get(".MuiBadge-badge")
          .should("not.contain", "0")
          .and("contain", "99+");
        cy.get(".MuiTypography-h5").should("not.contain", "Rp 0");
      });
  });

  it("Sistem tidak menampilkan jumlah penjualan yang Belum Dibayar, jika penjualan tersebut telah dibayar lunas", () => {
    cy.intercept("GET", "**api/penjualan/overview*", {
      body: {
        belumDibayar: {
          total: 0,
          nominal: 0,
        },
      },
    }).as("getEmptyBelumDibayar");
    cy.visit(penjualan);
    cy.wait("@getEmptyBelumDibayar");
    cy.contains("p", "Belum Dibayar")
      .closest(".MuiCard-root")
      .within(() => {
        // cy.get(".MuiBadge-badge").should("not.exist");
        cy.get(".MuiTypography-h5").should("contain", "Rp").and("contain", "0");
      });
  });

  it("Sistem tidak menampilkan jumlah penjualan yang Telat Dibayar, jika penjualan tersebut dilunasi sebelum jatuh tempo", () => {
    cy.intercept("GET", "**api/penjualan/overview*", {
      body: {
        telatBayar: {
          total: 0,
          nominal: 0,
        },
      },
    }).as("getEmptyTelatDibayar");
    cy.visit(penjualan);
    cy.wait("@getEmptyTelatDibayar");
    cy.contains("p", "Telat Dibayar")
      .closest(".MuiCard-root")
      .within(() => {
        // cy.get(".MuiBadge-badge").should("not.exist");
        cy.get(".MuiTypography-h5").should("contain", "Rp").and("contain", "0");
      });
  });

  it("Sistem tidak menampilkan jumlah penjualan yang Pelunasan Diterima (30 Hari Terakhir), jika pembayaran dilakukan lebih dari 30 hari yang lalu", () => {
    cy.intercept("GET", "**api/penjualan/overview*", {
      body: {
        pelunasanDiterima: {
          total: 0,
          nominal: 0,
        },
      },
    }).as("getPelunasanDiterima");
    cy.visit(penjualan);
    cy.wait("@getPelunasanDiterima");
    cy.contains("p", "Pelunasan Diterima (30 Hari Terakhir)")
      .closest(".MuiCard-root")
      .within(() => {
        // cy.get(".MuiBadge-badge").should("not.exist");
        cy.get(".MuiTypography-h5").should("contain", "Rp").and("contain", "0");
      });
  });
});
