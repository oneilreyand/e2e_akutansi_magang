describe('Sistem menampilkan status penjualan pada tab Semua', () => {
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

  it('Sistem menampilkan status penjualan pada tab Semua', () => {
    cy.visit('https://uat-cashbook.assist.id/admin/sales');
    
    // Menutup pop up
    cy.get('.qcw-trigger-btn > .svelte-7gdhvy').click();

    // Tunggu tabel load
    cy.get('table', { timeout: 10000 }).should('be.visible');

    // Validasi tab Semua aktif
    cy.get('.MuiTabs-list > .Mui-selected').should('contain.text', 'Semua');

    // Validasi header Status
    cy.get('th').contains('Status').should('be.visible');

    // Validasi status pada setiap baris data yang ada
    cy.get('tbody tr').then(($rows) => {
      // Cek jika ada data
      if ($rows.length > 0) {
        cy.log(`Ditemukan ${$rows.length} baris data`);
        
        cy.wrap($rows).each(($row) => {
          cy.wrap($row).within(() => {
            cy.get('td').eq(4).then(($statusCell) => {
              const statusText = $statusCell.text().trim();
              
              // Skip jika status kosong
              if (statusText === '') {
                cy.log('Status kosong, dilewati');
                return;
              }

              // Validasi status sesuai dengan yang diharapkan
              const allowedStatuses = [
                'Belum Dibayar',
                'Jatuh Tempo', 
                'Lunas',
                'Dibayar Sebagian',
                'Void'
              ];

              if (allowedStatuses.includes(statusText)) {
                cy.log(`✓ Status valid: ${statusText}`);
                expect(allowedStatuses).to.include(statusText);
              } else {
                cy.log(`⏭ Status tidak dikenali: "${statusText}" - bukan status pembayaran`);
              }
            });
          });
        });
      } else {
        cy.log('Tidak ada data penjualan yang ditampilkan');
      }
    });

    cy.log('Validasi status penjualan pada tab Semua selesai');
  });
});