describe("Search Input -> Mencari data berdasarkan nama pelanggan dan nomor invoice", () => {
  beforeEach(() => {
    cy.apiLogin("jodica23si@mahasiswa.pcr.ac.id", "12345678");
    cy.visitDashboard("b1e0a510-c451-11f0-a063-db13fc9e471b");
  });

  const penjualan = "https://dev-cashbook.assist.id/admin/sales";
  // Line 31 - 95 = Hasil pikiran sendiri. Line 97 - 136 = Optimisasi dengan AI Deepseek
  it.only("Sistem menampilkan hasil pencarian data penjualan berdasarkan nama pelanggan atau nomor invoice di tabel Penjualan.", () => {
    cy.intercept("GET", "**api/penjualan*", {
      body: {
        totalData: 2,
        results: [
          {
            id: "test-001",
            nomor: "INV/001",
            customer: {
              nama: "Jodica",
            },
          },
          {
            id: "test-002",
            nomor: "INV/002",
            customer: {
              nama: "Raska",
            },
          },
        ],
      },
    }).as("getPenjualan");
    cy.intercept("GET", "**/api/penjualan*keyword=INV*001*", {
      body: {
        totalData: 1,
        results: [
          {
            id: "test-001",
            nomor: "INV/001",
            customer: {
              nama: "Jodica",
            },
          },
        ],
      },
    }).as("getSearchByInvoice");
    cy.intercept("GET", "**api/penjualan*keyword=Raska*", {
      body: {
        totalData: 1,
        results: [
          {
            id: "test-002",
            nomor: "INV/002",
            customer: {
              nama: "Raska",
            },
          },
        ],
      },
    }).as("getSearchByName");
    cy.visit(penjualan);
    cy.wait("@getPenjualan");
    cy.get("input[placeholder='Cari']").click().type("INV/001");
    cy.wait("@getSearchByInvoice");
    cy.get("table tbody tr")
      .should("have.length", 1)
      .and("contain", "INV/001")
      .and("not.contain", "INV/002");
    cy.get("input[placeholder='Cari']").clear().type("Raska");
    cy.wait("@getSearchByName");
    cy.get("table tbody tr")
      .should("have.length", 1)
      .and("contain", "Raska")
      .and("not.contain", "Jodica");
  });

  it("Sistem menampilkan hasil pencarian data penjualan berdasarkan nama pelanggan atau nomor invoice di tabel Penjualan.", () => {
    cy.intercept("GET", "**/api/penjualan*", (req) => {
      const url = new URL(req.url);
      const keyword = url.searchParams.get("keyword");

      const allData = [
        { id: "test-001", nomor: "INV/001", customer: { nama: "Jodica" } },
        { id: "test-002", nomor: "INV/002", customer: { nama: "Raska" } },
      ];

      // Filter data berdasarkan keyword
      const filteredData = allData.filter(
        (item) =>
          !keyword ||
          item.nomor.includes(keyword) ||
          item.customer.nama.includes(keyword)
      );

      req.reply({
        body: {
          totalData: filteredData.length,
          results: filteredData,
        },
      });
    }).as("getPenjualan");

    cy.visit(penjualan);
    cy.wait("@getPenjualan");
    cy.get("input[placeholder='Cari']").type("INV/001");
    cy.wait("@getPenjualan");
    cy.get("table tbody tr")
      .should("have.length", 1)
      .and("contain", "INV/001")
      .and("not.contain", "INV/002");
    cy.get("input[placeholder='Cari']").clear().type("Raska");
    cy.get("table tbody tr")
      .should("have.length", 1)
      .and("contain", "Raska")
      .and("not.contain", "Jodica");
  });
});
