describe("Menguji Bagian halaman detail kontak pada website cashflow Assist ID", () => {
    const email = "damaresya947@gmail.com";
    const password = "12345678";

    beforeEach(() => {
        cy.loginWithApi(email, password);
    });

    it("Case 1 : Pergi kehalaman detail kontak dengan menggunakan salah satu data yang ada di tabel", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts");

        // todo pergi ke bagian karyawan
        cy.get('#simple-tab-2').should("be.visible").contains("Karyawan").click();

        cy.get('table tbody tr').not(':first')
            .eq(1)
            .find('td')
            .eq(1)
            .click()

        cy.wait(2000)
    });

    it("Case 2 : Kembali ke halaman kontak dengan menekan navigasi Kontak", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts");
        
        // todo menekan tombol navigasi
        cy.get(':nth-child(3) > .MuiTypography-root > span').should("be.visible").contains("Kontak").click()
        cy.url().should("eq", "https://cashflow.assist.id/admin/contacts")
    });

    it("Case 3 : Pergi kehalaman Edit kontak dan kembali lagi ke halaman kontak detail", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts");
        
        // todo pergi ke bagian karyawan
        cy.get('#simple-tab-2').should("be.visible").contains("Karyawan").click();
        
        // todo pergi kehalaman detail
        cy.get('table tbody tr').not(':first')
        .eq(1)
        .find('td')
        .eq(1)
        .click()
        
        // todo kehalaman edit
        cy.get('.MuiStack-root > .MuiButtonBase-root').should("be.visible").click()
        cy.url().should('include', 'edit')
        
        // todo kembali ke halaman detail kontak
        cy.get(':nth-child(5) > .MuiTypography-root > span').should("be.visible").contains("Detail Kontak").click()
        cy.url().should('include', 'detail')
    });
    
    it.only("Case 4 : Memeriksa apakah data di detail kontak sesuai dengan yang ada di API", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts");
    
        cy.intercept('GET', 'https://api-cashflow.assist.id/api/kontak/getDetail/eac89c00-d25a-11ef-ba97-11c3ae56a45e?companyId=b13e5210-8564-11ef-af27-a72e65a1d49c*').as('getContacts');
        
        // Pergi ke bagian karyawan
        cy.get('#simple-tab-2').should("be.visible").contains("Karyawan").click();
    
        // Pergi ke halaman detail
        cy.get('table tbody tr').not(':first')
            .eq(1)
            .find('td')
            .eq(1)
            .click();
    
        cy.wait('@getContacts').then((interception) => {
            const apiData = interception.response.body.results[0]; // Ambil data pertama dari API
    
            // Verifikasi setiap elemen di UI
            cy.get('.MuiStack-root > :nth-child(1) > .MuiListItemText-root > .MuiTypography-h6')
                .should('have.text', apiData.tipe_kontak.toLowerCase()); // Tipe Kontak
            cy.get(':nth-child(2) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(1) > .MuiList-root > :nth-child(1) > .MuiListItemText-root > .MuiTypography-body2')
                .should('have.text', apiData.nama.replace(/\s+$/, '')); // Nama Lengkap, menghapus spasi di belakang
            cy.get(':nth-child(2) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(1) > .MuiList-root > :nth-child(3) > .MuiListItemText-root > .MuiTypography-body2')
                .should('have.text', apiData.tipe_identitas.toUpperCase()); // Identitas (KTP)
            cy.get(':nth-child(1) > .MuiList-root > :nth-child(5) > .MuiListItemText-root > .MuiTypography-body2')
                .should('have.text', apiData.no_identitas); // No Identitas
            cy.get('.MuiTypography-body2 > .MuiTypography-root')
                .should('have.text', apiData.email_kontak_email[0]); // Email
            cy.get(':nth-child(1) > .MuiList-root > :nth-child(9) > .MuiListItemText-root > .MuiTypography-body2')
                .should('have.text', apiData.nama_perusahaan); // Nama Perusahaan
            cy.get(':nth-child(1) > .MuiList-root > :nth-child(11) > .MuiListItemText-root > .MuiTypography-body2')
                .should('have.text', apiData.no_hp); // No Handphone
            cy.get(':nth-child(2) > .MuiList-root > :nth-child(9) > .MuiListItemText-root > .MuiTypography-body2')
                .should('have.text', apiData.alamat_penagihan); // Alamat Penagihan
            cy.get(':nth-child(2) > .MuiList-root > :nth-child(11) > .MuiListItemText-root > .MuiTypography-body2')
                .should('have.text', apiData.alamat_pengiriman); // Alamat Pengiriman
    
            // Verifikasi Grup Kontak
            const groupNames = apiData.grup_kontak.map((group) => group.grup_name).join(', ');
            cy.get('.MuiStack-root > :nth-child(3) > .MuiListItemText-root > .MuiTypography-h6')
                .should('have.text', groupNames);
    
            // Verifikasi Informasi Bank
            const bankInfo = apiData.data_bank_info[0];
            cy.get(':nth-child(3) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(1) > .MuiList-root > :nth-child(1) > .MuiListItemText-root > .MuiTypography-body2')
                .should('have.text', bankInfo.bank_name); // Nama Bank
            cy.get(':nth-child(3) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(1) > .MuiList-root > :nth-child(3) > .MuiListItemText-root > .MuiTypography-body2')
                .should('have.text', bankInfo.bank_branch); // Cabang
            cy.get(':nth-child(3) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(2) > .MuiList-root > :nth-child(1) > .MuiListItemText-root > .MuiTypography-body2')
                .should('have.text', bankInfo.holder_name); // Pemegang Akun
            cy.get(':nth-child(3) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(2) > .MuiList-root > :nth-child(3) > .MuiListItemText-root > .MuiTypography-body2')
                .should('have.text', bankInfo.rek_no); // No Rekening
    
            // Verifikasi Akun Piutang, dengan pengecekan kondisi
            if (apiData.akun_piutang) { // Pastikan akun_piutang ada
                cy.get(':nth-child(4) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(1) > .MuiList-root > :nth-child(1) > .MuiListItemText-root > .MuiTypography-body2')
                    .should('have.text', apiData.akun_piutang.akun_piutang_name); // Akun Piutang
            } else {
                cy.log("Akun Piutang tidak tersedia.");
            }
    
            // Verifikasi Syarat Pembayaran Utama
            cy.get(':nth-child(4) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(1) > .MuiList-root > :nth-child(3) > .MuiListItemText-root > .MuiTypography-body2')
                .should('have.text', apiData.syarat_pembayaran); // Syarat Pembayaran
        });
    });
    
    it("Case 5 : Pergi ke halaman dashboard dengan menekan navigasi yang ada", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts");

        cy.get('.MuiBreadcrumbs-ol > :nth-child(1) > .MuiTypography-root').should("be.visible").click()
        cy.url().should('eq', 'https://cashflow.assist.id/admin/dashboard');
    })
});

