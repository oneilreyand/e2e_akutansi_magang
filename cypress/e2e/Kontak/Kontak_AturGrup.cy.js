describe("Menguji fitur atur Group Kontak pada halaman kontak di cashflow assist id", () => {
    const email = "damaresya947@gmail.com";
    const password = "12345678";

    beforeEach(() => {
        cy.loginWithApi(email, password);
    });

    it("Case 1 : Menekan fitur atur Group Kontak", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts");

        cy.get('.css-1avq450 > .MuiGrid2-container > :nth-child(1)').should("be.visible").contains("Atur Group Kontak").click()

        // ? modal box
        cy.get('#modal-description > .MuiPaper-root').should('exist')

        // ? keluar dari modal box
        cy.get('.css-1j72te2 > .MuiButtonBase-root').should('be.visible').click()
        cy.wait(2000)
        cy.get('#modal-description > .MuiPaper-root').should('not.exist')
    });

    it("Case 2 : Memeriksa ketersediaan UI pada modal box atur Group Kontak", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts");

        cy.get('.css-1avq450 > .MuiGrid2-container > :nth-child(1)').should("be.visible").contains("Atur Group Kontak").click()

        // todo kolom pencarian
        cy.get('input[placeholder="Cari group"]').should("be.visible")

        // todo kolom nama grup
        cy.get('.MuiPaper-root > .MuiTable-root > .MuiTableHead-root > .MuiTableRow-root > :nth-child(1)').should("be.visible").contains("Nama Group")
        cy.get('.MuiPaper-root > .MuiTable-root > .MuiTableHead-root > .MuiTableRow-root > :nth-child(2)').should("be.visible").contains("Jumlah Kontak")

        // todo tombol buat grup
        cy.get('.MuiGrid2-container > :nth-child(2) > .MuiButtonBase-root').should("be.visible").contains("Buat Group")

        // todo memastikan bahwa kolom nama group berisi data baik mengandung angka atau string
        cy.get('.MuiPaper-root > .MuiTable-root').each(($row) => {
            cy.wait(5000)
            cy.wrap($row).find('td:nth-child(even)').each(($td) => {
                // ? mengambil teks dari tabel dan hilangkan spasi
                const data = $td.text().trim();

                // ? memeriksa apakah teks mengandung angka dan string
                const containsNumber = /\d/.test(data);
                const containsString = /[a-zA-Z]/.test(data);

                // todo pengecekan kondisi
                if (containsNumber && containsString) {
                    expect(true).to.be.true;
                } else if (containsString || containsNumber) {
                    expect(true).to.be.true;
                } else {
                    expect(data).to.not.be.empty;
                }
            });
        })

        // todo memeriksa icon edit grup disetiap barisnya pada Nama group
        cy.get('.MuiPaper-root > .MuiTable-root').each(($row) => {
            cy.wait(5000)
            cy.wrap($row).find('td:nth-child(odd)').each(($td) => {
                cy.wrap($td).find('svg').should("exist")
            });
        });

        // todo memastikan bahwa kolom jumlah kontak hanya boleh angka saja
        cy.get('.MuiPaper-root > .MuiTable-root').each(($row) => {
            cy.wait(5000)
            cy.wrap($row).find('td:nth-child(even)').each(($td) => {
                const celltext = $td.text().trim();

                // ? memastikan bahwa data yang ada di tabel tersebut adalah angka
                expect(isNaN(celltext)).to.be.false;
            })
        })

    });

    it("Case 3 : Mencari grup yang ada menggunakan kolom pencarian", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts");

        cy.get('.css-1avq450 > .MuiGrid2-container > :nth-child(1)').should("be.visible").contains("Atur Group Kontak").click()

        cy.get('input[placeholder="Cari group"]').should("be.visible").type('hehe')

        cy.wait(3000)

        cy.get('.MuiPaper-root > .MuiTable-root').find('td').eq(0).each(($td) => {
            cy.wrap($td).should('be.visible').contains('hehe')
        });

        cy.get('.MuiPaper-root > .MuiTable-root').find('tr').should('contain', 'hehe')
    });


    it("Case 4 : Mencoba untuk menekan tombol buat grup dan batal dari fitur atur Group Kontak", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts");

        cy.get('.css-1avq450 > .MuiGrid2-container > :nth-child(1)').should("be.visible").contains("Atur Group Kontak").click()

        // todo menekan tombol buat grup
        cy.get('.MuiGrid2-container > :nth-child(2) > .MuiButtonBase-root').should('be.visible').contains('Buat Group').click()

        // todo memeriksa inputan apakah tersedia jika sudah menekan tombol buat grup
        cy.get('input[placeholder="Masukkan nama group"]').should('be.visible')

        // todo menekan tombol batal
        cy.get('.MuiStack-root > .MuiButton-text').should('exist').click()

        // todo memeriksa apakah inputan masih ada jika tombol batal diklik
        cy.get('input[placeholder="Masukkan nama group"]').should('not.exist')
    });

    it("Case 5 : Mencoba menambahkan grup dengan menggunakan tombol buat grup pada modal box pengaturan Group Kontak", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts");

        // Klik "Atur Group Kontak"
        cy.get('.css-1avq450 > .MuiGrid2-container > :nth-child(1)').should("be.visible").contains("Atur Group Kontak").click();

        cy.get('input[placeholder="Cari group"]').should("be.visible").type('Grup ini adalah grup yang baru ditambahkan')

        let dataSudahAda = false;  // Flag untuk menandakan apakah data sudah ada

        // Cek setiap sel dalam tabel untuk melihat apakah grup sudah ada
        cy.get('.MuiPaper-root > .MuiTable-root').find('td').each(($td) => {
            const cellText = $td.text().trim();

            // Jika ditemukan data yang sudah ada, log dan set flag
            if (cellText === 'Grup ini adalah grup yang baru ditambahkan') {
                dataSudahAda = true;  // Tandai bahwa data sudah ada
                cy.log("Data sudah ada: " + cellText);  // Tampilkan pesan log
            }
        }).then(() => {
            // Setelah pengecekan selesai, kita cek status dataSudahAda
            if (!dataSudahAda) {
                cy.log("Data belum ada, melanjutkan untuk membuat grup baru");  // Log jika data belum ada

                // Klik tombol buat grup
                cy.get('.MuiGrid2-container > :nth-child(2) > .MuiButtonBase-root').should("be.visible").contains("Buat Group").click();

                // Isi nama grup baru
                cy.get('input[placeholder="Masukkan nama group"]').should("be.visible").type("Grup ini adalah grup yang baru ditambahkan");

                // Klik simpan untuk menambah grup baru
                cy.get('form > .MuiStack-root > .MuiButton-contained').should("be.visible").contains("Simpan").click();

                cy.log("Grup baru berhasil dibuat: 'Grup ini adalah grup yang baru ditambahkan'");
            } else {
                cy.log("Tidak membuat grup baru karena data sudah ada.");
            }
        });
    });

    it("Case 6 : Memeriksa apakah grup yang baru ditambahkan itu sudah tersimpan di tabel atau tidak", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts");

        cy.get('.css-1avq450 > .MuiGrid2-container > :nth-child(1)').should("be.visible").contains("Atur Group Kontak").click();

        cy.get('input[placeholder="Cari group"]').should('be.visible').type('Grup ini adalah grup yang baru ditambahkan').then(($input) => {
            cy.get('.MuiPaper-root > .MuiTable-root').as('data').should("be.visible").then(('data'), () => {
                if ('@data' === 'Grup ini adalah grup yang baru ditambahkan') {
                    cy.get('@data').should('contain', 'Grup ini adalah grup yang baru ditambahkan')
                } else {
                    cy.wait(3000)
                    cy.log('data tidak ada')
                }
            });

        });
    });

    it("Case 7 : menguji fungsi tombol mengedit Group Kontak dan tombol batal", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts");

        cy.get('.css-1avq450 > .MuiGrid2-container > :nth-child(1)').should("be.visible").contains("Atur Group Kontak").click()

        // ? tombol ngedit kemudian dibatalkan
        cy.get('#modal-description tr').find('td').then(($cell) => {
            cy.get(':nth-child(1) > :nth-child(1) > .MuiStack-root > .MuiButtonBase-root').should("be.visible").click()
            cy.get('.css-8icbc7').should("be.visible").click()
        });

        // ? tombol ngedit kemudian diceklis tanpa merubahnya
        cy.get('#modal-description tr').find('td').then(($cell) => {
            cy.get(':nth-child(1) > :nth-child(1) > .MuiStack-root > .MuiButtonBase-root').should("be.visible").click()
            cy.get('.MuiBox-root > .MuiIconButton-colorPrimary').should("be.visible").click()
        });
    });

    it("Case 8 : Memilih salah satu Group Kontak kemudian mengubahnya", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts");

        // Klik tombol untuk membuka pengaturan Group Kontak
        cy.get('.css-1avq450 > .MuiGrid2-container > :nth-child(1)')
            .should("be.visible")
            .contains("Atur Group Kontak")
            .click();

        // Iterasi setiap baris data grup
        cy.get('#modal-description tr').find('td').each(($cell) => {
            // Klik grup yang akan diubah
            cy.get('.MuiPaper-root > .MuiTable-root > .MuiTableBody-root > :nth-child(2) > :nth-child(1)')
                .should("be.visible")
            cy.get('.MuiTableBody-root > :nth-child(2) > :nth-child(1) > .MuiStack-root > .MuiButtonBase-root').should('be.visible').click()

            // Tunggu agar modal terbuka dan input bisa diinteraksikan
            cy.wait(3000);

            // Pastikan elemen input kedua terlihat dan scroll ke dalam tampilan
            cy.get('input[type="text"]')
                .eq(1)
                .scrollIntoView()
                .should("be.visible")
                .clear()
                .then(($input) => {
                    cy.wrap($input).type("sudah saya edit");
                });

            // Klik ikon untuk menyimpan perubahan
            cy.get('.MuiBox-root > .MuiIconButton-colorPrimary')
                .should("be.visible")
                .click();

            // Tunggu beberapa detik setelah penyimpanan
            cy.wait(2000);

            // Cari grup yang sudah diedit
            cy.get('input[placeholder="Cari group"]')
                .should('be.visible')
                .clear() // Pastikan input kosong sebelum mengetik
                .type('sudah saya edit');
        });
    });

    it("Case 9 : Membuat Group Kontak tetapi tidak mengisi nama grupnya", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts");

        cy.get('.css-1avq450 > .MuiGrid2-container > :nth-child(1)').should("be.visible").contains("Atur Group Kontak").click()

        // ? modal box
        cy.get('#modal-description > .MuiPaper-root').should('exist')

        cy.get('.MuiGrid2-container > :nth-child(2) > .MuiButtonBase-root').should("be.visible").contains("Buat Group").click()
        cy.get('input[placeholder="Masukkan nama group"]').should('be.visible')
        cy.get('form > .MuiStack-root > .MuiButton-contained').should('be.visible').contains('Simpan').click()

        // ! helper text
        cy.get('.MuiPaper-root > .MuiTable-root > :nth-child(2) > .MuiTableRow-root > .MuiTableCell-root').find('p').should('be.visible').contains('Nama group harus diisi')
    });

    it("Case 10 : Mengubah Group Kontak tetapi tidak mengisi nama grupnya", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts");

        cy.get('.css-1avq450 > .MuiGrid2-container > :nth-child(1)').should("be.visible").contains("Atur Group Kontak").click()
        cy.get(':nth-child(1) > :nth-child(1) > .MuiStack-root > .MuiButtonBase-root').should('be.visible').click()
        cy.get('input[type="text"]').eq(2).should('be.visible').clear()
        cy.get('.MuiBox-root > .MuiIconButton-colorPrimary').should('be.visible').click().then(($p) => {
            // ! helper text
            cy.get('.MuiPaper-root > .MuiTable-root > .MuiTableBody-root > :nth-child(1) > :nth-child(1)').find('p').should('be.visible').contains('Nama group harus diisi')
        })
    });

    it("Case 11 : Mencoba membuat grup dengan nama yang sama", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts");

        cy.get('.css-1avq450 > .MuiGrid2-container > :nth-child(1)').should("be.visible").contains("Atur Group Kontak").click()
        cy.get('.MuiGrid2-container > :nth-child(2) > .MuiButtonBase-root').should("be.visible").contains("Buat Group").click()
        cy.get('input[placeholder="Masukkan nama group"]').should("be.visible").type("Grup baru");
        cy.get('form > .MuiStack-root > .MuiButton-contained').should("be.visible").contains("Simpan").click()
        cy.get('.css-v20fs0').should('be.visible').find('p').should('contain', 'Nama group sudah ada')
    });

    it("Case 12 : Mengubah grup dengan nama yang sama", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts");
        cy.get('.css-1avq450 > .MuiGrid2-container > :nth-child(1)').should("be.visible").contains("Atur Group Kontak").click()

        cy.get('.MuiPaper-root > .MuiTable-root').each(($row) => {
            cy.wait(5000)
            cy.wrap($row).find('td:nth-child(odd)').then(($td) => {
                cy.wrap($td).eq(0).find('svg').should("exist").click()
                cy.get('input[type="text"]').eq(2).should('be.visible').clear()
                cy.get('.MuiBox-root > .MuiIconButton-colorPrimary').should('be.visible').click().type('Gurupo-gurupo')
                cy.get('.MuiPaper-root > .MuiTable-root > .MuiTableBody-root > :nth-child(1) > :nth-child(1)').should('be.visible').should('contain', 'Nama group harus diisi')
            });
        });
    });

    it("Case 13 : Membuat grup dengan menggunakan simbol", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts");
        cy.get('.css-1avq450 > .MuiGrid2-container > :nth-child(1)').should("be.visible").contains("Atur Group Kontak").click()
        cy.get('.MuiGrid2-container > :nth-child(2) > .MuiButtonBase-root').should("be.visible").contains("Buat Group").click()
        cy.get('input[placeholder="Masukkan nama group"]').should('be.visible').type('menggunakan simbol !@#$$%^^&*^&$%#$')
        cy.get('form > .MuiStack-root > .MuiButton-contained').should('be.visible').contains('Simpan').click()
    });

    it("Case 14 : Membuat grup dengan spasi yang berlebih", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts");
        cy.get('.css-1avq450 > .MuiGrid2-container > :nth-child(1)').should("be.visible").contains("Atur Group Kontak").click()
        cy.get('.MuiGrid2-container > :nth-child(2) > .MuiButtonBase-root').should("be.visible").contains("Buat Group").click()
        cy.get('input[placeholder="Masukkan nama group"]').should('be.visible').type('spasi berleb     ih         ')
        cy.get('form > .MuiStack-root > .MuiButton-contained').should('be.visible').contains('Simpan').click()
    });

    it("Case 15 : Mencari grup yang dibuat menggunakan simbol dikolom pencarian", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts");

        cy.get('.css-1avq450 > .MuiGrid2-container > :nth-child(1)').should("be.visible").contains("Atur Group Kontak").click()

        cy.get('input[placeholder="Cari group"]').should("be.visible").type('menggunakan simbol !@#$$%^^&*^&$%#$')

        cy.wait(3000)

        cy.get('.MuiPaper-root > .MuiTable-root').find('td').eq(0).each(($td) => {
            cy.wrap($td).should('be.visible').contains('menggunakan simbol !@#$$%^^&*^&$%#$')
        });

        cy.get('.MuiPaper-root > .MuiTable-root').find('tr').should('contain', 'menggunakan simbol !@#$$%^^&*^&$%#$')
    });

    it("Case 16 : Mencari grup yang dibuat menggunakan spasi berlebih dikolom pencarian", () => {
        cy.visit("https://cashflow.assist.id/admin/contacts");

        cy.get('.css-1avq450 > .MuiGrid2-container > :nth-child(1)').should("be.visible").contains("Atur Group Kontak").click()

        cy.get('input[placeholder="Cari group"]').should("be.visible").type('spasi berleb     ih         ')

        cy.wait(3000)

        cy.get('.MuiPaper-root > .MuiTable-root').find('td').eq(0).each(($td) => {
            cy.wrap($td).should('be.visible').contains('spasi berleb ih')
        });

        cy.get('.MuiPaper-root > .MuiTable-root').find('tr').should('contain', 'spasi berleb ih')

        cy.log('spasi berlebih otomatis terhapus')
    });

});

