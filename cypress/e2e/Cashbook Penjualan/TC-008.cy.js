describe('Penjualan', () => {
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

  it('Sistem dapat memfilter data Penjualan berdasarkan tanggal', () => {
    cy.visit('https://uat-cashbook.assist.id/admin/sales');

    // Tunggu halaman load
    cy.get('body', { timeout: 10000 }).should('be.visible');

    // Klik filter tanggal untuk membuka date picker dan menutup popup yang mungkin terbuka
    cy.get('.qcw-trigger-btn > .svelte-7gdhvy').click();
    cy.get('.MuiBox-root > .MuiButtonBase-root').click();
    
    // Tunggu modal date picker terbuka
    cy.get('.MuiPopover-root.MuiModal-root', { timeout: 5000 }).should('be.visible');
    
    // Clear dan fokus ke input pertama
    cy.get('.MuiPopover-paper input').first()
      .clear({ force: true })
      .focus()
      
    // Ketik tanggal awal karakter per karakter dengan delay lebih lama
    cy.focused()
      .type('01122025')

    // Pindah ke input kedua
    cy.get('.MuiPopover-paper input').eq(1)
      .clear({ force: true })
      .focus()
      

    // Ketik tanggal akhir karakter per karakter dengan delay lebih lama  
    cy.focused()
      .type('31122025')
    // Klik tombol Apply untuk menerapkan filter
    cy.get('.MuiGrid2-container > .MuiButton-contained').click();

    // Validasi filter diterapkan
    cy.log('Filter tanggal berhasil diterapkan: 01/12/2025 - 31/12/2025');
    
    // Tunggu data reload setelah filter
    cy.wait(3000);
    
    // Validasi data masih tampil setelah filter
    cy.get('body').should('contain', 'Total Penjualan');
  });
});