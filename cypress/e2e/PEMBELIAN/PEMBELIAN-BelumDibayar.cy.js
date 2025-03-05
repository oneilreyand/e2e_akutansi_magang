describe("Pembelian-Semua", () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.loginWithAPI("rayhanrayandra.work.id@gmail.com", "Nz6}+#8y");
    cy.visit("https://cashflow.assist.id/admin/purchases");
    cy.get('.MuiTabs-flexContainer > :nth-child(2)').click()
  });

  context("Pengujian Komponen", () => {
    it("Penulisan Judul Besar H5", () => {
      cy.get(".MuiTypography-h5 > span").should("have.text", "Pembelian");
    });

    it("Penulisan Tombol Pembelian Baru", () => {
      cy.get(".css-aidtzz > .MuiButtonBase-root").should(
        "have.text",
        "Pembelian Baru"
      );
    });

    it("Penulisan Tombol Pembelian Baru", () => {
      cy.get(".css-aidtzz > .MuiButtonBase-root").should(
        "have.text",
        "Pembelian Baru"
      );
    });

    it("Validasi penulisan tab konten", () => {
      cy.get(".MuiTabs-flexContainer > :nth-child(1)").should(
        "have.text",
        "Semua"
      );
      cy.get(".MuiTabs-flexContainer > :nth-child(2)").should(
        "have.text",
        "Belum Dibayar"
      );
      cy.get(".MuiTabs-flexContainer > :nth-child(3)").should(
        "have.text",
        "Jatuh Tempo"
      );
      cy.get(".MuiTabs-flexContainer > :nth-child(4)").should(
        "have.text",
        "Lunas"
      );
      cy.get(".MuiTabs-flexContainer > :nth-child(5)").should(
        "have.text",
        "Dibayar Sebagian"
      );
      cy.get(".MuiTabs-flexContainer > :nth-child(6)").should(
        "have.text",
        "Void"
      );
    });
  });

  context("Pengujian tab navigasi", () => {
    it("Penulisan Tab Navigasi", () => {
      cy.get(".MuiBreadcrumbs-ol").should("have.text", "Beranda/Pembelian");
    });

    it("Mundur dari Pembelian Ke Beranda", () => {
      cy.get(
        ".MuiBreadcrumbs-ol > :nth-child(1) > .MuiTypography-root"
      ).click();
      cy.get(".MuiTypography-h5").should("have.text", "Beranda");
      cy.url().should('contains','admin/dashboard')
    });
  });

  context("Side Navbar", () => {
    const menuItems = [
      {
        testId: "drawer-item-dashboard",
        url: "/admin/dashboard",
        title: "Beranda",
      },
      {
        testId: "drawer-item-reports",
        url: "/admin/reports",
        title: "Laporan",
      },
      {
        testId: "drawer-item-cash-bank",
        url: "/admin/cash-bank",
        title: "Kas & Bank",
      },
      { testId: "drawer-item-sales", url: "/admin/sales", title: "Penjualan" },
      {
        testId: "drawer-item-purchases",
        url: "/admin/purchases",
        title: "Pembelian",
      },
      {
        testId: "drawer-item-expenses",
        url: "/admin/expenses",
        title: "Biaya",
      },
      {
        testId: "drawer-item-products",
        url: "/admin/products",
        title: "Produk",
      },
      { testId: "drawer-item-assets", url: "/admin/assets", title: "Aset" },
      { testId: "drawer-item-accounts", url: "/admin/accounts", title: "Akun" },
      {
        testId: "drawer-item-settings",
        url: "/admin/settings",
        title: "Pengaturan",
      },
    ];

    menuItems.forEach(({ testId, url, title }, index) => {
      it(`Testcase ${index + 1}: Navigasi ke ${title}`, () => {
        cy.get(`[data-testid="${testId}"]`).click();
        cy.url().should("eq", `https://cashflow.assist.id${url}`);
        cy.get("h5").contains(title);
      });
    });
  });

  context("Fitur Filter Tanggal", () => {
    it("Validasi penulisan Filter Tanggal", () => {
      cy.get(".MuiBox-root > .MuiButtonBase-root").should(
        "have.text",
        "Filter Tanggal"
      );
    });
  });

  context("Fitur Cari Pembelian", () => {
    it("Placeholder Fitur Cari ", () => {
      cy.get('[data-testid="search-input"]').should(
        "have.attr",
        "placeholder",
        "Cari"
      );
    });
  });

  context('Pagination',() => {
    
  })
});
