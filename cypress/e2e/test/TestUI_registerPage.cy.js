describe('Testing UI dasar Halaman Daftar Akun Baru', () => {

    beforeEach(() => {
        cy.visit('https://cashflow.assist.id/auth/register')
    });
    
    it('001 - Memverifikasi keberadaan dan visibilitas logo assist.id ada dan terlihat serta, tautan kembali ada dan halaman tidak berubah', () => {
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
    
    it('002 - Memverifikasi keberadaan, visibilitas, dan kesesuaian teks teks judul', () => {
        cy.get('[data-testid="register-initial-title"]')
            .should('exist')
            .and('be.visible')
            .contains('Daftar Akun Baru')
            .then(() => {
                cy.log('Judul halaman daftar ada, terlihat, dan sesuai')
            })
    })
    
    it('003 - Memverifikasi keberadaan, visibilitas, dan kesesuaian teks teks subjudul', () => {
        cy.get('[data-testid="register-initial-subtitle"]')
            .should('exist')
            .and('be.visible')
            .contains('Silahkan masukkan semua data dibawah ini dengan benar untuk menyelesaikan')
            .then(() => {
                cy.log('Subudul halaman daftar ada, terlihat, dan sesuai')
            })
    })
    
    it('004 - Memverifikasi keberadaan, visibilitas, dan kesesuaian teks label nama lengkap', () => {
        cy.get('[data-testid="register-field-name"] > .MuiTypography-root')
            .should('exist')
            .and('be.visible')
            .contains('Nama Lengkap')
            .then(() => {
                cy.log('Label nama lengkap halaman daftar ada, terlihat, dan sesuai')
            })
    })

    it('005 - Memverifikasi keberadaan, visibilitas, dan kesesuaian teks label nama perusahaan', () => {
        cy.get('[data-testid="register-field-company_name"] > .MuiTypography-root')
            .should('exist')
            .and('be.visible')
            .contains('Nama Perusahaan')
            .then(() => {
                cy.log('Label nama perusahaan halaman daftar ada, terlihat, dan sesuai')
            })
    })
    
    it('005 - Memverifikasi keberadaan, visibilitas, dan kesesuaian teks label no hanphone', () => {
        cy.get('[data-testid="register-field-phone"] > .MuiTypography-root')
            .should('exist')
            .and('be.visible')
            .contains('Nomor Handphone')
            .then(() => {
                cy.log('Label no hanphone halaman daftar ada, terlihat, dan sesuai')
            })
    })
    
    it('006 - Memverifikasi keberadaan, visibilitas, dan kesesuaian teks label alamat email', () => {
        cy.get('[data-testid="register-field-email"] > .MuiTypography-root')
            .should('exist')
            .and('be.visible')
            .contains('Alamat Email')
            .then(() => {
                cy.log('Label alamat email halaman daftar ada, terlihat, dan sesuai')
            })
    })
    
    it('007 - Memverifikasi keberadaan, visibilitas, dan kesesuaian teks penulisan tombol daftar sekarang', () => {
        cy.get('[data-testid="register-submit-button"]')
            .should('exist')
            .and('be.visible')
            .contains('Daftar Sekarang')
            .then(() => {
                cy.log('button daftar sekarang pada halaman daftar ada, terlihat, dan sesuai')
            })
    })

    it('008 - Memverifikasi keberadaan, visibilitas, serta kesesuaian teks atribut type dan placeholder input nama lengkap', () => {
        cy.get('#name')
            .should('exist')
            .and('be.visible')
            .and('have.attr', 'type', 'text')
            .and('have.attr', 'placeholder', 'Masukkan nama lengkapmu')
            .then(() => {
                cy.log('Input alamat email ada, terlihat. Untuk atribut type dan placeholder sesuai')
            })
        cy.contains('label', 'Nama Lengkap')
            .should('be.visible')
            .then(() => {
                cy.log('ini adalah placeholder sebelum input nama lengkap ditekan')
            })
        })
    
    it('009 - Memverifikasi keberadaan, visibilitas, serta kesesuaian teks atribut type dan placeholder input nama perusahaan', () => {
        cy.get('#company_name')
            .should('exist')
            .and('be.visible')
            .and('have.attr', 'type', 'text')
            .and('have.attr', 'placeholder', 'Masukkan nama perusahaanmu')
            .then(() => {
                cy.log('Input nama perusahaan ada, terlihat. Untuk atribut type dan placeholder sesuai')
            })
        cy.contains('label', 'Nama Perusahaan')
            .should('be.visible')
            .then(() => {
                cy.log('ini adalah placeholder sebelum input nama perusahaan ditekan')
            })
        })
    
    it('010 - Memverifikasi keberadaan, visibilitas, serta kesesuaian teks atribut type dan placeholder input Nomor Handphone', () => {
        cy.get('#phone')
            .should('exist')
            .and('be.visible')
            .and('have.attr', 'type', 'text')
            .and('have.attr', 'placeholder', '08xxxxxxxxxxx')
            .then(() => {
                cy.log('Input nama perusahaan ada, terlihat. Untuk atribut type[text] dan placeholder sesuai')
            })
        })
    
    it('011 - Memverifikasi keberadaan, visibilitas, serta kesesuaian teks atribut type dan placeholder input Alamat Email', () => {
        cy.get('#email')
            .should('exist')
            .and('be.visible')
            .and('have.attr', 'type', 'text')
            .and('have.attr', 'placeholder', 'Masukkan alamat email')
            .then(() => {
                cy.log('Input nama perusahaan ada, terlihat. Untuk atribut type[text] dan placeholder sesuai')
            })
        cy.contains('label', 'Alamat Email')
            .should('be.visible')
            .then(() => {
                cy.log('ini adalah placeholder sebelum input Alamat Email ditekan')
            })
        })
   
    it('012 - Memverifikasi keberadaan, visibilitas, serta kesesuaian teks label "sudah memiliki akun?" ', () => {
        cy.get('[data-testid="register-login-text"]')
            .should('exist')
            .and('be.visible')
            .contains('Sudah memiliki akun?')
            .then(() => {
                cy.log('Label Sudah memiliki akun ada dan terlihat serta penulisan sudah tepat')
            })
        })
        
    it.only('013 - Memverifikasi keberadaan, visibilitas, serta kesesuaian penulisan dan atribut href Button Masuk sekarang ', () => {
        cy.get('[data-testid="register-login-button"]')
            .should('exist')
            .and('be.visible')
            .and('have.attr','href', '/auth/login')
            .contains('Masuk sekarang')
            .then(() => {
                cy.log('button masuk akun ada dan terlihat serta penulisan sudah tepat')
            })
        })
})