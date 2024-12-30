describe('Check Komponen Suplier', () => { 
    beforeEach(() => {
        cy.getCookie('authToken'); // Memulihkan cookie sebelum setiap test
        cy.loginWithAPI('rayhanrayandra.work.id@gmail.com', 'Nz6}+#8y')
        cy.visit('https://cashflow.assist.id/admin/contacts')
        cy.get('#simple-tab-1') //pindah ke tab suplier
        .should('contain', 'Suplier').and('be.visible')
        .click()
        cy.get('.MuiTypography-h6')
        .contains('Suplier')
    });
    
    
    it('Validasi judul', () => {
        cy.get('.MuiTypography-h5 > span').should('be.visible').and('contain', 'Kontak');
    });

    it('Validasi Navigasi pada tab suplier berfungsi', () => {
        cy.get('.MuiBreadcrumbs-ol').should('be.visible').and('contain', 'Beranda')
            .and('contain', '/').and('contain', 'Kontak') //keseluruhan tampilan dari navigasi
        cy.get('.MuiBreadcrumbs-ol > :nth-child(1) > .MuiTypography-root').should('be.visible') // Memastikan elemen terlihat
            .and('have.attr', 'href', '/admin/dashboard') // memastikan memiliki atribut href
            .click()
        cy.get('h5').should('contain', 'Beranda').should('be.visible');
    });

    it('Valisdasi button buat kontak', () => {
        cy.get('[style="opacity: 1; will-change: auto;"] > .MuiAppBar-root > .MuiToolbar-root > .MuiButtonBase-root') //tombol buat kontak
            .should('have.attr','href','/admin/contacts/create')
            .and('contain','Buat Kontak')
            .and('be.visible')
        
    });

    it('Validasi isi tabel pada thead berdasarkan data API', () => {
      cy.viewport(2000, 1600);
    
      // Ambil token dari cookie
      cy.getCookie('authToken').then((cookie) => {
        const token = cookie?.value;
    
        // Pastikan token valid
        expect(token).to.exist;
    
        // Gunakan token untuk mendapatkan data API
        cy.request({
          method: 'GET',
          url: 'https://api-cashflow.assist.id/api/kontak/list?jenisKontak=suplier&skip=0&limit=10&companyId=b13e5210-8564-11ef-af27-a72e65a1d49c',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          // Validasi status respons
          expect(response.status).to.eq(200);
    
          // Ambil data dari API
          const apiData = response.body.results;
    
          // Tunggu untuk memastikan elemen tabel dimuat
          cy.wait(1000);
    
          // Validasi header tabel (thead)
          cy.get('table thead').within(() => {
            cy.contains('ID').should('be.visible');
            cy.contains('Nama Lengkap').should('be.visible');
            cy.contains('Grup Kontak').should('be.visible');
            cy.contains('Email & No Handphone').should('be.visible');
            cy.contains('Alamat').should('be.visible');
            cy.contains('Total Piutang').should('be.visible');
          });
    
          // Validasi jumlah baris tabel sesuai dengan data API
          cy.get('table tbody tr').should('have.length', apiData.length);
    
          // Validasi konten data di dalam tabel (tbody)
          cy.get('table tbody tr').each(($row, index) => {
            const rowData = apiData[index];
    
            // Pastikan data dari API ada
            expect(rowData).to.exist;
    
            cy.wrap($row).find('td').then(($cells) => {
              // Validasi ID
              const idFromTable = $cells.eq(0).attr('data-id') || $cells.eq(0).text().trim();
              const idFromAPI = rowData.id || '';
              expect(idFromTable).to.eq(idFromAPI);
    
              // Validasi Nama Lengkap
              const namaFromTable = $cells.eq(1).text().trim();
              const namaFromAPI = rowData.nama?.trim() || '';
              expect(namaFromTable).to.eq(namaFromAPI);
    
              // Validasi Grup Kontak
              const grupKontakFromAPI = rowData.grup_kontak_nama?.join(', ') || '-';
              const grupKontakFromTable = $cells.eq(2).text().trim();
              expect(grupKontakFromTable).to.eq(grupKontakFromAPI);
    
              // Validasi Email & No Handphone
              const email = rowData.email_kontak_email?.[0] || '';
              const noHp = rowData.no_hp || '';
              const emailNoHpFromAPI = `${email} ${noHp}`.trim();
              const emailNoHpFromTable = $cells.eq(3).text().trim().replace(/(\S)(\d)/, '$1 $2');
              expect(emailNoHpFromTable).to.eq(emailNoHpFromAPI);
    
              // Validasi Alamat
              const alamatFromAPI = rowData.alamat_pengiriman?.trim() || '';
              const alamatFromTable = $cells.eq(4).text().trim();
              expect(alamatFromTable).to.eq(alamatFromAPI);
    
              // Validasi Total Piutang
              function formatWithThousandSeparator(value) {
                return value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
              }
    
              const totalPiutangFromAPI = formatWithThousandSeparator(rowData.piutang_max?.toString() || '0');
              const totalPiutangFromTable = $cells.eq(5).text().trim().replace(/^Rp\s*/, '');
              expect(totalPiutangFromTable).to.eq(totalPiutangFromAPI);
            });
          });
        });
      });
    });
    
    
    
    
        
        it('Card konten', () => {
        cy.get(':nth-child(1) > .MuiPaper-root > .MuiCardContent-root')
        .contains('Piutang belum dibayar')
        cy.get(':nth-child(2) > .MuiPaper-root > .MuiCardContent-root')
        .contains('Piutang jatuh tempo')
        cy.get(':nth-child(3) > .MuiPaper-root > .MuiCardContent-root')
        .contains('Kredit memo')
        .should('belum.siap')
        
    });

    it('Button atur grup kontak memunculkan box-modal', () => {
        cy.get('.css-1avq450 > .MuiGrid2-container > :nth-child(1)')
        .contains('Atur Grup Kontak').should('be.visible')
        .click()
        
        
        
        
        
    });

 })
        
  
        // cy.get('#simple-tab-2')
        // .should('contain', 'Karyawan').and('be.visible')
        // .click()
        // cy.get('.MuiTypography-h6')
        // .contains('Karyawan')
  
        // cy.get('#simple-tab-3')
        // .should('contain', 'Lainnya').and('be.visible')
        // .click()
        // cy.get('.MuiTypography-h6')
        // .contains('Lainnya')