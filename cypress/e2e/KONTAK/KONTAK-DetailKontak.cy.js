describe('Check Komponen DetailKontak', () => { 
    beforeEach(() => {
        cy.getCookie('authToken'); // Memulihkan cookie sebelum setiap test
        cy.loginWithAPI('rayhanrayandra.work.id@gmail.com', 'Nz6}+#8y')
        cy.visit('https://cashflow.assist.id/admin/contacts')
        cy.intercept('GET', '/api/kontak/getDetail/*').as('getDetail');
        cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2) > .MuiButtonBase-root',{timeout:15000}).click()
    });

    it('Detail kontak menuju kontak yang tepat dengan mengambil id pada tabel html dan mecocokkan dengan url', () => {
        /*====================================================
         * Memastikan id pada elemen sesuai dengan tujuan url*
        =====================================================*/
        let idFromHTML;
        cy.visit('https://cashflow.assist.id/admin/contacts')
        // Ambil ID dari elemen HTML di halaman kontak
        cy.wait(2000);
        cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(1)', { timeout: 20000 }) // Timeout 20 detik
            .invoke('text') // Ambil teks dari elemen
            .then((id) => {
                idFromHTML = id.trim(); // Simpan ID yang diambil dari HTML
                cy.log(`ID yang disimpan dari HTML: ${idFromHTML}`); // Tampilkan ID yang disimpan
            });
        cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2) > .MuiButtonBase-root',{timeout:15000}).click()

        cy.wait('@getDetail').then((interception) => {
            // Verifikasi respons berhasil
            expect(interception.response.statusCode).to.eq(200);

            // Tangkap ID dari respons API
            const idData = interception.response.body.results[0].id;

            /*====================================================
            * Pastikan url sesuai dengan di yang dikirimkan api  *
            =====================================================*/
            // Verifikasi URL diarahkan sesuai ID
            cy.url().should('eq', `https://cashflow.assist.id/admin/contacts/${idData}`);

            // Bandingkan ID yang disimpan dengan ID dari API
            cy.log(`ID dari API: ${idData}`);
            cy.log(`ID yang disimpan dari HTML: ${idFromHTML}`);
            expect(idFromHTML).to.eq(idData); // Bandingkan ID dari HTML yang disimpan dengan ID dari API

        })
    });

    it('Validasi judul dan tab navigasi', () => {
        cy.get('h5').contains('Detail Kontak').should('be.visible')

        cy.get('.MuiBreadcrumbs-ol').should('be.visible')
        .and('contain', 'Beranda')
        .and('contain', '/')
        .and('contain', 'Kontak') //keseluruhan tampilan dari navigasi
        .and('contain', '/')
        .and('contain', 'Detail Kontak')

        cy.get('.MuiBreadcrumbs-ol > :nth-child(1) > .MuiTypography-root').should('be.visible') // Memastikan elemen terlihat
        .and('have.attr', 'href', '/admin/dashboard') // memastikan memiliki atribut href

        cy.get('.MuiBreadcrumbs-ol > :nth-child(3) > .MuiTypography-root').should('be.visible') // Memastikan elemen terlihat
        .and('have.attr', 'href', '/admin/contacts')
        
    });

    it('Validasi tombol ', () => {
        cy.get('.MuiStack-root > .MuiButtonBase-root').should('have.text', 'Ubah Profil Kontak')
        cy.get('.MuiBox-root > .MuiFormControl-root > .MuiInputBase-root > .MuiSelect-select').should('have.text', 'Pilih Tindakan')
    });

    it('Tab informasi Kontak dan Tab Semua Informasi', () => {
        cy.get('#Belumsiap').should('be.exist')
            // .then(() => {
            //   cy.log('Belumsiap')
            // })
            // .catch(() => {
            //   cy.log('emg blum siap')
            // })

        
    });

    it('validasi Label tipe kontak dan group kontak terlihat', () => {
        cy.wait('@getDetail').then((interception) => {
            // Mengambil nilai tipe_kontak dari respons API
            const tipeKontak = interception.response.body.results[0].tipe_kontak;
            const grupKontak = interception.response.body.results[0].grup_kontak;
    
            // Memastikan tipeKontak tidak kosong atau undefined
            expect(tipeKontak,grupKontak).to.not.be.oneOf([undefined, null, '']); // Validasi lebih baik
    
            // Validasi label "Tipe Kontak" dan nilai yang ditampilkan
            cy.wait(5000);  // (Note: lebih baik jika kita menghindari penggunaan wait yang statis)
            cy.get('.MuiStack-root > :nth-child(1) > .MuiListItemText-root > .MuiTypography-body2')
                .should('have.text', 'Tipe Kontak');
            cy.get('.MuiStack-root > :nth-child(1) > .MuiListItemText-root > .MuiTypography-h6')
                .should('have.text', tipeKontak)
                .should('be.visible'); // Validasi visibilitas
    
            // Validasi label "Group Kontak"
            cy.get('.MuiStack-root > :nth-child(3) > .MuiListItemText-root > .MuiTypography-body2')
                .should('have.text', 'Group Kontak');
    
            // Iterasi setiap grup kontak untuk validasi
            grupKontak.forEach((grup, index) => {
                const grupName = grup.grup_name;
                // Menggunakan selektor berbasis teks untuk memilih elemen
                cy.contains('.MuiStack-root', grupName)  // Menargetkan elemen dengan nama grup
                    .should('be.visible');
            });
        });
    });
    
    

    it('validasi tampilan ui dengan respon api sesuai', () => {
        cy.wait('@getDetail').then((interception) => {
        const data = interception.response.body.results[0];

        cy.get(':nth-child(2) > .MuiCardHeader-root')
            .should('have.text','Informasi Umum') //label card header

        cy.get(':nth-child(2) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(1) > .MuiList-root > :nth-child(1) > .MuiListItemText-root > .MuiTypography-h6')
            .should('have.text','Nama Lengkap')
        cy.get(':nth-child(2) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(1) > .MuiList-root > :nth-child(1) > .MuiListItemText-root > .MuiTypography-body2')
            .should('have.text', data.nama || "-")

        cy.get(':nth-child(2) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(2) > .MuiList-root > :nth-child(1) > .MuiListItemText-root > .MuiTypography-h6')
            .should('have.text','No Telepon')
        cy.get(':nth-child(2) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(2) > .MuiList-root > :nth-child(1) > .MuiListItemText-root > .MuiTypography-body2')
            .should('have.text', data.no_telp || "-")

        cy.get(':nth-child(2) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(1) > .MuiList-root > :nth-child(3) > .MuiListItemText-root > .MuiTypography-h6')
            .should('have.text', 'Identitas')
        cy.get(':nth-child(2) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(1) > .MuiList-root > :nth-child(3) > .MuiListItemText-root > .MuiTypography-body2')
            .should('have.text', data.tipe_identitas.toUpperCase() || "-")

        cy.get(':nth-child(2) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(2) > .MuiList-root > :nth-child(3) > .MuiListItemText-root > .MuiTypography-h6')
            .should('have.text','Fax')  
        cy.get(':nth-child(2) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(2) > .MuiList-root > :nth-child(3) > .MuiListItemText-root > .MuiTypography-body2')
            .should('have.text', data.no_fax || "-")

        cy.get(':nth-child(1) > .MuiList-root > :nth-child(5) > .MuiListItemText-root > .MuiTypography-h6')
            .should('have.text','No Identitas')
        cy.get(':nth-child(1) > .MuiList-root > :nth-child(5) > .MuiListItemText-root > .MuiTypography-body2')
            .should('have.text', data.no_identitas || "-")

        cy.get(':nth-child(2) > .MuiList-root > :nth-child(5) > .MuiListItemText-root > .MuiTypography-h6')
            .should('have.text', 'NPWP')
        cy.get(':nth-child(2) > .MuiList-root > :nth-child(5) > .MuiListItemText-root > .MuiTypography-body2')
            .should('have.text', data.no_npwp || "-")

        cy.get(':nth-child(1) > .MuiList-root > :nth-child(7) > .MuiListItemText-root > .MuiTypography-h6')
            .should('have.text', 'Alamat Email')
        data.email_kontak_email.forEach((email, index) => {
            cy.get(`.MuiTypography-body2 > :nth-child(${index + 1})`).should('have.text', email || "-");
          });
              
        cy.get(':nth-child(2) > .MuiList-root > :nth-child(7) > .MuiListItemText-root > .MuiTypography-h6')
            .should('have.text','Nomor Identitas Tempat Kegiatan Usaha (NITKU)')
        cy.get(':nth-child(2) > .MuiList-root > :nth-child(7) > .MuiListItemText-root > .MuiTypography-body2')
            .should('have.text', data.nitku || "-")

        cy.get(':nth-child(1) > .MuiList-root > :nth-child(9) > .MuiListItemText-root > .MuiTypography-h6')
            .should('have.text', 'Nama Perusahaan')
        cy.get(':nth-child(1) > .MuiList-root > :nth-child(9) > .MuiListItemText-root > .MuiTypography-body2')
            .should('have.text', data.nama_perusahaan || "-")

        cy.get(':nth-child(2) > .MuiList-root > :nth-child(9) > .MuiListItemText-root > .MuiTypography-h6')
            .should('have.text','Alamat Penagihan')
        cy.get(':nth-child(2) > .MuiList-root > :nth-child(9) > .MuiListItemText-root > .MuiTypography-body2')
            .should('have.text', data.alamat_penagihan || "-")

        cy.get(':nth-child(1) > .MuiList-root > :nth-child(11) > .MuiListItemText-root > .MuiTypography-h6')
            .should('have.text', 'No Handphone')
        cy.get(':nth-child(1) > .MuiList-root > :nth-child(11) > .MuiListItemText-root > .MuiTypography-body2')
            .should('have.text', data.no_hp || "-")

        cy.get(':nth-child(2) > .MuiList-root > :nth-child(11) > .MuiListItemText-root > .MuiTypography-h6')
            .should('have.text','Alamat Pengiriman')
        cy.get(':nth-child(2) > .MuiList-root > :nth-child(11) > .MuiListItemText-root > .MuiTypography-body2')
            .should('have.text', data.alamat_pengiriman || "-")

        cy.get(':nth-child(3) > .MuiCardHeader-root > .MuiCardHeader-content > .MuiTypography-root')
            .should('have.text','Informasi Bank') // label card header
        
        cy.get(':nth-child(3) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(1) > .MuiList-root > :nth-child(1) > .MuiListItemText-root > .MuiTypography-h6')
            .should('have.text', 'Nama Bank')
        cy.get(':nth-child(3) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(1) > .MuiList-root > :nth-child(1) > .MuiListItemText-root > .MuiTypography-body2')
            // .should('have.text','API')

        cy.get(':nth-child(3) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(2) > .MuiList-root > :nth-child(1) > .MuiListItemText-root > .MuiTypography-h6')
            .should('have.text','Pemegang Akun')
        cy.get(':nth-child(3) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(2) > .MuiList-root > :nth-child(1) > .MuiListItemText-root > .MuiTypography-body2')
            // .should('have.text',"API")

        cy.get(':nth-child(3) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(1) > .MuiList-root > :nth-child(3) > .MuiListItemText-root > .MuiTypography-h6')
            .should('have.text','Cabang')
        cy.get(':nth-child(3) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(1) > .MuiList-root > :nth-child(3) > .MuiListItemText-root > .MuiTypography-body2')
            // .should('have.text','API')

        cy.get(':nth-child(3) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(2) > .MuiList-root > :nth-child(3) > .MuiListItemText-root > .MuiTypography-h6')
            .should('have.text','No Rekening')
        cy.get(':nth-child(3) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(2) > .MuiList-root > :nth-child(3) > .MuiListItemText-root > .MuiTypography-body2')
            // .should('have.text','API')

        // cy.get(':nth-child(4) > .MuiCardHeader-root > .MuiCardHeader-content > .MuiTypography-root')
        //     .should('have.text','Pemetaan Akun')

        // cy.get(':nth-child(4) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(1) > .MuiList-root > :nth-child(1) > .MuiListItemText-root > .MuiTypography-h6')
        //     .should('have.text','Akun Piutang')
        // cy.get(':nth-child(4) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(1) > .MuiList-root > :nth-child(1) > .MuiListItemText-root > .MuiTypography-body2')
        //     // .should('have.text','API')

        // cy.get(':nth-child(4) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(2) > .MuiList-root > .MuiListItem-root > .MuiListItemText-root > .MuiTypography-h6')
        //     .should('have.text','Akun Hutang')
        // cy.get(':nth-child(4) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(2) > .MuiList-root > .MuiListItem-root > .MuiListItemText-root > .MuiTypography-body2')
        //     // .should('have.text', 'API')
    
        // cy.get(':nth-child(4) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(1) > .MuiList-root > :nth-child(3) > .MuiListItemText-root > .MuiTypography-h6')
        //     .should('have.text','Syarat Pembayaran Utama')
        // cy.get(':nth-child(4) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(1) > .MuiList-root > :nth-child(3) > .MuiListItemText-root > .MuiTypography-body2')
        //     // .should('have.text','API')
        
        // });
        // cy.get(':nth-child(2) > .MuiCardHeader-root')
        //     .should('have.text','Informasi Umum') //label card header

        // cy.get(':nth-child(2) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(1) > .MuiList-root > :nth-child(1) > .MuiListItemText-root > .MuiTypography-h6')
        //     .should('have.text','Nama Lengkap')
        // cy.get(':nth-child(2) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(1) > .MuiList-root > :nth-child(1) > .MuiListItemText-root > .MuiTypography-body2')
        //     // .should('have.text','API DATA')

        // cy.get(':nth-child(2) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(2) > .MuiList-root > :nth-child(1) > .MuiListItemText-root > .MuiTypography-h6')
        //     .should('have.text','No Telepon')
        // cy.get(':nth-child(2) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(2) > .MuiList-root > :nth-child(1) > .MuiListItemText-root > .MuiTypography-body2')
        //     // .should('have.text', 'API DATA')

        // cy.get(':nth-child(2) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(2) > .MuiList-root > :nth-child(3) > .MuiListItemText-root > .MuiTypography-h6')
        //     .should('have.text','Fax')
        // cy.get(':nth-child(2) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(2) > .MuiList-root > :nth-child(3) > .MuiListItemText-root > .MuiTypography-body2')
        //     // .should('have.text', 'API')

        // cy.get(':nth-child(2) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(1) > .MuiList-root > :nth-child(3) > .MuiListItemText-root > .MuiTypography-h6')
        //     .should('have.text', 'Identitas')
        // cy.get(':nth-child(1) > .MuiList-root > :nth-child(5) > .MuiListItemText-root > .MuiTypography-body2')
        //     // .should('have.text', 'API')

        // cy.get(':nth-child(2) > .MuiList-root > :nth-child(5) > .MuiListItemText-root > .MuiTypography-h6')
        //     .should('have.text', 'NPWP')
        // cy.get(':nth-child(2) > .MuiList-root > :nth-child(5) > .MuiListItemText-root > .MuiTypography-body2')
        //     // .should('have.text', 'API')

        // cy.get(':nth-child(1) > .MuiList-root > :nth-child(7) > .MuiListItemText-root > .MuiTypography-h6')
        //     .should('have.text', 'Alamat Email')
        // cy.get('.MuiTypography-body2 > .MuiTypography-root')
        //     // .should('have.text','API')

        // cy.get(':nth-child(2) > .MuiList-root > :nth-child(7) > .MuiListItemText-root > .MuiTypography-h6')
        //     .should('have.text','Nomor Identitas Tempat Kegiatan Usaha (NITKU)')
        // cy.get(':nth-child(2) > .MuiList-root > :nth-child(7) > .MuiListItemText-root > .MuiTypography-body2')
        //     // .should('have.text', 'API')

        // cy.get(':nth-child(1) > .MuiList-root > :nth-child(9) > .MuiListItemText-root > .MuiTypography-h6')
        //     .should('have.text', 'Nama Perusahaan')
        // cy.get(':nth-child(1) > .MuiList-root > :nth-child(9) > .MuiListItemText-root > .MuiTypography-body2')
        //     // .should('have.text', 'API')

        // cy.get(':nth-child(2) > .MuiList-root > :nth-child(9) > .MuiListItemText-root > .MuiTypography-h6')
        //     .should('have.text','Alamat Penagihan')
        // cy.get(':nth-child(2) > .MuiList-root > :nth-child(9) > .MuiListItemText-root > .MuiTypography-body2')
        //     // .should('have.text','API')

        // cy.get(':nth-child(1) > .MuiList-root > :nth-child(11) > .MuiListItemText-root > .MuiTypography-h6')
        //     .should('have.text', 'No Handphone')
        // cy.get(':nth-child(1) > .MuiList-root > :nth-child(11) > .MuiListItemText-root > .MuiTypography-body2')
        //     // .should('have.text','API')

        // cy.get(':nth-child(2) > .MuiList-root > :nth-child(11) > .MuiListItemText-root > .MuiTypography-h6')
        //     .should('have.text','Alamat Pengiriman')
        // cy.get(':nth-child(2) > .MuiList-root > :nth-child(11) > .MuiListItemText-root > .MuiTypography-body2')
        //     // .should('have.text','API')

        // cy.get(':nth-child(3) > .MuiCardHeader-root > .MuiCardHeader-content > .MuiTypography-root')
        //     .should('have.text','Informasi Bank')
        
        // cy.get(':nth-child(3) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(1) > .MuiList-root > :nth-child(1) > .MuiListItemText-root > .MuiTypography-h6')
        //     .should('have.text', 'Nama Bank')
        // cy.get(':nth-child(3) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(1) > .MuiList-root > :nth-child(1) > .MuiListItemText-root > .MuiTypography-body2')
        //     // .should('have.text','API')

        // cy.get(':nth-child(3) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(2) > .MuiList-root > :nth-child(1) > .MuiListItemText-root > .MuiTypography-h6')
        //     .should('have.text','Pemegang Akun')
        // cy.get(':nth-child(3) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(2) > .MuiList-root > :nth-child(1) > .MuiListItemText-root > .MuiTypography-body2')
        //     // .should('have.text',"API")

        // cy.get(':nth-child(3) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(1) > .MuiList-root > :nth-child(3) > .MuiListItemText-root > .MuiTypography-h6')
        //     .should('have.text','Cabang')
        // cy.get(':nth-child(3) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(1) > .MuiList-root > :nth-child(3) > .MuiListItemText-root > .MuiTypography-body2')
        //     // .should('have.text','API')

        // cy.get(':nth-child(3) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(2) > .MuiList-root > :nth-child(3) > .MuiListItemText-root > .MuiTypography-h6')
        //     .should('have.text','No Rekening')
        // cy.get(':nth-child(3) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(2) > .MuiList-root > :nth-child(3) > .MuiListItemText-root > .MuiTypography-body2')
        //     // .should('have.text','API')

        // cy.get(':nth-child(4) > .MuiCardHeader-root > .MuiCardHeader-content > .MuiTypography-root')
        //     .should('have.text','Pemetaan Akun')

        // cy.get(':nth-child(4) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(1) > .MuiList-root > :nth-child(1) > .MuiListItemText-root > .MuiTypography-h6')
        //     .should('have.text','Akun Piutang')
        // cy.get(':nth-child(4) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(1) > .MuiList-root > :nth-child(1) > .MuiListItemText-root > .MuiTypography-body2')
        //     // .should('have.text','API')

        // cy.get(':nth-child(4) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(2) > .MuiList-root > .MuiListItem-root > .MuiListItemText-root > .MuiTypography-h6')
        //     .should('have.text','Akun Hutang')
        // cy.get(':nth-child(4) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(2) > .MuiList-root > .MuiListItem-root > .MuiListItemText-root > .MuiTypography-body2')
        //     // .should('have.text', 'API')
    
        // cy.get(':nth-child(4) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(1) > .MuiList-root > :nth-child(3) > .MuiListItemText-root > .MuiTypography-h6')
        //     .should('have.text','Syarat Pembayaran Utama')
        // cy.get(':nth-child(4) > .MuiCardContent-root > .MuiGrid2-container > :nth-child(1) > .MuiList-root > :nth-child(3) > .MuiListItemText-root > .MuiTypography-body2')
        //     // .should('have.text','API')
        
        

        
    })
})
})