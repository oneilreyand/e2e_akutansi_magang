describe("Fitur Atur grup kontak", () => {
  beforeEach(() => {
    cy.loginWithAPI("rayhanrayandra.work.id@gmail.com", "Nz6}+#8y");
    cy.visit("https://cashflow.assist.id/admin/contacts");
    cy.get("button").contains("Atur Grup Kontak").click();
  });

  it("Keluar menggunakan tombol silang", () => {
    cy.get("div.css-io9zon").should("be.visible"); //validasi bahwa box ada
    cy.get("button.css-ea78m").click(); //tombol silang ditekan
    cy.get("div.css-io9zon").should("not.exist"); // ekspektasi bahwa box menghilang
  });

  // it('Keluar menekan luar box', () => {
  //   cy.get('div.css-io9zon').should('be.visible') //validasi bahwa box ada
  //   cy.get('div.css-919eu4').click() //luarbox ditekan
  //   cy.get('div.css-io9zon').should('not.exist') // ekspektasi bahwa box menghilang
  // });

  context("Card Title", () => {
    it("Validasi judul Pengaturan Grup Kontak", () => {
      cy.get("#modal-title").contains("Pengaturan Grup Kontak");
    });
  });
  
  context("Table", () => {
    it("Validasi penulisan thead", () => {
      cy.get("table thead")
      .eq(1)
      .within(() => {
        cy.contains("Nama Grup").should("be.visible");
        cy.contains("Jumlah Kontak").should("be.visible");
      });
    });
  });

  context('Tambah kontak', () => {
    it('Check penulisan tombol', () => {
      cy.get('button.css-90jei5').should('have.text','Buat Grup')
      
    })
  })

  
  context("Fitur search", () => {
    it('check penulisan placeholder', () => {
      cy.get(
        ':nth-child(1) > [data-testid="search-input"] > .MuiInputBase-root'
      ).should('have.attr','placeholder','Cari grup')
      
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
      ).type("ga ada nama");

      cy.get('td.css-1njqvcb').should('have.text','Tidak ada data')
    });
  });
})

