describe("Cancel Action Handling -> Batal saat membuat penjualan baru atau batal konfirmasi form", () => {
  beforeEach(() => {
    cy.apiLogin("jodica23si@mahasiswa.pcr.ac.id", "12345678");
    cy.visitDashboard("b1e0a510-c451-11f0-a063-db13fc9e471b");
  });

  const penjualan = "https://dev-cashbook.assist.id/admin/sales";
  it("Sistem tidak menyimpan data saat pengguna menekan tombol Batal pada form Penjualan Baru", () => {
    cy.intercept("GET", "**api/penjualan**", {
      body: {
        totalData: 1,
        results: [
          {
            id: "1",
            nomor: "INV/0001",
          },
        ],
      },
    }).as("getPenjualan");
    cy.visit(penjualan);
    cy.get("img.svelte-7gdhvy").click();
    cy.wait("@getPenjualan");
    cy.contains("button", "Penjualan Baru").click();
    cy.contains("button", "Batalkan").click();
    cy.get("table tbody tr:nth-child(1)").should("not.have", "INV/0002");
  });
});
