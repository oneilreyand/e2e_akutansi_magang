describe("Menguji Bagian Karyawan pada website Cashflow Assist id dihalaman Kontak", () => {
    const email = "damaresya947@gmail.com";
    const password = "12345678";

    beforeEach(() => {
        cy.loginWithApi(email, password);
    });

    it("Case 1 : mengunjungi website cashflow bagian kontak", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts")
        cy.log("Halaman tersedia dan berhasil dikunjungi")
        cy.wait(2000)
    });

    it("Case 2 : memeriksa ketersediaan UI pada halaman kontak", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts")

        //* logo
        cy.get('[data-testid="appbar-logo"]')
            .should("exist")

        //* profile
        cy.get('[data-testid="appbar-profile-button"]')
            .should("be.visible")
            .and(($profile) => {
                expect($profile).to.contain("User")
                expect($profile).to.contain("Muhammad Luthfiandra")
            })

        //* icon
        cy.get('[data-testid="appbar-menu-button"]').should("be.visible").click()
        cy.get('[data-testid="drawer-item-dashboard"]').should("be.visible").contains("Beranda")
        cy.get('[data-testid="drawer-item-reports"]').should("be.visible").contains("Laporan")
        cy.get('[data-testid="drawer-item-cash-bank"]').should("be.visible").contains("Kas & Bank")
        cy.get('[data-testid="drawer-item-sales"]').should("be.visible").contains("Penjualan")
        cy.get('[data-testid="drawer-item-purchases"]').should("be.visible").contains("Pembelian")
        cy.get('[data-testid="drawer-item-expenses"]').should("be.visible").contains("Biaya")
        cy.get('[data-testid="drawer-item-contacts"]').should("be.visible").contains("Kontak")
        cy.get('[data-testid="drawer-item-products"]').should("be.visible").contains("Produk")
        cy.get('[data-testid="drawer-item-assets"]').should("be.visible").contains("Aset")
        cy.get('[data-testid="drawer-item-accounts"]').should("be.visible").contains("Daftar Akun")
        cy.get('[data-testid="drawer-item-settings"]').should("be.visible").contains("Pengaturan")

        //* judul
        cy.get('.MuiTypography-h5 > span').should("exist").contains("Kontak")

        //* tombol menambahkan kontak yang mengarah ke create contacts dan kembali ke halaman kontak
        cy.get('.css-aidtzz > .MuiButtonBase-root').should("exist").click()
        cy.url().should("eq", "https://cashflow.assist.id/admin/contacts/create")
        cy.get('.MuiBreadcrumbs-ol').should("be.visible").and(($nav) => {
            expect($nav).to.contain("Beranda")
            expect($nav).to.contain("Kontak")
            expect($nav).to.contain("Tambah Kontak")
        })
        cy.get(':nth-child(3) > .MuiTypography-root > span').should("be.visible").click()

        //* jejak navigasi
        cy.get('.MuiBreadcrumbs-ol').should("be.visible").and(($navTrail) => {
            expect($navTrail).to.contain("Beranda")
            expect($navTrail).to.contain("Kontak")
        })

        //* kontainer
        cy.get('.MuiTabs-flexContainer').should("be.visible").and(($container) => {
            expect($container).to.contain("Pelanggan")
            expect($container).to.contain("Suplier")
            expect($container).to.contain("Karyawan")
            expect($container).to.contain("Lainnya")
        })

        //* button atur grup kontak
        cy.get('.css-1avq450 > .MuiGrid2-container > :nth-child(1)').should("be.visible").click()
        cy.get('#modal-description').should("be.visible")
        cy.get('.css-1j72te2 > .MuiButtonBase-root').click()

        //* import kontak
        cy.get('.css-1avq450 > .MuiGrid2-container > :nth-child(2)').should("be.visible").click()
        cy.get('#modal-description').should("be.visible")
        cy.get('.css-1j72te2 > .MuiButtonBase-root').click()

        //* form input kontak
        cy.get('[data-testid="search-input"] > .MuiInputBase-root').should("be.visible").type("testing")

        cy.log("UI pada halaman kontak sudah tersedia")
        cy.wait(2000)
    });

    it("Case 3 : menekan navigasi Karyawan dan akan mengarah ke bagian karyawan pada halaman yang sama", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts")
        cy.get('#simple-tab-2').should("be.visible").contains("Karyawan").click()
        cy.log("jika berhasil maka akan muncul judul Karyawan")
        cy.get('.MuiTypography-h6').should("be.visible").contains("Karyawan")

        cy.log("navigasi berhasil ditekan dan berjalan sesuai yang diharapkan")
        cy.wait(2000)
    });

    it("Case 4 : Memeriksa ketersediaan tabel dan kolom yang ada pada karyawan di kontak", () => {
        //* tabel
        cy.visit("https://cashflow.assist.id/admin/contacts")
        cy.get('.css-k27tlm > .MuiPaper-root').should("be.visible")

        cy.get('#simple-tab-2').should("be.visible").contains("Karyawan").click()


        //* kolom
        cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(1)').should("be.visible").contains("ID")
        cy.get('.MuiTableRow-root > :nth-child(2)').should("be.visible").contains("Nama Lengkap")
        cy.get('.MuiTableRow-root > :nth-child(3)').should("be.visible").contains("Group Kontak")
        cy.get('.MuiTableRow-root > :nth-child(4)').should("be.visible").contains("Email & No Handphone")
        cy.get('.MuiTableRow-root > :nth-child(5)').should("be.visible").contains("Alamat")
        cy.get('.MuiTableRow-root > :nth-child(6)').should("be.visible").contains("Total Piutang")

        cy.log("Tabel dan kolom yang ada pada karyawan sudah tersedia")
        cy.wait(2000)
    });

    it("Case 5 : memeriksa apakah data yang ada pada table karyawan itu tersedia", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts")
        cy.get('#simple-tab-2').should("be.visible").click()
        cy.get('.css-k27tlm > .MuiPaper-root').then($table => {
            const rows = $table.find('table tbody tr').length;
            if (rows > 0) {
                cy.log("data tersedia")
            } else {
                cy.log("data kosong")
            }
        });
        cy.wait(2000)
    });

    it("Case 6 : Mencoba memeriksa data yang terlihat di tabel dengan UI", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts");

        cy.get('#simple-tab-2').should("be.visible").click();

        cy.get('table').should("be.visible");

        cy.get('table tbody tr').then(($rows) => {
            if ($rows.length > 0) {
                cy.log("Data ditemukan");

                $rows.each((index, row) => {
                    cy.wrap(row)
                        .find('td')
                        .then(($cells) => {
                            cy.log(`Baris ${index + 1}: ${$cells.text()}`);
                        });
                });
            } else {
                cy.log("Data tidak ditemukan");
            }
        });
        cy.wait(2000)
    });

    it('Case 7 : Membandingkan data yang ada di tabel bagian pagination 1 dengan yang ada di API', () => {
        cy.visit("https://cashflow.assist.id/admin/contacts");

        // Intercept API
        cy.intercept(
            'GET',
            'https://api-cashflow.assist.id/api/kontak/list?jenisKontak=karyawan&skip=0&limit=10&companyId=b13e5210-8564-11ef-af27-a72e65a1d49c*'
        ).as('getContacts');

        // Klik tab "Karyawan"
        cy.get('#simple-tab-2').should("be.visible").contains("Karyawan").click();

        // Tunggu respons API
        cy.wait('@getContacts').then((interception) => {
            const apiData = interception.response.body.results;

            // Log data dari API untuk debugging
            cy.log("API Data:", apiData);

            // Pastikan panjang data di tabel sesuai dengan API
            cy.get('.css-k27tlm > .MuiPaper-root')
                .find('tr')
                .not(':first') // Abaikan header tabel
                .should('have.length', apiData.length);

            // Bandingkan data setiap baris di UI dengan API
            apiData.forEach((apiRow, index) => {
                cy.get('.css-k27tlm > .MuiPaper-root')
                    .find('tr')
                    .eq(index + 1) // Abaikan header
                    .within(() => {
                        // Bandingkan kolom ID
                        cy.get('td').eq(0).should('contain', apiRow.id);

                        // Bandingkan kolom Nama Lengkap
                        cy.get('td').eq(1).should('contain', apiRow.nama);

                        // Bandingkan kolom Grup Kontak (jika ada)
                        cy.get('td').eq(2)
                            .invoke('text') // Ambil teks dari tabel
                            .then((tableText) => {
                                const formattedTableValue = tableText.trim(); // Hapus spasi tambahan dari tabel

                                // Format nilai API untuk mencocokkan format tabel
                                const formattedApiValue = apiRow.grup_kontak_nama?.join(', ') || '';

                                // Log untuk debugging
                                cy.log('Table Value:', formattedTableValue);
                                cy.log('API Value:', formattedApiValue);

                                // Bandingkan nilai dari tabel dengan nilai API
                                expect(formattedTableValue).to.equal(formattedApiValue);
                            });



                        cy.get('td').eq(3) // Mengakses kolom yang berisi email dan nomor HP
                            .find('div *') // Mencari semua elemen teks dalam div
                            .invoke('text')
                            .then((tableText) => {
                                const contactInfoFromUI = tableText.split(/\s+/).map(text => text.trim()); // Pisahkan dan bersihkan teks
                                const contactInfoFromAPI = [];

                                // Gabungkan email dari API
                                if (apiRow.email_kontak_email && apiRow.email_kontak_email.length > 0) {
                                    contactInfoFromAPI.push(...apiRow.email_kontak_email);
                                }

                                // Tambahkan nomor HP ke array
                                if (apiRow.no_hp) {
                                    contactInfoFromAPI.push(apiRow.no_hp);
                                }

                                // Bandingkan array nilai UI dan API
                                expect(contactInfoFromUI).to.deep.equal(contactInfoFromAPI);
                            });




                        // Bandingkan kolom Alamat
                        cy.get('td').eq(5)
                            .invoke('text') // Ambil teks dari tabel
                            .then((text) => {
                                // Hapus simbol 'Rp' dan spasi dari nilai tabel
                                const formattedTableValue = text.replace('Rp', '').replace(/\s+/g, '').trim();

                                // Format nilai API agar sesuai dengan format tabel
                                const formattedApiValue = new Intl.NumberFormat('id-ID').format(apiRow.piutang_max);

                                // Bandingkan kedua nilai yang sudah diformat
                                expect(formattedTableValue).to.equal(formattedApiValue);
                            });

                    });
            });
        });
        cy.wait(2000)
    });

    it("Case 8 : Mencoba menekan navigasi Beranda agar halamannya beralih ke Dashboard", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts");

        // todo Klik tab "Beranda"
        cy.get('.MuiBreadcrumbs-ol > :nth-child(1) > .MuiTypography-root').should("exist").click()
        cy.url().should('include', '/dashboard');

        cy.wait(2000)
    });

    it("Case 9 : Mencoba menekan tombol create contact dan beralih kehalaman create contact dan kembali ke halaman kontak", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts");

        // todo klik tombol tambah kontak
        cy.get('.css-aidtzz > .MuiButtonBase-root').should("be.visible").click()
        cy.url().should('include', '/create')

        // todo kembali ke halaman kontak menggunakan navigasi yang ada
        cy.get(':nth-child(3) > .MuiTypography-root > span').should("be.visible").contains("Kontak").click()
        cy.url().should('include', '/contacts');

        cy.wait(2000)
    });

    it("Case 10 : Mencoba untuk menekan pagination selanjutnya yang ada di tabel dan memastikan datanya ada atau tidak", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts");

        // todo pergi ke bagian karyawan
        cy.get('#simple-tab-2').should("be.visible").contains("Karyawan").click();

        // todo klik pagination nomor 2
        cy.get('.MuiPagination-ul > :nth-child(3) > .MuiButtonBase-root').should("be.visible").click()

        // ? memeriksa apakah ada datanya atau tidak
        cy.get('table tbody tr').then(rows => {
            if (rows.length > 0) {
                cy.log("data tersedia")
            } else {
                cy.log("data tidak ada")
            }
        });

        // todo klik pagination nomor 1
        cy.wait(3000)
        cy.get('.MuiPagination-ul > :nth-child(2) > .MuiButtonBase-root').should("be.visible").click()

        // todo klik pagination >
        cy.wait(3000)
        cy.get('.MuiPagination-ul > :nth-child(4)').should("be.visible").click()
        cy.get('table tbody tr').then(rows => {
            if (rows.length > 0) {
                cy.log("data tersedia")
            } else {
                cy.log("data tidak ada")
            }
        });
        cy.wait(2000)
    });

    it("Case 11 : Mencoba menekan setiap pagination yang ada di tabel dan memastikan datanya ada atau tidak", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts");

        // todo pergi ke bagian karyawan
        cy.get('#simple-tab-2').should("be.visible").contains("Karyawan").click();

        // todo klik pagination nomor 2
        cy.get('.MuiPagination-ul > :nth-child(3) > .MuiButtonBase-root').should("be.visible").click()
        // ? memeriksa apakah ada datanya atau tidak di pagination 2
        cy.get('table tbody tr').then(rows => {
            if (rows.length > 0) {
                cy.log("data tersedia")
            } else {
                cy.log("data tidak ada")
            }
        });

        // todo klik pagination nomor 1
        cy.wait(3000)
        cy.get('.MuiPagination-ul > :nth-child(1) > .MuiButtonBase-root').should("be.visible").click()

        // ? memeriksa apakah ada datanya atau tidak di pagination 1
        cy.get('table tbody tr').then(rows => {
            if (rows.length > 0) {
                cy.log("data tersedia")
            } else {
                cy.log("data tidak ada")
            }
        });

        // todo klik pagination nomor 2 untuk kembali ke pagination 2

        cy.wait(3000)
        cy.get('.MuiPagination-ul > :nth-child(3) > .MuiButtonBase-root').should("be.visible").click()

        // todo klik previous button
        cy.get('.MuiPagination-ul > :nth-child(1) > .MuiButtonBase-root').should("be.visible").click()

        // ? memeriksa apakah ada datanya atau tidak
        cy.get('table tbody tr').then(rows => {
            if (rows.length > 0) {
                cy.log("data tersedia")
            } else {
                cy.log("data tidak ada")
            }
        });
        cy.wait(2000)
    });

    it("Case 12 : Memeriksa data di tabel bagian pagination 1 bahwa tidak boleh lebih dari 10 data", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts");

        // todo pergi ke bagian karyawan
        cy.get('#simple-tab-2').should("be.visible").contains("Karyawan").click();

        // todo memastikan setiap data dalam 1 pagination hanya 10
        cy.get('table tbody').find('tr').not(':first').should('have.length.greaterThan', 0);
        cy.get('table tbody').find('tr').not(':first').should('have.length.at.most', 10);
        cy.wait(2000)

    });

    it("Case 13 : Mencoba untuk pergi kehalaman detail kontak dengan menggunakan salah satu data yang ada di tabel bagian pagination 1", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts");

        // todo pergi ke bagian karyawan
        cy.get('#simple-tab-2').should("be.visible").contains("Karyawan").click();

        cy.get('table tbody tr').not(':first')
            .eq(1)
            .find('td')
            .eq(1)
            .click()

        // cy.url().should('include', '/detail');
        cy.wait(2000)
    });

    it("Case 14 : Mencoba mencari data yang ada menggunakan kolom pencarian di tabel karyawan", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts");

        cy.get('#simple-tab-2').should("be.visible").contains("Karyawan").click();

        cy.wait(4000);

        cy.get('[data-testid="search-input"] > .MuiInputBase-root')
            .should("be.visible")
            .type("Nyoba je");

        // Tunggu beberapa detik untuk memastikan data muncul
        cy.wait(5000);

        // Memastikan ada baris di tabel setelah pencarian
        cy.get('table tbody tr').should('have.length.greaterThan', 0).then(rows => {
            const foundRows = rows.slice(0);  // Mengambil semua baris hasil pencarian (termasuk header)

            if (foundRows.length > 0) {
                // todo periksa baris pertama
                cy.wrap(foundRows)
                    .eq(0)  // Mengakses baris pertama (satu-satunya hasil)
                    .find('td')
                    .eq(1)  // Mengakses kolom kedua (index dimulai dari 0)
                    .should('have.text', 'Nyoba Je');
            } else {
                cy.log("data yang dicari tidak ditemukan");
            };
        });
        cy.wait(2000)
    });

    it("Case 15 : Memeriksa tabel header pada bagian karyawan di pagination 1", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts");

        cy.get('#simple-tab-2').should("be.visible").contains("Karyawan").click();
        cy.get('table th').eq(0).should("be.visible").contains("ID")
        cy.get('table th').eq(1).should("be.visible").contains("Nama Lengkap")
        cy.get('table th').eq(2).should("be.visible").contains("Group Kontak")
        cy.get('table th').eq(3).should("be.visible").contains("Email & No Handphone")
        cy.get('table th').eq(4).should("be.visible").contains("Alamat")
        cy.get('table th').eq(5).should("be.visible").contains("Total Piutang")
    });

    it("Case 16 : Memeriksa data di tabel bagian pagination 2 bahwa tidak boleh lebih dari 10 data", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts");

        // todo pergi ke bagian karyawan
        cy.get('#simple-tab-2').should("be.visible").contains("Karyawan").click();

        // todo pagination 2
        cy.get('.MuiPagination-ul > :nth-child(3) > .MuiButtonBase-root').should('be.visible').contains('2').click()

        // todo memastikan setiap data dalam 1 pagination hanya 10
        cy.get('table tbody').find('tr').not(':first').should('have.length.greaterThan', 0);
        cy.get('table tbody').find('tr').not(':first').should('have.length.at.most', 10);
        cy.wait(2000)

    });

    it("Case 17 : Mencoba untuk pergi kehalaman detail kontak dengan menggunakan salah satu data yang ada di tabel bagian pagination 2", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts");

        // todo pergi ke bagian karyawan
        cy.get('#simple-tab-2').should("be.visible").contains("Karyawan").click();

        // todo pagination 2
        cy.get('.MuiPagination-ul > :nth-child(3) > .MuiButtonBase-root').should('be.visible').contains('2').click()

        cy.get('table tbody tr').not(':first')
            .eq(1)
            .find('td')
            .eq(1)
            .click()

        // cy.url().should('include', '/detail');
        cy.wait(2000)
    });

    it("Case 18 : Memeriksa data di tabel bagian pagination 3 bahwa tidak boleh lebih dari 10 data", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts");

        // todo pergi ke bagian karyawan
        cy.get('#simple-tab-2').should("be.visible").contains("Karyawan").click();

        // todo pagination 3
        cy.get('.MuiPagination-ul > :nth-child(4) > .MuiButtonBase-root').should('be.visible').contains('3').click()

        // todo memastikan setiap data dalam 1 pagination hanya 10
        cy.get('table tbody').find('tr').not(':first').should('have.length.greaterThan', 0);
        cy.get('table tbody').find('tr').not(':first').should('have.length.at.most', 10);
        cy.wait(2000)

    });

    it("Case 19 : Mencoba untuk pergi kehalaman detail kontak dengan menggunakan salah satu data yang ada di tabel bagian pagination 3", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts");

        // todo pergi ke bagian karyawan
        cy.get('#simple-tab-2').should("be.visible").contains("Karyawan").click();

        // todo pagination 3
        cy.get('.MuiPagination-ul > :nth-child(4) > .MuiButtonBase-root').should('be.visible').contains('3').click()

        cy.get('table tbody tr').not(':first')
            .eq(1)
            .find('td')
            .eq(1)
            .click()

        // cy.url().should('include', '/detail');
        cy.wait(2000)
    });


    it("Case 20 : Kondisi sekarang di pagination 2, menekan previous button agar pergi ke pagination 1", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts");

        // todo pergi ke bagian karyawan
        cy.get('#simple-tab-2').should("be.visible").contains("Karyawan").click();

        // todo pagination 2
        cy.wait(5000)
        cy.get('.MuiPagination-ul > :nth-child(3) > .MuiButtonBase-root').should('be.visible').contains('2').click()

        // todo klik svg icon
        cy.get('.MuiPagination-ul > :nth-child(1) > .MuiButtonBase-root').should('be.visible').find('svg').click()

        // // todo pagination 1
        // cy.get('.MuiPagination-ul > :nth-child(2) > .MuiButtonBase-root').should('have.class', 'focus').and('have.text', '1')

    });

    it("Case 21 : Kondisi sekarang di pagination 2, menekan next button agar pergi ke pagination 3", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts");

        // todo pergi ke bagian karyawan
        cy.get('#simple-tab-2').should("be.visible").contains("Karyawan").click();

        // todo pagination 2
        cy.get('.MuiPagination-ul > :nth-child(3) > .MuiButtonBase-root').should('be.visible').contains('2').click()

        // todo next button
        cy.get('.css-1rqlbw1').should('be.visible').then(() => {
            cy.wait(2000)
            cy.get('button').last().click()
        })
        // // todo pagination 3
        // cy.get('.MuiPagination-ul > :nth-child(4) > .MuiButtonBase-root').should('have.class', 'focus').and('have.text', '1')
    });

    it("Case 22 : Kondisi sekarang di pagination 3, menekan previous button agar pergi ke pagination 2", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts");

        // todo pergi ke bagian karyawan
        cy.get('#simple-tab-2').should("be.visible").contains("Karyawan").click();

        // todo pagination 3
        cy.get('.MuiPagination-ul > :nth-child(4) > .MuiButtonBase-root').should('be.visible').contains('3').click()

        // todo tombol previous button
        cy.wait(4000)
        cy.get('.MuiPagination-ul > :nth-child(1) > .MuiButtonBase-root').should('be.visible').click()

        // ? memastikan bahwa sudah berada di pagination 2
        cy.get('.MuiPagination-ul > :nth-child(3) > .MuiButtonBase-root').should('be.visible').contains('2')

        // // todo pagination 1
        // cy.get('.MuiPagination-ul > :nth-child(2) > .MuiButtonBase-root').should('have.class', 'focus').and('have.text', '1')

    });

    it('Case 23 : Membandingkan data yang ada di tabel bagian pagination 2 dengan yang ada di API', () => {
        cy.visit("https://cashflow.assist.id/admin/contacts");

        // Intercept API
        cy.intercept(
            'GET',
            'https://api-cashflow.assist.id/api/kontak/list?jenisKontak=karyawan&skip=10&limit=10&companyId=b13e5210-8564-11ef-af27-a72e65a1d49c*'
        ).as('getContacts');

        // Klik tab "Karyawan"
        cy.get('#simple-tab-2').should("be.visible").contains("Karyawan").click();

        // todo pagination 2
        cy.get('.MuiPagination-ul > :nth-child(3) > .MuiButtonBase-root').should('be.visible').contains('2').click()

        // Tunggu respons API
        cy.wait('@getContacts').then((interception) => {
            const apiData = interception.response.body.results;

            // Log data dari API untuk debugging
            cy.log("API Data:", apiData);

            // Pastikan panjang data di tabel sesuai dengan API
            cy.get('.css-k27tlm > .MuiPaper-root')
                .find('tr')
                .not(':first') // Abaikan header tabel
                .should('have.length', apiData.length);

            // Bandingkan data setiap baris di UI dengan API
            apiData.forEach((apiRow, index) => {
                cy.get('.css-k27tlm > .MuiPaper-root')
                    .find('tr')
                    .eq(index + 1) // Abaikan header
                    .within(() => {
                        // Bandingkan kolom ID
                        cy.get('td').eq(0).should('contain', apiRow.id);

                        // Bandingkan kolom Nama Lengkap
                        cy.get('td').eq(1).should('contain', apiRow.nama);

                        // Bandingkan kolom Grup Kontak (jika ada)
                        cy.get('td').eq(2)
                            .invoke('text') // Ambil teks dari tabel
                            .then((tableText) => {
                                const formattedTableValue = tableText.trim(); // Hapus spasi tambahan dari tabel

                                // Format nilai API untuk mencocokkan format tabel
                                const formattedApiValue = apiRow.grup_kontak_nama?.join(', ') || '';

                                // Log untuk debugging
                                cy.log('Table Value:', formattedTableValue);
                                cy.log('API Value:', formattedApiValue);

                                // Bandingkan nilai dari tabel dengan nilai API
                                expect(formattedTableValue).to.equal(formattedApiValue);
                            });



                        // Gabungkan Email dan Nomor HP dalam satu kolom yang terdapat dalam <p> dalam <div>
                        let contactInfo = '';

                        // Pastikan email dan nomor hp ada sebelum digabungkan
                        if (apiRow.email_kontak_email && apiRow.email_kontak_email.length > 0 && apiRow.no_hp) {
                            contactInfo = `${apiRow.email_kontak_email[0]}${apiRow.no_hp}`;
                        } else if (apiRow.email_kontak_email && apiRow.email_kontak_email.length > 0) {
                            contactInfo = apiRow.email_kontak_email[0]; // Jika hanya email yang ada
                        } else if (apiRow.no_hp) {
                            contactInfo = apiRow.no_hp; // Jika hanya nomor HP yang ada
                        }

                        // Seleksi div yang berisi email dan nomor hp dalam <p>
                        cy.get('td').eq(3)
                            .find('div')
                            .find('p')
                            .should('have.text', contactInfo);

                        // Bandingkan kolom Alamat
                        cy.get('td').eq(5)
                            .invoke('text') // Ambil teks dari tabel
                            .then((text) => {
                                // Hapus simbol 'Rp' dan spasi dari nilai tabel
                                const formattedTableValue = text.replace('Rp', '').replace(/\s+/g, '').trim();

                                // Format nilai API agar sesuai dengan format tabel
                                const formattedApiValue = new Intl.NumberFormat('id-ID').format(apiRow.piutang_max);

                                // Bandingkan kedua nilai yang sudah diformat
                                // expect(formattedTableValue).to.equal(formattedApiValue);
                            });

                    });
            });
        });
        cy.wait(2000)
    });

    it('Case 24 : Membandingkan data yang ada di tabel bagian pagination 3 dengan yang ada di API', () => {
        cy.visit("https://cashflow.assist.id/admin/contacts");

        // Intercept API
        cy.intercept(
            'GET',
            'https://api-cashflow.assist.id/api/kontak/list?jenisKontak=karyawan&skip=20&limit=10&companyId=b13e5210-8564-11ef-af27-a72e65a1d49c*'
        ).as('getContacts');

        // Klik tab "Karyawan"
        cy.get('#simple-tab-2').should("be.visible").contains("Karyawan").click();

        // todo pagination 3
        cy.get('.MuiPagination-ul > :nth-child(4) > .MuiButtonBase-root').should('be.visible').contains('3').click()

        // Tunggu respons API
        cy.wait('@getContacts').then((interception) => {
            const apiData = interception.response.body.results;

            // Log data dari API untuk debugging
            cy.log("API Data:", apiData);

            // Pastikan panjang data di tabel sesuai dengan API
            cy.get('.css-k27tlm > .MuiPaper-root')
                .find('tr')
                .not(':first') // Abaikan header tabel
                .should('have.length', apiData.length);

            // Bandingkan data setiap baris di UI dengan API
            apiData.forEach((apiRow, index) => {
                cy.get('.css-k27tlm > .MuiPaper-root')
                    .find('tr')
                    .eq(index + 1) // Abaikan header
                    .within(() => {
                        // Bandingkan kolom ID
                        cy.get('td').eq(0).should('contain', apiRow.id);

                        // Bandingkan kolom Nama Lengkap
                        cy.get('td').eq(1).should('contain', apiRow.nama);

                        // Bandingkan kolom Grup Kontak (jika ada)
                        cy.get('td').eq(2)
                            .invoke('text') // Ambil teks dari tabel
                            .then((tableText) => {
                                const formattedTableValue = tableText.trim(); // Hapus spasi tambahan dari tabel

                                // Format nilai API untuk mencocokkan format tabel
                                const formattedApiValue = apiRow.grup_kontak_nama?.join(', ') || '';

                                // Log untuk debugging
                                cy.log('Table Value:', formattedTableValue);
                                cy.log('API Value:', formattedApiValue);

                                // Bandingkan nilai dari tabel dengan nilai API
                                expect(formattedTableValue).to.equal(formattedApiValue);
                            });



                        // Gabungkan Email dan Nomor HP dalam satu kolom yang terdapat dalam <p> dalam <div>
                        let contactInfo = '';

                        // Pastikan email dan nomor hp ada sebelum digabungkan
                        if (apiRow.email_kontak_email && apiRow.email_kontak_email.length > 0 && apiRow.no_hp) {
                            contactInfo = `${apiRow.email_kontak_email[0]}${apiRow.no_hp}`;
                        } else if (apiRow.email_kontak_email && apiRow.email_kontak_email.length > 0) {
                            contactInfo = apiRow.email_kontak_email[0]; // Jika hanya email yang ada
                        } else if (apiRow.no_hp) {
                            contactInfo = apiRow.no_hp; // Jika hanya nomor HP yang ada
                        }

                        // Seleksi div yang berisi email dan nomor hp dalam <p>
                        cy.get('td').eq(3)
                            .find('div')
                            .find('p')
                            .should('have.text', contactInfo);

                        // Bandingkan kolom Alamat
                        cy.get('td').eq(5)
                            .invoke('text') // Ambil teks dari tabel
                            .then((text) => {
                                // Hapus simbol 'Rp' dan spasi dari nilai tabel
                                const formattedTableValue = text.replace('Rp', '').replace(/\s+/g, '').trim();

                                // Format nilai API agar sesuai dengan format tabel
                                const formattedApiValue = new Intl.NumberFormat('id-ID').format(apiRow.piutang_max);

                                // Bandingkan kedua nilai yang sudah diformat
                                // expect(formattedTableValue).to.equal(formattedApiValue);
                            });

                    });
            });
        });
        cy.wait(2000)
    });

    it("Case 25 : Memeriksa tabel header pada bagian karyawan di pagination 2", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts");

        cy.get('#simple-tab-2').should("be.visible").contains("Karyawan").click();

        // todo pagination 2
        cy.get('.MuiPagination-ul > :nth-child(3) > .MuiButtonBase-root').should('be.visible').contains('2').click()

        cy.get('table th').eq(0).should("be.visible").contains("ID")
        cy.get('table th').eq(1).should("be.visible").contains("Nama Lengkap")
        cy.get('table th').eq(2).should("be.visible").contains("Group Kontak")
        cy.get('table th').eq(3).should("be.visible").contains("Email & No Handphone")
        cy.get('table th').eq(4).should("be.visible").contains("Alamat")
        cy.get('table th').eq(5).should("be.visible").contains("Total Piutang")
    });

    it("Case 26 : Memeriksa tabel header pada bagian karyawan di pagination 3", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts");

        cy.get('#simple-tab-2').should("be.visible").contains("Karyawan").click();

        // todo pagination 3
        cy.get('.MuiPagination-ul > :nth-child(4) > .MuiButtonBase-root').should('be.visible').contains('3').click()
        cy.get('table th').eq(0).should("be.visible").contains("ID")
        cy.get('table th').eq(1).should("be.visible").contains("Nama Lengkap")
        cy.get('table th').eq(2).should("be.visible").contains("Group Kontak")
        cy.get('table th').eq(3).should("be.visible").contains("Email & No Handphone")
        cy.get('table th').eq(4).should("be.visible").contains("Alamat")
        cy.get('table th').eq(5).should("be.visible").contains("Total Piutang")
    });

    it("Case 27 : Kondisi di pagination 1, memastikan bahwa previous button tidak dapat ditekan", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts");

        cy.get('#simple-tab-2').should("be.visible").contains("Karyawan").click();

        cy.get('.css-1rqlbw1').should('be.visible').then(() => {
            cy.wait(4000)
            cy.get('button').eq(7).should('be.visible').and('be.disabled')
        });
    });

    it("Case 28 : Kondisi di pagination akhir, memastikan bahwa next button tidak dapat ditekan", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts");

        cy.get('#simple-tab-2').should("be.visible").contains("Karyawan").click();

        cy.get('.css-1rqlbw1').should('be.visible').then(() => {
            cy.wait(4000)
            cy.get('button').eq(-2).should('be.visible').click()

            // todo memastikan next button tidak dapat ditekan

            cy.wait(2000)
            cy.get('button').last().should('be.visible').and('be.disabled')
        });
    });

    // it.only("Case 29 : Menekan tombol import kontak dan memastikan bahwa tombol memunculkan modal box khusus import kontak", () => {
    //     cy.visit("https://cashflow.assist.id/admin/contacts");

    //     cy.get('#simple-tab-2').should("be.visible").contains("Karyawan").click();

    //     // ? tombol import kontak
    //     cy.get('.css-1avq450 > .MuiGrid2-container > :nth-child(2)').should('be.visible').contains('Import Kontak').click()
    // })
});