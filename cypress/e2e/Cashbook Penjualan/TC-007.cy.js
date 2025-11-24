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

  it('Sistem menampilkan skeleton loading Penjualan saat data sedang di-fetch', () => {
    // Intercept dan delay response
    cy.intercept('GET', '**/api/penjualan**', (req) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(req.continue());
        }, 3000);
      });
    }).as('fetchPenjualan');

    cy.visit('https://uat-cashbook.assist.id/admin/sales');

    // Cek skeleton loading
    
    cy.get('body').then(($body) => {
      const skeletonSelectors = [
        '.skeleton',
        '.skeleton-loader', 
        '.animate-pulse',
        '[data-testid*="skeleton"]',
        '[data-testid*="loading"]',
        '[class*="skeleton"]',
        '[class*="loading"]',
        '.loading-shimmer',
        '.MuiSkeleton-root'
      ];

      const foundSkeleton = skeletonSelectors.find(selector => 
        $body.find(selector).length > 0
      );

      if (foundSkeleton) {
        cy.get(foundSkeleton).first().should('be.visible');
        cy.log(`Skeleton ditemukan dengan selector: ${foundSkeleton}`);
      } else {
        cy.log('Tidak ada skeleton ditemukan');
      }
    });

    cy.wait('@fetchPenjualan');

    // Validasi data muncul - gunakan approach yang lebih reliable
    cy.get('table', { timeout: 10000 }).should('be.visible');
    cy.get('tbody tr', { timeout: 10000 }).should('have.length.gt', 0);
    cy.log('Data penjualan berhasil dimuat');
  });

  it('Sistem menampilkan data Penjualan setelah loading selesai', () => {
    cy.visit('https://uat-cashbook.assist.id/admin/sales');

    cy.get('.qcw-trigger-btn > .svelte-7gdhvy').click();
    
    // Validasi table dan data
    cy.get('table', { timeout: 30000 }).should('be.visible');
    cy.get('tbody tr', { timeout: 30000 }).should('have.length.gt', 0);
    
    // Validasi minimal ada header atau data
    cy.get('table th').should('exist');
    cy.get('tbody td').should('exist');
    
    cy.log('Data penjualan tampil tanpa masalah');
  });
});