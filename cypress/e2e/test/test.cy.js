describe('test website cashflow assist id bagian login', () => {
    beforeEach(() => {
        cy.visit('https://cashflow.assist.id/')
    })
    // test case 1
    it('tes halaman login kalau email diisi tanpa password', () => {
        cy.get('#email')
            .should('be.visible')
            .type('testing@email.com')
        cy.get('[data-testid="login-submit-button"]')
            .click()
        cy.get('#password-helper-text')
            .should('be.visible')
            .and('contain', 'Password adalah bidang yang diperlukan')
    })
    // test case 2
    it('tes halaman login ketika email salah dalam penulisan', () => {
        cy.get('#email')
            .should('be.visible')
            .type('tes tignemailcom')
        cy.get('[data-testid="login-submit-button"]')
            .click()
        cy.get('#email-helper-text')
            .should('be.visible').contains("Email harus menjadi email yang valid")
    })
    // test case 3
    it('ketika tidak mengisi apapun', () => {
        cy.get('#email').should('be.visible')
        cy.get('[data-testid="login-submit-button"]')
            .should('be.visible')
            .click()
        cy.get('#email-helper-text')
            .contains('Email adalah bidang yang diperlukan')
            .should('be.visible')
        cy.get('#password-helper-text')
            .contains('Password adalah bidang yang diperlukan')
            .should('be.visible')
    })
    // test case 4
    it('ketika login menggunakan akun yang salah atau tidak ada', () => {
        cy.get('#email')
            .should('be.visible')
            .type("testing@email.com")
        cy.get('#password')
            .should('be.visible')
            .type("password")
        cy.get('[data-testid="login-submit-button"]')
            .should('be.visible')
            .click()
        cy.get('.MuiSnackbar-root > .MuiPaper-root')
            .should('be.visible')
            .contains('Login failed: Error: Account not found')
    })
    // test case 5
    it('ketika hanya mengisi password', () => {
        cy.get('#password')
            .should('be.visible')
            .type("password")
        cy.get('[data-testid="login-submit-button"]')
            .should('be.visible')
            .click()
        cy.get('#email-helper-text')
            .contains('Email adalah bidang yang diperlukan')
            .should('be.visible')
    })
    // test case 6
    it('memeriksa icon mata pada password', () => {
        cy.get('#password')
            .should('be.visible')
            .type('password')
        cy.get('[data-testid="VisibilityIcon"]', { timeout: 10000 })
            .should('be.visible')
            .click()
        cy.get('#password')
            .should('be.visible')
            .and('have.value', 'password')
    })
    // test case 7
    it('mencoba menekan checkbox remember me', () => {
        cy.get('.PrivateSwitchBase-input')
            .click({ force: true })
    })
    // test case 8
    it('memeriksa placeholder bagian alamat email', () => {
        cy.get('input[type="email"]')
            .should('be.visible')
            .should('have.attr', 'placeholder', "Alamat email")
    })
    // test case 9
    it('memeriksa placeholder bagian password', () => {
        cy.get('input[type="password"]')
            .should('be.visible')
            .should('have.attr', 'placeholder', "Masukkan password")
    })
    // test case 10
    it('memeriksa form apakah tersedia atau tidak', () => {
        cy.get('form')
            .should('exist')
    })
    // test case 11
    it('memeriksa apakah label dan kolom username tersedia', () => {
        cy.get('label')
            .contains("Alamat email")
        cy.get('input[type="email"]')
            .should('exist')
    })
    // test case 12
    it('memeriksa apakah label dan kolom password tersedia', () => {
        cy.get('label')
            .contains("Password")
        cy.get('input[type="password"]')
            .should('exist')
    })
    // test case 13
    it('memeriksa halaman lupa password', () => {
        cy.get('[data-testid="login-forgot-password"]')
            .should('be.visible')
            .click()
        cy.url()
            .should('include', 'https://cashflow.assist.id/auth/forgot-password')
    })
    // test case 14
    it('memeriksa apakah button login tersedia', () => {
        cy.get('[data-testid="login-submit-button"]')
            .should('be.visible')
            .invoke('text')
            .should('eq', 'Masuk')
    })
    // test case 15
    it('memeriksa apakah tombol login dengan google tersedia', () => {
        cy.get('[data-testid="login-google-button"]')
            .should('be.visible')
            .invoke('text')
            .should('eq', 'Masuk dengan Google')
        cy.get('[data-testid="login-google-button"]')
            .click()
    })
    // test case 16
    it.only('memeriksa bagian register', () => {
        cy.get('[data-testid="login-register-button"]')
            .should('be.visible')
            .invoke('text')
            .should('eq', 'Daftar sekarang')
        cy.get('[data-testid="login-register-button"]')
            .click()
    })
})