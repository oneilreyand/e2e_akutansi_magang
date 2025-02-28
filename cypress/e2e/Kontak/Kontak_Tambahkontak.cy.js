describe('Menguji halaman Tambah kontak pada Cashflow assist ID', () => {
    const email = "damaresya947@gmail.com";
    const password = "12345678";

    beforeEach(() => {
        cy.loginWithApi(email, password);
    });

    it("Case 1 : Pergi kehalaman tambah kontak menggunakan tombol buat kontak di halaman kontak", () => {
        cy.visit('https://cashflow.assist.id/admin/contacts')
        cy.get('.css-aidtzz > .MuiButtonBase-root').should('be.visible').contains('Buat Kontak').click()
        cy.url().should('include', '/create')
        cy.log('halaman berhasil dikunjungi')
        cy.wait(2000)
    });

    it("Case 2 : Pergi kehalaman tambah kontak langsung dari link", () => {
        cy.visit('https://cashflow.assist.id/admin/contacts/create')
        cy.log('halaman berhasil dikunjungi')
        cy.wait(2000)
    });

    it("Case 3 : Memeriksa UI dihalaman tambah kontak", () => {
        // todo pergi kehalaman tambah kontak
        cy.visit('https://cashflow.assist.id/admin/contacts/create')

        // * icon
        cy.get('[data-testid="appbar-logo"]').should('be.visible')

        // * judul
        cy.get('.MuiTypography-h5 > span').should("be.visible").contains("Tambah Kontak")

        // * navbar content
        cy.get('.MuiBreadcrumbs-ol').should("be.visible").and(($navTrail) => {
            expect($navTrail).to.contain("Beranda")
            expect($navTrail).to.contain("Kontak")
            expect($navTrail).to.contain("Tambah Kontak")
        });

        // * profile
        cy.get('[data-testid="appbar-profile-button"]').should('be.visible').and(($profile) => {
            expect($profile).to.contain("Muhammad Luthfiandra")
            expect($profile).to.contain("User")
        });

        // * navbar main
        cy.get('.MuiDrawer-root > .MuiPaper-root').should('be.visible').then(($navMain) => {
            const items = ["Beranda", "Laporan", "Kas & Bank", "Penjualan", "Pembelian", "Biaya", "Kontak", "Produk", "Aset", "Daftar Akun", "Pengaturan"];

            const navText = $navMain.text();

            items.forEach(item => {
                expect(navText).to.include(item);
            });

            items.forEach(item => {
                cy.get('.MuiDrawer-root > .MuiPaper-root').contains(item).find('svg').should('exist')
            });
        });

        // * form informasi kontak
        // ? header form tipe kontak
        cy.get(':nth-child(1) > .MuiCardHeader-root').should('be.visible').contains('Informasi Kontak')

        // ? header content tipe kontak
        cy.get(':nth-child(1) > .MuiCardContent-root > .css-1i24z3d > :nth-child(1) > .MuiGrid2-grid-md-4').should('be.visible').contains('Tipe Kontak')
        cy.get(':nth-child(1) > .MuiCardContent-root > .css-1i24z3d > :nth-child(2) > .MuiGrid2-grid-md-4').should('be.visible').contains('Grup Kontak')

        // ? content tipe kontak
        cy.get('#tipe_kontak').should('be.visible').click().then(($dataValue) => {
            cy.get('[data-value="pelanggan"]').should('be.visible').contains('Pelanggan')
            cy.get('[data-value="suplier"]').should('be.visible').contains('Suplier')
            cy.get('[data-value="karyawan"]').should('be.visible').contains('Karyawan')
            cy.get('[data-value="lainnya"]').should('be.visible').contains('Lainnya')

            cy.get('[data-value="karyawan"]').should('be.visible').contains('Karyawan').click()
        });

        // ? header content grup kontak
        cy.get(':nth-child(1) > .MuiCardContent-root > .css-1i24z3d > :nth-child(2) > .MuiGrid2-grid-md-4').should('be.visible').contains('Grup Kontak')

        // ? content grup kontak
        cy.get('#fk_grup').should('be.visible').click().then(($groupValue) => {
            cy.get('[data-value]').should('be.visible').and('have.length.greaterThan', 5)
            cy.reload()
            // cy.get('.css-coltta').should('be.visible').click({force : true})
            // cy.get('.css-1j4fk1t').should('be.visible').scrollIntoView().click()
            // cy.get('.MuiIconButton-colorError').should('be.visible').click()
        });

        // * form informasi umum
        // ? header form INFORMASI UMUM
        cy.get(':nth-child(2) > .MuiCardHeader-root').should('be.visible').contains('Informasi Umum')

        // ? header content nama lengkap
        cy.get(':nth-child(2) > .MuiCardContent-root > .css-1i24z3d > :nth-child(1) > .css-1iqhgio').should('be.visible').contains('Nama Lengkap')

        // ? content sapaan Nama Lengkap
        cy.get('#sapaan').should('be.visible').click().then(($sapaValue) => {
            cy.get('[data-value="bapak"]').should('be.visible').contains('Bapak')
            cy.get('[data-value="ibu"]').should('be.visible').contains('Ibu')
            cy.get('[data-value="pak"]').should('be.visible').contains('Pak')
            cy.get('[data-value="bu"]').should('be.visible').contains('Bu')

            cy.get('[data-value="bapak"]').should('be.visible').contains('Bapak').click()
        });

        // ? content Nama lengkap
        cy.get('#nama').should('be.visible').and('have.attr', 'placeholder', 'Masukkan nama lengkap').and('have.attr', 'required')

        // ? header TIPE IDENTITAS
        cy.get(':nth-child(2) > .MuiCardContent-root > .css-1i24z3d > :nth-child(2) > .css-1iqhgio').should('be.visible').contains('Tipe Identitas').and('not.be.disabled')

        // ? content tipe identitas
        cy.get('#tipe_identitas').should('be.visible').click().then(($identitasValue) => {
            cy.get('[data-value="ktp"]').should('be.visible').contains('KTP')
            cy.get('[data-value="sim"]').should('be.visible').contains('SIM')
            cy.get('[data-value="paspor"]').should('be.visible').contains('Paspor')

            cy.get('[data-value="paspor"]').should('be.visible').contains('Paspor').click()
        });

        // ? content nomor identitas
        cy.get('#no_identitas').should('be.visible').and('have.attr', 'placeholder', 'Masukkan nomor identitas').and('not.be.disabled')

        // ? header EMAIL
        cy.get(':nth-child(3) > .MuiGrid2-grid-md-4 > .MuiFormLabel-root').should('be.visible').contains('Alamat Email')

        // ? header label
        cy.get('.MuiGrid2-grid-md-4 > .MuiTypography-root').should('be.visible').contains('Anda dapat menambahkan lebih dari satu alamat email (jika ada)')

        // ? content email
        cy.get('input[name="email.0"]').should('be.visible').and('have.attr', 'placeholder', 'Masukkan alamat email').and('not.be.disabled').and('have.attr', 'required')

        // ? menambah email
        cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').should('be.visible').contains('Tambah Email').click()
        cy.get('input[name="email.1"]').should('be.visible').and('have.attr', 'placeholder', 'Masukkan alamat email').and('not.be.disabled').and('have.attr', 'required')

        // ? tombol hapus email
        cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > :nth-child(2) > .MuiButtonBase-root').should('be.visible').contains("Hapus").click()
        cy.get('input[name="email.1"]').should('not.exist')

        // ? header NAMA PERUSAHAAN
        cy.get(':nth-child(4) > .MuiGrid2-grid-md-4').should('be.visible').contains('Nama Perusahaan')

        // ? content nama perusahaan
        cy.get('#nama_perusahaan').should('be.visible').and('have.attr', 'placeholder', 'Masukkan nama perusahaan').and('not.be.disabled')

        // ? header NO HP dan TELEPON
        cy.get(':nth-child(5) > .MuiGrid2-grid-md-4').should('be.visible').contains('Nomor HP & Telepon')

        // ? content no hp dan telepon
        cy.get('#no_hp').should('be.visible').and('have.attr', 'placeholder', 'Masukkan nomor HP').and('not.be.disabled')
        cy.get('#no_telp').should('be.visible').and('have.attr', 'placeholder', 'Masukkan nomor telepon').and('not.be.disabled')

        // ? header Fax dan NPWP
        cy.get(':nth-child(6) > .MuiGrid2-grid-md-4').should('be.visible').contains('Fax & NPWP')

        // ? content fax dan npwp
        cy.get('#no_fax').should('be.visible').and('have.attr', 'placeholder', 'Masukkan fax').and('not.be.disabled')
        cy.get('#no_npwp').should('be.visible').and('have.attr', 'placeholder', 'Masukkan NPWP').and('not.be.disabled')

        // ? Heaader NITKU
        cy.get(':nth-child(7) > .MuiGrid2-grid-md-4').should('be.visible').contains('Nomor Identitas Tempat Kegiatan Usaha (NITKU)')

        // ? content Nitku
        cy.get('#nitku').should('be.visible').click().and('have.attr', 'placeholder', 'Masukkan NITKU')

        // ? Header ALAMAT PENAGIHAN
        cy.get(':nth-child(8) > .MuiGrid2-grid-md-4').should('be.visible').contains('Alamat Penagihan')

        // ? content alamat penagihan
        cy.get('input[placeholder="Masukkan alamat penagihan"]').should('be.visible')

        // ? header ALAMAT PENGIRIMAN
        cy.get(':nth-child(9) > .MuiGrid2-grid-md-4').should('be.visible').contains('Alamat Pengiriman')

        // ? content alamat pengiriman input
        cy.get('input[placeholder="Masukkan alamat pengiriman"]').should('be.visible')

        // ? content alamat pengiriman checkbox dan label
        cy.get(':nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should('exist').check()
        cy.get(':nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should('be.checked')
        cy.get(':nth-child(2) > .MuiFormControlLabel-root > .MuiTypography-root').should('be.visible').contains('Samakan dengan alamat penagihan')

        // * form informasi bank
        // ? header form
        cy.get(':nth-child(3) > .MuiCardHeader-root').should('be.visible').contains('Informasi Bank')

        // ? header BANK & CABANG
        cy.get(':nth-child(3) > .MuiCardContent-root > .css-1i24z3d > .css-1st318m > .MuiGrid2-grid-md-4').should('be.visible').contains('Nama Bank & Cabang')

        // ? content bank & cabang
        cy.get('input[name="data_bank[0].bank_name"]').should('be.visible').click().and('have.attr', 'placeholder', 'Masukkan nama bank')
        cy.get('input[name="data_bank[0].bank_branch"]').should('be.visible').click().and('have.attr', 'placeholder', 'Masukkan cabang')
        cy.get('input[name="data_bank[0].holder_name"]').should('be.visible').click().and('have.attr', 'placeholder', 'Masukkan nama pemegang akun')
        cy.get('input[name="data_bank[0].rek_no"]').should('be.visible').click().and('have.attr', 'placeholder', 'Masukkan nomor rekening')

        // ? tombol tambah bank
        cy.get(':nth-child(3) > .MuiCardContent-root > .css-1i24z3d > .css-1st318m > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').should('be.visible').contains('Tambah Bank Lainnya').click()


        // ? content bank & cabang 2
        cy.get('input[name="data_bank[1].bank_name"]').should('be.visible').click().and('have.attr', 'placeholder', 'Masukkan nama bank')
        cy.get('input[name="data_bank[1].bank_branch"]').should('be.visible').click().and('have.attr', 'placeholder', 'Masukkan cabang')
        cy.get('input[name="data_bank[1].holder_name"]').should('be.visible').click().and('have.attr', 'placeholder', 'Masukkan nama pemegang akun')
        cy.get('input[name="data_bank[1].rek_no"]').should('be.visible').click().and('have.attr', 'placeholder', 'Masukkan nomor rekening')

        // ? tombol tambah bank
        cy.get(':nth-child(3) > .MuiCardContent-root > .css-1i24z3d > .css-1st318m > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').should('be.visible').contains('Tambah Bank Lainnya').click()


        // ? content bank & cabang 3
        cy.get('input[name="data_bank[2].bank_name"]').should('be.visible').click().and('have.attr', 'placeholder', 'Masukkan nama bank')
        cy.get('input[name="data_bank[2].bank_branch"]').should('be.visible').click().and('have.attr', 'placeholder', 'Masukkan cabang')
        cy.get('input[name="data_bank[2].holder_name"]').should('be.visible').click().and('have.attr', 'placeholder', 'Masukkan nama pemegang akun')
        cy.get('input[name="data_bank[2].rek_no"]').should('be.visible').click().and('have.attr', 'placeholder', 'Masukkan nomor rekening')

        // ? tombol hapus
        cy.get(':nth-child(3) > .MuiCardContent-root > .css-1i24z3d > .css-1st318m > .MuiGrid2-grid-md-8 > .css-1ov46kg > :nth-child(2) > .MuiButtonBase-root').should('be.visible').contains('Hapus').click()
        cy.get(':nth-child(3) > .MuiCardContent-root > .css-1i24z3d > .css-1st318m > .MuiGrid2-grid-md-8 > .css-1ov46kg > :nth-child(2) > .MuiButtonBase-root').should('be.visible').contains('Hapus').click()

        // ? periksa bahwa input sudah terhapus
        cy.get('input[name="data_bank[1].bank_name"]').should('not.exist')
        cy.get('input[name="data_bank[1].bank_branch"]').should('not.exist')
        cy.get('input[name="data_bank[1].holder_name"]').should('not.exist')
        cy.get('input[name="data_bank[1].rek_no"]').should('not.exist')

        // * form informasi pemetaan akun
        // ? header PEMETAAN AKUN
        cy.get(':nth-child(4) > .MuiCardContent-root > .css-1i24z3d > :nth-child(1) > .MuiGrid2-grid-md-4').should('be.visible').contains('Pemetaan Akun')

        // ? content pemetaan akun
        cy.get('#fk_akun_piutang').should('be.visible').click().and('have.attr', 'placeholder', 'Pilih akun piutang').then(($option) => {
            cy.get('#fk_akun_piutang-listbox').should('be.visible').find('li').and('have.length.greaterThan', 1)
        });
        cy.get('#piutang_max').should('be.visible').click().and('have.attr', 'placeholder', 'Masukkan piutang maksimum')
        // ? check box dan label
        cy.get('[data-testid="input-active_piutang_max"] > .MuiButtonBase-root > .PrivateSwitchBase-input').should('exist').check()
        cy.get('[data-testid="input-active_piutang_max"] > .MuiButtonBase-root > .PrivateSwitchBase-input').should('be.checked')
        cy.get('[data-testid="input-active_piutang_max"] > .MuiTypography-root').should('be.visible').contains('Aktifkan piutang maksimum')

        // ? HEADER SYARAT PEMBAYARAN UTAMA
        cy.get(':nth-child(4) > .MuiCardContent-root > .css-1i24z3d > :nth-child(2) > .MuiGrid2-grid-md-4').should('be.visible').contains('Syarat Pembayaran Utama')

        // ? content syarat pembayaran utama
        cy.get('#syarat_pembayaran').should('be.visible').click()
        cy.contains('li', 'termin sebulan 15').should('be.visible').click()

        // * tombol
        // ? tombol simpan
        cy.get('.MuiButton-contained').should('be.visible').click()

        // ? tombol batal
        cy.get('.css-16ogmd7 > .MuiButton-text').should('be.visible').contains('Batal').click()
        cy.url().should('eq', 'https://cashflow.assist.id/admin/contacts')
    });

    it("Case 4 : Membuat kontak dengan tipe karyawan dengan tidak mengirimkan apapun", () => {
        cy.visit('https://cashflow.assist.id/admin/contacts/create')
        cy.get('.MuiButton-contained').should('be.visible').click()
        cy.get('#tipe_kontak').should('be.visible').click()
        cy.get('[data-value="karyawan"]').click()
        // ! pemberitahuan bahwa data yang wajib harus diisi
        cy.get('.MuiFormControl-fullWidth > .MuiTypography-root').should('be.visible').contains('Grup Kontak harus diisi')
        cy.get('#nama-helper-text').should('be.visible').contains('Nama Lengkap harus diisi')
        cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg').should('be.visible').find('p').contains('Email harus diisi')
        cy.wait(2000)
    });

    it("Case 5 : Membuat kontak dengan tipe lainnya dengan tidak mengirimkan apapun", () => {
        cy.visit('https://cashflow.assist.id/admin/contacts/create')
        cy.get('.MuiButton-contained').should('be.visible').click()
        cy.get('#tipe_kontak').should('be.visible').click()
        cy.get('[data-value="lainnya"]').click()
        // ! pemberitahuan bahwa data yang wajib harus diisi
        cy.get('.MuiFormControl-fullWidth > .MuiTypography-root').should('be.visible').contains('Grup Kontak harus diisi')
        cy.get('#nama-helper-text').should('be.visible').contains('Nama Lengkap harus diisi')
        cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg').should('be.visible').find('p').contains('Email harus diisi')
        cy.wait(2000)
    });

    context('Menguji form tambah kontak bagian tipe dan nomor identitas', () => {
        it("Case 6 : Mengisi data yang wajib dan mengirimkannya tetapi bagian nama lengkap tidak valid (menggunakan angka, simbol dan emote)", () => {
            cy.visit('https://cashflow.assist.id/admin/contacts/create')
            cy.get('.MuiButton-contained').should('be.visible').click()

            // ? tipe kontak
            cy.get('#tipe_kontak').should('be.visible').click()
            cy.get('[data-value="karyawan"]').click()

            // ? grup kontak
            cy.get('#fk_grup').should('be.visible').click()
            cy.get('ul').should('exist').eq(1).then(($list) => {
                cy.wait(2000)
                cy.wrap($list).find('li').eq(2).click()
                cy.wrap($list).find('li').last().click()
            })
            cy.get('.MuiIconButton-colorError').click()

            cy.get('#nama').should('be.visible').type('nama saya 12345 !@#$% 🗿🗿')

            // ? email
            cy.get('input[name="email.0').should('be.visible').type('namasaya@email.com')

            // ? tombol simpan
            cy.get('.MuiButton-contained').should('be.visible').click()

            // ! helper text nama lengkap
            cy.get('#nama-helper-text').should('be.visible').contains('Nama Lengkap hanya boleh berisi huruf dan spasi')
            cy.log('input bagian nama lengkap hanya menerima huruf dan spasi')
            cy.wait(2000)

            // ! helper text bahwa form harus diisi dengan benar
            cy.get('.MuiSnackbar-root > .MuiPaper-root').should('exist').contains('Mohon periksa kembali form')
        });

        it("Case 7 : Memilih tipe identitas ktp dan mengisinya inputan selain angka", () => {
            cy.visit('https://cashflow.assist.id/admin/contacts/create')
            cy.get('.MuiButton-contained').should('be.visible').click()

            // ? tipe kontak
            cy.get('#tipe_kontak').should('be.visible').click()
            cy.get('[data-value="karyawan"]').click()

            // ? tipe identitas & nomor identitas
            cy.get('#tipe_identitas').should('be.visible').click()
            cy.get('[data-value="ktp"]').click()
            cy.get('#no_identitas').should('be.visible').type('nama saya 12345')
            // cy.get('#tipe_identitas').should('be.visible').click()

            // ? tombol simpan
            cy.get('.MuiButton-contained').should('be.visible').click()

            // ! helper text nomor ktp
            cy.get('#no_identitas').click().blur()
            // cy.get('#no_identitas-helper-text').should('exist').and('contain', 'Nomor KTP harus 16 digit')
            cy.get('#no_identitas').should('be.visible').and('have.value', 'nama saya 12345')

            // ! helper text bahwa form harus diisi dengan benar
            cy.get('.MuiSnackbar-root > .MuiPaper-root').should('exist').contains('Mohon periksa kembali form')
            cy.log('nomor identitas ktp menerima huruf')
            cy.wait(2000)
        });

        it("Case 8 : Memilih tipe identitas sim dan mengisinya inputan selain angka", () => {
            cy.visit('https://cashflow.assist.id/admin/contacts/create')
            cy.get('.MuiButton-contained').should('be.visible').click()

            // ? tipe kontak
            cy.get('#tipe_kontak').should('be.visible').click()
            cy.get('[data-value="karyawan"]').click()

            // ? tipe identitas & nomor identitas
            cy.get('#tipe_identitas').should('be.visible').click()
            cy.get('[data-value="sim"]').click()
            cy.get('#no_identitas').should('be.visible').type('nama saya 12345')
            // cy.get('#tipe_identitas').should('be.visible').click()

            // ? tombol simpan
            cy.get('.MuiButton-contained').should('be.visible').click()

            // ! helper text nomor ktp
            cy.get('#no_identitas').click().blur()
            // cy.get('#no_identitas-helper-text').should('exist').and('contain', 'Nomor SIM harus 16 digit')
            cy.get('#no_identitas').should('be.visible').and('have.value', 'nama saya 12345')

            // ! helper text bahwa form harus diisi dengan benar
            cy.get('.MuiSnackbar-root > .MuiPaper-root').should('exist').contains('Mohon periksa kembali form')

            cy.log('nomor identitas sim menerima huruf')
            cy.wait(2000)
        });

        it("Case 9 : Memilih tipe identitas paspor dan mengisinya inputan selain angka", () => {
            cy.visit('https://cashflow.assist.id/admin/contacts/create')
            cy.get('.MuiButton-contained').should('be.visible').click()

            // ? tipe kontak
            cy.get('#tipe_kontak').should('be.visible').click()
            cy.get('[data-value="karyawan"]').click()

            // ? tipe identitas & nomor identitas
            cy.get('#tipe_identitas').should('be.visible').click()
            cy.get('[data-value="paspor"]').click()
            cy.get('#no_identitas').should('be.visible').type('nama saya 12345')
            // cy.get('#tipe_identitas').should('be.visible').click()

            // ? tombol simpan
            cy.get('.MuiButton-contained').should('be.visible').click()

            // ! helper text nomor ktp
            cy.get('#no_identitas').click().blur()
            // cy.get('#no_identitas-helper-text').should('exist').and('contain', 'Nomor Passport harus lebih dari 6 karakter')
            cy.get('#no_identitas').should('be.visible').and('have.value', 'nama saya 12345')

            // ! helper text bahwa form harus diisi dengan benar
            cy.get('.MuiSnackbar-root > .MuiPaper-root').should('exist').contains('Mohon periksa kembali form')

            cy.log('nomor identitas paspor menerima huruf')
            cy.wait(2000)
        });
    });

    context('Menguji form tambah kontak bagian email', () => {
        it("Case 10 : Mengisi bagian email tanpa @", () => {
            cy.visit('https://cashflow.assist.id/admin/contacts/create')
            cy.get('.MuiButton-contained').should('be.visible').click()

            // ? tipe kontak
            cy.get('#tipe_kontak').should('be.visible').click()
            cy.get('[data-value="karyawan"]').click()

            // ? email
            cy.get('input[name="email.0"]').should('be.visible').type('namasayaemail')

            // ? tombol simpan
            cy.get('.MuiButton-contained').should('be.visible').click()
            cy.get('.MuiButton-contained').should('be.visible').click()

            // ! helper text email
            cy.get('input[name="email.0"]').click().blur()
            cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg').find('p').should('be.visible').contains('Email tidak valid')
        });

        it("Case 11 : Mengisi bagian email tanpa domain", () => {
            cy.visit('https://cashflow.assist.id/admin/contacts/create')
            cy.get('.MuiButton-contained').should('be.visible').click()

            // ? tipe kontak
            cy.get('#tipe_kontak').should('be.visible').click()
            cy.get('[data-value="karyawan"]').click()

            // ? email
            cy.get('input[name="email.0"]').should('be.visible').type('namasayaemail@')

            // ? tombol simpan
            cy.get('.MuiButton-contained').should('be.visible').click()
            cy.get('.MuiButton-contained').should('be.visible').click()

            // ! helper text email
            cy.get('input[name="email.0"]').click().blur()
            cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg').find('p').should('be.visible').contains('Email tidak valid')
        });

        it("Case 12 : Mengisi bagian email dengan spasi di username", () => {
            cy.visit('https://cashflow.assist.id/admin/contacts/create')
            cy.get('.MuiButton-contained').should('be.visible').click()

            // ? tipe kontak
            cy.get('#tipe_kontak').should('be.visible').click()
            cy.get('[data-value="karyawan"]').click()

            // ? email
            cy.get('input[name="email.0"]').should('be.visible').type('   sdfsae      mail@example.com')

            // ? tombol simpan
            cy.get('.MuiButton-contained').should('be.visible').click()
            cy.get('.MuiButton-contained').should('be.visible').click()

            // ! helper text email
            cy.get('input[name="email.0"]').click().blur()
            cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg').find('p').should('be.visible').contains('Email tidak valid')
        });

        it("Case 13 : Mengisi bagian email dengan simbol di username", () => {
            cy.visit('https://cashflow.assist.id/admin/contacts/create')
            cy.get('.MuiButton-contained').should('be.visible').click()

            // ? tipe kontak
            cy.get('#tipe_kontak').should('be.visible').click()
            cy.get('[data-value="karyawan"]').click()

            // ? email
            cy.get('input[name="email.0"]').should('be.visible').type('!@#@$#@#hehdsdjfe@example.com')

            // ? tombol simpan
            cy.get('.MuiButton-contained').should('be.visible').click()
            cy.get('.MuiButton-contained').should('be.visible').click()

            // ! helper text email
            cy.get('input[name="email.0"]').click().blur()
            cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg').find('p').should('be.visible').contains('Email tidak valid')
        });

        it("Case 14 : Mengisi bagian email tanpa username", () => {
            cy.visit('https://cashflow.assist.id/admin/contacts/create')
            cy.get('.MuiButton-contained').should('be.visible').click()

            // ? tipe kontak
            cy.get('#tipe_kontak').should('be.visible').click()
            cy.get('[data-value="karyawan"]').click()

            // ? email
            cy.get('input[name="email.0"]').should('be.visible').type('@example.com')

            // ? tombol simpan
            cy.get('.MuiButton-contained').should('be.visible').click()
            cy.get('.MuiButton-contained').should('be.visible').click()

            // ! helper text email
            cy.get('input[name="email.0"]').click().blur()
            cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg').find('p').should('be.visible').contains('Email tidak valid')
        });

        it("Case 15 : Mengisi bagian email dengan angka sebagai username", () => {
            cy.visit('https://cashflow.assist.id/admin/contacts/create')
            cy.get('.MuiButton-contained').should('be.visible').click()

            // ? tipe kontak
            cy.get('#tipe_kontak').should('be.visible').click()
            cy.get('[data-value="karyawan"]').click()

            // ? email
            cy.get('input[name="email.0"]').should('be.visible').type('123@example.com')

            // ? tombol simpan
            cy.get('.MuiButton-contained').should('be.visible').click()
            cy.get('.MuiButton-contained').should('be.visible').click()

            cy.get('input[name="email.0"]').click().blur()
            // // ! helper text email
            // cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg').should('not.exist')
        });

        it("Case 16 : Mengisi bagian email dengan angka sebagai domain", () => {
            cy.visit('https://cashflow.assist.id/admin/contacts/create')
            cy.get('.MuiButton-contained').should('be.visible').click()

            // ? tipe kontak
            cy.get('#tipe_kontak').should('be.visible').click()
            cy.get('[data-value="karyawan"]').click()

            // ? email
            cy.get('input[name="email.0"]').should('be.visible').type('123@123.com')

            // ? tombol simpan
            cy.get('.MuiButton-contained').should('be.visible').click()
            cy.get('.MuiButton-contained').should('be.visible').click()

            cy.get('input[name="email.0"]').click().blur()
            // // ! helper text email
            // cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg').should('not.be.visible')
        });

        it("Case 17 : Mengisi bagian email dengan simbol di domain", () => {
            cy.visit('https://cashflow.assist.id/admin/contacts/create')
            cy.get('.MuiButton-contained').should('be.visible').click()

            // ? tipe kontak
            cy.get('#tipe_kontak').should('be.visible').click()
            cy.get('[data-value="karyawan"]').click()

            // ? email
            cy.get('input[name="email.0"]').should('be.visible').type('user123@!@@!@#@$#$')

            // ? tombol simpan
            cy.get('.MuiButton-contained').should('be.visible').click()
            cy.get('.MuiButton-contained').should('be.visible').click()

            // ! helper text email
            cy.get('input[name="email.0"]').click().blur()
            cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg').find('p').should('be.visible').contains('Email tidak valid')
        });

        it("Case 18 : Mengisi bagian email dengan spasi di domain", () => {
            cy.visit('https://cashflow.assist.id/admin/contacts/create')
            cy.get('.MuiButton-contained').should('be.visible').click()

            // ? tipe kontak
            cy.get('#tipe_kontak').should('be.visible').click()
            cy.get('[data-value="karyawan"]').click()

            // ? email
            cy.get('input[name="email.0"]').should('be.visible').type('sdfsaemail@exa     mple.com')

            // ? tombol simpan
            cy.get('.MuiButton-contained').should('be.visible').click()
            cy.get('.MuiButton-contained').should('be.visible').click()

            // ! helper text email
            cy.get('input[name="email.0"]').click().blur()
            cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg').find('p').should('be.visible').contains('Email tidak valid')
        });

        it("Case 19 : Menekan tombol tambah email untuk Menambahkan email kemudian tidak mengisi emailnya", () => {
            cy.visit('https://cashflow.assist.id/admin/contacts/create')
            cy.get('.MuiButton-contained').should('be.visible').click()

            // ? tipe kontak
            cy.get('#tipe_kontak').should('be.visible').click()
            cy.get('[data-value="karyawan"]').click()

            // ? tombol tambah email
            cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').should('be.visible').click()

            // ? input email yang kedua
            cy.get('input[name="email.1"]').click().blur()

            // ? tombol simpan
            cy.get('.MuiButton-contained').should('be.visible').contains('Simpan').click()
            cy.get('.MuiButton-contained').should('be.visible').contains('Simpan').click()

            // ! helper text untuk input email yang pertama dan kedua
            cy.get('[data-testid="input-email.0"]').should('be.visible').find('p').contains('Email harus diisi')
            cy.get('[data-testid="input-email.1"]').should('be.visible').find('p').contains('Email harus diisi')
        });

        it("Case 20 : Mencoba menambahkan banyak email kemudian menguji tombol untuk menghapusnya", () => {
            cy.visit('https://cashflow.assist.id/admin/contacts/create')
            cy.get('.MuiButton-contained').should('be.visible').click()

            // ? tipe kontak
            cy.get('#tipe_kontak').should('be.visible').click()
            cy.get('[data-value="karyawan"]').click()

            // ? tombol tambah email pertama
            cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').should('be.visible').click()

            // ? tombol tambah email kedua
            cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').should('be.visible').click()

            // ? tombol tambah email ketiga
            cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').should('be.visible').click()

            // ? tombol tambah email keempat
            cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').should('be.visible').click()

            // ? tombol tambah email kelima
            cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').should('be.visible').click()

            // ? tombol tambah email keenam
            cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').should('be.visible').click()

            // ? tombol tambah email ketujuh
            cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').should('be.visible').click()

            // ? tombol tambah email kedelapan
            cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').should('be.visible').click()

            // ? tombol tambah email kesembilan
            cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').should('be.visible').click()

            // ? tombol tambah email kesepuluh
            cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').should('be.visible').click()

            cy.wait(3000)

            // ? pengisian email
            cy.get('input[name="email.0"]').should('be.visible').type('email0@example.com')
            cy.get('input[name="email.1"]').should('be.visible').type('email1@example.com')
            cy.get('input[name="email.2"]').should('be.visible').type('email2@example.com')
            cy.get('input[name="email.3"]').should('be.visible').type('email3@example.com')
            cy.get('input[name="email.4"]').should('be.visible').type('email4@example.com')
            cy.get('input[name="email.5"]').should('be.visible').type('email5@example.com')
            cy.get('input[name="email.6"]').should('be.visible').type('email6@example.com')
            cy.get('input[name="email.7"]').should('be.visible').type('email7@example.com')
            cy.get('input[name="email.8"]').should('be.visible').type('email8@example.com')
            cy.get('input[name="email.9"]').should('be.visible').type('email9@example.com')
            cy.get('input[name="email.10"]').should('be.visible').type('email10@example.com')

            cy.wait(3000)


            // ? tombol hapus
            cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > :nth-child(2) > .MuiButtonBase-root').should('be.visible').click()
            cy.wait(1000)
            cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > :nth-child(2) > .MuiButtonBase-root').should('be.visible').click()
            cy.wait(1000)
            cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > :nth-child(2) > .MuiButtonBase-root').should('be.visible').click()
            cy.wait(1000)
            cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > :nth-child(2) > .MuiButtonBase-root').should('be.visible').click()
            cy.wait(1000)
            cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > :nth-child(2) > .MuiButtonBase-root').should('be.visible').click()
            cy.wait(1000)
            cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > :nth-child(2) > .MuiButtonBase-root').should('be.visible').click()
            cy.wait(1000)
            cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > :nth-child(2) > .MuiButtonBase-root').should('be.visible').click()
            cy.wait(1000)
            cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > :nth-child(2) > .MuiButtonBase-root').should('be.visible').click()
            cy.wait(1000)
            cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > :nth-child(2) > .MuiButtonBase-root').should('be.visible').click()
            // cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > :nth-child(2) > .MuiButtonBase-root').should('be.visible').click()
            // cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > :nth-child(2) > .MuiButtonBase-root').should('be.visible').click()
            // cy.get('.css-1ov46kg > :nth-child(3) > .MuiButtonBase-root').should('be.visible').click()
            // cy.get('.css-1ov46kg > :nth-child(4) > .MuiButtonBase-root').should('be.visible').click()
            // cy.get('.css-1ov46kg > :nth-child(5) > .MuiButtonBase-root').should('be.visible').click()
            // cy.get('.css-1ov46kg > :nth-child(6) > .MuiButtonBase-root').should('be.visible').click()
            // cy.get('.css-1ov46kg > :nth-child(7) > .MuiButtonBase-root').should('be.visible').click()
            // cy.get('.css-1ov46kg > :nth-child(8) > .MuiButtonBase-root').should('be.visible').click()
            // cy.get('.css-1ov46kg > :nth-child(9) > .MuiButtonBase-root').should('be.visible').click()
            // cy.get('.css-1ov46kg > :nth-child(10) > .MuiButtonBase-root').should('be.visible').click()
            // cy.get('.css-1ov46kg > :nth-child(11) > .MuiButtonBase-root').should('be.visible').click()

            // // ? memeriksa bahwa input email sudah terhapus semuanya dan hanya tersisa 1
            cy.get('input[placeholder="Masukkan alamat email"]').should('have.length', 2)
        });
    });

    context('Menguji form tambah kontak bagian nama perusahaan', () => {
        it("Case 21 : Mencoba input nama perusahaan dengan huruf, angka, simbol, dan emote", () => {
            // todo pergi kehalaman tambah kontak
            cy.visit('https://cashflow.assist.id/admin/contacts/create')

            // ? tipe kontak
            cy.get('#tipe_kontak').should('be.visible').click()
            cy.get('[data-value="karyawan"]').click()

            // ? nama perusahaan
            cy.get('#nama_perusahaan').should('be.visible').type('Perusahaan Pribadi nomor 12 dengan rangking #1 🤣')

            cy.log('input bagian perusahaan dapat menerima berbagai karakter')
        });
    });

    context('Menguji form tambah kontak bagian nomor hp dan telepon', () => {
        it('Case 22 : Mencoba menginput angka saja pada bagian nomor hp dengan 12 digit', () => {
            // todo pergi kehalaman tambah kontak
            cy.visit('https://cashflow.assist.id/admin/contacts/create')

            // ? tipe kontak
            cy.get('#tipe_kontak').should('be.visible').click()
            cy.get('[data-value="karyawan"]').click()

            // ? nomor hp
            cy.get('#no_hp').should('be.visible').type('120937463742')
            cy.get('#no_hp').should('have.value', '120937463742')
        });

        it('Case 23 : Mencoba menginput angka saja pada bagian nomor hp dengan 13 digit', () => {
            // todo pergi kehalaman tambah kontak
            cy.visit('https://cashflow.assist.id/admin/contacts/create')

            // ? tipe kontak
            cy.get('#tipe_kontak').should('be.visible').click()
            cy.get('[data-value="karyawan"]').click()

            // ? nomor hp
            cy.get('#no_hp').should('be.visible').type('1209374637422')
            cy.get('#no_hp').should('have.value', '1209374637422')
        });

        it('Case 24 : Mencoba menginput huruf, simbol dan emote pada kolom nomor hp dan memastikan bahwa kolom hanya menerima angka saja', () => {
            // todo pergi kehalaman tambah kontak
            cy.visit('https://cashflow.assist.id/admin/contacts/create')

            // ? tipe kontak
            cy.get('#tipe_kontak').should('be.visible').click()
            cy.get('[data-value="karyawan"]').click()

            // ? nomor hp
            cy.get('#no_hp').should('be.visible').type('saya menginput menggunakan huruf !@$@#$@ 🗿 dan 12')
            cy.get('#no_hp').should('have.value', '12')
        });

        it('Case 25 : Mencoba menginput angka saja pada bagian nomor telepon dengan 13 digit', () => {
            // todo pergi kehalaman tambah kontak
            cy.visit('https://cashflow.assist.id/admin/contacts/create')

            // ? tipe kontak
            cy.get('#tipe_kontak').should('be.visible').click()
            cy.get('[data-value="karyawan"]').click()

            // ? nomor hp
            cy.get('#no_telp').should('be.visible').type('1209374637421')
            cy.get('#no_telp').should('have.value', '1209374637421')
        });

        it('Case 26 : Mencoba menginput huruf, simbol dan emote pada kolom nomor telepon', () => {
            // todo pergi kehalaman tambah kontak
            cy.visit('https://cashflow.assist.id/admin/contacts/create')

            // ? tipe kontak
            cy.get('#tipe_kontak').should('be.visible').click()
            cy.get('[data-value="karyawan"]').click()

            // ? nomor hp
            cy.get('#no_telp').should('be.visible').type('saya menginput menggunakan huruf !@$@#$@ 🗿 dan 12')
            cy.get('#no_telp').should('have.value', '12')
        });

        it('Case 27 : Memasukkan nomor hp dengan tidak valid (11 digit)', () => {
            // todo pergi kehalaman tambah kontak
            cy.visit('https://cashflow.assist.id/admin/contacts/create')

            // ? tipe kontak
            cy.get('#tipe_kontak').should('be.visible').click()
            cy.get('[data-value="karyawan"]').click()

            // ? nomor hp
            cy.get('#no_hp').should('be.visible').type('01234567890')
            cy.get('#no_hp').should('have.value', '01234567890')
            cy.get('#no_hp').blur()

            // ! helper text bahwa nomor tidak valid
            cy.get('.css-1orv6po').should('be.visible').find('p').contains('Nomor HP tidak valid')
        });

        it('Case 28 : Memasukkan nomor telepon dengan tidak valid (11 digit)', () => {
            // todo pergi kehalaman tambah kontak
            cy.visit('https://cashflow.assist.id/admin/contacts/create')

            // ? tipe kontak
            cy.get('#tipe_kontak').should('be.visible').click()
            cy.get('[data-value="karyawan"]').click()

            // ? nomor hp
            cy.get('#no_telp').should('be.visible').type('01234567890')
            cy.get('#no_telp').should('have.value', '01234567890')
            cy.get('#no_telp').blur()

            // ! helper text bahwa nomor tidak valid
            cy.get('.css-1orv6po').should('be.visible').find('p').contains('Nomor Telepon tidak valid')
        });
    });

    context('Menguji form tambah kontak bagian fax dan npwp', () => {
        it('Case 29 : Memasukkan selain angka pada kolom fax', () => {
            // todo pergi kehalaman tambah kontak
            cy.visit('https://cashflow.assist.id/admin/contacts/create')

            // ? input fax
            cy.get('#no_fax').should('be.visible').type('17 agustus 1945')
            cy.get('#no_fax').should('be.visible').and('have.value', '17 1945')
            cy.get('#no_fax').blur()

            // // ! helper text bahwa nomor fax tidak valid
            // cy.get('[data-testid="input-no_fax"]').should('be.visible').find('p').contains('Hanya boleh angka')
            // cy.log('lebih baik input tidak menerima huruf seperti kolom nomor hp daripada helpertext ')
        });

        it('Case 30 : Memasukkan angka yang terlalu sedikit pada kolom fax', () => {
            // todo pergi kehalaman tambah kontak
            cy.visit('https://cashflow.assist.id/admin/contacts/create')

            // ? input fax
            cy.get('#no_fax').should('be.visible').type('1209382')
            cy.get('#no_fax').should('have.value', '1209382')
            cy.get('#no_fax').blur()

            // ! helper text bahwa nomor fax tidak valid
            cy.get('.css-1orv6po').should('be.visible').find('p').contains('Nomor Fax tidak valid')
        });

        it('Case 31 : Menolak input fax dengan karakter sql injection', () => {
            // todo pergi kehalaman tambah kontak
            cy.visit('https://cashflow.assist.id/admin/contacts/create')

            // ? memastikan keamanan (hanya menebak nama tabel)
            const dangerInput = "'; DROP TABLE contacts;--";

            cy.get('#no_fax').should('be.visible').type(dangerInput)

            // ? tombol simpan
            cy.get('.MuiButton-contained').should('be.visible').contains('Simpan').click()

            // ! helper text bahwa nomor fax tidak valid
            cy.get('.css-1orv6po').should('be.visible').find('p').contains('Nomor Fax tidak valid')
        });

        it('Case 32 : Memasukkan selain angka pada kolom npwp', () => {
            // todo pergi kehalaman tambah kontak
            cy.visit('https://cashflow.assist.id/admin/contacts/create')

            // ? input fax
            cy.get('#no_npwp').should('be.visible').type('17 agustus 1945')
            cy.get('#no_npwp').should('be.visible').and('have.value', '17 1945')
            cy.get('#no_npwp').blur()

            // ! helper text bahwa nomor fax tidak valid
            cy.get('.css-1orv6po').should('be.visible').find('p').contains('Nomor fax tidak valid')
            cy.log('lebih baik input tidak menerima huruf seperti kolom nomor hp daripada helpertext ')
        });

        it('Case 33 : Memasukkan angka yang terlalu sedikit pada kolom npwp', () => {
            // todo pergi kehalaman tambah kontak
            cy.visit('https://cashflow.assist.id/admin/contacts/create')

            // ? input fax
            cy.get('#no_npwp').should('be.visible').type('1209382')
            cy.get('#no_npwp').should('have.value', '1209382')
            cy.get('#no_npwp').blur()

            // ! helper text bahwa nomor fax tidak valid
            cy.get('.css-1orv6po').should('be.visible').find('p').contains('Nomor NPWP tidak valid')
        });
    });

    context('Menguji form tambah kontak bagian NITKU', () => {
        it("Case 34 : Memasukkan angka yang terlalu sedikit", () => {
            // todo pergi kehalaman tambah kontak
            cy.visit('https://cashflow.assist.id/admin/contacts/create')

            cy.get('#nitku').should('be.visible').type('123')
            cy.get('#nitku').blur()

            // ! helper text nitku
            cy.get('.css-1orv6po').should('be.visible').find('p').contains('Nilai NITKU tidak boleh kurang dari 15 digit')
        });

        it("Case 35 : Memasukkan nilai selain angka seperti huruf, simbol dan emote", () => {
            // todo pergi kehalaman tambah kontak
            cy.visit('https://cashflow.assist.id/admin/contacts/create')

            cy.get('#nitku').should('be.visible').type('saya memasukkan huruf loh dan simbol !@@#$$#@$ dan emote batu 🗿🗿🗿')
            cy.get('#nitku').blur()
            cy.get('#nitku').should('be.visible').and('have.value', '')

            cy.log('Nitku tidak menerima huruf dan karakter selain angka')

            // // ! helper text nitku
            // cy.get('.css-1orv6po').should('be.visible').find('p').contains('Nilai NITKU tidak boleh kurang dari 15 digit')
        });

        it("Case 36 : Memasukkan angka yang berlebih pada nitku", () => {
            // todo pergi kehalaman tambah kontak
            cy.visit('https://cashflow.assist.id/admin/contacts/create')

            cy.get('#nitku').should('be.visible').type('2323049291480128734098127349081374987138490712389457')
            cy.get('#nitku').blur()

            // ! helper text nitku
            cy.get('.css-1orv6po').should('be.visible').find('p').contains('Nilai Nitku tidak valid')
        });

        it("Case 37 : Memasukkan spasi diawal dan diakhir kemudian diberikan nilai angka", () => {
            // todo pergi kehalaman tambah kontak
            cy.visit('https://cashflow.assist.id/admin/contacts/create')

            cy.get('#nitku').should('be.visible').type('      121212')
            cy.get('#nitku').blur()
            cy.get('#nitku').should('have.value', '121212')

            // // ! helper text nitku
            // cy.get('.css-1orv6po').should('be.visible').find('p').contains('Nilai Nitku tidak valid')
        });
    });

    context('Menguji form tambah kontak bagian Alamat penagihan', () => {
        it("Case 38 : Memasukkan alamat pengiriman yang terlalu panjang", () => {
            // todo pergi kehalaman tambah kontak
            cy.visit('https://cashflow.assist.id/admin/contacts/create')

            cy.get('input[placeholder="Masukkan alamat penagihan"]').should('be.visible').type('Alamat Rumah ini panjang banget heheheheheheheheheheheheheheheheheheeh 1`23213`1')
            cy.get('input[placeholder="Masukkan alamat penagihan"]').should('have.value', 'Alamat Rumah ini panjang banget heheheheheheheheheheheheheheheheheheeh 1`23213`1')
            cy.get('input[placeholder="Masukkan alamat penagihan"]').blur()
        });

        it("Case 39 : Tidak memasukkan nilai apapun", () => {
            // todo pergi kehalaman tambah kontak
            cy.visit('https://cashflow.assist.id/admin/contacts/create')

            // ? inputan alamat penagihan
            cy.get('input[placeholder="Masukkan alamat penagihan"]').should('be.visible')

            // ? tombol simpan
            cy.get('.MuiButton-contained').should('be.visible').contains('Simpan').click()

            // ! helper text alamat penagihan yang bersifat required
            cy.get('.css-1i24z3d > :nth-child(8)').should('be.visible').find('p').contains('Alamat Penagihan harus diisi')
        });

        it("Case 40 : Memasukkan karakter aneh kedalam inputan alamat penagihan", () => {
            // todo pergi kehalaman tambah kontak
            cy.visit('https://cashflow.assist.id/admin/contacts/create')

            // ? inputan alamat penagihan
            cy.get('input[placeholder="Masukkan alamat penagihan"]').should('be.visible').type('!#@$%$^$!@#$!@%#^$%^@$%#$^%&^%^*&%')
            cy.get('input[placeholder="Masukkan alamat penagihan"]').blur()
            cy.get('input[placeholder="Masukkan alamat penagihan"]').should('have.value', '!#@$%$^$!@#$!@%#^$%^@$%#$^%&^%^*&%')
        });

        // it("Case 41 : Memasukkan spasi berlebih kedalam inputan alamat penagihan", () => {
        //     // todo pergi kehalaman tambah kontak
        //     cy.visit('https://cashflow.assist.id/admin/contacts/create')

        //     // ? inputan alamat penagihan
        //     cy.get('input[placeholder="Masukkan alamat penagihan"]').should('be.visible').type('Ja     lan sudirman')
        //     cy.get('input[placeholder="Masukkan alamat penagihan"]').blur()
        //     cy.get('input[placeholder="Masukkan alamat penagihan"]').should('have.value', 'Jalan sudirman')
        // });

        it("Case 41 : Menambahkan jalan yang menggunakan huruf latin", () => {
            // todo pergi kehalaman tambah kontak
            cy.visit('https://cashflow.assist.id/admin/contacts/create')

            // ? inputan alamat penagihan
            cy.get('input[placeholder="Masukkan alamat penagihan"]').should('be.visible').type('Jl. Nguyễn Văn Linh')
            cy.get('input[placeholder="Masukkan alamat penagihan"]').blur()
            cy.get('input[placeholder="Masukkan alamat penagihan"]').should('have.value', 'Jl. Nguyễn Văn Linh')
        });

        it("Case 42 : Menambahkan nama jalan dengan angka", () => {
            // todo pergi kehalaman tambah kontak
            cy.visit('https://cashflow.assist.id/admin/contacts/create')

            // ? inputan alamat penagihan
            cy.get('input[placeholder="Masukkan alamat penagihan"]').should('be.visible').type('1234234343242')
            cy.get('input[placeholder="Masukkan alamat penagihan"]').blur()
            cy.get('input[placeholder="Masukkan alamat penagihan"]').should('have.value', '1234234343242')
        });
    });

    context("Menguji form tambah kontak bagian alamat pengiriman", () => {
        it("Case 43 : Menekan checkbox agar nilai alamat pengiriman sama dengan alamat penagihan", () => {
            // todo pergi kehalaman tambah kontak
            cy.visit('https://cashflow.assist.id/admin/contacts/create')

            // ? alamat penagihan
            cy.get('input[placeholder="Masukkan alamat penagihan"]').should('be.visible').type('Ini adalah pengujian')
            cy.get('input[placeholder="Masukkan alamat penagihan"]').blur()
            cy.get('input[placeholder="Masukkan alamat penagihan"]').should('have.value', 'Ini adalah pengujian')

            // ? checkbox
            cy.get(':nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should('exist').check()
            cy.get(':nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should('be.checked')


            // ? alamat pengiriman
            cy.get('input[placeholder="Masukkan alamat pengiriman"]').should('be.visible').and('have.value', 'Ini adalah pengujian').and('be.disabled')
        });

        it("Case 44 : Menambahkan jalan yang menggunakan huruf latin", () => {
            // todo pergi kehalaman tambah kontak
            cy.visit('https://cashflow.assist.id/admin/contacts/create')

            // ? inputan alamat penagihan
            cy.get('input[placeholder="Masukkan alamat pengiriman"]').should('be.visible').type('Jl. Nguyễn Văn Linh')
            cy.get('input[placeholder="Masukkan alamat pengiriman"]').blur()
            cy.get('input[placeholder="Masukkan alamat pengiriman"]').should('have.value', 'Jl. Nguyễn Văn Linh')
        });

        // it("Case 46 : Memasukkan spasi berlebih kedalam inputan alamat pengiriman", () => {
        //     // todo pergi kehalaman tambah kontak
        //     cy.visit('https://cashflow.assist.id/admin/contacts/create')

        //     // ? inputan alamat penagihan
        //     cy.get('input[placeholder="Masukkan alamat pengiriman"]').should('be.visible').type('Ja     lan sudirman')
        //     cy.get('input[placeholder="Masukkan alamat pengiriman"]').blur()
        //     cy.get('input[placeholder="Masukkan alamat pengiriman"]').should('have.value', 'Jalan sudirman')
        // });

        it("Case 45 : Menambahkan nama jalan dengan angka", () => {
            // todo pergi kehalaman tambah kontak
            cy.visit('https://cashflow.assist.id/admin/contacts/create')

            // ? inputan alamat penagihan
            cy.get('input[placeholder="Masukkan alamat pengiriman"]').should('be.visible').type('1234234343242')
            cy.get('input[placeholder="Masukkan alamat pengiriman"]').blur()
            cy.get('input[placeholder="Masukkan alamat pengiriman"]').should('have.value', '1234234343242')
        });

        it("Case 46 : Mengisi alamat penagihan dan pengiriman dengan data yang berbeda kemudian menekan checkbox agar memastikan bahwa data alamat pengiriman sama dengan alamat penagihan", () => {
            // todo pergi kehalaman tambah kontak
            cy.visit('https://cashflow.assist.id/admin/contacts/create')

            // ? alamat penagihan
            cy.get('input[placeholder="Masukkan alamat penagihan"]').should('be.visible').type('Ini adalah pengujian')
            cy.get('input[placeholder="Masukkan alamat penagihan"]').blur()
            cy.get('input[placeholder="Masukkan alamat penagihan"]').should('have.value', 'Ini adalah pengujian')

            // ? alamat pengiriman
            cy.get('input[placeholder="Masukkan alamat pengiriman"]').should('be.visible').type('Ini adalah pengujian (Pengiriman)')
            cy.get('input[placeholder="Masukkan alamat pengiriman"]').blur()
            cy.get('input[placeholder="Masukkan alamat pengiriman"]').should('have.value', 'Ini adalah pengujian (Pengiriman)')

            // ? checkbox
            cy.get(':nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should('exist').check()
            cy.get(':nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should('be.checked')

            // ? cek alamat pengiriman
            cy.get('input[placeholder="Masukkan alamat pengiriman"]').should('have.value', 'Ini adalah pengujian').and('be.disabled')
        });
    });

    context('Menguji form tambah kontak bagian informasi bank', () => {
        it("Case 47 : Mengisi nama bank dengan berbagai karakter", () => {
            // todo pergi kehalaman tambah kontak
            cy.visit('https://cashflow.assist.id/admin/contacts/create')

            // ? nama bank
            cy.get('input[name="data_bank[0].bank_name"]').should('be.visible').click().and('have.attr', 'placeholder', 'Masukkan nama bank')
            cy.get('input[name="data_bank[0].bank_name"]').should('be.visible').type('Bank 123 # 👌')
            cy.get('input[name="data_bank[0].bank_name"]').should('have.value', 'Bank 123 # 👌')
        });

        // it("Case 50 : Mengisi nama bank dengan spasi berlebih", () => {
        //     // todo pergi kehalaman tambah kontak
        //     cy.visit('https://cashflow.assist.id/admin/contacts/create')

        //     // ? nama bank
        //     cy.get('input[name="data_bank[0].bank_name"]').should('be.visible').click().and('have.attr', 'placeholder', 'Masukkan nama bank')
        //     cy.get('input[name="data_bank[0].bank_name"]').should('be.visible').type('Bank                   123 # 👌')
        //     cy.get('input[name="data_bank[0].bank_name"]').should('have.value', 'Bank                   123 # 👌')
        // });

        it("Case 48 : Mengisi cabang bank dengan berbagai karakter", () => {
            // todo pergi kehalaman tambah kontak
            cy.visit('https://cashflow.assist.id/admin/contacts/create')

            // ? nama bank
            cy.get('input[name="data_bank[0].bank_branch"]').should('be.visible').type('Cabang yang per 1 #')
            cy.get('input[name="data_bank[0].bank_branch"]').should('have.value', 'Cabang yang per 1 #')
        });

        it("Case 49 : Mengisi cabang bank dengan spasi yang berlebih", () => {
            // todo pergi kehalaman tambah kontak
            cy.visit('https://cashflow.assist.id/admin/contacts/create')

            // ? nama bank
            cy.get('input[name="data_bank[0].bank_branch"]').should('be.visible').type('Cab   ang yang per 1 #')
            cy.get('input[name="data_bank[0].bank_branch"]').should('have.value', 'Cab   ang yang per 1 #')
        });

        it("Case 50 : Mengisi pemegang akun bank dengan berbagai karakter", () => {
            // todo pergi kehalaman tambah kontak
            cy.visit('https://cashflow.assist.id/admin/contacts/create')

            // ? nama bank
            cy.get('input[name="data_bank[0].holder_name"]').should('be.visible').type('Nama saya kare pemegang akun per 12 $')
            cy.get('input[name="data_bank[0].holder_name"]').should('have.value', 'Nama saya kare pemegang akun per 12 $')
        });

        it("Case 51 : Mengisi nomor rekening selain angka", () => {
            // todo pergi kehalaman tambah kontak
            cy.visit('https://cashflow.assist.id/admin/contacts/create')

            // ? nama bank
            cy.get('input[name="data_bank[0].rek_no"]').should('be.visible').type('mengisi dengan angka #@#$#%#')
            cy.get('input[name="data_bank[0].rek_no"]').should('have.value', '')
        });

        it("Case 52 : Mengisi nomor rekening dengan nilai yang terlalu sedikit", () => {
            // todo pergi kehalaman tambah kontak
            cy.visit('https://cashflow.assist.id/admin/contacts/create')

            // ? nama bank
            cy.get('input[name="data_bank[0].rek_no"]').should('be.visible').type('1212')
            cy.get('input[name="data_bank[0].rek_no"]').should('have.value', '1212')

            // ! helper text karena nomor rekening kurang
            cy.get('.css-coltta').should('be.visible').find('p').should('contains', 'Nomor rekening tidak valid')
        });

        it("Case 53 : Mengisi nomor rekening dengan nilai yang terlalu banyak", () => {
            // todo pergi kehalaman tambah kontak
            cy.visit('https://cashflow.assist.id/admin/contacts/create')

            // ? nama bank
            cy.get('input[name="data_bank[0].rek_no"]').should('be.visible').type('34837412364713843824793476147837673461394863242346987236476234')
            cy.get('input[name="data_bank[0].rek_no"]').should('have.value', '34837412364713843824793476147837673461394863242346987236476234')

            // ! helper text karena nomor rekening kurang
            cy.get('.css-coltta').should('be.visible').find('p').should('contains', 'Nomor rekening tidak valid')
        });

        it("Case 54 : Menambahkan bank lain dengan menekan tombol tambah bank kemudian menghapusnya", () => {
            // todo pergi kehalaman tambah kontak
            cy.visit('https://cashflow.assist.id/admin/contacts/create')

            // ? tombol tambah bank
            cy.get(':nth-child(3) > .MuiCardContent-root > .css-1i24z3d > .css-1st318m > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').should('be.visible').contains('Tambah Bank Lainnya').click()

            // ? input bank yang kedua
            cy.get('input[name="data_bank[1].bank_name"]').should('be.visible').click().and('have.attr', 'placeholder', 'Masukkan nama bank').type('bank 2')
            cy.get('input[name="data_bank[1].bank_branch"]').should('be.visible').click().and('have.attr', 'placeholder', 'Masukkan cabang').type('cabang 2')
            cy.get('input[name="data_bank[1].holder_name"]').should('be.visible').click().and('have.attr', 'placeholder', 'Masukkan nama pemegang akun').type('pemegang 2')
            cy.get('input[name="data_bank[1].rek_no"]').should('be.visible').click().and('have.attr', 'placeholder', 'Masukkan nomor rekening').type('2')

            // ? tombol tambah bank
            cy.get(':nth-child(3) > .MuiCardContent-root > .css-1i24z3d > .css-1st318m > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').should('be.visible').contains('Tambah Bank Lainnya').click()

            // ? input bank yang ketiga
            cy.get('input[name="data_bank[2].bank_name"]').should('be.visible').click().and('have.attr', 'placeholder', 'Masukkan nama bank').type('bank 3')
            cy.get('input[name="data_bank[2].bank_branch"]').should('be.visible').click().and('have.attr', 'placeholder', 'Masukkan cabang').type('cabang 3')
            cy.get('input[name="data_bank[2].holder_name"]').should('be.visible').click().and('have.attr', 'placeholder', 'Masukkan nama pemegang akun').type('pemegang 3')
            cy.get('input[name="data_bank[2].rek_no"]').should('be.visible').click().and('have.attr', 'placeholder', 'Masukkan nomor rekening').type('3')

            // ? tombol hapus untuk menghapus form bank ke dua
            cy.get(':nth-child(3) > .MuiCardContent-root > .css-1i24z3d > .css-1st318m > .MuiGrid2-grid-md-8 > .css-1ov46kg > :nth-child(2) > .MuiButtonBase-root').should('be.visible').contains('Hapus').click()

            // ? memastikan form bank kedua sudah tidak ada
            cy.get('input[name="data_bank[2].bank_name"]').should('not.be.exist')
            cy.get('input[name="data_bank[2].bank_branch"]').should('not.be.exist')
            cy.get('input[name="data_bank[2].holder_name"]').should('not.be.exist')
            cy.get('input[name="data_bank[2].rek_no"]').should('not.be.exist')

            // ? tombol hapus untuk menghapus form bank ke ketiga
            cy.get(':nth-child(3) > .MuiCardContent-root > .css-1i24z3d > .css-1st318m > .MuiGrid2-grid-md-8 > .css-1ov46kg > :nth-child(2) > .MuiButtonBase-root').should('be.visible').contains('Hapus').click()

            // ? memastikan form bank kedua sudah tidak ada
            cy.get('input[name="data_bank[1].bank_name"]').should('not.be.exist')
            cy.get('input[name="data_bank[1].bank_branch"]').should('not.be.exist')
            cy.get('input[name="data_bank[1].holder_name"]').should('not.be.exist')
            cy.get('input[name="data_bank[1].rek_no"]').should('not.be.exist')

        });
    });

    context("Menguji form tambah kontak bagian Informasi pemetaan akun", () => {
        it("Case 55 : Mengisi selain angka pada Piutang maksimum", () => {
            // todo pergi kehalaman tambah kontak
            cy.visit('https://cashflow.assist.id/admin/contacts/create')

            // ? piutang maksmimum
            cy.get('#piutang_max').should('be.visible').type('angka lima puluh ratus')
            cy.get('#piutang_max').should('have.value', '')
        });

        it("Case 56 : Memilih opsi yang ada pada Pilih akun piutang", () => {
            // todo pergi kehalaman tambah kontak
            cy.visit('https://cashflow.assist.id/admin/contacts/create')

            // ? pilih akun piutang opsi pertama
            cy.get('[data-testid="input-fk_akun_piutang"] > .MuiInputBase-root').should('be.visible').click()
            cy.get('#fk_akun_piutang-listbox').should('be.visible').find('li').first().click()
            // cy.get('#fk_akun_piutang').should('have.value', '1-12000 - Piutang Usaha')

            cy.get('[data-testid="input-fk_akun_piutang"] > .MuiInputBase-root').should('be.visible').clear()
            cy.wait(4000)

            // ? pilih akun piutang opsi terakhir
            // cy.get('[data-testid="input-fk_akun_piutang"] > .MuiInputBase-root').should('be.visible').click()
            cy.get('#fk_akun_piutang-listbox').should('be.visible').find('li').last().click()
            // cy.get('#fk_akun_piutang').should('have.value', '1-12004 - Unbilled Accounts Receivable')
        });

        it("Case 57 : Memilih opsi yang ada pada syarat pembayaran utama", () => {
            // todo pergi kehalaman tambah kontak
            cy.visit('https://cashflow.assist.id/admin/contacts/create')

            // ? syarat pembayaran utama
            cy.get('#syarat_pembayaran').should('be.visible').click()
            cy.contains('termin sebulan 15').should('be.visible').click()
        });
    });

    it("Case 58 : Menambahkan kontak dengan mengisi data yang diwajibkan saja pada tipe kontak Karyawan", () => {
        // todo pergi kehalaman tambah kontak
        cy.visit('https://cashflow.assist.id/admin/contacts/create')

        // ? data-data required dengan tipe kontak karyawan

        // todo tipe kontak
        cy.get('#tipe_kontak').should('be.visible').click()
        cy.get('[data-value="karyawan"]').should('be.visible').click()
        cy.get('#tipe_kontak').should('have.text', 'Karyawan')

        // todo grup kontak
        cy.get('#fk_grup').should('be.visible').click()
        cy.get('[data-value]').should('be.visible').eq(2).click()
        cy.get('[data-value]').should('be.visible').last().click()
        cy.get('.css-1j4fk1t').should('be.visible').click()
        cy.get('.MuiIconButton-colorError').click()

        // todo nama lengkap
        cy.get('#nama').should('be.visible').type('Data Karyawan Baru')
        cy.get('#nama').should('have.value', 'Data Karyawan Baru')

        // todo email
        cy.get('input[name="email.0"]').should('be.visible').type('karyawan@example.com')
        cy.get('input[name="email.0"]').should('have.value', 'karyawan@example.com')
        cy.get('input[name="email.0"]').focus().blur()

        // todo tombol simpan
        cy.get('.MuiButton-contained').should('be.visible').contains('Simpan').click()

        // ! helper text bahwa form sudah terkirim
        cy.get('.MuiSnackbar-root > .MuiPaper-root').should('exist').contains('Kontak berhasil disimpan')
    });

    it("Case 59 : Menambahkan kontak dengan mengisi data yang diwajibkan saja pada tipe kontak Lainnya", () => {
        // todo pergi kehalaman tambah kontak
        cy.visit('https://cashflow.assist.id/admin/contacts/create')

        // ? data-data required dengan tipe kontak lainnya

        // todo tipe kontak
        cy.get('#tipe_kontak').should('be.visible').click()
        cy.get('[data-value="lainnya"]').should('be.visible').click()
        cy.get('#tipe_kontak').should('have.text', 'Lainnya')

        // todo grup kontak
        cy.get('#fk_grup').should('be.visible').click()
        cy.get('[data-value]').should('be.visible').eq(2).click()
        cy.get('[data-value]').should('be.visible').last().click()
        cy.get('.css-1j4fk1t').should('be.visible').click()
        cy.get('.MuiIconButton-colorError').click()

        // todo nama lengkap
        cy.get('#nama').should('be.visible').type('Data Lainnya Baru')
        cy.get('#nama').should('have.value', 'Data Lainnya Baru')

        // todo email
        cy.get('input[name="email.0"]').should('be.visible').type('lainnya@example.com')
        cy.get('input[name="email.0"]').should('have.value', 'lainnya@example.com')
        cy.get('input[name="email.0"]').focus().blur()

        // todo tombol simpan
        cy.get('.MuiButton-contained').should('be.visible').contains('Simpan').click()

        // ! helper text bahwa form sudah terkirim
        cy.get('.MuiSnackbar-root > .MuiPaper-root').should('exist').contains('Kontak berhasil disimpan')
    });

    it("Case 60 : Menambahkan kontak dengan mengisi data seluruh data dengan tipe kontak karyawan", () => {
        // todo pergi kehalaman tambah kontak
        cy.visit('https://cashflow.assist.id/admin/contacts/create')

        // ? data-data required dengan tipe kontak karyawan

        // todo tipe kontak
        cy.get('#tipe_kontak').should('be.visible').click()
        cy.get('[data-value="karyawan"]').should('be.visible').click()
        cy.get('#tipe_kontak').should('have.text', 'Karyawan')

        // todo grup kontak
        cy.get('#fk_grup').should('be.visible').click()
        cy.get('ul').should('exist').eq(1).then(($list) => {
            cy.wait(2000)
            cy.wrap($list).find('li').eq(2).click()
            cy.wrap($list).find('li').last().click()
        })

        // todo nama lengkap
        cy.get('#nama').should('be.visible').type('Data Karyawan Baru')
        cy.get('#nama').should('have.value', 'Data Karyawan Baru')

        // todo sapaan
        cy.get('#sapaan').should('be.visible').click()
        cy.get('[data-value]').should('be.visible').eq(1).click()

        // todo tipe identitas
        cy.get('#tipe_identitas').should('be.visible').click()
        cy.get('[data-value]').should('be.visible').eq(1).click()

        // todo nomor identitas
        cy.get('#no_identitas').should('be.visible').type('0101010101010101')

        // todo email
        cy.get('input[name="email.0"]').should('be.visible').type('karyawan@example.com')
        cy.get('input[name="email.0"]').should('have.value', 'karyawan@example.com')
        cy.get('input[name="email.0"]').focus().blur()

        // todo nama perusahaan
        cy.get('#nama_perusahaan').should('be.visible').type('Perusahaan khusus example')
        cy.get('#nama_perusahaan').should('have.value', 'Perusahaan khusus example')

        // todo nomor hp
        cy.get('#no_hp').should('be.visible').type('089129423494')
        // cy.get('#no_hp').should('have.value', '08912942349412')

        // todo nomor telpon
        cy.get('#no_telp').should('be.visible').type('1234567890')
        // cy.get('#no_telp').should('have.value', '123456789012')

        // todo nomor fax
        cy.get('#no_fax').should('be.visible').type('1234567890987654321')
        cy.get('#no_fax').should('have.value', '1234567890987654321')

        // todo nomor npwp
        cy.get('#no_npwp').should('be.visible').type('987654321')
        cy.get('#no_npwp').should('have.value', '987654321')

        // todo nomor nitku
        cy.get('#nitku').should('be.visible').type('1234567890')
        cy.get('#nitku').should('have.value', '1234567890')

        // todo alamat penagihan
        cy.get('input[placeholder="Masukkan alamat penagihan"]').should('be.visible').type('Jalan Pekanbaru No. 1')
        cy.get('input[placeholder="Masukkan alamat penagihan"]').should('have.value', 'Jalan Pekanbaru No. 1')


        // todo alamat pengiriman (disamakan dengan alamat penagihan)
        cy.get('input[placeholder="Masukkan alamat pengiriman"]').should('be.visible').click()
        cy.get(':nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should('exist').check()
        cy.get(':nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should('be.checked')
        cy.get('input[placeholder="Masukkan alamat pengiriman"]').should('have.value', 'Jalan Pekanbaru No. 1').and('be.disabled')

        // todo informasi bank
        cy.get('input[name="data_bank[0].bank_name"]').should('be.visible').type('Bank Selalu Berkah')
        cy.get('input[name="data_bank[0].bank_name"]').should('have.value', 'Bank Selalu Berkah')
        cy.get('input[name="data_bank[0].bank_branch"]').should('be.visible').type('Cabang indonesia')
        cy.get('input[name="data_bank[0].bank_branch"]').should('have.value', 'Cabang indonesia')
        cy.get('input[name="data_bank[0].holder_name"]').should('be.visible').type('1')
        cy.get('input[name="data_bank[0].holder_name"]').should('have.value', '1')
        cy.get('input[name="data_bank[0].rek_no"]').should('be.visible').type('129833948249')
        cy.get('input[name="data_bank[0].rek_no"]').should('have.value', '129833948249')

        // todo akun piutang
        cy.get('[data-testid="input-fk_akun_piutang"] > .MuiInputBase-root').should('be.visible').click()
        cy.get('#fk_akun_piutang-listbox').should('be.visible').find('li').first().click()
        // cy.get('#fk_akun_piutang').should('have.value', '1-12000 - Piutang Usaha')
        cy.get('#fk_akun_piutang').blur()

        // todo piutang maksimum
        cy.get('#piutang_max').should('be.visible').type('100000')
        cy.get('#piutang_max').should('have.value', 'Rp 100.000')

        // todo syarat pembayaran
        cy.get('#syarat_pembayaran').should('be.visible').click()
        cy.contains('li', 'termin sebulan 15').should('be.visible').click()


        // todo tombol simpan
        cy.get('.MuiButton-contained').should('be.visible').contains('Simpan').click()

        // ! helper text bahwa form sudah terkirim
        cy.get('.MuiSnackbar-root > .MuiPaper-root').should('exist').contains('Kontak berhasil disimpan')
    });

    it("Case 61 : Menambahkan kontak dengan mengisi data seluruh data dengan tipe kontak lainnya", () => {
        // todo pergi kehalaman tambah kontak
        cy.visit('https://cashflow.assist.id/admin/contacts/create')

        // ? data-data required dengan tipe kontak lainnya

        // todo tipe kontak
        cy.get('#tipe_kontak').should('be.visible').click()
        cy.get('[data-value="lainnya"]').should('be.visible').click()
        cy.get('#tipe_kontak').should('have.text', 'Lainnya')

        // todo grup kontak
        cy.get('#fk_grup').should('be.visible').click()
        cy.get('ul').should('exist').eq(1).then(($list) => {
            cy.wait(2000)
            cy.wrap($list).find('li').eq(2).click()
            cy.wrap($list).find('li').last().click()
        })

        // todo nama lengkap
        cy.get('#nama').should('be.visible').type('Data Lainnya Baru')
        cy.get('#nama').should('have.value', 'Data Lainnya Baru')

        // todo sapaan
        cy.get('#sapaan').should('be.visible').click()
        cy.get('[data-value]').should('be.visible').eq(1).click()

        // todo tipe identitas
        cy.get('#tipe_identitas').should('be.visible').click()
        cy.get('[data-value]').should('be.visible').eq(1).click()

        // todo nomor identitas
        cy.get('#no_identitas').should('be.visible').type('0101010101010101')

        // todo email
        cy.get('input[name="email.0"]').should('be.visible').type('lainnya@example.com')
        cy.get('input[name="email.0"]').should('have.value', 'lainnya@example.com')
        cy.get('input[name="email.0"]').focus().blur()

        // todo nama perusahaan
        cy.get('#nama_perusahaan').should('be.visible').type('Perusahaan khusus example')
        cy.get('#nama_perusahaan').should('have.value', 'Perusahaan khusus example')

        // todo nomor hp
        cy.get('#no_hp').should('be.visible').type('089129423494')
        // cy.get('#no_hp').should('have.value', '08912942349412')

        // todo nomor telpon
        cy.get('#no_telp').should('be.visible').type('1234567890')
        // cy.get('#no_telp').should('have.value', '123456789012')

        // todo nomor fax
        cy.get('#no_fax').should('be.visible').type('1234567890987654321')
        cy.get('#no_fax').should('have.value', '1234567890987654321')

        // todo nomor npwp
        cy.get('#no_npwp').should('be.visible').type('987654321')
        cy.get('#no_npwp').should('have.value', '987654321')

        // todo nomor nitku
        cy.get('#nitku').should('be.visible').type('1234567890')
        cy.get('#nitku').should('have.value', '1234567890')

        // todo alamat penagihan
        cy.get('input[placeholder="Masukkan alamat penagihan"]').should('be.visible').type('Jalan Pekanbaru No. 1')
        cy.get('input[placeholder="Masukkan alamat penagihan"]').should('have.value', 'Jalan Pekanbaru No. 1')


        // todo alamat pengiriman (disamakan dengan alamat penagihan)
        cy.get('input[placeholder="Masukkan alamat pengiriman"]').should('be.visible').click()
        cy.get(':nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should('exist').check()
        cy.get(':nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should('be.checked')
        cy.get('input[placeholder="Masukkan alamat pengiriman"]').should('have.value', 'Jalan Pekanbaru No. 1').and('be.disabled')

        // todo informasi bank
        cy.get('input[name="data_bank[0].bank_name"]').should('be.visible').type('Bank Selalu Berkah')
        cy.get('input[name="data_bank[0].bank_name"]').should('have.value', 'Bank Selalu Berkah')
        cy.get('input[name="data_bank[0].bank_branch"]').should('be.visible').type('Cabang indonesia')
        cy.get('input[name="data_bank[0].bank_branch"]').should('have.value', 'Cabang indonesia')
        cy.get('input[name="data_bank[0].holder_name"]').should('be.visible').type('1')
        cy.get('input[name="data_bank[0].holder_name"]').should('have.value', '1')
        cy.get('input[name="data_bank[0].rek_no"]').should('be.visible').type('129833948249')
        cy.get('input[name="data_bank[0].rek_no"]').should('have.value', '129833948249')

        // todo akun piutang
        cy.get('[data-testid="input-fk_akun_piutang"] > .MuiInputBase-root').should('be.visible').click()
        cy.get('#fk_akun_piutang-listbox').should('be.visible').find('li').first().click()
        // cy.get('#fk_akun_piutang').should('have.value', '1-12001 - Piutang Usaha Dagang')

        // todo piutang maksimum
        cy.get('#piutang_max').should('be.visible').type('100000')
        cy.get('#piutang_max').should('have.value', 'Rp 100.000')

        // todo syarat pembayaran
        cy.get('#syarat_pembayaran').should('be.visible').click()
        cy.contains('li', 'termin sebulan 15').should('be.visible').click()


        // todo tombol simpan
        cy.get('.MuiButton-contained').should('be.visible').contains('Simpan').click()

        // ! helper text bahwa form sudah terkirim
        cy.get('.MuiSnackbar-root > .MuiPaper-root').should('exist').contains('Kontak berhasil disimpan')
    });

    it("Case 62 : Menguji dark mode ketika dihalaman tambah kontak", () => {
        cy.visit('https://cashflow.assist.id/admin/contacts/create')

        // ? tombol dark mode
        cy.get('[data-testid="appbar-stack"] > .MuiFormControlLabel-root').should('be.visible').click()

        cy.get('body').should('be.visible').and('not.have.css', 'background-color', 'rgb(255, 255, 255)')
    })
});