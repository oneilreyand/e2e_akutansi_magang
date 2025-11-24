describe('Penjualan', () => {
  beforeEach(() => {
    // Kode login langsung di sini
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

it('Sistem menampilkan data penjualan di tab Belum Dibayar sesuai dengan API', () => {
  // Intercept API call untuk tab Belum Dibayar
  cy.intercept('GET', 'https://api-uat-cashbook.assist.id/api/penjualan?keyword=&status=Belum+Dibayar&startDate=2025-11-01&endDate=2025-11-30&skip=0&limit=10&companyId=ab78f6b2-afdd-11f0-9aae-9bbc0c8b2cba').as('getPenjualanBelumDibayar');

  cy.visit('https://uat-cashbook.assist.id/admin/sales');
  
  // Menutup pop up
  cy.get('.qcw-trigger-btn > .svelte-7gdhvy').click();

  // Step 1: Buka menu Penjualan (sudah dilakukan di visit)
  // Step 2: Klik tab Belum Dibayar pada tabel Penjualan
  cy.get('body').then(($body) => {
    // Cari tab "Belum Dibayar" - sesuaikan selector dengan UI yang ada
    if ($body.find('[data-testid="tab-belum-dibayar"]').length > 0) {
      cy.get('[data-testid="tab-belum-dibayar"]').click();
    } else if ($body.find('button:contains("Belum Dibayar")').length > 0) {
      cy.get('button:contains("Belum Dibayar")').click();
    } else if ($body.find('.MuiTab-root:contains("Belum Dibayar")').length > 0) {
      cy.get('.MuiTab-root:contains("Belum Dibayar")').click();
    } else {
      cy.log('Tab Belum Dibayar tidak ditemukan, menggunakan selector default');
    }
  });

  // Tunggu API call dan validasi response
  cy.wait('@getPenjualanBelumDibayar').then((interception) => {
    // Validasi API response
    expect(interception.response.statusCode).to.equal(200);
    
    const responseBody = interception.response.body;
    cy.log('Struktur response Belum Dibayar:', responseBody);
    
    // Cek property yang ada di response
    expect(responseBody).to.have.property('results');
    expect(responseBody).to.have.property('totalData');

    const apiData = responseBody.results;
    cy.log(`API Belum Dibayar berhasil terhubung, data diterima: ${apiData.length} records`);

    // Validasi sederhana bahwa tabel menampilkan data
    cy.get('table').should('be.visible');
    
    if (apiData.length > 0) {
      cy.get('tbody tr').should('have.length.at.least', 1);
    } else {
      cy.get('tbody').should(($tbody) => {
        expect($tbody.text()).to.match(/(No data|Tidak ada data|Data tidak ditemukan)/i);
      });
    }

    cy.log('Validasi berhasil: API tab Belum Dibayar terhubung dan data ditampilkan di tabel');
  });
});
});0
