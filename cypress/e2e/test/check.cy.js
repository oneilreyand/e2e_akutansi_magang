describe('Test pengujian',()=>{

    it('Mengunjungi website sekolah', () => {
      cy.visit('https://smkn6pekanbaru.sch.id/w3b/index.php/en/')
      cy.get('#iceMenu_122 > .iceMenuTitle > .icemega_title').should('have.text','Home')
    })




})