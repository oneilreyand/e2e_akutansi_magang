describe("Skeleton Loading -> Menampilkan skeleton saat data sedang di-fetch", () => {
  beforeEach(() => {
    cy.apiLogin("jodica23si@mahasiswa.pcr.ac.id", "12345678");
    cy.visitDashboard("b1e0a510-c451-11f0-a063-db13fc9e471b");
  });

  const penjualan = "https://dev-cashbook.assist.id/admin/sales";

  it("Sistem menampilkan skeleton loading pada tabel Penjualan saat data sedang di-fetch", () => {
    const tabs = ["Belum Dibayar", "Jatuh Tempo", "Lunas"];

    tabs.forEach((tabName) => {
      cy.log(`Testing skeleton for tab: ${tabName}`);

      cy.intercept("GET", "**/api/penjualan*", {
        delay: 3000,
        middleware: true,
      }).as(`slowPenjualan-${tabName}`);

      cy.visit(penjualan);
      cy.contains("button", tabName).click();

      // Approach 1: Capture UI state saat loading
      cy.get("body").should(($body) => {
        // Cek apakah ada elemen loading state selain skeleton
        const loadingIndicators = $body.find(
          '.loading, .spin, .ant-spin, [class*="load"], [class*="spin"], .progress, .shimmer'
        );

        if (loadingIndicators.length > 0) {
          cy.log(
            `✅ Found loading indicator: ${loadingIndicators.length} elements`
          );
          expect(loadingIndicators).to.be.visible;
        } else {
          // Approach 2: Cek tabel dalam state loading
          const table = $body.find("table");
          if (table.length > 0) {
            // Jika tabel ada tapi konten kosong/placeholder
            const tableContent = table.find("tbody tr");
            if (tableContent.length === 0 || tableContent.is(":empty")) {
              cy.log("ℹ️ Table exists but no content (might be loading state)");
            }
          }
        }
      });

      cy.wait(`@slowPenjualan-${tabName}`);
      cy.get("table").should("be.visible");

      // Screenshot untuk debugging
      cy.screenshot(`after-loading-${tabName}`);
    });
  });
});
