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
    
    context('validasi komponen form', () => {
        
        it('Informasi Kontak', () => {
        cy.get(':nth-child(1) > .MuiCardHeader-root').contains('Informasi Kontak')
        cy.get(':nth-child(1) > .MuiCardContent-root')
            .should('contain.text', 'Tipe Kontak')
            .and('contain.text', 'Grup Kontak'); //label

        cy.get('#tipe_kontak')
        cy.get('#fk_grup')  //input
        });
        
        it('Informasi umum', () => {
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
    context.only('Positive Test Cases', () =>{
        
        it('Input data required saja type kontak(Pelanggan)- Memantau body request sesuai dengan ui - dan expect berhasil dengan message berhasil ', () => {
            const expectedRequestBody = {
                active_piutang_max: 0,
                alamat_penagihan: "jalan penagihan pelanggan",
                alamat_pengiriman: "",
                company_id: "b13e5210-8564-11ef-af27-a72e65a1d49c",
                email: [
                    "email@pelanggan.com"
                ],
                fk_grup: [
                    "30a2c042-a658-11ef-8f78-25bebcc62186"
                ],
                data_bank: [
                    {
                        bank_branch: "",
                        bank_name: "",
                        holder_name: "",
                        rek_no: ""
                    }
                ],
                nama: "Username Pelanggan",
                nama_perusahaan: "",
                no_identitas: "",
                no_fax: "",
                no_hp: "",
                no_npwp: "",
                no_telp: "",
                nitku: "",
                piutang_max: 0,
                fk_akun_hutang: "",
                fk_akun_piutang: "",
                sapaan: "",
                syarat_pembayaran: "",
                tipe_identitas: "",
                tipe_kontak: "pelanggan"
            };
        
            // Intercept the API request
            cy.intercept('POST', 'https://api-cashflow.assist.id/api/kontak/add', (req) => {
                // Log the request body to the Cypress console
                console.log('Request Body:', req.body);
        
                // Modify the response (if needed)
                req.reply({
                    statusCode: 200,
                    body: { message: "Kontak berhasil disimpan" }
                });
            }).as('addContactPelanggan');
        
            // Perform UI actions
            cy.get('#tipe_kontak',{ timeout: 10000}).click(); // tipe kontak
            cy.contains('li', 'Pelanggan').click();
            cy.get('#tipe_kontak').should('have.text', 'Pelanggan');
        
            cy.get('#fk_grup').click(); // grup
            cy.contains('li', 'vendor obat asist 2',{ timeout: 10000}).click();
            cy.get('#fk_grup').should('have.text', 'vendor obat asist 2');
            cy.contains('li', 'Tambah Baru').click();
            cy.get('[data-testid="CloseIcon"] > path').click();
        
            cy.get('#nama').type('username pelanggan'); // nama lengkap
            cy.get('input[placeholder="Masukkan alamat email"]').eq(0).type('email@pelanggan.com'); // email
            cy.get('input[placeholder="Masukkan alamat penagihan"]').type('jalan penagihan pelanggan');
            cy.get('.MuiButton-contained').click();
        
            // Wait for the intercepted API request
            cy.wait('@addContactPelanggan').then((interception) => {
                // Verify the request body matches the expected data
                expect(interception.request.body).to.deep.equal(expectedRequestBody);
        
                // Optionally log the interception data for debugging
                cy.log('Intercepted Request:', interception);
            });
        
            // Assert success message is displayed
            cy.get('.MuiAlert-message').should('contain.text', 'Kontak berhasil disimpan');
        });

        it('Input data required saja type kontak(Suplier)- Memantau body request sesuai dengan ui - dan expect berhasil dengan message berhasil ', () => {
            const expectedRequestBody = {
                active_piutang_max: 0,
                alamat_penagihan: "jalan penagihan suplier",
                alamat_pengiriman: "jalan pengiriman suplier",
                company_id: "b13e5210-8564-11ef-af27-a72e65a1d49c",
                email: [
                    "email@suplier.com"
                ],
                fk_grup: [
                    "30a2c042-a658-11ef-8f78-25bebcc62186"
                ],
                data_bank: [
                    {
                        bank_branch: "5",
                        bank_name: "BRI",
                        holder_name: "ryan",
                        rek_no: 123456789
                    }
                ],
                nama: "Username Suplier",
                nama_perusahaan: "",
                no_identitas: "",
                no_fax: "",
                no_hp: "",
                no_npwp: "",
                no_telp: "",
                nitku: "",
                piutang_max: 0,
                fk_akun_hutang: "",
                fk_akun_piutang: "",
                sapaan: "",
                syarat_pembayaran: "",
                tipe_identitas: "",
                tipe_kontak: "suplier"
            };
        
            // Intercept the API request
            cy.intercept('POST', 'https://api-cashflow.assist.id/api/kontak/add', (req) => {
                // Log the request body to the Cypress console
                console.log('Request Body:', req.body);
        
                // Modify the response (if needed)
                req.reply({
                    statusCode: 200,
                    body: { message: "Kontak berhasil disimpan" }
                });
            }).as('addContactSuplier');
        
            // Perform UI actions
            cy.get('#tipe_kontak',{ timeout: 10000}).click(); // tipe kontak
            cy.contains('li', 'Suplier').click();
            cy.get('#tipe_kontak').should('have.text', 'Suplier');
        
            cy.get('#fk_grup').click(); // grup
            cy.contains('li', 'vendor obat asist 2',{ timeout: 10000}).click();
            cy.get('#fk_grup').should('have.text', 'vendor obat asist 2');
            cy.contains('li', 'Tambah Baru').click();
            cy.get('[data-testid="CloseIcon"] > path').click();
        
            cy.get('#nama').type('username suplier'); // nama lengkap
            cy.get('input[placeholder="Masukkan alamat email"]').eq(0).type('email@suplier.com'); // email
            cy.get('input[placeholder="Masukkan alamat penagihan"]').type('jalan penagihan suplier');
            cy.get('input[name="alamat_pengiriman"]').type('jalan pengiriman suplier');
            cy.get('[name="data_bank[0].bank_name"]').type('BRI')  // Menargetkan input berdasarkan name
            cy.get('[name="data_bank[0].bank_branch"]').type('5')  // Menargetkan input berdasarkan name
            cy.get('[name="data_bank[0].holder_name"]').type('ryan')  // Menargetkan input berdasarkan name
            cy.get('[name="data_bank[0].rek_no"]').type('123456789')  // Menargetkan input berdasarkan name
                

            cy.get('.MuiButton-contained').click();
        
            // Wait for the intercepted API request
            cy.wait('@addContactSuplier').then((interception) => {
                // Verify the request body matches the expected data
                expect(interception.request.body).to.deep.equal(expectedRequestBody);
        
                // Optionally log the interception data for debugging
                cy.log('Intercepted Request:', interception);
            });
        
            // Assert success message is displayed
            cy.get('.MuiAlert-message').should('contain.text', 'Kontak berhasil disimpan');
        });
        
        it('Input data required saja type kontak(Karyawan) - Memantau body request sesuai dengan ui - dan expect berhasil dengan message berhasil ', () => {
            const expectedRequestBody = {
                active_piutang_max: 0,
                alamat_penagihan: "",
                alamat_pengiriman: "",
                company_id: "b13e5210-8564-11ef-af27-a72e65a1d49c",
                email: [
                    "email@karyawan.com"
                ],
                fk_grup: [
                    "30a2c042-a658-11ef-8f78-25bebcc62186"
                ],
                data_bank: [
                    {
                        bank_branch: "",
                        bank_name: "",
                        holder_name: "",
                        rek_no: ""
                    }
                ],
                nama: "Username Karyawan",
                nama_perusahaan: "",
                no_identitas: "1234567890000001",
                no_fax: "",
                no_hp: "",
                no_npwp: "",
                no_telp: "",
                nitku: "",
                piutang_max: 0,
                fk_akun_hutang: "",
                fk_akun_piutang: "",
                sapaan: "",
                syarat_pembayaran: "",
                tipe_identitas: "ktp",
                tipe_kontak: "karyawan"
            };
        
            // Intercept the API request
            cy.intercept('POST', 'https://api-cashflow.assist.id/api/kontak/add', (req) => {
                // Log the request body to the Cypress console
                console.log('Request Body:', req.body);
        
                // Modify the response (if needed)
                req.reply({
                    statusCode: 200,
                    body: { message: "Kontak berhasil disimpan" }
                });
            }).as('addContactKaryawan');
        
            // Perform UI actions
            cy.get('#tipe_kontak',{ timeout: 10000}).click(); // tipe kontak
            cy.contains('li', 'Karyawan').click();
            cy.get('#tipe_kontak').should('have.text', 'Karyawan');
        
            cy.get('#fk_grup').click(); // grup
            cy.contains('li', 'vendor obat asist 2',{ timeout: 10000}).click();
            cy.get('#fk_grup').should('have.text', 'vendor obat asist 2');
            cy.contains('li', 'Tambah Baru').click();
            cy.get('[data-testid="CloseIcon"] > path').click();
        
            cy.get('#nama').type('username karyawan'); // nama lengkap
            cy.get('input[placeholder="Masukkan alamat email"]').eq(0).type('email@karyawan.com'); // email

            cy.get('#tipe_identitas').click()
            cy.contains('li', 'KTP').click();
            cy.get('#no_identitas').type('1234567890000001')


            cy.get('.MuiButton-contained').click();
        
            // Wait for the intercepted API request
            cy.wait('@addContactKaryawan').then((interception) => {
                // Verify the request body matches the expected data
                expect(interception.request.body).to.deep.equal(expectedRequestBody);
        
                // Optionally log the interception data for debugging
                cy.log('Intercepted Request:', interception);
            });
        
            // Assert success message is displayed
            cy.get('.MuiAlert-message').should('contain.text', 'Kontak berhasil disimpan');
        });

        it('Input data required saja type kontak(Lainnya) - Memantau body request sesuai dengan ui - dan expect berhasil dengan message berhasil ', () => {
            const expectedRequestBody = {
                active_piutang_max: 0,
                alamat_penagihan: "",
                alamat_pengiriman: "",
                company_id: "b13e5210-8564-11ef-af27-a72e65a1d49c",
                email: [
                    "email@lainnya.com"
                ],
                fk_grup: [
                    "30a2c042-a658-11ef-8f78-25bebcc62186"
                ],
                data_bank: [
                    {
                        bank_branch: "",
                        bank_name: "",
                        holder_name: "",
                        rek_no: ""
                    }
                ],
                nama: "Username Lainnya",
                nama_perusahaan: "",
                no_identitas: "",
                no_fax: "",
                no_hp: "",
                no_npwp: "",
                no_telp: "",
                nitku: "",
                piutang_max: 0,
                fk_akun_hutang: "",
                fk_akun_piutang: "",
                sapaan: "",
                syarat_pembayaran: "",
                tipe_identitas: "",
                tipe_kontak: "lainnya"
            };
        
            // Intercept the API request
            cy.intercept('POST', 'https://api-cashflow.assist.id/api/kontak/add', (req) => {
                // Log the request body to the Cypress console
                console.log('Request Body:', req.body);
        
                // Modify the response (if needed)
                req.reply({
                    statusCode: 200,
                    body: { message: "Kontak berhasil disimpan" }
                });
            }).as('addContactLainnya');
        
            // Perform UI actions
            cy.get('#tipe_kontak',{ timeout: 10000}).click(); // tipe kontak
            cy.contains('li', 'Lainnya').click();
            cy.get('#tipe_kontak').should('have.text', 'Lainnya');
        
            cy.get('#fk_grup').click(); // grup
            cy.contains('li', 'vendor obat asist 2',{ timeout: 10000}).click();
            cy.get('#fk_grup').should('have.text', 'vendor obat asist 2');
            cy.contains('li', 'Tambah Baru').click();
            cy.get('[data-testid="CloseIcon"] > path').click();
        
            cy.get('#nama').type('username lainnya'); // nama lengkap
            cy.get('input[placeholder="Masukkan alamat email"]').eq(0).type('email@lainnya.com'); // email

            cy.get('.MuiButton-contained').click();
        
            // Wait for the intercepted API request
            cy.wait('@addContactLainnya').then((interception) => {
                // Verify the request body matches the expected data
                expect(interception.request.body).to.deep.equal(expectedRequestBody);
        
                // Optionally log the interception data for debugging
                cy.log('Intercepted Request:', interception);
            });
        
            // Assert success message is displayed
            cy.get('.MuiAlert-message').should('contain.text', 'Kontak berhasil disimpan');
        });

        it.only('Input data lengkap | input grup kontak select 4 dan membuat grup baru dari dropdown, unselect 1, total 3 | menginput alamat email 7 ,dan menghapus kolom 5, sisa 2 | data bank keseluruhan input 3 kali - Memantau body request sesuai dengan ui - dan expect berhasil dengan message berhasil ', () => {
            const expectedRequestBody = {
                active_piutang_max: 0 ,
                alamat_penagihan: "",
                alamat_pengiriman: "",
                company_id: "b13e5210-8564-11ef-af27-a72e65a1d49c",
                email: [
                    "email@lainnya.com"
                ],
                fk_grup: [
                    "30a2c042-a658-11ef-8f78-25bebcc62186"
                ],
                data_bank: [
                    {
                        bank_branch: "",
                        bank_name: "",
                        holder_name: "",
                        rek_no: ""
                    }
                ],
                nama: "Username Lainnya",
                nama_perusahaan: "",
                no_identitas: "",
                no_fax: "",
                no_hp: "",
                no_npwp: "",
                no_telp: "",
                nitku: "",
                piutang_max: 0,
                fk_akun_hutang: "",
                fk_akun_piutang: "",
                sapaan: "",
                syarat_pembayaran: "",
                tipe_identitas: "",
                tipe_kontak: "lainnya"
            };
        
            // Intercept the API request
            cy.intercept('POST', 'https://api-cashflow.assist.id/api/kontak/add', (req) => {
                // Log the request body to the Cypress console
                console.log('Request Body:', req.body);
        
                // Modify the response (if needed)
                req.reply({
                    statusCode: 200,
                    body: { message: "Kontak berhasil disimpan" }
                });
            }).as('addContactLengkap');
            

            cy.get('#tipe_kontak',{ timeout: 10000}).click(); // tipe kontak
            cy.contains('li', 'Lainnya').click();
            cy.get('#tipe_kontak').should('have.text', 'Lainnya');// mengubah tipe kontak ke lainnya
        
            cy.get('#fk_grup').click(); // memilih kolom dropdown 
            cy.contains('li', 'vendor obat asist 2',{ timeout: 10000}).click(); //memilih nilai dropdown
            cy.contains('li', 'vendor obat asist 3',{ timeout: 10000}).click(); //memilih nilai dropdown
            cy.contains('li', 'vendor obat asist 4',{ timeout: 10000}).click(); //memilih nilai dropdown
            cy.contains('li', 'vendor obat asist 4',{ timeout: 10000}).click(); //menekan 2x berarti deselect nilai dropdown
            
            cy.contains('li', 'Tambah Baru').click() //menekan tambah baru
            cy.get('input[placeholder="Masukkan data baru"]').type('grup baru')
            cy.get('button[aria-label="Simpan"').click()

            cy.get('#fk_grup').click();
            cy.contains('li', 'grup baru').click()
            cy.contains('li', 'Tambah Baru').click() //menekan tambah baru
            cy.get('[data-testid="CloseIcon"] > path').click();
            
            cy.get('#fk_grup').should('have.text', 'grup baru, vendor obat asist 2, vendor obat asist 3')
        
            cy.get('#sapaan').click()
            cy.contains('li', 'Pak').click()
            cy.get('#nama').type('username lengkap'); // nama lengkap
            cy.get('#tipe_identitas').click()
            cy.contains('li', 'KTP').click()
            cy.get('#no_identitas').type('12345678910111213')
            cy.get('input[placeholder="Masukkan alamat email"]').eq(0).type('email@lengkap.com'); // email
            cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').click()
            cy.get('input[placeholder="Masukkan alamat email"]').eq(1).type('email@lengkap1.com');
            cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').click()
            cy.get('input[placeholder="Masukkan alamat email"]').eq(2).type('email@lengkap1.com');
            cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').click()
            cy.get('input[placeholder="Masukkan alamat email"]').eq(3).type('email@lengkap1.com');
            cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').click()
            cy.get('input[placeholder="Masukkan alamat email"]').eq(4).type('email@lengkap1.com');
            cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').click()
            cy.get('input[placeholder="Masukkan alamat email"]').eq(5).type('email@lengkap1.com');
            cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').click()
            cy.get('input[placeholder="Masukkan alamat email"]').eq(6).type('email@lengkap1.com');
            cy.get('.css-1ov46kg > :nth-child(7) > .MuiButtonBase-root').click()
            cy.get('.css-1ov46kg > :nth-child(6) > .MuiButtonBase-root').click()
            cy.get('.css-1ov46kg > :nth-child(5) > .MuiButtonBase-root').click()
            cy.get('.css-1ov46kg > :nth-child(4) > .MuiButtonBase-root').click()
            cy.get('.css-1ov46kg > :nth-child(3) > .MuiButtonBase-root').click()

            cy.get('#nama_perusahaan').type('nama perusahaan')
            cy.get('#no_hp').type('081234567891')
            cy.get('#no_telp').type('089876543212')
            cy.get('#no_fax').type('089876543212')
            cy.get('#no_npwp').type('081234567891')
            cy.get('#nitku').type('123456789101112')

            cy.get('input[placeholder="Masukkan alamat penagihan"]').type('jalan penagihan lengkap')
            cy.get('input[name="alamat_pengiriman"]').type('jalan pengiriman lengkap')
            cy.get(':nth-child(9) > .MuiGrid2-container > :nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click()
            cy.get('input[name="alamat_pengiriman"]').should('have.value', 'jalan penagihan lengkap').and('be.disabled')
            cy.wait(1000);
            cy.get(':nth-child(9) > .MuiGrid2-container > :nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').click()
            cy.get('input[name="alamat_pengiriman"]').clear()
                .type('jalan pengiriman lengkap')

            cy.get('[name="data_bank[0].bank_name"]')  // Menargetkan input berdasarkan name
            .type('BNI')
            cy.get('[name="data_bank[0].bank_branch"]')  // Menargetkan input berdasarkan name
             .type('6')
            cy.get('[name="data_bank[0].holder_name"]')  // Menargetkan input berdasarkan name
             .type('holder username')
            cy.get('[name="data_bank[0].rek_no"]')  // Menargetkan input berdasarkan name
             .type('1213213213253815413')
            cy.get(':nth-child(3) > .MuiCardContent-root > :nth-child(1) > .css-1st318m > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').click()
            cy.get('[name="data_bank[1].bank_name"]')  // Menargetkan input berdasarkan name
            .type('BRI')
            cy.get('[name="data_bank[1].bank_branch"]')  // Menargetkan input berdasarkan name
             .type('3')
            cy.get('[name="data_bank[1].holder_name"]')  // Menargetkan input berdasarkan name
             .type('holder username')
            cy.get('[name="data_bank[1].rek_no"]')  // Menargetkan input berdasarkan name
             .type('213123444442141214123')
            cy.get(':nth-child(3) > .MuiCardContent-root > :nth-child(1) > .css-1st318m > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').click()
            cy.get('[name="data_bank[2].bank_name"]')  // Menargetkan input berdasarkan name
            .type('BNI')
            cy.get('[name="data_bank[2].bank_branch"]')  // Menargetkan input berdasarkan name
             .type('6')
            cy.get('[name="data_bank[2].holder_name"]')  // Menargetkan input berdasarkan name
             .type('holder username')
            cy.get('[name="data_bank[2].rek_no"]')  // Menargetkan input berdasarkan name
             .type('1213213213253815413')
            cy.get(':nth-child(3) > .MuiButtonBase-root > .MuiButton-icon > [data-testid="DeleteIcon"] > path').click()

            cy.get('.MuiButtonBase-root > [data-testid="ArrowDropDownIcon"]').click()
            cy.contains('li', '1-10102 - Cadangan Kerugian Piutang').click()
            cy.get('#fk_akun_piutang').type('RANDOM')
            cy.get('.MuiAutocomplete-noOptions').should('have.text', 'No options')
            cy.get('[data-testid="CloseIcon"]').click()
            cy.get('.MuiAutocomplete-popupIndicator > [data-testid="ArrowDropDownIcon"]')
            cy.get('#fk_akun_piutang').type('1-10100 - Piutang Usaha')
            cy.get('#fk_akun_piutang-option-0').click()
            cy.get('#piutang_max').type('1234567')
            cy.get('[data-testid="input-active_piutang_max"] > .MuiButtonBase-root > .PrivateSwitchBase-input').click()
            cy.get('#syarat_pembayaran').click()
            cy.contains('li', 'termin sebulan 15').click( )

            cy.get('.MuiButton-contained').click()


            // cy.get('.MuiButton-contained').click();
        
            // Wait for the intercepted API request
            // cy.wait('@addContactLainnya').then((interception) => {
            //     // Verify the request body matches the expected data
            //     expect(interception.request.body).to.deep.equal(expectedRequestBody);
        
            //     // Optionally log the interception data for debugging
            //     cy.log('Intercepted Request:', interception);
            // });
        
            // // Assert success message is displayed
            // cy.get('.MuiAlert-message').should('contain.text', 'Kontak berhasil disimpan');
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

