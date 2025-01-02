describe("Negative test case dalam cashflow assist id bagian kontak", () => {
    beforeEach(() => {
        cy.loginWithUI("damaresya947@gmail.com", "12345678")
    });

    it.only("Case 1 : Mengirim form tambah kontak tanpa mengisi data apapun", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts/create")
        cy.get('.MuiButton-contained').should("be.visible").click()

        // ! pemberitahuan bahwa form harus diisi dengan benar
        cy.get('.MuiSnackbar-root > .MuiPaper-root').should("exist").contains("Mohon periksa kembali form")

        // ! pemberitahuan bahwa grup kontak bersifat wajib
        cy.get('.MuiFormControl-fullWidth > .MuiTypography-root').should("be.visible").contains("Grup Kontak harus diisi")

        // ! pemberitahuan bahwa nama lengkap harus diisi
        cy.get('#nama-helper-text').should("be.visible").contains("Nama Lengkap harus diisi")

        // ? alamat email bersifat wajib tapi dimana pemberitahuannya?
        
        // ! pemberitahuan bahwa alamat penagihan harus bersifat wajib
        cy.get(':nth-child(2) > .MuiCardContent-root > .css-1i24z3d').should("be.visible").contains("Alamat Penagihan harus diisi")

        cy.log("Form tidak bisa terkirim karena data ada yang masih kosong")
    });

    it("Case 2 : Mengirim form tambah kontak dengan nama lengkap menggunakan angka dan simbol", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts/create")
        cy.get('#nama').should("be.visible").type("nama menggunakan angka 123 @#$%")
        cy.get('.MuiButton-contained').should("be.visible").click()
        
        // ! pemberitahuan bahwa form harus diisi dengan benar
        cy.get('.MuiSnackbar-root > .MuiPaper-root').should("exist").contains("Mohon periksa kembali form")
        
        // ! pemberitahuan bahwa nama lengkap harus diisi dengan benar (hanya menerima huruf dan spasi)
        cy.get('#nama-helper-text').should("be.visible").contains("Nama Lengkap hanya boleh berisi huruf dan spasi")
        
        cy.log("Form tidak bisa terkirim karena nama lengkap mengandung angka dan simbol")
    });
    
    it("Case 3 : Mengirim alamat email yang tidak valid", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts/create")
        // todo tanpa @
        cy.get('[name="email.0"]').should("be.visible").type('testingemail.com')
        cy.get('.MuiButton-contained').should("be.visible").click()
        cy.reload()
        // todo tanpa.com
        cy.get('[name="email.0"]').should("be.visible").type('testingemail')
        cy.get('.MuiButton-contained').should("be.visible").click()
        cy.reload()
        // todo tanpa username
        cy.get('[name="email.0"]').should("be.visible").type('@email.com')
        cy.get('.MuiButton-contained').should("be.visible").click()

        // ! pemberitahuan bahwa form harus diisi dengan benar
        cy.get('.MuiSnackbar-root > .MuiPaper-root').should("exist").contains("Mohon periksa kembali form")

        cy.reload()

        // todo mencoba mengisi semua data yang diperlukan dengan benar kecuali bagian email untuk memastikan bahwa email memang diperlukan
        cy.get('#tipe_kontak').should("be.visible").click()
        cy.get('[data-value="karyawan"]').click()
        cy.get('#fk_grup').should("be.visible").click()
        cy.get('[data-value="30a2c042-a658-11ef-8f78-25bebcc62186"]').click()
        cy.get('[data-value="453ec850-a658-11ef-8f78-25bebcc62186"]').click()
        cy.get('#fk_grup').contains("vendor obat asist 2, vendor obat asist 3")
        cy.get('.css-1j4fk1t').click()
        cy.get('#sapaan').should("be.visible").click()
        cy.get('[data-value="bapak"]').click()
        cy.get('#sapaan').contains("Bapak")
        cy.get('#nama').should("be.visible").type("percobaan ")
        cy.get('#tipe_identitas').should("be.visible").click()
        cy.get('[data-value="ktp"]').click()
        cy.get('#tipe_identitas').contains("KTP")
        cy.get('#no_identitas').type("1212121212121212")
        cy.get('[placeholder="Masukkan alamat email"]').type('emailexample.com');
        cy.get('#nama_perusahaan').should("be.visible").type("perusahaan testing 1")
        cy.get('#no_hp').type("1234567890")
        cy.get('#no_telp').type("1234567890")
        cy.get('#no_fax').type("1234567890")
        cy.get('#no_npwp').type("12345678901234567890")
        cy.get('#nitku').click().type("12345678")
        cy.get("[placeholder='Masukkan alamat penagihan']").should("be.visible").type("llolololo")
        cy.get('[data-testid="input-isDetailAlamatPenagihan"] > .MuiButtonBase-root > .PrivateSwitchBase-input').should("exist").click()
        cy.get('[data-testid="input-isDetailAlamatPenagihan"] > .MuiButtonBase-root > .PrivateSwitchBase-input').should("be.checked")
        cy.get('[placeholder="Masukkan alamat pengiriman"]').should("be.visible").type("testing area 51")
        cy.get(':nth-child(9) > .MuiGrid2-container > :nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should("exist").click()
        cy.get(':nth-child(9) > .MuiGrid2-container > :nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should("be.checked")
        cy.get('[placeholder="Masukkan nama bank"]').should("exist").type("Bank indonesia")
        cy.get('[placeholder="Masukkan cabang"]').should("be.visible").type("Banyak")
        cy.get('[placeholder="Masukkan nama pemegang akun"]').should("be.visible").type("Luthfi")
        cy.get('[placeholder="Masukkan nomor rekening"]').should("be.visible").type("12345678910291")
        cy.get('#fk_akun_piutang').click();
        cy.contains('li', '1-10007 - test akun reyand').click();
        cy.get('#piutang_max').type("100000")
        cy.get('[data-testid="input-active_piutang_max"] > .MuiButtonBase-root > .PrivateSwitchBase-input').should("exist").click()
        cy.get('[data-testid="input-active_piutang_max"] > .MuiButtonBase-root > .PrivateSwitchBase-input').should("be.checked")
        cy.get('#syarat_pembayaran').click()
        cy.contains('li', 'termin sebulan 15').click();
        cy.get('#syarat_pembayaran').should("be.visible").contains("termin sebulan 15")
        cy.get('.MuiButton-contained').should("be.visible").click()

        cy.log("Form tidak dapat mengirimkan inputan karena email yang salah")
    });

    it("Case 4 : Mengirim alamat penagihan yang tidak valid", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts/create")

        // todo menggunakan angka dan simbol
        cy.get("[placeholder='Masukkan alamat penagihan']").should("be.visible").type("123 @!@#@#")
        cy.get('.MuiButton-contained').should("be.visible").click()
        
        // ! pemberitahuan bahwa form harus diisi dengan benar muncul karena data required tidak diisi
        cy.get('.MuiSnackbar-root > .MuiPaper-root').should("exist").contains("Mohon periksa kembali form")
        cy.log("form menerima alamat penagihan hanya diisi dengan angka dan simbol")
    });

    it("Case 5 : Mengisi dan mengirim form dengan nomor hp dan telepon yang tidak valid" ,() => {
        cy.visit("https://cashflow.assist.id/admin/contacts/create")

        // todo nomor hp dan telepon lebih dari 13 digit
        cy.get('#no_hp').type("12345612880128378273192803827890")
        cy.get('#no_telp').type("123456382380273827382737890")
        cy.get('.MuiButton-contained').should("be.visible").click()

        cy.get('#no_hp').type("12345612880128378273192803827890").clear()
        cy.get('#no_telp').type("123456382380273827382737890").clear()

        // todo nomor hp dan telepon menggunakan +62
        cy.get('#no_hp').type("+62 811-222-333")
        cy.get('#no_telp').type("+62 811-222-333")
        cy.get('.MuiButton-contained').should("be.visible").click()

        // ! pemberitahuan bahwa form harus diisi dengan benar muncul karena data required tidak diisi
        cy.get('.MuiSnackbar-root > .MuiPaper-root').should("exist").contains("Mohon periksa kembali form")
        cy.log("inputan pada nomor hp dan telepon menerima angka berapapun panjang digitnya tetapi mengabaikan simbol seperti +")

    });

    it("Case 6 : Menguji piutang maksimum dengan nominal yang tidak valid", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts/create")

        // todo mencoba bilangan quadriliun
        cy.get('#piutang_max').should("be.visible").type("100000000000000")
        cy.get('.MuiButton-contained').should("be.visible").click()
        
        cy.get('#piutang_max').should("be.visible").clear()
        
        // todo mencoba bilangan quintiliun
        cy.get('#piutang_max').should("be.visible").type("100000000000000000")
        cy.get('.MuiButton-contained').should("be.visible").click()
        
        cy.get('#piutang_max').should("be.visible").clear()

        // todo mencoba bilangan minus
        cy.get('#piutang_max').should("be.visible").type("-100000000000000")
        cy.get('.MuiButton-contained').should("be.visible").click()

        // todo mengisi semua data untuk memastikan tetapi angka piutang jadi minus
        cy.get('#tipe_kontak').should("be.visible").click()
        cy.get('[data-value="karyawan"]').click()
        cy.get('#fk_grup').should("be.visible").click()
        cy.get('[data-value="30a2c042-a658-11ef-8f78-25bebcc62186"]').click()
        cy.get('[data-value="453ec850-a658-11ef-8f78-25bebcc62186"]').click()
        cy.get('#fk_grup').contains("vendor obat asist 2, vendor obat asist 3")
        cy.get('.css-1j4fk1t').click()
        cy.get('#sapaan').should("be.visible").click()
        cy.get('[data-value="bapak"]').click()
        cy.get('#sapaan').contains("Bapak")
        cy.get('#nama').should("be.visible").type("percobaan ")
        cy.get('#tipe_identitas').should("be.visible").click()
        cy.get('[data-value="ktp"]').click()
        cy.get('#tipe_identitas').contains("KTP")
        cy.get('#no_identitas').type("1212121212121212")
        cy.get('[placeholder="Masukkan alamat email"]').type('email@example.com');
        cy.get('#nama_perusahaan').should("be.visible").type("perusahaan testing 1")
        cy.get('#no_hp').type("1234567890")
        cy.get('#no_telp').type("1234567890")
        cy.get('#no_fax').type("1234567890")
        cy.get('#no_npwp').type("12345678901234567890")
        cy.get('#nitku').click().type("12345678")
        cy.get("[placeholder='Masukkan alamat penagihan']").should("be.visible").type("llolololo")
        cy.get('[data-testid="input-isDetailAlamatPenagihan"] > .MuiButtonBase-root > .PrivateSwitchBase-input').should("exist").click()
        cy.get('[data-testid="input-isDetailAlamatPenagihan"] > .MuiButtonBase-root > .PrivateSwitchBase-input').should("be.checked")
        cy.get('[placeholder="Masukkan alamat pengiriman"]').should("be.visible").type("testing area 51")
        cy.get(':nth-child(9) > .MuiGrid2-container > :nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should("exist").click()
        cy.get(':nth-child(9) > .MuiGrid2-container > :nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should("be.checked")
        cy.get('[placeholder="Masukkan nama bank"]').should("exist").type("Bank indonesia")
        cy.get('[placeholder="Masukkan cabang"]').should("be.visible").type("Banyak")
        cy.get('[placeholder="Masukkan nama pemegang akun"]').should("be.visible").type("Luthfi")
        cy.get('[placeholder="Masukkan nomor rekening"]').should("be.visible").type("12345678910291")
        cy.get('#fk_akun_piutang').click();
        cy.contains('li', '1-10007 - test akun reyand').click();
        cy.get('#piutang_max').type("-100000")
        cy.get('[data-testid="input-active_piutang_max"] > .MuiButtonBase-root > .PrivateSwitchBase-input').should("exist").click()
        cy.get('[data-testid="input-active_piutang_max"] > .MuiButtonBase-root > .PrivateSwitchBase-input').should("be.checked")
        cy.get('#syarat_pembayaran').click()
        cy.contains('li', 'termin sebulan 15').click();
        cy.get('#syarat_pembayaran').should("be.visible").contains("termin sebulan 15")
        cy.get('.MuiButton-contained').should("be.visible").click()

        // ! peringatan bahwa angka piutang tidak valid
        cy.get('.MuiSnackbar-root > .MuiPaper-root').should("exist")
        
        cy.reload()

        // todo mengisi semua data tetapi bagian piutang maksimum menjadi sextiliun (10^21)
        cy.get('#tipe_kontak').should("be.visible").click()
        cy.get('[data-value="karyawan"]').click()
        cy.get('#fk_grup').should("be.visible").click()
        cy.get('[data-value="30a2c042-a658-11ef-8f78-25bebcc62186"]').click()
        cy.get('[data-value="453ec850-a658-11ef-8f78-25bebcc62186"]').click()
        cy.get('#fk_grup').contains("vendor obat asist 2, vendor obat asist 3")
        cy.get('.css-1j4fk1t').click()
        cy.get('#sapaan').should("be.visible").click()
        cy.get('[data-value="bapak"]').click()
        cy.get('#sapaan').contains("Bapak")
        cy.get('#nama').should("be.visible").type("percobaan ")
        cy.get('#tipe_identitas').should("be.visible").click()
        cy.get('[data-value="ktp"]').click()
        cy.get('#tipe_identitas').contains("KTP")
        cy.get('#no_identitas').type("1212121212121212")
        cy.get('[placeholder="Masukkan alamat email"]').type('email@example.com');
        cy.get('#nama_perusahaan').should("be.visible").type("perusahaan testing 1")
        cy.get('#no_hp').type("1234567890")
        cy.get('#no_telp').type("1234567890")
        cy.get('#no_fax').type("1234567890")
        cy.get('#no_npwp').type("12345678901234567890")
        cy.get('#nitku').click().type("12345678")
        cy.get("[placeholder='Masukkan alamat penagihan']").should("be.visible").type("llolololo")
        cy.get('[data-testid="input-isDetailAlamatPenagihan"] > .MuiButtonBase-root > .PrivateSwitchBase-input').should("exist").click()
        cy.get('[data-testid="input-isDetailAlamatPenagihan"] > .MuiButtonBase-root > .PrivateSwitchBase-input').should("be.checked")
        cy.get('[placeholder="Masukkan alamat pengiriman"]').should("be.visible").type("testing area 51")
        cy.get(':nth-child(9) > .MuiGrid2-container > :nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should("exist").click()
        cy.get(':nth-child(9) > .MuiGrid2-container > :nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should("be.checked")
        cy.get('[placeholder="Masukkan nama bank"]').should("exist").type("Bank indonesia")
        cy.get('[placeholder="Masukkan cabang"]').should("be.visible").type("Banyak")
        cy.get('[placeholder="Masukkan nama pemegang akun"]').should("be.visible").type("Luthfi")
        cy.get('[placeholder="Masukkan nomor rekening"]').should("be.visible").type("12345678910291")
        cy.get('#fk_akun_piutang').click();
        cy.contains('li', '1-10007 - test akun reyand').click();
        cy.get('#piutang_max').type("1000000000000000000000")
        cy.get('[data-testid="input-active_piutang_max"] > .MuiButtonBase-root > .PrivateSwitchBase-input').should("exist").click()
        cy.get('[data-testid="input-active_piutang_max"] > .MuiButtonBase-root > .PrivateSwitchBase-input').should("be.checked")
        cy.get('#syarat_pembayaran').click()
        cy.contains('li', 'termin sebulan 15').click();
        cy.get('#syarat_pembayaran').should("be.visible").contains("termin sebulan 15")
        cy.get('.MuiButton-contained').should("be.visible").click()

        cy.log("Piutang tidak menerima angka yang tidak valid")

    });

    // * sejauh ini masih aman terkendali


})