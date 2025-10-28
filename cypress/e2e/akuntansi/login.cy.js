describe("Web akutansi", () => {
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
});
