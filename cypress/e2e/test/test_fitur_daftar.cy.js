// describe('Testing UI dasar Halaman Daftar Akun Baru', () => {

//     beforeEach(() => {
//         cy.visit('https://cashflow.assist.id/auth/register')
//     });
    
//     it('001 - Memverifikasi keberadaan dan visibilitas logo assist.id ada dan terlihat serta, tautan kembali ada dan halaman tidak berubah', () => {
//         cy.get('.jss4')
//             .should('exist')
//             .and('be.visible')
//             .then(() => {
//                 cy.log('Logo Assist.id ada dan terlihat')
//             })
//         cy.get('[href="/"]')
//             .should('exist')
//         cy.url()
//             .should('eq', 'https://cashflow.assist.id/')
//             .then(() => {
//                 cy.log('tautan kembali pada logo ada dan url tidak berubah')
//             })
//     })
    
//     it('002 - Memverifikasi keberadaan, visibilitas, dan kesesuaian teks judul', () => {
//         cy.get('[data-testid="register-initial-title"]')
//             .should('exist')
//             .and('be.visible')
//             .contains('Daftar Akun Baru')
//             .then(() => {
//                 cy.log('Judul halaman login ada, terlihat, dan sesuai')
//             })
//     })
// })