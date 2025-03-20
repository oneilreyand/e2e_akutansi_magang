describe("Pembelian-Semua", () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.loginWithAPI("rayhanrayandra.work.id@gmail.com", "Nz6}+#8y");
    cy.visit("https://cashflow.assist.id/admin/purchases");
    cy.get(".MuiTabs-flexContainer > :nth-child(1)").click();
    cy.get(".MuiTypography-h6").should(
      "have.text",
      "Semua Penagihan Pembelian"
    );
  });

  context("Pengujian Penulisan Komponen", () => {
    it("Testcase 1 : Penulisan Judul Besar H5", () => {
      cy.get(".MuiTypography-h5 > span").should("have.text", "Pembelian");
    });

    it("Testcase 2 : Penulisan Tombol Pembelian Baru", () => {
      cy.get(".css-aidtzz > .MuiButtonBase-root").should(
        "have.text",
        "Pembelian Baru"
      );
    });

    it("Testcase 3: Validasi penulisan tab konten", () => {
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

  context("Pengujian Fitur tab navigasi", () => {
    it("Testcase 1 : Penulisan Tab Navigasi", () => {
      cy.get(".MuiBreadcrumbs-ol").should("have.text", "Beranda/Pembelian");
    });

    it("testcase 2 : Mundur dari Pembelian Ke Beranda", () => {
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

  context("Pengujian Komponen Card Content", () => {
    const cardItems = [
      { key: "belumDibayar", title: "Belum Dibayar", index: 1 },
      { key: "telatBayar", title: "Telat Dibayar", index: 2 },
      {
        key: "pelunasanDiterima",
        title: "Pembayaran (30 Hari Terakhir)",
        index: 3,
      },
    ];

    it("Testcase 1 : Validasi semua card dengan data dari API", () => {
      cy.reload();
      cy.intercept(
        "GET",
        "https://api-cashflow.assist.id/api/pembelian/overview?companyId=b13e5210-8564-11ef-af27-a72e65a1d49c"
      ).as("getCardData");

      cy.wait("@getCardData").then((interception) => {
        const data = interception.response.body;

        const formatRupiah = (angka) =>
          new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }).format(angka);

        cardItems.forEach(({ key, title, index }) => {
          // Validasi Title & Subtitle
          cy.get(
            `:nth-child(${index}) > .MuiPaper-root > .MuiCardContent-root > .css-kdbf65 > .MuiStack-root > .MuiBadge-root > .MuiTypography-root`
          ).should("have.text", title);

          cy.get(
            `:nth-child(${index}) > .MuiPaper-root > .MuiCardContent-root > .css-kdbf65 > .MuiStack-root > .MuiTypography-body2`
          ).should("have.text", "Total Pembelian");

          // Validasi Total (jumlah transaksi)
          const totalEkspektasi =
            data[key].total > 99 ? "99+" : data[key].total.toString();
          cy.get(
            `:nth-child(${index}) > .MuiPaper-root > .MuiCardContent-root > .css-kdbf65 > .MuiStack-root > .MuiBadge-root > .MuiBadge-badge`
          ).should("have.text", totalEkspektasi);

          // Validasi Nominal (format Rupiah)
          cy.get(
            `:nth-child(${index}) > .MuiPaper-root > .MuiCardContent-root > .css-kdbf65 > .MuiStack-root > .MuiTypography-h5`
          ).should("have.text", formatRupiah(data[key].nominal));
        });
      });
    });

    it("Testcase 2 : Validasi badge hidden jika total transaksi 0", () => {
      cy.reload();
      cy.intercept(
        "GET",
        "https://api-cashflow.assist.id/api/pembelian/overview?companyId=b13e5210-8564-11ef-af27-a72e65a1d49c"
      ).as("getCardData");

      cy.wait("@getCardData").then((interception) => {
        const data = interception.response.body;

        cardItems.forEach(({ key, index }) => {
          const totalEkspektasi = data[key].total;

          if (totalEkspektasi === 0) {
            // Jika total transaksi 0, elemen harus tersembunyi (invisible)
            cy.get(
              `:nth-child(${index}) > .MuiPaper-root > .MuiCardContent-root > .css-kdbf65 > .MuiStack-root > .MuiBadge-root > .MuiBadge-badge`
            ).should("not.be.visible");
          } else {
            // Jika total transaksi lebih dari 0, tetap tampil dengan teks yang sesuai
            cy.get(
              `:nth-child(${index}) > .MuiPaper-root > .MuiCardContent-root > .css-kdbf65 > .MuiStack-root > .MuiBadge-root > .MuiBadge-badge`
            ).should(
              "have.text",
              totalEkspektasi > 99 ? "99+" : totalEkspektasi.toString()
            );
          }
        });
      });
    });

    it("Testcase 3 : Validasi kondisi bila seluruh data memiliki nilai 0", () => {
      cy.reload();
      cy.intercept(
        "GET",
        "https://api-cashflow.assist.id/api/pembelian/overview?companyId=b13e5210-8564-11ef-af27-a72e65a1d49c",
        {
          body: {
            belumDibayar: { total: 0, nominal: 0 },
            telatBayar: { total: 0, nominal: 0 },
            pelunasanDiterima: { total: 0, nominal: 0 },
          },
        }
      ).as("getCardData");

      cy.wait("@getCardData").then((interception) => {
        const data = interception.response.body;

        cardItems.forEach(({ key, index }) => {
          const totalEkspektasi = data[key].total;

          if (totalEkspektasi === 0) {
            // Jika total transaksi 0, elemen harus tersembunyi (invisible)
            cy.get(
              `:nth-child(${index}) > .MuiPaper-root > .MuiCardContent-root > .css-kdbf65 > .MuiStack-root > .MuiBadge-root > .MuiBadge-badge`
            ).should("not.be.visible");
          } else {
            // Jika total transaksi lebih dari 0, tetap tampil dengan teks yang sesuai
            cy.get(
              `:nth-child(${index}) > .MuiPaper-root > .MuiCardContent-root > .css-kdbf65 > .MuiStack-root > .MuiBadge-root > .MuiBadge-badge`
            ).should(
              "have.text",
              totalEkspektasi > 99 ? "99+" : totalEkspektasi.toString()
            );
          }

          // Validasi elemen lain seperti Title, Subtitle, dan Nominal
          cy.get(
            `:nth-child(${index}) > .MuiPaper-root > .MuiCardContent-root > .css-kdbf65 > .MuiStack-root > .MuiBadge-root > .MuiTypography-root`
          ).should("be.visible");

          cy.get(
            `:nth-child(${index}) > .MuiPaper-root > .MuiCardContent-root > .css-kdbf65 > .MuiStack-root > .MuiTypography-body2`
          ).should("have.text", "Total Pembelian");

          cy.get(
            `:nth-child(${index}) > .MuiPaper-root > .MuiCardContent-root > .css-kdbf65 > .MuiStack-root > .MuiTypography-h5`
          ).should("have.text", "Rp 0");
        });
      });
    });
  });

  context("Fitur Filter Tanggal", () => {
    it("Testcase 1 : Validasi penulisan Filter Tanggal", () => {
      cy.get(".MuiBox-root > .MuiButtonBase-root").should(
        "have.text",
        "Filter Tanggal"
      );
    });
    it("Testcase 2 : Check Input Ekspektasi tanggal awal adalah hari ini dan tanggal akhir adalah akhir tanggal bulan ini", () => {
      const today = new Date();
      const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
      const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

      const formatDate = (date) =>
        date.toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });

      const firstDayFormatted = formatDate(firstDay);
      const lastDayFormatted = formatDate(lastDay);

      cy.get(".MuiBox-root > .MuiButtonBase-root").click();
      cy.get(
        ":nth-child(1) > .MuiFormControl-root > .MuiInputBase-root"
      ).should("be.visible");
      cy.get(
        ".MuiBox-root > :nth-child(2) > .MuiFormControl-root > .MuiInputBase-root"
      ).should("be.visible");
      cy.get('[placeholder="DD/MM/YYYY"]')
        .eq(0)
        .should("have.value", firstDayFormatted);
      cy.get('[placeholder="DD/MM/YYYY"]')
        .eq(1)
        .should("have.value", lastDayFormatted);
    });

    it("Testcase 3 : Mengetikkan tanggal awal dan tanggal akhir menjadi 01/01/2024", () => {
      cy.get(".MuiBox-root > .MuiButtonBase-root").click();
      cy.get('[placeholder="DD/MM/YYYY"]').eq(0).type("01012024");
      cy.get('[placeholder="DD/MM/YYYY"]')
        .eq(0)
        .should("have.value", "01/01/2024");
      cy.get('[placeholder="DD/MM/YYYY"]').eq(1).type("28012024");
      cy.get('[placeholder="DD/MM/YYYY"]')
        .eq(1)
        .should("have.value", "28/01/2024");
      cy.get(".MuiGrid2-container > .MuiButton-contained").click();
    });

    it("Testcase 4 : Reset semua tanggal dengan ekspektasi tanggal hari ini", () => {
      const today = new Date();
      const formattedDate = today.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      cy.get(".MuiBox-root > .MuiButtonBase-root").click()
      cy.get('[placeholder="DD/MM/YYYY"]').eq(0).type("01012024");
      cy.get('[placeholder="DD/MM/YYYY"]')
        .eq(0)
        .should("have.value", "01/01/2024");
      cy.get('[placeholder="DD/MM/YYYY"]').eq(1).type("28012024");
      cy.get('[placeholder="DD/MM/YYYY"]')
        .eq(1)
        .should("have.value", "28/01/2024");
      cy.get(".MuiButton-outlined").click()
      cy.get('[placeholder="DD/MM/YYYY"]').should('have.value',formattedDate )
    });
  });

  context("Fitur Cari Pembelian", () => {
    it("Testcase 1 : Placeholder Fitur Cari ", () => {
      cy.get('input[placeholder="Cari"]').should("be.exist");
    });
  });

  context("Fitur Komponen Table", () => {
    it("Testcase 1 : Pengujian penulisan Tablehead", () => {
      cy.get("table thead").within(() => {
        cy.contains("Tanggal").should("be.visible");
        cy.contains("Nomor").should("be.visible");
        cy.contains("Nama Suplier").should("be.visible");
        cy.contains("Tgl Jatuh Tempo").should("be.visible");
        cy.contains("Status").should("be.visible");
        cy.contains("Sisa Tagihan").should("be.visible");
        cy.contains("Total Tagihan").should("be.visible");
      });
    });

    it("Testcase 2 : Pengujian isi tabel sesuai dengan ketentuan dan Data dari API", () => {
      cy.getCookie("authToken").then((cookie) => {
        const token = cookie?.value;
        expect(token).to.exist; // Pastikan token valid

        // Request data dari API
        cy.request({
          method: "GET",
          url: "https://api-cashflow.assist.id/api/pembelian?status=&startDate=2025-03-01&endDate=2025-03-31&skip=0&limit=10&companyId=b13e5210-8564-11ef-af27-a72e65a1d49c",
          headers: { Authorization: `Bearer ${token}` },
        }).then((response) => {
          expect(response.status).to.eq(200);
          const apiData = response.body.results; // Data dari API

          cy.get("table tbody tr").should("have.length", apiData.length); // Pastikan jumlah baris sesuai API

          cy.get("table tbody tr").each(($row, index) => {
            const rowData = apiData[index];
            expect(rowData).to.exist; // Pastikan data API tersedia

            // Debugging untuk memastikan data yang diambil benar
            console.log("Validating row:", index, rowData);
            const formatTanggalAPI = (isoDate) => {
              if (!isoDate) return "-"; // Jika tanggal null atau undefined, tampilkan "-"

              const date = new Date(isoDate);

              // Jika format tanggal tidak valid, kembalikan string asli
              if (isNaN(date.getTime())) {
                console.warn("Invalid date format:", isoDate);
                return isoDate;
              }

              // Ambil 2 digit terakhir dari tahun
              const day = String(date.getDate()).padStart(2, "0");
              const month = String(date.getMonth() + 1).padStart(2, "0"); // +1 karena bulan di JavaScript dimulai dari 0
              const year = String(date.getFullYear()).slice(-2);

              return `${day}/${month}/${year}`;
            };

            // 🔹 Fungsi untuk memformat angka ke format Rupiah
            const formatRupiah = (angka) =>
              new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(angka);
            // Ambil semua sel dalam baris
            cy.wrap($row)
              .find("td")
              .then(($cells) => {
                expect($cells.eq(0)).to.have.text(
                  formatTanggalAPI(rowData.tanggal_transaksi)
                ); // Tanggal Transaksi
                expect($cells.eq(1)).to.have.text(rowData.nomor); // Nomor Invoice
                expect($cells.eq(2)).to.have.text(rowData.supplier.nama); // Nama Supplier
                expect($cells.eq(3)).to.have.text(
                  formatTanggalAPI(rowData.tanggal_jatuh_tempo)
                ); // Tgl Jatuh Tempo
                expect($cells.eq(4)).to.have.text(rowData.status); // Status Pembayaran
                expect($cells.eq(5)).to.have.text(
                  formatRupiah(rowData.sisa_tagihan)
                ); // Sisa Tagihan
                expect($cells.eq(6)).to.have.text(formatRupiah(rowData.total)); // Total Tagihan
              });
          });
        });
      });
    });

    it('Testcase 3 : Pengujian detail pembelian mengarahkan ke halaman yang benar', () => {
      cy.get(':nth-child(1) > :nth-child(2) > span > a > .MuiButtonBase-root')
        .invoke('text')
        .then((nomor) => {
          cy.get(':nth-child(1) > :nth-child(3) > span > a > .MuiButtonBase-root')
            .invoke('text')
            .then((nama) => {
              // Klik pada tombol pertama
              cy.get(':nth-child(1) > :nth-child(2) > span > a > .MuiButtonBase-root').click();
    
              // Verifikasi halaman detail pembelian
              cy.get('.MuiTypography-h5').should('have.text', 'Detail Pembelian');
    
              // Verifikasi nomor yang sesuai
              cy.get(':nth-child(3) > :nth-child(1) > .MuiGrid2-root > .MuiTypography-root')
                .should('have.text', nomor.trim());
    
              // Verifikasi nama yang sesuai
              cy.get('.MuiCardContent-root > :nth-child(1) > .MuiGrid2-container > :nth-child(1) > .MuiListItem-root > .MuiListItemText-root > .MuiTypography-body2')
                .should('have.text', nama.trim());
            });
        });    
    });
    
  });

  context("Fitur Pagination", () => {
    it("Testcase 1 : Validasi penulisan label pagination", () => {
      cy.intercept(
        "GET",
        "https://api-cashflow.assist.id/api/pembelian?status=&startDate=*"
      ).as("getKontak");
      cy.reload();
      cy.wait("@getKontak").then((interception) => {
        // Ambil URL request yang diintercept
        const requestUrl = new URL(interception.request.url);
        cy.log(`Intercepted URL: ${requestUrl}`);

        // Ambil nilai parameter "skip" dari query string
        const skipValue = parseInt(
          requestUrl.searchParams.get("skip") || "0",
          10
        );

        // Ambil totalData dan limitData dari respons API
        const totalData = interception.response.body.totalData;
        const limitData = interception.response.body.results.length;
        const maxPage = Math.ceil(totalData / 10);
        const startData = totalData === 0 ? 0 : skipValue + 1;
        const endData = skipValue + limitData;
        cy.get(".MuiPagination-ul > :nth-child(1) > button")
          .should("exist")
          .and("be.disabled"); //arrow previous
        cy.get(".MuiPagination-ul > :nth-child(2) > button").should(
          "have.text",
          "1"
        );
        cy.get(".MuiPagination-ul > :nth-child(3) > button").should(
          "have.text",
          "2"
        );
        cy.get(".MuiPagination-ul > :nth-child(4) > button").should(
          "have.text",
          "3"
        );
        cy.get(".MuiPagination-ul > :nth-child(5) > button").should(
          "have.text",
          "4"
        );
        cy.get(".MuiPagination-ul > :nth-child(6) > button").should(
          "have.text",
          "5"
        );

        cy.get(":nth-child(7) > .MuiPaginationItem-root").should(
          "have.text",
          "…"
        );

        cy.get(".MuiPagination-ul > :nth-child(8) > button").should(
          "have.text",
          maxPage.toString()
        );
        cy.get(".MuiPagination-ul > :nth-child(9) > .MuiButtonBase-root")
          .should("exist")
          .and("be.enabled");

        cy.get(".css-1rqlbw1 > .MuiTypography-root").should(
          "have.text",
          `Menampilkan ${startData} - ${endData} dari ${totalData} data`
        );
      });
    });

    it("Testcase 2 : Menekan tombol next", () => {
      cy.intercept(
        "GET",
        "https://api-cashflow.assist.id/api/pembelian?status=&startDate=*skip=10*"
      ).as("getKontak");
      cy.reload();

      cy.get(".MuiPagination-ul > :nth-child(9) > .MuiButtonBase-root", {
        timeout: 10000,
      }).click();

      // Tunggu request selesai
      cy.wait("@getKontak").then((interception) => {
        // Ambil URL request yang diintercept
        const requestUrl = new URL(interception.request.url);
        cy.log(`Intercepted URL: ${requestUrl}`);

        // Ambil nilai parameter "skip" dari query string
        const skipValue = parseInt(
          requestUrl.searchParams.get("skip") || "0",
          10
        );

        // Ambil totalData dan limitData dari respons API
        const totalData = interception.response.body.totalData;
        const limitData = interception.response.body.results.length;
        const maxPage = Math.ceil(totalData / 10);
        const startData = totalData === 0 ? 0 : skipValue + 1;
        const endData = skipValue + limitData;
        cy.get(".MuiPagination-ul > :nth-child(1) > button")
          .should("exist")
          .and("be.enabled"); //arrow previous
        cy.get(".MuiPagination-ul > :nth-child(2) > button").should(
          "have.text",
          "1"
        );
        cy.get(".MuiPagination-ul > :nth-child(3) > button").should(
          "have.text",
          "2"
        );
        cy.get(".MuiPagination-ul > :nth-child(4) > button").should(
          "have.text",
          "3"
        );
        cy.get(".MuiPagination-ul > :nth-child(5) > button").should(
          "have.text",
          "4"
        );
        cy.get(".MuiPagination-ul > :nth-child(6) > button").should(
          "have.text",
          "5"
        );

        cy.get(":nth-child(7) > .MuiPaginationItem-root").should(
          "have.text",
          "…"
        );

        cy.get(".MuiPagination-ul > :nth-child(8) > button").should(
          "have.text",
          maxPage.toString()
        );
        cy.get(".MuiPagination-ul > :nth-child(9) > .MuiButtonBase-root")
          .should("exist")
          .and("be.enabled");

        // Verifikasi label yang muncul di UI
        cy.get(".css-1rqlbw1 > .MuiTypography-root").should(
          "have.text",
          `Menampilkan ${startData} - ${endData} dari ${totalData} data`
        );
      });
    });

    it("Testcase 3 : Menekan tombol before", () => {
      cy.get(".MuiPagination-ul > :nth-child(6) > .MuiButtonBase-root", {
        timeout: 10000,
      }).click();
      cy.intercept(
        "GET",
        "https://api-cashflow.assist.id/api/pembelian?status=&startDate=*skip=30*"
      ).as("getKontak");
      cy.get(".MuiPagination-ul > :nth-child(1) > .MuiButtonBase-root", {
        timeout: 10000,
      }).click();

      // Tunggu request selesai
      cy.wait("@getKontak").then((interception) => {
        // Ambil URL request yang diintercept
        const requestUrl = new URL(interception.request.url);
        cy.log(`Intercepted URL: ${requestUrl}`);

        // Ambil nilai parameter "skip" dari query string
        const skipValue = parseInt(
          requestUrl.searchParams.get("skip") || "0",
          10
        );

        // Ambil totalData dan limitData dari respons API
        const totalData = interception.response.body.totalData;
        const limitData = interception.response.body.results.length;
        const maxPage = Math.ceil(totalData / 10);
        const startData = totalData === 0 ? 0 : skipValue + 1;
        const endData = skipValue + limitData;
        cy.get(".MuiPagination-ul > :nth-child(1) > button")
          .should("exist")
          .and("be.enabled"); //arrow previous
        cy.get(".MuiPagination-ul > :nth-child(2) > button").should(
          "have.text",
          "1"
        );
        cy.get(".MuiPagination-ul > :nth-child(3) > button").should(
          "have.text",
          "2"
        );
        cy.get(".MuiPagination-ul > :nth-child(4) > button").should(
          "have.text",
          "3"
        );
        cy.get(".MuiPagination-ul > :nth-child(5) > button").should(
          "have.text",
          "4"
        );
        cy.get(".MuiPagination-ul > :nth-child(6) > button").should(
          "have.text",
          "5"
        );

        cy.get(":nth-child(7) > .MuiPaginationItem-root").should(
          "have.text",
          "…"
        );

        cy.get(".MuiPagination-ul > :nth-child(8) > button").should(
          "have.text",
          maxPage.toString()
        );
        cy.get(".MuiPagination-ul > :nth-child(9) > .MuiButtonBase-root")
          .should("exist")
          .and("be.enabled");

        // Verifikasi label yang muncul di UI
        cy.get(".css-1rqlbw1 > .MuiTypography-root").should(
          "have.text",
          `Menampilkan ${startData} - ${endData} dari ${totalData} data`
        );
      });
    });

    it("Testcase 4 : Pagination berada di tengah", () => {
      cy.intercept(
        "GET",
        "https://api-cashflow.assist.id/api/pembelian?status=&startDate=*skip=40*"
      ).as("getKontak");
      cy.reload();
      // Klik pada tombol pagination untuk halaman 3
      cy.get(".MuiPagination-ul > :nth-child(6) > .MuiButtonBase-root").click();

      // Tunggu request selesai
      cy.wait("@getKontak").then((interception) => {
        // Ambil URL request yang diintercept
        const requestUrl = new URL(interception.request.url);
        cy.log(`Intercepted URL: ${requestUrl}`);

        // Ambil nilai parameter "skip" dari query string
        const skipValue = parseInt(
          requestUrl.searchParams.get("skip") || "0",
          10
        );

        // Ambil totalData dan limitData dari respons API
        const totalData = interception.response.body.totalData;
        const limitData = interception.response.body.results.length;
        const maxPage = Math.ceil(totalData / 10);
        const startData = totalData === 0 ? 0 : skipValue + 1;
        const endData = skipValue + limitData;
        cy.get(".MuiPagination-ul > :nth-child(1) > button")
          .should("exist")
          .and("be.enabled"); //arrow previous
        cy.get(".MuiPagination-ul > :nth-child(2) > button").should(
          "have.text",
          "1"
        );
        cy.get(":nth-child(3) > .MuiPaginationItem-root").should(
          "have.text",
          "…"
        );
        cy.get(".MuiPagination-ul > :nth-child(4) > button").should(
          "have.text",
          "4"
        );
        cy.get(".MuiPagination-ul > :nth-child(5) > button").should(
          "have.text",
          "5"
        );
        cy.get(".MuiPagination-ul > :nth-child(6) > button").should(
          "have.text",
          "6"
        );

        cy.get(":nth-child(7) > .MuiPaginationItem-root").should(
          "have.text",
          "…"
        );

        cy.get(".MuiPagination-ul > :nth-child(8) > button").should(
          "have.text",
          maxPage.toString()
        );
        cy.get(".MuiPagination-ul > :nth-child(9) > .MuiButtonBase-root")
          .should("exist")
          .and("be.enabled");

        // Verifikasi label yang muncul di UI
        cy.get(".css-1rqlbw1 > .MuiTypography-root").should(
          "have.text",
          `Menampilkan ${startData} - ${endData} dari ${totalData} data`
        );
      });
    });

    it("Testcase 5 : Pagination berada di akhir", () => {
      cy.get(".MuiPagination-ul > :nth-child(8) > button")
        .invoke("text")
        .then((text) => {
          const maxPage = parseInt(text.trim(), 10); // Ambil angka maxPage dari UI
          const skip = (maxPage - 1) * 10; // Perhitungan skip yang benar

          cy.intercept(
            "GET",
            `https://api-cashflow.assist.id/api/pembelian?status=&startDate=*skip=${skip}*`
          ).as("getPaginationData");

          cy.reload();
          cy.get(
            ".MuiPagination-ul > :nth-child(8) > .MuiButtonBase-root"
          ).click();

          // Tunggu request API selesai
          cy.wait("@getPaginationData").then((interception) => {
            const requestUrl = new URL(interception.request.url);
            const skipValue = parseInt(
              requestUrl.searchParams.get("skip") || "0",
              10
            );

            const totalData = interception.response.body.totalData;
            const limitData = interception.response.body.results.length;
            const maxPage = Math.ceil(totalData / 10);
            const startData = totalData === 0 ? 0 : skipValue + 1;
            const endData = skipValue + limitData;

            // Validasi tombol pagination
            cy.get(".MuiPagination-ul > :nth-child(1) > button")
              .should("exist")
              .and("be.enabled"); // Arrow Previous

            cy.get(".MuiPagination-ul > :nth-child(2) > button").should(
              "have.text",
              "1"
            );
            cy.get(":nth-child(3) > .MuiPaginationItem-root").should(
              "have.text",
              "…"
            );

            cy.get(".MuiPagination-ul > :nth-child(4) > button").should(
              "have.text",
              (maxPage - 4).toString()
            );
            cy.get(".MuiPagination-ul > :nth-child(5) > button").should(
              "have.text",
              (maxPage - 3).toString()
            );
            cy.get(".MuiPagination-ul > :nth-child(6) > button").should(
              "have.text",
              (maxPage - 2).toString()
            );
            cy.get(":nth-child(7) > .MuiPaginationItem-root").should(
              "have.text",
              (maxPage - 1).toString()
            );
            cy.get(".MuiPagination-ul > :nth-child(8) > button").should(
              "have.text",
              maxPage.toString()
            );

            cy.get(".MuiPagination-ul > :nth-child(9) > .MuiButtonBase-root")
              .should("exist")
              .and("be.disabled"); // Arrow Next harus disabled

            // Validasi teks tampilan data pada UI
            cy.get(".css-1rqlbw1 > .MuiTypography-root").should(
              "have.text",
              `Menampilkan ${startData} - ${endData} dari ${totalData} data`
            );
          });
        });
    });

    it("Testcase 6 : Mencari satu nama dengan ekspektasi pagination sesuai", () => {
      cy.intercept(
        "GET",
        "https://api-cashflow.assist.id/api/pembelian?keyword=Uniquee*"
      ).as("getKeyword");
      cy.get('[placeholder="Cari"]').type("Uniquee");
      cy.wait("@getKeyword").then((interception) => {
        const requestUrl = new URL(interception.request.url);
        const skipValue = parseInt(
          requestUrl.searchParams.get("skip") || "0",
          10
        );

        const totalData = interception.response.body.totalData;
        const limitData = interception.response.body.results.length;
        const maxPage = Math.ceil(totalData / 10);
        const startData = totalData === 0 ? 0 : skipValue + 1;
        const endData = skipValue + limitData;

        cy.get(".MuiPagination-ul > :nth-child(1) > button")
          .should("exist")
          .and("be.disabled"); // Arrow Previous

        cy.get(".MuiPagination-ul > :nth-child(2) > button").should(
          "have.text",
          "1"
        );
        cy.get(".MuiPagination-ul > :nth-child(3) > button").should(
          "be.disabled"
        );

        cy.get(".MuiPagination-ul > :nth-child(4) > button").should(
          "not.be.exist"
        );

        cy.get(".css-1rqlbw1 > .MuiTypography-root").should(
          "have.text",
          `Menampilkan ${startData} - ${endData} dari ${totalData} data`
        );
      });
    });
  });
});
