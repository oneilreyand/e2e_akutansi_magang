describe('Fitur Atur grup kontak', () => {
      
      it('Tekan tombol Atur grup kontak memunculkan modal box', () => {
        cy.get('button').contains('Atur Grup Kontak')
          .click();
      })

      it('Validasi judul Pengaturan Grup Kontak',() =>{
        cy.get('button').contains('Atur Grup Kontak')
          .click()
        cy.get('#modal-title').contains('Pengaturan Group Kontak')
      })

      it('Testing fitur search pada pengaturan group kontak',() =>{
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