describe('Testing UI dasar Halaman Daftar Akun Baru', () => {

    beforeEach(() => {
        cy.visit('https://cashflow.assist.id/auth/forgot-password')
    });
    
    it('001 - Verifikasi keberadaan dan visibilitas logo dan href:/ >> jika ditekan kembali ke page Login', () => {

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
        
    });

    it('002 - Memverifikasi keberadaan, visibilitas, dan kesesuaian teks teks judul', () => {
        cy.get('[data-testid="forgotPassword-title"]')
            .should('exist')
            .and('be.visible')
            .contains('Pulihkan Akun Sekarang')
            .then(() => {
                cy.log('Judul halaman daftar ada, terlihat, dan sesuai')
            })
    })

    it('003 - Memverifikasi keberadaan, visibilitas, dan kesesuaian teks teks subjudul', () => {
        cy.get('[data-testid="forgotPassword-subtitle"]')
            .should('exist')
            .and('be.visible')
            .contains('Masukkan email kamu sebelumnya yang sudah terdaftar')
            .then(() => {
                cy.log('Subudul halaman daftar ada, terlihat, dan sesuai')
            })
    })
    
    it('004 - Memverifikasi keberadaan, visibilitas, dan kesesuaian teks label alamat email', () => {
        cy.get('[data-testid="forgotPassword-email-label"]')
            .should('exist')
            .and('be.visible')
            .contains('Alamat email')
            .then(() => {
                cy.log('Label alamat email halaman daftar ada, terlihat, dan sesuai')
            })
    })

    it.only('005 - Memverifikasi keberadaan, visibilitas, serta kesesuaian teks atribut type dan placeholder input Alamat Email', () => {
        cy.get('#email')
            .should('exist')
            .and('be.visible')
            .and('have.attr', 'type', 'email')
            .and('have.attr', 'placeholder', 'Alamat email')
            .then(() => {
                cy.log('Input nama perusahaan ada, terlihat. Untuk atribut type[email] dan placeholder sesuai')
            })
        cy.contains('label', 'Alamat Email')
            .should('be.visible')
            .then(() => {
                cy.log('ini adalah placeholder sebelum input Alamat Email ditekan')
            })
        })

    

})