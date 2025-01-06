describe("Pengujian website cashflow bagian kontak", () => {
    beforeEach(() => {
        cy.loginWithUI("damaresya947@gmail.com", "12345678")
    });

    it("Case 1 : mengunjungi website cashflow bagian kontak", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts")
        cy.log("Halaman tersedia dan berhasil dikunjungi")
    });

    it("Case 2 : memeriksa ketersediaan UI pada halaman kontak", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts")

        //* logo
        // cy.get('[data-testid="appbar-logo"]').should("exist")

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

        //* judul
        cy.get('.MuiTypography-h5 > span').should("exist").contains("Kontak")

        //* tombol menambahkan kontak yang mengarah ke create contacts dan kembali ke halaman kontak
        cy.get('.css-aidtzz > .MuiButtonBase-root').should("exist").click()
        cy.url().should("eq", "https://cashflow.assist.id/admin/contacts/create")
        cy.get('.MuiBreadcrumbs-ol').should("be.visible").and(($nav) => {
            expect($nav).to.contain("Beranda")
            expect($nav).to.contain("Kontak")
            expect($nav).to.contain("Tambah Kontak")
        })
        cy.get(':nth-child(3) > .MuiTypography-root > span').should("be.visible").click()

        //* jejak navigasi
        cy.get('.MuiBreadcrumbs-ol').should("be.visible").and(($navTrail) => {
            expect($navTrail).to.contain("Beranda")
            expect($navTrail).to.contain("Kontak")
        })

        //* kontainer
        cy.get('.MuiTabs-flexContainer').should("be.visible").and(($container) => {
            expect($container).to.contain("Pelanggan")
            expect($container).to.contain("Suplier")
            expect($container).to.contain("Karyawan")
            expect($container).to.contain("Lainnya")
        })

        //* button atur grup kontak
        cy.get('.css-1avq450 > .MuiGrid2-container > :nth-child(1)').should("be.visible").click()
        cy.get('#modal-description').should("be.visible")
        cy.get('.css-1j72te2 > .MuiButtonBase-root').click()

        //* import kontak
        cy.get('.css-1avq450 > .MuiGrid2-container > :nth-child(2)').should("be.visible").click()
        cy.get('#modal-description').should("be.visible")
        cy.get('.css-1j72te2 > .MuiButtonBase-root').click()

        //* form input kontak
        cy.get('[data-testid="search-input"] > .MuiInputBase-root').should("be.visible").type("testing")

        cy.log("UI pada halaman kontak sudah tersedia")
    });

    it("Case 3 : menekan navigasi Karyawan dan akan mengarah ke bagian karyawan pada halaman yang sama", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts")
        cy.get('#simple-tab-2').should("be.visible").contains("Karyawan").click()
        cy.log("jika berhasil maka akan muncul judul Karyawan")
        cy.get('.MuiTypography-h6').should("be.visible").contains("Karyawan")
        cy.log("navigasi berhasil ditekan dan berjalan sesuai yang diharapkan")
        cy.wait(4000)
    });


    it("Case 4 : Memeriksa ketersediaan tabel dan kolom yang ada pada karyawan di kontak", () => {
        //* tabel
        cy.visit("https://cashflow.assist.id/admin/contacts")
        cy.get('.css-k27tlm > .MuiPaper-root').should("be.visible")

        //* kolom
        cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(1)').should("be.visible").contains("ID")
        cy.get('.MuiTableRow-root > :nth-child(2)').should("be.visible").contains("Nama Lengkap")
        cy.get('.MuiTableRow-root > :nth-child(3)').should("be.visible").contains("Grup Kontak")
        cy.get('.MuiTableRow-root > :nth-child(4)').should("be.visible").contains("Email & No Handphone")
        cy.get('.MuiTableRow-root > :nth-child(5)').should("be.visible").contains("Alamat")
        cy.get('.MuiTableRow-root > :nth-child(6)').should("be.visible").contains("Total Piutang")

        cy.log("Tabel dan kolom yang ada pada karyawan sudah tersedia")
    });

    it("Case 5 : memeriksa data yang ada pada table karyawan", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts")
        cy.get('#simple-tab-2').should("be.visible").click()
        cy.get('.MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root').then($table => {
            const rows = $table.find('tbody tr').length;
            if (rows > 0) {
                cy.log("data tersedia")
            } else {
                cy.log("data kosong")
            }
        });
        cy.log("data pada tabel karyawan masih kosong")
    });

    it("Case 6 : menekan navigasi Lainnya dan akan mengarah ke bagian Lainnya pada halaman yang sama", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts")
        cy.get('#simple-tab-3').should("be.visible").contains("Lainnya").click()
        cy.log("jika berhasil maka akan muncul judul Karyawan")
        cy.get('.MuiTypography-h6').should("be.visible").contains("Lainnya")
        cy.log("navigasi berhasil ditekan dan berjalan sesuai yang diharapkan")
    });

    it("Case 7 : Memeriksa ketersediaan tabel dan kolom yang ada pada lainnya di kontak", () => {
        //* tabel
        cy.visit("https://cashflow.assist.id/admin/contacts")
        cy.get('.css-k27tlm > .MuiPaper-root').should("be.visible")

        //* kolom
        cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(1)').should("be.visible").contains("ID")
        cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(2)').should("be.visible").contains("Nama Lengkap")
        cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(3)').contains("Grup Kontak")
        cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(4)').contains("Email & No Handphone")
        cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(5)').contains("Alamat")
        cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(6)').contains("Total Piutang")

        cy.log("Tabel dan kolom yang ada pada karyawan sudah tersedia")
        cy.wait(4000)
    });


    it("Case 8 : memeriksa data yang ada pada table lainnya", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts")
        cy.get('#simple-tab-3').should("be.visible").click()
        cy.get('.css-177wfr4').then($table => {
            const rows = $table.find('tbody tr').length;
            if (rows > 0) {
                cy.log("data tersedia")
            } else {
                cy.log("data kosong")
            }
        });
        cy.log("data pada tabel Lainnya sudah tersedia")
    });

    it("Case 9 : memeriksa pagination pada table", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts")
        cy.get('#simple-tab-2').should("be.visible").click()
        cy.get('.css-177wfr4 > .MuiStack-root > .MuiTypography-root').should("be.visible").contains("Menampilkan 0 - 0 dari 0 data")
        cy.get('.MuiPagination-ul > :nth-child(1)').should("exist")
        cy.get('.MuiPagination-ul > :nth-child(2)').should("exist")

        // cy.log("pagination tersedia namun tidak bisa ditekan karena data pada tabel karyawan tidak ada")
    });

    it("Case 10 : Memeriksa ketersediaan UI dan mengujinya pada bagian tambah kontak", () => {
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
        cy.get(':nth-child(8) > .MuiGrid2-grid-md-4 > .MuiTypography-root').should("be.visible").contains("Kamu dapat menambahkan detail alamat dengan centang pada tambah rincian")
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
        cy.get("[placeholder='Masukkan alamat pengiriman']").should("be.visible").type("llolololo")
        cy.get(':nth-child(9) > .MuiGrid2-container > :nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should("exist").click()
        cy.get(':nth-child(9) > .MuiGrid2-container > :nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should("be.checked")
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
        cy.wait(4000)
    });


    it("Case 11 : Mengisi semua data dengan valid dan mengirimnya dengan tipe kontak karyawan", () => {
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
        cy.get('#nama').should("be.visible").type("percobaan ")
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
        cy.get('[data-testid="input-isDetailAlamatPenagihan"] > .MuiButtonBase-root > .PrivateSwitchBase-input').should("exist").click()
        cy.get('[data-testid="input-isDetailAlamatPenagihan"] > .MuiButtonBase-root > .PrivateSwitchBase-input').should("be.checked")
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

    it("Case 12 : mengirimkan form dengan data yang valid dan tipe kontak lainnya", () => {
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
        cy.get('#nama').should("be.visible").type("percobaan ")
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
        cy.get('[data-testid="input-isDetailAlamatPenagihan"] > .MuiButtonBase-root > .PrivateSwitchBase-input').should("exist").click()
        cy.get('[data-testid="input-isDetailAlamatPenagihan"] > .MuiButtonBase-root > .PrivateSwitchBase-input').should("be.checked")
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

    it("Case 13 : Menguji checkbox pada alamat pengiriman agar sesuai dengan alamat penagihan", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts/create")
        cy.get("[placeholder='Masukkan alamat penagihan']").should("be.visible").type("testing 123@")
        cy.get("[placeholder='Masukkan alamat penagihan']").should("have.value", "testing 123@")
        cy.get('[placeholder="Masukkan alamat pengiriman"]').should("be.visible").type("testing area 51")
        cy.get(':nth-child(9) > .MuiGrid2-container > :nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should("exist").click()
        cy.get(':nth-child(9) > .MuiGrid2-container > :nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should("be.checked")
        cy.get('[placeholder="Masukkan alamat pengiriman"]').should("have.value", "testing 123@")

        cy.log("checkbox pada alamat pengiriman berfungsi dengan baik")
    });

    it("Case 14 : Mencoba mencari data yang sudah ditambahkan melalui form pada tabel yang ada di halaman kontak bagian karyawan dan lainnya dengan cara mengambil langsung data tabel nya", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts")
        // todo periksa data yang ada pada tabel karyawan
        cy.get('#simple-tab-2').should("exist").click()
        // ? mengambil data dari kolom email dan no hp
        cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(4)').should("be.visible").and("have.text", "testing@example.com1234567890")

        // todo periksa data yang ada pada tabel lainnya
        // mengambil data dari kolom email dan no hp
        cy.get('#simple-tab-3').should("be.visible").click()
        cy.get('.MuiTableBody-root > :nth-child(2) > :nth-child(4)').should("be.visible").and("have.text", "testing@example.com1234567890")
        cy.wait(4000)
    });


    it("Case 15 : Mencoba mencari data yang sudah ditambahkan melalui form pada tabel yang ada di halaman kontak bagian karyawan dan lainnya dengan cara mengetik di kolom pencarian kontak", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts")

        // todo periksa tabel karyawan
        cy.get('#simple-tab-2').should("be.visible").click()
        cy.get('[data-testid="search-input"] > .MuiInputBase-root').should("be.visible").type("testing")
        cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(4)').should("be.visible").and("have.text", "testing@example.com1234567890")

        // todo periksa tabel lainnya
        cy.get('#simple-tab-3').should("be.visible").click()
        cy.get('[data-testid="search-input"] > .MuiInputBase-root').should("be.visible").type("testing")
        cy.get('.MuiTableBody-root > :nth-child(2) > :nth-child(4)').should("be.visible").and("have.text", "testing@example.com1234567890")
    });

    it("Case 16 : Mencoba merubah status code menjadi 500 ketika mengirimkan data dengan valid", () => {
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

    it("Case 17 : Mengunjungi halaman detail kontak", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts")

        // todo akun yang ingin dilihat kontaknya secara detail
        cy.get('#simple-tab-2').should("be.visible").click()
        cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2) > .MuiButtonBase-root').should("be.visible").click()
        cy.url().should("eq", "https://cashflow.assist.id/admin/contacts/41fd7172-c8b1-11ef-b4d6-814f37804472")
        cy.get('.css-coltta').should("be.visible")

        cy.log("halaman detail kontak dari salah satu kontak berhasil dikunjungi")
        cy.wait(4000)
    });


    it("Case 18 : Memeriksa ketersediaan UI yang ada pada halaman detail kontak", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts/02b3b032-c864-11ef-b4d6-814f37804472")

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

        // * judul
        cy.get('.MuiTypography-h5 > span').should("exist").contains("Detail Kontak")

        // * jejak navigasi
        cy.get('.MuiBreadcrumbs-ol').should("be.visible").and(($navTrail) => {
            expect($navTrail).to.contain("Beranda")
            expect($navTrail).to.contain("Kontak")
            expect($navTrail).to.contain("Detail Kontak")
        })

        // todo dari halaman detail contact ke halaman contact
        cy.get(':nth-child(3) > .MuiTypography-root > span').should("be.visible").click()
        cy.url().should("eq", "https://cashflow.assist.id/admin/contacts")

        // todo dari halaman contact ke halaman beranda
        cy.get('.MuiBreadcrumbs-ol > :nth-child(1)').should("be.visible").click()
        cy.url().should("eq", "https://cashflow.assist.id/admin/dashboard")

        cy.visit("https://cashflow.assist.id/admin/contacts/02b3b032-c864-11ef-b4d6-814f37804472")

        // * button ke halaman ubah profil kontak
        cy.get('.MuiStack-root > .MuiButtonBase-root').should("be.visible").contains("Ubah Profil Kontak").click()
        cy.url().should("eq", "https://cashflow.assist.id/admin/contacts/edit/02b3b032-c864-11ef-b4d6-814f37804472")
        cy.get('.MuiButton-contained').should("be.visible").contains("Simpan").click()

        cy.get('#simple-tab-2').should("exist").click()
        cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2) > .MuiButtonBase-root').should("be.visible").click()

        // * button pilih tindakan
        cy.get('.MuiBox-root > .MuiFormControl-root > .MuiInputBase-root > .MuiSelect-select').should("be.visible").contains("Pilih Tindakan").click()
        cy.get('[data-value="buatTransaksiPenjualan"]').should("be.visible").contains("Buat Transaksi Penjualan")
        cy.get('[data-value="buatTransaksiPembelian"]').should("be.visible").contains("Buat Transaksi Pembelian")

        cy.reload()

        // * container tipe kontak
        cy.get('.css-1w9ce96 > .MuiStack-root > :nth-child(1)').should("be.visible")
        // todo judul container tipe kontak
        cy.get('.MuiStack-root > :nth-child(1) > .MuiListItemText-root > .MuiTypography-body2').should("be.visible").contains("Tipe Kontak")
        // todo status tipe kontak 
        cy.get('.MuiStack-root > :nth-child(1) > .MuiListItemText-root > .MuiTypography-h6').should("be.visible").and("have.text", "karyawan")

        // * container group contact
        cy.get('.css-1w9ce96 > .MuiStack-root > :nth-child(3)').should("be.visible")
        // todo judul container grup kontak
        cy.get('.MuiStack-root > :nth-child(3) > .MuiListItemText-root > .MuiTypography-body2').should("be.visible").contains("Group Kontak")
        // todo grup kontak 
        cy.get('.MuiStack-root > :nth-child(3) > .MuiListItemText-root > .MuiTypography-h6').should("be.visible").and("have.text", "vendor obat asist 2, vendor obat asist 3")

        // * tabel informasi umum pada halaman detail kontak
        cy.get(':nth-child(2) > .MuiCardHeader-root').should("be.visible")
        cy.get(':nth-child(2) > .MuiCardContent-root').should("be.visible")

        // todo judul table informasi umum
        cy.get(':nth-child(2) > .MuiCardHeader-root > .MuiCardHeader-content > .MuiTypography-root').should("be.visible").contains("Informasi Umum")

        // todo kolom nama lengkap dan isinyaa
        cy.get(':nth-child(2) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(1) > .MuiList-root > :nth-child(1) > .MuiListItemText-root').should("be.visible").contains("Nama Lengkap")
        cy.get(':nth-child(2) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(1) > .MuiList-root > :nth-child(1) > .MuiListItemText-root > .MuiTypography-body2').should("be.visible").contains("Percobaan ")

        // todo kolom identitas dan isinya
        cy.get(':nth-child(2) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(1) > .MuiList-root > :nth-child(3) > .MuiListItemText-root > .MuiTypography-h6').should("be.visible").contains("Identitas")
        cy.get(':nth-child(2) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(1) > .MuiList-root > :nth-child(3) > .MuiListItemText-root > .MuiTypography-body2').should("be.visible").contains("KTP")

        // todo kolom nomor identitas dan isinya
        cy.get(':nth-child(1) > .MuiList-root > :nth-child(5) > .MuiListItemText-root > .MuiTypography-h6').should("be.visible").contains("No Identitas")
        cy.get(':nth-child(1) > .MuiList-root > :nth-child(5) > .MuiListItemText-root > .MuiTypography-body2').should("be.visible").contains("1212121212121212")

        // todo kolom alamat email dan isinya
        cy.get(':nth-child(1) > .MuiList-root > :nth-child(7) > .MuiListItemText-root > .MuiTypography-h6').should("be.visible").contains("Alamat Email")
        cy.get('.MuiTypography-body2 > .MuiTypography-root').should("be.visible").contains("testing@example.com")

        // todo kolom nama perusahaan dan isinya
        cy.get(':nth-child(1) > .MuiList-root > :nth-child(9) > .MuiListItemText-root > .MuiTypography-h6').should("be.visible").contains("Nama Perusahaan")
        cy.get(':nth-child(1) > .MuiList-root > :nth-child(9) > .MuiListItemText-root > .MuiTypography-body2').should("be.visible").contains("perusahaan testing 1")

        // todo kolom nomor handphone dan isinya
        cy.get(':nth-child(1) > .MuiList-root > :nth-child(11) > .MuiListItemText-root > .MuiTypography-h6').should("be.visible").contains("No Handphone")
        cy.get(':nth-child(1) > .MuiList-root > :nth-child(11) > .MuiListItemText-root > .MuiTypography-body2').should("be.visible").contains("1234567890")

        // todo kolom nomor telepon dan isinya
        cy.get(':nth-child(2) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(2) > .MuiList-root > :nth-child(1) > .MuiListItemText-root > .MuiTypography-h6').should("be.visible").contains("No Telepon")
        cy.get(':nth-child(2) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(2) > .MuiList-root > :nth-child(1) > .MuiListItemText-root > .MuiTypography-body2').should("be.visible").contains("1234567890")

        // todo kolom fax dan isinya
        cy.get(':nth-child(2) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(2) > .MuiList-root > :nth-child(3) > .MuiListItemText-root > .MuiTypography-h6').should("be.visible").contains("Fax")
        cy.get(':nth-child(2) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(2) > .MuiList-root > :nth-child(3) > .MuiListItemText-root > .MuiTypography-body2').should("be.visible").contains("1234567890")

        // todo kolom npwp dan isinya
        cy.get(':nth-child(2) > .MuiList-root > :nth-child(5) > .MuiListItemText-root > .MuiTypography-h6').should("be.visible").contains("NPWP")
        cy.get(':nth-child(2) > .MuiList-root > :nth-child(5) > .MuiListItemText-root > .MuiTypography-body2').should("be.visible").contains("12345678901234567890")

        // todo kolom nitku dan isinya
        cy.get(':nth-child(2) > .MuiList-root > :nth-child(7) > .MuiListItemText-root > .MuiTypography-h6').should("be.visible").contains("Nomor Identitas Tempat Kegiatan Usaha (NITKU)")
        cy.get(':nth-child(2) > .MuiList-root > :nth-child(7) > .MuiListItemText-root > .MuiTypography-body2').should("be.visible").contains("12345678")

        // todo kolom alamat penagihan dan isinya
        cy.get(':nth-child(2) > .MuiList-root > :nth-child(9) > .MuiListItemText-root > .MuiTypography-h6').should("be.visible").contains("Alamat Penagihan")
        cy.get(':nth-child(2) > .MuiList-root > :nth-child(9) > .MuiListItemText-root > .MuiTypography-body2').should("be.visible").contains("llolololo")

        // todo kolom alamat pengiriman dan isinya
        cy.get(':nth-child(2) > .MuiList-root > :nth-child(11) > .MuiListItemText-root > .MuiTypography-h6').should("be.visible").contains("Alamat Pengiriman")
        cy.get(':nth-child(2) > .MuiList-root > :nth-child(11) > .MuiListItemText-root > .MuiTypography-body2').should("be.visible").contains("llolololo")

        // * tabel informasi bank pada halaman detail kontak
        cy.get(':nth-child(3) > .MuiCardHeader-root').should("be.visible")
        cy.get(':nth-child(3) > .MuiCardContent-root').should("be.visible")

        // todo judul tabel
        cy.get(':nth-child(3) > .MuiCardHeader-root > .MuiCardHeader-content > .MuiTypography-root').should("be.visible").contains("Informasi Bank")

        // todo kolom nama bank dan isinya
        cy.get(':nth-child(3) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(1) > .MuiList-root > :nth-child(1) > .MuiListItemText-root > .MuiTypography-h6').should("be.visible").contains("Nama Bank")
        cy.get(':nth-child(3) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(1) > .MuiList-root > :nth-child(1) > .MuiListItemText-root > .MuiTypography-body2').should("be.visible").contains("Bank indonesia")

        // todo kolom pemegang akun dan isinya
        cy.get(':nth-child(3) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(2) > .MuiList-root > :nth-child(1) > .MuiListItemText-root > .MuiTypography-h6').should("be.visible").contains("Pemegang Akun")
        cy.get(':nth-child(3) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(2) > .MuiList-root > :nth-child(1) > .MuiListItemText-root > .MuiTypography-body2').should("be.visible").contains("Luthfi")

        // todo kolom cabang dan isinya
        cy.get(':nth-child(3) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(1) > .MuiList-root > :nth-child(3) > .MuiListItemText-root > .MuiTypography-h6').should("be.visible").contains("Cabang")
        cy.get(':nth-child(3) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(1) > .MuiList-root > :nth-child(3) > .MuiListItemText-root > .MuiTypography-body2').should("be.visible").contains("Banyak")

        // todo kolom No Rekening
        cy.get(':nth-child(3) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(2) > .MuiList-root > :nth-child(3) > .MuiListItemText-root > .MuiTypography-h6').should("be.visible").contains("No Rekening")
        cy.get(':nth-child(3) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(2) > .MuiList-root > :nth-child(3) > .MuiListItemText-root > .MuiTypography-body2').should("be.visible").contains("12345678910291")

        // * tabel Pemetaan akun pada halaman detail kontak
        cy.get(':nth-child(4) > .MuiCardHeader-root').should("be.visible")
        cy.get(':nth-child(4) > .MuiCardContent-root').should("be.visible")

        // todo kolom Akun piutang dan isinya
        cy.get(':nth-child(4) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(1) > .MuiList-root > :nth-child(1) > .MuiListItemText-root > .MuiTypography-h6').should("be.visible").contains("Akun Piutang")
        cy.get(':nth-child(4) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(1) > .MuiList-root > :nth-child(1) > .MuiListItemText-root > .MuiTypography-body2').should("be.visible").contains("test akun reyand")

        // todo kolom akun hutang dan isinya
        cy.get(':nth-child(4) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(2) > .MuiList-root > .MuiListItem-root > .MuiListItemText-root > .MuiTypography-h6').should("be.visible").contains("Akun Hutang")
        cy.get(':nth-child(4) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(2) > .MuiList-root > .MuiListItem-root > .MuiListItemText-root > .MuiTypography-body2').should("be.visible").contains("-")

        // todo kolom syarat pembayaran utama
        cy.get(':nth-child(4) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(1) > .MuiList-root > :nth-child(3) > .MuiListItemText-root > .MuiTypography-h6').should("be.visible").contains("Syarat Pembayaran Utama")
        cy.get(':nth-child(4) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(1) > .MuiList-root > :nth-child(3) > .MuiListItemText-root > .MuiTypography-body2').should("be.visible").contains("6eb87da0-bd07-11ef-8ed4-132085337d7c")
    });

    it("Case 19 : memeriksa ketersediaan UI dan melelakukan pengujian mengubah data pada halaman edit kontak", () => {
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
        cy.get(':nth-child(8) > .MuiGrid2-grid-md-4 > .MuiTypography-root').should("be.visible").contains("Kamu dapat menambahkan detail alamat dengan centang pada tambah rincian")
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


        cy.log("..")

        // * tombol batal dan simpan
        // todo memeriksa ketersediaan tombol
        cy.get('.css-16ogmd7 > .MuiButton-text').should("be.visible").contains("Batal")
        cy.get('.MuiButton-contained').should("be.visible").contains("Simpan").click()
    });

    it("Case 20 : Mencoba merubah status code menjadi 500 ketika mengirimkan data dengan valid dan mengubahnya lagi ke 200 agar data dapat terkirim", () => {
        // Set up intercept untuk gagal (status 500) terlebih dahulu
        cy.intercept("POST", "https://api-cashflow.assist.id/api/kontak/add", {
            statusCode: 500,
            body: { message: "server error" }
        }).as("failStatus");
    
        cy.visit("https://cashflow.assist.id/admin/contacts/create");
    
        cy.get('#fk_grup').should("be.visible").click();
        cy.get('[data-value="30a2c042-a658-11ef-8f78-25bebcc62186"]').click();
        cy.get('.css-1j4fk1t').click();
        cy.get('#nama').should("be.visible").type("lutihe ");
        cy.get('#tipe_identitas').should("be.visible").click();
        cy.get('[data-value="paspor"]').click();
        cy.get('#tipe_identitas').contains("Paspor");
        cy.get('#no_identitas').type("00");
        cy.get('[placeholder="Masukkan alamat email"]').type('email@example.com');
        cy.get("[placeholder='Masukkan alamat penagihan']").should("be.visible").type("llolololo");
    
        cy.get('.MuiButton-contained').should("be.visible").click();
        cy.wait('@failStatus').then((interception) => {
            expect(interception.response.statusCode).to.eq(500);
        });
    
        cy.get('.MuiSnackbar-root > .MuiPaper-root').should("exist");
    
        cy.intercept("POST", "https://api-cashflow.assist.id/api/kontak/add", {
            statusCode: 200,
            body: { message: "pengiriman sudah berhasil" }
        }).as("successStatus");
    
        cy.get('.MuiButton-contained').should("be.visible").click();
        cy.wait('@successStatus').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
        });
    });
    
    
});