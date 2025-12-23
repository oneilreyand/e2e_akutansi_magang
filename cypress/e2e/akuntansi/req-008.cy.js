describe("Date Filter -> Menampilkan data berdasarkan rentang tanggal tertentu", () => {
  beforeEach(() => {
    cy.apiLogin("jodica23si@mahasiswa.pcr.ac.id", "12345678");
    cy.visitDashboard("b1e0a510-c451-11f0-a063-db13fc9e471b");
  });

  const penjualan = "https://dev-cashbook.assist.id/admin/sales";
  it("Sistem menampilkan data penjualan sesuai rentang tanggal yang dipilih & Sistem tidak menampilkan data karena tidak ada transaksi pada rentang tanggal yang dipilih.", () => {
    cy.intercept("GET", "**api/penjualan*", (req) => {
      const url = new URL(req.url);
      const startDate = url.searchParams.get("startDate");
      const endDate = url.searchParams.get("endDate");
      const allData = [
        {
          id: "test-01",
          nomor: "INV/001",
          tanggal_transaksi: "2025-10-15T00:00:00.000Z",
          customer: { nama: "Jodica" },
        },
        {
          id: "test-02",
          nomor: "INV/002",
          tanggal_transaksi: "2025-11-15T00:00:00.000Z",
          customer: { nama: "Raska" },
        },
        {
          id: "test-03",
          nomor: "INV/003",
          tanggal_transaksi: "2025-09-15T00:00:00.000Z",
          customer: { nama: "Customer Lama" },
        },
        {
          id: "test-04",
          nomor: "INV/004",
          tanggal_transaksi: "2025-09-16T00:00:00.000Z",
          customer: { nama: "Customer Lama" },
        },
      ];

      let filteredData = allData;
      if (startDate && endDate) {
        filteredData = allData.filter((item) => {
          const itemDate = new Date(item.tanggal_transaksi);
          const filterStart = new Date(startDate);
          const filterEnd = new Date(endDate);
          return itemDate >= filterStart && itemDate <= filterEnd;
        });
      }

      req.reply({
        body: {
          totalData: filteredData.length,
          results: filteredData,
        },
      });
    }).as("getPenjualan");

    cy.visit(penjualan);
    cy.wait("@getPenjualan");
    cy.contains("button", "Filter Tanggal").click();
    cy.get("#_r_l_").clear().type("01/10/2025");
    cy.get("#_r_n_").clear().type("30/11/2025");
    cy.contains("button", "Apply").click();
    cy.wait("@getPenjualan");
    cy.get("table tbody tr")
      .should("have.length", 2)
      .and("contain", "INV/001")
      .and("contain", "INV/002")
      .and("not.contain", "INV/003")
      .and("not.contain", "INV/004");
    cy.contains("button", "Filter Tanggal").click();
    cy.get("#_r_33_").clear().type("01/12/2025");
    cy.get("#_r_35_").clear().type("30/12/2025");
    cy.contains("button", "Apply").click();
    cy.wait("@getPenjualan");
    cy.contains("Tidak ada data").should("exist");
  });
});
