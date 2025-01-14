describe("Check Komponen Tab Pelanggan", () => {
    beforeEach(() => {
      cy.loginWithAPI("rayhanrayandra.work.id@gmail.com", "Nz6}+#8y");
      cy.visit("https://cashflow.assist.id/admin/contacts");
    });

it("Case 6 : Validasi isi tabel sesuai berdasarkan data dari API", () => {
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
        cy.wait(5000);

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
              const emailNoHpFromAPI = `${emails}${noHp}`; // Gabungkan email dan nomor telepon
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

})