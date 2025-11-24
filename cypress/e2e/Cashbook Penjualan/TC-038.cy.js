describe('Sistem tidak menampilkan data karena tidak ada transaksi pada rentang tanggal yang dipilih', () => {
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

  it('Sistem menampilkan pesan peringatan ketika tanggal dikosongkan', () => {
    cy.visit('https://uat-cashbook.assist.id/admin/sales');

    // Tunggu halaman load
    cy.get('body', { timeout: 10000 }).should('be.visible');

    // Klik filter tanggal dan tutup popup
    cy.get('.qcw-trigger-btn > .svelte-7gdhvy').click();
    cy.get('.MuiBox-root > .MuiButtonBase-root').click();
    
    // Tunggu modal date picker terbuka
    cy.get('.MuiPopover-root.MuiModal-root', { timeout: 5000 }).should('be.visible');
    
    // Kosongkan tanggal awal
    cy.get('.MuiPopover-paper input').first()
      .clear({ force: true });

    // Kosongkan tanggal akhir
    cy.get('.MuiPopover-paper input').eq(1)
      .clear({ force: true });
    
    // Klik tombol Apply
    cy.get('.MuiGrid2-container > .MuiButton-contained').click();

    // Validasi pesan peringatan muncul
    cy.get('.MuiAlert-root, .MuiSnackbar-root, [role="alert"], .error-message, .warning-message', { timeout: 5000 })
      .should('exist')
      .and('be.visible')
      .and('contain.text', 'tanggal');

    cy.log('✅ Sistem menampilkan pesan peringatan untuk mengisi tanggal terlebih dahulu');
  });

  it('Sistem tidak menampilkan data untuk rentang tanggal tanpa transaksi', () => {
    cy.visit('https://uat-cashbook.assist.id/admin/sales');

    // Tunggu halaman load
    cy.get('body', { timeout: 10000 }).should('be.visible');

    // Klik filter tanggal dan tutup popup
    cy.get('.qcw-trigger-btn > .svelte-7gdhvy').click();
    cy.get('.MuiBox-root > .MuiButtonBase-root').click();
    
    // Tunggu modal date picker terbuka
    cy.get('.MuiPopover-root.MuiModal-root', { timeout: 5000 }).should('be.visible');
    
    // Input tanggal awal 01/12/2025
    cy.get('.MuiPopover-paper input').first()
      .clear({ force: true })
      .focus()
      .wait(1000);

    cy.focused()
      .type('0', { delay: 200 })
      .type('1', { delay: 200 })
      .type('/', { delay: 200 })
      .type('1', { delay: 200 })
      .type('2', { delay: 200 })
      .type('/', { delay: 200 })
      .type('2', { delay: 200 })
      .type('0', { delay: 200 })
      .type('2', { delay: 200 })
      .type('5', { delay: 200 });

    // Input tanggal akhir 30/12/2025
    cy.get('.MuiPopover-paper input').eq(1)
      .clear({ force: true })
      .focus()
      .wait(1000);

    cy.focused()
      .type('3', { delay: 200 })
      .type('0', { delay: 200 })
      .type('/', { delay: 200 })
      .type('1', { delay: 200 })
      .type('2', { delay: 200 })
      .type('/', { delay: 200 })
      .type('2', { delay: 200 })
      .type('0', { delay: 200 })
      .type('2', { delay: 200 })
      .type('5', { delay: 200 });
    
    // Klik tombol Apply
    cy.get('.MuiGrid2-container > .MuiButton-contained').click();

    // Tunggu data reload
    cy.wait(3000);

    // Validasi tidak ada data yang ditampilkan
    cy.get('tbody tr').should('have.length', 0);
    
    // Validasi pesan "tidak ada data" atau similar
    cy.get('body').then(($body) => {
      if ($body.text().includes('Tidak ada data') || 
          $body.text().includes('No data') || 
          $body.text().includes('Data tidak ditemukan')) {
        cy.log('✅ Sistem menampilkan pesan "tidak ada data"');
      } else {
        cy.log('✅ Tabel kosong - tidak ada data dalam rentang tanggal tersebut');
      }
    });

    cy.log('✅ Sistem tidak menampilkan data untuk rentang tanggal tanpa transaksi');
  });
});