describe('Sistem menampilkan status Dibayar Sebagian pada tab Lunas', () => {
  beforeEach(() => {
    cy.request({
      method: 'POST',
      url: 'https://api-uat-cashbook.assist.id/api/login',
      body: {
        email: 'raska23si@mahasiswa.pcr.ac.id',
        password: '12345678'
      },
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      const token = response.body.token;
      window.sessionStorage.setItem('token', token);
      window.localStorage.setItem('token', token);
      cy.log('Login berhasil via API');
    });
  });

  it('Sistem menampilkan status Dibayar Sebagian pada tab Lunas', () => {
    cy.visit('https://uat-cashbook.assist.id/admin/sales');
    
    // Menutup pop up
    cy.get('.qcw-trigger-btn > .svelte-7gdhvy').click();

    // Tunggu tabel load
    cy.get('table', { timeout: 10000 }).should('be.visible');

    // Klik tab Lunas
    cy.get('.MuiTabs-list > :nth-child(5)').click();

    // Tunggu data reload setelah pindah tab
    cy.wait(2000);

    // Validasi tab Dibayar Sebagian aktif
    cy.get('.MuiTabs-list > .Mui-selected').should('contain.text', 'Dibayar Sebagian');

    // Validasi semua data memiliki status "Dibayar Sebagian"
    cy.get('tbody tr').should('exist').then(($rows) => {
      const rowCount = $rows.length;
      
      if (rowCount > 0) {
        cy.log(`Ditemukan ${rowCount} data dengan status Dibayar Sebagian`);
        
        // Validasi setiap baris satu per satu dengan query ulang
        for (let i = 0; i < rowCount; i++) {
          cy.get('tbody tr').eq(i).within(() => {
            cy.get('td').eq(4).should('contain.text', 'Dibayar Sebagian');
          });
        }
        
        cy.log('Semua data di tab Dibayar Sebagian memiliki status yang sesuai');
      } else {
        cy.log('Tidak ada data dengan status Dibayar Sebagian');
      }
    });
  });
});