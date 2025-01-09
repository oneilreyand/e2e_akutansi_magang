describe("Check Komponen Pelanggan", () => {
  beforeEach(() => {
    cy.getCookie("authToken"); // Memulihkan cookie sebelum setiap test
    cy.loginWithAPI("rayhanrayandra.work.id@gmail.com", "Nz6}+#8y");
    cy.visit("https://cashflow.assist.id/admin/contacts");
  });

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
    cy.get('a[href="/admin/contacts/create"]')
      .should("contain", "Buat Kontak")
      .and("be.visible")
      .click();

    cy.get("h5").should("have.text", "Tambah Kontak");
  });

  context("Pengujian fungsi pada tab jenis kontak", () => {
    it("Tab pelanggan ke tab suplier", () => {
      cy.get("#simple-tab-0")
        .should("contain", "Pelanggan")
        .and("be.visible")
        .click();
      cy.get(".MuiTypography-h6").contains("Pelanggan");

      cy.get("#simple-tab-1")
        .should("contain", "Suplier")
        .and("be.visible")
        .click();
      cy.get(".MuiTypography-h6").contains("Suplier");
    });

    it("Tab pelanggan ke tab karyawan", () => {
      cy.get("#simple-tab-0")
        .should("contain", "Pelanggan")
        .and("be.visible")
        .click();
      cy.get(".MuiTypography-h6").contains("Pelanggan");

      cy.get("#simple-tab-2")
        .should("contain", "Karyawan")
        .and("be.visible")
        .click();
      cy.get(".MuiTypography-h6").contains("Karyawan");
    });
    it("tab pelanggan ke tab lainnya", () => {
      cy.get("#simple-tab-0")
        .should("contain", "Pelanggan")
        .and("be.visible")
        .click();
      cy.get(".MuiTypography-h6").contains("Pelanggan");

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
      cy.get("#modal-title").should("have.text", "Import Data Pelanggan");
    });
  });

  context("Pengujian fitur Search Kontak", () => {
    it("Validasi penulisan placeholder search input", () => {
      cy.get('input[placeholder="Cari kontak"]').should("be.exist");
    });

    it("Mencari salah satu nama kontak dengan lowercase", () => {
      cy.get('[data-testid="search-input"]').type("asriyanto candra limbong");
      cy.get(".MuiTableBody-root > :nth-child(1) > :nth-child(2)")
        .invoke("text") // Mengambil teks elemen
        .then((text) => text.trim()) // Memangkas spasi sebelum memeriksa
        .should("eq", "Asriyanto Candra Limbong");
    });

    it("Mencari salah satu nama kontak dengan uppercase", () => {
      cy.get('[data-testid="search-input"]').type("ASRIYANTO CANDRA LIMBONG");
      cy.get(".MuiTableBody-root > :nth-child(1) > :nth-child(2)")
        .invoke("text") // Mengambil teks elemen
        .then((text) => text.trim()) // Memangkas spasi sebelum memeriksa
        .should("eq", "Asriyanto Candra Limbong");
    });

    it("Mencari salah satu nama kontak dengan mengetikkan nama depan", () => {
      cy.get('[data-testid="search-input"]').type("ASRIYANTO");
      cy.get(".MuiTableBody-root > :nth-child(1) > :nth-child(2)")
        .invoke("text") // Mengambil teks elemen
        .then((text) => text.trim()) // Memangkas spasi sebelum memeriksa
        .should("eq", "Asriyanto Candra Limbong");
    });
    it("Mencari salah satu nama kontak dengan mengetikkan nama belakang", () => {
      cy.get('[data-testid="search-input"]').type("LIMBONG");
      cy.get(".MuiTableBody-root > :nth-child(1) > :nth-child(2)")
        .invoke("text") // Mengambil teks elemen
        .then((text) => text.trim()) // Memangkas spasi sebelum memeriksa
        .should("eq", "Asriyanto Candra Limbong");
    });

    it("Mencari salah satu nama kontak dengan mengetikkan nama tengah", () => {
      cy.get('[data-testid="search-input"]').type("CANDRA");
      cy.get(".MuiTableBody-root > :nth-child(1) > :nth-child(2)")
        .invoke("text") // Mengambil teks elemen
        .then((text) => text.trim()) // Memangkas spasi sebelum memeriksa
        .should("eq", "Asriyanto Candra Limbong");
    });

    it("Mencari salah satu nama kontak dengan mengetikkan email", () => {
      cy.get('[data-testid="search-input"]').type("email@lengkap1.com");
      cy.get(".MuiTableBody-root > :nth-child(1) > :nth-child(4)").should(
        "contain",
        "email@lengkap1.com"
      );
    });
  });

  context("Pengujian fungsi tabel", () => {
    it("Validasi penulisan cardhead H6 ekpektasi Pelanggan", () => {
      cy.get(".MuiTypography-h6").should("have.text", "Pelanggan");
    });
    it("Validasi kesesuaian thead", () => {
      cy.get("table thead").within(() => {
        cy.contains("ID").should("be.visible");
        cy.contains("Nama Lengkap").should("be.visible");
        cy.contains("Grup Kontak").should("be.visible");
        cy.contains("Email & No Handphone").should("be.visible");
        cy.contains("Alamat").should("be.visible");
        cy.contains("Total Piutang").should("be.visible");
      });
    });

    it('Validasi konten dengan ekspektasi setiap objek memiliki key "tipe_kontak" dengan value "pelanggan"', () => {
      // Memastikan token valid sebelum melanjutkan
      cy.getCookie("authToken").then((cookie) => {
        const token = cookie?.value;
        expect(token).to.exist; // Memastikan token ada

        // Menggunakan token untuk permintaan API
        cy.request({
          method: "GET",
          url: "https://api-cashflow.assist.id/api/kontak/list?jenisKontak=pelanggan&skip=0&limit=10&companyId=b13e5210-8564-11ef-af27-a72e65a1d49c",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          // Validasi status respons
          expect(response.status).to.eq(200);

          // Ambil data dari API
          const apiData = response.body.results;

          // Validasi setiap objek dalam array memiliki key "tipe_kontak" dengan nilai "pelanggan"
          apiData.forEach((item) => {
            expect(item).to.have.property("tipe_kontak", "pelanggan");
          });
        });
      });
    });

    it("Validasi bahwa data yang diambil hanya 10", () => {
      cy.viewport(2000, 1600);

      // Ambil token dari cookie
      cy.getCookie("authToken").then((cookie) => {
        const token = cookie?.value;

        // Pastikan token valid
        expect(token).to.exist;

        // Gunakan token untuk mendapatkan data API
        cy.request({
          method: "GET",
          url: "https://api-cashflow.assist.id/api/kontak/list?jenisKontak=pelanggan&skip=0&limit=10&companyId=b13e5210-8564-11ef-af27-a72e65a1d49c",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          // Validasi status respons
          expect(response.status).to.eq(200);

          // Ambil data dari API
          const apiData = response.body.results;

          // Validasi jumlah baris tabel sesuai dengan data API
          expect(apiData).to.have.length(10);
        });
      });
    });

    it("Validasi isi tabel sesuai berdasarkan data dari API", () => {
      cy.viewport(2000, 1600);

      // Ambil token dari cookie
      cy.getCookie("authToken").then((cookie) => {
        const token = cookie?.value;

        // Pastikan token valid
        expect(token).to.exist;

        // Gunakan token untuk mendapatkan data API
        cy.request({
          method: "GET",
          url: "https://api-cashflow.assist.id/api/kontak/list?jenisKontak=pelanggan&skip=0&limit=10&companyId=b13e5210-8564-11ef-af27-a72e65a1d49c",
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
                const combinedEmails = emails.join(""); // Gabungkan semua email tanpa spasi
                const noHp = rowData.no_hp || ""; // Nomor telepon (kosong jika tidak ada)
                const emailNoHpFromAPI = `${combinedEmails}${noHp}`; // Gabungkan email dan nomor telepon
                const emailNoHpFromTable = $cells.eq(3).text().trim(); // Ambil data dari tabel
                expect(emailNoHpFromTable).to.eq(emailNoHpFromAPI); // Bandingkan hasil tabel dengan API

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
    it("pastikan nama dapat ditekan dan mengarahkan ke detail kontak yang benar", () => {
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

  context.only("Pengujian Pagination", () => {
    it("Page 1 : Label Menampilkan 1 - ${limitData} dari ${totalData} data", () => {
      cy.getCookie("authToken").then((cookie) => {
        const token = cookie?.value;
        cy.request({
          method: "GET",
          url: "https://api-cashflow.assist.id/api/kontak/list?jenisKontak=pelanggan&skip=0&limit=10&companyId=b13e5210-8564-11ef-af27-a72e65a1d49c",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          const totalData = response.body.totalData;
          const limitData = response.body.results.length;
          cy.get(
            ".MuiPagination-ul > :nth-child(2) > .MuiButtonBase-root"
          ).click();
          cy.get(".css-1rqlbw1 > .MuiTypography-root").should(
            "have.text",
            `Menampilkan 1 - ${limitData} dari ${totalData} data`
          );
        });
      });
    });

    it("Page 2 : Label Menampilkan 11 - ${limitData} dari ${totalData} data", () => {
      cy.get(".MuiPagination-ul > :nth-child(3) > .MuiButtonBase-root").click();
      cy.getCookie("authToken").then((cookie) => {
        const token = cookie?.value;
        cy.request({
          method: "GET",
          url: "https://api-cashflow.assist.id/api/kontak/list?jenisKontak=pelanggan&skip=10&limit=10&companyId=b13e5210-8564-11ef-af27-a72e65a1d49c",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          const totalData = response.body.totalData;
          const limitData = response.body.results.length;
          const limitDataPage2 = limitData + 10;

          cy.get(".css-1rqlbw1 > .MuiTypography-root").should(
            "have.text",
            `Menampilkan 11 - ${limitDataPage2} dari ${totalData} data`
          );
        });
      });
    });

    it.only("Page 3 : Label Menampilkan 21 - ${limitData} dari ${totalData} data", () => {
      // Klik pada tombol pagination (Page 3)
      cy.intercept("GET", "/api/kontak/list*").as("getKontak");
      cy.intercept("GET", "/api/kontak/list*").as("getKontak1");
      cy.get(".MuiPagination-ul > :nth-child(4) > .MuiButtonBase-root", {
        Timeout: 10000,
      }).click();

      // Ambil token autentikasi dari cookie

      // Intercept request untuk menangkap URL dan query string parameters

      // Tunggu request selesai dan dapatkan URL dari request yang diintercept
      cy.wait("@getKontak1").then((interception) => {
        // Ambil URL request yang diintercept
        const requestUrl = new URL(interception.request.url);
        cy.log(`url : ${requestUrl}`);

        // Ambil nilai parameter "skip" dari query string
        const skipValue = requestUrl.searchParams.get("skip");
        const startData = parseInt(skipValue) + 1; // Mulai dari data ke-21 jika skip=20

        // Ambil totalData dan limitData dari respons API
        const totalData = interception.response.body.totalData;
        const limitData = interception.response.body.results.length;

        // Verifikasi label yang muncul di UI
        cy.get(".css-1rqlbw1 > .MuiTypography-root").should(
          "have.text",
          `Menampilkan ${startData} - ${limitData} dari ${totalData} data`
        );
      });
    });

    it("Pagination pada awal page seharusnya menyembunyikan page > 5 dan memunculkan page terakhir", () => {
      cy.getCookie("authToken").then((cookie) => {
        const token = cookie?.value;
        cy.request({
          method: "GET",
          url: "https://api-cashflow.assist.id/api/kontak/list?jenisKontak=pelanggan&skip=10&limit=10&companyId=b13e5210-8564-11ef-af27-a72e65a1d49c",
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

    it("Pagination pada middle page seharusnya menampilkan page paling awal, menyembunyikan halaman yang berjarak satu diatas atau satu dibawah dari page dipilih lalu menampilkan page terakhir", () => {
      cy.get(".MuiPagination-ul > :nth-child(6) > .MuiButtonBase-root")
        .should("have.text", "5")
        .click();
      cy.getCookie("authToken").then((cookie) => {
        const token = cookie?.value;
        cy.request({
          method: "GET",
          url: "https://api-cashflow.assist.id/api/kontak/list?jenisKontak=pelanggan&skip=10&limit=10&companyId=b13e5210-8564-11ef-af27-a72e65a1d49c",
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

    it("Pagination pada end page seharusnya menampilkan page paling akhir, menyembunyikan halaman yang < 5 dari page terakhir", () => {
      cy.get(".MuiPagination-ul > :nth-child(8) > .MuiButtonBase-root").click();
      cy.getCookie("authToken").then((cookie) => {
        const token = cookie?.value;
        cy.request({
          method: "GET",
          url: "api/kontak/list?jenisKontak=pelanggan&skip=10&limit=10&companyId=b13e5210-8564-11ef-af27-a72e65a1d49c",
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
          ).should("have.text", reverseMaxPage, { Timeout: 10000 });
          cy.get(":nth-child(7) > .MuiPaginationItem-root").should(
            "have.text",
            reverseMaxPage,
            { Timeout: 10000 }
          );
          cy.get(
            ".MuiPagination-ul > :nth-child(8) > .MuiButtonBase-root"
          ).should("have.text", maxPage, { Timeout: 10000 });
          cy.get('button[aria-label="Go to next page"]').should("be.enabled");
        });
      });
    });

    it("Menekan next page mengubah posisi page ke page selanjutnya", () => {
      cy.get('button[aria-label="Go to next page"]').click();
      cy.getCookie("authToken").then((cookie) => {
        const token = cookie?.value;
        cy.request({
          method: "GET",
          url: "https://api-cashflow.assist.id/api/kontak/list?jenisKontak=pelanggan&skip=10&limit=10&companyId=b13e5210-8564-11ef-af27-a72e65a1d49c",
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
          ).should("have.text", "5", { Timeout: 10000 });
          cy.get(
            ".MuiPagination-ul > :nth-child(5) > .MuiButtonBase-root"
          ).should("have.text", "6", { Timeout: 10000 });
          cy.get(
            ".MuiPagination-ul > :nth-child(6) > .MuiButtonBase-root"
          ).should("have.text", "7", { Timeout: 10000 });
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
  });
});
