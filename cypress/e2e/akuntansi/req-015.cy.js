describe("Upload File -> Menambahkan lampiran saat membuat penjualan atau melakukan pembayaran", () => {
  beforeEach(() => {
    cy.apiLogin("jodica23si@mahasiswa.pcr.ac.id", "12345678");
    cy.visitDashboard("b1e0a510-c451-11f0-a063-db13fc9e471b");
  });

  const penjualan = "https://dev-cashbook.assist.id/admin/sales";
  it("Sistem berhasil menambahkan lampiran saat membuat penjualan atau melakukan pembayaran", () => {
    cy.visit(penjualan);
    cy.get("img.svelte-7gdhvy").click();
    cy.contains("button", "Penjualan Baru").click();
    cy.contains("h6", "Klik atau seret file ke area ini").click();
    cy.get('input[type="file"]').attachFile("logo.png");
    cy.contains("p", "logo.pn").should("exist");
  });

  it("Sistem menampilkan pesan error ketika user mengunggah file dengan format tidak didukung atau melebihi batas ukuran maksimal", () => {
    cy.visit(penjualan);
    cy.get("img.svelte-7gdhvy").click();
    cy.contains("button", "Penjualan Baru").click();
    cy.contains("h6", "Klik atau seret file ke area ini").click();
    cy.get('input[type="file"]').attachFile("heidisql.exe");
    cy.contains(
      "File tidak valid. Hanya file dengan ekstensi .PDF, .JPG, .JPEG, .PNG yang diperbolehkan."
    ).should("exist");
  });
});
