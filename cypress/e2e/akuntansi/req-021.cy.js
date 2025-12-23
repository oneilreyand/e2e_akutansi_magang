describe("Update Status Pembayaran -> Melakukan pembayaran (lunas/sebagian), void pembayaran", () => {
  beforeEach(() => {
    cy.apiLogin("jodica23si@mahasiswa.pcr.ac.id", "12345678");
    cy.visitDashboard("b1e0a510-c451-11f0-a063-db13fc9e471b");
  });

  const penjualan = "https://dev-cashbook.assist.id/admin/sales";
  // Versi manual
  it("Sistem memperbarui status pembayaran menjadi Lunas setelah pengguna melakukan pembayaran penuh", () => {
    cy.visit(penjualan);
    cy.get("img.svelte-7gdhvy").click();
    cy.get("table tbody tr:first-child").contains("INV/").click();
    cy.contains("Pilih Tindakan").click();
    cy.contains("Terima Pembayaran").click();
    cy.get('[data-testid="input-metode"] > .MuiInputBase-root').click();
    cy.contains("Tunai").click();
    cy.get("#nomor_akun").click();
    cy.get(".MuiAutocomplete-popper li").first().click({ force: true });
    cy.get('input[name="sub_total"]').click().type("{selectAll}130000");
    cy.contains("button", "Buat Penerimaan").click();
    cy.contains("button", "Ya, Buat").click();
    cy.get("table tbody tr:first-child td:nth-child(5)").should(
      "contain",
      "Lunas"
    );
  });

  it("Sistem memperbarui status pembayaran menjadi Lunas setelah pengguna melakukan pembayaran penuh", () => {
    const mockPenjualanBelumLunas = {
      totalData: 1,
      results: [
        {
          id: "5c179f00-c684-11f0-a302-1789a16d9041",
          nomor: "INV/0005",
          tanggal_transaksi: "2025-11-21T02:46:38.838Z",
          tanggal_jatuh_tempo: "2025-11-21T02:46:38.838Z",
          syarat_pembayaran: "Immediately",
          alamat_penagihan: "jln Kompas",
          sub_total: 130000,
          total: 130000,
          sisa_tagihan: 130000,
          status: "Jatuh Tempo", // Status awal: belum lunas
          customer: {
            id: "a5a95e50-c455-11f0-a063-db13fc9e471b",
            nama: "Rayhan Rayandra",
          },
          items: [
            {
              id: "5c1c32e0-c684-11f0-a302-1789a16d9041",
              product_id: "88bb6760-c456-11f0-a063-db13fc9e471b",
              quantity: 1,
              price: 130000,
              total: 130000,
              product: {
                product_name: "GARAM CINA",
                sku_code: "SKU-000001",
              },
            },
          ],
          payments: [], // Belum ada pembayaran
        },
      ],
    };

    // Mock data setelah pembayaran: status menjadi "Lunas"
    const mockPenjualanSudahLunas = {
      totalData: 1,
      results: [
        {
          id: "5c179f00-c684-11f0-a302-1789a16d9041",
          nomor: "INV/0005",
          tanggal_transaksi: "2025-11-21T02:46:38.838Z",
          tanggal_jatuh_tempo: "2025-11-21T02:46:38.838Z",
          syarat_pembayaran: "Immediately",
          alamat_penagihan: "jln Kompas",
          sub_total: 130000,
          total: 130000,
          sisa_tagihan: 0,
          status: "Lunas",
          customer: {
            id: "a5a95e50-c455-11f0-a063-db13fc9e471b",
            nama: "Rayhan Rayandra",
          },
          items: [
            {
              id: "5c1c32e0-c684-11f0-a302-1789a16d9041",
              product_id: "88bb6760-c456-11f0-a063-db13fc9e471b",
              quantity: 1,
              price: 130000,
              total: 130000,
              product: {
                product_name: "GARAM CINA",
                sku_code: "SKU-000001",
              },
            },
          ],
          payments: [
            {
              id: "payment-123",
              nomor_transaksi: "PJINV/0005",
              total: 130000,
              sub_total: 130000,
              sisa_tagihan: 0,
              tanggal: "2025-11-24T16:43:32+07:00",
              metode: "Tunai",
            },
          ],
        },
      ],
    };
    cy.intercept("GET", "**/api/penjualan?**", {
      statusCode: 200,
      body: mockPenjualanBelumLunas,
    }).as("getPenjualan");
    cy.visit(penjualan);
    cy.get("img.svelte-7gdhvy").click();
    cy.wait("@getPenjualan");
    cy.get("table tbody tr:first-child").should("contain", "Jatuh Tempo");
    cy.get("table tbody tr:first-child").contains("INV/").click();
    cy.contains("Pilih Tindakan").click();
    cy.contains("Terima Pembayaran").click();
    cy.get('[data-testid="input-metode"] > .MuiInputBase-root').click();
    cy.contains("Tunai").click();
    cy.get("#nomor_akun").click();
    cy.get(".MuiAutocomplete-popper li").first().click({ force: true });
    cy.get('input[name="sub_total"]').click().type("{selectAll}130000");
    cy.contains("button", "Buat Penerimaan").click();
    cy.contains("button", "Ya, Buat").click();

    // Intercept API setelah pembayaran - return data sudah lunas
    cy.intercept("GET", "**/api/penjualan?**", {
      statusCode: 200,
      body: mockPenjualanSudahLunas,
    }).as("getPenjualanAfterPayment");

    // Tunggu refresh data
    cy.wait("@getPenjualanAfterPayment");

    // Validasi status berubah menjadi "Lunas"
    cy.get("table tbody tr:first-child td:nth-child(5)").should(
      "contain",
      "Lunas"
    );
  });
});
