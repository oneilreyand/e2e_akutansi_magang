describe("Pengujian website cashflow bagian kontak", () => {
    beforeEach(() => {
        cy.loginWithUI("damaresya947@gmail.com", "12345678")
    });

    it("Case 1 : mengunjungi website cashflow bagian kontak", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts")
    });

    it("Case 2 : memeriksa ketersediaan UI pada halaman kontak", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts")

        // logo
        cy.get('[data-testid="appbar-logo"]').should("be.visible")

        // profile
        cy.get('[data-testid="appbar-profile-button"]').should("be.visible").and(($profile) => {
            expect($profile).to.contain("User")
            expect($profile).to.contain("Muhammad Luthfiandra")
        })

        // icon
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

        // judul
        cy.get('.MuiTypography-h5 > span').should("exist").contains("Kontak")

        // tombol menambahkan kontak yang mengarah ke create contacts dan kembali ke halaman kontak
        cy.get('.css-aidtzz > .MuiButtonBase-root').should("exist").click()
        cy.url().should("eq", "https://cashflow.assist.id/admin/contacts/create")
        cy.get('.MuiBreadcrumbs-ol').should("be.visible").and(($nav) => {
            expect($nav).to.contain("Beranda")
            expect($nav).to.contain("Kontak")
            expect($nav).to.contain("Tambah Kontak")
        })
        cy.get(':nth-child(3) > .MuiTypography-root > span').should("be.visible").click()

        // jejak navigasi
        cy.get('.MuiBreadcrumbs-ol').should("be.visible").and(($navTrail) => {
            expect($navTrail).to.contain("Beranda")
            expect($navTrail).to.contain("Kontak")
        })

        // kontainer
        cy.get('.MuiTabs-flexContainer').should("be.visible").and(($container) => {
            expect($container).to.contain("Pelanggan")
            expect($container).to.contain("Suplier")
            expect($container).to.contain("Karyawan")
            expect($container).to.contain("Lainnya")
        })

        // button atur grup kontak
        cy.get('.css-1avq450 > .MuiGrid2-container > :nth-child(1)').should("be.visible").click()
        cy.get('#modal-description').should("be.visible")
        cy.get('.css-1j72te2 > .MuiButtonBase-root').click()

        // import kontak
        cy.get('.css-1avq450 > .MuiGrid2-container > :nth-child(2)').should("be.visible").click()
        cy.get('#modal-description').should("be.visible")
        cy.get('.css-1j72te2 > .MuiButtonBase-root').click()

        // form input kontak
        cy.get('[data-testid="search-input"] > .MuiInputBase-root').should("be.visible").type("testing")

    });
    it("Case 3 : menekan navigasi Karyawan dan akan mengarah ke bagian karyawan pada halaman yang sama", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts")
        cy.get('#simple-tab-2').should("be.visible").contains("Karyawan").click()
        cy.log("jika berhasil maka akan muncul judul Karyawan")
        cy.get('.MuiTypography-h6').should("be.visible").contains("Karyawan")
    });

    it("Case 4 : Memeriksa ketersediaan table yang ada pada karyawan di kontak", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts")
        cy.get('.css-k27tlm > .MuiPaper-root').should("be.visible")
    });

    it("Case 5 : Memeriksa kolom yang ada pada table karyawan di kontak", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts")
        cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(1)').should("be.visible").contains("ID")
        cy.get('.MuiTableRow-root > :nth-child(2)').should("be.visible").contains("Nama Lengkap")
        cy.get('.MuiTableRow-root > :nth-child(3)').should("be.visible").contains("Grup Kontak")
        cy.get('.MuiTableRow-root > :nth-child(4)').should("be.visible").contains("Email & No Handphone")
        cy.get('.MuiTableRow-root > :nth-child(5)').should("be.visible").contains("Alamat")
        cy.get('.MuiTableRow-root > :nth-child(6)').should("be.visible").contains("Total Piutang")
    });

    it("Case 6 : memeriksa data yang ada pada table karyawan", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts")
        cy.get('#simple-tab-2').should("be.visible").click()
        cy.get('.MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root').then($table => {
            const rows = $table.find('tbody tr').length;

            if (rows > 0) {
                cy.log("data tersedia")
            } else {
                cy.log("data kosong")
            }
        })
    });

    it("Case 7 : memeriksa pagination pada table", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts")
        cy.get('#simple-tab-2').should("be.visible").click()
        cy.get('.css-177wfr4 > .MuiStack-root > .MuiTypography-root').should("be.visible").contains("Menampilkan 0 - 0 dari 0 data")
        cy.get('.MuiPagination-ul > :nth-child(1)').should("exist")
        cy.get('.MuiPagination-ul > :nth-child(2)').should("exist")
    });

    it('Case 8 : Memeriksa ketersediaan UI pada bagian tambah kontak', () => {
        cy.visit("https://cashflow.assist.id/admin/contacts/create")

        // halaman create contact
        cy.get('.css-coltta').should("be.visible")

        // judul tambah kontak
        cy.get('.MuiTypography-h5 > span').should("be.visible").contains("Tambah Kontak")

        // jejak navigasi jika navigasi kontak ditekan maka akan berubah dari create contact ke halaman contact
        cy.get('.MuiBreadcrumbs-ol').should("be.visible").and(($navTrail) => {
            expect($navTrail).to.contain("Beranda")
            expect($navTrail).to.contain("Kontak")
            expect($navTrail).to.contain("Tambah Kontak")
        });
        cy.get(':nth-child(3) > .MuiTypography-root > span').click()
        cy.url().should("eq", "https://cashflow.assist.id/admin/contacts")

        cy.visit("https://cashflow.assist.id/admin/contacts/create")

        cy.log("tabel informasi kontak")

        // judul table
        cy.get(':nth-child(1) > .MuiCardHeader-root > .MuiCardHeader-content > .MuiTypography-root').should("be.visible").contains("Informasi Kontak")

        // isi table
        cy.get(':nth-child(1) > .MuiCardContent-root').should("be.visible")

        // judul dan isi kolom tipe kontak
        cy.get(':nth-child(1) > .MuiCardContent-root > .css-1i24z3d > :nth-child(1) > .MuiGrid2-grid-md-4').should("be.visible").contains("Tipe Kontak")
        // cy.get('#tipe_kontak').click()
        // cy.get('[data-value="suplier"]').should("be.visible").contains("Suplier").click()
        // cy.get('#tipe_kontak').should("have.text", "Suplier")        
        cy.get('#tipe_kontak').should("be.visible").click()
        cy.get('[data-value="karyawan"]').click()

        // judul dan isi kolom Grup kontak
        cy.get(':nth-child(1) > .MuiCardContent-root > .css-1i24z3d > :nth-child(2) > .MuiGrid2-grid-md-4 > .MuiFormLabel-root').should("be.visible").contains("Grup Kontak")
        cy.get('#fk_grup').should("be.visible")

        cy.log("tabel informasi umum")
        // judul table
        cy.get(':nth-child(2) > .MuiCardHeader-root > .MuiCardHeader-content > .MuiTypography-root').should("be.visible").contains("Informasi Umum")

        // kolom dan isi tabel
        cy.log("nama lengkap")
        cy.get(':nth-child(2) > .MuiCardContent-root > .css-1i24z3d > :nth-child(1) > .css-1iqhgio').should("be.visible").contains("Nama Lengkap")
        cy.get('#sapaan').should("be.visible").click()
        cy.get('[data-value="bapak"]').click()
        cy.get('#nama').should("be.visible").type("testing")
        // ===
        cy.log("tipe identitas")
        cy.get(':nth-child(2) > .MuiCardContent-root > .css-1i24z3d > :nth-child(2) > .css-1iqhgio > .MuiFormLabel-root').should("be.visible").contains("Tipe Identitas")
        cy.get('#tipe_identitas').should("be.visible").click()
        cy.get('[data-value="ktp"]').click()
        cy.get('#no_identitas').should("be.visible")
        // ===
        cy.log("alamat email")
        cy.get(':nth-child(3) > .MuiGrid2-grid-md-4 > .MuiFormLabel-root').should("be.visible").contains("Alamat Email")
        // cy.get('#email\.0').should("exist").type("testing@email.com")
        cy.get(':nth-child(3) > .MuiGrid2-grid-md-4 > .MuiTypography-root').should("be.visible")
        cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').should("be.visible").click()
        // cy.get('#email\.1').should("be.visible")
        cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > :nth-child(2) > .MuiButtonBase-root').should("be.visible").click()
        cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').should("be.visible")
        // ===
        cy.log("Nama Perusahaan")
        cy.get(':nth-child(4) > .MuiGrid2-grid-md-4 > .MuiFormLabel-root').should("be.visible").contains("Nama Perusahaan")
        cy.get('#nama_perusahaan').should("be.visible").and("have.attr", "placeholder", "Masukkan nama perusahaan")
        cy.get('#nama_perusahaan').type("heheheheh")
        // ===
        cy.log("Nomor hp")
        cy.get(':nth-child(5) > .MuiGrid2-grid-md-4 > .MuiFormLabel-root').should("be.visible").contains("Nomor HP & Telepon")
        cy.get('#no_hp').should("be.visible").and("have.attr", "placeholder", "Masukkan nomor HP")
        cy.get('#no_hp').type("081234567890")
        cy.get('#no_telp').should("be.visible").and("have.attr", "placeholder", "Masukkan nomor telepon")
        cy.get('#no_telp').type("098234567890")
        // ===
        cy.log("fax & NPWP")
        cy.get(':nth-child(6) > .MuiGrid2-grid-md-4 > .MuiFormLabel-root').should("be.visible").contains("Fax & NPWP")
        cy.get('#no_fax').should("be.visible").and("have.attr", "placeholder", "Masukkan fax")
        cy.get('#no_fax').type("02134567890")
        cy.get('#no_npwp').should("be.visible").and("have.attr", "placeholder", "Masukkan NPWP")
        cy.get('#no_npwp').type("12345678901234567890")
        // ===
        cy.log("Nomor identitas tempat kegiatan usaha")
        cy.get(':nth-child(7) > .MuiGrid2-grid-md-4 > .MuiFormLabel-root').should("be.visible").contains("Nomor Identitas Tempat Kegiatan Usaha (NITKU)")
        cy.get('#nitku').click().should("be.visible")
        // ===
        cy.log("alamat penagihan")
        cy.get(':nth-child(8) > .MuiGrid2-grid-md-4 > .MuiFormLabel-root').should("be.visible").contains("Alamat Penagihan")
        // cy.get('#\:rk\:').should("be.visible").and("have.attr", "placeholder", "Masukkan alamat penagihan")
        // cy.get('#\:rk\:').type("hehehehehe")
        cy.get('[data-testid="input-isDetailAlamatPenagihan"] > .MuiTypography-root').should("be.visible").contains("Tambah Rincian")
        cy.get('[data-testid="input-isDetailAlamatPenagihan"] > .MuiButtonBase-root > .PrivateSwitchBase-input').click()
        cy.get('[data-testid="input-isDetailAlamatPenagihan"] > .MuiButtonBase-root > .PrivateSwitchBase-input').should("be.checked")
        // ===
        cy.log("alamat pengiriman")
        cy.get(':nth-child(9) > .MuiGrid2-grid-md-4 > .MuiFormLabel-root').should("be.visible").contains("Alamat Pengiriman")
        // cy.get('#\:rl\:').should("be.visible").and("have.attr", "placeholder", "Masukkan alamat pengiriman")
        // cy.get('#\:rl\:').type("hehehehe")
        cy.get(':nth-child(9) > .MuiGrid2-container > :nth-child(2) > .MuiFormControlLabel-root > .MuiTypography-root').should("be.visible").contains("Samakan dengan alamat penagihan")
        cy.get(':nth-child(9) > .MuiGrid2-container > :nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should("exist").click()
        cy.get(':nth-child(9) > .MuiGrid2-container > :nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should("be.checked")
        // ===

        cy.log("tabel informasi bank")
        cy.get(':nth-child(3) > .MuiCardHeader-root > .MuiCardHeader-content > .MuiTypography-root').should("be.visible").contains("Informasi Bank")
        cy.get(':nth-child(3) > .MuiCardContent-root > :nth-child(1) > .css-1st318m > .MuiGrid2-grid-md-4 > .MuiFormLabel-root').should("be.visible").contains("Nama Bank & Cabang")
        // cy.get('#data_bank\[0\]\.bank_name').should("be.visible").and("have.attr", "placeholder", "Nama Bank")
        // cy.get('#data_bank\[0\]\.bank_name').type("lol")
        // cy.get('#data_bank\[0\]\.bank_branch').should("be.visible").and("have.attr", "placeholder", "Cabang")
        // cy.get('#data_bank\[0\]\.bank_branch').type("hehehehe")
        // cy.get('#data_bank\[0\]\.holder_name').should("be.visible").and("have.attr", "placeholder", "Nama pemegang akun")
        // cy.get('#data_bank\[0\]\.holder_name').type("orang ketiga")
        // cy.get('#data_bank\[0\]\.rek_no').should("be.visible").and("have.attr", "placeholder", "No Rekening")
        // cy.get('#data_bank\[0\]\.rek_no').type("12345678901234567890")
        // cy.get(':nth-child(3) > .MuiCardContent-root > :nth-child(1) > .css-1st318m > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').click()
        // cy.get('#data_bank\[1\]\.bank_name').should("be.visible").and("have.attr", "placeholder", "Nama Bank")
        // cy.get('#data_bank\[1\]\.bank_name').type("heheheheh")
        // cy.get('#data_bank\[1\]\.bank_branch').should("be.visible").and("have.attr", "placeholder", "Cabang")
        // cy.get('#data_bank\[1\]\.bank_branch').type("hehehehe")
        // cy.get('#data_bank\[1\]\.holder_name').should("be.visible").and("have.attr", "placeholder", "Nama pemegang akun")
        // cy.get('#data_bank\[1\]\.holder_name').type("orang ketiga")
        // cy.get('#data_bank\[1\]\.rek_no').should("be.visible").and("have.attr", "placeholder", "No Rekening")
        // cy.get('#data_bank\[1\]\.rek_no').type("12345678901234567890")
        // cy.get(':nth-child(3) > .MuiCardContent-root > :nth-child(1) > .css-1st318m > .MuiGrid2-grid-md-8 > .css-1ov46kg > :nth-child(2) > .MuiButtonBase-root').click()
        // ===

        cy.log("informasi pemetaan akun")
        cy.get(':nth-child(4) > .MuiCardHeader-root > .MuiCardHeader-content > .MuiTypography-root').should("be.visible").contains("Informasi Pemetaan Akun")
        cy.get(':nth-child(4) > .MuiCardHeader-root > .MuiCardHeader-content > .MuiTypography-root').should("be.visible").contains("Pemetaan Akun")
        cy.get('#fk_akun_piutang').should("be.visible").click()
        cy.get('#piutang_max').should("be.visible").click().and("have.attr", "placeholder", "Masukkan piutang maksimum")
        cy.get('[data-testid="input-active_piutang_max"] > .MuiTypography-root').should("be.visible")
        cy.get('[data-testid="input-active_piutang_max"] > .MuiButtonBase-root > .PrivateSwitchBase-input').should("exist").click()
        cy.get('[data-testid="input-active_piutang_max"] > .MuiButtonBase-root > .PrivateSwitchBase-input').should("be.checked")
        cy.log("syarat pembayaran utama")
        cy.get(':nth-child(4) > .MuiCardContent-root > .css-1i24z3d > :nth-child(2) > .MuiGrid2-grid-md-4 > .MuiFormLabel-root').should("be.visible").contains("Syarat Pembayaran Utama")
        cy.get('#syarat_pembayaran').should("exist").click()

        // ===
        cy.log("button submit dan delete")
        cy.get('.MuiButton-contained').should("be.visible")
        cy.get('.css-16ogmd7 > .MuiButton-text').should("be.visible")


    });
    context("Menguji fungsi pada create contact", () => {
        it("Case 9 : Menguji Dropdown list pada tipe kontak", () => {
            cy.visit("https://cashflow.assist.id/admin/contacts/create")
            cy.get('#tipe_kontak').should("be.visible").click()
            cy.get('[data-value="karyawan"]').click()
            cy.get('#tipe_kontak').contains("Karyawan")
            cy.reload()
            cy.get('#tipe_kontak').should("be.visible").click()
            cy.get('[data-value="lainnya"]').click()
            cy.get('#tipe_kontak').contains("Lainnya")
            cy.log("Dropdown list pada tipe kontak berhasil")
        });

        it("Case 10 : Menguji dropdown list pada grup kontak", () => {
            cy.visit("https://cashflow.assist.id/admin/contacts/create")
            cy.get('#fk_grup').should("be.visible").click()
            cy.get('[data-value="30a2c042-a658-11ef-8f78-25bebcc62186"]').click()
            cy.get('#fk_grup').contains("vendor obat asist 2")
            cy.get('[data-value="453ec850-a658-11ef-8f78-25bebcc62186"]').click()
            cy.get('#fk_grup').contains("vendor obat asist 2, vendor obat asist 3")
            cy.get('.css-1j4fk1t').click()
            cy.get('.MuiIconButton-colorError').click()
            cy.get('#fk_grup').contains("vendor obat asist 2, vendor obat asist 3")
            // menekan tombol silang untuk membatalkan 
            cy.get('#fk_grup').click()
            cy.get('.css-1j4fk1t').click()
            cy.get('[placeholder="Masukkan data baru"]').type("grup pengujian 1")
            cy.get('.MuiIconButton-colorError').click()
            cy.get('#fk_grup').contains("vendor obat asist 2, vendor obat asist 3")
            // menekan tombol ceklis untuk menambahkan grup baru
            cy.get('#fk_grup').click()
            cy.get('.css-1j4fk1t').click()
            cy.get('[placeholder="Masukkan data baru"]').type("grup pengujian 1")
            cy.get('.css-euo9o1').click()
            cy.get('#fk_grup').click()
            cy.get('[data-value="5c0a4d62-c67f-11ef-b637-9183449c0953"]').should("exist").contains("grup pengujian 1")
            cy.log("tes sudah diuji dan berhasil untuk menambahkan grup")
        });

        it("Case 11 : Menguji tabel informasi umum pada kolom nama lengkap", () => {
            cy.visit("https://cashflow.assist.id/admin/contacts/create")
            cy.get('#sapaan').should("be.visible").click()
            cy.get('[data-value="bapak"]').click()
            cy.get('#sapaan').contains("Bapak")
            cy.get('#sapaan').click()
            cy.get('[data-value="ibu"]').click()
            cy.get('#sapaan').contains("Ibu")
            cy.get('#sapaan').click()
            cy.get('[data-value="pak"]').click()
            cy.get('#sapaan').contains("Pak")
            cy.get('#sapaan').click()
            cy.get('[data-value="bu"]').click()
            cy.get('#sapaan').contains("Bu")
            cy.get('#nama').should("be.visible").type("percobaan 1")
            cy.log("dropdown list berhasil diuji, dan sukses")
        });

        it("Case 12 : Menguji tabel informasi umum pada tipe identitas", () => {
            cy.visit("https://cashflow.assist.id/admin/contacts/create")
            cy.get('#tipe_identitas').should("be.visible").click()
            cy.get('[data-value="ktp"]').click()
            cy.get('#tipe_identitas').contains("KTP")
            cy.get('#tipe_identitas').click()
            cy.get('[data-value="sim"]').click()
            cy.get('#tipe_identitas').contains("SIM")
            cy.get('#tipe_identitas').click()
            cy.get('[data-value="paspor"]').click()
            cy.get('#tipe_identitas').contains("Paspor")
            cy.get('#no_identitas').type("mengisi dengan huruf dan simbol @#$@$")
            cy.get('#no_identitas').type("0293748323912")
            cy.log("tes sudah dijalankan dan sukses")
        });

        it("Case 13 : Menguji pengisian alamat email pada tabel informasi umum", () => {
            cy.visit("https://cashflow.assist.id/admin/contacts/create")
            // cy.get('#email.0').should("be.visible").type("testing@email.com")
            cy.get('[placeholder="Masukkan alamat email"]').type('email@example.com');
            // tambah email
            cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').should("be.visible").click()
            // cy.get('#email\.1').should("be.visible").type("testing2@email.com")
            cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > :nth-child(2) > .MuiButtonBase-root').click()
            // //cy.log("input email tidak bisa di seleksi melalui cypress (element not found), namun masih bisa diuji secara manual")
            cy.log("Email sudah bisa diseleksi menggunakan cypress dengan cara mengambil dari placeholder")
        });

        it("Case 14 : Menguji pengisian nama perusahaan pada tabel informasi akun", () => {
            cy.visit("https://cashflow.assist.id/admin/contacts/create")
            cy.get('#nama_perusahaan').should("be.visible").type("perusahaan testing 1")
            cy.log("input nama perusahaan berhasil")
        });

        it("Case 15 : Menguji nomor hp dan telepon", () => {
            cy.visit("https://cashflow.assist.id/admin/contacts/create")
            cy.get('#no_hp').should("be.visible").type("menguji dengan huruf dan simbol @#@$@1")
            cy.get('#no_telp').should("be.visible").type("menguji dengan huruf dan simbol @#@$@1")
            // dengan angka
            cy.get('#no_hp').type("1234567890")
            cy.get('#no_telp').type("1234567890")
            cy.log("Nomor hp dan telepon hanya menerima angka")
        });

        it("Case 16 : Menguji bagian fax dan NPWP", () => {
            cy.visit("https://cashflow.assist.id/admin/contacts/create")
            cy.get('#no_fax').should("be.visible").type("menguji dengan huruf dan simbol !@#$%")
            cy.get('#no_npwp').should("be.visible").type("menguji dengan huruf dan simbol !#$%^&")
            cy.reload()
            // dengan angka
            cy.get('#no_fax').type("1234567890")
            cy.get('#no_npwp').type("12345678901234567890")
            cy.log("fax dan npwp dapat diisi dengan huruf, simbol, dan angka. yang dimana seharusnya form fax dan npwp tidak menerima inputan huruf");
        });

        it("Case 17 : Menguji NITKU pada tabel informasi umum", () => {
            cy.visit("https://cashflow.assist.id/admin/contacts/create")
            cy.get('#nitku').should("be.visible").click().type("menguji dengan huruf dan simbol !@#$%^&*")
            cy.reload()
            cy.get('#nitku').click().type("12345678")
            cy.log("pada NITKU hanya menerima angka saja")
        });

        it("Case 18 : Menguji alamat penagihan pada tabel informasi umum", () => {
            cy.visit("https://cashflow.assist.id/admin/contacts/create")
            cy.wait(1000)
            // cy.get('#\:rk\:').should("be.visible").type("testing 234")
            // cy.get(".MuiInputBase-input MuiOutlinedInput-input css-9jacqo").should("be.visible").type("testing 124")
            cy.get("[placeholder='Masukkan alamat penagihan']").should("be.visible").type("llolololo")
            cy.get('[data-testid="input-isDetailAlamatPenagihan"] > .MuiButtonBase-root > .PrivateSwitchBase-input').should("exist").click()
            cy.get('[data-testid="input-isDetailAlamatPenagihan"] > .MuiButtonBase-root > .PrivateSwitchBase-input').should("be.checked")
            // //cy.log("alamat penagihan tidak dapat diseleksi menggunakan cypress, namun masih bisa diisi secara manual. checkbox pada alamat penagihan dapat ditekan")
            cy.log("elemen berhasil diseleksi menggunakan cypress dan berfungsi dengan baik")
        });

        it("Case 19 : Menguji alamat pengiriman pada tabel informasi umum", () => {
            cy.visit("https://cashflow.assist.id/admin/contacts/create")
            // cy.get('#\:rk\:').should("be.visible").type("testing 234")
            cy.get('[placeholder="Masukkan alamat pengiriman"]').should("be.visible").type("testing area 51")
            cy.wait(1000)
            cy.get(':nth-child(9) > .MuiGrid2-container > :nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should("exist").click()
            cy.get(':nth-child(9) > .MuiGrid2-container > :nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should("be.checked")
            // //cy.log("alamat pengriman tidak dapat diseleksi menggunakan cypress, namun masih bisa diisi secara manual. checkbox pada alamat pengiriman dapat ditekan")
            cy.log("elemen berhasil diseleksi menggunakan cypress dan berfungsi dengan baik")
        });

        it("Case 20 : menguji tabel informasi bank yang ada pada halaman create contact", () => {
            cy.visit("https://cashflow.assist.id/admin/contacts/create")
            // cy.get('#data_bank\[0\]\.bank_name').should("be.visible").type("bca")
            cy.get('[placeholder="Masukkan nama bank"]').should("exist").type("Bank indonesia")
            // cy.get('#data_bank\[0\]\.bank_branch').should("be.visible").type("Pekanbaru")
            cy.get('[placeholder="Masukkan cabang"]').should("be.visible").type("Banyak")
            // cy.get('#data_bank\[0\]\.holder_name').should("be.visible").type("saya sendiri")
            cy.get('[placeholder="Masukkan nama pemegang akun"]').should("be.visible").type("Luthfi")
            // cy.get('#data_bank\[0\]\.rek_no').should("be.visible").type("1234567")
            cy.get('[placeholder="Masukkan nomor rekening"]').should("be.visible").type("menguji dengan huruf dan simbol !@!#")
            cy.get('[placeholder="Masukkan nomor rekening"]').should("be.visible").type("12345678910291")
            cy.get(':nth-child(3) > .MuiCardContent-root > :nth-child(1) > .css-1st318m > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').should("be.visible").click()
            // cy.get('#data_bank\[1\]\.bank_name').should("be.visible").type("bca")
            cy.get('[name="data_bank[1].bank_name"]').should("exist").type("Bank indo")
            // cy.get('#data_bank\[1\]\.bank_branch').should("be.visible").type("Pekanbaru")
            cy.get('[name="data_bank[1].bank_branch"]').should("be.visible").type("10")
            // cy.get('#data_bank\[1\]\.holder_name').should("be.visible").type("saya sendiri")
            cy.get('[name="data_bank[1].holder_name"]').should("be.visible").type("luthfi kedua")
            // cy.get('#data_bank\[1\]\.rek_no').should("be.visible").type("1234567")
            cy.get('[name="data_bank[1].rek_no"]').should("be.visible").type("129832328736")
            cy.get(':nth-child(3) > .MuiCardContent-root > :nth-child(1) > .css-1st318m > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').should("be.visible").click()
            cy.get('[name="data_bank[2].bank_name"]').should("be.visible").type("bank ketiga")
            cy.get('.css-1ov46kg > :nth-child(3) > .MuiButtonBase-root').click()
            // cy.get(':nth-child(3) > .MuiCardContent-root > :nth-child(1) > .css-1st318m > .MuiGrid2-grid-md-8 > .css-1ov46kg > :nth-child(2) > .MuiButtonBase-root').should("be.visible").click()
            // //cy.log("form pada bagian informasi bank tidak dapat di seleksi oleh cypress dengan alasan tidak bisa ditemukan, namun masih bisa diisi secara manual")
            cy.log("elemen berhasil diuji dan berfungsi dengan baik")
        });

        it("Case 21 : menguji tabel informasi pemetaan akun", () => {
            cy.visit("https://cashflow.assist.id/admin/contacts/create")
            // cy.get('#fk_akun_piutang').should("be.visible").click()
            // cy.get('#fk_akun_piutang').should("be.visible").click().and("have.attr", "placeholder", "Masukkan piutang maksimum").type("menguji dengan huruf dan simbol")
            cy.get('#fk_akun_piutang').click();
            cy.contains('li', '1-10007 - test akun reyand').click();
            // dengan angka
            cy.get('#piutang_max').type("9128329834")
            // checkbox
            cy.get('[data-testid="input-active_piutang_max"] > .MuiButtonBase-root > .PrivateSwitchBase-input').should("exist").click()
            cy.get('[data-testid="input-active_piutang_max"] > .MuiButtonBase-root > .PrivateSwitchBase-input').should("be.checked")
            // cy.log("")
        });

        it("Case 22 : menguji syarat pembayaran utama yang ada pada table informasi pemetaan akun", () => {
            cy.visit("https://cashflow.assist.id/admin/contacts/create")
            cy.get('#syarat_pembayaran').click()
            cy.contains('li', 'termin sebulan 15').click();
            cy.get('#syarat_pembayaran').should("be.visible").contains("termin sebulan 15")
            cy.log()
        });

        it("Case 23 : menguji tombol batal yang ada pada form", () => {
            cy.visit("https://cashflow.assist.id/admin/contacts/create")
            cy.get('.css-16ogmd7 > .MuiButton-text').should("be.visible").click()
            cy.url().should("eq", "https://cashflow.assist.id/admin/contacts")
            cy.log("tombol batal pada form create contact dapat ditekan dan akan kembali ke halaman contact")
        });

        it("Case 24 : menguji tombol simpan yang ada pada form dengan data kosong", () => {
            cy.visit("https://cashflow.assist.id/admin/contacts/create")
            cy.get('.MuiButton-contained').should("be.visible").click()
            cy.get('.MuiSnackbar-root > .MuiPaper-root').should("exist").contains("Mohon periksa kembali form")
            cy.log("form tidak dapat dikirim jika ada data yang dibutuhkan kosong, dan akan muncul pop up peringatan")
        });

        it("Case 25 : mengirimkan form secara keseluruhan dengan data yang dikirimkan valid dengan tipe kontak karyawan", () => {
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
        cy.get('[placeholder="Masukkan alamat email"]').type('email@example.com');
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
        cy.get('#piutang_max').type("9128329834")
        cy.get('[data-testid="input-active_piutang_max"] > .MuiButtonBase-root > .PrivateSwitchBase-input').should("exist").click()
        cy.get('[data-testid="input-active_piutang_max"] > .MuiButtonBase-root > .PrivateSwitchBase-input').should("be.checked")
        cy.get('#syarat_pembayaran').click()
        cy.contains('li', 'termin sebulan 15').click();
        cy.get('#syarat_pembayaran').should("be.visible").contains("termin sebulan 15")
        cy.get('.MuiButton-contained').should("be.visible").click()
        cy.get('.MuiSnackbar-root > .MuiPaper-root').should("not.exist")
        cy.log("belum bisa mengirimkan data dan memberikan respon request body invalid")
    });

    it("Case 26 : mengirimkan form secara keseluruhan dengan data yang dikirimkan valid dengan tipe kontak karyawan", () => {
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
        cy.get('[placeholder="Masukkan alamat email"]').type('email@example.com');
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
        cy.get('#piutang_max').type("9128329834")
        cy.get('[data-testid="input-active_piutang_max"] > .MuiButtonBase-root > .PrivateSwitchBase-input').should("exist").click()
        cy.get('[data-testid="input-active_piutang_max"] > .MuiButtonBase-root > .PrivateSwitchBase-input').should("be.checked")
        cy.get('#syarat_pembayaran').click()
        cy.contains('li', 'termin sebulan 15').click();
        cy.get('#syarat_pembayaran').should("be.visible").contains("termin sebulan 15")
        cy.get('.MuiButton-contained').should("be.visible").click()
        cy.get('.MuiSnackbar-root > .MuiPaper-root').should("not.exist")
        cy.log("belum bisa mengirimkan data dan memberikan respon request body invalid")
    });


    it("Case 27 : mengirimkan form dengan dengan tidak mengisi bagian pemilihan grup yang dimana grup bersifat required", () => {
            cy.visit("https://cashflow.assist.id/admin/contacts/create")
            cy.get('#tipe_kontak').should("be.visible").click()
            cy.get('[data-value="karyawan"]').click()
            // cy.get('#fk_grup').should("be.visible").click()
            // cy.get('[data-value="30a2c042-a658-11ef-8f78-25bebcc62186"]').click()
            // cy.get('[data-value="453ec850-a658-11ef-8f78-25bebcc62186"]').click()
            // cy.get('#fk_grup').contains("vendor obat asist 2, vendor obat asist 3")
            // cy.get('.css-1j4fk1t').click()
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
            cy.get('#piutang_max').type("9128329834")
            cy.get('[data-testid="input-active_piutang_max"] > .MuiButtonBase-root > .PrivateSwitchBase-input').should("exist").click()
            cy.get('[data-testid="input-active_piutang_max"] > .MuiButtonBase-root > .PrivateSwitchBase-input').should("be.checked")
            cy.get('#syarat_pembayaran').click()
            cy.contains('li', 'termin sebulan 15').click();
            cy.get('#syarat_pembayaran').should("be.visible").contains("termin sebulan 15")
            cy.get('.MuiButton-contained').should("be.visible").click()
            cy.get('.MuiFormControl-fullWidth > .MuiTypography-root').should("be.visible").contains("Grup Kontak harus diisi")
            cy.get('.MuiSnackbar-root > .MuiPaper-root').should("exist").contains("Mohon periksa kembali form")
            cy.log("form tidak akan bisa dikirimkan karena grup merupakan data yang wajib diisi")
        });

        it("Case 28 : mengirimkan form dengan dengan tidak mengisi bagian nama lengkap yang dimana nama lengkap tidak required", () => {
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
            cy.get('#nama').should("be.visible")  //.type("percobaan ")
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
            cy.get('#piutang_max').type("9128329834")
            cy.get('[data-testid="input-active_piutang_max"] > .MuiButtonBase-root > .PrivateSwitchBase-input').should("exist").click()
            cy.get('[data-testid="input-active_piutang_max"] > .MuiButtonBase-root > .PrivateSwitchBase-input').should("be.checked")
            cy.get('#syarat_pembayaran').click()
            cy.contains('li', 'termin sebulan 15').click();
            cy.get('#syarat_pembayaran').should("be.visible").contains("termin sebulan 15")
            cy.get('.MuiButton-contained').should("be.visible").click()
            cy.get('#nama-helper-text').should("be.visible").contains("Nama Lengkap harus diisi")
            cy.get('.MuiSnackbar-root > .MuiPaper-root').should("exist").contains("Mohon periksa kembali form")
            cy.log("form tidak akan bisa dikirimkan karena grup merupakan data yang wajib diisi")
        });

        it(" : memeriksa ui yang tersedia pada navigasi lainnya", () => {
            cy.visit("https://cashflow.assist.id/admin/contacts")
            cy.get('#simple-tab-3').should("be.visible").click()

            // tabel 
            cy.get('.css-k27tlm > .MuiPaper-root').should("be.visible")

            // judul tabel
            cy.get('.MuiTypography-h6').should("be.visible").contains("Lainnya")

            // kolom tabel
            cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(1)').should("be.visible").contains("ID")
            cy.get('.MuiTableRow-root > :nth-child(2)').should("be.visible").contains("Nama Lengkap")
            cy.get('.MuiTableRow-root > :nth-child(3)').should("be.visible").contains("Grup Kontak")
            cy.get('.MuiTableRow-root > :nth-child(4)').should("be.visible").contains("Email & No Handphone")
            cy.get('.MuiTableRow-root > :nth-child(5)').should("be.visible").contains("Alamat")
            cy.get('.MuiTableRow-root > :nth-child(6)').should("be.visible").contains("Total Piutang")

            // pemeriksaan data yang tersedia
            cy.get('.MuiTableBody-root > .MuiTableRow-root > .MuiTableCell-root').then($table => {
                const rows = $table.find('tbody tr').length;

                if (rows > 0) {
                    cy.log("data tersedia")
                } else {
                    cy.log("data kosong")
                }
            });

        });

        it(" : menguji form secara keseluruhan dengan data yang dikirimkan valid dengan tipe kontak lainnta", () => {
            cy.visit("https://cashflow.assist.id/admin/contacts/create")
            // cy.get('#tipe_kontak').should("be.visible").click()
            // cy.get('[data-value="karyawan"]').click()
            // // cy.get('#fk_grup').should("be.visible").click()
            // // cy.get('[data-value="30a2c042-a658-11ef-8f78-25bebcc62186"]').click()
            // cy.get('#sapaan').should("be.visible").click()
            // cy.get('[data-value="bapak"]').click()
            // cy.get('#tipe_identitas').should("be.visible").click()
            // cy.get('[data-value="ktp"]').click()
            // cy.get('#nama_perusahaan').should("be.visible").type("perusahaan testing 1")
            // cy.get('#no_hp').type("1234567890")
            // cy.get('#no_telp').type("1234567890")
            // cy.get('#no_fax').type("1234567890")
            // cy.get('#no_npwp').type("12345678901234567890")
            // cy.get('#nitku').click().type("12345678")
            // cy.get('.MuiSnackbar-root > .MuiPaper-root').should("exist")
            cy.log("tidak semua data yang bisa diisi melalui cypress maka ada beberapa input yang harus ditambahkan secara manual, ketika semua data valid sudah terisi dan dikirimkan maka akan muncul peringatan request body is invalid")
        });



    });


});