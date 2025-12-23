describe("Functional Tab -> Tab seleksi berdasarkan status penjualan (semua, lunas, sebagian, dll.)", () => {
  beforeEach(() => {
    cy.apiLogin("jodica23si@mahasiswa.pcr.ac.id", "12345678");
    cy.visitDashboard("b1e0a510-c451-11f0-a063-db13fc9e471b");
  });

  const penjualan = "https://dev-cashbook.assist.id/admin/sales";

  it("Sistem menampilkan status penjualan pada tab Semua", () => {
    cy.intercept("GET", "**api/penjualan*", {
      body: {
        totalData: 4,
        results: [
          {
            id: "test-id-1",
            nomor: "test-1",
            status: "Belum Dibayar",
          },
          {
            id: "test-id-2",
            nomor: "test-2",
            status: "Jatuh Tempo",
          },
          {
            id: "test-id-3",
            nomor: "test-3",
            status: "Lunas",
          },
          {
            id: "test-id-4",
            nomor: "test-4",
            status: "Dibayar Sebagian",
          },
          {
            id: "test-id-5",
            nomor: "test-5",
            status: "Void",
          },
        ],
      },
    }).as("getAllStatus");
    cy.visit(penjualan);
    cy.contains("button", "Semua").click();
    cy.wait("@getAllStatus");
    cy.get("table tbody")
      .should("contain", "Belum Dibayar")
      .and("contain", "Jatuh Tempo")
      .and("contain", "Lunas")
      .and("contain", "Dibayar Sebagian")
      .and("contain", "Void");
  });

  it("Sistem menampilkan status Belum Dibayar pada tab Belum Dibayar", () => {
    cy.intercept("GET", "**api/penjualan*status=Belum+Dibayar*", {
      body: {
        totalData: 1,
        results: [
          {
            id: "test-id-123",
            nomor: "TEST/001",
            status: "Belum Dibayar",
          },
        ],
      },
    }).as("getBelumDibayar");
    cy.visit(penjualan);
    cy.contains("button", "Belum Dibayar").click();
    cy.wait("@getBelumDibayar");
    cy.get("table tbody tr:first-child")
      .should("contain", "Belum Dibayar")
      .and("contain", "TEST/001");
  });

  it("Sistem menampilkan status Jatuh Tempo pada tab Jatuh Tempo", () => {
    cy.intercept("GET", "**api/penjualan*status=Jatuh+Tempo*", {
      body: {
        totalData: 1,
        results: [
          {
            id: "test-id-123",
            nomor: "TEST/001",
            status: "Jatuh Tempo",
          },
        ],
      },
    }).as("getJatuhTempo");
    cy.visit(penjualan);
    cy.contains("button", "Jatuh Tempo").click();
    cy.wait("@getJatuhTempo");
    cy.get("table tbody tr:first-child")
      .should("contain", "Jatuh Tempo")
      .and("contain", "TEST/001");
  });

  it("Sistem menampilkan status Lunas pada tab Lunas", () => {
    cy.intercept("GET", "**api/penjualan*status=Lunas*", {
      body: {
        totalData: 1,
        results: [
          {
            id: "test-id-123",
            nomor: "TEST/001",
            status: "Lunas",
          },
        ],
      },
    }).as("getLunas");
    cy.visit(penjualan);
    cy.contains("button", "Lunas").click();
    cy.wait("@getLunas");
    cy.get("table tbody tr:first-child")
      .should("contain", "Lunas")
      .and("contain", "TEST/001");
  });

  it("Sistem menampilkan status Dibayar Sebagian pada tab Dibayar Sebagian", () => {
    cy.intercept("GET", "**api/penjualan*status=Dibayar+Sebagian*", {
      body: {
        totalData: 1,
        results: [
          {
            id: "test-id-123",
            nomor: "TEST/001",
            status: "Dibayar Sebagian",
          },
        ],
      },
    }).as("getDibayarSebagian");
    cy.visit(penjualan);
    cy.contains("button", "Dibayar Sebagian").click();
    cy.wait("@getDibayarSebagian");
    cy.get("table tbody tr:first-child")
      .should("contain", "Dibayar Sebagian")
      .and("contain", "TEST/001");
  });

  it("Sistem menampilkan status Void pada tab Void", () => {
    cy.intercept("GET", "**api/penjualan*status=Void*", {
      body: {
        totalData: 1,
        results: [
          {
            id: "test-id-123",
            nomor: "TEST/001",
            status: "Void",
          },
        ],
      },
    }).as("getVoid");
    cy.visit(penjualan);
    cy.contains("button", "Void").click();
    cy.wait("@getVoid");
    cy.get("table tbody tr:first-child")
      .should("contain", "Void")
      .and("contain", "TEST/001");
  });
});
