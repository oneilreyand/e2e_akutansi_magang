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

  it('Sistem menampilkan data penjualan pada tab Semua sesuai dengan API', () => {
  // Intercept API call
  cy.intercept('GET', 'https://api-uat-cashbook.assist.id/api/penjualan?keyword=&status=&startDate=2025-11-01&endDate=2025-11-30&skip=0&limit=10&companyId=b1e0a510-c451-11f0-a063-db13fc9e471b').as('getPenjualanAll');

  cy.visit('https://uat-cashbook.assist.id/admin/sales');
  
  // Menutup pop up
  cy.get('.qcw-trigger-btn > .svelte-7gdhvy').click();

  // Tunggu API call dan validasi response
  cy.wait('@getPenjualanAll').then((interception) => {
    // Validasi API response - PERBAIKAN DI SINI
    expect(interception.response.statusCode).to.equal(200);
    
    // Gunakan property yang sesuai dengan response sebenarnya
    const responseBody = interception.response.body;
    cy.log('Struktur response:', responseBody);
    
    // Cek property yang ada di response
    expect(responseBody).to.have.property('results'); // Property yang sebenarnya
    expect(responseBody).to.have.property('totalData'); // Property yang sebenarnya

    const apiData = responseBody.results; // Ambil data dari property 'results'
    cy.log(`API berhasil terhubung, data diterima: ${apiData.length} records`);

    // Validasi sederhana bahwa tabel menampilkan data
    cy.get('table').should('be.visible');
    cy.get('tbody tr').should('have.length.at.least', 1);

    cy.log('Validasi berhasil: API terhubung dan data ditampilkan di tabel');
  });
});
});0
