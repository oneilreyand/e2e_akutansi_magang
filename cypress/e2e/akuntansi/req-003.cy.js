describe("Empty State -> Menampilkan tabel data penjualan", () => {
  beforeEach(() => {
    cy.apiLogin("jodica23si@mahasiswa.pcr.ac.id", "12345678");
    cy.visitDashboard("b1e0a510-c451-11f0-a063-db13fc9e471b");
  });

  const penjualan = "https://dev-cashbook.assist.id/admin/sales";

  it.only('Sistem menampilkan pesan "Tidak ada data"  di tabel Penjualan pada tab Semua', () => {
    cy.intercept("GET", "**/api/penjualan*", {
      statusCode: 200,
      body: {
        totalData: 0,
        results: [],
      },
    }).as("getPenjualan");
    cy.visit(penjualan);
    cy.get("img.svelte-7gdhvy").click();
    cy.wait("@getPenjualan");
    cy.contains("Tidak ada data").should("exist");
  });

  it('Sistem menampilkan pesan "Tidak ada data"  di tabel Penjualan pada tab Belum Dibayar', () => {
    cy.intercept("GET", "**/api/penjualan*status=Belum+Dibayar*", {
      statusCode: 200,
      body: {
        totalData: 0,
        results: [],
      },
    }).as("getBelumDibayar");
    cy.visit(penjualan);
    cy.contains("Belum Dibayar").click();
    cy.wait("@getBelumDibayar");
    cy.contains("Tidak ada data").should("exist");
  });

  it('Sistem menampilkan pesan "Tidak ada data"  di tabel Penjualan pada tab Jatuh Tempo', () => {
    cy.intercept("GET", "**api/penjualan*status=Jatuh+Tempo*", {
      statusCode: 200,
      body: {
        totalData: 0,
        results: [],
      },
    }).as("getJatuhTempo");
    cy.visit(penjualan);
    cy.contains("Jatuh Tempo").click();
    cy.wait("@getJatuhTempo");
    cy.contains("Tidak ada data").should("exist");
  });

  it('Sistem menampilkan pesan "Tidak ada data"  di tabel Penjualan pada tab Lunas', () => {
    cy.intercept("GET", "**api/penjualan*status=Lunas*", {
      statusCode: 200,
      body: {
        totalData: 0,
        results: [],
      },
    }).as("getLunas");
    cy.visit(penjualan);
    cy.contains("Lunas").click();
    cy.wait("@getLunas");
    cy.contains("Tidak ada data").should("exist");
  });

  it('Sistem menampilkan pesan "Tidak ada data"  di tabel Penjualan pada tab Dibayar Sebagian', () => {
    cy.intercept("GET", "**api/penjualan*status=Dibayar+Sebagian*", {
      statusCode: 200,
      body: {
        totalData: 0,
        results: [],
      },
    }).as("getDibayarSebagian");
    cy.visit(penjualan);
    cy.contains("Dibayar Sebagian").click();
    cy.wait("@getDibayarSebagian");
    cy.contains("Tidak ada data").should("exist");
  });

  it('Sistem menampilkan pesan "Tidak ada data"  di tabel Penjualan pada tab Lunas', () => {
    cy.intercept("GET", "**api/penjualan*status=Lunas*", {
      statusCode: 200,
      body: {
        totalData: 0,
        results: [],
      },
    }).as("getLunas");
    cy.visit(penjualan);
    cy.contains("Lunas").click();
    cy.wait("@getLunas");
    cy.contains("Tidak ada data").should("exist");
  });

  it('Sistem menampilkan pesan "Tidak ada data"  di tabel Penjualan pada tab Void', () => {
    cy.intercept("GET", "**api/penjualan*status=Void*", {
      statusCode: 200,
      body: {
        totalData: 0,
        results: [],
      },
    }).as("getVoid");
    cy.visit(penjualan);
    cy.contains("Void").click();
    cy.wait("@getVoid");
    cy.contains("Tidak ada data").should("exist");
  });

  it("Sistem tidak menampilkan pesan “Tidak ada data” pada masing-masing tab di tabel Penjualan jika data tersedia", () => {
    const tabs = [
      "Belum Dibayar",
      "Jatuh Tempo",
      "Dibayar Sebagian",
      "Lunas",
      "Void",
    ];

    tabs.forEach((tabName) => {
      cy.intercept("GET", "**api/penjualan*", {
        statusCode: 200,
        body: {
          totalData: 1,
          results: [
            {
              id: "test-id-123",
              nomor: `TEST-${tabName}-001`,
              status: tabName,
            },
          ],
        },
      }).as(`getPenjualan-${tabName}`);
      cy.visit(penjualan);
      cy.contains(tabName).click();
      cy.wait(`@getPenjualan-${tabName}`);
      cy.contains("Tidak ada data").should("not.exist");
      cy.get("table tbody tr").should("have.length.at.least", 1);
    });
  });
});
