describe("Negative test case dalam cashflow assist id bagian kontak", () => {
    beforeEach(() => {
        cy.loginWithUI("damaresya947@gmail.com", "12345678")
    });

    it("Case 1 : Mengirim form tambah kontak tanpa mengisi data apapun", () => {
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

    it("Case 5 : Mengisi dan mengirim form dengan nomor hp dan telepon yang tidak valid", () => {
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

        cy.get('.MuiSnackbar-root > .MuiPaper-root').should("exist")
    });

    it("Case 7 : mencoba mengisi KTP dengan nilai yang salah", () => {
        // todo mengisi nomor ktp dengan 2 digit

        cy.visit("https://cashflow.assist.id/admin/contacts/create")
        cy.get('#fk_grup').should("be.visible").click()
        cy.get('[data-value="30a2c042-a658-11ef-8f78-25bebcc62186"]').click()
        cy.get('.css-1j4fk1t').click()
        cy.get('#nama').should("be.visible").type("hello world ")
        cy.get('#tipe_identitas').should("be.visible").click()
        cy.get('[data-value="ktp"]').click()
        cy.get('#tipe_identitas').contains("KTP")
        cy.get('#no_identitas').type("01")
        cy.get('[placeholder="Masukkan alamat email"]').type('email@example.com')
        cy.get("[placeholder='Masukkan alamat penagihan']").should("be.visible").type("llolololo")
        cy.get('.MuiButton-contained').should("be.visible").click()

        // ! form menerima nomor ktp meski hanya 2 digit

        // todo mengisi nomor ktp dengan > 16 digit
        cy.visit("https://cashflow.assist.id/admin/contacts/create")
        // cy.get('.css-aidtzz > .MuiButtonBase-root').should("exist").click()
        cy.get('#fk_grup').should("be.visible").click()
        cy.get('[data-value="30a2c042-a658-11ef-8f78-25bebcc62186"]').click()
        cy.get('.css-1j4fk1t').click()
        cy.get('#nama').should("be.visible").type("lutihe ")
        cy.get('#tipe_identitas').should("be.visible").click()
        cy.get('[data-value="ktp"]').click()
        cy.get('#tipe_identitas').contains("KTP")
        cy.get('#no_identitas').type("01348238748273498238029834")
        cy.get('[placeholder="Masukkan alamat email"]').type('email@example.com')
        cy.get("[placeholder='Masukkan alamat penagihan']").should("be.visible").type("llolololo")
        cy.get('.MuiButton-contained').should("be.visible").click()

        // ! form menerima nomor ktp meski lebih dari 16 digit

        cy.log("form seharusnya tidak menerima nomor ktp apabila lebih atau kurang dari 16 digit")

    });

    it("Case 8 : mencoba mengisi nilai sim", () => {
        // todo mengisi nilai sim dengan 2 digit
        cy.visit("https://cashflow.assist.id/admin/contacts/create")
        cy.get('#fk_grup').should("be.visible").click()
        cy.get('[data-value="30a2c042-a658-11ef-8f78-25bebcc62186"]').click()
        cy.get('.css-1j4fk1t').click()
        cy.get('#nama').should("be.visible").type("lutihe ")
        cy.get('#tipe_identitas').should("be.visible").click()
        cy.get('[data-value="sim"]').click()
        cy.get('#tipe_identitas').contains("SIM")
        cy.get('#no_identitas').type("00")
        cy.get('[placeholder="Masukkan alamat email"]').type('email@example.com')
        cy.get("[placeholder='Masukkan alamat penagihan']").should("be.visible").type("llolololo")
        cy.get('.MuiButton-contained').should("be.visible").click()

        // ! form menerima nomor sim meski hanya 2 digit
        cy.log("form seharusnya tidak menerima nomor sim apabila lebih atau kurang dari 16 digit jika mengikuti standar indonesia terbaru yang dimana nomor sim sesuai dengan nik")

    });

    it("Case 9 : mencoba mengisi nilai paspor", () => {
        // todo mengisi nilai paspor dengan 2 digit
        cy.visit("https://cashflow.assist.id/admin/contacts/create")
        cy.get('#fk_grup').should("be.visible").click()
        cy.get('[data-value="30a2c042-a658-11ef-8f78-25bebcc62186"]').click()
        cy.get('.css-1j4fk1t').click()
        cy.get('#nama').should("be.visible").type("lutihe ")
        cy.get('#tipe_identitas').should("be.visible").click()
        cy.get('[data-value="paspor"]').click()
        cy.get('#tipe_identitas').contains("Paspor")
        cy.get('#no_identitas').type("00")
        cy.get('[placeholder="Masukkan alamat email"]').type('email@example.com')
        cy.get("[placeholder='Masukkan alamat penagihan']").should("be.visible").type("llolololo")
        cy.get('.MuiButton-contained').should("be.visible").click()

        // ! form menerima nomor paspor meski hanya 2 digit
    });

    it("Case 10 : Mencoba mencari data yang ada pada tabel dengan menggunakan id pada tabel karyawan", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts")
        cy.wait(1000)
        cy.get('#simple-tab-2').should("be.visible").click()

        // todo menggunakan id yang tersedia
        const idYangDicari = '41fd7172-c8b1-11ef-b4d6-814f37804472'; 
        let idDitemukan = false; 
        cy.get('.css-k27tlm > .MuiPaper-root').each(($row) => {
            const idBaris = $row.find('td').first().text().trim();

            if (idBaris === idYangDicari) {
                idDitemukan = true;
                cy.log(`ID ${idYangDicari} ditemukan!`);
                cy.wrap($row).find('td').eq(2).should('have.text', '41fd7172-c8b1-11ef-b4d6-814f37804472'); 
                return false; 
            }
        }).then(() => {

            if (!idDitemukan) {
                cy.log(`ID ${idYangDicari} tidak ditemukan.`);
            }
        });
    });

    it("Case 11 : Mencoba mencari data yang ada pada tabel lainnya menggunakan nama lengkap yang ada", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts")
        cy.wait(1000)
        cy.get('#simple-tab-2').should("be.visible").click()

        // todo mencari data menggunakan kolom pencarian
        cy.get('[data-testid="search-input"] > .MuiInputBase-root').should("be.visible").type("Percobaan")
        cy.get('.css-k27tlm > .MuiPaper-root').then(($el) => {
            if ($el.length <= 0) {
                cy.log(`Elemen ditemukan.`);
            } else {
                cy.log(`Elemen tidak ditemukan.`);
            }
          });

        cy.reload()
        cy.get('#simple-tab-2').should("be.visible").click()

        // todo langsung mengambil data yang ada ditabel

        cy.get('.css-k27tlm > .MuiPaper-root').contains("Percobaan").then(($el) => {
            if ($el.length >= 0) {
                cy.log(`Elemen ditemukan.`);
            } else {
                cy.log(`Elemen tidak ditemukan.`);
            }
          });
    });

    it("Case 12: Mencoba mencari data yang ada pada tabel karyawan menggunakan grup kontak yang ada", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts")
        cy.wait(1000)
        cy.get('#simple-tab-2').should("be.visible").click()

        // todo mencari data menggunakan kolom pencarian
        cy.get('[data-testid="search-input"] > .MuiInputBase-root').type("grup baru")
        cy.get('.css-k27tlm > .MuiPaper-root').then(($el) => {
            if ($el.length <= 0) {
                cy.log(`Elemen ditemukan.`);
            } else {
                cy.log(`Elemen tidak ditemukan.`);
            }
          });
        cy.log("Data dalam tabel tidak bisa dicari jika menggunakan grup kontak")
    });

    it("Case 13 : Mencoba mencari data yang ada pada tabel karyawan menggunakan email yang ada", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts")
        cy.wait(1000)
        cy.get('#simple-tab-2').should("be.visible").click()

        // todo mencari data menggunakan kolom pencarian
        cy.get('[data-testid="search-input"] > .MuiInputBase-root').type("testing@example.com")
        cy.get('.css-k27tlm > .MuiPaper-root').then(($el) => {
            if ($el.length > 0) {
                cy.log(`Elemen ditemukan.`);
            } else {
                cy.log(`Elemen tidak ditemukan.`);
            }
          });


        cy.reload()
        cy.get('#simple-tab-2').should("be.visible").click()

        // todo langsung mengambil data yang ada ditabel

        cy.get('.MuiTableBody-root > :nth-child(2) > :nth-child(4)').and("have.text", "testing@example.com1234567890").then(($el) => {
            if ($el.length > 0) {
                cy.log(`Elemen ditemukan.`);
            } else {
                cy.log(`Elemen tidak ditemukan.`);
            }
          });

        cy.log("Data dalam tabel bisa dicari jika menggunakan email")
    });

    it("Case 14 : Mencoba mencari data yang ada pada tabel karyawan menggunakan nomor hp yang ada", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts")
        cy.wait(1000)
        cy.get('#simple-tab-2').should("be.visible").click()

        // todo mencari data menggunakan kolom pencarian
        cy.get('[data-testid="search-input"] > .MuiInputBase-root').type("123567890")
        cy.get('.css-k27tlm > .MuiPaper-root').then(($el) => {
            if ($el.length <= 0) {
                cy.log(`Elemen ditemukan.`);
            } else {
                cy.log(`Elemen tidak ditemukan.`);
            }
          });
        cy.log("Data dalam tabel tidak bisa dicari jika menggunakan no hp")
    });

    it("Case 15 : Mencoba mencari data yang ada pada tabel lainnya menggunakan grup kontak yang ada", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts")
        cy.wait(1000)
        cy.get('#simple-tab-3').should("be.visible").click()

        // todo mencari data menggunakan kolom pencarian
        cy.get('[data-testid="search-input"] > .MuiInputBase-root').type("grup baru")
        cy.get('.css-k27tlm > .MuiPaper-root').then(($el) => {
            if ($el.length <= 0) {
                cy.log(`Elemen ditemukan.`);
            } else {
                cy.log(`Elemen tidak ditemukan.`);
            }
          });
        cy.log("Data dalam tabel tidak bisa dicari jika menggunakan grup kontak")
    });

    it("Case 16 : Mencoba mencari data yang ada pada tabel karyawan menggunakan nama lengkap yang ada", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts")
        cy.wait(1000)
        cy.get('#simple-tab-3').should("be.visible").click()

        // todo mencari data menggunakan kolom pencarian
        cy.get('[data-testid="search-input"] > .MuiInputBase-root').should("be.visible").type("Percobaan")
        cy.get('.css-k27tlm > .MuiPaper-root').then(($el) => {
            if ($el.length <= 0) {
                cy.log(`Elemen ditemukan.`);
            } else {
                cy.log(`Elemen tidak ditemukan.`);
            }
          });

        cy.reload()
        cy.get('#simple-tab-3').should("be.visible").click()

        // todo langsung mengambil data yang ada ditabel

        cy.get('.css-k27tlm > .MuiPaper-root').contains("Fake Contact").then(($el) => {
            if ($el.length >= 0) {
                cy.log(`Elemen ditemukan.`);
            } else {
                cy.log(`Elemen tidak ditemukan.`);
            }
          });
    });

    it("Case 17: Mencoba mencari data yang ada pada tabel lainnya menggunakan email yang ada", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts");
      
        cy.get('#simple-tab-3').should("be.visible").click();
      
        cy.get('[data-testid="search-input"] > .MuiInputBase-root').type("j@e");
      
        cy.get('.css-k27tlm > .MuiPaper-root').then(($el) => {
          if ($el.length > 0) {
            cy.log('Elemen ditemukan.');
          } else {
            cy.log('Elemen tidak ditemukan.');
          }
        });
    });

    it("Case 18 : Mencoba mencari data yang ada pada tabel lainnya menggunakan nomor hp yang ada", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts")
        cy.wait(1000)
        cy.get('#simple-tab-3').should("be.visible").click()

        // todo mencari data menggunakan kolom pencarian
        cy.get('[data-testid="search-input"] > .MuiInputBase-root').type("123567890")
        cy.get('.css-k27tlm > .MuiPaper-root').then(($el) => {
            if ($el.length <= 0) {
                cy.log(`Elemen ditemukan.`);
            } else {
                cy.log(`Elemen tidak ditemukan.`);
            }
          });
        cy.log("Data dalam tabel tidak bisa dicari jika menggunakan no hp")
    });
      

    

});