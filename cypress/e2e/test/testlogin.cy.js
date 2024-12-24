describe('test website cashflow assist id bagian login', () => {
    beforeEach(() => {
        cy.reload();
        cy.visit('https://cashflow.assist.id/')
    })

    context("Menguji ketersediaan ui pada halaman login", () => {
        it("Case 1 : memastikan halaman tersedia", () => {
            cy.get('.MuiContainer-root').should('be.visible')
        })
        it("Case 2 : memastikan semua elemen tersedia", () => {
            // mengambil logo
            cy.get('.jss4').should("be.visible")
            // mengambil judul dan deskripsi
            cy.get('[data-testid="login-title"]').should("be.visible")
            cy.get('[data-testid="login-subtitle"]').should("be.visible")
            // mengambil input email dan label
            cy.get(':nth-child(1) > .MuiFormLabel-root').should("be.visible")
            cy.get('#email').should("be.visible").and("have.attr", "placeholder", "Alamat email")
            // mengambil input password dan label
            cy.get(':nth-child(2) > .MuiFormLabel-root').should("be.visible")
            cy.get('#password').should("be.visible").and("have.attr", "placeholder", "Masukkan password")
            // mengambil icon mata
            cy.get('[data-testid="VisibilityIcon"]').should("be.visible")
            // mengambil label dan checkbox ingat saya
            cy.get('[data-testid="login-remember-me"] > .MuiTypography-root').should("be.visible").contains("Ingat saya")
            cy.get('.PrivateSwitchBase-input').should("exist")
            // mengambil lupa password
            cy.get('.PrivateSwitchBase-input').should("exist")
            // mengambil button login dan google
            cy.get('[data-testid="login-submit-button"]').should("be.visible").contains("Masuk")
            cy.get('[data-testid="login-google-button"]').should("be.visible").contains("Masuk dengan Google")
            // mengambil label dan link daftar
            cy.get('.css-1xhj18k > .MuiTypography-root').should("be.visible").contains("Belum memiliki akun?")
            cy.get('[data-testid="login-register-button"]').should("be.visible").contains("Daftar sekarang")
        })
    })

    context("Menguji fungsi fungsi yang ada pada halaman login", () => {
        it("Case 3 : Mengirimkan form login tanpa mengisi apapun ", () => {
            cy.get('[data-testid="login-submit-button"]').should("be.visible").click()
            cy.get('#email-helper-text').should("be.visible").contains("Email adalah bidang yang diperlukan")
            cy.get('#password-helper-text').should("be.visible").contains("Password adalah bidang yang diperlukan")
        })
        it("Case 4 : Mengirimkan form login dengan tanpa email", () => {
            cy.get('#password').type("password123")
            cy.get('[data-testid="login-submit-button"]').should("be.visible").click()
            cy.get('#email-helper-text').should("be.visible").contains("Email adalah bidang yang diperlukan")
        })
        it("Case 5 : Mengirimkan form login dengan tanpa password", () => {
            cy.get('#email').type("test@example.com")
            cy.get('[data-testid="login-submit-button"]').should("be.visible").click()
            cy.get('#password-helper-text').should("be.visible").contains("Password adalah bidang yang diperlukan")
        })
        it("Case 6 : tidak ada tanda @", () => {
            cy.get('#email').type("test")
            cy.get('#password').type("password123")
            cy.get('[data-testid="login-submit-button"]').should("be.visible").click()
            cy.get('#email-helper-text').should("be.visible").contains("Email harus menjadi email yang valid")
        })

        it("Case 7 : menggunakan simbol", () => {
            cy.get('#email').type("test#@exampl.com")
            cy.get('#password').type("password123")
            cy.get('[data-testid="login-submit-button"]').should("be.visible").click()
            cy.get('.MuiSnackbar-root > .MuiPaper-root').should("exist").and("have.text", "Login failed: Error: Account not found")
            cy.log("form menerima email dengan simbol")
        })

        it("Case 8 : email yang kurang lengkap", () => {
            cy.get('#email').type("test@com")
            cy.get('#password').type("password123")
            cy.get('[data-testid="login-submit-button"]').should("be.visible").click()
            cy.get('.MuiSnackbar-root > .MuiPaper-root').should("exist").and("have.text", "Login failed: Error: Account not found")
            cy.log("form menerima email yang kurang lengkap asalkan ada @")
        })

        it("Case 9 : email dengan spasi", () => {
            cy.get('#email').type("test @com")
            cy.get('#password').type("password123")
            cy.get('[data-testid="login-submit-button"]').should("be.visible").click()
            cy.get('.MuiSnackbar-root > .MuiPaper-root').should("exist").and("have.text", "Login failed: Error: Account not found")
            cy.log("form mengabaikan spasi pada email, jika spasi ditambahkan secara manual maka akan muncul email harus menjadi email yang valid")
        })

        it("Case 10 : email terlalu panjang", () => {
            cy.get('#email').type("testdfkaepwoifajdklcmsdnclhdschwaeijkmdks@com")
            cy.get('#password').type("password123")
            cy.get('[data-testid="login-submit-button"]').should("be.visible").click()
            // kalau akunnya ada
            // cy.url().should("eq", "https://cashflow.assist.id/admin/dashboard")
            // kalau tidak ada maka akan muncul pesan error
            cy.get('.MuiSnackbar-root > .MuiPaper-root').should("exist").and("have.text", "Login failed: Error: Account not found")
        })
        // note : halaman login akan tetap menerima email yang kurang lengkap, selama ada @

        it("Case 11 : password yang terlalu pendek", () => {
            cy.get('#email').type("test@example.com")
            cy.get('#password').type("1")
            cy.get('[data-testid="login-submit-button"]').should("be.visible").click()
            cy.get('.MuiSnackbar-root > .MuiPaper-root').should("exist").and("have.text", "Login failed: Error: Account not found")
        })

        it("Case 12 : password dengan 5 digit", () => {
            cy.get('#email').type("test@example.com")
            cy.get('#password').type("12345")
            cy.get('[data-testid="login-submit-button"]').should("be.visible").click()
            cy.get('.MuiSnackbar-root > .MuiPaper-root').should("exist").and("have.text", "Login failed: Error: Account not found")
        })

        // password > 8 digit dengan simbol dan huruf
        it("Case 13 : password > 8 digit dengan simbol dan huruf", () => {
            cy.get('#email').type("test@example.com")
            cy.get('#password').type("12345dfjkasfe!@#232")
            cy.get('[data-testid="login-submit-button"]').should("be.visible").click()
            cy.get('.MuiSnackbar-root > .MuiPaper-root').should("exist").and("have.text", "Login failed: Error: Account not found")

        })
        // note : halaman login akan tetap menerima password berapapun jumlah digitnya selama akunnya ada maka akan lanjut ke halaman login

        it("Case 14 : Melihat password yang sudah diisi dengan menekan icon mata", () => {
            cy.get('#password').type("password")
            cy.get('[data-testid="VisibilityIcon"]', { timeout: 10000 })
                .should('be.visible')
                .click()
            cy.get('#password')
                .should('be.visible')
                .and('have.value', 'password')
        })

        it("Case 15 : Menekan icon remember me", () => {
            cy.get('.PrivateSwitchBase-input').click({ force: true }).should('be.checked')
        })

        it("Case 16 : memeriksa lupa password dan form tersedia", () => {
            cy.get('[data-testid="login-forgot-password"]').should("be.visible").click()
            cy.url().should("eq", "https://cashflow.assist.id/auth/forgot-password")
            cy.get('.MuiPaper-root').should("be.visible")
        })

        it("Case 17 : memeriksa login menggunakan google", () => {
            cy.get('[data-testid="login-google-button"]').click()
            // cy.url().should("eq", "https://accounts.google.com/signin")
            cy.log("url akun google tidak terdeteksi")
        })

        it("case 18 : memeriksa register account", () => {
            cy.get('[data-testid="login-register-button"]').click()
            cy.url().should("eq", "https://cashflow.assist.id/auth/register")
            cy.get('.MuiPaper-root').should("be.visible")
        })

        it("Case 19 : login dengan email dan password yang benar", () => {
            cy.get('#email').type("damaresya947@gmail.com")
            cy.get('#password').type("12345678")
            cy.get('[data-testid="login-submit-button"]').should("be.visible").click()
            cy.url().should("eq", "https://cashflow.assist.id/admin/dashboard")
        })
    })

})




