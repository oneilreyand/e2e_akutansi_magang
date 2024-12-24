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
