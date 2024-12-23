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
        it("Case 3 : Mengirimkan form login tanpa mengisi apapun", () => {
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

describe("test website cashflow bagian lupa password", () => {
    beforeEach(() => {
        cy.reload();
        cy.visit('https://cashflow.assist.id/auth/forgot-password')
    })
    context("menguji ketersediaan ui pada halaman lupa password", () => {
        it("Case 20 : memastikan elemen tersedia", () => {
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
        it("Case 21 : mengisi email yang valid namun tidak terdaftar", () => {
            cy.get('#email').type("test@example.com")
            cy.get('[data-testid="forgotPassword-submit-button"]').should("be.enabled").click()
            cy.get('.MuiSnackbar-root > .MuiPaper-root').should("exist").and("have.text", "Account not found")
        })
        it("Case 22 : mengisi email yang tidak valid", () => {
            cy.get('#email').type("test")
            cy.get('[data-testid="forgotPassword-submit-button"]').should("be.enabled").click()
            cy.get('#email-helper-text').should("be.visible").contains("Email harus menjadi email yang valid")
        })
        it("Case 23 : mengisi email yang tidak lengkap", () => {
            cy.get('#email').type("test@com")
            cy.get('[data-testid="forgotPassword-submit-button"]').should("be.enabled").click()
            cy.get('.MuiSnackbar-root > .MuiPaper-root').should("exist").and("have.text", "Account not found")
            cy.log("selama ada @ maka akan web akan mengganggap email tersebut valid")
        })
        it("Case 24 : mengisi email dengan spasi", () => {
            cy.get('#email').type("test @com")
            cy.get('[data-testid="forgotPassword-submit-button"]').should("be.enabled").click()
            cy.get('.MuiSnackbar-root > .MuiPaper-root').should("exist").and("have.text", "Account not found")
            cy.log("ketika spasi ditambahkan dari pengujian maka outputnya akan tampil tanpa menggunakan spasi, tetapi ketika spasi ditambahkan secara manual maka akan muncul email harus menjadi email yang valid")
        })
        it("Case 25 : mengisi email yang terlalu panjang", () => {
            cy.get('#email').type("testdfkaloremsdfasfjsdfdadffdjadhfkdhfajsyradfnmvlfafldsjsmfdflakjflkuroyadhfkadfhladfashdfkdfhasdkfhasdkfahsdfhkfhjdfhkjasdnsdfjaehfwurfdfajfvmlfirfadljlzdjfhwqqoe3rhjjndflasdncahjfeuyfouefsfdhafeorauilfksdfadfsdfakflfhdhfosfuiwefdlskfjaefuoiafhafhaelfjsfihaeofihaldfjhoehfoafhdjfhwefaepwoifajdklcmsdnclhdschwaeijkmdks@com")
            cy.get('[data-testid="forgotPassword-submit-button"]').should("be.enabled").click()
            cy.get('.MuiSnackbar-root > .MuiPaper-root').should("exist").and("have.text", "Account not found")
        })
        it("Case 26 : mengirimkan email yang valid", () => {
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

describe("test website cashflow bagian register", () => {
    beforeEach(() => {
        cy.reload();
        cy.visit('https://cashflow.assist.id/auth/register')
    })
    context("menguji ketersediaan ui pada halaman register", () => {
        it("Case 27 : memastikan elemen tersedia", () => {
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
        it("Case 28 : tidak mengisi apapun", () => {
            cy.get('[data-testid="register-submit-button"]').should("be.visible").click()
            cy.get('#name-helper-text').should("be.visible").contains("Nama Lengkap adalah bidang yang diperlukan")
            cy.get('#company_name-helper-text').should("be.visible").contains("Nama Perusahaan adalah bidang yang diperlukan")
            cy.get('#phone-helper-text').should("be.visible").contains("Nomor Handphone adalah bidang yang diperlukan")
            cy.get('#email-helper-text').should("be.visible").contains("Email adalah bidang yang diperlukan")
        })
        it("Case 29 : Mengisi nama lengkap dengan simbol", () => {
            cy.get('#name').type("damares ya@12132")
            cy.get('#company_name').type("perusahaan saya")
            cy.get('#phone').type("081234567890")
            cy.get('#email').type("test@email.com")
            cy.get('[data-testid="register-submit-button"]').should("be.visible").click()
            cy.log("form menerima nama lengkap dengan simbol dan angka")
        })
        it("Case 30 : Mengisi nama perusahaan dengan simbol dan angka", () => {
            cy.get('#name').type("damares ya@12132")
            cy.get('#company_name').type("perusahaan saya121212@#")
            cy.get('#phone').type("081234567890")
            cy.get('#email').type("test@email.com")
            cy.get('[data-testid="register-submit-button"]').should("be.visible").click()
            cy.log("form menerima nama perusahaan dengan simbol dan angka")
        })
        it("Case 31 : Mengisi nomor handphone dengan simbol dan huruf", () => {
            cy.get('#name').type("damares ya@12132")
            cy.get('#company_name').type("perusahaan saya")
            cy.get('#phone').type("0asqdkweed@#$")
            cy.get('#email').type("test@email.com")
            cy.get('[data-testid="register-submit-button"]').should("be.visible").click()
            cy.log("form tidak menerima huruf dan simbol, jika dipaksakan maka akan otomatis berubah menjadi angka 0")
        })
        it("Case 32 : mengisi nomor handphone dengan berawal 08", () => {
            cy.get('#name').type("damares ya@12132")
            cy.get('#company_name').type("perusahaan saya")
            cy.get('#phone').type("081234567890")
            cy.get('#email').type("test@email.com")
            cy.get('[data-testid="register-submit-button"]').should("be.visible").click()
            cy.log("form mengabaikan simbol +")
        })
        it("Case 33 : mengisi nomor handphone dengan berawal +62", () => {
            cy.get('#name').type("damares ya@12132")
            cy.get('#company_name').type("perusahaan saya")
            cy.get('#phone').type("+6281234567890")
            cy.get('#email').type("test@email.com")
            cy.get('[data-testid="register-submit-button"]').should("be.visible").click()
        })
        it("Case 34 : Mengisi email dengan simbol", () => {
            cy.get('#name').type("damares ya@12132")
            cy.get('#company_name').type("perusahaan saya")
            cy.get('#phone').type("0asqdkweed@#$")
            cy.get('#email').type("test@email@##$@com")
            cy.get('[data-testid="register-submit-button"]').should("be.visible").click()
            cy.log("form tidak menerima huruf dan simbol, jika dipaksakan maka akan otomatis berubah menjadi angka 0")
            cy.get('#email-helper-text').should("be.visible").contains("Email adalah bidang yang diperlukan")
        })
        it("Case 35 : menguji link ke halaman login", () => {
            cy.get('[data-testid="register-login-button"]').click()
            cy.url("eq", "https://cashflow.assist.id/auth/login")
        })

    })
})

describe("Pengujian Login aplikasi", () => {
    beforeEach(() => {
        cy.loginWithUI("damaresya947@gmail.com", "12345678")
    })

    context("Challenge 2", () => {
        it.only("Case 36 : mencoba membuat command baru", () => {
            cy.url().should("eq", "https://cashflow.assist.id/admin/dashboard")
        })
    })

})


