describe("Edit Kontak", () => {
  beforeEach(() => {
    cy.getCookie("authToken"); // Memulihkan cookie sebelum setiap test
    cy.loginWithAPI("rayhanrayandra.work.id@gmail.com", "Nz6}+#8y");
    cy.visit("https://cashflow.assist.id/admin/contacts");
    cy.get(
      ".MuiTableBody-root > :nth-child(1) > :nth-child(2) > .MuiButtonBase-root",
      { timeout: 15000 }
    ).click();
    cy.get(".MuiStack-root > .MuiButtonBase-root").click();
  });

  it("Pengujian penulisan label", () => {
    cy.get(".MuiTypography-h5 > span").should("have.text", "Ubah Kontak");
    cy.get(".MuiBreadcrumbs-ol").should(
      "have.text",
      "Beranda/Kontak/Detail Kontak/Ubah Kontak"
    );

    cy.get(
      ":nth-child(1) > .MuiCardHeader-root > .MuiCardHeader-content > .MuiTypography-root"
    ).should("have.text", "Informasi Kontak");
    cy.get(
      ":nth-child(1) > .MuiCardContent-root > .css-1i24z3d > :nth-child(1) > .MuiGrid2-grid-md-4"
    ).should("have.text", "Tipe Kontak *");

    cy.get(
      ":nth-child(2) > .MuiCardHeader-root > .MuiCardHeader-content > .MuiTypography-root"
    ).should("have.text", "Informasi Umum");
    cy.get(
      ":nth-child(2) > .MuiCardContent-root > .css-1i24z3d > :nth-child(1) > .css-1iqhgio"
    ).should("have.text", "Nama Lengkap *");
    cy.get(
      ":nth-child(2) > .MuiCardContent-root > .css-1i24z3d > :nth-child(2) > .css-1iqhgio"
    ).should("have.text", "Tipe Identitas");
    cy.get(":nth-child(3) > .MuiGrid2-grid-md-4 > .MuiFormLabel-root").should(
      "have.text",
      "Alamat Email *"
    );
    cy.get(".MuiGrid2-grid-md-4 > .MuiTypography-root").should(
      "have.text",
      "Anda dapat menambahkan lebih dari satu alamat email (jika ada)"
    );
    cy.get(":nth-child(4) > .MuiGrid2-grid-md-4").should(
      "have.text",
      "Nama Perusahaan"
    );
    cy.get(":nth-child(5) > .MuiGrid2-grid-md-4").should(
      "have.text",
      "Nomor HP & Telepon"
    );
    cy.get(":nth-child(6) > .MuiGrid2-grid-md-4").should(
      "have.text",
      "Fax & NPWP"
    );
    cy.get(":nth-child(7) > .MuiGrid2-grid-md-4").should(
      "have.text",
      "Nomor Identitas Tempat Kegiatan Usaha (NITKU)"
    );
    cy.get(":nth-child(8) > .MuiGrid2-grid-md-4").should(
      "have.text",
      "Alamat Penagihan *"
    );
    cy.get(":nth-child(9) > .MuiGrid2-grid-md-4").should(
      "have.text",
      "Alamat Pengiriman"
    );

    cy.get(
      ":nth-child(3) > .MuiCardHeader-root > .MuiCardHeader-content > .MuiTypography-root"
    ).should("have.text", "Informasi Bank");
    cy.get(
      ":nth-child(3) > .MuiCardContent-root > .css-1i24z3d > .css-1st318m > .MuiGrid2-grid-md-4"
    ).should("have.text", "Nama Bank & Cabang");

    cy.get(
      ":nth-child(4) > .MuiCardHeader-root > .MuiCardHeader-content > .MuiTypography-root"
    ).should("have.text", "Informasi Pemetaan Akun");
    cy.get(
      ":nth-child(4) > .MuiCardContent-root > .css-1i24z3d > :nth-child(1) > .MuiGrid2-grid-md-4"
    ).should("have.text", "Pemetaan Akun");
    cy.get(
      ":nth-child(4) > .MuiCardContent-root > .css-1i24z3d > :nth-child(2) > .MuiGrid2-grid-md-4"
    ).should("have.text", "Syarat Pembayaran Utama");
  });

  it("Pengujian Komponen Input", () => {
    cy.get("#tipe_kontak").should("be.exist");
    cy.get("#tipe_kontak-label").should("have.text", "Tipe Kontak *");
    cy.get("#fk_grup").should("be.exist")
    cy.get('#fk_grup-label').should('have.text', 'Tipe Grup')
  });

  context("pengujian tab", () => {
    it("Pindah dari tab Ubah Kontak ke tab Detail Kontak", () => {
      cy.get(":nth-child(5) > .MuiTypography-root > span").click();
      cy.get(".MuiTypography-h5 > span").should("have.text", "Detail Kontak");
    });

    it("Pindah dari tab Ubah Kontak ke tab Kontak", () => {
      cy.get(":nth-child(3) > .MuiTypography-root > span").click();
      cy.get(".MuiTypography-h5 > span").should("have.text", "Kontak");
    });

    it("Pindah dari tab Ubah Kontak ke tab Kontak", () => {
      cy.get(
        ".MuiBreadcrumbs-ol > :nth-child(1) > .MuiTypography-root"
      ).click();
      cy.get(".MuiTypography-h5").should("have.text", "Beranda");
    });
  });

  it("Ekspektasi data yang di edit sesuai dengan yang ingin di edit", () => {
    cy.intercept("GET", "/api/kontak/getDetail/*").as("getDetail");

    cy.wait("@getDetail").then((interception) => {
      cy.log(JSON.stringify(interception.response.body));
    });
  });
});
