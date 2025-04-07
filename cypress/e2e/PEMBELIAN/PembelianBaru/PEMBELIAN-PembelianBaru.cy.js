describe("Pembelian-Semua", () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.loginWithAPI("rayhanrayandra.work.id@gmail.com", "Nz6}+#8y");
    cy.visit("https://cashflow.assist.id/admin/purchases");
    cy.get(".css-aidtzz > .MuiButtonBase-root", {timeout :10000}).click();
  });

  context("Pengujian Komponen", () => {
    it("Penulisan Judul Besar H5", () => {
      cy.get(".MuiTypography-h5 > span").should("have.text", "Pembelian Baru");
    });

    it("Penulisan Label", () => {
      cy.get(
        ".css-h5fkc8 > :nth-child(1) > :nth-child(1) > .MuiFormLabel-root"
      ).should("have.text", "Nomor");
      cy.get(":nth-child(3) > .MuiFormLabel-root").should(
        "have.text",
        "Nama Supplier *"
      );
      cy.get(":nth-child(5) > .MuiFormLabel-root").should(
        "have.text",
        "Tgl Transaksi & Jatuh Tempo *"
      );
      cy.get(":nth-child(7) > .MuiFormLabel-root").should(
        "have.text",
        "Syarat Pembayaran"
      );
      cy.get(":nth-child(9) > .MuiFormLabel-root").should(
        "have.text",
        "Alamat Penagihan"
      );
      cy.get(
        ".css-h5fkc8 > .MuiBox-root > .css-k27tlm > .MuiGrid2-grid-md-4 > .MuiFormLabel-root"
      ).should("have.text", "Harga Termasuk Pajak");
      cy.get(".MuiTableHead-root > .MuiTableRow-root > :nth-child(1)").should(
        "have.text",
        "Tipe Pembelian"
      );
      cy.get(".MuiTableHead-root > .MuiTableRow-root > :nth-child(2)").should(
        "have.text",
        "Nama Produk"
      );
      cy.get(".MuiTableHead-root > .MuiTableRow-root > :nth-child(3)").should(
        "have.text",
        "Gudang"
      );
      cy.get(".MuiTableHead-root > .MuiTableRow-root > :nth-child(4)").should(
        "have.text",
        "Deskripsi"
      );
      cy.get(".MuiTableHead-root > .MuiTableRow-root > :nth-child(5)").should(
        "have.text",
        "Qty"
      );
      cy.get(".MuiTableHead-root > .MuiTableRow-root > :nth-child(6)").should(
        "have.text",
        "Satuan"
      );
      cy.get(".MuiTableHead-root > .MuiTableRow-root > :nth-child(7)").should(
        "have.text",
        "Akun Pembelian"
      );
      cy.get(".MuiTableHead-root > .MuiTableRow-root > :nth-child(8)").should(
        "have.text",
        "Harga"
      );
      cy.get(".MuiTableHead-root > .MuiTableRow-root > :nth-child(9)").should(
        "have.text",
        "Diskon (%)"
      );
      cy.get(".MuiTableHead-root > .MuiTableRow-root > :nth-child(10)").should(
        "have.text",
        "Pajak"
      );
      cy.get(".MuiTableHead-root > .MuiTableRow-root > :nth-child(11)").should(
        "have.text",
        "Jumlah"
      );
      cy.get(":nth-child(2) > .MuiTableCell-root > .MuiButtonBase-root").should(
        "have.text",
        "Baris Baru"
      );
      cy.get(".css-1df103p > .MuiTypography-h6").should(
        "have.text",
        "Lampiran & Catatan"
      );
      cy.get(".css-j8niae > :nth-child(1) > :nth-child(1)").should(
        "have.text",
        "Subtotal"
      );
      cy.get(".css-j8niae > :nth-child(3) > :nth-child(1)").should(
        "have.text",
        "PPN"
      );
      cy.get(".css-1sbcte6 > .MuiGrid2-container > .MuiTypography-root").should(
        "have.text",
        "Biaya Pengiriman"
      );
      cy.get(".css-j8niae > :nth-child(6) > :nth-child(1)").should(
        "have.text",
        "Total"
      );
      cy.get(
        ".css-qezgha > .MuiGrid2-grid-md-8 > .MuiGrid2-root > .MuiFormControlLabel-root > .MuiTypography-root"
      ).should("have.text", "Pemotongan");
      cy.get(".css-j8niae > :nth-child(9) > :nth-child(1)").should(
        "have.text",
        "Sisa Tagihan"
      );
      cy.get(".css-1vbtvw8 > .MuiButton-text").should("have.text", "Batalkan");
      cy.get(".MuiButton-contained").should("have.text", "Konfirmasi Simpan");
    });

    it("Validasi komponen input", () => {
      const today = new Date();
      const formattedDate = `${today.getDate().toString().padStart(2, "0")}/${(
        today.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}/${today.getFullYear()}`;
      console.log(formattedDate);

      cy.get("#nomor").should("have.attr", "Placeholder", "[Auto]");
      cy.get("#idSupplier").should("have.value", "");
      cy.get('input[id=":ra:"]').should("have.value", formattedDate);
      cy.get('Input[id=":rc:"]').should("have.value", formattedDate);
      cy.get("#paymentTerms").should("have.value", "");
      cy.get("#address").should("have.text", "");
      cy.get(
        ".MuiGrid2-root > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input"
      ).should("not.be.checked");
      cy.get('[id="pembelian.0.tipe_pembelian"]').should("have.value", "");
    });

    it("Validasi penulisan tab konten", () => {
      cy.get(".MuiBreadcrumbs-ol").should(
        "have.text",
        "Beranda/Pembelian/Pembelian Baru"
      );
    });
  });

  context("Pengujian tab navigasi", () => {
    it("Penulisan Tab Navigasi", () => {
      cy.get(".MuiBreadcrumbs-ol").should(
        "have.text",
        "Beranda/Pembelian/Pembelian Baru"
      );
    });

    it("Mundur dari Pembelian Baru ke Pembelian", () => {
      cy.get(":nth-child(3) > .MuiTypography-root > span").click();
      cy.get(".MuiTypography-h5 > span").should("have.text", "Pembelian");
    });

    it("Mundur dari Pembelian Baru Ke Beranda", () => {
      cy.get(
        ".MuiBreadcrumbs-ol > :nth-child(1) > .MuiTypography-root"
      ).click();
      cy.get(".MuiTypography-h5").should("have.text", "Beranda");
      cy.url().should("contains", "admin/dashboard");
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

  context("Uji Formulir", () => {
   
      it.only("Membuat satu Pembelian Baru Lengkap (cuma nambah)", () => {
        cy.intercept('GET', 'https://api-cashflow.assist.id/api/kontak/list?jenisKontak=suplier&limit=999*').as('KontakSuplier')
        cy.reload();
        cy.wait('@KontakSuplier')
        const today = new Date();
        const formattedDate = `${today.getDate().toString().padStart(2, "0")}/${(
          today.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}/${today.getFullYear()}`;
  
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 315);
  
        // Format tanggal setelah 315 hari
        const formattedPlus315 = `${futureDate
          .getDate()
          .toString()
          .padStart(2, "0")}/${(futureDate.getMonth() + 1)
          .toString()
          .padStart(2, "0")}/${futureDate.getFullYear()}`;
  
        cy.get("#nomor").type("00001");
        cy.get("#idSupplier").click();
        cy.get('#menu-idSupplier > .MuiPaper-root').scrollTo('bottom').should('be.visible')
        cy.get('[data-value="8ea24420-f97a-11ef-a763-4d5da318ddda"]')
            .should('be.visible')
            .click({force: true})
        cy.get('[data-value="8ea24420-f97a-11ef-a763-4d5da318ddda"]')
            .should('be.visible')
            .click({force: true})
        // cy.get('[data-value="8ea24420-f97a-11ef-a763-4d5da318ddda"]').click();
        // cy.get('[id="pembelian.0.product_name"]').type('Kain Perca')
        // cy.get('[id="pembelian.0.akun_pembelian_id"]').click()
        // cy.get('[data-value="c6518535-b24b-40ae-a4e3-682b26dc9074"]').click()
        // cy.get('[placeholder="DD/MM/YYYY"]').eq(0).should("have.value", formattedDate);
        // cy.get('[placeholder="DD/MM/YYYY"]').eq(1).should("have.value", formattedPlus315);
        // cy.get("#paymentTerms").click();
        // cy.contains("li", "termin sebulan 15").click();
        // // cy.get('#address').should('have.value', 'alamat')
        // cy.get('.MuiButton-contained').click()
      });
  });
});
