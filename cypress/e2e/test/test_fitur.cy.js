describe('UI Testing dasar Login Page', () => { 
   
   
    beforeEach(() => {
        cy.visit('https://cashflow.assist.id/');
    });


    it('001 - Memverifikasi keberadaan tautan kembali pada logo', () => {
        cy.get('[href="/"]')
            .should('exist')
            .then(() => {
                cy.log('tautan pada logo ada');
            });
    });

    it('002 - Memverifikasi keberadaan dan visibilitas logo Assist.id', () => {
        cy.get('.jss4')
            .should('exist')
            .and('be.visible')
            .then(() => {
                cy.log('Logo Assist.id ada dan terlihat');
            });
    });

    it('003 - Memverifikasi keberadaan, visibilitas, dan kesesuaian teks judul', () => {
        cy.get('[data-testid="login-title"]')
            .should('exist')
            .and('be.visible')
            .contains('Masuk ke akunmu')
            .then(() => {
                cy.log('Judul halaman login ada, terlihat, dan sesuai');
            });
    });
    
    it('004 - Memverifikasi keberadaan, visibilitas, dan kesesuaian teks subjudul', () => {
        cy.get('[data-testid="login-subtitle"]')
            .should('exist')
            .and('be.visible')
            .contains('Masukkan email dan passwordmu yang terdaftar dibawah ini')
            .then(() => {
                cy.log('Subjudul halaman login ada, terlihat, dan sesuai');
            });
    });

    it('005 - Memverifikasi keberadaan, visibilitas, dan kesesuaian teks label untuk input alamat email', () => {
        cy.get(':nth-child(1) > .MuiFormLabel-root')
            .should('exist')
            .and('be.visible')
            .contains('Alamat email')
            .then(() => {
                cy.log('Label untuk input alamat email ada, terlihat, dan sesuai');
            });
    });
    
    it('006 - Memverifikasi keberadaan, visibilitas, serta kesesuaian atribut type dan placeholder input alamat email', () => {
        cy.get('#email')
            .should('exist')
            .and('be.visible')
            .and('have.attr', 'type', 'email')
            .and('have.attr', 'placeholder', 'Alamat email')
            .then(() => {
                cy.log('Input alamat email ada, terlihat. Untuk atribut type dan placeholder sesuai');
            });
    });

    it('007 - Memverifikasi keberadaan, visibilitas, dan kesesuaian teks label untuk input password', () => {
        cy.get(':nth-child(2) > .MuiFormLabel-root')
            .should('exist')
            .and('be.visible')
            .contains('Password')
            .then(() => {
                cy.log('Label untuk input password ada, terlihat, dan sesuai');
            });
    });

    it('008 - Memverifikasi keberadaan, visibilitas hide password', () => {
        cy.get('[data-testid="VisibilityIcon"]')
            .should('exist')
            .and('be.visible')
            .then(() => {
                cy.log('Icon hide password ada dan terlihat');
            });
    });
    
    it.only('009 - Memverifikasi keberadaan checkbox dan visibilitas svg icon pada fitur "ingat saya" ', () => {
        cy.get('.PrivateSwitchBase-input')
            .should('exist')
            .then(() => {
                cy.log('input Checkbox ada')
            })
        cy.get('[data-testid="CheckBoxOutlineBlankIcon"]') 
            .should('exist')
            .and('be.visible')
            .then(($svg) => {
                cy.wrap($svg).should('have.attr', 'viewBox', '0 0 24 24');
                cy.log('SVG Icon pada checkbox pada fitur "ingat saya" ada dan terlihat');
            });
    });
    
    
    

});









