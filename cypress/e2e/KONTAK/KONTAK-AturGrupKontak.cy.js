describe("Fitur Atur grup kontak", () => {
  beforeEach(() => {
    cy.loginWithAPI("rayhanrayandra.work.id@gmail.com", "Nz6}+#8y");
    cy.visit("https://cashflow.assist.id/admin/contacts");
    cy.get("button").contains("Atur Group Kontak").click();
  });

  it("Keluar menggunakan tombol silang", () => {
    cy.get("div.css-io9zon").should("be.visible"); //validasi bahwa box ada
    cy.get("button.css-ea78m").click(); //tombol silang ditekan
    cy.get("div.css-io9zon").should("not.exist"); // ekspektasi bahwa box menghilang
  });

  context("Card Title", () => {
    it("Validasi judul Pengaturan Grup Kontak", () => {
      cy.get("#modal-title").contains("Pengaturan Group Kontak");
    });
  });

  context("Table", () => {
    it("Validasi penulisan thead", () => {
      cy.get("table thead")
        .eq(1)
        .within(() => {
          cy.contains("Nama Group").should("be.visible");
          cy.contains("Jumlah Kontak").should("be.visible");
        });
    });

    it('Check tampilan tabel kosong', () => {
      cy.get("button.css-ea78m").click()
      cy.intercept('GET', 'https://api-cashflow.assist.id/api/grupkontak/list?companyId=*', {
        statusCode: 200
      }).as('interceptedRequest');
      cy.get('.css-1avq450 > .MuiGrid2-container > :nth-child(1)').click()
      cy.wait('@interceptedRequest');
      cy.get('.MuiPaper-root > .MuiTable-root > .MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root').should('have.text', 'Tidak ada data')
    });
    
    it('Check tampilan tabel dengan code response 400', () => {
      cy.get("button.css-ea78m").click()
      cy.intercept('GET', 'https://api-cashflow.assist.id/api/grupkontak/list?companyId=*', {
        statusCode: 400
      }).as('interceptedRequest');
      cy.get('.css-1avq450 > .MuiGrid2-container > :nth-child(1)').click()
      cy.wait('@interceptedRequest');
      cy.get('.MuiPaper-root > .MuiTable-root > .MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root').should('have.text', 'Terjadi kesalahan')
      cy.get('.MuiAlert-message').should('have.text', 'Kesalahan di server')
    });

  });

  context("Fitur search", () => {
    it("check penulisan placeholder", () => {
      cy.get('input[placeholder="Cari group"]').should("be.visible");
    });
    it("Mencari salah satu grup dengan expect ada", () => {
      cy.get(
        ':nth-child(1) > [data-testid="search-input"] > .MuiInputBase-root'
      ).type("jangan duplikat");

      cy.get("p.css-gjwoc1", { timeout: 10000 }).should(
        "have.text",
        "jangan duplikat"
      );
    });

    it("Mencari salah satu grup dengan expect tidak ada", () => {
      cy.get(
        ':nth-child(1) > [data-testid="search-input"] > .MuiInputBase-root'
      ).type("ga ada nama>");

      cy.get("td.css-1njqvcb").should("have.text", "Tidak ada data");
    });
  });

  context("Fitur penambahan grup baru", () => {

    it("Check penulisan tombol", () => {
      cy.get("button.css-90jei5").should("have.text", "Buat Group");
    });

    it("Menambahkan grup baru berhasil dan tampil serta menghilangkan kolom form input grup baru", () => {
      const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, "");
      const groupName = `grup_kontak_${timestamp}`;

      cy.get(
        ".MuiGrid2-container > :nth-child(2) > .MuiButtonBase-root"
      ).click();
      cy.get('input[placeholder="Masukkan nama group"]')
        .should("be.visible")
        .type(groupName);
      cy.get("form > .MuiStack-root > .MuiButton-contained").click();
      cy.get('.MuiStack-root > .MuiButton-text').should('not.exist')
      cy.get('form > .MuiStack-root > .MuiButton-contained').should('not.exist')
      cy.get('input[placeholder="Masukkan nama group"]')
      .should("not.exist")
      cy.contains(groupName).should("be.exist");
    });

    it("Menambahkan grup yang sudah ada muncul text helper dan gagal menambahkan", () => {
      const existingGroupName = "NonDuplikatGroup";

      cy.get(
        ".MuiGrid2-container > :nth-child(2) > .MuiButtonBase-root"
      ).click();
      cy.get('input[placeholder="Masukkan nama group"]')
        .should("be.visible")
        .type(existingGroupName);
      cy.get("form > .MuiStack-root > .MuiButton-contained").click();
      cy.get("p")
        .filter(
          (index, el) => Cypress.$(el).text().trim() === existingGroupName
        )
        .should("have.length", 1);
      cy.contains("Nama group sudah ada").should("be.visible");

    });

    it('tombol batal menambahkan grup menghilangkan tombol "batal","Simpan","dan kolom input"', () => {
      const existingGroupName = "NonDuplikatGroup";

      cy.get(
        ".MuiGrid2-container > :nth-child(2) > .MuiButtonBase-root"
      ).click();
      cy.get('input[placeholder="Masukkan nama group"]')
        .should("be.visible")
        .type(existingGroupName);
      cy.get("form > .MuiStack-root > .MuiButton-contained").click();
      cy.get(".MuiStack-root > .MuiButton-text").click();

      cy.get('input[placeholder="Masukkan nama group"]').should("not.exist");
      cy.get("form > .MuiStack-root > .MuiButton-contained").should(
        "not.exist"
      );
      cy.get(".MuiStack-root > .MuiButton-text").should("not.exist");
    });
  });

  context("Fitur edit nama grup", () => {
    it("merubah salah satu nama grup dengan nama yang belum ada", () => {
      const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, "");
      const groupName = `diedit_pada${timestamp}`;

      cy.get('button[aria-label="edit-button"]').eq(0).click();
      cy.get('input[type="text"]').eq(2).clear();
      cy.get('input[type="text"]').eq(2).type(groupName);
      cy.get(".MuiBox-root > .MuiIconButton-colorPrimary").click();
      cy.get("p")
        .filter((index, el) => Cypress.$(el).text().trim() === groupName)
        .should("have.length", 1);
    });

    it("merubah salah satu nama grup dengan nama yang sudah ada", () => {
      cy.get('button[aria-label="edit-button"]').eq(0).click();
      cy.get('input[type="text"]').eq(2).clear();
      cy.get('input[type="text"]').eq(2).type("grup duplikatt");
      cy.get(".MuiBox-root > .MuiIconButton-colorPrimary").click();
      cy.contains("Nama group sudah ada").should("be.visible");
    });

    it("merubah salah satu nama grup dengan nama kosong", () => {
      cy.get('button[aria-label="edit-button"]').eq(0).click();
      cy.get('input[type="text"]').eq(2).clear();
      cy.get(".MuiBox-root > .MuiIconButton-colorPrimary").click();
      cy.contains("Nama group harus diisi").should('be.visible')
    });

    it("membatalkan pengeditan nama menggunakan timbol silang", () => {
      cy.get('button[aria-label="edit-button"]').eq(0).click();
      cy.get('input[type="text"]').eq(2).should('exist')
      cy.get('[aria-label="cancel-button"]').click();

      cy.get('input[type="text"]').eq(2).should('not.exist')
      cy.get('[aria-label="cancel-button"]').should('not.exist');
      cy.get('[aria-label="save-button"]').should('not.exist');
    });
  });
});
