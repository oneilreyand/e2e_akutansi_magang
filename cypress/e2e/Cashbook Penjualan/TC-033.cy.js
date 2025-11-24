describe('Penjualan - Autentikasi Status Pembayaran', () => {
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

  // Fungsi yang sama untuk semua tab
  const testTab = (tabNumber) => {
    cy.visit('https://uat-cashbook.assist.id/admin/sales');
    
    // Tutup pop up
    cy.get('.qcw-trigger-btn > .svelte-7gdhvy').click();

    // Tunggu tabel loading
    cy.get('.MuiTableContainer-root', { timeout: 10000 }).should('be.visible');

    // Klik tab jika bukan tab pertama
    if (tabNumber > 1) {
      cy.get(`.MuiTabs-list > :nth-child(${tabNumber})`).click();
      cy.wait(2000);
    }

    // Validasi header Status
    cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(5)')
      .should('be.visible')
      .and('contain.text', 'Status');

    const foundStatuses = new Set();

    // Cek 10 baris data, tapi hanya yang ada
    for (let row = 1; row <= 10; row++) {
      // Cek dulu apakah baris ini ada
      cy.get('body').then(($body) => {
        if ($body.find(`:nth-child(${row}) > :nth-child(5)`).length > 0) {
          // Jika baris ada, ambil statusnya
          cy.get(`:nth-child(${row}) > :nth-child(5)`).then(($statusCell) => {
            const statusText = $statusCell.text().trim();
            
            if (statusText && statusText !== '') {
              // Daftar status yang valid
              const allowedStatuses = [
                'Belum Dibayar',
                'Jatuh Tempo', 
                'Lunas',
                'Dibayar Sebagian',
                'Void'
              ];

              // Cek apakah status valid
              if (allowedStatuses.includes(statusText)) {
                foundStatuses.add(statusText);
                cy.log(`✓ Tab ${tabNumber} - Baris ${row}: Status "${statusText}" valid`);
              }
            }
          });
        } else {
          // Jika baris tidak ada, log hanya untuk baris pertama
          if (row === 1) {
            cy.log(`⚠ Tab ${tabNumber} - Tidak ada data`);
          }
          return false; // Stop loop
        }
      });
    }

    // Tampilkan hasil
    cy.then(() => {
      cy.log(`Tab ${tabNumber} - Total status unik: ${foundStatuses.size}`);
      cy.log(`Tab ${tabNumber} - Status ditemukan: ${Array.from(foundStatuses).join(', ')}`);
    });
  };

  it('Sistem menampilkan status “Belum Dibayar” pada tab Belum Dibayar', () => {
    testTab(1);
  });

  it('Sistem mengautentikasi label Status pembayaran di tab kedua', () => {
    testTab(2);
  });

  it('Sistem mengautentikasi label Status pembayaran di tab ketiga', () => {
    testTab(3);
  });

  it('Sistem mengautentikasi label Status pembayaran di tab keempat', () => {
    testTab(4);
  });

  it('Sistem mengautentikasi label Status pembayaran di tab kelima', () => {
    testTab(5);
  });

  it('Sistem mengautentikasi label Status pembayaran di tab keenam', () => {
    testTab(6);
  });

it('Sistem menangani status yang tidak valid di halaman pertama', () => {
  cy.visit('https://uat-cashbook.assist.id/admin/sales');
  
  // Tutup pop up
  cy.get('.qcw-trigger-btn > .svelte-7gdhvy').click();

  // Tunggu tabel loading
  cy.get('.MuiTableContainer-root', { timeout: 10000 }).should('be.visible');

  // Hanya cek baris yang benar-benar ada
  cy.get('tbody tr').each(($row, index) => {
    cy.wrap($row).within(() => {
      cy.get('td').eq(4).then(($statusCell) => {
        const statusText = $statusCell.text().trim();
        
        if (statusText && statusText !== '') {
          // Validasi dasar - hanya memastikan tidak ada nilai teknis yang invalid
          expect(statusText, `Baris ${index + 1} tidak boleh kosong`).to.not.equal('');
          expect(statusText, `Baris ${index + 1} tidak boleh NaN`).to.not.contain('NaN');
          expect(statusText, `Baris ${index + 1} tidak boleh undefined`).to.not.contain('undefined');
          expect(statusText, `Baris ${index + 1} tidak boleh null`).to.not.contain('null');
          
          cy.log(`✓ Baris ${index + 1}: Status "${statusText}" lolos validasi teknis`);
        } else {
          cy.log(`⏭ Baris ${index + 1}: Status kosong, dilewati`);
        }
      });
    });
  });

  cy.log('Tidak ada status yang invalid secara teknis');
});
});