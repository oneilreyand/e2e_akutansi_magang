describe("Check Komponen Suplier", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.loginWithAPI("rayhanrayandra.work.id@gmail.com", "Nz6}+#8y");
    cy.visit("https://cashflow.assist.id/admin/contacts");
    cy.get("#simple-tab-1", { timeout: 10000 }) //pindah ke tab suplier
      .click();
    cy.get(".MuiTypography-h6").contains("Suplier");
  });

  context('Pengujian sidebar', () => {
    it('Kontak ke beranda', () => {
      cy.get('[data-testid="drawer-item-dashboard"]').click()
      cy.url().should('eq','https://cashflow.assist.id/admin/dashboard')
      cy.get('h5').contains('Beranda')
    });
    it('Kontak ke laporan', () => {
      cy.get('[data-testid="drawer-item-reports"]').click()
      cy.url().should('eq','https://cashflow.assist.id/admin/reports')
      cy.get('h5').contains('Laporan')
    });
    it('Kontak ke kas & bank', () => {
      cy.get('[data-testid="drawer-item-cash-bank"]').click()
      cy.url().should('eq','https://cashflow.assist.id/admin/cash-bank')
      cy.get('h5').contains('Kas & Bank')
    });
    it('Kontak ke penjualan', () => {
      cy.get('[data-testid="drawer-item-sales"]').click()
      cy.url().should('eq','https://cashflow.assist.id/admin/sales')
      cy.get('h5').contains('Penjualan')
    });
    it('Kontak ke pembelian', () => {
      cy.get('[data-testid="drawer-item-purchases"]').click()
      cy.url().should('eq','https://cashflow.assist.id/admin/purchases')
      cy.get('h5').contains('Pembelian')
    });
    it('Kontak ke biaya', () => {
      cy.get('[data-testid="drawer-item-expenses"]').click()
      cy.url().should('eq','https://cashflow.assist.id/admin/expenses')
      cy.get('h5').contains('Biaya')
    });
    it('Kontak ke produk', () => {
      cy.get('[data-testid="drawer-item-products"]').click()
      cy.url().should('eq','https://cashflow.assist.id/admin/products')
      cy.get('h5').contains('Produk')
    });
    it('Kontak ke aset', () => {
      cy.get('[data-testid="drawer-item-assets"]').click()
      cy.url().should('eq','https://cashflow.assist.id/admin/assets')
      cy.get('h5').contains('Aset')
    });
    it('Kontak ke daftar akun', () => {
      cy.get('[data-testid="drawer-item-accounts"]').click()
      cy.url().should('eq','https://cashflow.assist.id/admin/accounts')
      cy.get('h5').contains('Akun')
    });
    it('Kontak ke pengaturan', () => {
      cy.get('[data-testid="drawer-item-settings"]').click()
      cy.url().should('eq','https://cashflow.assist.id/admin/settings')
      cy.get('h5').contains('Pengaturan')
    });
  })

  it("Validasi kesesuaian judul H5", () => {
    cy.get(".MuiTypography-h5 > span")
      .should("be.visible")
      .and("contain", "Kontak");
  });

  it("Validasi kesesuaian tab navigasi dan berfungsi", () => {
    cy.get(".MuiBreadcrumbs-ol")
      .should("be.visible")
      .and("contain", "Beranda")
      .and("contain", "/")
      .and("contain", "Kontak"); //keseluruhan tampilan dari navigasi
    cy.get(".MuiBreadcrumbs-ol > :nth-child(1) > .MuiTypography-root")
      .should("be.visible") // Memastikan elemen terlihat
      .and("have.attr", "href", "/admin/dashboard") // memastikan memiliki atribut href
      .click();
    cy.get("h5").should("contain", "Beranda").should("be.visible");
  });

  it("Validasi button buat kontak", () => {
    cy.get('.css-aidtzz > .MuiButtonBase-root')
      .should("contain", "Buat Kontak")
      .and("be.visible")
      .click();

    cy.get("h5").should("have.text", "Tambah Kontak");
  });

  it('Bila menambah kontak pada halaman suplier maka tipe kontak akan default suplier saat membuat kontak baru', () => {
    cy.get('.css-aidtzz > .MuiButtonBase-root').click()
  });

  context("Pengujian fungsi pada tab jenis kontak", () => {
    it("Perpindahan tab suplier ke tab pelanggan", () => {
      cy.get(".MuiTypography-h6").contains("Suplier");
      cy.get("#simple-tab-1")
        .should("contain", "Suplier")
        .and("be.visible")
        .click();

      cy.get("#simple-tab-0")
        .should("contain", "Pelanggan")
        .and("be.visible")
        .click();

      cy.get(".MuiTypography-h6").contains("Pelanggan");
    });

    it("Perpindahan tab suplier ke tab karyawan", () => {
      cy.get("#simple-tab-1")
        .should("contain", "Suplier")
        .and("be.visible")
        .click();

      cy.get("#simple-tab-2")
        .should("contain", "Karyawan")
        .and("be.visible")
        .click();

      cy.get(".MuiTypography-h6").contains("Karyawan");
    });
    it("Perpindahan tab suplier ke tab lainnya", () => {
      cy.get("#simple-tab-1")
        .should("contain", "Suplier")
        .and("be.visible")
        .click();

      cy.get("#simple-tab-3")
        .should("contain", "Lainnya")
        .and("be.visible")
        .click();
      cy.get(".MuiTypography-h6").contains("Lainnya");
    });
  });

  context("Pengujian conten card", () => {
    it("Card 1", () => {
      cy.get(".css-1i24z3d").should("belumSiap");
    });
  });

  context("Validasi tombol atur grup kontak dan import kontak", () => {
    it("Validasi keberadaan tombol atur grup kontak", () => {
      cy.get(".css-1avq450 > .MuiGrid2-container > :nth-child(1)")
        .should("have.text", "Atur Grup Kontak")
        .click();
      cy.get("#modal-title").should("have.text", "Pengaturan Group Kontak");
    });

    it("Validasi keberadaan tombol import kontak", () => {
      cy.get(".css-1avq450 > .MuiGrid2-container > :nth-child(2)")
        .should("have.text", "Import Kontak")
        .click();
      cy.get("#modal-title").should("have.text", "Import Data Suplier");
    });
  });

  context("Pengujian fitur Search Kontak", () => {
    it("Case 1 : Validasi penulisan placeholder search input", () => {
      cy.get('input[placeholder="Cari kontak"]').should("be.exist");
    });

    it("Case 2 : Memeriksa pagination ketika mencari data yang ditemukan hanya 1 maka pagination menyesuaikan dengan jumlah kontak yaitu 1", () => {
      cy.intercept(
        "GET",
        "https://api-cashflow.assist.id/api/kontak/list?jenisKontak=suplier&keyword=jangan+duplikat&skip=0*"
      ).as("searchKontak");
      cy.get('input[placeholder="Cari kontak"]').type("jangan duplikat");
      cy.wait("@searchKontak").then((interception) => {
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
        const startData = totalData === 0 ? 0 : skipValue + 1;
        const endData = skipValue + limitData;

        /* PAGINATIONS */
        cy.get(".MuiPagination-ul > :nth-child(1)")
          .find("button")
          .should("exist")
          .and("be.disabled"); //arrow previous
        cy.get(".MuiPagination-ul > :nth-child(2) > button").should("exist");
        cy.get(".MuiPagination-ul > :nth-child(3)").should("exist"); //element lain dengan expect not exist
        cy.get(".MuiPagination-ul > :nth-child(4) > button").should(
          "not.exist"
        ); //element lain dengan expect not exist
        cy.get(".MuiPagination-ul > :nth-child(5) > button").should(
          "not.exist"
        ); //element lain dengan expect not exist
        cy.get(".MuiPagination-ul > :nth-child(6) > button").should(
          "not.exist"
        ); //element lain dengan expect not exist
        cy.get(".MuiPagination-ul > :nth-child(7) > button").should(
          "not.exist"
        ); //element lain dengan expect not exist

        /* PAGINATION TEXT*/
        cy.get(".css-1rqlbw1 > .MuiTypography-root").should(
          "have.text",
          `Menampilkan ${startData} - ${endData} dari ${totalData} data`
        );
      });
    });

    it("Case 3 : Mencari salah satu nama kontak dengan lowercase menampilkan nama dengan format yang benar", () => {
      cy.get('[data-testid="search-input"]').type("lutfiandra");
      cy.wait(1000);
      cy.get(".MuiTableBody-root > :nth-child(1) > :nth-child(2)")
        .invoke("text") // Mengambil teks elemen
        .then((text) => text.trim()) // Memangkas spasi sebelum memeriksa
        .should("eq", "Lutfiandra");
    });

    it("Case 4 : Mencari salah satu nama kontak dengan uppercase menampilkan nama dengan format yang benar", () => {
      cy.get('[data-testid="search-input"]').type("LUTFIANDRA");
      cy.wait(1000);
      cy.get(".MuiTableBody-root > :nth-child(1) > :nth-child(2)")
        .invoke("text") // Mengambil teks elemen
        .then((text) => text.trim()) // Memangkas spasi sebelum memeriksa
        .should("eq", "Lutfiandra");
    });

    it("Case 5 : Mencari salah satu nama kontak dengan mengetikkan nama depan menampilkan nama dengan format yang benar", () => {
      cy.get('[data-testid="search-input"]').type("DEPAN");
      cy.get(".MuiTableBody-root > :nth-child(1) > :nth-child(2)")
        .invoke("text") // Mengambil teks elemen
        .then((text) => text.trim()) // Memangkas spasi sebelum memeriksa
        .should("eq", "Depan Tengah Belakang");
    });
    it("Case 6 : Mencari salah satu nama kontak dengan mengetikkan nama belakang menampilkan nama dengan format yang benar", () => {
      cy.get('[data-testid="search-input"]').type("TENGAH");
      cy.get(".MuiTableBody-root > :nth-child(1) > :nth-child(2)")
        .invoke("text") // Mengambil teks elemen
        .then((text) => text.trim()) // Memangkas spasi sebelum memeriksa
        .should("eq", "Depan Tengah Belakang");
    });

    it("Case 7 : Mencari salah satu nama kontak dengan mengetikkan nama tengah menampilkan nama dengan format yang benar", () => {
      cy.get('[data-testid="search-input"]').type("BELAKANG");
      cy.get(".MuiTableBody-root > :nth-child(1) > :nth-child(2)")
        .invoke("text") // Mengambil teks elemen
        .then((text) => text.trim()) // Memangkas spasi sebelum memeriksa
        .should("eq", "Depan Tengah Belakang");
    });

    it("Case 8 : Mencari salah satu nama kontak dengan mengetikkan email", () => {
      cy.get('[data-testid="search-input"]').type("email@lengkap.com");
      cy.get(".MuiTableBody-root > :nth-child(1) > :nth-child(4)").should(
        "contain",
        "email@lengkap.com"
      );
    });

    it("Case 9 : Mencari salah satu nama kontak yang tidak ada, muncul warning tidak ada data ", () => {
      cy.get('[data-testid="search-input"]').type("Data Not Found ");
      cy.get(
        ".MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root"
      ).should("have.text", "Tidak ada data");
    });
  });

  context("Pengujian fungsi tabel", () => {
    it("Case 1 : Validasi penulisan cardhead H6 ekpektasi Suplier", () => {
      cy.get(".MuiTypography-h6").should("have.text", "Suplier");
    });
    it("Case 2 : Validasi kesesuaian thead", () => {
      cy.get("table thead").within(() => {
        cy.contains("ID").should("be.visible");
        cy.contains("Nama Lengkap").should("be.visible");
        cy.contains("Grup Kontak").should("be.visible");
        cy.contains("Email & No Handphone").should("be.visible");
        cy.contains("Alamat").should("be.visible");
        cy.contains("Total Piutang").should("be.visible");
      });
    });

    it('Case 3 : Validasi konten dengan ekspektasi setiap objek memiliki key "tipe_kontak" dengan value "suplier"', () => {
      // Memastikan token valid sebelum melanjutkan
      cy.getCookie("authToken").then((cookie) => {
        const token = cookie?.value;
        expect(token).to.exist; // Memastikan token ada

        // Menggunakan token untuk permintaan API
        cy.request({
          method: "GET",
          url: "https://api-cashflow.assist.id/api/kontak/list?jenisKontak=suplier&skip=0&limit=10&companyId=b13e5210-8564-11ef-af27-a72e65a1d49c",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          // Validasi status respons
          expect(response.status).to.eq(200);

          // Ambil data dari API
          const apiData = response.body.results;

          // Validasi setiap objek dalam array memiliki key "tipe_kontak" dengan nilai "suplier"
          apiData.forEach((item) => {
            expect(item).to.have.property("tipe_kontak", "suplier");
          });
        });
      });
    });

    it("Case 4 : Validasi bahwa data yang diambil hanya 10", () => {
      cy.viewport(2000, 1600);

      // Ambil token dari cookie
      cy.getCookie("authToken").then((cookie) => {
        const token = cookie?.value;

        // Pastikan token valid
        expect(token).to.exist;

        // Gunakan token untuk mendapatkan data API
        cy.request({
          method: "GET",
          url: "https://api-cashflow.assist.id/api/kontak/list?jenisKontak=suplier&skip=0&limit=10&companyId=b13e5210-8564-11ef-af27-a72e65a1d49c",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          // Validasi status respons
          expect(response.status).to.eq(200);

          // Ambil data dari API
          const apiData = response.body.results;

          // Validasi jumlah baris tabel sesuai dengan data API
          expect(apiData.length).to.be.lte(10);
        });
      });
    });

    it("Case 5 : Apabila data kosong dari api maka isi tabel kosong", () => {
      cy.intercept(
        "GET",
        "https://api-cashflow.assist.id/api/kontak/list?jenisKontak=suplier&skip=0*",
        {
          statusCode: 200, // Status sukses
          body: {
            results: [],
            totalData: 0, // Total data
          },
        }
      ).as("getKontak");
      cy.get("#simple-tab-0").click();
      cy.get("#simple-tab-1").click();
      cy.wait("@getKontak").then((interception) => {
        cy.get(
          ".MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root"
        ).should("have.text", "Tidak ada data");
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
        const startData = totalData === 0 ? 0 : skipValue + 1;
        const endData = skipValue + limitData;
        cy.get(".css-1rqlbw1 > .MuiTypography-root").should(
          "have.text",
          `Menampilkan ${startData} - ${endData} dari ${totalData} data`
        );
      });
    });

    it("Case 6 : Validasi isi tabel sesuai berdasarkan data dari API", () => {
      cy.viewport(2000, 1600);

      // Ambil token dari cookie
      cy.getCookie("authToken").then((cookie) => {
        const token = cookie?.value;

        // Pastikan token valid
        expect(token).to.exist;

        // Gunakan token untuk mendapatkan data dari API
        cy.request({
          method: "GET",
          url: "https://api-cashflow.assist.id/api/kontak/list?jenisKontak=suplier&skip=0&limit=10&companyId=b13e5210-8564-11ef-af27-a72e65a1d49c",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          // Validasi status respons
          expect(response.status).to.eq(200);

          // Ambil data dari API
          const apiData = response.body.results;

          // Tunggu untuk memastikan elemen tabel dimuat
          cy.wait(2000);

          // Validasi konten data di dalam tabel (tbody)
          cy.get("table tbody tr").each(($row, index) => {
            const rowData = apiData[index];

            // Pastikan data dari API ada
            expect(rowData).to.exist;

            cy.wrap($row)
              .find("td")
              .then(($cells) => {
                // Validasi ID
                const idFromTable =
                  $cells.eq(0).attr("data-id") || $cells.eq(0).text().trim();
                const idFromAPI = rowData.id;
                expect(idFromTable).to.eq(idFromAPI);

                // Validasi Nama Lengkap
                const namaFromTable = $cells.eq(1).text().trim();
                const namaFromAPI = rowData.nama?.trim();
                expect(namaFromTable).to.eq(namaFromAPI);

                // Validasi Grup Kontak
                const grupKontakFromAPI = rowData.grup_kontak_nama?.join(", ");
                const grupKontakFromTable = $cells.eq(2).text().trim();
                expect(grupKontakFromTable).to.eq(grupKontakFromAPI);

                // Validasi Email & No Handphone
                const emails = rowData.email_kontak_email || []; // Ambil semua email sebagai array
                const noHp = rowData.no_hp || ""; // Nomor telepon (kosong jika tidak ada)

                // Ambil elemen <p> di dalam sel ke-3 (kolom Email & No Handphone)
                $cells
                  .eq(3)
                  .find("p")
                  .each((i, element) => {
                    const textFromTable = Cypress.$(element).text().trim();

                    if (i < emails.length) {
                      // Validasi untuk email berdasarkan indeks
                      const emailFromAPI = emails[i];
                      expect(textFromTable).to.eq(emailFromAPI);
                    } else if (i === emails.length) {
                      // Validasi untuk nomor telepon (berada setelah email)
                      expect(textFromTable).to.eq(noHp);
                    } else {
                      // Tidak boleh ada elemen tambahan selain email dan noHp
                      throw new Error(
                        `Elemen <p> tambahan ditemukan pada index ${i}`
                      );
                    }
                  });

                // Validasi Alamat
                const alamatFromAPI = rowData.alamat_pengiriman?.trim() || "";
                const alamatFromTable = $cells.eq(4).text().trim();
                expect(alamatFromTable).to.eq(alamatFromAPI);

                // Validasi Total Piutang
                function formatWithThousandSeparator(value) {
                  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                }

                const totalPiutangFromAPI = formatWithThousandSeparator(
                  rowData.total_piutang?.toString() || "0"
                );
                const totalPiutangFromTable = $cells
                  .eq(5)
                  .text()
                  .trim()
                  .replace(/^Rp\s*/, "");
                expect(totalPiutangFromTable).to.eq(totalPiutangFromAPI);
              });
          });
        });
      });
    });

    it("Case 7 : pastikan nama dapat ditekan dan mengarahkan ke detail kontak yang benar", () => {
      // Tunggu untuk memastikan tabel dimuat (jika perlu)
      cy.wait(2000);

      // Menyimpan ID kontak sebagai alias
      cy.get(".MuiTableBody-root > :nth-child(1) > :nth-child(1)")
        .invoke("text")
        .then((text) => {
          cy.wrap(text.trim()).as("idKontak"); // Menyimpan teks sebagai alias
        });

      // Menggunakan alias di langkah berikutnya
      cy.get("@idKontak").then((idKontak) => {
        // Memastikan href sesuai dengan ID kontak
        cy.get(
          ".MuiTableBody-root > :nth-child(1) > :nth-child(2) > .MuiButtonBase-root"
        ).should("have.attr", "href", `/admin/contacts/${idKontak}`);

        // Mengklik nama kontak
        cy.get(
          ".MuiTableBody-root > :nth-child(1) > :nth-child(2) > .MuiButtonBase-root"
        ).click();

        // Memastikan URL sesuai dengan ID kontak
        cy.url().should("include", `/admin/contacts/${idKontak}`);
      });
    });
  });

  context("Pengujian Pagination", () => {
    it("Case 1 : Page 1 | Label Menampilkan 1 - ${limitData} dari ${totalData} data", () => {
      cy.intercept(
        "GET",
        "https://api-cashflow.assist.id/api/kontak/list?jenisKontak=suplier&skip=0&limit=10*"
      ).as("getKontak");
      cy.get("#simple-tab-0").click();
      cy.get("#simple-tab-1").click();
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
        const startData = totalData === 0 ? 0 : skipValue + 1;
        const endData = skipValue + limitData;
        cy.get(".css-1rqlbw1 > .MuiTypography-root").should(
          "have.text",
          `Menampilkan ${startData} - ${endData} dari ${totalData} data`
        );
      });
    });

    it("Case 2 : Page 3 | Label Menampilkan 21 - ${limitData} dari ${totalData} data", () => {
      cy.intercept("GET", "/api/kontak/list*skip=20*").as("getKontak");
      cy.get("#simple-tab-0").click();
      cy.get("#simple-tab-1").click();
      // Klik pada tombol pagination untuk halaman 3
      cy.get(".MuiPagination-ul > :nth-child(4) > .MuiButtonBase-root", {
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
        const startData = totalData === 0 ? 0 : skipValue + 1;
        const endData = skipValue + limitData;

        // Verifikasi label yang muncul di UI
        cy.get(".css-1rqlbw1 > .MuiTypography-root").should(
          "have.text",
          `Menampilkan ${startData} - ${endData} dari ${totalData} data`
        );
      });
    });

    it("Case 3 : Jika data api < 10 maka paginiation hanya 1 buah", () => {
      cy.intercept("GET", "/api/kontak/list*skip=0*", {
        statusCode: 200, // Status sukses
        body: {
          results: [
            {
              id: 1,
              nama: "Kontak A",
              email_kontak_email: ["kontakA@example.com"],
            },
            {
              id: 2,
              nama: "Kontak B",
              email_kontak_email: ["kontakB@example.com"],
            },
            {
              id: 3,
              nama: "Kontak C",
              email_kontak_email: ["kontakC@example.com"],
            },
            {
              id: 4,
              nama: "Kontak D",
              email_kontak_email: ["kontakD@example.com"],
            },
            {
              id: 5,
              nama: "Kontak E",
              email_kontak_email: ["kontakE@example.com"],
            },
          ],
          totalData: 5, // Total data
        },
      }).as("getKontak");
      cy.get("#simple-tab-0").click();
      cy.get("#simple-tab-1").click();
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
        const startData = totalData === 0 ? 0 : skipValue + 1;
        const endData = skipValue + limitData;

        /* PAGINATIONS */
        cy.get(".MuiPagination-ul > :nth-child(1)")
          .find("button")
          .should("exist")
          .and("be.disabled"); //arrow previous
        cy.get(".MuiPagination-ul > :nth-child(2)")
          .find("button")
          .should("exist");
        cy.get(".MuiPagination-ul > :nth-child(3)")
          .find("button")
          .should("exist")
          .and("be.disabled"); //arrow next
        cy.get(".MuiPagination-ul > :nth-child(4) > button").should(
          "not.exist"
        ); //element lain dengan expect not exist
        cy.get(".MuiPagination-ul > :nth-child(5) > button").should(
          "not.exist"
        ); //element lain dengan expect not exist
        cy.get(".MuiPagination-ul > :nth-child(6) > button").should(
          "not.exist"
        ); //element lain dengan expect not exist
        cy.get(".MuiPagination-ul > :nth-child(7) > button").should(
          "not.exist"
        ); //element lain dengan expect not exist

        /* PAGINATION TEXT*/
        cy.get(".css-1rqlbw1 > .MuiTypography-root").should(
          "have.text",
          `Menampilkan ${startData} - ${endData} dari ${totalData} data`
        );
      });
    });

    it("Case 4 : Jika data api > 60 dan <=70 maka jumlah paginiation 7 buah tanpa hidden pagination", () => {
      cy.intercept(
        "GET",
        "https://api-cashflow.assist.id/api/kontak/list?jenisKontak=suplier&skip=0&limit=10*",
        {
          statusCode: 200, // Status sukses
          body: {
            results: [
              {
                id: 1,
                nama: "Kontak A",
                email_kontak_email: ["kontakA@example.com"],
              },
              {
                id: 2,
                nama: "Kontak B",
                email_kontak_email: ["kontakB@example.com"],
              },
              {
                id: 3,
                nama: "Kontak C",
                email_kontak_email: ["kontakC@example.com"],
              },
              {
                id: 4,
                nama: "Kontak D",
                email_kontak_email: ["kontakD@example.com"],
              },
              {
                id: 5,
                nama: "Kontak E",
                email_kontak_email: ["kontakE@example.com"],
              },
              {
                id: 1,
                nama: "Kontak A",
                email_kontak_email: ["kontakA@example.com"],
              },
              {
                id: 2,
                nama: "Kontak B",
                email_kontak_email: ["kontakB@example.com"],
              },
              {
                id: 3,
                nama: "Kontak C",
                email_kontak_email: ["kontakC@example.com"],
              },
              {
                id: 4,
                nama: "Kontak D",
                email_kontak_email: ["kontakD@example.com"],
              },
              {
                id: 5,
                nama: "Kontak E",
                email_kontak_email: ["kontakE@example.com"],
              },
            ],
            totalData: 61, // Total data
          },
        }
      ).as("getKontak");
      cy.get("#simple-tab-0").click();
      cy.get("#simple-tab-1").click();
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
        const startData = totalData === 0 ? 0 : skipValue + 1;
        const endData = skipValue + limitData;

        /* PAGINATIONS */
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
        cy.get(".MuiPagination-ul > :nth-child(7) > button").should(
          "have.text",
          "6"
        );
        cy.get(".MuiPagination-ul > :nth-child(8) > button").should(
          "have.text",
          "7"
        );
        cy.get(".MuiPagination-ul > :nth-child(7) > button")
          .should("exist")
          .and("be.enabled");

        /* PAGINATION TEXT*/
        cy.get(".css-1rqlbw1 > .MuiTypography-root").should(
          "have.text",
          `Menampilkan ${startData} - ${endData} dari ${totalData} data`
        );
      });
    });

    it("Case 5 : Pagination pada awal page seharusnya menyembunyikan page > 5 dan memunculkan page terakhir", () => {
      cy.getCookie("authToken").then((cookie) => {
        const token = cookie?.value;
        cy.request({
          method: "GET",
          url: "https://api-cashflow.assist.id/api/kontak/list?jenisKontak=suplier&skip=0&limit=10&companyId=b13e5210-8564-11ef-af27-a72e65a1d49c",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          const totalData = response.body.totalData;
          const maxPage = Math.ceil(totalData / 10);

          cy.get('button[aria-label="Go to previous page"]').should(
            "be.disabled"
          );

          cy.get(
            ".MuiPagination-ul > :nth-child(2) > .MuiButtonBase-root"
          ).should("have.text", "1");
          cy.get(
            ".MuiPagination-ul > :nth-child(3) > .MuiButtonBase-root"
          ).should("have.text", "2");
          cy.get(
            ".MuiPagination-ul > :nth-child(4) > .MuiButtonBase-root"
          ).should("have.text", "3");
          cy.get(
            ".MuiPagination-ul > :nth-child(5) > .MuiButtonBase-root"
          ).should("have.text", "4");
          cy.get(
            ".MuiPagination-ul > :nth-child(6) > .MuiButtonBase-root"
          ).should("have.text", "5");
          cy.get(":nth-child(7) > .MuiPaginationItem-root").should(
            "have.text",
            "…"
          );
          cy.get(
            ".MuiPagination-ul > :nth-child(8) > .MuiButtonBase-root"
          ).should("have.text", maxPage);
          cy.get('button[aria-label="Go to next page"]').should("be.enabled");
        });
      });
    });

    it("Case 6 : Pagination pada middle page seharusnya menampilkan page paling awal, menyembunyikan halaman yang berjarak satu diatas atau satu dibawah dari page dipilih lalu menampilkan page terakhir", () => {
      cy.get(".MuiPagination-ul > :nth-child(6) > .MuiButtonBase-root")
        .should("have.text", "5")
        .click();
      cy.getCookie("authToken").then((cookie) => {
        const token = cookie?.value;
        cy.request({
          method: "GET",
          url: "https://api-cashflow.assist.id/api/kontak/list?jenisKontak=suplier&skip=40&limit=10&companyId=b13e5210-8564-11ef-af27-a72e65a1d49c",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          const totalData = response.body.totalData;
          const maxPage = Math.ceil(totalData / 10);

          cy.get('button[aria-label="Go to previous page"]').should(
            "be.enabled"
          );

          cy.get(
            ".MuiPagination-ul > :nth-child(2) > .MuiButtonBase-root"
          ).should("have.text", "1", { Timeout: 10000 });
          cy.get(":nth-child(3) > .MuiPaginationItem-root").should(
            "have.text",
            "…",
            { Timeout: 10000 }
          );
          cy.get(
            ".MuiPagination-ul > :nth-child(4) > .MuiButtonBase-root"
          ).should("have.text", "4", { Timeout: 10000 });
          cy.get(
            ".MuiPagination-ul > :nth-child(5) > .MuiButtonBase-root"
          ).should("have.text", "5", { Timeout: 10000 });
          cy.get(
            ".MuiPagination-ul > :nth-child(6) > .MuiButtonBase-root"
          ).should("have.text", "6", { Timeout: 10000 });
          cy.get(":nth-child(7) > .MuiPaginationItem-root").should(
            "have.text",
            "…",
            { Timeout: 10000 }
          );
          cy.get(
            ".MuiPagination-ul > :nth-child(8) > .MuiButtonBase-root"
          ).should("have.text", maxPage, { Timeout: 10000 });
          cy.get('button[aria-label="Go to next page"]').should("be.enabled");
        });
      });
    });

    it("Case 7 : Pagination pada end page seharusnya menampilkan page paling akhir, menyembunyikan halaman yang < 5 dari page terakhir", () => {
      cy.get(".MuiPagination-ul > :nth-child(8) > .MuiButtonBase-root").click();
      cy.getCookie("authToken").then((cookie) => {
        const token = cookie?.value;
        cy.request({
          method: "GET",
          url: "https://api-cashflow.assist.id/api/kontak/list?jenisKontak=suplier&skip=0&limit=10&companyId=b13e5210-8564-11ef-af27-a72e65a1d49c",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          const totalData = response.body.totalData;
          const maxPage = Math.ceil(totalData / 10);
          const reverseMaxPage = maxPage - 1;
          const reverseMaxPage1 = maxPage - 2;
          const reverseMaxPage2 = maxPage - 3;
          const reverseMaxPage3 = maxPage - 4;

          cy.get('button[aria-label="Go to previous page"]').should(
            "be.enabled"
          );

          cy.get(
            ".MuiPagination-ul > :nth-child(2) > .MuiButtonBase-root"
          ).should("have.text", "1", { Timeout: 10000 });
          cy.get(":nth-child(3) > .MuiPaginationItem-root").should(
            "have.text",
            "…",
            { Timeout: 10000 }
          );
          cy.get(
            ".MuiPagination-ul > :nth-child(4) > .MuiButtonBase-root"
          ).should("have.text", reverseMaxPage3, { Timeout: 10000 });
          cy.get(
            ".MuiPagination-ul > :nth-child(5) > .MuiButtonBase-root"
          ).should("have.text", reverseMaxPage2, { Timeout: 10000 });
          cy.get(
            ".MuiPagination-ul > :nth-child(6) > .MuiButtonBase-root"
          ).should("have.text", reverseMaxPage1, { Timeout: 10000 });
          cy.get(":nth-child(7) > .MuiPaginationItem-root").should(
            "have.text",
            reverseMaxPage,
            { Timeout: 10000 }
          );
          cy.get(
            ".MuiPagination-ul > :nth-child(8) > .MuiButtonBase-root"
          ).should("have.text", maxPage, { Timeout: 10000 });
          cy.get('button[aria-label="Go to next page"]').should("be.disabled");
        });
      });
    });

    it("Case 8 : Menekan next page mengubah posisi page ke page selanjutnya dan mereferesh data pada tabel", () => {
      cy.intercept("GET", "/api/kontak/list*skip=50*").as("getKontak");
      cy.get('button[aria-label="Go to next page"]').click();
      cy.get('button[aria-label="Go to next page"]').click();
      cy.get('button[aria-label="Go to next page"]').click();
      cy.get('button[aria-label="Go to next page"]').click();
      cy.get('button[aria-label="Go to next page"]').click();
      cy.wait("@getKontak").then((interception) => {
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
        const startData = totalData === 0 ? 0 : skipValue + 1;
        const endData = skipValue + limitData;
        cy.get(".css-1rqlbw1 > .MuiTypography-root").should(
          "have.text",
          `Menampilkan ${startData} - ${endData} dari ${totalData} data`
        );

        cy.get('button[aria-label="Go to previous page"]').should("be.enabled");
        cy.get('button[aria-label="Go to next page"]').should("be.enabled");
        // Ambil token dari cookie
        cy.getCookie("authToken").then((cookie) => {
          const token = cookie?.value;

          // Pastikan token valid
          expect(token).to.exist;

          // Gunakan token untuk mendapatkan data API
          cy.request({
            method: "GET",
            url: "https://api-cashflow.assist.id/api/kontak/list?jenisKontak=suplier&skip=50&limit=10&companyId=b13e5210-8564-11ef-af27-a72e65a1d49c",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then((response) => {
            // Validasi status respons
            expect(response.status).to.eq(200);

            // Ambil data dari API
            const apiData = response.body.results;

            // Tunggu untuk memastikan elemen tabel dimuat
            cy.wait(2000);

            // Validasi konten data di dalam tabel (tbody)
            cy.get("table tbody tr").each(($row, index) => {
              const rowData = apiData[index];

              // Pastikan data dari API ada
              expect(rowData).to.exist;

              cy.wrap($row)
                .find("td")
                .then(($cells) => {
                  // Validasi ID
                  const idFromTable =
                    $cells.eq(0).attr("data-id") || $cells.eq(0).text().trim();
                  const idFromAPI = rowData.id;
                  expect(idFromTable).to.eq(idFromAPI);

                  // Validasi Nama Lengkap
                  const namaFromTable = $cells.eq(1).text().trim();
                  const namaFromAPI = rowData.nama?.trim();
                  expect(namaFromTable).to.eq(namaFromAPI);

                  // Validasi Grup Kontak
                  const grupKontakFromAPI =
                    rowData.grup_kontak_nama?.join(", ");
                  const grupKontakFromTable = $cells.eq(2).text().trim();
                  expect(grupKontakFromTable).to.eq(grupKontakFromAPI);

                  // Validasi Email & No Handphone
                  const emails = rowData.email_kontak_email || []; // Ambil semua email sebagai array
                  const noHp = rowData.no_hp || ""; // Nomor telepon (kosong jika tidak ada)

                  // Ambil elemen <p> di dalam sel ke-3 (kolom Email & No Handphone)
                  $cells
                    .eq(3)
                    .find("p")
                    .each((i, element) => {
                      const textFromTable = Cypress.$(element).text().trim();

                      if (i < emails.length) {
                        // Validasi untuk email berdasarkan indeks
                        const emailFromAPI = emails[i];
                        expect(textFromTable).to.eq(emailFromAPI);
                      } else if (i === emails.length) {
                        // Validasi untuk nomor telepon (berada setelah email)
                        expect(textFromTable).to.eq(noHp);
                      } else {
                        // Tidak boleh ada elemen tambahan selain email dan noHp
                        throw new Error(
                          `Elemen <p> tambahan ditemukan pada index ${i}`
                        );
                      }
                    });

                  // Validasi Alamat
                  const alamatFromAPI = rowData.alamat_pengiriman?.trim() || "";
                  const alamatFromTable = $cells.eq(4).text().trim();
                  expect(alamatFromTable).to.eq(alamatFromAPI);

                  // Validasi Total Piutang
                  function formatWithThousandSeparator(value) {
                    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                  }

                  const totalPiutangFromAPI = formatWithThousandSeparator(
                    rowData.piutang_max?.toString() || "0"
                  );
                  const totalPiutangFromTable = $cells
                    .eq(5)
                    .text()
                    .trim()
                    .replace(/^Rp\s*/, "");
                  expect(totalPiutangFromTable).to.eq(totalPiutangFromAPI);
                });
            });
          });
        });
      });
    });

    it("Case 9 : Menekan previous page mengubah posisi page ke page sebelumnya dan mereferesh data pada tabel", () => {
      cy.intercept("GET", "/api/kontak/list*skip=0*").as("getKontak");
      cy.get(".MuiPagination-ul > :nth-child(6) > .MuiButtonBase-root").click();
      cy.get('button[aria-label="Go to previous page"]').click();
      cy.get('button[aria-label="Go to previous page"]').click();
      cy.get('button[aria-label="Go to previous page"]').click();
      cy.get('button[aria-label="Go to previous page"]').click();
      cy.wait("@getKontak").then((interception) => {
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
        const startData = totalData === 0 ? 0 : skipValue + 1;
        const endData = skipValue + limitData;
        cy.get(".css-1rqlbw1 > .MuiTypography-root").should(
          "have.text",
          `Menampilkan ${startData} - ${endData} dari ${totalData} data`
        );

        cy.get('button[aria-label="Go to previous page"]').should(
          "be.disabled"
        );
        cy.get('button[aria-label="Go to next page"]').should("be.enabled");
        // Ambil token dari cookie
        cy.getCookie("authToken").then((cookie) => {
          const token = cookie?.value;

          // Pastikan token valid
          expect(token).to.exist;

          // Gunakan token untuk mendapatkan data API
          cy.request({
            method: "GET",
            url: "https://api-cashflow.assist.id/api/kontak/list?jenisKontak=suplier&skip=0&limit=10&companyId=b13e5210-8564-11ef-af27-a72e65a1d49c",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then((response) => {
            // Validasi status respons
            expect(response.status).to.eq(200);

            // Ambil data dari API
            const apiData = response.body.results;

            // Tunggu untuk memastikan elemen tabel dimuat
            cy.wait(2000);

            // Validasi konten data di dalam tabel (tbody)
            cy.get("table tbody tr").each(($row, index) => {
              const rowData = apiData[index];

              // Pastikan data dari API ada
              expect(rowData).to.exist;

              cy.wrap($row)
                .find("td")
                .then(($cells) => {
                  // Validasi ID
                  const idFromTable =
                    $cells.eq(0).attr("data-id") || $cells.eq(0).text().trim();
                  const idFromAPI = rowData.id;
                  expect(idFromTable).to.eq(idFromAPI);

                  // Validasi Nama Lengkap
                  const namaFromTable = $cells.eq(1).text().trim();
                  const namaFromAPI = rowData.nama?.trim();
                  expect(namaFromTable).to.eq(namaFromAPI);

                  // Validasi Grup Kontak
                  const grupKontakFromAPI =
                    rowData.grup_kontak_nama?.join(", ");
                  const grupKontakFromTable = $cells.eq(2).text().trim();
                  expect(grupKontakFromTable).to.eq(grupKontakFromAPI);

                  // Validasi Email & No Handphone
                  const emails = rowData.email_kontak_email || []; // Ambil semua email sebagai array
                  const noHp = rowData.no_hp || ""; // Nomor telepon (kosong jika tidak ada)

                  // Ambil elemen <p> di dalam sel ke-3 (kolom Email & No Handphone)
                  $cells
                    .eq(3)
                    .find("p")
                    .each((i, element) => {
                      const textFromTable = Cypress.$(element).text().trim();

                      if (i < emails.length) {
                        // Validasi untuk email berdasarkan indeks
                        const emailFromAPI = emails[i];
                        expect(textFromTable).to.eq(emailFromAPI);
                      } else if (i === emails.length) {
                        // Validasi untuk nomor telepon (berada setelah email)
                        expect(textFromTable).to.eq(noHp);
                      } else {
                        // Tidak boleh ada elemen tambahan selain email dan noHp
                        throw new Error(
                          `Elemen <p> tambahan ditemukan pada index ${i}`
                        );
                      }
                    });

                  // Validasi Alamat
                  const alamatFromAPI = rowData.alamat_pengiriman?.trim() || "";
                  const alamatFromTable = $cells.eq(4).text().trim();
                  expect(alamatFromTable).to.eq(alamatFromAPI);

                  // Validasi Total Piutang
                  function formatWithThousandSeparator(value) {
                    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                  }

                  const totalPiutangFromAPI = formatWithThousandSeparator(
                    rowData.piutang_max?.toString() || "0"
                  );
                  const totalPiutangFromTable = $cells
                    .eq(5)
                    .text()
                    .trim()
                    .replace(/^Rp\s*/, "");
                  expect(totalPiutangFromTable).to.eq(totalPiutangFromAPI);
                });
            });
          });
        });
      });
    });
  });
  context("Negative Testcase", () => {
    it("API list/JenisKontak=suplier dipaksa statusCode = 400 , Message error dari backend dan table status code 400", () => {
      const ErrorMsg = "Error paksa dengan kode 400";

      cy.intercept(
        "GET",
        "https://api-cashflow.assist.id/api/kontak/list?jenisKontak=suplier*",
        {
          statusCode: 400, // Mock respons dengan status 401 (Unauthorized)
          body: {
            message: ErrorMsg, // Pesan error yang ditampilkan saat login gagal
          },
        }
      ).as("code400");
      cy.get("#simple-tab-0").click();
      cy.get("#simple-tab-1").click();
      cy.wait("@code400").then((interception) => {
        cy.get(
          ".MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root"
        ).should("have.text", "Request failed with status code 400");

        cy.get(".MuiAlert-message").should("have.text", ErrorMsg);
      });
    });

    it("Memanipulasi body data dari backend list/JenisKontak=suplier dengan merusak array key :  email_kontak_email, muncul page deteksi bug", () => {
      cy.intercept("GET", "/api/kontak/list*skip=0*", {
        statusCode: 200, // Status sukses
        body: {
          results: [
            {
              id: 1,
              nama: "Kontak A",
              email_kontak_email: "kontakA@example.com", //no array
            },
            {
              id: 2,
              nama: "Kontak B",
              email_kontak_email: ["kontakB@example.com"],
            },
            {
              id: 3,
              nama: "Kontak C",
              email_kontak_email: "kontakC@example.com", //no array
            },
            {
              id: 4,
              nama: "Kontak D",
              email_kontak_email: ["kontakD@example.com"],
            },
            {
              id: 5,

              nama: "Kontak E",
              email_kontak_email: ["kontakE@example.com"],
            },
          ],
          totalData: 5, // Total data
        },
      }).as("getKontak");
      cy.get("#simple-tab-0").click();
      cy.wait("@getKontak").then((interception) => {
        cy.get(".MuiAlert-message").should(
          "have.text",
          "ErrorTerjadi kesalahan yang tidak terduga."
        );
      });
    });

    it("Memanipulasi body data dari backend list/JenisKontak=suplier dengan mengubah semua value menjadi string kosong", () => {
      cy.intercept("GET", "/api/kontak/list*skip=0*", {
        statusCode: 200, // Status sukses
        body: {
          results: [
            {
              id: "",
              tipe_kontak: "",
              nama: "",
              sapaan: "",
              tipe_identitas: "",
              no_identitas: "",
              nama_perusahaan: "",
              no_hp: "",
              no_telp: "",
              no_fax: "",
              no_npwp: "",
              alamat_pengiriman: "",
              fk_akun_piutang: "",
              fk_akun_hutang: "",
              piutang_max: "",
              syarat_pembayaran: "",
              created_at: "",
              created_id: "",
              updated_at: "",
              updated_id: "",
              is_delete: "",
              deleted_at: "",
              deleted_id: "",
              active_piutang: "",
              nama_bank: "",
              fk_info_bank: "",
              alamat_penagihan: "",
              company_id: "",
              is_generate: "",
              nitku: "",
              syarat_pembayaran_id: "",
              nama_create: "",
              email_kontak_email: [""],
              data_bank_info: [
                {
                  rek_no: "",
                  bank_name: "",
                  bank_branch: "",
                  holder_name: "",
                },
              ],
              grup_kontak_nama: [""],
            },
            {
              id: "",
              tipe_kontak: "",
              nama: "",
              sapaan: "",
              tipe_identitas: "",
              no_identitas: "",
              nama_perusahaan: "",
              no_hp: "",
              no_telp: "",
              no_fax: "",
              no_npwp: "",
              alamat_pengiriman: "",
              fk_akun_piutang: "",
              fk_akun_hutang: "",
              piutang_max: "",
              syarat_pembayaran: "",
              created_at: "",
              created_id: "",
              updated_at: "",
              updated_id: "",
              is_delete: "",
              deleted_at: "",
              deleted_id: "",
              active_piutang: "",
              nama_bank: "",
              fk_info_bank: "",
              alamat_penagihan: "",
              company_id: "",
              is_generate: "",
              nitku: "",
              syarat_pembayaran_id: "",
              nama_create: "",
              email_kontak_email: [""],
              data_bank_info: [
                {
                  rek_no: "",
                  bank_name: "",
                  bank_branch: "",
                  holder_name: "",
                },
              ],
              grup_kontak_nama: [""],
            },
            {
              id: "",
              tipe_kontak: "",
              nama: "",
              sapaan: "",
              tipe_identitas: "",
              no_identitas: "",
              nama_perusahaan: "",
              no_hp: "",
              no_telp: "",
              no_fax: "",
              no_npwp: "",
              alamat_pengiriman: "",
              fk_akun_piutang: "",
              fk_akun_hutang: "",
              piutang_max: "",
              syarat_pembayaran: "",
              created_at: "",
              created_id: "",
              updated_at: "",
              updated_id: "",
              is_delete: "",
              deleted_at: "",
              deleted_id: "",
              active_piutang: "",
              nama_bank: "",
              fk_info_bank: "",
              alamat_penagihan: "",
              company_id: "",
              is_generate: "",
              nitku: "",
              syarat_pembayaran_id: "",
              nama_create: "",
              email_kontak_email: [""],
              data_bank_info: [
                {
                  rek_no: "",
                  bank_name: "",
                  bank_branch: "",
                  holder_name: "",
                },
              ],
              grup_kontak_nama: [""],
            },
            {
              id: "",
              tipe_kontak: "",
              nama: "",
              sapaan: "",
              tipe_identitas: "",
              no_identitas: "",
              nama_perusahaan: "",
              no_hp: "",
              no_telp: "",
              no_fax: "",
              no_npwp: "",
              alamat_pengiriman: "",
              fk_akun_piutang: "",
              fk_akun_hutang: "",
              piutang_max: "",
              syarat_pembayaran: "",
              created_at: "",
              created_id: "",
              updated_at: "",
              updated_id: "",
              is_delete: "",
              deleted_at: "",
              deleted_id: "",
              active_piutang: "",
              nama_bank: "",
              fk_info_bank: "",
              alamat_penagihan: "",
              company_id: "",
              is_generate: "",
              nitku: "",
              syarat_pembayaran_id: "",
              nama_create: "",
              email_kontak_email: [""],
              data_bank_info: [
                {
                  rek_no: "",
                  bank_name: "",
                  bank_branch: "",
                  holder_name: "",
                },
              ],
              grup_kontak_nama: [""],
            },
            {
              id: "",
              tipe_kontak: "",
              nama: "",
              sapaan: "",
              tipe_identitas: "",
              no_identitas: "",
              nama_perusahaan: "",
              no_hp: "",
              no_telp: "",
              no_fax: "",
              no_npwp: "",
              alamat_pengiriman: "",
              fk_akun_piutang: "",
              fk_akun_hutang: "",
              piutang_max: "",
              syarat_pembayaran: "",
              created_at: "",
              created_id: "",
              updated_at: "",
              updated_id: "",
              is_delete: "",
              deleted_at: "",
              deleted_id: "",
              active_piutang: "",
              nama_bank: "",
              fk_info_bank: "",
              alamat_penagihan: "",
              company_id: "",
              is_generate: "",
              nitku: "",
              syarat_pembayaran_id: "",
              nama_create: "",
              email_kontak_email: [""],
              data_bank_info: [
                {
                  rek_no: "",
                  bank_name: "",
                  bank_branch: "",
                  holder_name: "",
                },
              ],
              grup_kontak_nama: [""],
            },
          ],

          totalData: 5, // Total data
        },
      }).as("getKontak");
      cy.get("#simple-tab-0").click();
      cy.get("#simple-tab-1").click();
      cy.wait("@getKontak").then((interception) => {});
    });

    it("Memanipulasi body data dari backend list/JenisKontak=suplier dengan nilai null pada semua value", () => {
      cy.intercept("GET", "/api/kontak/list*skip=0*", {
        statusCode: 200, // Status sukses
        body: {
          results: [
            {
              id: null,
              tipe_kontak: null,
              nama: null,
              sapaan: null,
              tipe_identitas: null,
              no_identitas: null,
              nama_perusahaan: null,
              no_hp: null,
              no_telp: null,
              no_fax: null,
              no_npwp: null,
              alamat_pengiriman: null,
              fk_akun_piutang: null,
              fk_akun_hutang: null,
              piutang_max: null,
              syarat_pembayaran: null,
              created_at: null,
              created_id: null,
              updated_at: null,
              updated_id: null,
              is_delete: null,
              deleted_at: null,
              deleted_id: null,
              active_piutang: null,
              nama_bank: null,
              fk_info_bank: null,
              alamat_penagihan: null,
              company_id: null,
              is_generate: null,
              nitku: null,
              syarat_pembayaran_id: null,
              nama_create: null,
              email_kontak_email: [null],
              data_bank_info: [
                {
                  rek_no: null,
                  bank_name: null,
                  bank_branch: null,
                  holder_name: null,
                },
              ],
              grup_kontak_nama: [null],
            },
            {
              id: null,
              tipe_kontak: null,
              nama: null,
              sapaan: null,
              tipe_identitas: null,
              no_identitas: null,
              nama_perusahaan: null,
              no_hp: null,
              no_telp: null,
              no_fax: null,
              no_npwp: null,
              alamat_pengiriman: null,
              fk_akun_piutang: null,
              fk_akun_hutang: null,
              piutang_max: null,
              syarat_pembayaran: null,
              created_at: null,
              created_id: null,
              updated_at: null,
              updated_id: null,
              is_delete: null,
              deleted_at: null,
              deleted_id: null,
              active_piutang: null,
              nama_bank: null,
              fk_info_bank: null,
              alamat_penagihan: null,
              company_id: null,
              is_generate: null,
              nitku: null,
              syarat_pembayaran_id: null,
              nama_create: null,
              email_kontak_email: [null],
              data_bank_info: [
                {
                  rek_no: null,
                  bank_name: null,
                  bank_branch: null,
                  holder_name: null,
                },
              ],
              grup_kontak_nama: [null],
            },
            {
              id: null,
              tipe_kontak: null,
              nama: null,
              sapaan: null,
              tipe_identitas: null,
              no_identitas: null,
              nama_perusahaan: null,
              no_hp: null,
              no_telp: null,
              no_fax: null,
              no_npwp: null,
              alamat_pengiriman: null,
              fk_akun_piutang: null,
              fk_akun_hutang: null,
              piutang_max: null,
              syarat_pembayaran: null,
              created_at: null,
              created_id: null,
              updated_at: null,
              updated_id: null,
              is_delete: null,
              deleted_at: null,
              deleted_id: null,
              active_piutang: null,
              nama_bank: null,
              fk_info_bank: null,
              alamat_penagihan: null,
              company_id: null,
              is_generate: null,
              nitku: null,
              syarat_pembayaran_id: null,
              nama_create: null,
              email_kontak_email: [null],
              data_bank_info: [
                {
                  rek_no: null,
                  bank_name: null,
                  bank_branch: null,
                  holder_name: null,
                },
              ],
              grup_kontak_nama: [null],
            },
            {
              id: null,
              tipe_kontak: null,
              nama: null,
              sapaan: null,
              tipe_identitas: null,
              no_identitas: null,
              nama_perusahaan: null,
              no_hp: null,
              no_telp: null,
              no_fax: null,
              no_npwp: null,
              alamat_pengiriman: null,
              fk_akun_piutang: null,
              fk_akun_hutang: null,
              piutang_max: null,
              syarat_pembayaran: null,
              created_at: null,
              created_id: null,
              updated_at: null,
              updated_id: null,
              is_delete: null,
              deleted_at: null,
              deleted_id: null,
              active_piutang: null,
              nama_bank: null,
              fk_info_bank: null,
              alamat_penagihan: null,
              company_id: null,
              is_generate: null,
              nitku: null,
              syarat_pembayaran_id: null,
              nama_create: null,
              email_kontak_email: [null],
              data_bank_info: [
                {
                  rek_no: null,
                  bank_name: null,
                  bank_branch: null,
                  holder_name: null,
                },
              ],
              grup_kontak_nama: [null],
            },
            {
              id: null,
              tipe_kontak: null,
              nama: null,
              sapaan: null,
              tipe_identitas: null,
              no_identitas: null,
              nama_perusahaan: null,
              no_hp: null,
              no_telp: null,
              no_fax: null,
              no_npwp: null,
              alamat_pengiriman: null,
              fk_akun_piutang: null,
              fk_akun_hutang: null,
              piutang_max: null,
              syarat_pembayaran: null,
              created_at: null,
              created_id: null,
              updated_at: null,
              updated_id: null,
              is_delete: null,
              deleted_at: null,
              deleted_id: null,
              active_piutang: null,
              nama_bank: null,
              fk_info_bank: null,
              alamat_penagihan: null,
              company_id: null,
              is_generate: null,
              nitku: null,
              syarat_pembayaran_id: null,
              nama_create: null,
              email_kontak_email: [null],
              data_bank_info: [
                {
                  rek_no: null,
                  bank_name: null,
                  bank_branch: null,
                  holder_name: null,
                },
              ],
              grup_kontak_nama: [null],
            },
          ],
          totalData: 5, // Total data
        },
      }).as("getKontak");
      cy.get("#simple-tab-0").click();
      cy.get("#simple-tab-1").click();
      cy.wait("@getKontak").then((interception) => {});
    });

    it("Memanipulasi body data dari backend list/JenisKontak=suplier dengan 5 objek kosong ", () => {
      cy.intercept("GET", "/api/kontak/list*skip=0*", {
        statusCode: 200, // Status sukses
        body: {
          results: [{}, {}, {}, {}, {}],
          totalData: 5, // Total data
        },
      }).as("getKontak");
      cy.get("#simple-tab-0").click();
      cy.get("#simple-tab-1").click();
      cy.wait("@getKontak").then((interception) => {});
    });
  });
});