describe('Fitur Testing Login Page', () => {
    beforeEach(() => {
        cy.visit('https://cashflow.assist.id/');
    });

    it('001 - Jika alamat email kosong, muncul warning bahwa email required', () => {
        cy.get('#email')
            .should('be.visible')
            .clear();
        cy.get('[data-testid="login-submit-button"]')
            .click();

        cy.get('#email-helper-text')
            .should('be.visible')
            .contains('Email adalah bidang yang diperlukan')
            .then(() => {
                cy.log('Peringatan bahwa email diperlukan tampil dengan benar');
            });
    });

    it('002 - Jika password kosong, muncul warning bahwa password required', () => {
        cy.get('#password')
            .should('be.visible')
            .clear();
        cy.get('[data-testid="login-submit-button"]')
            .click();

        cy.get('#password-helper-text')
            .should('be.visible')
            .contains('Password adalah bidang yang diperlukan')
            .then(() => {
                cy.log('Peringatan bahwa password diperlukan tampil dengan benar');
            });
    });

    it('003 - Jika alamat email diisi dengan domain yang tidak valid, muncul warning bahwa email harus valid', () => {
        cy.get('#email')
            .should('be.visible')
            .type('invalidEmail');
        cy.get('[data-testid="login-submit-button"]')
            .click();

        cy.get('#email-helper-text')
            .should('be.visible')
            .contains('Email harus menjadi email yang valid')
            .then(() => {
                cy.log('Peringatan bahwa email harus valid tampil dengan benar');
            });
    });

    it('004 - Jika alamat email valid namun password kosong, muncul warning bahwa password required', () => {
        cy.get('#email')
            .should('be.visible')
            .type('validEmail@gmail.com');
        cy.get('[data-testid="login-submit-button"]')
            .click();

        cy.get('#password-helper-text')
            .should('be.visible')
            .contains('Password adalah bidang yang diperlukan')
            .then(() => {
                cy.log('Peringatan bahwa password diperlukan tampil dengan benar');
            });
    });

    it('005 - Jika alamat email valid dan password salah, muncul warning bahwa password salah', () => {
        cy.get('#email')
            .should('be.visible')
            .type('validEmail@gmail.com');
        cy.get('#password')
            .should('be.visible')
            .type('incorrectPassword');
        cy.get('[data-testid="login-submit-button"]')
            .click();

        cy.get('.MuiAlert-message')
            .should('be.visible')
            .contains('Login failed: Error: Account not found')
            .then(() => {
                cy.log('Peringatan bahwa password salah tampil dengan benar');
            });
    });

    it('006 - Fitur sembunyikan password, bila ditekan iconnya akan berubah', () => {
        cy.get('[data-testid="VisibilityIcon"]')
            .should('be.visible')
            .click();

        cy.get('[data-testid="VisibilityOffIcon"]')
            .invoke('attr', 'data-testid')
            .should('equal', 'VisibilityOffIcon')
            .then(() => {
                cy.log('Ikon berubah menjadi VisibilityOffIcon');
            });
    });

    it('007 - Fitur sembunyikan password, bila ditekan, akan memperlihatkan teks password', () => {
        cy.get('#password')
            .type('password123')
            .should('have.attr', 'type', 'password');
        cy.wait(1000);  // Memberi waktu untuk efek perubahan
        cy.get('[data-testid="VisibilityIcon"]')
            .click();

        cy.get('#password')
            .should('have.attr', 'type', 'text')
            .then(() => {
                cy.log('Password terlihat setelah ikon ditekan');
            });
    });

    it('008 - Fitur checkbox "ingat saya", bila ditekan akan menjadi checked', () => {
        cy.get('.PrivateSwitchBase-input[name="rememberMe"]')
            .should('not.be.checked');

        cy.get('.PrivateSwitchBase-input[name="rememberMe"]')
            .click()
            .should('be.checked')
            .then(() => {
                cy.log('Checkbox ditekan, menjadi checked');
            });
    });

    it('009 - Fitur lupa password', () => {
        cy.get('[data-testid="login-forgot-password"]')
            .should('exist')
            .click();

        cy.url().should('include', '/auth/forgot-password')
            .then(() => {
                cy.log('Perpindahan halaman ke halaman lupa password berhasil');
            });
    });

    it('010 - Fitur daftar baru', () => {
        cy.get('[data-testid="login-register-button"]')
            .should('exist')
            .click();

        cy.url().should('include', '/auth/register')
            .then(() => {
                cy.log('Perpindahan halaman ke halaman pendaftaran baru berhasil');
            });
    });

});
