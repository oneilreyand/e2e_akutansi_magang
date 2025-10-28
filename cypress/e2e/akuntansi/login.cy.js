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

  it("Berhasil login", () => {
    cy.contains("h5", "Beranda").should("be.visible");
  });
});
