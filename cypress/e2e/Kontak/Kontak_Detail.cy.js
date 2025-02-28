describe('Menguji halaman detail kontak pada cashflow assist id', () => {
    const email = 'damaresya947@gmail.com';
    const password = '12345678';

    beforeEach(() => {
        cy.loginWithApi(email, password);
    });

    it("Case 1 : Pergi ke halaman detail kontak dengan menggunakan salah satu data di tabel karyawan", () => {
        cy.visit('https://cashflow.assist.id/admin/contacts')

        // todo pergi ke bagian karyawan
        cy.get('#simple-tab-2').should('be.visible').contains('Karyawan').click();

        cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2) > .MuiButtonBase-root').click()
    });

    it('Case 2 : Memeriksa UI yang ada di halaman detail kontak', () => {
        cy.visit('https://cashflow.assist.id/admin/contacts')

        // todo pergi ke bagian karyawan
        cy.get('#simple-tab-2').should('be.visible').contains('Karyawan').click();

        cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2) > .MuiButtonBase-root').click()

        // * icon
        cy.get('[data-testid="appbar-logo"]').should('be.visible')

        // * profile
        cy.get('[data-testid="appbar-profile-button"]').should('be.visible').and(($profile) => {
            expect($profile).to.contain('User')
            expect($profile).to.contain('Muhammad Luthfiandra')
        });

        // * judul
        cy.get('.MuiTypography-h5 > span').should('be.visible').contains('Detail Kontak')

        // * navbar content
        cy.get('.MuiBreadcrumbs-ol').should('be.visible').and(($navTrail) => {
            expect($navTrail).to.contain('Beranda')
            expect($navTrail).to.contain('Kontak')
            expect($navTrail).to.contain('Detail Kontak')
        });

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

        // * tombol edit
        cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').contains('Ubah Profil Kontak')

        // * tombol tindakan
        // cy.get('.MuiBox-root > .MuiFormControl-root > .MuiInputBase-root > .MuiSelect-select').should('be.visible').click().and(($action) => {
        //     expect($action).to.contain('Buat Transaksi Penjualan')
        //     expect($action).to.contain('Buat Transaksi Pembelian')
        // });

        // * judul tipe kontak
        cy.get('.MuiStack-root > :nth-child(1) > .MuiListItemText-root > .MuiTypography-body2').should('be.visible').contains('Tipe Kontak')

        // * icon tipe kontak
        cy.get('.MuiStack-root > :nth-child(1) > .MuiListItemIcon-root').should('be.visible')

        // * tipe kontak
        // cy.get('.MuiStack-root > :nth-child(1) > .MuiListItemText-root > .MuiTypography-h6').should('be.visible').contains('Karyawan')

        // * judul grup kontak
        // cy.get('.MuiStack-root > :nth-child(3) > .MuiListItemText-root > .MuiTypography-body2').should('be.visible').contains('Grup Kontak')

        // * header table informasi umum
        cy.get(':nth-child(2) > .MuiCardHeader-root').should('be.visible').contains('Informasi Umum')

        // * content table informasi umum
        cy.get(':nth-child(2) > .MuiCardContent-root').should('be.visible').then(($headerTable) => {
            const headings = ["Nama Lengkap", "Identitas", "No Identitas", "Alamat Email", "Nama Perusahaan", "No Handphone", "No Telepon", "Fax", "NPWP", "Nomor Identitas Tempat Kegiatan Usaha (NITKU)", "Alamat Penagihan", "Alamat Pengiriman"];

            const headerText = $headerTable.text();

            headings.forEach(heading => {
                expect(headerText).to.include(heading);
            });
        });

        // * header table Informasi Bank
        cy.get(':nth-child(3) > .MuiCardHeader-root').should('be.visible').contains('Informasi Bank')

        // * content table informasi bank
        cy.get(':nth-child(3) > .MuiCardContent-root').should('be.visible').then(($bankInfo) => {
            const headerBank = ["Nama Bank", "Cabang", "Pemegang Akun", "No Rekening"];

            const bankText = $bankInfo.text();

            headerBank.forEach(bank => {
                expect(bankText).to.include(bank);
            });
        });

        // * header pemetaan akun
        cy.get(':nth-child(4) > .MuiCardHeader-root').should('be.visible').contains('Pemetaan Akun')

        // * content table pemetaan akun
        cy.get(':nth-child(4) > .MuiCardContent-root').should('be.visible').then(($accountMap) => {
            const headerAccount = ["Akun Piutang", "Akun Hutang", "Syarat Pembayaran Utama"];

            const accountText = $accountMap.text();

            headerAccount.forEach(account => {
                expect(accountText).to.include(account);
            });
        });
    });

    it("Case 3 : Pergi ke halaman edit kontak dari halaman detail kontak dengan salah satu data yang sudah dipilih dari tabel karyawan", () => {
        cy.visit('https://cashflow.assist.id/admin/contacts')

        // todo pergi ke bagian karyawan
        cy.get('#simple-tab-2').should('be.visible').contains('Karyawan').click();

        cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2) > .MuiButtonBase-root').click()

        // ? tombol ke halaman edit kontak
        cy.get('.MuiStack-root > .MuiButtonBase-root').should('be.visible').contains('Ubah Profil Kontak').click();

        // todo memastikan bahwa halaman sudah dikunjungi
        cy.url().should('include', 'edit')

        // todo kembali ke halaman detail kontak
        cy.get(':nth-child(5) > .MuiTypography-root > span').should('be.visible').contains('Detail Kontak').click()
        cy.url().should('not.include', 'edit')
    });

    it("Case 4 : Dari halaman detail kontak, menekan navigasi Kontak sehingga kembali ke halaman kontak", () => {
        cy.visit('https://cashflow.assist.id/admin/contacts')

        // todo pergi ke bagian karyawan
        cy.get('#simple-tab-2').should('be.visible').contains('Karyawan').click();

        cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2) > .MuiButtonBase-root').click()

        // ? navigasi ke halaman kontak
        cy.get(':nth-child(3) > .MuiTypography-root > span').should('be.visible').contains('Kontak').click()

        cy.url().should('eq', 'https://cashflow.assist.id/admin/contacts')
    });

    it("Case 5 : Dari halaman detail kontak, menekan navigasi Beranda sehingga kembali ke halaman Beranda", () => {
        cy.visit('https://cashflow.assist.id/admin/contacts')

        // todo pergi ke bagian karyawan
        cy.get('#simple-tab-2').should('be.visible').contains('Karyawan').click();

        cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2) > .MuiButtonBase-root').click()

        // ? navigasi ke halaman kontak
        cy.get('.MuiBreadcrumbs-ol > :nth-child(1) > .MuiTypography-root').should('be.visible').contains('Beranda').click()

        cy.url().should('eq', 'https://cashflow.assist.id/admin/dashboard')
    });

    it("Case 6 : Pergi ke halaman detail kontak dari data yang ada di table karyawan dan memastikan bahwa tipe kontak yang ditampilkan sesuai dengan yang dipilih sebelumnya", () => {
        cy.visit('https://cashflow.assist.id/admin/contacts')

        // todo pergi ke bagian karyawan
        cy.get('#simple-tab-2').should('be.visible').contains('Karyawan').click();

        cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2) > .MuiButtonBase-root').click()

        // ? memastikan tipe kontak karyawan karena data yang dipilih berasal dari table karyawan
        cy.get('.css-1w9ce96 > .MuiStack-root > :nth-child(1)').should('be.visible').find('h6').and('have.text', "karyawan")
    });

    it("Case 7 : Pergi ke halaman detail kontak dari data yang ada di table lainnya dan memastikan bahwa tipe kontak yang ditampilkan sesuai dengan yang dipilih sebelumnya", () => {
        cy.visit('https://cashflow.assist.id/admin/contacts')

        // todo pergi ke bagian Lainnya
        cy.get('#simple-tab-3').should('be.visible').contains('Lainnya').click();

        cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2) > .MuiButtonBase-root').click()

        // ? memastikan tipe kontak Lainnya karena data yang dipilih berasal dari table Lainnya
        cy.get('.css-1w9ce96 > .MuiStack-root > :nth-child(1)').should('be.visible').find('h6').and('have.text', "lainnya")
    });

    it("Case  8 : menguji dark mode dihalaman detail kontak", () => {
        cy.visit('https://cashflow.assist.id/admin/contacts')

        // todo pergi ke bagian Lainnya
        cy.get('#simple-tab-3').should('be.visible').contains('Lainnya').click();

        cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2) > .MuiButtonBase-root').click()

        // ? dark mode
        cy.get('.MuiFormControlLabel-root').should('be.visible').click()

        // ? validasi bahwa dark mode bekerja
        cy.get('body').should('not.have.css', 'background-color', 'rgb(255, 255, 255)')
    })
});