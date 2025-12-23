describe("View Data Penjualan -> Menampilkan tabel data penjualan", () => {
  beforeEach(() => {
    cy.apiLogin("jodica23si@mahasiswa.pcr.ac.id", "12345678");
    cy.visitDashboard("b1e0a510-c451-11f0-a063-db13fc9e471b");
  });
  const penjualan = "https://dev-cashbook.assist.id/admin/sales";
  it.only("TC-001: Sistem menampilkan data penjualan di tab Semua", () => {
    cy.intercept("GET", "**/api/penjualan*").as("getPenjualan");
    cy.visit(penjualan);

    // If condition: cek element sudah muncul atau belum
    cy.get("body").then(($body) => {
      if ($body.find("table").length === 0) {
        // Jika table belum ada, tunggu dengan retry natural Cypress
        cy.get("table").should("exist");
      }
      // Jika sudah ada, lanjut langsung tanpa tunggu
    });

    cy.get("img.svelte-7gdhvy").click();
    cy.contains("button", "Semua").click();
    cy.wait("@getPenjualan").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body).to.have.property("results");
      expect(interception.response.body).to.have.property("totalData");
    });
  });

  it("TC-002: Sistem menampilkan data penjualan di tab Belum Dibayar", () => {
    cy.intercept("GET", "**/api/penjualan*status=Belum+Dibayar*").as(
      "getBelumDibayar"
    );
    cy.visit(penjualan);
    cy.contains("button", "Belum Dibayar").click();
    cy.wait("@getBelumDibayar").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body).to.have.property("results");
      expect(interception.response.body).to.have.property("totalData");
      expect(interception.request.url).to.include("status=Belum+Dibayar");
      expect(interception.request.query).to.have.property(
        "status",
        "Belum Dibayar"
      );
    });
    cy.get("table").should("be.visible");
    cy.get("img.svelte-7gdhvy").should("be.visible").click();
  });

  it("TC-003: Sistem menampilkan data penjualan di tab Jatuh Tempo", () => {
    cy.intercept("GET", "**/api/penjualan*status=Jatuh+Tempo*").as(
      "getJatuhTempo"
    );
    cy.visit(penjualan);
    cy.contains("button", "Jatuh Tempo").click();
    cy.wait("@getJatuhTempo").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body).to.have.property("results");
      expect(interception.response.body).to.have.property("totalData");
      expect(interception.request.url).to.include("status=Jatuh+Tempo");
      expect(interception.request.query).to.have.property(
        "status",
        "Jatuh Tempo"
      );
    });
  });

  it("TC-004: Sistem menampilkan data penjualan di tab Lunas", () => {
    cy.intercept("GET", "**/api/penjualan*status=Lunas*").as("getLunas");
    cy.visit(penjualan);
    cy.contains("button", "Lunas").click();
    cy.wait("@getLunas").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body).to.have.property("results");
      expect(interception.response.body).to.have.property("totalData");
      expect(interception.request.url).to.include("status=Lunas");
      expect(interception.request.query).to.have.property("status", "Lunas");
    });
  });

  it("TC-005: Sistem menampilkan data penjualan di tab Dibayar Sebagian", () => {
    cy.intercept("GET", "**/api/penjualan*status=Dibayar+Sebagian*").as(
      "getDibayarSebagian"
    );
    cy.visit(penjualan);
    cy.contains("button", "Dibayar Sebagian").click();
    cy.wait("@getLunas").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body).to.have.property("results");
      expect(interception.response.body).to.have.property("totalData");
      expect(interception.request.url).to.include("status=Dibayar+Sebagian");
      expect(interception.request.query).to.have.property(
        "status",
        "Dibayar Sebagian"
      );
    });
  });

  it("TC-006: Sistem menampilkan data penjualan di tab Void", () => {
    cy.intercept("GET", "**/api/penjualan*status=Void*").as("getVoid");
    cy.visit(penjualan);
    cy.contains("button", "Void").click();
    cy.wait("@getVoid").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body).to.have.property("results");
      expect(interception.response.body).to.have.property("totalData");
      expect(interception.request.url).to.include("status=Void");
      expect(interception.request.query).to.have.property("status", "Void");
    });
  });
});
