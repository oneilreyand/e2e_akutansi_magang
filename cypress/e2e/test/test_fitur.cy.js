describe('Testing UI dasar Login Page', () => { 
    
    beforeEach(() => {
        cy.visit('https://cashflow.assist.id/')
    })

    it('001 - Memverifikasi keberadaan dan visibilitas logo assist.id ada dan terlihat serta, tautan kembali ada', () => {
        cy.get('.jss4')
            .should('exist')
            .and('be.visible')
            .then(() => {
                cy.log('Logo Assist.id ada dan terlihat')
            })
        cy.get('[href="/"]')
            .should('exist')
            .then(() => {
                cy.log('tautan kembali pada logo ada')
            })
    })

    it('002 - Memverifikasi keberadaan, visibilitas, dan kesesuaian teks judul', () => {
        cy.get('[data-testid="login-title"]')
            .should('exist')
            .and('be.visible')
            .contains('Masuk ke akunmu')
            .then(() => {
                cy.log('Judul halaman login ada, terlihat, dan sesuai')
            })
    })
    
    it('003 - Memverifikasi keberadaan, visibilitas, dan kesesuaian teks subjudul', () => {
        cy.get('[data-testid="login-subtitle"]')
            .should('exist')
            .and('be.visible')
            .contains('Masukkan email dan passwordmu yang terdaftar dibawah ini')
            .then(() => {
                cy.log('Subjudul halaman login ada, terlihat, dan sesuai')
            })
    })

    it('004 - Memverifikasi keberadaan, visibilitas, dan kesesuaian teks label untuk input alamat email', () => {
        cy.get(':nth-child(1) > .MuiFormLabel-root')
            .should('exist')
            .and('be.visible')
            .contains('Alamat email')
            .then(() => {
                cy.log('Label untuk input alamat email ada, terlihat, dan sesuai')
            })
    })
    
    it('005 - Memverifikasi keberadaan, visibilitas, serta kesesuaian atribut type dan placeholder input alamat email', () => {
        cy.get('#email')
            .should('exist')
            .and('be.visible')
            .and('have.attr', 'type', 'email')
            .and('have.attr', 'placeholder', 'Alamat email')
            .then(() => {
                cy.log('Input alamat email ada, terlihat. Untuk atribut type dan placeholder sesuai')
            })
    })

    it('006 - Memverifikasi keberadaan, visibilitas, dan kesesuaian teks label untuk input password', () => {
        cy.get(':nth-child(2) > .MuiFormLabel-root')
            .should('exist')
            .and('be.visible')
            .contains('Password')
            .then(() => {
                cy.log('Label untuk input password ada, terlihat, dan sesuai')
            })
    })

    it('007 - Memverifikasi keberadaan, visibilitas fitur hide password', () => {
        cy.get('[data-testid="VisibilityIcon"]')
            .should('exist')
            .and('be.visible')
            .then(() => {
                cy.log('fitur hide password ada dan terlihat')
            })
    })
    
    it('008 - Memverifikasi keberadaan checkbox dan visibilitas svg icon pada fitur "ingat saya" ', () => {
        cy.get('.PrivateSwitchBase-input')
            .should('exist')
            .then(() => {
                cy.log('input Checkbox ada')
            })
        cy.get('[data-testid="CheckBoxOutlineBlankIcon"]')
            .should('exist') 
            .and('be.visible')
            .find('path') 
            .should('have.attr', 'd', 'M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z')
            .and('be.visible')
            .then(() => {
              cy.log(
                'SVG Icon pada checkbox "ingat saya" terlihat karena memiliki elemen <path> dengan atribut d yang sesuai.'
              )
            })

        })

    it('009 - Memverifikasi keberadaan, visibilitas, dan kesesuaian penulisan label pada fitur "ingat saya" ', () => {
        cy.get('[data-testid="login-remember-me"] > .MuiTypography-root')
                .should('exist')
                .and('be.visible')
                .contains('Ingat saya')
                    .then( () => {
                        cy.log('label ada, terlihat, dan penulisan "Ingat saya" telah sesuai')
                    })
        })

    it('010 - Memverifikasi keberadaan, visibilitas, dan kesesuaian penulisan tombol pada fitur "lupa password" ', () => {
        cy.get('[data-testid="login-forgot-password"]')
                .should('exist')
                .and('be.visible')
                .contains('Lupa password?')
                    .then( () => {
                        cy.log('tombol ada, terlihat, dan penulisan "Lupa password?" telah sesuai')
                    })
        })
        
    it('011 - Memverifikasi keberadaan, visibilitas, dan kesesuaian penulisan tombol Masuk', () => {
        cy.get('[data-testid="login-submit-button"]')
                .should('exist')
                .and('be.visible')
                .contains('Masuk')
                    .then( () => {
                        cy.log('tombol ada, terlihat, dan penulisan "Masuk" telah sesuai')
                    })
        })

    it('012 - Memverifikasi keberadaan, visibilitas, dan kesesuaian penulisan tombol Masuk dengan Google', () => {
        cy.get('[data-testid="login-google-button"]')
                .should('exist')
                .and('be.visible')
                .contains('Masuk dengan Google')
                    .then( () => {
                        cy.log('tombol ada, terlihat, dan penulisan "Masuk dengan Google" telah sesuai')
                    })
        })

    it('013 - Memverifikasi keberadaan, visibilitas, dan kesesuaian penulisan pada label "Belum memiliki akun" ', () => {
        cy.get('.css-1xhj18k > .MuiTypography-root')
                .should('exist')
                .and('be.visible')
                .contains('Belum memiliki akun?')
                    .then( () => {
                        cy.log('tombol ada, terlihat, dan penulisan "Belum memiliki akun?" telah sesuai')
                    })
        })

    it('014 - Memverifikasi keberadaan, visibilitas, dan kesesuaian penulisan pada fitur "Daftar sekarang" ', () => {
        cy.get('[data-testid="login-register-button"]')
                .should('exist')
                .and('be.visible')
                .contains('Daftar sekarang')
                    .then( () => {
                        cy.log('tombol ada, terlihat, dan penulisan "Daftar sekarang" telah sesuai')
                    })
        })
    

})

