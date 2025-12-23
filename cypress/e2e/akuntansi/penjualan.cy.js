describe("Menu Penjualan", () => {
  beforeEach(() => {
    cy.request({
      method: "POST",
      url: "https://api-uat-cashbook.assist.id/api/login",
      body: {
        email: "jodica23si@mahasiswa.pcr.ac.id",
        password: "12345678",
      },
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);

      const token = response.body.token;
      cy.log("Login berhasil via API");

      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("token");

      window.localStorage.setItem("token", token);
      window.sessionStorage.setItem("token", token);
      cy.setCookie("token", token);
      cy.visit("https://uat-cashbook.assist.id/");
    });
  });

  const penjualan = "https://uat-cashbook.assist.id/admin/sales";

  it.only("Berhasil akses halamanan Penjualan", () => {
    cy.visit(penjualan);
    cy.contains("h5", "Penjualan").should("be.visible");
  });

  it("Breadcrumb berfungsi", () => {
    cy.visit(penjualan);
    cy.get("a", "Beranda").click();
    cy.contains("h5", "Beranda").should("be.visible");
  });

  it("Manipulasi Overview Penjualan", () => {
    cy.intercept("GET", "**/api/penjualan/overview*", {
      statusCode: 200,
      body: {
        belumDibayar: {
          total: 99999,
          nominal: 12321321321321,
        },
        telatBayar: {
          total: 1,
          nominal: 1,
        },
        pelunasanDiterima: {
          total: 12,
          nominal: 12321312312,
        },
      },
    }).as("getPenjualan");
    cy.visit("https://uat-cashbook.assist.id/admin/sales");
    cy.wait("@getPenjualan");
  });

  // it("Tab Penjualan menampilkan data dari API /penjualan", () => {
  //   cy.intercept("GET", "**/api/penjualan*").as("getPenjualan");
  //   cy.contains("Penjualan").click();
  //   cy.wait("@getPenjualan").its("response.statusCode").should("eq", 200);
  // });

  it.only("Tab Semua di tabel penjualan menampilkan data API nya sendiri.", () => {
    cy.visit(penjualan);
    cy.intercept("GET", "**api/penjualan?**").as("getSemuaPenjualan");
    cy.contains("button", "Semua").click();
    cy.wait("@getSemuaPenjualan").its("response.statusCode").should("eq", 200);
  });

  it.only("Tab Belum Dibayar di tabel penjualan menampilkan data API nya sendiri.", () => {
    cy.visit(penjualan);
    cy.intercept("GET", "**/api/penjualan?*status=Belum+Dibayar*").as(
      "getBelumBayarPenjualan"
    );
    cy.contains("button", "Belum Dibayar").click();
    cy.wait("@getBelumBayarPenjualan")
      .its("respone.statusCode")
      .should("eq", 200);
  });

  it.only("Tab Jatuh Tempo di tabel penjualan menampilkan data API nya sendiri.", () => {
    cy.visit(penjualan);
    cy.intercept("GET", "**/api/penjualan?*status=Jatuh+Tempo*").as(
      "getJatuhTempoPenjualan"
    );
    cy.contains("button", "Jatuh Tempo").click();
    cy.wait("@getJatuhTempoPenjualan")
      .its("response.statusCode")
      .should("eq", 200);
  });

  it.only("Tab Jatuh Tempo di tabel penjualan menampilkan data API nya sendiri.", () => {
    cy.visit(penjualan);
    cy.intercept("GET", "**/api/penjualan?*status=Jatuh+Tempo*").as(
      "getJatuhTempoPenjualan"
    );
    cy.contains("button", "Jatuh Tempo").click();
    cy.wait("@getJatuhTempoPenjualan")
      .its("response.statusCode")
      .should("eq", 200);
  });

  it("Manipulasi Tabel Penjualan Produk", () => {
    cy.intercept("GET", "**/api/penjualan*", {
      statusCode: 200,
      body: {
        totalData: 0,
        results: [],
      },
    }).as("getPenjualan");
    cy.visit("https://uat-cashbook.assist.id/admin/sales");
    cy.wait("@getPenjualan");
  });

  it("get element sulit", () => {
    // cy.visit('https://uat-cashbook.assist.id/admin/sales/create')
    cy.get('[data-testid="drawer-item-sales"]').click();
    cy.contains("Penjualan Baru").click();
    cy.get(":nth-child(5) > .MuiGrid2-container > :nth-child(2)").should(
      "have.text",
      "Rp 0"
    );
  });
});
