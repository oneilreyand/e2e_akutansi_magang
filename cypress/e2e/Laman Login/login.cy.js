describe('Pengujian Laman Login Assist.id', () => {
  const baseUrl = 'https://uat-cashbook.assist.id/';
  const validEmail = 'raska23si@mahasiswa.pcr.ac.id';
  const validPassword = '12345678';

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it('Memastikan elemen login muncul dengan benar', () => {
    cy.get('[data-testid="login-title"]')
      .should('be.visible')
      .and('have.text', 'Masuk ke akunmu');a

    cy.get('#email')
      .should('be.visible')
      .and('have.attr', 'type', 'email');

    cy.get('#password')
      .should('be.visible')
      .and('have.attr', 'type', 'password');

    cy.get('[data-testid="login-submit-button"]')
      .should('be.visible')
      .and('contain.text', 'Masuk');
  });

  it('Melakukan login dengan kredensial valid', () => {
    cy.get('#email').type(validEmail);
    cy.get('#password').type(validPassword);
    cy.get('[data-testid="login-submit-button"]').click();

    cy.url().should('include', '/dashboard'); // sesuaikan URL dashboard
    cy.get('[data-testid="drawer-item-sales"]').should('be.visible');
  });

  it('Menampilkan pesan error saat login dengan data kosong', () => {
    cy.get('[data-testid="login-submit-button"]').click();
    cy.get('.MuiFormHelperText-root')
      .should('exist')
      .and('contain.text', 'Wajib diisi'); // ubah sesuai teks validasi
  });

  it('Menampilkan pesan error saat login dengan password salah', () => {
    cy.get('#email').type(validEmail);
    cy.get('#password').type('passwordSalah123');
    cy.get('[data-testid="login-submit-button"]').click();

    cy.get('.MuiAlert-message')
      .should('exist')
      .and('contain.text', 'Email atau password salah'); // ubah sesuai sistem
  });

  it('Mengidentifikasi judul login', () => {
    cy.get('[data-testid="login-title"]').should('have.text', 'Masuk ke akunmu');
  });

  it('Mengidentifikasi tombol masuk', () => {
    cy.get('[data-testid="login-submit-button"]').should('have.text', 'Masuk');
  });

  it('Memastikan tombol Ingat Saya aktif dan berfungsi', () => {
    cy.get('input[type="checkbox"]').as('checkboxIngatSaya');
    cy.get('@checkboxIngatSaya').should('exist').and('not.be.checked');
    cy.get('@checkboxIngatSaya').click().should('be.checked');
  });

  it('Memastikan tautan Lupa Password tersedia dan dapat diklik', () => {
    cy.contains('Lupa password?')
      .should('be.visible')
      .and('have.attr', 'href')
      .then((href) => {
        expect(href).to.include('/forgot-password'); // ubah sesuai link aktual
      });
  });

  // Looping percobaan login sebanyak 5 kali
  for (let i = 1; i <= 5; i++) {
    it(`Percobaan login valid ke-${i}`, () => {
      cy.get('#email').type(validEmail);
      cy.get('#password').type(validPassword);
      cy.get('[data-testid="login-submit-button"]').click();

      cy.url().should('include', '/dashboard');
      cy.get('[data-testid="drawer-item-sales"]').should('be.visible');

      cy.visit(baseUrl); // kembali ke halaman login setiap percobaan
    });
  }
});