describe('Testing fitur pada login page', () => {

    beforeEach(() => {
        cy.visit('https://cashflow.assist.id/')
    })

    it('001 - Alamat email & password kosong >> Warning email & password required muncul - Tidak dapat login', () => {
        cy.get('#email')
            .should('exist')
            .and('be.visible')
            .clear() //dipastikan isi email kosong
            .then(() =>{
                cy.log('Kolom email kosong')
            })
         cy.get('#password')
            .should('exist')
            .and('be.visible')
            .clear() //dipastikan isi password kosong
            .then(() =>{
                cy.log('Kolom password kosong')
            })
        cy.get('[data-testid="login-submit-button"]')
            .should('exist')
            .click() //tombol masuk ditekan
            .then(() => {
                cy.log('Tombol masuk ditekan')
            })
        cy.get('#email-helper-text')
            .should('exist')
            .and('be.visible')
            .contains('Email adalah bidang yang diperlukan')//muncul email-helper dengan ketentuan required
            .then(() => {
                cy.log('Peringatan bahwa email diperlukan tampil dengan benar')
            })
        cy.get('#password-helper-text')
            .should('exist')
            .and('be.visible')
            .contains('Password adalah bidang yang diperlukan') //muncul password-helper dengan ketentuan required
            .then(() => {
                cy.log('Peringatan bahwa password diperlukan tampil dengan benar')
            })
        cy.url()
            .should('eq', 'https://cashflow.assist.id/') //url halaman tidak berubah
            .then(() => {
                cy.log('Url halaman tidak berubah')
            })
    })

    it('002 - Alamat email terisi dengan alamat yang valid namun tidak terdaftar dan untuk password kosong >> Warning email tidak terlihat & password required muncul - Tidak dapat login', () => {
      
        cy.get('#email')
            .should('exist')
            .and('be.visible')
            .type('unregisteremail@gmail.co') //dipastikan email diisi dengan email yang valid namun tidak terdaftar
            .then(() =>{
                cy.log('Kolom email diisi dengan unregistered email dengan alamat yang valid')
            })
        cy.get('#password')
            .should('exist')
            .and('be.visible')
            .clear() //dipastikan isi password kosong
            .then(() =>{
                cy.log('Kolom password kosong')
            })
        cy.get('[data-testid="login-submit-button"]')
            .click() //tombol masuk ditekan
            .then(() => {
                cy.log('Tombol masuk ditekan')
            })
        cy.get('#email-helper-text')
            .should('not.be.exist') //dipastikan email helper
            .then(() => {
                cy.log('Peringatan bahwa email diperlukan tidak tampil')
            })
        cy.get('#password-helper-text')
            .should('exist')
            .and('be.visible')
            .contains('Password adalah bidang yang diperlukan')//muncul password-helper dengan ketentuan required
            .then(() => {
                cy.log('Peringatan bahwa password diperlukan tampil dengan benar')
            })
        cy.url()
            .should('eq', 'https://cashflow.assist.id/') //url halaman tidak berubah
            .then(() => {
                cy.log('Url halaman tidak berubah')
            })
    })

    it('003 - Alamat email terisi namun alamat tidak valid dan password kosong >> Warning email terlihat & password required muncul - Tidak dapat login', () => {
      
        cy.get('#email')
            .should('exist')
            .and('be.visible')
            .type('fakeemail') //dipastikan email diisi dengan alamat yang tidak valid 
            .then(() =>{
                cy.log('Kolom email diisi dengan fakeemail dan alamat yang tidak valid')
            })
        cy.get('#password')
            .should('exist')
            .and('be.visible')
            .clear() //dipastikan isi password kosong
            .then(() =>{
                cy.log('Kolom password kosong')
            })
        cy.get('[data-testid="login-submit-button"]')
            .should('exist')
            .click() //tombol masuk ditekan
            .then(() =>{
                cy.log('Tombol masuk ditekan')
            })
        cy.get('#email-helper-text')
            .should('exist')
            .and('be.visible') //dipastikan email helper muncul
            .contains('Email harus menjadi email yang valid')
            .then(() => {
                cy.log('Peringatan bahwa email diperlukan tidak tampil')
            })
        cy.get('#password-helper-text')
            .should('exist')
            .and('be.visible')
            .contains('Password adalah bidang yang diperlukan')//muncul password-helper dengan ketentuan required
            .then(() => {
                cy.log('Peringatan bahwa password diperlukan tampil dengan benar')
            })
        cy.url()
            .should('eq', 'https://cashflow.assist.id/') //url halaman tidak berubah
            .then(() => {
                cy.log('Url halaman tidak berubah')
            })
    })
    
    it('004 - Alamat email valid dan terdaftar namun password salah >> Warning email terlihat & password required muncul - Tidak dapat login', () => {
      
        cy.get('#email')
            .should('exist')
            .and('be.visible')
            .type('rayhanrayandra.work.id@gmail.com') //dipastikan email diisi
            .then(() =>{
                cy.log('Kolom email diisi dengan email dan alamat yang valid dan terdaftar')
            })
        cy.get('#password')
            .should('be.visible')
            .type('wrongpassword123') //dipastikan isi password salah
            .then(() =>{
                cy.log('Kolom password diisi dengan password yang salah')
            })
        cy.get('[data-testid="login-submit-button"]')
            .should('exist')
            .and('be.visible')
            .click() //tombol masuk ditekan
            .then(() =>{
                cy.log('Tombol masuk ditekan')
            })
        cy.get('#email-helper-text')
            .should('not.be.exist') //dipastikan email helper tidak muncul
            .then(() => {
                cy.log('Email helper tidak tampil')
            })
        cy.get('#password-helper-text')
            .should('not.be.exist') //dipastikan password helper tidak muncul
            .then(() => {
            cy.log('Password helper tidak tampil')
        })
        cy.get('.MuiAlert-message')
            .should('be.visible') //dipastikan peringatan error acount not found terlihat
            .contains('Login failed: Error: Invalid password') //validasi penulisan
            .then(() => {
                cy.log('Peringatan bahwa password salah tampil dengan benar')
            })
        cy.url()
            .should('eq', 'https://cashflow.assist.id/') //url halaman tidak berubah
            .then(() => {
                cy.log('Url halaman tidak berubah')
            })
    })

    it('005 - Alamat email valid dan terdaftar dan password benar >> Pindah halaman - Muncul notifikasi "Login Succesed" - validasi perpindahan ke halaman beranda', () => {
      
        cy.get('#email')
            .should('exist')
            .and('be.visible')
            .type('rayhanrayandra.work.id@gmail.com') //dipastikan email diisi
            .then(() =>{
                cy.log('Kolom email diisi dengan alamat yang valid dan terdaftar')
            })
        cy.get('#password')
        .should('exist')
            .and('be.visible')
            .type('Nz6}+#8y') //dipastikan isi password benar
            .then(() =>{
                cy.log('Kolom password diisi dengan password yang benar')
            })
        cy.get('[data-testid="login-submit-button"]')
            .should('exist')
            .click() //tombol masuk ditekan
            .then(() =>{
                cy.log('Tombol masuk ditekan')
            })
        cy.get('.MuiAlert-message')
            .should('not.be.exist') //dipastikan peringatan error tidak terlihat
            .then(() => {
                cy.log('Peringatan bahwa alert message tidak tampil')
            })  
        cy.url()
            .should('eq', 'https://cashflow.assist.id/admin/dashboard') //url halaman pindah ke /admin/dashboard
            .then(() => {
                cy.log('Url halaman berubah')
            })
        cy.get('.MuiAlert-message')
            .should('exist')
            .and('be.visible') //Alert terlihat 
            .contains('Login success')
            .then(() =>{
                cy.log('Alert login berhasil terlihat')
            })
        cy.get('h5', { timeout: 10000 }) // mengambil salah satu element h5
            .should('exist')
            .and('be.visible')
            .contains('Beranda')
            .then(() =>{
                cy.log('H5 dengan tulisan "Beranda" ditemukan') 
            })
    })

    it('006 - Alamat email kosong namun password terisi dengan password asal asalan >> Muncul email helper email required - Tidak dapat login', () => {
      
        cy.get('#email')
            .should('be.visible')
            .clear() //dipastikan clear
            .then(() =>{
                cy.log('Kolom email kosong')
            })
        cy.get('#password')
            .should('be.visible')
            .type('passwordasal123') //dipastikan kolom password diisi
            .then(() =>{
                cy.log('Kolom password diisi')
            })
        cy.get('[data-testid="login-submit-button"]')
            .click() //tombol masuk ditekan
            .then(() =>{
                cy.log('Tombol masuk ditekan')
            })
        cy.get('#email-helper-text')
            .should('be.visible')
            .contains('Email adalah bidang yang diperlukan')//muncul email-helper dengan ketentuan required
            .then(() => {
                cy.log('Peringatan bahwa email diperlukan tampil dengan benar')
            })
        cy.get('#password-helper-text')
            .should('not.be.exist')//tidak muncul
            .then(() => {
                cy.log('Peringatan bahwa password diperlukan tidak tampil')
            })
        cy.url()
            .should('eq', 'https://cashflow.assist.id/') //url halaman tidak berubah
            .then(() => {
                cy.log('Url halaman tidak berubah')
            })
    })

    it('007 - Alamat email kosong namun password terisi dengan salah satu password yang terdaftar >> muncul email helper email required - Tidak dapat login', () => {
      
        cy.get('#email')
            .should('be.visible')
            .clear() //dipastikan clear
            .then(() =>{
                cy.log('Kolom email kosong')
            })
        cy.get('#password')
            .should('be.visible')
            .type('Nz6}+#8y') //dipastikan kolom password diisi
            .then(() =>{
                cy.log('Kolom password diisi')
            })
        cy.get('[data-testid="login-submit-button"]')
            .click() //tombol masuk ditekan
            .then(() =>{
                cy.log('Tombol masuk ditekan')
            })
        cy.get('#email-helper-text')
            .should('be.visible')
            .contains('Email adalah bidang yang diperlukan')//muncul email-helper dengan ketentuan required
            .then(() => {
                cy.log('Peringatan bahwa email diperlukan tampil dengan benar')
            })
        cy.get('#password-helper-text')
            .should('not.be.exist') //tidak muncul
            .then(() => {
                cy.log('Peringatan bahwa password diperlukan tidak tampil')
            })
        cy.url()
            .should('eq', 'https://cashflow.assist.id/') //url halaman tidak berubah
            .then(() => {
                cy.log('Url halaman tidak berubah')
            })
    })

    it('008 - Menghapus input text setelah diisi >> placeholder terlihat ', () => {
       
        cy.get('#email') // Verifikasi placeholder awal untuk email
            .should('be.visible')
            .should('have.attr', 'placeholder', 'Alamat email') // Placeholder untuk email
            .then(() => {
                cy.log('Placeholder email terlihat sebelum input diisi dengan text yang sesuai')
            })
    
        cy.get('#email')  // Isi email, lalu kosongkan, dan verifikasi placeholder kembali terlihat
            .type('validEmail@gmail.com')
            .clear()
            .then(() => {
                cy.log('Email diisi lalu dihapus')
            })
    
        cy.get('#email') // Pastikan placeholder email kembali terlihat setelah input dihapus
            .should('have.attr', 'placeholder', 'Alamat email')
            .then(() => {
                cy.log('Placeholder email muncul kembali setelah input dihapus')
            })
        
        cy.get('#password') // Verifikasi placeholder awal untuk password
            .should('be.visible')
            .should('have.attr', 'placeholder', 'Masukkan password') // Placeholder untuk password
            .then(() => {
                cy.log('Placeholder password terlihat sebelum input diisi dengan text yang sesuai')
            })
        
        cy.get('#password') // Isi password, lalu kosongkan, dan verifikasi placeholder kembali terlihat
            .type('validpassword')
            .clear()
            .then(() => {
                cy.log('Password diisi lalu dihapus')
            })
        
        cy.get('#password') // Pastikan placeholder password kembali terlihat setelah input dihapus
            .should('have.attr', 'placeholder', 'Masukkan password')
            .then(() => {
                cy.log('Placeholder password muncul kembali setelah input dihapus')
            })
    })
    
    it('009 - Logika helper tidak muncul saat pertama kali input >> helper hanya muncul saat elemen lain dipilih (Email & Password) - helper berubah setelah ada kesalahan atau input kosong', () => {
        cy.get('#email')
            .type('invalidEmail') //dipastikan mengisi alamat yang tidak valid dalam penulisannya
            .then(() => {
                cy.log('Input pertama kali pada email') 
            })
        cy.get('#email-helper-text')
            .should('not.exist') //validasi helper tidak muncul saat pertama kali 
            .then(() => {
                cy.log('Helper tidak muncul saat input pertama kali pada email walaupun format tidak valid')
            })
        cy.wait(5000)
    
        cy.get('#email')
            .clear() // validasi bahwa input clear
            .then(() => {
                cy.log('Input email dihapus tetapi elemen lain belum diklik') //elemen lain belum di klik
            })
        cy.get('#email-helper-text')
            .should('not.exist')
            .then(() => {
                cy.log('Helper tidak muncul jika elemen lain tidak dipilih setelah input dihapus') 
            })
        cy.wait(5000)
    
        cy.get('body')
            .click()
            .then(() => {
                cy.log('Klik elemen lain setelah menghapus input email') //klik salah satu elemen contohnya body
            })
        cy.get('#email-helper-text')
            .should('be.visible')// muncul salah satu contoh helper karena sudah di trigger dengan klik elemen lain
            .contains('Email adalah bidang yang diperlukan') //kondisi input dihapus maka tulisan yang muncul adalah email required
            .then(() => {
                cy.log('Helper email muncul setelah elemen lain diklik tentunya setelah input dihapus') 
            })
        cy.wait(5000)
    
        cy.get('#email')
            .type('invalidEmail')//invalid email di ketik
            .then(() => {
                cy.log('Input email dengan format tidak valid')
            })
        cy.get('#email-helper-text')
            .should('be.visible') 
            .contains('Email harus menjadi email yang valid') // helper terlihat dengan pesan penulisan email harus valid
            .then(() => {
                cy.log('Helper muncul untuk format email salah')
            })
        cy.wait(5000)
    
        cy.get('#email')
            .type('@gmail.com') //penambahan @gmail.com agar penulisan email menjadi email yang valid
            .then(() => {
                cy.log('Input email dengan format yang valid')
            })
        cy.get('#email-helper-text')
            .should('not.exist') // helper hilang ketika semua syarat terpenuhi
            .then(() => {
                cy.log('Helper hilang setelah kembali benar')
            })
        cy.wait(5000)
    
        cy.get('#password')
            .type('password')
            .then(() => {
                cy.log('Input pertama kali pada password') // isi password 
            })
        cy.wait(5000)
    
        cy.get('#password-helper-text')
            .should('not.exist')
            .then(() => {
                cy.log('Helper tidak muncul saat input pertama kali pada password') //tidak muncul
            })
    
        cy.get('#password')
            .clear()
            .then(() => {
                cy.log('Input password dihapus tetapi elemen lain belum diklik') //clear 
            })
        cy.wait(5000)
    
        cy.get('#password-helper-text')
            .should('not.exist')
            .then(() => {
                cy.log('Helper tidak muncul jika elemen lain tidak dipilih setelah input password dihapus') //tidak muncul karena belum di trigger klik elemen lain
            })
    
        cy.get('body')
            .click()
            .then(() => {
                cy.log('Klik elemen lain setelah menghapus input password') //trigger 
            })
        cy.wait(5000)
    
        cy.get('#password-helper-text')
            .should('be.visible')
            .contains('Password adalah bidang yang diperlukan')
            .then(() => {
                cy.log('Helper password muncul setelah elemen lain diklik') //helper muncul
            })

         cy.get('#password')
            .type('p')
            .then(() => {
                cy.log('Input password') // password 
            })

        cy.get('#password-helper-text')
            .should('not.exist')
            .then(() => {
                cy.log('Helper tidak muncul sesudah password diisi walaupun satu digit atau satu char') //
            })
    })
    
    it('010 - Fitur sembunyikan password > eksistensi hitbox dan visibilitas icon bila ditekan maka akan berubah - svg-path berubah dan kolom password berubah type menjadi text(terlihat) dan type password(tak terlihat)', () => {
        
        cy.get('#password') // masukan contoh pw
            .should('be.visible')
            .type('PasswordYangBisaDibaca')
            .then(() =>{
                cy.log('Memasukkan contoh password')
            })

        cy.get('#password')
            .should('have.attr', 'type', 'password')
            .and('be.visible')
            .then(() => {
                cy.log('Password tersembunyi sebelum ikon ditekan')
            })
        cy.wait(4000);
        cy.get('[data-testid="VisibilityIcon"]') //validasi apakah icon visibility terlihat
            .should('exist')
            .and('be.visible')
            .find('path')
            .should('have.attr', 'd', 'M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5M12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5m0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3')
            .and('be.visible')
            .then(() =>{
                cy.log('validasi attribut d pada element path terlihat')
            })
        
        cy.get('button[aria-label="toggle password visibility"]') //css color:blue
            .should('exist')
            .and('be.visible') 
            .click()
            .then(() =>{
                cy.log('Hitbox button visibility ada dan terlihat ')
            })
    
        cy.get('[data-testid="VisibilityOffIcon"]') //validasi apakah icon visibility off terlihat
            .should('exist')
            .and('be.visible')
            .find('path')
            .should('have.attr', 'd', 'M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7M2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2m4.31-.78 3.15 3.15.02-.16c0-1.66-1.34-3-3-3z')
            .and('be.visible')
            .then(() =>{
                cy.log('icon berubah setelah ditekan menjadi off')
            })

        cy.get('#password')
            .should('have.attr', 'type', 'text')
            .and('be.visible')
            .then(() => {
                cy.log('Password terlihat setelah ikon ditekan')
            })
        cy.wait(4000);

        cy.get('button[aria-label="toggle password visibility"]') //css color:blue
            .should('exist')
            .and('be.visible') 
            .click()
            .then(() =>{
                cy.log('Hitbox button visibility ada dan terlihat ')
            })
        
        cy.get('[data-testid="VisibilityIcon"]') //validasi apakah icon visibility terlihat
            .should('exist')
            .and('be.visible')
            .find('path')
            .should('have.attr', 'd', 'M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5M12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5m0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3')
            .and('be.visible')
            .then(() =>{
                cy.log('icon berubah menjadi ON seperti diawal')
            })

         cy.get('#password')
            .should('have.attr', 'type', 'password')
            .and('be.visible')
            .then(() => {
                cy.log('Password tersembunyi setelah ikon ditekan seperti diawal')
            })
        })

    it('011 - Fitur Remember me > visibilitas icon dan eksistensi hitbox serta perubahan icon bila ditekan - svg checked dan uncheck', () => {
        
        cy.get('[data-testid="CheckBoxOutlineBlankIcon"]') //untuk icon tidak tercentang hanya border
            .should('exist')
            .and('be.visible')
            .find('path')
            .should('have.attr', 'd', 'M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z')
            .then(() =>{
                cy.log('Icon Border checkbox ada dan terlihat namun tidak tercentang')
            })
        
        cy.get('.PrivateSwitchBase-input[name="rememberMe"]') //untuk hitbox belum tercentang
            .should('exist')
            .and('not.be.visible')
            .and('not.be.checked') 
            .then(() => {
                cy.log('Hitbox untuk Checkbox ada dengan nilai unchecked')
        })
        cy.wait(3000)

        cy.get('.PrivateSwitchBase-input[name="rememberMe"]')
            .click() // kondisi ketika tombol ditekan

        cy.get('[data-testid="CheckBoxIcon"]') //untuk icon tercentang
            .should('exist')
            .and('be.visible')
            .find('path')
            .should('have.attr', 'd', 'M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z')
            .then(() =>{
                cy.log('Icon Border checkbox ada dan terlihat dengan kondisi tercentang')
            })

        cy.get('.PrivateSwitchBase-input[name="rememberMe"]') //untuk hitbox setelah tercentang
            .should('exist')
            .and('not.be.visible')
            .and('be.checked') 
            .then(() => {
                cy.log('Hitbox untuk Checkbox ada dengan nilai checked')
        })

    })

    it('012 - Tombol Lupa Password bila ditekan > Pindah ke halaman lupa password - Mengambil salah satu element h5 validasi perpindahan halaman', () => {
        
        cy.get('[data-testid="login-forgot-password"]') 
            .should('exist')
            .and('be.visible')
            .contains('Lupa password?') //validasi tombol lupa password
            .then(() => {
                cy.log('verifikasi visibilitas terlihat dan penulisan telah sesuai')
            })
        cy.get('[data-testid="login-forgot-password"]') 
            .click() //tombol ditekan

        cy.url()
            .should('eq', 'https://cashflow.assist.id/auth/forgot-password')
            .then(() =>{
                cy.log('Halaman berpindah') //url berubah
            })
        cy.get('h5')
            .should('include.text', 'Pulihkan Akun Sekarang')
            .and('be.visible')
            .then(()=>{
                cy.log('salah satu elemen h5 dengan keterangan Pulihkan Akun Sekarang terlihat pemindahan url sukses')
            })
    })  

    it('013 - Tombol Daftar sekarang bila ditekan > Pindah ke halaman daftar - Mengambil salah satu element h5 validasi perpindahan halaman', () => {
        
        cy.get('[data-testid="login-register-button"]') 
            .should('exist')
            .and('be.visible')
            .contains('Daftar sekarang') //validasi tombol daftar sekarang
            .then(() => {
                cy.log('verifikasi visibilitas terlihat dan penulisan telah sesuai')
            })
        cy.get('[data-testid="login-register-button"]') 
            .click() //tombol ditekan

        cy.url()
            .should('eq', 'https://cashflow.assist.id/auth/register')
            .then(() =>{
                cy.log('Halaman berpindah') //url berubah
            })
        cy.get('h5')
            .should('include.text', 'Daftar Akun Baru')
            .and('be.visible')
            .then(()=>{
                cy.log('salah satu elemen h5 dengan keterangan Pulihkan Akun Sekarang terlihat pemindahan url sukses')
            })



    })  
       
})
