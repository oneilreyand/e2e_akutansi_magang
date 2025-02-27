describe('Menguji halaman edit kontak pada cashflow assist id', () => {
    const email = 'damaresya947@gmail.com';
    const password = '12345678';

    beforeEach(() => {
        cy.loginWithApi(email, password);
    });

    it("Case 1 : Pergi ke halaman edit kontak dari halaman detail kontak dengan salah satu data yang sudah dipilih dari tabel karyawan", () => {
        cy.visit('https://cashflow.assist.id/admin/contacts')

        // todo pergi ke bagian karyawan
        cy.get('#simple-tab-2').should('be.visible').contains('Karyawan').click();

        // todo pergi kehalaman detail kontak dengan menggunakan salah satu data di tabel karyawan
        //cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2) > .MuiButtonBase-root').should('be.visible').click()

        cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2) > .MuiButtonBase-root').should('be.visible').click()

        // ? tombol ke halaman edit kontak
        cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').contains('Ubah Profil Kontak').click();

        // todo memastikan bahwa halaman sudah dikunjungi
        cy.url().should('include', 'edit')

    });

    it("Case 2 : Memeriksa UI dihalaman edit kontak", () => {
        cy.visit('https://cashflow.assist.id/admin/contacts')

        // todo pergi ke bagian karyawan
        cy.get('#simple-tab-2').should('be.visible').contains('Karyawan').click();

        // todo pergi kehalaman detail kontak dengan menggunakan salah satu data di tabel karyawan
        cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2) > .MuiButtonBase-root').should('be.visible').click()

        // ? tombol ke halaman edit kontak
        cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').contains('Ubah Profil Kontak').click();

        // todo memastikan bahwa halaman sudah dikunjungi
        cy.url().should('include', 'edit')

        // * icon
        cy.get('[data-testid="appbar-logo"]').should('be.visible')

        // * judul
        cy.get('.MuiTypography-h5 > span').should("be.visible").contains("Ubah Kontak")

        // * navbar content
        cy.get('.MuiBreadcrumbs-ol').should("be.visible").and(($navTrail) => {
            expect($navTrail).to.contain("Beranda")
            expect($navTrail).to.contain("Kontak")
            expect($navTrail).to.contain("Detail Kontak")
            expect($navTrail).to.contain("Ubah Kontak")
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
        cy.get('.MuiButton-contained').should('be.visible')

        // ? tombol batal
        cy.get('.css-16ogmd7 > .MuiButton-text').should('be.visible').contains('Batal').click()
        cy.url().should('eq', 'https://cashflow.assist.id/admin/contacts')
    });

    it('Case 3 : Dari halaman edit kontak kemudian menekan navbar content yang akan mengarah ke halaman Detail kontak', () => {
        cy.visit('https://cashflow.assist.id/admin/contacts')

        // todo pergi ke bagian karyawan
        cy.get('#simple-tab-2').should('be.visible').contains('Karyawan').click();

        // todo pergi kehalaman detail kontak dengan menggunakan salah satu data di tabel karyawan
        cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2) > .MuiButtonBase-root').should('be.visible').click()

        // ? tombol ke halaman edit kontak
        cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').contains('Ubah Profil Kontak').click();

        // todo memastikan bahwa halaman sudah dikunjungi
        cy.url().should('include', 'edit')

        // ? navbar ke halaman detail kontak
        cy.get(':nth-child(5) > .MuiTypography-root > span').should('be.visible').contains('Detail Kontak').click()

        // todo memastikan bahwa sudah kembali ke halaman detail kontak
        cy.url().should('not.include', 'edit')
    });

    it("Case 4 : dari halaman edit kontak kemudian menekan navbar content yang akan mengarah ke halaman kontak", () => {
        cy.visit('https://cashflow.assist.id/admin/contacts')

        // todo pergi ke bagian karyawan
        cy.get('#simple-tab-2').should('be.visible').contains('Karyawan').click();

        // todo pergi kehalaman detail kontak dengan menggunakan salah satu data di tabel karyawan
        cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2) > .MuiButtonBase-root').should('be.visible').click()

        // ? tombol ke halaman edit kontak
        cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').contains('Ubah Profil Kontak').click();

        // todo memastikan bahwa halaman sudah dikunjungi
        cy.url().should('include', 'edit')

        // ? navbar kontak
        cy.get(':nth-child(3) > .MuiTypography-root > span').should('be.visible').contains('Kontak').click()

        // todo memastikan bahwa sudah berada dihalaman kontak
        cy.url().should('eq', 'https://cashflow.assist.id/admin/contacts')
    });

    it("Case 5 : dari halaman edit kontak kemudian menekan navbar content yang akan mengarah ke halaman beranda", () => {
        cy.visit('https://cashflow.assist.id/admin/contacts')

        // todo pergi ke bagian karyawan
        cy.get('#simple-tab-2').should('be.visible').contains('Karyawan').click();

        // todo pergi kehalaman detail kontak dengan menggunakan salah satu data di tabel karyawan
        cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2) > .MuiButtonBase-root').should('be.visible').click()

        // ? tombol ke halaman edit kontak
        cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').contains('Ubah Profil Kontak').click();

        // todo memastikan bahwa halaman sudah dikunjungi
        cy.url().should('include', 'edit')

        // ? navbar kontak
        cy.get('.MuiBreadcrumbs-ol > :nth-child(1) > .MuiTypography-root').should('be.visible').contains('Beranda').click()

        // todo memastikan bahwa sudah berada dihalaman kontak
        cy.url().should('eq', 'https://cashflow.assist.id/admin/dashboard')
    });

    context("Mengubah data yang pada kontak yang ada ditable halaman kontak", () => {
        it("Case 6 : Mengubah tipe kontak yang awalnya karyawan menjadi pelanggan", () => {
            cy.visit('https://cashflow.assist.id/admin/contacts')

            // todo pergi ke bagian karyawan
            cy.get('#simple-tab-2').should('be.visible').contains('Karyawan').click();

            // todo pergi kehalaman detail kontak dengan menggunakan salah satu data di tabel karyawan
            cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2) > .MuiButtonBase-root').should('be.visible').click()

            // ? tombol ke halaman edit kontak
            cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').contains('Ubah Profil Kontak').click();

            // todo memastikan bahwa halaman sudah dikunjungi
            cy.url().should('include', 'edit')

            // todo tipe kontak sebelumnya
            cy.get('#tipe_kontak').should('be.visible').should('have.text', 'Karyawan')

            // todo mengubah tipe kontak menjadi pelanggan
            cy.get('#tipe_kontak').should('be.visible').click()
            cy.get('[data-value="pelanggan"]').should('exist').click()
            cy.get('#tipe_kontak').should('be.visible').should('have.text', 'Pelanggan')

            // todo mengisi data yang required jika diubah dari tipe kontak karyawan menjadi tipe kontak pelanggan jika data yang dipilih dari table karyawan kosong
            cy.get('input[placeholder="Masukkan alamat penagihan"]').should('be.visible').clear().type('ini adalah alamat penagihan yang baru')
            cy.get('input[placeholder="Masukkan alamat penagihan"]').blur()

            // todo mengubah nomor identitas jika lebih dari 16 digit
            cy.get('#tipe_identitas').should('be.visible').click()
            cy.get('[data-value]').should('be.visible').eq(1).click()
            cy.get('#no_identitas').should('be.visible').clear().type('1212121212121212')
            cy.get('#no_identitas').blur()

            // ? tombol simpan
            cy.get('.MuiButton-contained').should('be.visible').contains('Simpan').click()

            // ! pop up bahwa data berhasil diubah
            cy.get('.MuiSnackbar-root > .MuiPaper-root').should('exist').contains('Kontak berhasil disimpan')
        });

        it("Case 7 : Mengubah tipe kontak yang awalnya karyawan menjadi Suplier", () => {
            cy.visit('https://cashflow.assist.id/admin/contacts')

            // todo pergi ke bagian karyawan
            cy.get('#simple-tab-2').should('be.visible').contains('Karyawan').click();

            // todo pergi kehalaman detail kontak dengan menggunakan salah satu data di tabel karyawan
            cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2) > .MuiButtonBase-root').should('be.visible').click()

            // ? tombol ke halaman edit kontak
            cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').contains('Ubah Profil Kontak').click();

            // todo memastikan bahwa halaman sudah dikunjungi
            cy.url().should('include', 'edit')

            // todo tipe kontak sebelumnya
            cy.get('#tipe_kontak').should('be.visible').should('have.text', 'Karyawan')

            // todo mengubah tipe kontak menjadi suplier
            cy.get('#tipe_kontak').should('be.visible').click()
            cy.get('[data-value="suplier"]').should('exist').click()
            cy.get('#tipe_kontak').should('be.visible').should('have.text', 'Suplier')

            // todo mengisi data yang required jika diubah dari tipe kontak karyawan menjadi tipe kontak karyawan jika data yang dipilih dari table karyawan kosong
            // ? informasi bank
            cy.get('input[name="data_bank[0].bank_name"]').should('be.visible').clear().type('BCA')
            cy.get('input[name="data_bank[0].bank_branch"]').should('be.visible').clear().type('1')
            cy.get('input[name="data_bank[0].holder_name"]').should('be.visible').clear().type('upi')
            cy.get('input[name="data_bank[0].rek_no"]').should('be.visible').clear().type('0192834743')

            // ? alamat penagihan
            cy.get('input[placeholder="Masukkan alamat penagihan"]').should('be.visible').clear().type('alamat penagihan')

            // ? bagian checkbox dan alamat pengiriman
            cy.get(':nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click()
            cy.get(':nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click()
            cy.get(':nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click()
            cy.get(':nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click()
            cy.get(':nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click()


            // // ? alamat pengiriman
            // cy.get(':nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should('exist').then(($btn) => {
            //     if ($btn.is(':visible') && !$btn.is(':disabled')) {
            //         cy.wrap($btn).click()
            //         cy.log('tombol sudah ditekan')
            //         cy.get('input[placeholder="Masukkan alamat pengiriman"]').clear({ force: true }).type('ini adalah alamat pengiriman yang baru')
            //     } else {
            //         cy.log('tombol tidak dapat ditekan')
            //     }
            // });

            // todo mengubah nomor identitas jika lebih dari 16 digit
            cy.get('#tipe_identitas').should('be.visible').click()
            cy.get('[data-value]').should('be.visible').eq(1).click()
            cy.get('#no_identitas').should('be.visible').clear().type('1212121212121212')
            cy.get('#no_identitas').blur()

            // ? tombol simpan
            cy.get('.MuiButton-contained').should('be.visible').contains('Simpan').click()

            // ! pop up bahwa data berhasil diubah
            cy.get('.MuiSnackbar-root > .MuiPaper-root').should('exist').contains('Kontak berhasil disimpan')
        });

        it("Case 8 : Mengubah tipe kontak yang awalnya karyawan menjadi lainnya", () => {
            cy.visit('https://cashflow.assist.id/admin/contacts')

            // todo pergi ke bagian karyawan
            cy.get('#simple-tab-2').should('be.visible').contains('Karyawan').click();

            // todo pergi kehalaman detail kontak dengan menggunakan salah satu data di tabel karyawan
            cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2) > .MuiButtonBase-root').should('be.visible').click()

            // ? tombol ke halaman edit kontak
            cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').contains('Ubah Profil Kontak').click();

            // todo memastikan bahwa halaman sudah dikunjungi
            cy.url().should('include', 'edit')

            // todo tipe kontak sebelumnya
            cy.get('#tipe_kontak').should('be.visible').should('have.text', 'Karyawan')

            // todo mengubah tipe kontak menjadi lainnya
            cy.get('#tipe_kontak').should('be.visible').click()
            cy.get('[data-value="lainnya"]').should('exist').click()
            cy.get('#tipe_kontak').should('be.visible').should('have.text', 'Lainnya')

            // todo mengubah nomor identitas jika lebih dari 16 digit
            cy.get('#tipe_identitas').should('be.visible').click()
            cy.get('[data-value]').should('be.visible').eq(1).click()
            cy.get('#no_identitas').should('be.visible').clear().type('1212121212121212')
            cy.get('#no_identitas').blur()

            // ? tombol simpan
            cy.get('.MuiButton-contained').should('be.visible').contains('Simpan').click()

            // ! pop up bahwa data berhasil diubah
            cy.get('.MuiSnackbar-root > .MuiPaper-root').should('exist').contains('Kontak berhasil disimpan')
        });

        it("Case 9 : Mengubah tipe kontak yang awalnya lainnya menjadi pelanggan", () => {
            cy.visit('https://cashflow.assist.id/admin/contacts')

            // todo pergi ke bagian Lainnya
            cy.get('#simple-tab-3').should('be.visible').contains('Lainnya').click();

            // todo pergi kehalaman detail kontak dengan menggunakan salah satu data di tabel Lainnya
            cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2) > .MuiButtonBase-root').should('be.visible').click()

            // ? tombol ke halaman edit kontak
            cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').contains('Ubah Profil Kontak').click();

            // todo memastikan bahwa halaman sudah dikunjungi
            cy.url().should('include', 'edit')

            // todo tipe kontak sebelumnya
            cy.get('#tipe_kontak').should('be.visible').should('have.text', 'Lainnya')

            // todo mengubah tipe kontak menjadi pelanggan
            cy.get('#tipe_kontak').should('be.visible').click()
            cy.get('[data-value="pelanggan"]').should('exist').click()
            cy.get('#tipe_kontak').should('be.visible').should('have.text', 'Pelanggan')

            // todo mengisi data yang required jika diubah dari tipe kontak karyawan menjadi tipe kontak pelanggan jika data yang dipilih dari table karyawan kosong
            cy.get('input[placeholder="Masukkan alamat penagihan"]').should('be.visible').clear().type('ini adalah alamat penagihan yang baru')
            cy.get('input[placeholder="Masukkan alamat penagihan"]').blur()

            // todo mengubah nomor identitas jika lebih dari 16 digit
            cy.get('#tipe_identitas').should('be.visible').click()
            cy.get('[data-value]').should('be.visible').eq(1).click()
            cy.get('#no_identitas').should('be.visible').clear().type('1212121212121212')
            cy.get('#no_identitas').blur()

            // ? tombol simpan
            cy.get('.MuiButton-contained').should('be.visible').contains('Simpan').click()

            // ! pop up bahwa data berhasil diubah
            cy.get('.MuiSnackbar-root > .MuiPaper-root').should('exist').contains('Kontak berhasil disimpan')
        });

        it("Case 10 : Mengubah tipe kontak yang awalnya lainnya menjadi Suplier", () => {
            cy.visit('https://cashflow.assist.id/admin/contacts')

            // todo pergi ke bagian lainnya
            cy.get('#simple-tab-3').should('be.visible').contains('Lainnya').click();

            // todo pergi kehalaman detail kontak dengan menggunakan salah satu data di tabel lainnya
            cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2) > .MuiButtonBase-root').should('be.visible').click()

            // ? tombol ke halaman edit kontak
            cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').contains('Ubah Profil Kontak').click();

            // todo memastikan bahwa halaman sudah dikunjungi
            cy.url().should('include', 'edit')

            // todo tipe kontak sebelumnya
            cy.get('#tipe_kontak').should('be.visible').should('have.text', 'Lainnya')

            // todo mengubah tipe kontak menjadi Suplier
            cy.get('#tipe_kontak').should('be.visible').click()
            cy.get('[data-value="suplier"]').should('exist').click()
            cy.get('#tipe_kontak').should('be.visible').should('have.text', 'Suplier')

            // todo mengisi data yang required jika diubah dari tipe kontak karyawan menjadi tipe kontak suplier jika data yang dipilih dari table karyawan kosong
            // ? informasi bank
            cy.get('input[name="data_bank[0].bank_name"]').should('be.visible').clear().type('BCA')
            cy.get('input[name="data_bank[0].bank_branch"]').should('be.visible').clear().type('1')
            cy.get('input[name="data_bank[0].holder_name"]').should('be.visible').clear().type('upi')
            cy.get('input[name="data_bank[0].rek_no"]').should('be.visible').clear().type('0192834743')

            // ? alamat penagihan
            cy.get('input[placeholder="Masukkan alamat penagihan"]').should('be.visible').clear().type('alamat penagihan')

            // ? bagian checkbox dan alamat pengiriman
            cy.get(':nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click()
            cy.get(':nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click()
            cy.get(':nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click()
            cy.get(':nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click()
            cy.get(':nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click()


            // // ? alamat pengiriman
            // cy.get(':nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should('exist').then(($btn) => {
            //     if ($btn.is(':visible') && !$btn.is(':disabled')) {
            //         cy.wrap($btn).click()
            //         cy.log('tombol sudah ditekan')
            //         cy.get('input[placeholder="Masukkan alamat pengiriman"]').clear({ force: true }).type('ini adalah alamat pengiriman yang baru')
            //     } else {
            //         cy.log('tombol tidak dapat ditekan')
            //     }
            // });

            // todo mengubah nomor identitas jika lebih dari 16 digit
            cy.get('#tipe_identitas').should('be.visible').click()
            cy.get('[data-value]').should('be.visible').eq(1).click()
            cy.get('#no_identitas').should('be.visible').clear().type('1212121212121212')
            cy.get('#no_identitas').blur()

            // ? tombol simpan
            cy.get('.MuiButton-contained').should('be.visible').contains('Simpan').click()

            // ! pop up bahwa data berhasil diubah
            cy.get('.MuiSnackbar-root > .MuiPaper-root').should('exist').contains('Kontak berhasil disimpan')
        });

        it("Case 11 : Mengubah tipe kontak yang awalnya lainnya menjadi karyawan", () => {
            cy.visit('https://cashflow.assist.id/admin/contacts')

            // todo pergi ke bagian lainnya
            cy.get('#simple-tab-3').should('be.visible').contains('Lainnya').click();

            // todo pergi kehalaman detail kontak dengan menggunakan salah satu data di tabel lainnya
            cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2) > .MuiButtonBase-root').should('be.visible').click()

            // ? tombol ke halaman edit kontak
            cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').contains('Ubah Profil Kontak').click();

            // todo memastikan bahwa halaman sudah dikunjungi
            cy.url().should('include', 'edit')

            // todo tipe kontak sebelumnya
            cy.get('#tipe_kontak').should('be.visible').should('have.text', 'Lainnya')

            // todo mengubah tipe kontak menjadi karyawan
            cy.get('#tipe_kontak').should('be.visible').click()
            cy.get('[data-value="karyawan"]').should('exist').click()
            cy.get('#tipe_kontak').should('be.visible').should('have.text', 'Karyawan')

            // todo mengubah nomor identitas jika lebih dari 16 digit
            cy.get('#tipe_identitas').should('be.visible').click()
            cy.get('[data-value]').should('be.visible').eq(1).click()
            cy.get('#no_identitas').should('be.visible').clear().type('1212121212121212')
            cy.get('#no_identitas').blur()

            // ? tombol simpan
            cy.get('.MuiButton-contained').should('be.visible').contains('Simpan').click()

            // ! pop up bahwa data berhasil diubah
            cy.get('.MuiSnackbar-root > .MuiPaper-root').should('exist').contains('Kontak berhasil disimpan')
        });

        it("Case 12 : Memilih salah satu data di table karyawan kemudian menambahkan emailnya", () => {
            cy.visit('https://cashflow.assist.id/admin/contacts')

            // todo pergi ke bagian karyawan
            cy.get('#simple-tab-2').should('be.visible').contains('Karyawan').click();

            // todo pergi kehalaman detail kontak dengan menggunakan salah satu data di tabel karyawan
            cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2) > .MuiButtonBase-root').should('be.visible').click()

            // ? tombol ke halaman edit kontak
            cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').contains('Ubah Profil Kontak').click();

            // todo memastikan bahwa halaman sudah dikunjungi
            cy.url().should('include', 'edit')

            cy.get('input[placeholder="Masukkan alamat email"]').should('be.visible').then(($emailInput) => {
                if ($emailInput.length === 1) {
                    cy.wrap($emailInput).clear().type('email1@example.com')
                    cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').should('be.visible').contains('Tambah Email').click()
                    cy.get('input[placeholder="Masukkan alamat email"]').should('be.visible').eq(1).clear().type('email2@gmail.com').blur()
                    cy.log('if yang jalan')
                } else {
                    cy.get('input[placeholder="Masukkan alamat email"]').should('be.visible').eq(1).clear().type('email2@gmail.com')
                    cy.log('else yang jalan')
                };
            });

            // // ? tombol tambah email
            // cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').should('be.visible').contains('Tambah Email').click()

            // // ? input email kedua
            // cy.get('input[placeholder="Masukkan alamat email"]').eq(1).clear().type('emailke2@example.com').blur()

            // ? tombol simpan
            cy.get('.MuiButton-contained').should('be.visible').contains('Simpan').click()

            // ! pop up bahwa data berhasil diubah
            cy.get('.MuiSnackbar-root > .MuiPaper-root').should('exist').contains('Kontak berhasil disimpan')
        });

        it("Case 13 : Memilih salah satu data yang ada ditable karyawan kemudian menambahkan informasi bank yang baru", () => {
            cy.visit('https://cashflow.assist.id/admin/contacts')

            // todo pergi ke bagian Karyawan
            cy.get('#simple-tab-2').should('be.visible').contains('Karyawan').click();

            // todo pergi kehalaman detail kontak dengan menggunakan salah satu data di tabel karyawan
            cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2) > .MuiButtonBase-root').should('be.visible').click()

            // ? tombol ke halaman edit kontak
            cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').contains('Ubah Profil Kontak').click();

            // todo memastikan bahwa halaman sudah dikunjungi
            cy.url().should('include', 'edit')

            // ? tombol tambah bank
            cy.get(':nth-child(3) > .MuiCardContent-root > .css-1i24z3d > .css-1st318m > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').should('be.visible').contains('Tambah Bank Lainnya').click()

            // ? input tambah bank
            cy.get('input[name="data_bank[1].bank_name"]').should('be.visible').clear().type('Bank coba 1')
            cy.get('input[name="data_bank[1].bank_branch"]').should('be.visible').clear().type('Cabang ke 70')
            cy.get('input[name="data_bank[1].holder_name"]').should('be.visible').clear().type('Pemegang bank coba 1')
            cy.get('input[name="data_bank[1].rek_no"]').should('be.visible').clear().type('10928374937')

            // ? tombol simpan
            cy.get('.MuiButton-contained').should('be.visible').contains('Simpan').click()

            // ! pop up bahwa data berhasil diubah
            cy.get('.MuiSnackbar-root > .MuiPaper-root').should('exist').contains('Kontak berhasil disimpan')
        });

        it("Case 14 : Memilih salah satu data yang ada ditable karyawan kemudian mengubah bagian alamat penagihan dan pengiriman", () => {
            cy.visit('https://cashflow.assist.id/admin/contacts')

            // todo pergi ke bagian karyawan
            cy.get('#simple-tab-2').should('be.visible').contains('Karyawan').click();

            // todo pergi kehalaman detail kontak dengan menggunakan salah satu data di tabel karyawan
            cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2) > .MuiButtonBase-root').should('be.visible').click()

            // ? tombol ke halaman edit kontak
            cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').contains('Ubah Profil Kontak').click();

            // todo memastikan bahwa halaman sudah dikunjungi
            cy.url().should('include', 'edit')

            // todo mengubah alamat penagihan dan pengiriman
            cy.get('input[placeholder="Masukkan alamat penagihan"]').should('be.visible').clear().type('ini adalah alamat penagihan yang sudah dirubah')
            cy.get('input[placeholder="Masukkan alamat pengiriman"]').should('be.visible').then(($Pengiriman) => {
                if ($Pengiriman.prop('disabled')) {
                    cy.log('tidak bisa ditekan')
                    cy.get(':nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should('exist').uncheck()
                    cy.get(':nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should('exist').check()
                } else {
                    cy.wrap($Pengiriman).click()
                    // ? checkbox alamat pengiriman
                    cy.get(':nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should('exist').check()
                    cy.get(':nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should('be.checked')
                }
            })


            // todo memastikan bahwa alamat pengiriman telah berubah datanya dan sama dengan alamat penagihan saat ini
            cy.wait(2000)
            cy.get('input[placeholder="Masukkan alamat penagihan').click()
            cy.get('input[placeholder="Masukkan alamat pengiriman"]').should('be.visible').should('have.value', 'ini adalah alamat penagihan yang sudah dirubah').and('be.disabled')

            // ? tombol simpan
            cy.get('.MuiButton-contained').should('be.visible').contains('Simpan').click()

            // ! pop up bahwa data berhasil diubah
            cy.get('.MuiSnackbar-root > .MuiPaper-root').should('exist').contains('Kontak berhasil disimpan')
        });

        it("Case 15 : Memilih salah satu data yang ada ditable karyawan kemudian mengubah Bagian nama lengkap (sapaan dan nama)", () => {
            cy.visit('https://cashflow.assist.id/admin/contacts')

            // todo pergi ke bagian karyawan
            cy.get('#simple-tab-2').should('be.visible').contains('Karyawan').click();

            // todo pergi kehalaman detail kontak dengan menggunakan salah satu data di tabel karyawan
            cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2) > .MuiButtonBase-root').should('be.visible').click()

            // ? tombol ke halaman edit kontak
            cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').contains('Ubah Profil Kontak').click();

            // todo memastikan bahwa halaman sudah dikunjungi
            cy.url().should('include', 'edit')

            // ? sapaan dan nama lengkap
            cy.get('#sapaan').should('be.visible').click()
            cy.get('[data-value]').eq(2).click()

            cy.get('#nama').should('be.visible').clear().type('ini adalah nama yang sudah diedit')
            cy.get('#nama').should('have.value', 'Ini Adalah Nama Yang Sudah Diedit')

            cy.log('input nama akan otomatis membuat awalan kata menjadi huruf besar (title case)')

            // ? tombol simpan
            cy.get('.MuiButton-contained').should('be.visible').contains('Simpan').click()

            // ! pop up bahwa data berhasil diubah
            cy.get('.MuiSnackbar-root > .MuiPaper-root').should('exist').contains('Kontak berhasil disimpan')
        });

        it("Case 16 : Memilih salah satu data yang ada ditable karyawan kemudian mengubah bagian nama perusahaannya", () => {
            cy.visit('https://cashflow.assist.id/admin/contacts')

            // todo pergi ke bagian karyawan
            cy.get('#simple-tab-2').should('be.visible').contains('Karyawan').click();

            // todo pergi kehalaman detail kontak dengan menggunakan salah satu data di tabel karyawan
            cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2) > .MuiButtonBase-root').should('be.visible').click()

            // ? tombol ke halaman edit kontak
            cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').contains('Ubah Profil Kontak').click();

            // todo memastikan bahwa halaman sudah dikunjungi
            cy.url().should('include', 'edit')

            // ? kolom nama perusahaan
            cy.get('#nama_perusahaan').should('be.visible').clear().type("ini adalah nama perusahaan yang baru")

            // ? tombol simpan
            cy.get('.MuiButton-contained').should('be.visible').contains('Simpan').click()
        });

        it("Case 17 : Memilih salah satu data yang ada ditable karyawan kemudian mengubah bagian tipe identitas yang awalnya ktp menjadi sim serta mengubah nomor identitasnya juga", () => {
            cy.visit('https://cashflow.assist.id/admin/contacts')

            // todo pergi ke bagian karyawan
            cy.get('#simple-tab-2').should('be.visible').contains('Karyawan').click();

            // todo pergi kehalaman detail kontak dengan menggunakan salah satu data di tabel karyawan
            cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2) > .MuiButtonBase-root').should('be.visible').click()

            // ? tombol ke halaman edit kontak
            cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').contains('Ubah Profil Kontak').click();

            // todo memastikan bahwa halaman sudah dikunjungi
            cy.url().should('include', 'edit')

            // ? bagian nomor identitas
            cy.get('#tipe_identitas').should('be.visible').click()

            // ? memilih bagian sim
            cy.get('[data-value="sim"]').should('be.visible').click()

            cy.get('#tipe_identitas').should('be.visible').and('have.text', 'SIM')

            // ? mengubah nomor identiasnya juga
            cy.get('#no_identitas').should('be.visible').clear().type('1234567890')
            cy.get('#no_identitas').should('have.value', '1234567890')

            // ? tombol simpan
            cy.get('.MuiButton-contained').should('be.visible').contains('Simpan').click()
        });

        it("Case 18 : Memilih salah satu data yang ada ditable karyawan kemudian mengubah bagian tipe identitas yang awalnya ktp menjadi paspor serta mengubah nomor identitasnya juga", () => {
            cy.visit('https://cashflow.assist.id/admin/contacts')

            // todo pergi ke bagian karyawan
            cy.get('#simple-tab-2').should('be.visible').contains('Karyawan').click();

            // todo pergi kehalaman detail kontak dengan menggunakan salah satu data di tabel karyawan
            cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2) > .MuiButtonBase-root').should('be.visible').click()

            // ? tombol ke halaman edit kontak
            cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').contains('Ubah Profil Kontak').click();

            // todo memastikan bahwa halaman sudah dikunjungi
            cy.url().should('include', 'edit')

            // ? bagian nomor identitas
            cy.get('#tipe_identitas').should('be.visible').click()

            // ? memilih bagian paspor
            cy.get('[data-value="paspor"]').should('be.visible').click()

            cy.get('#tipe_identitas').should('be.visible').and('have.text', 'Paspor')

            // ? mengubah nomor identiasnya juga
            cy.get('#no_identitas').should('be.visible').clear().type('1234567890')
            cy.get('#no_identitas').should('have.value', '1234567890')

            // ? tombol simpan
            cy.get('.MuiButton-contained').should('be.visible').contains('Simpan').click()
        });

        it("Case 19 : Memilih data yang ada di table karyawan kemudian mengubah bagian nomor telepon dan nomor hp", () => {
            cy.visit('https://cashflow.assist.id/admin/contacts')

            // todo pergi ke bagian karyawan
            cy.get('#simple-tab-2').should('be.visible').contains('Karyawan').click();

            // todo pergi kehalaman detail kontak dengan menggunakan salah satu data di tabel karyawan
            cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2) > .MuiButtonBase-root').should('be.visible').click()

            // ? tombol ke halaman edit kontak
            cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').contains('Ubah Profil Kontak').click();

            // todo memastikan bahwa halaman sudah dikunjungi
            cy.url().should('include', 'edit')

            // ? nomor hp
            cy.get('#no_hp').should('be.visible').clear().type('9898989898989')
            // cy.get('#no_hp').should('have.value', '9898989898989')

            // ? nomor telpon
            cy.get('#no_telp').should('be.visible').clear().type('0101010101011')
            // cy.get('#no_telp').should('have.value', '0101010101011')

            // ? tombol simpan
            cy.get('.MuiButton-contained').should('be.visible').contains('Simpan').click()
        });

        it("Case 20 : memilih data yang ada di table karyawan kemudian mengubah fax dan npwp", () => {
            cy.visit('https://cashflow.assist.id/admin/contacts')

            // todo pergi ke bagian karyawan
            cy.get('#simple-tab-2').should('be.visible').contains('Karyawan').click();

            // todo pergi kehalaman detail kontak dengan menggunakan salah satu data di tabel karyawan
            cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2) > .MuiButtonBase-root').should('be.visible').click()

            // ? tombol ke halaman edit kontak
            cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').contains('Ubah Profil Kontak').click();

            // todo memastikan bahwa halaman sudah dikunjungi
            cy.url().should('include', 'edit')

            // todo nomor fax
            cy.get('#no_fax').should('be.visible').clear().type('1212121212')

            // todo nomor npwp
            cy.get('#no_npwp').should('be.visible').clear().type('1212121212')

            // todo tombol simpan
            cy.get('.MuiButton-contained').should('be.visible').contains('Simpan').click()
        });

        it("Case 21 : memililih data yang ada di table karyawan kemudian mengubah nitku", () => {
            cy.visit('https://cashflow.assist.id/admin/contacts')

            // todo pergi ke bagian karyawan
            cy.get('#simple-tab-2').should('be.visible').contains('Karyawan').click();

            // todo pergi kehalaman detail kontak dengan menggunakan salah satu data di tabel karyawan
            cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2) > .MuiButtonBase-root').should('be.visible').click()

            // ? tombol ke halaman edit kontak
            cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').contains('Ubah Profil Kontak').click();

            // todo memastikan bahwa halaman sudah dikunjungi
            cy.url().should('include', 'edit')

            // ? nitku
            cy.get('#nitku').should('be.visible').clear().type('01928369882377')

            // ? tombol simpan
            cy.get('.MuiButton-contained').should('be.visible').contains("Simpan").click()
        })
    });

    it("Case 22 : mencoba menggunakan fitur dark mode dihalaman edit kontak", () => {
        cy.visit('https://cashflow.assist.id/admin/contacts')

        // todo pergi ke bagian karyawan
        cy.get('#simple-tab-2').should('be.visible').contains('Karyawan').click();

        // todo pergi kehalaman detail kontak dengan menggunakan salah satu data di tabel karyawan
        cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2) > .MuiButtonBase-root').should('be.visible').click()

        // ? tombol ke halaman edit kontak
        cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').contains('Ubah Profil Kontak').click();

        // ? memastikan bahwa sudah berubah ke dark mode
        cy.get('body').should('not.have.css', 'background-color', 'rgb(255, 255, 255)')
    });
});