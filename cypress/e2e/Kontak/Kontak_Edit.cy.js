describe("Menguji Bagian halaman Edit Kontak pada cashflow assist id", () => {
    const email = "damaresya947@gmail.com";
    const password = "12345678";

    beforeEach(() => {
        cy.loginWithApi(email, password);
    });

    it("Case 1 : Pergi kehalaman edit kontak", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts");

        cy.get('#simple-tab-2').should("be.visible").contains("Karyawan").click();

        cy.get('table tbody tr').not(':first')
            .eq(1)
            .find('td')
            .eq(1)
            .click()

        cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').contains('Ubah Profil Kontak').click()
        cy.url().should('include', 'edit')
    });

    it("Case 2 : memeriksa ketersediaan UI pada halaman edit kontak", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts/3d469c92-c863-11ef-b4d6-814f37804472")
        cy.get('.MuiStack-root > .MuiButtonBase-root').should("be.visible").click()

        // * logo
        cy.get('[data-testid="appbar-logo"]').should("exist")

        //* profile
        cy.get('[data-testid="appbar-profile-button"]').should("be.visible").and(($profile) => {
            expect($profile).to.contain("User")
            expect($profile).to.contain("Muhammad Luthfiandra")
        })

        //* icon
        cy.get('[data-testid="appbar-menu-button"]').should("be.visible").click()
        cy.get('[data-testid="drawer-item-dashboard"]').should("be.visible").contains("Beranda")
        cy.get('[data-testid="drawer-item-reports"]').should("be.visible").contains("Laporan")
        cy.get('[data-testid="drawer-item-cash-bank"]').should("be.visible").contains("Kas & Bank")
        cy.get('[data-testid="drawer-item-sales"]').should("be.visible").contains("Penjualan")
        cy.get('[data-testid="drawer-item-purchases"]').should("be.visible").contains("Pembelian")
        cy.get('[data-testid="drawer-item-expenses"]').should("be.visible").contains("Biaya")
        cy.get('[data-testid="drawer-item-contacts"]').should("be.visible").contains("Kontak")
        cy.get('[data-testid="drawer-item-products"]').should("be.visible").contains("Produk")
        cy.get('[data-testid="drawer-item-assets"]').should("be.visible").contains("Aset")
        cy.get('[data-testid="drawer-item-accounts"]').should("be.visible").contains("Daftar Akun")
        cy.get('[data-testid="drawer-item-settings"]').should("be.visible").contains("Pengaturan")

        // * jejak navigasi
        cy.get('.MuiBreadcrumbs-ol').should("be.visible").and(($navTrail) => {
            expect($navTrail).to.contain("Beranda")
            expect($navTrail).to.contain("Kontak")
            expect($navTrail).to.contain("Detail Kontak")
            expect($navTrail).to.contain("Ubah Kontak")
        })

        //* Form informasi kontak
        // todo judul form
        cy.get(':nth-child(1) > .MuiCardHeader-root > .MuiCardHeader-content > .MuiTypography-root').should("be.visible").contains("Informasi Kontak")

        // todo isi form
        cy.get(':nth-child(1) > .MuiCardContent-root').should("be.visible")

        //* form informasi kontak bagian tipe kontak
        // todo judul dan isi kolom tipe kontak
        cy.get(':nth-child(1) > .MuiCardContent-root > .css-1i24z3d > :nth-child(1) > .MuiGrid2-grid-md-4').should("be.visible").contains("Tipe Kontak")

        // todo memilih tipe kontak karyawan
        cy.get('#tipe_kontak').should("be.visible").click()
        cy.get('[data-value="karyawan"]').click()
        cy.get('#tipe_kontak').should("be.visible").contains("Karyawan")

        // todo memmilih tipe kontak lainnya
        cy.get('#tipe_kontak').should("be.visible").click()
        cy.get('[data-value="lainnya"]').click()
        cy.get('#tipe_kontak').should("be.visible").contains("Lainnya")
        cy.log("Bagian tabel informasi kontak sudah diuji dan berfungsi dengan baik")

        //* form informasi kontak bagian grup kontak

        // todo judul dan isi form grup kontak
        cy.get(':nth-child(1) > .MuiCardContent-root > .css-1i24z3d > :nth-child(2) > .MuiGrid2-grid-md-4 > .MuiFormLabel-root').should("be.visible").contains("Grup Kontak")

        // todo memilih grup kontak yang sudah ada
        cy.get('#fk_grup').should("be.visible").click()
        cy.get('[data-value="30a2c042-a658-11ef-8f78-25bebcc62186"]').click()
        cy.get('#fk_grup').contains("vendor obat asist 3")
        cy.get('[data-value="5c0a4d62-c67f-11ef-b637-9183449c0953"]').click()
        cy.get('#fk_grup').contains("grup pengujian 1")
        cy.get('[data-value="453ec850-a658-11ef-8f78-25bebcc62186"]').click()
        cy.get('#fk_grup').contains("grup pengujian 1")
        cy.get('[data-value="1b1dded0-a658-11ef-8f78-25bebcc62186"]').click()
        cy.get('#fk_grup').contains("grup pengujian 1, vendor obat asist 4")
        cy.get('.css-1j4fk1t').should("be.visible").click()
        cy.get('.MuiIconButton-colorError').should("be.visible").click()
        cy.get('#fk_grup').contains("grup pengujian 1, vendor obat asist 4")

        // todo membatalkan pemilihan grup kontak yang telah dipilih sebelumnya
        cy.get('#fk_grup').should("be.visible").click()
        cy.get('[data-value="30a2c042-a658-11ef-8f78-25bebcc62186"]').click()
        cy.get('[data-value="30a2c042-a658-11ef-8f78-25bebcc62186"]').click()
        cy.get('#fk_grup').should("be.visible")

        // todo memilih grup kontak yang isinya sama
        cy.get('[data-value="5c0a4d62-c67f-11ef-b637-9183449c0953"]').click()
        cy.get('[data-value="8368fe12-c689-11ef-b637-9183449c0953"]').click()
        cy.get('#fk_grup').contains("grup pengujian 1, vendor obat asist 4")

        cy.get('.css-1j4fk1t').click()
        cy.get('.MuiIconButton-colorError').click()

        cy.log("Bagian grup kontak berfungsi dengan baik")

        //* form informasi umum
        // todo memeriksa ketersedian form header dan container informasi umum
        cy.get(':nth-child(2) > .MuiCardHeader-root').should("be.visible")
        cy.get(':nth-child(2) > .MuiCardContent-root').should("be.visible")

        // todo judul form informasi umum
        cy.get(':nth-child(2) > .MuiCardHeader-root > .MuiCardHeader-content > .MuiTypography-root').should("be.visible").contains("Informasi Umum")

        //* form informasi umum bagian nama lengkap
        // todo memeriksa ketersediaan label dan inputan bagian nama lengkap
        cy.get(':nth-child(2) > .MuiCardContent-root > .css-1i24z3d > :nth-child(1) > .css-1iqhgio').should("be.visible").contains("Nama Lengkap")
        cy.get('#sapaan').should("be.visible")
        cy.get('#nama').should("be.visible").should("have.attr", "placeholder", "Masukkan nama lengkap")

        // todo menguji bagian list dan inputan text pada nama lengkap
        cy.get('#sapaan').click()
        cy.get('[data-value="bapak"]').should("be.visible").click()
        cy.get('#sapaan').contains("Bapak")
        cy.get('#sapaan').click()
        cy.get('[data-value="ibu"]').should("be.visible").click()
        cy.get('#sapaan').contains("Ibu")
        cy.get('#sapaan').click()
        cy.get('[data-value="pak"]').should("be.visible").click()
        cy.get('#sapaan').contains("Pak")
        cy.get('#sapaan').click()
        cy.get('[data-value="bu"]').should("be.visible").click()
        cy.get('#sapaan').contains("Bu")


        cy.get('#nama').clear()
        cy.get('#nama').type("Jane Dhoe Edit")
        cy.log("Form informasi umum bagian Nama lengkap berfungsi dengan baik")

        //* form informasi umum bagian tipe identitas
        // todo memeriksa ketersediaan label dan inputan pada bagian tipe identitas
        cy.get(':nth-child(2) > .MuiCardContent-root > .css-1i24z3d > :nth-child(2) > .css-1iqhgio').should("be.visible").contains("Tipe Identitas")
        cy.get('#tipe_identitas').should("be.visible")
        cy.get('#no_identitas').should("be.visible").and("have.attr", "placeholder", "Masukkan nomor identitas")

        // todo menguji bagian list dan inputan text pada bagian tipe identitas
        cy.get('#tipe_identitas').should("be.visible").click()
        cy.get('[data-value="ktp"]').should("be.visible").click()
        cy.get('#tipe_identitas').contains("KTP")
        cy.get('#tipe_identitas').should("be.visible").click()
        cy.get('[data-value="sim"]').should("be.visible").click()
        cy.get('#tipe_identitas').contains("SIM")
        cy.get('#tipe_identitas').should("be.visible").click()
        cy.get('[data-value="paspor"]').should("be.visible").click()
        cy.get('#tipe_identitas').contains("Paspor")

        cy.get('#no_identitas').should("be.visible").click()
        cy.get('#no_identitas').type("menguji dengan huruf dan simbol !@#$%")
        cy.get('#no_identitas').clear()
        cy.get('#no_identitas').type("01010203")

        // * form informasi umum bagian alamat email
        // todo memeriksa label, caption dan inputan pada bagian alamat email
        cy.get(':nth-child(3) > .MuiGrid2-grid-md-4 > .MuiFormLabel-root').should("be.visible").contains("Alamat Email")
        cy.get(':nth-child(3) > .MuiGrid2-grid-md-4 > .MuiTypography-root').should("be.visible").contains("Anda dapat menambahkan lebih dari satu alamat email (jika ada)")
        cy.get('[name="email.0"]').should("be.visible").and("have.attr", "placeholder", "Masukkan alamat email")

        // todo menguji bagian inputan alamat email dan menghapusnya
        cy.get('[name="email.0"]').should("be.visible").clear()
        cy.get('[name="email.0"]').should("be.visible").type('edit@email.com')

        // * form informasi umum bagian nama perusahaan
        // todo memeriksa label dan inputan pada bagian nama perusahaan di form informasi umum
        cy.get(':nth-child(4) > .MuiGrid2-grid-md-4 > .MuiFormLabel-root').should("be.visible").contains("Nama Perusahaan")
        cy.get('#nama_perusahaan').should("be.visible").and("have.attr", "placeholder", "Masukkan nama perusahaan")

        // todo inputan nama perusahaan
        cy.get('#nama_perusahaan').clear()
        cy.get('#nama_perusahaan').type("Perusahaan edit")

        cy.log("nama perusahaan berfungsi dengan baik")

        // * form informasi umum bagian nomor hp dan nomor telepon
        // todo memeriksa label dan inputan nomor hp dan nomor telepon di form informasi umum
        cy.get(':nth-child(5) > .MuiGrid2-grid-md-4 > .MuiFormLabel-root').should("be.visible").contains("Nomor HP & Telepon")
        cy.get('#no_hp').should("be.visible").and("have.attr", "placeholder", "Masukkan nomor HP")
        cy.get('#no_telp').should("be.visible").and("have.attr", "placeholder", "Masukkan nomor telepon")

        // todo menguji inputan nomor hp dan nomor telepon
        cy.get('#no_hp').should("be.visible").type("menguji dengan huruf dan simbol !@#$")
        cy.get('#no_telp').should("be.visible").type("menguji dengan huruf dan simbol !@#$")
        cy.get('#no_hp').should("be.visible").clear()
        cy.get('#no_telp').should("be.visible").clear()
        cy.get('#no_hp').should("be.visible").type("0010101010101")
        cy.get('#no_telp').should("be.visible").type("0010101010101")

        cy.log("nomor hp dan nomor telepon tidak menerima huruf dan simbol berfungsi dengan baik")

        // * form informasi umum bagian fax dan npwp
        // todo memeriksa label dan inputan fax dan npwp di form informasi umum
        cy.get(':nth-child(6) > .MuiGrid2-grid-md-4 > .MuiFormLabel-root').should("be.visible").contains("Fax & NPWP")
        cy.get('#no_fax').should("be.visible").and("have.attr", "placeholder", "Masukkan fax")
        cy.get('#no_npwp').should("be.visible").and("have.attr", "placeholder", "Masukkan NPWP")

        // todo menguji inputan fax dan npwp
        cy.get('#no_fax').should("be.visible").type("menguji dengan huruf dan simbol !@#$")
        cy.get('#no_npwp').should("be.visible").type("menguji dengan huruf dan simbol !@#$")
        cy.get('#no_fax').should("be.visible").clear()
        cy.get('#no_npwp').should("be.visible").clear()
        cy.get('#no_fax').should("be.visible").type("00101010100101")
        cy.get('#no_npwp').should("be.visible").type("00101010100101")

        cy.log("fax dan npwp menerima huruf dan simbol yang dimana seharusnya hanya menerima angka saja")

        // * form informasi umum bagian NITKU
        // todo memeriksa label dan inputan NITKU di form informasi umum
        cy.get(':nth-child(7) > .MuiGrid2-grid-md-4 > .MuiFormLabel-root').should("be.visible").contains("Nomor Identitas Tempat Kegiatan Usaha (NITKU)")
        cy.get('#nitku').should("be.visible").and("have.attr", "placeholder", "Masukkan NITKU")
        // todo menguji inputan NITKU
        cy.get('#nitku').should("be.visible").type("menguji dengan huruf dan simbol !@#$")
        cy.get('#nitku').should("be.visible").clear()
        cy.get('#nitku').should("be.visible").type("0100100101")

        cy.log("NITKU berfungsi dengan baik")

        // * form informasi umum bagian alamat penagihan
        // todo memeriksa label , caption, inputan alamat penagihan dan checkbox di form informasi umum
        cy.get(':nth-child(8) > .MuiGrid2-grid-md-4 > .MuiFormLabel-root').should("be.visible").contains("Alamat Penagihan")
        cy.get("[placeholder='Masukkan alamat penagihan']").should("be.visible")
        cy.get('[data-testid="input-isDetailAlamatPenagihan"] > .MuiButtonBase-root > .PrivateSwitchBase-input').should("exist")
        cy.get('[data-testid="input-isDetailAlamatPenagihan"] > .MuiTypography-root').should("be.visible").contains("Tambah Rincian")

        // todo menguji inputan dan checkbox
        cy.get("[placeholder='Masukkan alamat penagihan']").should("be.visible").type("llolololo")
        cy.get('[data-testid="input-isDetailAlamatPenagihan"] > .MuiButtonBase-root > .PrivateSwitchBase-input').should("exist").click()
        cy.get('[data-testid="input-isDetailAlamatPenagihan"] > .MuiButtonBase-root > .PrivateSwitchBase-input').should("be.checked")
        cy.log("berfungsi dengan baik")

        // * form informasi umum bagian alamat pengiriman
        // todo memeriksa label , caption, inputan alamat pengiriman dan checkbox di form informasi umum
        cy.get(':nth-child(9) > .MuiGrid2-grid-md-4 > .MuiFormLabel-root').should("be.visible").contains("Alamat Pengiriman")
        cy.get(':nth-child(9) > .MuiGrid2-grid-md-4 > .MuiTypography-root').should("be.visible").contains("Kamu dapat menambahkan detail alamat dengan centang pada tambah rincian")
        cy.get("[placeholder='Masukkan alamat pengiriman']").should("be.visible")
        cy.get(':nth-child(9) > .MuiGrid2-container > :nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should("exist")
        cy.get(':nth-child(9) > .MuiGrid2-container > :nth-child(2) > .MuiFormControlLabel-root > .MuiTypography-root').should("be.visible").contains("Samakan dengan alamat penagihan")

        // todo menguji inputan dan checkbox
        // cy.get("[placeholder='Masukkan alamat pengiriman']").should("be.visible").type("llolololo")
        cy.get(':nth-child(9) > .MuiGrid2-container > :nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should("exist").click()
        // cy.get(':nth-child(9) > .MuiGrid2-container > :nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should("be.checked")
        cy.log("berfungsi dengan baik")

        // * form informasi bank
        // todo memeriksa ketersediaan header dan container form informasi bank
        cy.get(':nth-child(3) > .MuiCardHeader-root').should("exist")
        cy.get(':nth-child(3) > .MuiCardContent-root').should("exist")

        // todo judul form informasi bank
        cy.get(':nth-child(3) > .MuiCardHeader-root > .MuiCardHeader-content > .MuiTypography-root').should('be.visible').contains("Informasi Bank")

        // todo label kolom dan inputan pada form informasi bank
        cy.get(':nth-child(3) > .MuiCardContent-root > :nth-child(1) > .css-1st318m > .MuiGrid2-grid-md-4 > .MuiFormLabel-root').should("be.visible").contains("Nama Bank & Cabang")
        cy.get('[name="data_bank[0].bank_name"]').should("be.visible").and("have.attr", "placeholder", "Masukkan nama bank")
        cy.get('[name="data_bank[0].bank_branch"]').should("be.visible").and("have.attr", "placeholder", "Masukkan cabang")
        cy.get('[name="data_bank[0].holder_name"]').should("be.visible").and("have.attr", "placeholder", "Masukkan nama pemegang akun")
        cy.get('[name="data_bank[0].rek_no"]').should("be.visible").and("have.attr", "placeholder", "Masukkan nomor rekening")
        cy.get(':nth-child(3) > .MuiCardContent-root > :nth-child(1) > .css-1st318m > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root > .MuiButton-icon > [data-testid="AddIcon"]').should("be.visible")

        // todo menguji inputan pada form informasi bank
        cy.get('[name="data_bank[0].bank_name"]').should("be.visible").clear()
        cy.get('[name="data_bank[0].bank_name"]').should("be.visible").type("BCA")
        cy.get('[name="data_bank[0].bank_branch"]').should("be.visible").clear()
        cy.get('[name="data_bank[0].bank_branch"]').should("be.visible").type("Cabang baru")
        cy.get('[name="data_bank[0].holder_name"]').should("be.visible").clear()
        cy.get('[name="data_bank[0].holder_name"]').should("be.visible").type("lutfi baru")
        cy.get('[name="data_bank[0].rek_no"]').should("be.visible").clear()
        cy.get('[name="data_bank[0].rek_no"]').should("be.visible").type("00101010101")
        cy.get(':nth-child(3) > .MuiCardContent-root > :nth-child(1) > .css-1st318m > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root > .MuiButton-icon > [data-testid="AddIcon"]').should("be.visible").click()

        cy.get('[name="data_bank[1].bank_name"]').should("be.visible").type("BNI")
        cy.get('[name="data_bank[1].bank_branch"]').should("be.visible").type("Pekanbaru")
        cy.get('[name="data_bank[1].holder_name"]').should("be.visible").type("luthfie 1")
        cy.get('[name="data_bank[1].rek_no"]').should("be.visible").type("1234567890")
        cy.get(':nth-child(3) > .MuiCardContent-root > :nth-child(1) > .css-1st318m > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root > .MuiButton-icon > [data-testid="AddIcon"]').should("be.visible").click()

        cy.get('[name="data_bank[2].bank_name"]').should("be.visible").type("BCA")
        cy.get('[name="data_bank[2].bank_branch"]').should("be.visible").type("Jakarta")
        cy.get('[name="data_bank[2].holder_name"]').should("be.visible").type("luthfie")
        cy.get('[name="data_bank[2].rek_no"]').should("be.visible").type("1234567890")
        cy.get(':nth-child(3) > .MuiCardContent-root > :nth-child(1) > .css-1st318m > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root > .MuiButton-icon > [data-testid="AddIcon"]').should("be.visible").click()

        cy.get('[name="data_bank[3].bank_name"]').should("be.visible").type("BCA")
        cy.get('[name="data_bank[3].bank_branch"]').should("be.visible").type("Jakarta")
        cy.get('[name="data_bank[3].holder_name"]').should("be.visible").type("luthfie")
        cy.get('[name="data_bank[3].rek_no"]').should("be.visible").type("1234567890")

        cy.get(':nth-child(3) > .MuiCardContent-root > :nth-child(1) > .css-1st318m > .MuiGrid2-grid-md-8 > .css-1ov46kg > :nth-child(2) > .MuiButtonBase-root').click()
        cy.get('.css-1ov46kg > :nth-child(3) > .MuiButtonBase-root').click({ multiple: true })
        cy.get(':nth-child(3) > .MuiCardContent-root > :nth-child(1) > .css-1st318m > .MuiGrid2-grid-md-8 > .css-1ov46kg > :nth-child(2) > .MuiButtonBase-root').click()

        // * form informasi pemetaan akun
        // todo memeriksa ketersediaan header dan container form informasi pemetaan akun
        cy.get(':nth-child(4) > .MuiCardHeader-root').should("exist")
        cy.get(':nth-child(4) > .MuiCardContent-root').should("exist")

        // todo judul form pemetaan akun
        cy.get(':nth-child(4) > .MuiCardHeader-root > .MuiCardHeader-content > .MuiTypography-root').should('be.visible').contains("Informasi Pemetaan Akun")

        // todo label kolom , checkbox dan inputan pada form pemetaan akun
        cy.get(':nth-child(4) > .MuiCardContent-root > :nth-child(1) > .css-1st318m > .MuiGrid2-grid-md-4 > .MuiFormLabel-root').should("be.visible").contains("Pemetaan Akun")
        cy.get('[data-testid="input-fk_akun_piutang"] > .MuiInputBase-root').should("be.visible")
        cy.get('#piutang_max').should("be.visible").and("have.attr", "placeholder", "Masukkan piutang maksimum")

        cy.get('[data-testid="input-active_piutang_max"] > .MuiButtonBase-root > .PrivateSwitchBase-input').should("exist")
        cy.get('[data-testid="input-active_piutang_max"] > .MuiTypography-root').should("be.visible").contains("Aktifkan Piutang Maksimum")

        cy.get(':nth-child(4) > .MuiCardContent-root > .css-1i24z3d > :nth-child(2) > .MuiGrid2-grid-md-4 > .MuiFormLabel-root').should("be.visible").contains("Syarat Pembayaran Utama")
        cy.get('#syarat_pembayaran').should("be.visible")

        // todo menguji inputan pada form pemetaan akun
        // ? akun piutang
        cy.get('#fk_akun_piutang').should("be.visible").click()
        cy.contains("li", "1-10102 - Cadangan Kerugian Piutang").click()
        cy.get('.MuiAutocomplete-clearIndicator').click()
        cy.get('#fk_akun_piutang').should("be.visible").click()
        cy.contains("li", "1-0001 - tes akun dengan bank").click()
        cy.get('.MuiAutocomplete-clearIndicator').click()
        cy.get('#fk_akun_piutang').should("be.visible").click()
        // cy.contains("li", "1-0001234 - Akun Test 2").click()

        // ? piutang maksimum dan checkbox
        cy.get('#piutang_max').should("be.visible").clear()
        cy.get('#piutang_max').should("be.visible").click().type("500000")
        // cy.get('#piutang_max').contains("Rp 10.000.000")
        cy.get('[data-testid="input-active_piutang_max"] > .MuiButtonBase-root > .PrivateSwitchBase-input').should("exist").click()
        cy.get('[data-testid="input-active_piutang_max"] > .MuiButtonBase-root > .PrivateSwitchBase-input').should("be.checked")

        // todo menguji inputan pada syarat pembayaraan utama
        cy.get('#syarat_pembayaran').should("be.visible").click()
        cy.contains("li", "termin sebulan 15").click()
        cy.get('#syarat_pembayaran').should("be.visible").contains("termin sebulan 15")

        // * tombol batal dan simpan
        // todo memeriksa ketersediaan tombol
        cy.get('.css-16ogmd7 > .MuiButton-text').should("be.visible").contains("Batal")
        cy.get('.MuiButton-contained').should("be.visible").contains("Simpan").click()
    });

    context("Menguji fungsi-fungsi yang ada di halaman edit", () => {
        it("Case 3 : Mengubah tipe kontak dari data yang dipilih pada tabel karyawan menjadi Pelanggan", () => {
            // todo mengunjungi halaman edit dengan salah satu data yang ada di tabel karyawan
            cy.visit("https://cashflow.assist.id/admin/contacts");

            cy.get('#simple-tab-2').should("be.visible").contains("Karyawan").click();

            cy.get('table tbody tr').not(':first')
                .eq(1)
                .find('td')
                .eq(1)
                .click()

            cy.get('.MuiStack-root > .MuiButtonBase-root').should("be.visible").contains('Ubah Profil Kontak').click()

            // todo mengubah tipe kontak menjadi pelanggan
            cy.get('#tipe_kontak').should('be.visible').click()
            cy.get('[data-value="pelanggan"]').should("be.visible").contains("Pelanggan").click()
            cy.get('.MuiButton-contained').should("be.visible").contains("Simpan").click()

            cy.url().should('eq', 'https://cashflow.assist.id/admin/contacts')

            // ? helper text bahwa pesan berhasil
            cy.get('.MuiSnackbar-root > .MuiPaper-root').should('exist').contains("Kontak berhasil disimpan")
            cy.wait(2000)
        });

        it("Case 4 : Mengubah tipe kontak dari data yang dipilih pada tabel karyawan menjadi Suplier", () => {
            // todo mengunjungi halaman edit dengan salah satu data yang ada di tabel karyawan
            cy.visit("https://cashflow.assist.id/admin/contacts");

            cy.get('#simple-tab-2').should("be.visible").contains("Karyawan").click();

            cy.get('table tbody tr').not(':first')
                .eq(1)
                .find('td')
                .eq(1)
                .click()

            cy.get('.MuiStack-root > .MuiButtonBase-root').should("be.visible").contains('Ubah Profil Kontak').click()

            // todo mengubah tipe kontak menjadi suplier
            cy.get('#tipe_kontak').should('be.visible').click()
            cy.get('[data-value="suplier"]').should("be.visible").contains("Suplier").click()
            cy.get('.MuiButton-contained').should("be.visible").contains("Simpan").click()

            cy.url().should('eq', 'https://cashflow.assist.id/admin/contacts')

            // ? helper text bahwa pesan berhasil
            cy.get('.MuiSnackbar-root > .MuiPaper-root').should('exist').contains("Kontak berhasil disimpan")

            cy.wait(2000)
        });

        it("Case 5 : Mengubah tipe kontak dari data yang dipilih pada tabel karyawan menjadi Lainnya", () => {
            // todo mengunjungi halaman edit dengan salah satu data yang ada di tabel karyawan
            cy.visit("https://cashflow.assist.id/admin/contacts");

            cy.get('#simple-tab-2').should("be.visible").contains("Karyawan").click();

            cy.get('table tbody tr').not(':first')
                .eq(1)
                .find('td')
                .eq(1)
                .click()

            cy.get('.MuiStack-root > .MuiButtonBase-root').should("be.visible").contains('Ubah Profil Kontak').click()

            // todo mengubah tipe kontak menjadi lainnya
            cy.get('#tipe_kontak').should('be.visible').click()
            cy.get('[data-value="lainnya"]').should("be.visible").contains("Lainnya").click()
            cy.get('.MuiButton-contained').should("be.visible").contains("Simpan").click()

            cy.url().should('eq', 'https://cashflow.assist.id/admin/contacts')

            // ? helper text bahwa pesan berhasil
            cy.get('.MuiSnackbar-root > .MuiPaper-root').should('exist').contains("Kontak berhasil disimpan")

            cy.wait(2000)
        });

        it("Case 6 : Mengubah tipe kontak dari data yang dipilih pada tabel lainnya menjadi pelanggan", () => {
            // todo mengunjungi halaman edit dengan salah satu data yang ada di tabel lainnya
            cy.visit("https://cashflow.assist.id/admin/contacts");

            cy.get('#simple-tab-3').should("be.visible").contains("Lainnya").click();

            cy.get('table tbody tr').not(':first')
                .eq(1)
                .find('td')
                .eq(1)
                .click()

            cy.get('.MuiStack-root > .MuiButtonBase-root').should("be.visible").contains('Ubah Profil Kontak').click()

            // todo mengubah tipe kontak menjadi pelanggan
            cy.get('#tipe_kontak').should('be.visible').click()
            cy.get('[data-value="pelanggan"]').should("be.visible").contains("Pelanggan").click()
            cy.get('.MuiButton-contained').should("be.visible").contains("Simpan").click()

            cy.url().should('eq', 'https://cashflow.assist.id/admin/contacts')

            // ? helper text bahwa pesan berhasil
            cy.get('.MuiSnackbar-root > .MuiPaper-root').should('exist').contains("Kontak berhasil disimpan")

            cy.wait(2000)
        });

        it("Case 7 : Mengubah tipe kontak dari data yang dipilih pada tabel lainnya menjadi suplier", () => {
            // todo mengunjungi halaman edit dengan salah satu data yang ada di tabel lainnya
            cy.visit("https://cashflow.assist.id/admin/contacts");

            cy.get('#simple-tab-3').should("be.visible").contains("Lainnya").click();

            cy.get('table tbody tr').not(':first')
                .eq(1)
                .find('td')
                .eq(1)
                .click()

            cy.get('.MuiStack-root > .MuiButtonBase-root').should("be.visible").contains('Ubah Profil Kontak').click()

            // todo mengubah tipe kontak menjadi suplier
            cy.get('#tipe_kontak').should('be.visible').click()
            cy.get('[data-value="suplier"]').should("be.visible").contains("Suplier").click()
            cy.get('.MuiButton-contained').should("be.visible").contains("Simpan").click()

            cy.url().should('eq', 'https://cashflow.assist.id/admin/contacts')

            // ? helper text bahwa pesan berhasil
            cy.get('.MuiSnackbar-root > .MuiPaper-root').should('exist').contains("Kontak berhasil disimpan")

            cy.wait(2000)
        });

        it("Case 8 : Mengubah tipe kontak dari data yang dipilih pada tabel lainnya menjadi Karyawan", () => {
            // todo mengunjungi halaman edit dengan salah satu data yang ada di tabel lainnya
            cy.visit("https://cashflow.assist.id/admin/contacts");

            cy.get('#simple-tab-3').should("be.visible").contains("Lainnya").click();

            cy.get('table tbody tr').not(':first')
                .eq(1)
                .find('td')
                .eq(1)
                .click()

            cy.get('.MuiStack-root > .MuiButtonBase-root').should("be.visible").contains('Ubah Profil Kontak').click()

            // todo mengubah tipe kontak menjadi karyawan
            cy.get('#tipe_kontak').should('be.visible').click()
            cy.get('[data-value="karyawan"]').should("be.visible").contains("Karyawan").click()
            cy.get('.MuiButton-contained').should("be.visible").contains("Simpan").click()

            cy.url().should('eq', 'https://cashflow.assist.id/admin/contacts')

            // ? helper text bahwa pesan berhasil
            cy.get('.MuiSnackbar-root > .MuiPaper-root').should('exist').contains("Kontak berhasil disimpan")

            cy.wait(2000)
        });

        it("Case 9 : Mengubah Grup kontak yang ada dari data yang dipilih dari tabel karyawan", () => {
            // todo mengunjungi halaman edit dengan salah satu data yang ada di tabel karyawan
            cy.visit("https://cashflow.assist.id/admin/contacts");

            cy.get('#simple-tab-3').should("be.visible").contains("Lainnya").click();

            cy.get('table tbody tr').not(':first')
                .eq(1)
                .find('td')
                .eq(1)
                .click()

            cy.get('.MuiStack-root > .MuiButtonBase-root').should("be.visible").contains('Ubah Profil Kontak').click()

            // todo menambahkan grup kontak
            cy.get('#fk_grup').should("be.visible").click()
            cy.get('[data-value="949d74c2-cd66-11ef-8deb-63e1863c978a"]').click()
            cy.get('.css-1j4fk1t').click()

            cy.get('.MuiButton-contained').should("be.visible").contains("Simpan").click()

            cy.url().should('eq', 'https://cashflow.assist.id/admin/contacts')

            // ? helper text bahwa pesan berhasil
            cy.get('.MuiSnackbar-root > .MuiPaper-root').should('exist').contains("Kontak berhasil disimpan")

            cy.wait(2000)

        });

        it.only("Case 10 : Menambahkan email pada data yang dipilih", () => {
            // todo mengunjungi halaman edit dengan salah satu data yang ada di tabel karyawan
            cy.visit("https://cashflow.assist.id/admin/contacts");

            cy.get('#simple-tab-3').should("be.visible").contains("Lainnya").click();

            cy.get('table tbody tr').not(':first')
                .eq(1)
                .find('td')
                .eq(1)
                .click()

            cy.get('.MuiStack-root > .MuiButtonBase-root').should("be.visible").contains('Ubah Profil Kontak').click()

            cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').click()
            cy.get('[name="email.1"]').type('emailkedua@ee')
        })
    });
});