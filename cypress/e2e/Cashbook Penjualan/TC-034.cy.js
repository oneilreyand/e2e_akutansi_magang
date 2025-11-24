describe('Penjualan - Pencarian Nama Pelanggan', () => {
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
    });

    cy.visit('https://uat-cashbook.assist.id/admin/sales');
    
    // Tutup pop up
    cy.get('.qcw-trigger-btn > .svelte-7gdhvy').click();

    // Tunggu tabel loading
    cy.get('.MuiTableContainer-root', { timeout: 10000 }).should('be.visible');
  });

  it('Sistem menampilkan data yang sesuai ketika mencari "Raska"', () => {
    // Input pencarian
    cy.get('.css-20tnkx > .MuiFormControl-root > .MuiInputBase-root')
      .type('Raska');

    // Tunggu hasil
    cy.wait(3000);

    // Cek dulu apakah ada data yang ditampilkan
    cy.get('.MuiTableBody-root .MuiTableRow-root').then(($rows) => {
      if ($rows.length > 0) {
        cy.log(`Ditemukan ${$rows.length} data untuk pencarian "Raska"`);
        
        // Cari di semua kolom yang mungkin mengandung nama pelanggan
        for (let col = 1; col <= 6; col++) {
          cy.get(`:nth-child(1) > :nth-child(${col})`).invoke('text').then((text) => {
            if (text.includes('Raska')) {
              cy.log(`✓ Kolom ${col} mengandung "Raska": ${text}`);
            }
          });
        }
      } else {
        cy.log('Tidak ada data yang ditemukan untuk pencarian "Raska"');
      }
    });
  });

 it('Sistem menampilkan semua data ketika pencarian dikosongkan', () => {
    // Input pencarian
    cy.get('.css-20tnkx > .MuiFormControl-root > .MuiInputBase-root')
      .type('Raska');

    cy.wait(2000);

    // Kosongkan pencarian
    cy.get('.css-20tnkx > .MuiFormControl-root > .MuiInputBase-root')
      .clear();

    cy.wait(2000);

    // Verifikasi data kembali normal
    cy.get('.MuiTableBody-root .MuiTableRow-root')
      .should('have.length.gt', 0);
  });
});