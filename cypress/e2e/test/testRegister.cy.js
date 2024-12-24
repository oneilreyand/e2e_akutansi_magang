describe("test website cashflow bagian register", () => {
    beforeEach(() => {
        cy.reload();
        cy.visit('https://cashflow.assist.id/auth/register')
    })
    context("menguji ketersediaan ui pada halaman register", () => {
        it("Case 1 : memastikan elemen tersedia", () => {
            cy.get('.MuiContainer-root').should("be.visible")
            // logo
            cy.get('.jss4').should("be.visible")
            // judul dan deskripsi
            cy.get('[data-testid="register-initial-title"]').should("be.visible").contains("Daftar Akun Baru")
            cy.get('[data-testid="register-initial-subtitle"]').should("be.visible").contains("Silahkan masukkan semua data dibawah ini dengan benar untuk menyelesaikan")
            // label dan input nama lengkap
            cy.get('[data-testid="register-field-name"] > .MuiTypography-root').should("be.visible").contains("Nama Lengkap")
            cy.get('#name').should("be.visible").and("have.attr", "placeholder", "Masukkan nama lengkapmu")
            // label dan input nama perusahaan
            cy.get('[data-testid="register-field-company_name"] > .MuiTypography-root').should("be.visible").contains("Nama Perusahaan")
            cy.get('#company_name').should("be.visible").and("have.attr", "name", "company_name").and("have.attr", "placeholder", "Masukkan nama perusahaanmu")
            // label dan input nomor handphone
            cy.get('[data-testid="register-field-phone"] > .MuiTypography-root').should("be.visible").contains("Nomor Handphone")
            cy.get('#phone').should("be.visible").and("have.attr", "placeholder", "08xxxxxxxxxxx")
            // label dan input alamat email
            cy.get('[data-testid="register-field-email"] > .MuiTypography-root').should("be.visible").contains("Alamat Email")
            cy.get('#email').should("be.visible").and("have.attr", "placeholder", "Masukkan alamat email")
            // tombol
            cy.get('[data-testid="register-submit-button"]').should("be.visible").contains("Daftar Sekarang")
            // link ke halaman login
            cy.get('[data-testid="register-login-text"]').should("be.visible").contains("Sudah memiliki akun?")
            cy.get('[data-testid="register-login-button"]').should("be.visible").contains("Masuk sekarang")
            cy.log("semua elemen tersedia, namun placeholder pada nama, perusahaan, dan alamat email tidak sesuai dengan yang diharapkan")
        })
    })
    context("menguji fungsi fungsi yang ada pada halaman register", () => {
        it("Case 2 : tidak mengisi apapun", () => {
            cy.get('[data-testid="register-submit-button"]').should("be.visible").click()
            cy.get('#name-helper-text').should("be.visible").contains("Nama Lengkap adalah bidang yang diperlukan")
            cy.get('#company_name-helper-text').should("be.visible").contains("Nama Perusahaan adalah bidang yang diperlukan")
            cy.get('#phone-helper-text').should("be.visible").contains("Nomor Handphone adalah bidang yang diperlukan")
            cy.get('#email-helper-text').should("be.visible").contains("Email adalah bidang yang diperlukan")
        })
        it("Case 3 : Mengisi nama lengkap dengan simbol", () => {
            cy.get('#name').type("damares ya@12132")
            cy.get('#company_name').type("perusahaan saya")
            cy.get('#phone').type("081234567890")
            cy.get('#email').type("test@email.com")
            cy.get('[data-testid="register-submit-button"]').should("be.visible").click()
            cy.log("form menerima nama lengkap dengan simbol dan angka")
        })
        it("Case 4 : Mengisi nama perusahaan dengan simbol dan angka", () => {
            cy.get('#name').type("damares ya@12132")
            cy.get('#company_name').type("perusahaan saya121212@#")
            cy.get('#phone').type("081234567890")
            cy.get('#email').type("test@email.com")
            cy.get('[data-testid="register-submit-button"]').should("be.visible").click()
            cy.log("form menerima nama perusahaan dengan simbol dan angka")
        })
        it("Case 5 : Mengisi nomor handphone dengan simbol dan huruf", () => {
            cy.get('#name').type("damares ya@12132")
            cy.get('#company_name').type("perusahaan saya")
            cy.get('#phone').type("0asqdkweed@#$")
            cy.get('#email').type("test@email.com")
            cy.get('[data-testid="register-submit-button"]').should("be.visible").click()
            cy.log("form tidak menerima huruf dan simbol, jika dipaksakan maka akan otomatis berubah menjadi angka 0")
        })
        it("Case 6 : mengisi nomor handphone dengan berawal 08", () => {
            cy.get('#name').type("damares ya@12132")
            cy.get('#company_name').type("perusahaan saya")
            cy.get('#phone').type("081234567890")
            cy.get('#email').type("test@email.com")
            cy.get('[data-testid="register-submit-button"]').should("be.visible").click()
            cy.log("form mengabaikan simbol +")
        })
        it("Case 7 : mengisi nomor handphone dengan berawal +62", () => {
            cy.get('#name').type("damares ya@12132")
            cy.get('#company_name').type("perusahaan saya")
            cy.get('#phone').type("+6281234567890")
            cy.get('#email').type("test@email.com")
            cy.get('[data-testid="register-submit-button"]').should("be.visible").click()
        })
        it("Case 8 : Mengisi email dengan simbol", () => {
            cy.get('#name').type("damares ya@12132")
            cy.get('#company_name').type("perusahaan saya")
            cy.get('#phone').type("0asqdkweed@#$")
            cy.get('#email').type("test@email@##$@com")
            cy.get('[data-testid="register-submit-button"]').should("be.visible").click()
            cy.log("form tidak menerima huruf dan simbol, jika dipaksakan maka akan otomatis berubah menjadi angka 0")
            cy.get('#email-helper-text').should("be.visible").contains("Email adalah bidang yang diperlukan")
        })
        it("Case 9 : menguji link ke halaman login", () => {
            cy.get('[data-testid="register-login-button"]').click()
            cy.url("eq", "https://cashflow.assist.id/auth/login")
        })

    })
})