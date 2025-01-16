describe("Menguji halaman tambah kontak pada cashflow Assist ID", () => {
    const email = "damaresya947@gmail.com";
    const password = "12345678";

    beforeEach(() => {
        cy.loginWithApi(email, password);
    });

    it("Case 1 : Memeriksa ketersediaan UI dan mengujinya pada bagian tambah kontak", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts/create")

        //* halaman create contact
        cy.get('.css-coltta').should("exist")

        //* judul tambah kontak
        cy.get('.MuiTypography-h5 > span').should("be.visible").contains("Tambah Kontak")

        //* jejak navigasi jika navigasi kontak ditekan maka akan berubah dari create contact ke halaman contact
        cy.get('.MuiBreadcrumbs-ol').should("be.visible").and(($navTrail) => {
            expect($navTrail).to.contain("Beranda")
            expect($navTrail).to.contain("Kontak")
            expect($navTrail).to.contain("Tambah Kontak")
        });
        cy.get(':nth-child(3) > .MuiTypography-root > span').click()
        cy.url().should("eq", "https://cashflow.assist.id/admin/contacts")

        //* kembali halaman create contacts
        cy.visit("https://cashflow.assist.id/admin/contacts/create")

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
        cy.get('#fk_grup').contains("vendor obat asist 2")
        cy.get('[data-value="5c0a4d62-c67f-11ef-b637-9183449c0953"]').click()
        cy.get('#fk_grup').contains("grup pengujian 1")
        cy.get('[data-value="453ec850-a658-11ef-8f78-25bebcc62186"]').click()
        cy.get('#fk_grup').contains("grup pengujian 1, vendor obat asist 2, vendor obat asist 3")
        cy.get('[data-value="1b1dded0-a658-11ef-8f78-25bebcc62186"]').click()
        cy.get('#fk_grup').contains("grup pengujian 1, vendor obat asist 2, vendor obat asist 3, vendor obat asist 4")
        cy.get('.css-1j4fk1t').should("be.visible").click()
        cy.get('.MuiIconButton-colorError').should("be.visible").click()
        cy.get('#fk_grup').contains("grup pengujian 1, vendor obat asist 2, vendor obat asist 3, vendor obat asist 4")

        cy.reload()

        // todo membatalkan pemilihan grup kontak yang telah dipilih sebelumnya
        cy.get('#fk_grup').should("be.visible").click()
        cy.get('[data-value="30a2c042-a658-11ef-8f78-25bebcc62186"]').click()
        cy.get('[data-value="30a2c042-a658-11ef-8f78-25bebcc62186"]').click()
        cy.get('#fk_grup').should("be.visible")

        // todo memilih grup kontak yang isinya sama
        cy.get('[data-value="5c0a4d62-c67f-11ef-b637-9183449c0953"]').click()
        cy.get('[data-value="8368fe12-c689-11ef-b637-9183449c0953"]').click()
        cy.get('#fk_grup').contains("grup pengujian 1, grup pengujian 1")
        cy.reload()

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

        cy.get('#nama').type("Jane Dhoe")
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
        cy.get('#no_identitas').type("12923849347")

        cy.log("Bagian nomor identitas tidak menerima huruf dan simbol")

        // * form informasi umum bagian alamat email
        // todo memeriksa label, caption dan inputan pada bagian alamat email
        cy.get(':nth-child(3) > .MuiGrid2-grid-md-4 > .MuiFormLabel-root').should("be.visible").contains("Alamat Email")
        cy.get(':nth-child(3) > .MuiGrid2-grid-md-4 > .MuiTypography-root').should("be.visible").contains("Anda dapat menambahkan lebih dari satu alamat email (jika ada)")
        cy.get('[name="email.0"]').should("be.visible").and("have.attr", "placeholder", "Masukkan alamat email")

        // todo menguji bagian inputan alamat email dan menghapusnya
        cy.get('[name="email.0"]').should("be.visible").type('testing@email.com')
        cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').should("be.visible").click()
        cy.get('[name="email.1"]').should("be.visible").type('testing1@email.com')
        cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').should("be.visible").click()
        cy.get('[name="email.2"]').should("be.visible").type('testing1@email.com')
        cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').should("be.visible").click()
        cy.get('[name="email.3"]').should("be.visible").type('testing1@email.com')
        cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').should("be.visible").click()
        cy.get('[name="email.4"]').should("be.visible").type('testing1@email.com')
        cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').should("be.visible").click()
        cy.get('[name="email.5"]').should("be.visible").type('testing1@email.com')
        cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > :nth-child(2) > .MuiButtonBase-root').should("be.visible").click()
        cy.get('.css-1ov46kg > :nth-child(3) > .MuiButtonBase-root').should("be.visible").click()
        cy.log("form inputan alamat email berfungsi dengan baik")

        // * form informasi umum bagian nama perusahaan
        // todo memeriksa label dan inputan pada bagian nama perusahaan di form informasi umum
        cy.get(':nth-child(4) > .MuiGrid2-grid-md-4 > .MuiFormLabel-root').should("be.visible").contains("Nama Perusahaan")
        cy.get('#nama_perusahaan').should("be.visible").and("have.attr", "placeholder", "Masukkan nama perusahaan")

        // todo inputan nama perusahaan
        cy.get('#nama_perusahaan').type("hehehehehehehehehe")

        cy.log("nama perusahaan berfungsi dengan baik")

        // * form informasi umum bagian nomor hp dan nomor telepon
        // todo memeriksa label dan inputan nomor hp dan nomor telepon di form informasi umum
        cy.get(':nth-child(5) > .MuiGrid2-grid-md-4 > .MuiFormLabel-root').should("be.visible").contains("Nomor HP & Telepon")
        cy.get('#no_hp').should("be.visible").and("have.attr", "placeholder", "Masukkan nomor HP")
        cy.get('#no_telp').should("be.visible").and("have.attr", "placeholder", "Masukkan nomor telepon")

        // todo menguji inputan nomor hp dan nomor telepon
        cy.get('#no_hp').should("be.visible").type("menguji dengan huruf dan simbol !@#$")
        cy.get('#no_telp').should("be.visible").type("menguji dengan huruf dan simbol !@#$")
        cy.get('#no_hp').should("be.visible").type("0912778329847")
        cy.get('#no_telp').should("be.visible").type("0912778329847")

        cy.log("nomor hp dan nomor telepon tidak menerima huruf dan simbol berfungsi dengan baik")

        // * form informasi umum bagian fax dan npwp
        // todo memeriksa label dan inputan fax dan npwp di form informasi umum
        cy.get(':nth-child(6) > .MuiGrid2-grid-md-4 > .MuiFormLabel-root').should("be.visible").contains("Fax & NPWP")
        cy.get('#no_fax').should("be.visible").and("have.attr", "placeholder", "Masukkan fax")
        cy.get('#no_npwp').should("be.visible").and("have.attr", "placeholder", "Masukkan NPWP")

        // todo menguji inputan fax dan npwp
        cy.get('#no_fax').should("be.visible").type("menguji dengan huruf dan simbol !@#$")
        cy.get('#no_npwp').should("be.visible").type("menguji dengan huruf dan simbol !@#$")
        cy.get('#no_fax').should("be.visible").type("0912778329847")
        cy.get('#no_npwp').should("be.visible").type("0912778329847")

        cy.log("fax dan npwp menerima huruf dan simbol yang dimana seharusnya hanya menerima angka saja")

        // * form informasi umum bagian NITKU
        // todo memeriksa label dan inputan NITKU di form informasi umum
        cy.get(':nth-child(7) > .MuiGrid2-grid-md-4 > .MuiFormLabel-root').should("be.visible").contains("Nomor Identitas Tempat Kegiatan Usaha (NITKU)")
        cy.get('#nitku').should("be.visible").and("have.attr", "placeholder", "Masukkan NITKU")
        // todo menguji inputan NITKU
        cy.get('#nitku').should("be.visible").type("menguji dengan huruf dan simbol !@#$")
        cy.get('#nitku').should("be.visible").type("0912778329847")

        cy.log("NITKU berfungsi dengan baik")

        // * form informasi umum bagian alamat penagihan
        // todo memeriksa label , caption, inputan alamat penagihan dan checkbox di form informasi umum
        cy.get(':nth-child(8) > .MuiGrid2-grid-md-4 > .MuiFormLabel-root').should("be.visible").contains("Alamat Penagihan")
        // cy.get(':nth-child(8) > .MuiGrid2-grid-md-4 > .MuiTypography-root').should("be.visible").contains("Kamu dapat menambahkan detail alamat dengan centang pada tambah rincian")
        // cy.get("[placeholder='Masukkan alamat penagihan']").should("be.visible")
        // cy.get('[data-testid="input-isDetailAlamatPenagihan"] > .MuiButtonBase-root > .PrivateSwitchBase-input').should("exist")
        // cy.get('[data-testid="input-isDetailAlamatPenagihan"] > .MuiTypography-root').should("be.visible").contains("Tambah Rincian")

        // todo menguji inputan dan checkbox
        cy.get("[placeholder='Masukkan alamat penagihan']").should("be.visible").type("llolololo")
        cy.get(':nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should("exist").click()
        cy.get(':nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should("be.checked")
        cy.log("berfungsi dengan baik")

        // * form informasi umum bagian alamat pengiriman
        // todo memeriksa label , caption, inputan alamat pengiriman dan checkbox di form informasi umum
        cy.get(':nth-child(9) > .MuiGrid2-grid-md-4 > .MuiFormLabel-root').should("be.visible").contains("Alamat Pengiriman")
        // cy.get(':nth-child(9) > .MuiGrid2-grid-md-4 > .MuiTypography-root').should("be.visible").contains("Kamu dapat menambahkan detail alamat dengan centang pada tambah rincian")
        cy.get("[placeholder='Masukkan alamat pengiriman']").should("be.visible")
        cy.get(':nth-child(9) > .MuiGrid2-container > :nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should("exist")
        cy.get(':nth-child(9) > .MuiGrid2-container > :nth-child(2) > .MuiFormControlLabel-root > .MuiTypography-root').should("be.visible").contains("Samakan dengan alamat penagihan")

        // todo menguji inputan dan checkbox
        cy.get("[placeholder='Masukkan alamat pengiriman']").should("be.visible")
        cy.get(':nth-child(9) > .MuiGrid2-container > :nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should("exist").click()
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
        cy.get('[name="data_bank[0].bank_name"]').should("be.visible").type("BCA")
        cy.get('[name="data_bank[0].bank_branch"]').should("be.visible").type("Jakarta")
        cy.get('[name="data_bank[0].holder_name"]').should("be.visible").type("luthfie")
        cy.get('[name="data_bank[0].rek_no"]').should("be.visible").type("1234567890")
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
        cy.contains("li", "1-0001234 - Akun Test 2").click()

        // ? piutang maksimum dan checkbox
        cy.get('#piutang_max').should("be.visible").click().type("10000000")
        // cy.get('#piutang_max').contains("Rp 10.000.000")
        cy.get('[data-testid="input-active_piutang_max"] > .MuiButtonBase-root > .PrivateSwitchBase-input').should("exist").click()
        cy.get('[data-testid="input-active_piutang_max"] > .MuiButtonBase-root > .PrivateSwitchBase-input').should("be.checked")

        // todo menguji inputan pada syarat pembayaraan utama
        cy.get('#syarat_pembayaran').should("be.visible").click()
        cy.contains("li", "termin sebulan 15").click()
        cy.get('#syarat_pembayaran').should("be.visible").contains("termin sebulan 15")

        cy.log("..")

        // * tombol batal dan simpan
        // todo memeriksa ketersediaan tombol
        cy.get('.css-16ogmd7 > .MuiButton-text').should("be.visible").contains("Batal")
        cy.get('.MuiButton-contained').should("be.visible").contains("Simpan")

        // todo menguji tombol batal
        cy.get('.css-16ogmd7 > .MuiButton-text').should("be.visible").contains("Batal").click()
        cy.url().should("eq", "https://cashflow.assist.id/admin/contacts")
        cy.wait(1000)
    });

    it("Case 2 : Mengisi semua data dengan valid dan mengirimnya dengan tipe kontak karyawan", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts/create")
        cy.get('#tipe_kontak').should("be.visible").click()
        cy.get('[data-value="karyawan"]').click()
        cy.get('#fk_grup').should("be.visible").click()
        cy.get('[data-value="30a2c042-a658-11ef-8f78-25bebcc62186"]').click()
        cy.get('[data-value="453ec850-a658-11ef-8f78-25bebcc62186"]').click()
        cy.get('#fk_grup').contains("vendor obat asist 2, vendor obat asist 3")
        cy.get('.css-1j4fk1t').click()
        cy.get('#sapaan').should("be.visible").click()
        cy.get('[data-value="bapak"]').click()
        cy.get('#sapaan').contains("Bapak")
        cy.get('#nama').should("be.visible").type("Isnin   ")
        cy.get('#tipe_identitas').should("be.visible").click()
        cy.get('[data-value="ktp"]').click()
        cy.get('#tipe_identitas').contains("KTP")
        cy.get('#no_identitas').type("1212121212121212")
        cy.get('[placeholder="Masukkan alamat email"]').type('testing@example.com');
        cy.get('#nama_perusahaan').should("be.visible").type("perusahaan testing 1")
        cy.get('#no_hp').type("1234567890")
        cy.get('#no_telp').type("1234567890")
        cy.get('#no_fax').type("1234567890")
        cy.get('#no_npwp').type("12345678901234567890")
        cy.get('#nitku').click().type("12345678")
        cy.get("[placeholder='Masukkan alamat penagihan']").should("be.visible").type("llolololo")
        cy.get('[placeholder="Masukkan alamat pengiriman"]').should("be.visible").type("testing area 51")
        cy.get(':nth-child(9) > .MuiGrid2-container > :nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should("exist").click()
        cy.get(':nth-child(9) > .MuiGrid2-container > :nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should("be.checked")
        cy.get('[placeholder="Masukkan nama bank"]').should("exist").type("Bank indonesia")
        cy.get('[placeholder="Masukkan cabang"]').should("be.visible").type("Banyak")
        cy.get('[placeholder="Masukkan nama pemegang akun"]').should("be.visible").type("Luthfi")
        cy.get('[placeholder="Masukkan nomor rekening"]').should("be.visible").type("12345678910291")
        cy.get('#fk_akun_piutang').click();
        cy.contains('li', '1-10007 - test akun reyand').click();
        cy.get('#piutang_max').type("10000000")
        cy.get('[data-testid="input-active_piutang_max"] > .MuiButtonBase-root > .PrivateSwitchBase-input').should("exist").click()
        cy.get('[data-testid="input-active_piutang_max"] > .MuiButtonBase-root > .PrivateSwitchBase-input').should("be.checked")
        cy.get('#syarat_pembayaran').click()
        cy.contains('li', 'termin sebulan 15').click();
        cy.get('#syarat_pembayaran').should("be.visible").contains("termin sebulan 15")
        cy.get('.MuiButton-contained').should("be.visible").click()

        // ! pemberitahuan bahwa form berhasil dikirim
        cy.get('.MuiSnackbar-root > .MuiPaper-root').should("exist")

        // todo memeriksa apakah data yang terkirim tersimpan
        cy.url().should("eq", "https://cashflow.assist.id/admin/contacts")
        cy.get('#simple-tab-2').should("exist").click()
        cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(4)').should("be.visible").contains("testing@example.com")

        cy.log("Form sukses dalam mengirimkan data dan menerimanya sehingga tampil di tabel")
    });

    it("Case 3 : mengirimkan form dengan data yang valid dan tipe kontak lainnya", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts/create")
        cy.get('#tipe_kontak').should("be.visible").click()
        cy.get('[data-value="lainnya"]').click()
        cy.get('#fk_grup').should("be.visible").click()
        cy.get('[data-value="30a2c042-a658-11ef-8f78-25bebcc62186"]').click()
        cy.get('[data-value="453ec850-a658-11ef-8f78-25bebcc62186"]').click()
        cy.get('#fk_grup').contains("vendor obat asist 2, vendor obat asist 3")
        cy.get('.css-1j4fk1t').click()
        cy.get('#sapaan').should("be.visible").click()
        cy.get('[data-value="bapak"]').click()
        cy.get('#sapaan').contains("Bapak")
        cy.get('#nama').should("be.visible").type("Akun uji coba dari saya ")
        cy.get('#tipe_identitas').should("be.visible").click()
        cy.get('[data-value="ktp"]').click()
        cy.get('#tipe_identitas').contains("KTP")
        cy.get('#no_identitas').type("1212121212121212")
        cy.get('[placeholder="Masukkan alamat email"]').type('testing@example.com');
        cy.get('#nama_perusahaan').should("be.visible").type("perusahaan testing 1")
        cy.get('#no_hp').type("1234567890")
        cy.get('#no_telp').type("1234567890")
        cy.get('#no_fax').type("1234567890")
        cy.get('#no_npwp').type("12345678901234567890")
        cy.get('#nitku').click().type("12345678")
        cy.get("[placeholder='Masukkan alamat penagihan']").should("be.visible").type("llolololo")
        // cy.get('[data-testid="input-isDetailAlamatPenagihan"] > .MuiButtonBase-root > .PrivateSwitchBase-input').should("exist").click()
        // cy.get('[data-testid="input-isDetailAlamatPenagihan"] > .MuiButtonBase-root > .PrivateSwitchBase-input').should("be.checked")
        cy.get('[placeholder="Masukkan alamat pengiriman"]').should("be.visible").type("testing area 51")
        cy.get(':nth-child(9) > .MuiGrid2-container > :nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should("exist").click()
        cy.get(':nth-child(9) > .MuiGrid2-container > :nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should("be.checked")
        cy.get('[placeholder="Masukkan nama bank"]').should("exist").type("Bank indonesia")
        cy.get('[placeholder="Masukkan cabang"]').should("be.visible").type("Banyak")
        cy.get('[placeholder="Masukkan nama pemegang akun"]').should("be.visible").type("Luthfi")
        cy.get('[placeholder="Masukkan nomor rekening"]').should("be.visible").type("12345678910291")
        cy.get('#fk_akun_piutang').click();
        cy.contains('li', '1-10007 - test akun reyand').click();
        cy.get('#piutang_max').type("10000000")
        cy.get('[data-testid="input-active_piutang_max"] > .MuiButtonBase-root > .PrivateSwitchBase-input').should("exist").click()
        cy.get('[data-testid="input-active_piutang_max"] > .MuiButtonBase-root > .PrivateSwitchBase-input').should("be.checked")
        cy.get('#syarat_pembayaran').click()
        cy.contains('li', 'termin sebulan 15').click();
        cy.get('#syarat_pembayaran').should("be.visible").contains("termin sebulan 15")
        cy.get('.MuiButton-contained').should("be.visible").click()

        // ! pemberitahuan bahwa form berhasil dikirim
        cy.get('.MuiSnackbar-root > .MuiPaper-root').should("exist")

        // todo memeriksa apakah data yang terkirim tersimpan
        cy.url().should("eq", "https://cashflow.assist.id/admin/contacts")
        cy.get('#simple-tab-3').should("exist").click()
        cy.get('.MuiTableBody-root > .MuiTableRow-root > :nth-child(4)').should("be.visible").contains("testing@example.com")
    });

    it("Case 4 : Mencoba merubah status code menjadi 500 ketika mengirimkan data dengan valid", () => {
        cy.intercept("POST", "https://api-cashflow.assist.id/api/kontak/add", {
            statusCode: 500,
            body: { message: "server error" }
        }).as("submitForm");


        cy.visit("https://cashflow.assist.id/admin/contacts/create")
        cy.get('#fk_grup').should("be.visible").click()
        cy.get('[data-value="30a2c042-a658-11ef-8f78-25bebcc62186"]').click()
        cy.get('.css-1j4fk1t').click()
        cy.get('#nama').should("be.visible").type("lutihe ")
        cy.get('#tipe_identitas').should("be.visible").click()
        cy.get('[data-value="paspor"]').click()
        cy.get('#tipe_identitas').contains("Paspor")
        cy.get('#no_identitas').type("00")
        cy.get('[placeholder="Masukkan alamat email"]').type('email@example.com')
        cy.get("[placeholder='Masukkan alamat penagihan']").should("be.visible").type("llolololo")
        cy.get('.MuiButton-contained').should("be.visible").click()

        cy.wait('@submitForm').then((interception) => {
            expect(interception.response.statusCode).to.eq(500)
        })

        // ! peringatan bahwa server sedang error
        cy.get('.MuiSnackbar-root > .MuiPaper-root').should("exist")
    });

    it("Case 5 : Mengirim form tambah kontak tanpa mengisi data apapun", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts/create")
        cy.get('.MuiButton-contained').should("be.visible").click()

        // ! pemberitahuan bahwa form harus diisi dengan benar
        cy.get('.MuiSnackbar-root > .MuiPaper-root').should("exist").contains("Mohon periksa kembali form")

        // ! pemberitahuan bahwa grup kontak bersifat wajib
        cy.get('.MuiFormControl-fullWidth > .MuiTypography-root').should("be.visible").contains("Grup Kontak harus diisi")

        // ! pemberitahuan bahwa nama lengkap harus diisi
        cy.get('#nama-helper-text').should("be.visible").contains("Nama Lengkap harus diisi")

        // ? alamat email bersifat wajib tapi dimana pemberitahuannya?

        // ! pemberitahuan bahwa alamat penagihan harus bersifat wajib
        cy.get(':nth-child(2) > .MuiCardContent-root > .css-1i24z3d').should("be.visible").contains("Alamat Penagihan harus diisi")

        cy.log("Form tidak bisa terkirim karena data ada yang masih kosong")
    });

    it("Case 6 : Mengirim form tambah kontak dengan nama lengkap menggunakan angka dan simbol", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts/create")
        cy.get('#nama').should("be.visible").type("nama menggunakan angka 123 @#$%")
        cy.get('.MuiButton-contained').should("be.visible").click()

        // ! pemberitahuan bahwa form harus diisi dengan benar
        cy.get('.MuiSnackbar-root > .MuiPaper-root').should("exist").contains("Mohon periksa kembali form")

        // ! pemberitahuan bahwa nama lengkap harus diisi dengan benar (hanya menerima huruf dan spasi)
        cy.get('#nama-helper-text').should("be.visible").contains("Nama Lengkap hanya boleh berisi huruf dan spasi")

        cy.log("Form tidak bisa terkirim karena nama lengkap mengandung angka dan simbol")
    });

    it.only("Case 7 : Mengirim alamat email yang tidak valid", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts/create")
        // todo tanpa @
        cy.get('[name="email.0"]').should("be.visible").type('testingemail.com')
        cy.get('.MuiButton-contained').should("be.visible").click()
        cy.reload()
        // todo tanpa.com
        cy.get('[name="email.0"]').should("be.visible").type('testingemail')
        cy.get('.MuiButton-contained').should("be.visible").click()
        cy.reload()
        // todo tanpa username
        cy.get('[name="email.0"]').should("be.visible").type('@email.com')
        cy.get('.MuiButton-contained').should("be.visible").click()

        // ! pemberitahuan bahwa form harus diisi dengan benar
        cy.get('.MuiSnackbar-root > .MuiPaper-root').should("exist").contains("Mohon periksa kembali form")

        cy.reload()

        // todo mencoba mengisi semua data yang diperlukan dengan benar kecuali bagian email untuk memastikan bahwa email memang diperlukan
        cy.get('#tipe_kontak').should("be.visible").click()
        cy.get('[data-value="karyawan"]').click()
        cy.get('#fk_grup').should("be.visible").click()
        cy.get('[data-value="30a2c042-a658-11ef-8f78-25bebcc62186"]').click()
        cy.get('[data-value="453ec850-a658-11ef-8f78-25bebcc62186"]').click()
        cy.get('#fk_grup').contains("vendor obat asist 2, vendor obat asist 3")
        cy.get('.css-1j4fk1t').click()
        cy.get('#sapaan').should("be.visible").click()
        cy.get('[data-value="bapak"]').click()
        cy.get('#sapaan').contains("Bapak")
        cy.get('#nama').should("be.visible").type("percobaan ")
        cy.get('#tipe_identitas').should("be.visible").click()
        cy.get('[data-value="ktp"]').click()
        cy.get('#tipe_identitas').contains("KTP")
        cy.get('#no_identitas').type("1212121212121212")
        cy.get('[placeholder="Masukkan alamat email"]').type('emailexample.com');
        cy.get('#nama_perusahaan').should("be.visible").type("perusahaan testing 1")
        cy.get('#no_hp').type("1234567890")
        cy.get('#no_telp').type("1234567890")
        cy.get('#no_fax').type("1234567890")
        cy.get('#no_npwp').type("12345678901234567890")
        cy.get('#nitku').click().type("12345678")
        cy.get("[placeholder='Masukkan alamat penagihan']").should("be.visible").type("llolololo")
        // cy.get('[data-testid="input-isDetailAlamatPenagihan"] > .MuiButtonBase-root > .PrivateSwitchBase-input').should("exist").click()
        // cy.get('[data-testid="input-isDetailAlamatPenagihan"] > .MuiButtonBase-root > .PrivateSwitchBase-input').should("be.checked")
        cy.get('[placeholder="Masukkan alamat pengiriman"]').should("be.visible").type("testing area 51")
        cy.get(':nth-child(9) > .MuiGrid2-container > :nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should("exist").click()
        cy.get(':nth-child(9) > .MuiGrid2-container > :nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should("be.checked")
        cy.get('[placeholder="Masukkan nama bank"]').should("exist").type("Bank indonesia")
        cy.get('[placeholder="Masukkan cabang"]').should("be.visible").type("Banyak")
        cy.get('[placeholder="Masukkan nama pemegang akun"]').should("be.visible").type("Luthfi")
        cy.get('[placeholder="Masukkan nomor rekening"]').should("be.visible").type("12345678910291")
        cy.get('#fk_akun_piutang').click();
        cy.contains('li', '1-10007 - test akun reyand').click();
        cy.get('#piutang_max').type("100000")
        cy.get('[data-testid="input-active_piutang_max"] > .MuiButtonBase-root > .PrivateSwitchBase-input').should("exist").click()
        cy.get('[data-testid="input-active_piutang_max"] > .MuiButtonBase-root > .PrivateSwitchBase-input').should("be.checked")
        cy.get('#syarat_pembayaran').click()
        cy.contains('li', 'termin sebulan 15').click();
        cy.get('#syarat_pembayaran').should("be.visible").contains("termin sebulan 15")
        cy.get('.MuiButton-contained').should("be.visible").click()

        cy.log("Form tidak dapat mengirimkan inputan karena email yang salah")
    });

    it("Case 8 : Mengirim alamat penagihan yang tidak valid", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts/create")

        // todo menggunakan angka dan simbol
        cy.get("[placeholder='Masukkan alamat penagihan']").should("be.visible").type("123 @!@#@#")
        cy.get('.MuiButton-contained').should("be.visible").click()

        // ! pemberitahuan bahwa form harus diisi dengan benar muncul karena data required tidak diisi
        cy.get('.MuiSnackbar-root > .MuiPaper-root').should("exist").contains("Mohon periksa kembali form")
        cy.log("form menerima alamat penagihan hanya diisi dengan angka dan simbol")
        cy.wait(1000)
    });

    it("Case 9 : Mengisi dan mengirim form dengan nomor hp dan telepon yang tidak valid", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts/create")

        // todo nomor hp dan telepon lebih dari 13 digit
        cy.get('#no_hp').type("12345612880128378273192803827890")
        cy.get('#no_telp').type("123456382380273827382737890")
        cy.get('.MuiButton-contained').should("be.visible").click()

        cy.get('#no_hp').type("12345612880128378273192803827890").clear()
        cy.get('#no_telp').type("123456382380273827382737890").clear()

        // todo nomor hp dan telepon menggunakan +62
        cy.get('#no_hp').type("+62 811-222-333")
        cy.get('#no_telp').type("+62 811-222-333")
        cy.get('.MuiButton-contained').should("be.visible").click()

        // ! pemberitahuan bahwa form harus diisi dengan benar muncul karena data required tidak diisi
        cy.get('.MuiSnackbar-root > .MuiPaper-root').should("exist").contains("Mohon periksa kembali form")
        cy.log("inputan pada nomor hp dan telepon menerima angka berapapun panjang digitnya tetapi mengabaikan simbol seperti +")

    });

    it("Case 10 : Menguji piutang maksimum dengan nominal yang tidak valid", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts/create")

        // todo mencoba bilangan quadriliun
        cy.get('#piutang_max').should("be.visible").type("100000000000000")
        cy.get('.MuiButton-contained').should("be.visible").click()

        cy.get('#piutang_max').should("be.visible").clear()

        // todo mencoba bilangan quintiliun
        cy.get('#piutang_max').should("be.visible").type("100000000000000000")
        cy.get('.MuiButton-contained').should("be.visible").click()

        cy.get('#piutang_max').should("be.visible").clear()

        // todo mencoba bilangan minus
        cy.get('#piutang_max').should("be.visible").type("-100000000000000")
        cy.get('.MuiButton-contained').should("be.visible").click()

        // todo mengisi semua data untuk memastikan tetapi angka piutang jadi minus
        cy.get('#tipe_kontak').should("be.visible").click()
        cy.get('[data-value="karyawan"]').click()
        cy.get('#fk_grup').should("be.visible").click()
        cy.get('[data-value="30a2c042-a658-11ef-8f78-25bebcc62186"]').click()
        cy.get('[data-value="453ec850-a658-11ef-8f78-25bebcc62186"]').click()
        cy.get('#fk_grup').contains("vendor obat asist 2, vendor obat asist 3")
        cy.get('.css-1j4fk1t').click()
        cy.get('#sapaan').should("be.visible").click()
        cy.get('[data-value="bapak"]').click()
        cy.get('#sapaan').contains("Bapak")
        cy.get('#nama').should("be.visible").type("percobaan ")
        cy.get('#tipe_identitas').should("be.visible").click()
        cy.get('[data-value="ktp"]').click()
        cy.get('#tipe_identitas').contains("KTP")
        cy.get('#no_identitas').type("1212121212121212")
        cy.get('[placeholder="Masukkan alamat email"]').type('email@example.com');
        cy.get('#nama_perusahaan').should("be.visible").type("perusahaan testing 1")
        cy.get('#no_hp').type("1234567890")
        cy.get('#no_telp').type("1234567890")
        cy.get('#no_fax').type("1234567890")
        cy.get('#no_npwp').type("12345678901234567890")
        cy.get('#nitku').click().type("12345678")
        cy.get("[placeholder='Masukkan alamat penagihan']").should("be.visible").type("llolololo")
        // cy.get('[data-testid="input-isDetailAlamatPenagihan"] > .MuiButtonBase-root > .PrivateSwitchBase-input').should("exist").click()
        // cy.get('[data-testid="input-isDetailAlamatPenagihan"] > .MuiButtonBase-root > .PrivateSwitchBase-input').should("be.checked")
        cy.get('[placeholder="Masukkan alamat pengiriman"]').should("be.visible").type("testing area 51")
        cy.get(':nth-child(9) > .MuiGrid2-container > :nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should("exist").click()
        cy.get(':nth-child(9) > .MuiGrid2-container > :nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should("be.checked")
        cy.get('[placeholder="Masukkan nama bank"]').should("exist").type("Bank indonesia")
        cy.get('[placeholder="Masukkan cabang"]').should("be.visible").type("Banyak")
        cy.get('[placeholder="Masukkan nama pemegang akun"]').should("be.visible").type("Luthfi")
        cy.get('[placeholder="Masukkan nomor rekening"]').should("be.visible").type("12345678910291")
        cy.get('#fk_akun_piutang').click();
        cy.contains('li', '1-10007 - test akun reyand').click();
        cy.get('#piutang_max').type("-100000")
        cy.get('[data-testid="input-active_piutang_max"] > .MuiButtonBase-root > .PrivateSwitchBase-input').should("exist").click()
        cy.get('[data-testid="input-active_piutang_max"] > .MuiButtonBase-root > .PrivateSwitchBase-input').should("be.checked")
        cy.get('#syarat_pembayaran').click()
        cy.contains('li', 'termin sebulan 15').click();
        cy.get('#syarat_pembayaran').should("be.visible").contains("termin sebulan 15")
        cy.get('.MuiButton-contained').should("be.visible").click()

        // ! peringatan bahwa angka piutang tidak valid
        cy.get('.MuiSnackbar-root > .MuiPaper-root').should("exist")

        cy.reload()

        // todo mengisi semua data tetapi bagian piutang maksimum menjadi sextiliun (10^21)
        cy.get('#tipe_kontak').should("be.visible").click()
        cy.get('[data-value="karyawan"]').click()
        cy.get('#fk_grup').should("be.visible").click()
        cy.get('[data-value="30a2c042-a658-11ef-8f78-25bebcc62186"]').click()
        cy.get('[data-value="453ec850-a658-11ef-8f78-25bebcc62186"]').click()
        cy.get('#fk_grup').contains("vendor obat asist 2, vendor obat asist 3")
        cy.get('.css-1j4fk1t').click()
        cy.get('#sapaan').should("be.visible").click()
        cy.get('[data-value="bapak"]').click()
        cy.get('#sapaan').contains("Bapak")
        cy.get('#nama').should("be.visible").type("percobaan ")
        cy.get('#tipe_identitas').should("be.visible").click()
        cy.get('[data-value="ktp"]').click()
        cy.get('#tipe_identitas').contains("KTP")
        cy.get('#no_identitas').type("1212121212121212")
        cy.get('[placeholder="Masukkan alamat email"]').type('email@example.com');
        cy.get('#nama_perusahaan').should("be.visible").type("perusahaan testing 1")
        cy.get('#no_hp').type("1234567890")
        cy.get('#no_telp').type("1234567890")
        cy.get('#no_fax').type("1234567890")
        cy.get('#no_npwp').type("12345678901234567890")
        cy.get('#nitku').click().type("12345678")
        cy.get("[placeholder='Masukkan alamat penagihan']").should("be.visible").type("llolololo")
        cy.get('[placeholder="Masukkan alamat pengiriman"]').should("be.visible").type("testing area 51")
        cy.get(':nth-child(9) > .MuiGrid2-container > :nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should("exist").click()
        cy.get(':nth-child(9) > .MuiGrid2-container > :nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should("be.checked")
        cy.get('[placeholder="Masukkan nama bank"]').should("exist").type("Bank indonesia")
        cy.get('[placeholder="Masukkan cabang"]').should("be.visible").type("Banyak")
        cy.get('[placeholder="Masukkan nama pemegang akun"]').should("be.visible").type("Luthfi")
        cy.get('[placeholder="Masukkan nomor rekening"]').should("be.visible").type("12345678910291")
        cy.get('#fk_akun_piutang').click();
        cy.contains('li', '1-10007 - test akun reyand').click();
        cy.get('#piutang_max').type("1000000000000000000000")
        cy.get('[data-testid="input-active_piutang_max"] > .MuiButtonBase-root > .PrivateSwitchBase-input').should("exist").click()
        cy.get('[data-testid="input-active_piutang_max"] > .MuiButtonBase-root > .PrivateSwitchBase-input').should("be.checked")
        cy.get('#syarat_pembayaran').click()
        cy.contains('li', 'termin sebulan 15').click();
        cy.get('#syarat_pembayaran').should("be.visible").contains("termin sebulan 15")
        cy.get('.MuiButton-contained').should("be.visible").click()

        cy.log("Piutang tidak menerima angka yang tidak valid")

        cy.get('.MuiSnackbar-root > .MuiPaper-root').should("exist")
        cy.wait(1000)
    });

    it("Case 11 : mencoba mengisi KTP dengan nilai yang salah", () => {
        // todo mengisi nomor ktp dengan 2 digit

        cy.visit("https://cashflow.assist.id/admin/contacts/create")
        cy.wait(2000)
        cy.get('#fk_grup').should("be.visible").click()
        cy.get('[data-value="30a2c042-a658-11ef-8f78-25bebcc62186"]').click()
        cy.get('.css-1j4fk1t').click()
        cy.get('#nama').should("be.visible").type("hello world ")
        cy.get('#tipe_identitas').should("be.visible").click()
        cy.get('[data-value="ktp"]').click()
        cy.get('#tipe_identitas').contains("KTP")
        cy.get('#no_identitas').type("01")
        cy.get('[placeholder="Masukkan alamat email"]').type('email@example.com')
        cy.get("[placeholder='Masukkan alamat penagihan']").should("be.visible").type("llolololo")
        cy.get('.MuiButton-contained').should("be.visible").click()

        // ! form menerima nomor ktp meski hanya 2 digit

        // todo mengisi nomor ktp dengan > 16 digit
        cy.visit("https://cashflow.assist.id/admin/contacts/create")
        // cy.get('.css-aidtzz > .MuiButtonBase-root').should("exist").click()
        cy.get('#fk_grup').should("be.visible").click()
        cy.get('[data-value="30a2c042-a658-11ef-8f78-25bebcc62186"]').click()
        cy.get('.css-1j4fk1t').click()
        cy.get('#nama').should("be.visible").type("lutihe ")
        cy.get('#tipe_identitas').should("be.visible").click()
        cy.get('[data-value="ktp"]').click()
        cy.get('#tipe_identitas').contains("KTP")
        cy.get('#no_identitas').type("01348238748273498238029834")
        cy.get('[placeholder="Masukkan alamat email"]').type('email@example.com')
        cy.get("[placeholder='Masukkan alamat penagihan']").should("be.visible").type("llolololo")
        cy.get('.MuiButton-contained').should("be.visible").click()

        cy.wait(1000)
    });

    it("Case 12 : mencoba mengisi nilai sim", () => {
        // todo mengisi nilai sim dengan 2 digit
        cy.visit("https://cashflow.assist.id/admin/contacts/create")
        cy.get('#tipe_kontak').should("be.visible").click()
        cy.get('[data-value="karyawan"]').should("be.visible").contains("Karyawan").click()
        cy.get('#fk_grup').should("be.visible").click()
        cy.get('[data-value="30a2c042-a658-11ef-8f78-25bebcc62186"]').click()
        cy.get('.css-1j4fk1t').click()
        cy.get('#nama').should("be.visible").type("lutihe ")
        cy.get('#tipe_identitas').should("be.visible").click()
        cy.get('[data-value="sim"]').click()
        cy.get('#tipe_identitas').contains("SIM")
        cy.get('#no_identitas').type("00")
        cy.get('[placeholder="Masukkan alamat email"]').type('email@example.com')
        cy.get("[placeholder='Masukkan alamat penagihan']").should("be.visible").type("llolololo")
        cy.get('.MuiButton-contained').should("be.visible").click()

        cy.get('#no_identitas-helper-text').should("be.visible").contains("Nomor SIM harus 16 digit")
        
    });

    it("Case 13 : mencoba mengisi nilai paspor", () => {
        // todo mengisi nilai paspor dengan 2 digit
        cy.visit("https://cashflow.assist.id/admin/contacts/create")
        cy.get('#tipe_kontak').should("be.visible").click()
        cy.get('[data-value="karyawan"]').should("be.visible").contains("Karyawan").click()
        cy.get('#fk_grup').should("be.visible").click()
        cy.get('[data-value="30a2c042-a658-11ef-8f78-25bebcc62186"]').click()
        cy.get('.css-1j4fk1t').click()
        cy.get('#nama').should("be.visible").type("lutihe ")
        cy.get('#tipe_identitas').should("be.visible").click()
        cy.get('[data-value="paspor"]').click()
        cy.get('#tipe_identitas').contains("Paspor")
        cy.get('#no_identitas').type("00")
        cy.get('[placeholder="Masukkan alamat email"]').type('email@example.com')
        cy.get("[placeholder='Masukkan alamat penagihan']").should("be.visible").type("llolololo")
        cy.get('.MuiButton-contained').should("be.visible").click()
        
        cy.get('#no_identitas-helper-text').should("be.visible").contains("Nomor Paspor harus 16 digit")
        // ! form menerima nomor paspor meski hanya 2 digit
        cy.wait(3000)
    });
})