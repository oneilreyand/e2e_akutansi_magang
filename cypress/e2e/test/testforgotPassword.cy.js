describe("test website cashflow bagian lupa password", () => {
    beforeEach(() => {
        cy.reload();
        cy.visit('https://cashflow.assist.id/auth/forgot-password')
    })
    context("menguji ketersediaan ui pada halaman lupa password", () => {
        it("Case 1 : memastikan elemen tersedia", () => {
            // logo
            cy.get('.jss5').should("be.visible")
            // judul dan deskripsi
            cy.get('[data-testid="forgotPassword-title"]').should("be.visible")
            cy.get('[data-testid="forgotPassword-subtitle"]').should("be.visible")
            // label dan input email
            cy.get('[data-testid="forgotPassword-email-label"]').should("be.visible").contains("Alamat email")
            cy.get('#email').should("be.visible").and("have.attr", "placeholder", "Alamat email")
            // button reset link
            cy.get('[data-testid="forgotPassword-submit-button"]').should("be.visible").contains("Kirim Reset Link")
            // link ke halaman login dan aksi
            cy.get('[data-testid="forgotPassword-back-to-login-button"]').should("be.visible").contains("Kembali ke halaman login").click()
            cy.url().should("eq", "https://cashflow.assist.id/auth/login")
        })
    })
    context("menguji fungsi fungsi yang ada pada halaman lupa password", () => {
        it("Case 2 : mengisi email yang valid namun tidak terdaftar", () => {
            cy.get('#email').type("test@example.com")
            cy.get('[data-testid="forgotPassword-submit-button"]').should("be.enabled").click()
            cy.get('.MuiSnackbar-root > .MuiPaper-root').should("exist").and("have.text", "Account not found")
        })
        it("Case 3 : mengisi email yang tidak valid", () => {
            cy.get('#email').type("test")
            cy.get('[data-testid="forgotPassword-submit-button"]').should("be.enabled").click()
            cy.get('#email-helper-text').should("be.visible").contains("Email harus menjadi email yang valid")
        })
        it("Case 4 : mengisi email yang tidak lengkap", () => {
            cy.get('#email').type("test@com")
            cy.get('[data-testid="forgotPassword-submit-button"]').should("be.enabled").click()
            cy.get('.MuiSnackbar-root > .MuiPaper-root').should("exist").and("have.text", "Account not found")
            cy.log("selama ada @ maka akan web akan mengganggap email tersebut valid")
        })
        it("Case 5 : mengisi email dengan spasi", () => {
            cy.get('#email').type("test @com")
            cy.get('[data-testid="forgotPassword-submit-button"]').should("be.enabled").click()
            cy.get('.MuiSnackbar-root > .MuiPaper-root').should("exist").and("have.text", "Account not found")
            cy.log("ketika spasi ditambahkan dari pengujian maka outputnya akan tampil tanpa menggunakan spasi, tetapi ketika spasi ditambahkan secara manual maka akan muncul email harus menjadi email yang valid")
        })
        it("Case 6 : mengisi email yang terlalu panjang", () => {
            cy.get('#email').type("testdfkaloremsdfasfjsdfdadffdjadhfkdhfajsyradfnmvlfafldsjsmfdflakjflkuroyadhfkadfhladfashdfkdfhasdkfhasdkfahsdfhkfhjdfhkjasdnsdfjaehfwurfdfajfvmlfirfadljlzdjfhwqqoe3rhjjndflasdncahjfeuyfouefsfdhafeorauilfksdfadfsdfakflfhdhfosfuiwefdlskfjaefuoiafhafhaelfjsfihaeofihaldfjhoehfoafhdjfhwefaepwoifajdklcmsdnclhdschwaeijkmdks@com")
            cy.get('[data-testid="forgotPassword-submit-button"]').should("be.enabled").click()
            cy.get('.MuiSnackbar-root > .MuiPaper-root').should("exist").and("have.text", "Account not found")
        })
        it("Case 7 : mengirimkan email yang valid", () => {
            cy.get('#email').type("damaresya947@gmail.com")
            cy.get('[data-testid="forgotPassword-submit-button"]').should("be.enabled").click()
            cy.get('.MuiContainer-root').should("be.visible")
            // logo
            cy.get('.MuiContainer-root').should("be.visible")
            // gambar
            cy.get('[data-testid="forgotPassword-success-image"]')
            // judul dan deskripsi
            cy.get('[data-testid="forgotPassword-success-title"]').should("be.visible").contains("Pulihkan Password")
            cy.get('[data-testid="forgotPassword-success-message"]').should("be.visible").contains("Silahkan cek inbox di email kamu dan ikuti instruksi yang ada untuk melakukan pergantian password baru")
            cy.get('[data-testid="forgotPassword-login-button"]').should("exist").contains("Login Sekarang").click()
            cy.url().should("eq", "https://cashflow.assist.id/auth/login")
            cy.get('.MuiSnackbar-root > .MuiPaper-root').should("exist")
            cy.log("ketika email valid maka akan muncul pesan berhasil dan link reset password akan dikirimkan ke email")
        })
    })
})
