describe('Check komponen tambah kontak', () => { 

    beforeEach(() => {
        cy.getCookie('authToken'); // Memulihkan cookie sebelum setiap test
        cy.loginWithAPI('rayhanrayandra.work.id@gmail.com', 'Nz6}+#8y')
        cy.visit('https://cashflow.assist.id/admin/contacts/create')
    });

    it('001 - Validasi judul', () => {
        cy.get('.MuiTypography-h5 > span').should('be.visible').and('contain', 'Tambah Kontak');
    });

    context('Validasi tab navigasi sesuai dan berfungsi', () => {
        it('Validasi kesesuaian penulisan pada tab', () => {
            cy.get('.MuiBreadcrumbs-ol').should('be.visible')
            .and('contain', 'Beranda')
            .and('contain', '/')
            .and('contain', 'Kontak')
            .and('contain', '/')
            .and('contain', 'Tambah Kontak')
        });
        
        it('Dari Tambah kontak mundur ke kontak', () => {
            cy.get('.MuiBreadcrumbs-ol > :nth-child(3)')
            .click()
            cy.get('h5').should('contain', 'Kontak').should('be.visible');
        });
        
        it('Dari Tambah kontak mundur ke Beranda', () => {
            cy.get('.MuiBreadcrumbs-ol > :nth-child(1)')
            .click()
            cy.get('h5').should('contain', 'Beranda').should('be.visible');
            
        });
        
    });

    context('Pengujian form', () => {
        
        it('Informasi Kontak memiliki tipe kontak dan grup kontak', () => {
        cy.get(':nth-child(1) > .MuiCardHeader-root').contains('Informasi Kontak')
        cy.get(':nth-child(1) > .MuiCardContent-root')
            .should('contain.text', 'Tipe Kontak')
            .and('contain.text', 'Grup Kontak');

        cy.get('#tipe_kontak')
        cy.get('#fk_grup')
        });
        
        it('Informasi umum memiliki beberapa inputan', () => {
            cy.get(':nth-child(2) > .MuiCardHeader-root').contains('Informasi Umum') //LABEL START
            cy.get(':nth-child(2) > .MuiCardContent-root')
                .should('contain.text', 'Nama Lengkap')
                .and('contain.text', 'Tipe Identitas')
                .and('contain.text', 'Alamat Email')
                .and('contain.text', 'Nama Perusahaan')
                .and('contain.text', 'Nomor HP & Telepon')
                .and('contain.text', 'Fax & NPWP')
                .and('contain.text', 'Nomor Identitas Tempat Kegiatan Usaha (NITKU)')
                .and('contain.text', 'Alamat Penagihan')
                .and('contain.text', 'Alamat Pengiriman')
            cy.get('[data-testid="input-isDetailAlamatPenagihan"] > .MuiTypography-root')
                .should('contain.text','Tambah Rincian')
            cy.get(':nth-child(9) > .MuiGrid2-container > :nth-child(2) > .MuiFormControlLabel-root > .MuiTypography-root')
                .should('contain.text','Samakan dengan alamat penagihan')
            cy.get(':nth-child(3) > .MuiGrid2-grid-md-4 > .MuiTypography-root')
                .should('contain.text','Anda dapat menambahkan lebih dari satu alamat email (jika ada)')
            cy.get(':nth-child(8) > .MuiGrid2-grid-md-4 > .MuiTypography-root')
                .should('contain.text', 'Kamu dapat menambahkan detail alamat dengan centang pada tambah rincian')
            cy.get(':nth-child(9) > .MuiGrid2-grid-md-4 > .MuiTypography-root')
                .should('contain.text','Kamu dapat menambahkan detail alamat dengan centang pada tambah rincian') //LABEL END

            cy.get('#sapaan')
            cy.get('#nama')
            cy.get('#tipe_identitas')
            cy.get('#no_identitas')
            cy.get('[id^="email\\."]').eq(0)
            cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').should('contain.text','Tambah Email') //button
            cy.get('#nama_perusahaan')
            cy.get('#no_hp')
            cy.get('#no_telp')
            cy.get('#no_fax')
            cy.get('#no_npwp')
            cy.get('#nitku')
            cy.get('[data-testid="input-isDetailAlamatPenagihan"] > .MuiButtonBase-root > .PrivateSwitchBase-input')
            cy.get('input[name="alamat_pengiriman"]')
            cy.get(':nth-child(9) > .MuiGrid2-container > :nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input')
            
        });
        it('Informasi Bank', () => {
            cy.get(':nth-child(3) > .MuiCardHeader-root').contains('Informasi Bank')
            cy.get(':nth-child(3) > .MuiCardContent-root')
                .should('contain.text', 'Nama Bank & Cabang')

                cy.get('[name="data_bank[0].bank_name"]')  // Menargetkan input berdasarkan name
                .should('exist');
                cy.get('[name="data_bank[0].bank_branch"]')  // Menargetkan input berdasarkan name
                .should('exist');
                cy.get('[name="data_bank[0].holder_name"]')  // Menargetkan input berdasarkan name
                .should('exist');
                cy.get('[name="data_bank[0].rek_no"]')  // Menargetkan input berdasarkan name
                .should('exist');

            cy.get(':nth-child(3) > .MuiCardContent-root > :nth-child(1) > .css-1st318m > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root')
                .should('contain.text', 'Tambah Bank Lainnya')
              
            
        });
        it('Informasi Pemetaan Akun', () => {
            cy.get(':nth-child(4) > .MuiCardHeader-root').contains('Informasi Pemetaan Akun')
            cy.get(':nth-child(4) > .MuiCardContent-root')
                .should('contain.text', 'Pemetaan Akun')
                .and('contain.text', 'Syarat Pembayaran Utama')

            cy.get('#fk_akun_piutang')
            cy.get('#piutang_max')
            cy.get('[data-testid="input-active_piutang_max"] > .MuiTypography-root')
                .should('contain.text', 'Aktifkan Piutang Maksimum');
            cy.get('[data-testid="input-active_piutang_max"] > .MuiButtonBase-root > .PrivateSwitchBase-input')
            cy.get('#syarat_pembayaran')
            
        });

        it('Submit', () => {
            cy.get('.css-16ogmd7 > .MuiButton-text').should('contain.text','Batal')
            cy.get('.MuiButton-contained').should('contain.text','Simpan')
        });
    })
    context('Positive Test Cases', () =>{
        it.only('Memasukkan data yang required saja', () => {
            cy.get('#tipe_kontak').click() //tipe kontak
            cy.contains('li','Pelanggan').click()
            cy.get('#tipe_kontak').should('have.text', 'Pelanggan')

            cy.get('#fk_grup').click() //grup
            cy.contains('li','vendor obat asist 2').click()
            cy.get('#fk_grup').should('have.text', 'vendor obat asist 2')
            cy.contains('li','Tambah Baru').click()
            cy.get('[data-testid="CloseIcon"] > path').click()
            

            cy.get('#nama').type('ryanandra') //nama lengkap
            cy.get('input[placeholder="Masukkan alamat email"]').eq(0).type('kantorbola88@example.com')// email
            cy.get('[data-testid="input-isDetailAlamatPenagihan"] > .MuiButtonBase-root > .PrivateSwitchBase-input').type('jalan purwokerto')
            cy.wait(7000)
            cy.get('.MuiButton-contained').click()

        });

    });
    
    context('Negative Test Cases', () =>{
        it('Ketika submit tanpa mengisi apa apa muncul warning', () => {

            cy.get('.MuiButton-contained').should('contain.text','Simpan').click() //klik
            cy.get('.MuiAlert-message').should('contain.text','Mohon periksa kembali form') //message kanan bawah
            cy.get('.MuiFormControl-fullWidth > .MuiTypography-root').should('contain.text','Grup Kontak harus diisi') //text helper grup kontak
            cy.get('#nama-helper-text').should('contain.text','Nama Lengkap harus diisi') //text helper nama lengkap
            cy.get(':nth-child(8) > .MuiGrid2-container > :nth-child(1) > .MuiFormControl-root').should('contain.text','Alamat Penagihan harus diisi')//text helper Alamat Penagihan

            
        });

    })
 })

