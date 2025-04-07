describe("Detail Pembelian", () => {
  let invoiceText, namaText; // Simpan nilai dalam variabel global

  beforeEach(() => {
    cy.loginWithAPI("rayhanrayandra.work.id@gmail.com", "Nz6}+#8y");
    cy.visit("https://cashflow.assist.id/admin/purchases");
    cy.get(":nth-child(1) > :nth-child(2) > span > a > .MuiButtonBase-root", {
      timeout: 20000,
    })
      .invoke("text")
      .then((text) => {
        invoiceText = text.trim(); // Simpan ke variabel global
      });
    cy.get(":nth-child(1) > :nth-child(3) > span > a > .MuiButtonBase-root", {
      timeout: 20000,
    })
      .invoke("text")
      .then((text) => {
        namaText = text.trim(); // Simpan ke variabel global
      });
    cy.get(":nth-child(1) > :nth-child(2) > span > a > .MuiButtonBase-root", {
      timeout: 20000,
    }).click();
  });

  context("Pengujian Penulisan Label", () => {
    it("Uji Penulisan Judul H5", () => {
      cy.get(".MuiTypography-h5 > span").should(
        "have.text",
        "Detail Pembelian"
      );
    });
  });
  context("Pengujian Tab Navigasi", () => {
    it("Penulisan tab navbar", () => {
      cy.get(".MuiBreadcrumbs-ol").should(
        "have.text",
        "Beranda/Pembelian/Detail Pembelian"
      );
    });

    it("Pindah ke Beranda/Pembelian", () => {
      cy.get(":nth-child(3) > .MuiTypography-root > span").click();
      cy.get(".MuiTypography-h5 > span").should("have.text", "Pembelian");
    });

    it("Pindah ke Beranda", () => {
      cy.get(
        ".MuiBreadcrumbs-ol > :nth-child(1) > .MuiTypography-root"
      ).click();
      cy.get(".MuiTypography-h5").should("have.text", "Beranda");
    });
  });

  context("Pengujian data dengan Tampilan", () => {
    it("Pencocokan data yang diambil dengan tampilan yang ada", () => {
      cy.intercept(
        "GET",
        "https://api-cashflow.assist.id/api/pembelian/*?companyId=*"
      ).as("DataPembelian");
      cy.reload();
      cy.wait("@DataPembelian", { timeout: 20000 }).then((interception) => {
        // Fungsi untuk format angka ke Rupiah
        const formatToIDR = (value) => `Rp ${value.toLocaleString("id-ID")}`;

        // Fungsi untuk membersihkan teks dari non-breaking space & spasi ekstra
        const cleanText = (text) =>
          text
            .trim()
            .replace(/\u00A0/g, " ")
            .replace(/\s+/g, " ");

        // Ambil data dari API
        const data = interception.response.body;
        const NomorInv = data.nomor;
        const Status = data.status;
        const InformasiSuplier = data.supplier.nama;
        const AlamatPenagihan = data.alamat_penagihan;
        const SyaratPembayaran = data.syarat_pembayaran;
        const TanggalTransaksi = new Date(
          data.tanggal_transaksi
        ).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
        const TanggalJatuhTempo = new Date(
          data.tanggal_jatuh_tempo
        ).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
        const Catatan = data.deskripsi.trim() === '' ? '-' : data.deskripsi;
        const Lampiran = data.attachments?.[0]?.file_url
          ? data.attachments[0].file_url.replace(/^\d+_/, "")
          : "-";

        // Pengecekan header tabel
        cy.get("table thead tr").within(() => {
          const expectedHeaders = [
            "Nama Produk",
            "Gudang",
            "Deskripsi",
            "Qty",
            "Satuan",
            "Harga",
            "Diskon (%)",
            "Pajak",
            "Jumlah",
          ];

          cy.get("th").each(($th, index) => {
            cy.wrap($th).invoke("text").should("eq", expectedHeaders[index]);
          });
        });

        // Loop untuk mencocokkan data di tabel
        cy.get("table tbody tr").each(($row, index) => {
          cy.wrap($row).within(() => {
            const item = data.items[index];
            const namaProduk = cleanText(
              item.product?.product_name || item.product_name || "-"
            );
            const gudang = item.gudang?.warehouse_name || "-";
            const deskripsi = item.deskripsi;
            const qty = item.quantity ? item.quantity.toString() : "0";
            const satuan = item.unit?.unit_name || "-";
            const hargaFormatted = formatToIDR(item.price || 0);
            const diskon = item.discount ? item.discount.toString() : "0";
            const pajak =
              item.tax?.tax_name ||
              (item.tax_value ? `PPN ${item.tax_value}%` : "-");
            const jumlahFormatted = formatToIDR(item.total || 0);

            // Pengecekan setiap kolom dengan teks yang sudah dibersihkan
            cy.get("td")
              .eq(0)
              .invoke("text")
              .then((text) => expect(cleanText(text)).to.eq(namaProduk));
            cy.get("td")
              .eq(1)
              .invoke("text")
              .then((text) => expect(cleanText(text)).to.eq(gudang));
            cy.get("td")
              .eq(2)
              .invoke("text")
              .then((text) => expect(cleanText(text)).to.eq(deskripsi));
            cy.get("td")
              .eq(3)
              .invoke("text")
              .then((text) => expect(cleanText(text)).to.eq(qty));
            cy.get("td")
              .eq(4)
              .invoke("text")
              .then((text) => expect(cleanText(text)).to.eq(satuan));
            cy.get("td")
              .eq(5)
              .invoke("text")
              .then((text) =>
                expect(cleanText(text)).to.eq(cleanText(hargaFormatted))
              );
            cy.get("td")
              .eq(6)
              .invoke("text")
              .then((text) => expect(cleanText(text)).to.eq(diskon));
            cy.get("td")
              .eq(7)
              .invoke("text")
              .then((text) => expect(cleanText(text)).to.eq(cleanText(pajak)));
            cy.get("td")
              .eq(8)
              .invoke("text")
              .then((text) =>
                expect(cleanText(text)).to.eq(cleanText(jumlahFormatted))
              );
          });
        });

        // Pengecekan data di luar tabel
        cy.get(
          ":nth-child(3) > :nth-child(1) > .MuiGrid2-root > .MuiTypography-root"
        ).should("have.text", NomorInv);
        cy.get(".MuiChip-label").should("have.text", Status);
        cy.get(
          ".MuiCardContent-root > .MuiList-root > .MuiGrid2-container > :nth-child(1) > .MuiListItem-root > .MuiListItemText-root > .MuiTypography-body2"
        ).should("have.text", InformasiSuplier);
        cy.get(
          ".MuiCardContent-root > .MuiList-root > .MuiGrid2-container > :nth-child(2) > .MuiListItem-root > .MuiListItemText-root > .MuiTypography-body2"
        ).should("have.text", AlamatPenagihan);
        cy.get(
          ":nth-child(3) > .MuiListItem-root > .MuiListItemText-root > .MuiTypography-body2"
        ).should("have.text", SyaratPembayaran);
        cy.get(
          ":nth-child(4) > .MuiListItem-root > .MuiListItemText-root > .MuiTypography-body2"
        ).should("have.text", TanggalTransaksi);
        cy.get(
          ":nth-child(5) > .MuiListItem-root > .MuiListItemText-root > .MuiTypography-body2"
        ).should("have.text", TanggalJatuhTempo);

        cy.get(
          ".css-gaz4pg > .MuiList-root > .MuiGrid2-container > :nth-child(1) > .MuiListItem-root > .MuiListItemText-root > .MuiTypography-h6"
        ).should("have.text", "Catatan");
        cy.get(
          ".css-gaz4pg > .MuiList-root > .MuiGrid2-container > :nth-child(1) > .MuiListItem-root > .MuiListItemText-root > .MuiTypography-body2"
        ).should("have.text", Catatan);

        cy.get(
          ".css-gaz4pg > .MuiList-root > .MuiGrid2-container > :nth-child(2) > .MuiListItem-root > .MuiListItemText-root > .MuiTypography-h6"
        ).should("have.text", "Lampiran");
        if (data.attachments?.[0]?.file_url) {
          cy.get(".MuiTypography-body2 > .MuiButtonBase-root")
            .should("have.text", Lampiran);
        } else {
          cy.get(".MuiTypography-body2 > .MuiButtonBase-root")
            .should("not.exist");
            cy.get('.css-gaz4pg > .MuiList-root > .MuiGrid2-container > :nth-child(2) > .MuiListItem-root > .MuiListItemText-root > .MuiTypography-body2').should('have.text', Lampiran)
        }
      });
    });
  });
});
