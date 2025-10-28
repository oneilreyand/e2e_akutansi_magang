describe('REQ-007: Validasi Input Form Survey', () => {
    const url = 'https://dev-antricepat.assist.id/feedback-oa-test-oa-nps-fee-kota-pekanbaru-riau?code=LSKLYG';
    const fieldNama = 'input[placeholder="Masukkan nama lengkap"]';
    const fieldNomorHP = 'input[placeholder="Masukkan nomor handphone"]';
    const btnKirim = 'button[type=button]';
    const errorFieldNama = 'Nama tidak boleh hanya angka';
    const errorFieldNoHP = 'Nomor handphone harus 11–13 digit';
    const namaPasien = 'Jodica Alyasa Restama';
    const nomorHP = '082170751345';

    beforeEach(() =>{
        cy.visit(url);
    })

    it('TC-022: Pasien tidak dapat melanjutkan survey, apabila hanya field Nama Pasien yang diisi', () =>{
        cy.wait(3000);
        cy.get(fieldNama).should('have.value', namaPasien);
        cy.get(fieldNomorHP).should('have.value', nomorHP);      
        cy.get(fieldNomorHP).then(($input) =>{
            if($input.val() !== ''){
                cy.wrap($input).clear();
            }
        });
        cy.get(fieldNomorHP).should('have.value','');
        cy.get(btnKirim).should('be.disabled');
    })

    it('TC-023: Pasien tidak dapat melanjutkan survey, apabila hanya field Nomor Handphone yang diisi', ()=>{
        cy.wait(3000);
        cy.get(fieldNama).should('have.value', namaPasien);
        cy.get(fieldNama).then(($input) =>{
            if($input.val() !== ''){
                cy.wrap($input).clear();
            }
        });
        cy.get(fieldNama).should('have.value','');
        cy.get(fieldNomorHP).should('have.value', nomorHP);
        cy.get(btnKirim).should('be.disabled');
    })

    it('TC-024: Pasien tidak dapat menlanjutkan survey, apabila kedua field kosong', ()=>{
        cy.wait(3000);
        cy.get(fieldNama).should('have.value', namaPasien);
        cy.get(fieldNomorHP).should('have.value', nomorHP);
        cy.get(fieldNama).then(($input) =>{
            if($input.val() !== ''){
                cy.wrap($input).clear();
            }
        });
        cy.get(fieldNama).should('have.value','');
        cy.get(fieldNomorHP).then(($input) =>{
            if($input.val() !== ''){
                cy.wrap($input).clear();
            }
        });
        cy.get(fieldNomorHP).should('have.value','');
        cy.get(btnKirim).should('be.disabled');
    })

    it('TC-025: Pasien tidak dapat mengisi field Nama Pasien dengan Nomor Handphone', () =>{
        cy.wait(3000);
        cy.get(fieldNama).should('have.value', namaPasien);
        cy.get(fieldNomorHP).should('have.value', nomorHP);
        cy.get(fieldNama).clear().should('have.value','');
        cy.get(fieldNama).type(nomorHP)
        cy.contains(errorFieldNama);
        cy.get(btnKirim).should('be.disabled');
    })

    it('TC-026: Pasien tidak dapat mengisi field Nomor Handphone dengan Nama Pasien', ()=>{
        cy.wait(3000);
        cy.get(fieldNama).should('have.value', namaPasien);
        cy.get(fieldNomorHP).should('have.value', nomorHP);
        cy.get(fieldNomorHP).clear().should('have.value','');
        cy.get(fieldNomorHP).type(namaPasien).should('have.value','');
        cy.get(btnKirim).should('be.disabled');
    })

    it('TC-030: Pasien tidak dapat melanjutkan survey apabila nomor handphone kurang dari 11 digit', ()=>{
        cy.wait(3000);
        cy.get(fieldNama).should('have.value', namaPasien);
        cy.get(fieldNomorHP).should('have.value', nomorHP);
        cy.get(fieldNomorHP).clear().should('have.value','');
        cy.get(fieldNomorHP).type('08217075');
        cy.contains(errorFieldNoHP);
        cy.get(btnKirim).should('be.disabled');
    })

    it('TC-031: Pasien tidak dapat melanjutkan survey apabila nomor handphone lebih dari 13 digit', ()=>{
        cy.wait(3000);
        cy.get(fieldNama).should('have.value', namaPasien);
        cy.get(fieldNomorHP).should('have.value', nomorHP);
        cy.get(fieldNomorHP).clear().should('have.value','');
        cy.get(fieldNomorHP).type('0821707513450821');
        cy.contains(errorFieldNoHP);
        cy.get(btnKirim).should('be.disabled');
    })

    // it('TC-032: Pasien tidak dapat mengisi field Nomor Handphone dengan huruf e', ()=>{
    //     cy.get(fieldNama).then(($input) => {
    //         if ($input.val() !== '') {
    //             cy.wrap($input).clear();
    //         }
    //     });
    //     cy.get(fieldNomorHP).type('e');
    //     cy.get(fieldNomorHP).should('have.value','');
    //     cy.get(btnKirim).should('be.disabled');
    // })

    // it('TC-033: Pasien tidak dapat mengisi field Nomor Handphone dengan karakter  + dan -', ()=>{
    //     cy.get(fieldNomorHP).type('+6282170751345');
    //     cy.get(fieldNomorHP).should('have.value','6282170751345');
    //     cy.get(fieldNomorHP).clear().type('0821-7075-1345');
    //     cy.get(fieldNomorHP).should('have.value','082170751345');
    // })
})