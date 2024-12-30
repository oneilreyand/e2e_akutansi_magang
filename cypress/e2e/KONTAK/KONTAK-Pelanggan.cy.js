describe('Check Komponen Pelanggan', () => { 
    beforeEach(() => {
        cy.getCookie('authToken'); // Memulihkan cookie sebelum setiap test
        cy.loginWithAPI('rayhanrayandra.work.id@gmail.com', 'Nz6}+#8y')
        cy.visit('https://cashflow.assist.id/admin/contacts')
    });

    it('Validasi judul H5', () => {
        cy.get('.MuiTypography-h5 > span').should('be.visible').and('contain', 'Kontak');
    });

    it('Validasi tab navigasi sesuai dan berfungsi', () => {
        cy.get('.MuiBreadcrumbs-ol').should('be.visible').and('contain', 'Beranda')
            .and('contain', '/').and('contain', 'Kontak') //keseluruhan tampilan dari navigasi
            cy.get('.MuiBreadcrumbs-ol > :nth-child(1) > .MuiTypography-root').should('be.visible') // Memastikan elemen terlihat
            .and('have.attr', 'href', '/admin/dashboard')// memastikan memiliki atribut href
            .click()
            cy.get('h5').should('contain', 'Beranda').should('be.visible');
          });

    it('Validasi button buat kontak', () => {
      cy.get('a[href="/admin/contacts/create"]')
            .should('contain','Buat Kontak')
            .and('be.visible')
          });
      
    context('Uji fungsi pada tab jenis kontak', () => {
        it('Pelanggan ke suplier', () => {
          cy.get('#simple-tab-0')
            .should('contain', 'Pelanggan').and('be.visible')
            .click()
          cy.get('.MuiTypography-h6')
            .contains('Pelanggan')
          
          cy.get('#simple-tab-1')
            .should('contain', 'Suplier').and('be.visible')
            .click()
          cy.get('.MuiTypography-h6')
            .contains('Suplier')
          
        });

        it('Pelanggan ke karyawan', () => {
          cy.get('#simple-tab-0')
            .should('contain', 'Pelanggan').and('be.visible')
            .click()
          cy.get('.MuiTypography-h6')
            .contains('Pelanggan')
          
          cy.get('#simple-tab-2')
            .should('contain', 'Karyawan').and('be.visible')
            .click()
          cy.get('.MuiTypography-h6')
            .contains('Karyawan')
          
        });
        it('Pelanggan ke lainnya', () => {
          cy.get('#simple-tab-0')
            .should('contain', 'Pelanggan').and('be.visible')
            .click()
          cy.get('.MuiTypography-h6')
            .contains('Pelanggan')
          
          cy.get('#simple-tab-3')
            .should('contain', 'Lainnya').and('be.visible')
            .click()
          cy.get('.MuiTypography-h6')
            .contains('Lainnya')
          
        });
       
    });
    
    context.only('Fitur Atur grup kontak', () => {
      
      it('Tekan tombol Atur grup kontak memunculkan modal box', () => {
        cy.get('button').contains('Atur Grup Kontak')
          .click();
      })

      it('Validasi judul Pengaturan Grup Kontak',() =>{
        cy.get('button').contains('Atur Grup Kontak')
          .click()
        cy.get('#modal-title').contains('Pengaturan Group Kontak')
      })

      it.only('Testing fitur search pada pengaturan group kontak',() =>{
        cy.get('button').contains('Atur Grup Kontak')
          .click()
            // Ambil token dari cookie
      cy.getCookie('authToken').then((cookie) => {
        const token = cookie?.value;
    
        // Pastikan token valid
        expect(token).to.exist;
    
        // Gunakan token untuk mendapatkan data API
        cy.request({
          method: 'GET',
          url: 'https://api-cashflow.assist.id/api/grupkontak/list?companyId=b13e5210-8564-11ef-af27-a72e65a1d49c',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          // Validasi status respons
          expect(response.status).to.eq(200);
          
        // Ambil data dari API
          const apiData = response.body.results;

          cy.get('table thead MuiTableHead-root css-1wbz3t9').within(() => {
            cy.contains('Nama Group').should('be.visible');
            cy.contains('Jumlah Kontak').should('be.visible');
          });
        // cy.get(':nth-child(1) > [data-testid="search-input"] > .MuiInputBase-root')
        //   .type("vendor obat asist 2")
      })
    })
    })
    });
          
          // it.only('Validasi isi tabel pada thead berdasarkan data API', () => {
            //   cy.viewport(2000, 1600);
    
    //   // Ambil token dari cookie
    //   cy.getCookie('authToken').then((cookie) => {
    //     const token = cookie?.value;
    
    //     // Pastikan token valid
    //     expect(token).to.exist;
    
    //     // Gunakan token untuk mendapatkan data API
    //     cy.request({
    //       method: 'GET',
    //       url: 'https://api-cashflow.assist.id/api/kontak/list?jenisKontak=pelanggan&skip=0&limit=10&companyId=b13e5210-8564-11ef-af27-a72e65a1d49c',
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }).then((response) => {
    //       // Validasi status respons
    //       expect(response.status).to.eq(200);
    
    //       // Ambil data dari API
    //       const apiData = response.body.results;
    
    //       // Tunggu untuk memastikan elemen tabel dimuat
    //       cy.wait(1000);
    
    //       // Validasi header tabel (thead)
    //       cy.get('table thead').within(() => {
    //         cy.contains('ID').should('be.visible');
    //         cy.contains('Nama Lengkap').should('be.visible');
    //         cy.contains('Grup Kontak').should('be.visible');
    //         cy.contains('Email & No Handphone').should('be.visible');
    //         cy.contains('Alamat').should('be.visible');
    //         cy.contains('Total Piutang').should('be.visible');
    //       });
    
    //       // Validasi jumlah baris tabel sesuai dengan data API
    //       cy.get('table tbody tr').should('have.length', apiData.length);
    
    //       // Validasi konten data di dalam tabel (tbody)
    //       cy.get('table tbody tr').each(($row, index) => {
    //         const rowData = apiData[index];
    
    //         // Pastikan data dari API ada
    //         expect(rowData).to.exist;
    
    //         cy.wrap($row).find('td').then(($cells) => {
    //           // Validasi ID
    //           const idFromTable = $cells.eq(0).attr('data-id') || $cells.eq(0).text().trim();
    //           const idFromAPI = rowData.id || '';
    //           expect(idFromTable).to.eq(idFromAPI);
    
    //           // Validasi Nama Lengkap
    //           const namaFromTable = $cells.eq(1).text().trim();
    //           const namaFromAPI = rowData.nama?.trim() || '';
    //           expect(namaFromTable).to.eq(namaFromAPI);
    
    //           // Validasi Grup Kontak
    //           const grupKontakFromAPI = rowData.grup_kontak_nama?.join(', ') || '-';
    //           const grupKontakFromTable = $cells.eq(2).text().trim();
    //           expect(grupKontakFromTable).to.eq(grupKontakFromAPI);
    
    //           // Validasi Email & No Handphone
    //           const email = rowData.email_kontak_email?.[0] || '';
    //           const noHp = rowData.no_hp || '';
    //           const emailNoHpFromAPI = `${email} ${noHp}`.trim();
    //           const emailNoHpFromTable = $cells.eq(3).text().trim().replace(/(\S)(\d)/, '$1 $2');
    //           expect(emailNoHpFromTable).to.eq(emailNoHpFromAPI);
    
    //           // Validasi Alamat
    //           const alamatFromAPI = rowData.alamat_pengiriman?.trim() || '';
    //           const alamatFromTable = $cells.eq(4).text().trim();
    //           expect(alamatFromTable).to.eq(alamatFromAPI);
    
    //           // Validasi Total Piutang
    //           function formatWithThousandSeparator(value) {
    //             return value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    //           }
    
    //           const totalPiutangFromAPI = formatWithThousandSeparator(rowData.piutang_max?.toString() || '0');
    //           const totalPiutangFromTable = $cells.eq(5).text().trim().replace(/^Rp\s*/, '');
    //           expect(totalPiutangFromTable).to.eq(totalPiutangFromAPI);
    //         });
    //       });
    //     });
    //   });
    // });
    
    
    
    
    
        
        
        
        
        

});