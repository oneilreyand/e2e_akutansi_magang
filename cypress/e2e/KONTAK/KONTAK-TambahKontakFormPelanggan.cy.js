describe("Tambah kontak form pelanggan", () => {
    beforeEach(() => {
      cy.getCookie("authToken"); // Memulihkan cookie sebelum setiap test
      cy.loginWithAPI("rayhanrayandra.work.id@gmail.com", "Nz6}+#8y");
      cy.visit("https://cashflow.assist.id/admin/contacts/create");
    });
context("Uji komponen dan fungsi dengan kondisi tipe kontak pelanggan", () => {

    it('Pengecekan eksistensi komponen input', () => {
        cy.get("#tipe_kontak").click();
        cy.contains("li", "Pelanggan").click();
        cy.get(
          ":nth-child(1) > .MuiCardHeader-root > .MuiCardHeader-content > .MuiTypography-root"
        ).click();
        
        cy.get('#tipe_kontak').should('be.exist')
        cy.get('#fk_grup').should('be.exist')
        cy.get('#sapaan').should('be.exist')
        cy.get('#nama').should('be.exist')
        cy.get('#tipe_identitas').should('be.exist')
        cy.get('#no_identitas').should('be.exist')
        cy.get('input[id="email.0"]').should('be.exist')
        cy.get('input[id="email.1"]').should('not.be.exist')
        cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').should('be.exist')
        cy.get('#nama_perusahaan').should('be.exist')
        cy.get('#no_hp').should('be.exist')
        cy.get('#no_telp').should('be.exist')
        cy.get('#no_fax').should('be.exist')
        cy.get('#no_npwp').should('be.exist')
        cy.get('#nitku').should('be.exist')
        cy.get('input[id=":rk:"]').should('be.exist')
        cy.get('input[id=":rl:"]').should('be.exist')
        cy.get(':nth-child(9) > .MuiGrid2-container > :nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should('be.exist')
        cy.get('input[id="data_bank[0].bank_name"]').should('be.exist')
        cy.get('input[id="data_bank[0].holder_name"]').should('be.exist')
        cy.get('input[id="data_bank[0].bank_branch"]').should('be.exist')
        cy.get('input[id="data_bank[0].rek_no"]').should('be.exist')
        cy.get('input[id="data_bank[1].bank_name"]').should('not.be.exist')
        cy.get('input[id="data_bank[1].holder_name"]').should('not.be.exist')
        cy.get('input[id="data_bank[1].bank_branch"]').should('not.be.exist')
        cy.get('input[id="data_bank[1].rek_no"]').should('not.be.exist')
        cy.get(':nth-child(3) > .MuiCardContent-root > .css-1i24z3d > .css-1st318m > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').should('be.exist')
        cy.get('#fk_akun_piutang').should('be.exist')
        cy.get('#piutang_max').should('be.exist')
        cy.get('[data-testid="input-active_piutang_max"] > .MuiButtonBase-root > .PrivateSwitchBase-input').should('be.exist')
        cy.get('#syarat_pembayaran').should('be.exist')
        cy.get('.css-16ogmd7 > .MuiButton-text').should('be.exist')
        cy.get('.MuiButton-contained').should('be.exist')
  
      });

    it('Pengecekan penulisan tombol, label dan tanda asterist "*"', () => {
      cy.get("#tipe_kontak").click();
      cy.contains("li", "Pelanggan").click();
      cy.get(
        ":nth-child(1) > .MuiCardHeader-root > .MuiCardHeader-content > .MuiTypography-root"
      ).click();

      cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').click()

      cy.get(':nth-child(3) > .MuiCardContent-root > :nth-child(1) > .css-1st318m > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').click()

      cy.get(':nth-child(1) > .MuiCardHeader-root > .MuiCardHeader-content > .MuiTypography-root').should('have.text', 'Informasi Kontak')
      cy.get(':nth-child(1) > .MuiCardContent-root > .css-1i24z3d > :nth-child(1) > .MuiGrid2-grid-md-4').should('have.text', 'Tipe Kontak *')
      cy.get(':nth-child(1) > .MuiCardContent-root > .css-1i24z3d > :nth-child(2) > .MuiGrid2-grid-md-4').should('have.text', 'Grup Kontak *')
      cy.get('#tipe_kontak-label').should('have.text', 'Tipe Kontak *')
      cy.get('#fk_grup-label').should('have.text', 'Grup Kontak *')
      
      cy.get(':nth-child(2) > .MuiCardHeader-root > .MuiCardHeader-content > .MuiTypography-root').should('have.text', 'Informasi Umum')
      cy.get(':nth-child(2) > .MuiCardContent-root > .css-1i24z3d > :nth-child(1) > .css-1iqhgio').should('have.text', 'Nama Lengkap *')
      cy.get(':nth-child(2) > .MuiCardContent-root > .css-1i24z3d > :nth-child(2) > .css-1iqhgio').should('have.text', 'Tipe Identitas')
      cy.get(':nth-child(3) > .MuiGrid2-grid-md-4 > .MuiFormLabel-root').should('have.text', 'Alamat Email *')
      cy.get('.MuiGrid2-grid-md-4 > .MuiTypography-root').should('have.text', 'Anda dapat menambahkan lebih dari satu alamat email (jika ada)')
      cy.get(':nth-child(4) > .MuiGrid2-grid-md-4').should('have.text', 'Nama Perusahaan')
      cy.get(':nth-child(5) > .MuiGrid2-grid-md-4').should('have.text', 'Nomor HP & Telepon')
      cy.get(':nth-child(6) > .MuiGrid2-grid-md-4').should('have.text', 'Fax & NPWP')
      cy.get(':nth-child(7) > .MuiGrid2-grid-md-4').should('have.text', 'Nomor Identitas Tempat Kegiatan Usaha (NITKU)')
      cy.get(':nth-child(8) > .MuiGrid2-grid-md-4').should('have.text', 'Alamat Penagihan *')
      cy.get(':nth-child(9) > .MuiGrid2-grid-md-4').should('have.text', 'Alamat Pengiriman')
      cy.get('#sapaan-label').should('have.text', 'Sapaan')
      cy.get('#nama-label').should('have.text', 'Nama Lengkap *')
      cy.get('#tipe_identitas-label').should('have.text', 'Tipe Identitas')
      cy.get('#no_identitas-label').should('have.text', 'Nomor Identitas')
      cy.get('label[id="email.0-label"]').should('have.text', 'Alamat Email *')
      cy.get('label[id="email.1-label"]').should('have.text', 'Alamat Email *')
      cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').should('have.text', 'Tambah Email')
      cy.get(':nth-child(3) > .MuiCardContent-root > .css-1i24z3d > .css-1st318m > .MuiGrid2-grid-md-8 > .css-1ov46kg > :nth-child(2) > .MuiButtonBase-root').should('have.text', 'Hapus')
      cy.get('#nama_perusahaan-label').should('have.text', 'Nama Perusahaan')
      cy.get('#no_hp-label').should('have.text', 'Nomor HP')
      cy.get('#no_telp-label').should('have.text', 'Nomor Telepon')
      cy.get('#no_fax-label').should('have.text', 'Fax')
      cy.get('#no_npwp-label').should('have.text', 'NPWP')
      cy.get('#nitku-label').should('have.text', 'Nomor Identitas Tempat Kegiatan Usaha (NITKU)')
      cy.get('label[id=":rk:-label"]').should('have.text', 'Alamat Penagihan *')
      cy.get('label[id=":rl:-label"]').should('have.text', 'Alamat Pengiriman')
      cy.get(':nth-child(9) > .MuiGrid2-container > :nth-child(2) > .MuiFormControlLabel-root > .MuiTypography-root').should('have.text', 'Samakan dengan alamat penagihan')

      cy.get(':nth-child(3) > .MuiCardHeader-root > .MuiCardHeader-content > .MuiTypography-root').should('have.text', 'Informasi Bank')
      cy.get(':nth-child(3) > .MuiCardContent-root > :nth-child(1) > .css-1st318m > .MuiGrid2-grid-md-4').should('have.text', 'Nama Bank & Cabang')
      cy.get('label[id="data_bank[0].bank_name-label"]').should('have.text', 'Nama Bank')
      cy.get('label[id="data_bank[0].bank_branch-label"]').should('have.text', 'Cabang')
      cy.get('label[id="data_bank[0].holder_name-label"]').should('have.text', 'Nama Pemegang Akun')
      cy.get('label[id="data_bank[0].rek_no-label"]').should('have.text', 'No Rekening')
      cy.get('label[id="data_bank[1].bank_name-label"]').should('have.text', 'Nama Bank')
      cy.get('label[id="data_bank[1].bank_branch-label"]').should('have.text', 'Cabang')
      cy.get('label[id="data_bank[1].holder_name-label"]').should('have.text', 'Nama Pemegang Akun')
      cy.get('label[id="data_bank[1].rek_no-label"]').should('have.text', 'No Rekening')
      cy.get(':nth-child(3) > .MuiCardContent-root > .css-1i24z3d > .css-1st318m > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').should('have.text', 'Tambah Bank Lainnya')
      cy.get(':nth-child(3) > .MuiCardContent-root > .css-1i24z3d > .css-1st318m > .MuiGrid2-grid-md-8 > .css-1ov46kg > :nth-child(2) > .MuiButtonBase-root').should('have.text', 'Hapus')

      cy.get(':nth-child(4) > .MuiCardHeader-root > .MuiCardHeader-content > .MuiTypography-root').should('have.text', 'Informasi Pemetaan Akun')
      cy.get(':nth-child(4) > .MuiCardContent-root > .css-1i24z3d > :nth-child(1) > .MuiGrid2-grid-md-4').should('have.text', 'Pemetaan Akun')
      cy.get('#piutang_max-label').should('have.text', 'Piutang Maksimum')
      cy.get('[data-testid="input-active_piutang_max"] > .MuiTypography-root').should('have.text', 'Aktifkan piutang maksimum')
      cy.get(':nth-child(4) > .MuiCardContent-root > .css-1i24z3d > :nth-child(2) > .MuiGrid2-grid-md-4').should('have.text', 'Syarat Pembayaran Utama')
      cy.get('#syarat_pembayaran-label').should('have.text', 'Syarat Pembayaran Utama')

      cy.get('.css-16ogmd7 > .MuiButton-text').should('have.text', 'Batal')
      cy.get('.MuiButton-contained').should('have.text', 'Simpan')
    })

    it('Pengecekan penulisan placeholder', () => {
      cy.get("#tipe_kontak").click();
      cy.contains("li", "Pelanggan").click();
      cy.get(
        ":nth-child(1) > .MuiCardHeader-root > .MuiCardHeader-content > .MuiTypography-root"
      ).click();
      cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').click()
      cy.get(':nth-child(3) > .MuiCardContent-root > :nth-child(1) > .css-1st318m > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').click()

      cy.get('#nama').should('have.attr', 'placeholder', 'Masukkan nama lengkap')
      cy.get('#no_identitas').should('have.attr', 'placeholder', 'Masukkan nomor identitas')
      cy.get('input[id="email.0"]').should('have.attr', 'placeholder', 'Masukkan alamat email')
      cy.get('input[id="email.1"]').should('have.attr', 'placeholder', 'Masukkan alamat email')
      cy.get('#nama_perusahaan').should('have.attr', 'placeholder', 'Masukkan nama perusahaan')
      cy.get('#no_hp').should('have.attr', 'placeholder', 'Masukkan nomor HP')
      cy.get('#no_telp').should('have.attr', 'placeholder', 'Masukkan nomor telepon')
      cy.get('#no_fax').should('have.attr', 'placeholder', 'Masukkan fax')
      cy.get('#no_npwp').should('have.attr', 'placeholder', 'Masukkan NPWP')
      cy.get('#nitku').should('have.attr', 'placeholder', 'Masukkan NITKU')
      cy.get('input[id=":rk:"]').should('have.attr', 'placeholder', 'Masukkan alamat penagihan')
      cy.get('input[id=":rl:"]').should('have.attr', 'placeholder', 'Masukkan alamat pengiriman')
      cy.get(':nth-child(9) > .MuiGrid2-container > :nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should('be.exist')
      cy.get('input[id="data_bank[0].bank_name"]').should('have.attr', 'placeholder','Masukkan nama bank')
      cy.get('input[id="data_bank[0].bank_branch"]').should('have.attr', 'placeholder','Masukkan cabang')
      cy.get('input[id="data_bank[0].holder_name"]').should('have.attr', 'placeholder','Masukkan nama pemegang akun')
      cy.get('input[id="data_bank[0].rek_no"]').should('have.attr', 'placeholder','Masukkan nomor rekening')
      cy.get('input[id="data_bank[1].bank_name"]').should('have.attr', 'placeholder','Masukkan nama bank')
      cy.get('input[id="data_bank[1].bank_branch"]').should('have.attr', 'placeholder','Masukkan cabang')
      cy.get('input[id="data_bank[1].holder_name"]').should('have.attr', 'placeholder','Masukkan nama pemegang akun')
      cy.get('input[id="data_bank[1].rek_no"]').should('have.attr', 'placeholder','Masukkan nomor rekening')
      cy.get('#piutang_max').should('have.attr', 'placeholder', 'Masukkan piutang maksimum')
    });

    it('Pengujian text helper dengan mengirimkan form kosong', () => {
      cy.get("#tipe_kontak").click();
      cy.contains("li", "Pelanggan").click();
      cy.get(
        ":nth-child(1) > .MuiCardHeader-root > .MuiCardHeader-content > .MuiTypography-root"
      ).click();

      cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').click()

      cy.get(':nth-child(3) > .MuiCardContent-root > :nth-child(1) > .css-1st318m > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').click()

      cy.get('.MuiButton-contained').click();

      cy.get(':nth-child(1) > .MuiCardHeader-root > .MuiCardHeader-content > .MuiTypography-root').should('have.text', 'Informasi Kontak')
      cy.get(':nth-child(1) > .MuiCardContent-root > .css-1i24z3d > :nth-child(1) > .MuiGrid2-grid-md-4').should('have.text', 'Tipe Kontak *')
      cy.get(':nth-child(1) > .MuiCardContent-root > .css-1i24z3d > :nth-child(2) > .MuiGrid2-grid-md-4').should('have.text', 'Grup Kontak *')
      cy.get('#tipe_kontak-label').should('have.text', 'Tipe Kontak *')
      cy.get('#fk_grup-label').should('have.text', 'Grup Kontak *')
      
      cy.get('#nama').should('have.attr', 'placeholder', 'Masukkan nama lengkap')
      cy.get('input[id="email.0"]').should('have.attr', 'placeholder', 'Masukkan alamat email')
      cy.get('#nama_perusahaan').should('have.attr', 'placeholder', 'Masukkan nama perusahaan')
      cy.get('#no_hp').should('have.attr', 'placeholder', 'Masukkan nomor HP')
      cy.get('#no_telp').should('have.attr', 'placeholder', 'Masukkan nomor telepon')
      cy.get('#no_fax').should('have.attr', 'placeholder', 'Masukkan fax')
      cy.get('#no_npwp').should('have.attr', 'placeholder', 'Masukkan NPWP')
      cy.get('#nitku').should('have.attr', 'placeholder', 'Masukkan NITKU')
      cy.get('input[id=":rk:"]').should('have.attr', 'placeholder', 'Masukkan alamat penagihan')
      cy.get('input[id=":rl:"]').should('have.attr', 'placeholder', 'Masukkan alamat pengiriman')
      cy.get(':nth-child(9) > .MuiGrid2-container > :nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').should('be.exist')
      cy.get('input[id="data_bank[0].bank_name"]').should('have.attr', 'placeholder','Masukkan nama bank')
      cy.get('input[id="data_bank[0].bank_branch"]').should('have.attr', 'placeholder','Masukkan cabang')
      cy.get('input[id="data_bank[0].holder_name"]').should('have.attr', 'placeholder','Masukkan nama pemegang akun')
      cy.get('input[id="data_bank[0].rek_no"]').should('have.attr', 'placeholder','Masukkan nomor rekening')
      cy.get('input[id="data_bank[1].bank_name"]').should('have.attr', 'placeholder','Masukkan nama bank')
      cy.get('input[id="data_bank[1].bank_branch"]').should('have.attr', 'placeholder','Masukkan cabang')
      cy.get('input[id="data_bank[1].holder_name"]').should('have.attr', 'placeholder','Masukkan nama pemegang akun')
      cy.get('input[id="data_bank[1].rek_no"]').should('have.attr', 'placeholder','Masukkan nomor rekening')
      cy.get('#piutang_max').should('have.attr', 'placeholder', 'Masukkan piutang maksimum')

      cy.get(':nth-child(2) > .MuiCardHeader-root > .MuiCardHeader-content > .MuiTypography-root').should('have.text', 'Informasi Umum')
      cy.get(':nth-child(2) > .MuiCardContent-root > .css-1i24z3d > :nth-child(1) > .css-1iqhgio').should('have.text', 'Nama Lengkap *')
      cy.get(':nth-child(2) > .MuiCardContent-root > .css-1i24z3d > :nth-child(2) > .css-1iqhgio').should('have.text', 'Tipe Identitas')
      cy.get(':nth-child(3) > .MuiGrid2-grid-md-4 > .MuiFormLabel-root').should('have.text', 'Alamat Email *')
      cy.get('.MuiGrid2-grid-md-4 > .MuiTypography-root').should('have.text', 'Anda dapat menambahkan lebih dari satu alamat email (jika ada)')
      cy.get(':nth-child(4) > .MuiGrid2-grid-md-4').should('have.text', 'Nama Perusahaan')
      cy.get(':nth-child(5) > .MuiGrid2-grid-md-4').should('have.text', 'Nomor HP & Telepon')
      cy.get(':nth-child(6) > .MuiGrid2-grid-md-4').should('have.text', 'Fax & NPWP')
      cy.get(':nth-child(7) > .MuiGrid2-grid-md-4').should('have.text', 'Nomor Identitas Tempat Kegiatan Usaha (NITKU)')
      cy.get(':nth-child(8) > .MuiGrid2-grid-md-4').should('have.text', 'Alamat Penagihan *')
      cy.get(':nth-child(9) > .MuiGrid2-grid-md-4').should('have.text', 'Alamat Pengiriman')
      cy.get('#sapaan-label').should('have.text', 'Sapaan')
      cy.get('#nama-label').should('have.text', 'Nama Lengkap *')
      cy.get('#tipe_identitas-label').should('have.text', 'Tipe Identitas')
      cy.get('#no_identitas').should('have.attr', 'placeholder', 'Masukkan nomor identitas')
      cy.get('#no_identitas-label').should('have.text', 'Nomor Identitas')
      cy.get('label[id="email.0-label"]').should('have.text', 'Alamat Email *')
      cy.get('label[id="email.1-label"]').should('have.text', 'Alamat Email *')
      cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').should('have.text', 'Tambah Email')
      cy.get(':nth-child(3) > .MuiCardContent-root > .css-1i24z3d > .css-1st318m > .MuiGrid2-grid-md-8 > .css-1ov46kg > :nth-child(2) > .MuiButtonBase-root').should('have.text', 'Hapus')
      cy.get('#nama_perusahaan-label').should('have.text', 'Nama Perusahaan')
      cy.get('#no_hp-label').should('have.text', 'Nomor HP')
      cy.get('#no_telp-label').should('have.text', 'Nomor Telepon')
      cy.get('#no_fax-label').should('have.text', 'Fax')
      cy.get('#no_npwp-label').should('have.text', 'NPWP')
      cy.get('#nitku-label').should('have.text', 'Nomor Identitas Tempat Kegiatan Usaha (NITKU)')
      cy.get('label[id=":rk:-label"]').should('have.text', 'Alamat Penagihan *')
      cy.get('label[id=":rl:-label"]').should('have.text', 'Alamat Pengiriman')
      cy.get(':nth-child(9) > .MuiGrid2-container > :nth-child(2) > .MuiFormControlLabel-root > .MuiTypography-root').should('have.text', 'Samakan dengan alamat penagihan')

      cy.get(':nth-child(3) > .MuiCardHeader-root > .MuiCardHeader-content > .MuiTypography-root').should('have.text', 'Informasi Bank')
      cy.get(':nth-child(3) > .MuiCardContent-root > :nth-child(1) > .css-1st318m > .MuiGrid2-grid-md-4').should('have.text', 'Nama Bank & Cabang')
      cy.get('label[id="data_bank[0].bank_name-label"]').should('have.text', 'Nama Bank')
      cy.get('label[id="data_bank[0].bank_branch-label"]').should('have.text', 'Cabang')
      cy.get('label[id="data_bank[0].holder_name-label"]').should('have.text', 'Nama Pemegang Akun')
      cy.get('label[id="data_bank[0].rek_no-label"]').should('have.text', 'No Rekening')
      cy.get(':nth-child(3) > .MuiCardContent-root > .css-1i24z3d > .css-1st318m > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').should('have.text', 'Tambah Bank Lainnya')
      cy.get(':nth-child(3) > .MuiCardContent-root > .css-1i24z3d > .css-1st318m > .MuiGrid2-grid-md-8 > .css-1ov46kg > :nth-child(2) > .MuiButtonBase-root').should('have.text', 'Hapus')

      cy.get(':nth-child(4) > .MuiCardHeader-root > .MuiCardHeader-content > .MuiTypography-root').should('have.text', 'Informasi Pemetaan Akun')
      cy.get(':nth-child(4) > .MuiCardContent-root > .css-1i24z3d > :nth-child(1) > .MuiGrid2-grid-md-4').should('have.text', 'Pemetaan Akun')
      cy.get('#piutang_max-label').should('have.text', 'Piutang Maksimum')
      cy.get('[data-testid="input-active_piutang_max"] > .MuiTypography-root').should('have.text', 'Aktifkan piutang maksimum')
      cy.get(':nth-child(4) > .MuiCardContent-root > .css-1i24z3d > :nth-child(2) > .MuiGrid2-grid-md-4').should('have.text', 'Syarat Pembayaran Utama')
      cy.get('#syarat_pembayaran-label').should('have.text', 'Syarat Pembayaran Utama')

      cy.get('.css-16ogmd7 > .MuiButton-text').should('have.text', 'Batal')
      cy.get('.MuiButton-contained').should('have.text', 'Simpan')
      
      cy.get(':nth-child(2) > .MuiGrid2-grid-md-8 > .MuiFormControl-fullWidth > .MuiTypography-root').should('have.text', 'Grup Kontak harus diisi')
      cy.get('#nama-helper-text').should('have.text', 'Nama Lengkap harus diisi')
      cy.get('p[id="email.0-helper-text"]').should('have.text', 'Email harus diisi')
      cy.get('p[id="email.1-helper-text"]').should('have.text', 'Email harus diisi')
    });

    it.skip('Memastikan warning muncul ketika mengirim form kosong', () => {
      cy.get("#tipe_kontak").click();
      cy.contains("li", "Pelanggan").click();
      cy.get(
        ":nth-child(1) > .MuiCardHeader-root > .MuiCardHeader-content > .MuiTypography-root"
      ).click();
      cy.get('.MuiButton-contained').click()
      cy.get(".MuiAlert-message").should(
        "contain.text",
        "Mohon periksa kembali form"
      );
    });
    context('Pengujian fungsi tambah input alamat email', () => {
        it('menambah satu input email dan check penulisan', () => {
          cy.get("#tipe_kontak").click();
          cy.contains("li", "Pelanggan").click();
          cy.get('label[id="email.0-label"]').should('have.text', 'Alamat Email *')
          cy.get('input[id="email.0"]').should('have.attr', 'placeholder', 'Masukkan alamat email')
          cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').should('have.text', 'Tambah Email').click()
          cy.get('label[id="email.1-label"]').should('have.text', 'Alamat Email *')
          cy.get('input[id="email.1"]').should('have.attr', 'placeholder', 'Masukkan alamat email')
  
          cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > :nth-child(2) > .MuiButtonBase-root').should('have.text', 'Hapus')
          cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').should('have.text', 'Tambah Email')
          
        });
  
        it('menambah lebih dari dua input email serta pengecekan penulisan', () => {
          cy.get("#tipe_kontak").click();
          cy.contains("li", "Pelanggan").click();
  
          cy.get('label[id="email.0-label"]').should('have.text', 'Alamat Email *')
          cy.get('input[id="email.0"]').should('have.attr', 'placeholder', 'Masukkan alamat email')
          cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').should('have.text', 'Tambah Email').click()
          cy.get('label[id="email.1-label"]').should('have.text', 'Alamat Email *')
          cy.get('input[id="email.1"]').should('have.attr', 'placeholder', 'Masukkan alamat email')
          cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').should('have.text', 'Tambah Email').click()
          cy.get('label[id="email.2-label"]').should('have.text', 'Alamat Email *')
          cy.get('input[id="email.2"]').should('have.attr', 'placeholder', 'Masukkan alamat email')
          cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').should('have.text', 'Tambah Email').click()
          cy.get('label[id="email.3-label"]').should('have.text', 'Alamat Email *')
          cy.get('input[id="email.3"]').should('have.attr', 'placeholder', 'Masukkan alamat email')
  
          cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > :nth-child(2) > .MuiButtonBase-root').should('have.text', 'Hapus')
          cy.get('.css-1ov46kg > :nth-child(3) > .MuiButtonBase-root').should('have.text', 'Hapus')
          cy.get('.css-1ov46kg > :nth-child(4) > .MuiButtonBase-root').should('have.text', 'Hapus')
          cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').should('have.text', 'Tambah Email')
          
        });
        
        it.skip('Menghapus input email bagian tengah dengan ekspektasi form yang dihapus adalah bagian yang ingin dihilangkan', () => {
          cy.get("#tipe_kontak").click();
          cy.contains("li", "Pelanggan").click();
  
          cy.get('label[id="email.0-label"]').should('have.text', 'Alamat Email *')
          cy.get('input[id="email.0"]').should('have.attr', 'placeholder', 'Masukkan alamat email')
          cy.get('input[id="email.0"]').type('email0')
          cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').should('have.text', 'Tambah Email').click()
          cy.get('label[id="email.1-label"]').should('have.text', 'Alamat Email *')
          cy.get('input[id="email.1"]').should('have.attr', 'placeholder', 'Masukkan alamat email')
          cy.get('input[id="email.1"]').type('email1')
          cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').should('have.text', 'Tambah Email').click()
          cy.get('label[id="email.2-label"]').should('have.text', 'Alamat Email *')
          cy.get('input[id="email.2"]').should('have.attr', 'placeholder', 'Masukkan alamat email')
          cy.get('input[id="email.2"]').type('email2')
          cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').should('have.text', 'Tambah Email').click()
          cy.get('label[id="email.3-label"]').should('have.text', 'Alamat Email *')
          cy.get('input[id="email.3"]').should('have.attr', 'placeholder', 'Masukkan alamat email')
          cy.get('input[id="email.3"]').type('email3')
          
          cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > :nth-child(2) > .MuiButtonBase-root').click()
  
        });
        
        it('Mengurangi input email hingga tersisa 1 dengan ekspektasi tombol hapus tidak ada namun tombol tambah tetap ada', () => {
          cy.get("#tipe_kontak").click();
          cy.contains("li", "Pelanggan").click();
          cy.get('label[id="email.0-label"]').should('have.text', 'Alamat Email *')
          cy.get('input[id="email.0"]').should('have.attr', 'placeholder', 'Masukkan alamat email')
          cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').should('have.text', 'Tambah Email').click()
          cy.get('label[id="email.1-label"]').should('have.text', 'Alamat Email *')
          cy.get('input[id="email.1"]').should('have.attr', 'placeholder', 'Masukkan alamat email')
          cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').should('have.text', 'Tambah Email').click()
          cy.get('label[id="email.2-label"]').should('have.text', 'Alamat Email *')
          cy.get('input[id="email.2"]').should('have.attr', 'placeholder', 'Masukkan alamat email')
          cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').should('have.text', 'Tambah Email').click()
          cy.get('label[id="email.3-label"]').should('have.text', 'Alamat Email *')
          cy.get('input[id="email.3"]').should('have.attr', 'placeholder', 'Masukkan alamat email')
          
          cy.get('.css-1ov46kg > :nth-child(4) > .MuiButtonBase-root').click()
          cy.get('.css-1ov46kg > :nth-child(3) > .MuiButtonBase-root').click()
          cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > :nth-child(2) > .MuiButtonBase-root').click()
  
          cy.get('button.css-110qal').should('not.exist')
  
          cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > :nth-child(2) > .MuiButtonBase-root').should('be.exist')
  
          cy.get('input[id="email.1"]').should('not.exist')
          cy.get('input[id="email.2"]').should('not.exist')
          cy.get('input[id="email.3"]').should('not.exist')
  
        });
  
        it('Pengujian text helper pada masing masing input email tambahan dengan contoh 5 input dengan kondisi email tidak diisi', () => {
          cy.get("#tipe_kontak").click();
          cy.contains("li", "Pelanggan").click();
  
          cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').click()
          cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').click()
          cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').click()
          cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').click()
          cy.get('.MuiButton-contained').click()
  
          cy.get('p[id="email.0-helper-text"]').should('have.text', 'Email harus diisi')
          cy.get('p[id="email.1-helper-text"]').should('have.text', 'Email harus diisi')
          cy.get('p[id="email.2-helper-text"]').should('have.text', 'Email harus diisi')
          cy.get('p[id="email.3-helper-text"]').should('have.text', 'Email harus diisi')
          cy.get('p[id="email.4-helper-text"]').should('have.text', 'Email harus diisi')
        });
        
        it('Pengujian text helper pada masing masing input email tambahan dengan contoh 5 input dengan kondisi email tidak valid', () => {
          cy.get("#tipe_kontak").click();
          cy.contains("li", "Pelanggan").click();
  
          cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').click()
          cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').click()
          cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').click()
          cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').click()
          
  
          cy.get('input[id="email.0"]').type('Email0')
          cy.get('input[id="email.1"]').type('Email1')
          cy.get('input[id="email.2"]').type('Email2')
          cy.get('input[id="email.3"]').type('Email3')
          cy.get('input[id="email.4"]').type('Email4')
  
          cy.get('.MuiButton-contained').click() 
          cy.get('.MuiButton-contained').click() 
  
          cy.get('p[id="email.0-helper-text"]').should('have.text', 'Email tidak valid')
          cy.get('p[id="email.1-helper-text"]').should('have.text', 'Email tidak valid')
          cy.get('p[id="email.2-helper-text"]').should('have.text', 'Email tidak valid')
          cy.get('p[id="email.3-helper-text"]').should('have.text', 'Email tidak valid')
          cy.get('p[id="email.4-helper-text"]').should('have.text', 'Email tidak valid')
        });
  
        it('Pengujian text helper hilang bila 5 input dengan kondisi email valid', () => {
          cy.get("#tipe_kontak").click();
          cy.contains("li", "Pelanggan").click();
  
          cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').click()
          cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').click()
          cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').click()
          cy.get(':nth-child(3) > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').click()
          
  
          cy.get('input[id="email.0"]').type('Email0@gmail.com')
          cy.get('input[id="email.1"]').type('Email1@gmail.com')
          cy.get('input[id="email.2"]').type('Email2@gmail.com')
          cy.get('input[id="email.3"]').type('Email3@gmail.com')
          cy.get('input[id="email.4"]').type('Email4@gmail.com')
  
          cy.get('.MuiButton-contained').click() 
          cy.get('.MuiButton-contained').click() 
  
          cy.get('p[id="email.0-helper-text"]').should('not.exist')
          cy.get('p[id="email.1-helper-text"]').should('not.exist')
          cy.get('p[id="email.2-helper-text"]').should('not.exist')
          cy.get('p[id="email.3-helper-text"]').should('not.exist')
          cy.get('p[id="email.4-helper-text"]').should('not.exist')
        });
      })
      context('Pengujian format dan text helper pada nama lengkap', () => {
        it('Ketika nama lengkap ditulis dengan lowercase maka setiap awal kata akan kapital', () => {
          cy.get("#tipe_kontak").click();
          cy.contains("li", "Pelanggan").click();
  
          cy.get('#nama').type('rayhanrayandra')
          cy.get('#nama').should('have.value','Rayhanrayandra')
        });
       
        it('Ketika nama lengkap ditulis dengan uppercase maka setiap awal kata akan kapital', () => {
          cy.get("#tipe_kontak").click();
          cy.contains("li", "Pelanggan").click();
  
          cy.get('#nama').type('RAYHANRAYANDRA')
          cy.get('#nama').should('have.value','Rayhanrayandra')
        });
        
        it('Ketika nama lengkap ditulis dengan uppercase dan lowercase maka setiap awal kata akan kapital dan selebihnya lowercase', () => {
          cy.get("#tipe_kontak").click();
          cy.contains("li", "Pelanggan").click();
  
          cy.get('#nama').type('RaYHanRaYanDRA')
          cy.get('#nama').should('have.value','Rayhanrayandra')
        });
        
        it('Ketika nama lengkap ditulis 2 kata dengan lowercase maka setiap awal kata akan kapital', () => {
          cy.get("#tipe_kontak").click();
          cy.contains("li", "Pelanggan").click();
  
          cy.get('#nama').type('rayhan rayandra')
          cy.get('#nama').should('have.value','Rayhan Rayandra')
        });
        
        it('Ketika nama lengkap ditulis 2 kata dengan uppercase maka setiap awal kata akan kapital', () => {
          cy.get("#tipe_kontak").click();
          cy.contains("li", "Pelanggan").click();
  
          cy.get('#nama').type('RAYHAN RAYANDRA')
          cy.get('#nama').should('have.value','Rayhan Rayandra')
        });
        
        it('Ketika nama lengkap ditulis 2 kata dengan uppercase dan lowercase maka setiap awal kata akan kapital dan selebihnya lowercase', () => {
          cy.get("#tipe_kontak").click();
          cy.contains("li", "Pelanggan").click();
  
          cy.get('#nama').type('RaYhaN rAyanDRa')
          cy.get('#nama').should('have.value','Rayhan Rayandra')
        });
        
        it('Ketika nama lengkap ditulis 3 kata dengan lowercase maka setiap awal kata akan kapital', () => {
          cy.get("#tipe_kontak").click();
          cy.contains("li", "Pelanggan").click();
  
          cy.get('#nama').type('rayhan qolbi rayandra')
          cy.get('#nama').should('have.value','Rayhan Qolbi Rayandra')
        });
        
        it('Ketika nama lengkap ditulis 3 kata dengan uppercase maka setiap awal kata akan kapital', () => {
          cy.get("#tipe_kontak").click();
          cy.contains("li", "Pelanggan").click();
  
          cy.get('#nama').type('RAYHAN QOLBI RAYANDRA')
          cy.get('#nama').should('have.value','Rayhan Qolbi Rayandra')
        });
        
        it('Ketika nama lengkap ditulis 3 kata dengan uppercase dan lowercase maka setiap awal kata akan kapital dan selebihnya lowercase', () => {
          cy.get("#tipe_kontak").click();
          cy.contains("li", "Pelanggan").click();
  
          cy.get('#nama').type('RaYhaN QolBi rAyanDRa')
          cy.get('#nama').should('have.value','Rayhan Qolbi Rayandra')
        });
        
        it('Pengujian text helper ketika nama lengkap terdapat angka', () => {
          cy.get("#tipe_kontak").click();
          cy.contains("li", "Pelanggan").click();
  
          cy.get('#nama').type('Rayhan123')
          cy.get('#nama').should('have.value','Rayhan123').blur()
          
          cy.get('.MuiButton-contained').click()
          cy.get('#nama-helper-text').should('have.text', 'Nama Lengkap hanya boleh berisi huruf dan spasi')
        });
        
        it('Pengujian text helper ketika nama lengkap terdapat karakter khusus', () => {
          cy.get("#tipe_kontak").click();
          cy.contains("li", "Pelanggan").click();
  
          cy.get('#nama').type('Rayhan!@#$%^')
          cy.get('#nama').should('have.value','Rayhan!@#$%^').blur()
          
          cy.get('.MuiButton-contained').click()
          cy.get('#nama-helper-text').should('have.text', 'Nama Lengkap hanya boleh berisi huruf dan spasi')
        });
      })
  
      context('Pengujian text helper pada tipe identitas', () => {
  
        it('input nomor identitas akan disable jika tipe identitas kosong', () => {
          cy.get("#tipe_kontak").click();
          cy.contains("li", "Pelanggan").click();
          
          cy.get('#tipe_identitas').click()
          cy.contains('li', 'Pilih Tipe Identitas').click()
          cy.get('#no_identitas').should('be.disabled')
        });
  
        it('Menampilkan text helper ketika tipe identitas ktp input dibawah 16 digit', () => {
          cy.get("#tipe_kontak").click();
          cy.contains("li", "Pelanggan").click();
  
          cy.get('#tipe_identitas').click()
          cy.contains('li', 'KTP').click()
          cy.get('#no_identitas').type('1435435')
          cy.get('.MuiButton-contained').click();
          cy.get('.MuiButton-contained').click();
    
          cy.get('#no_identitas-helper-text').should('have.text','Nomor KTP harus 16 digit')
          
        })
        
        it('Menampilkan text helper ketika tipe identitas ktp input dengan karakter kombinasi dibawah 16 karakter', () => {
          cy.get("#tipe_kontak").click();
          cy.contains("li", "Pelanggan").click();
  
          cy.get('#tipe_identitas').click()
          cy.contains('li', 'KTP').click()
          cy.get('#no_identitas').type('Char123')
          cy.get('.MuiButton-contained').click();
          cy.get('.MuiButton-contained').click();
    
          cy.get('#no_identitas-helper-text').should('have.text','Nomor KTP harus 16 digit')
          
        })
        
        it('Menampilkan text helper ketika tipe identitas ktp input dengan 16 karakter kombinasi', () => {
          cy.get("#tipe_kontak").click();
          cy.contains("li", "Pelanggan").click();
  
          cy.get('#tipe_identitas').click()
          cy.contains('li', 'KTP').click()
          cy.get('#no_identitas').type('abcdefghijklm123')
          cy.get('.MuiButton-contained').click();
          cy.get('.MuiButton-contained').click();
    
          cy.get('#no_identitas-helper-text').should('have.text','Nomor KTP harus 16 digit')
          
        })
        
        it('Menampilkan text helper ketika tipe identitas ktp berisi 16 digit lebih', () => {
          cy.get("#tipe_kontak").click();
          cy.contains("li", "Pelanggan").click();
  
          cy.get('#tipe_identitas').click()
          cy.contains('li', 'KTP').click()
          cy.get('#no_identitas').type('0880321222000111121314151617181920212223242526')
          cy.get('.MuiButton-contained').click();
          cy.get('.MuiButton-contained').click();
    
          cy.get('#no_identitas-helper-text').should('have.text','Nomor KTP harus 16 digit')
        })
        
        it('Pengujian text helper jika tipe identitas ktp input dengan format yang benar maka helper hilang', () => {
          cy.get("#tipe_kontak").click();
          cy.contains("li", "Pelanggan").click();
  
          cy.get('#tipe_identitas').click()
          cy.contains('li', 'KTP').click()
          cy.get('#no_identitas').type('0880321222000111')
          cy.get('.MuiButton-contained').click();
          cy.get('.MuiButton-contained').click();
    
          cy.get('#no_identitas-helper-text').should('not.be.exist')
        })
        
        it('Menampilkan text helper ketika tipe identitas sim input dibawah 16 digit', () => {
          cy.get("#tipe_kontak").click();
          cy.contains("li", "Pelanggan").click();
  
          cy.get('#tipe_identitas').click()
          cy.contains('li', 'SIM').click()
          cy.get('#no_identitas').type('1435435')
          cy.get('.MuiButton-contained').click();
          cy.get('.MuiButton-contained').click();
    
          cy.get('#no_identitas-helper-text').should('have.text','Nomor SIM harus 16 digit')
          
        })
        
        it('Menampilkan text helper ketika tipe identitas sim input dengan karakter kombinasi dibawah 16 karakter', () => {
          cy.get("#tipe_kontak").click();
          cy.contains("li", "Pelanggan").click();
  
          cy.get('#tipe_identitas').click()
          cy.contains('li', 'SIM').click()
          cy.get('#no_identitas').type('char123')
          cy.get('.MuiButton-contained').click();
          cy.get('.MuiButton-contained').click();
    
          cy.get('#no_identitas-helper-text').should('have.text','Nomor SIM harus 16 digit')
          
        })
        
        it('Menampilkan text helper ketika tipe identitas sim input dengan 16 huruf', () => {
          cy.get("#tipe_kontak").click();
          cy.contains("li", "Pelanggan").click();
  
          cy.get('#tipe_identitas').click()
          cy.contains('li', 'SIM').click()
          cy.get('#no_identitas').type('abcdefghijklm123')
          cy.get('.MuiButton-contained').click();
          cy.get('.MuiButton-contained').click();
    
          cy.get('#no_identitas-helper-text').should('have.text','Nomor SIM harus 16 digit')
          
        })
        
        it('Menampilkan text helper ketika tipe identitas sim berisi 16 digit lebih', () => {
          cy.get("#tipe_kontak").click();
          cy.contains("li", "Pelanggan").click();
  
          cy.get('#tipe_identitas').click()
          cy.contains('li', 'SIM').click()
          cy.get('#no_identitas').type('0880321222000111121314151617181920212223242526')
          cy.get('.MuiButton-contained').click();
          cy.get('.MuiButton-contained').click();
    
          cy.get('#no_identitas-helper-text').should('have.text','Nomor SIM harus 16 digit')
        })
        
        it('Pengujian text helper jika tipe identitas sim input dengan format yang benar maka helper hilang', () => {
          cy.get("#tipe_kontak").click();
          cy.contains("li", "Pelanggan").click();
  
          cy.get('#tipe_identitas').click()
          cy.contains('li', 'SIM').click()
          cy.get('#no_identitas').type('0880321222000111')
          cy.get('.MuiButton-contained').click();
          cy.get('.MuiButton-contained').click();
    
          cy.get('#no_identitas-helper-text').should('not.be.exist')
        })
        
        it('Menampilkan text helper ketika tipe identitas paspor input dibawah 6 karakter', () => {
          cy.get("#tipe_kontak").click();
          cy.contains("li", "Pelanggan").click();
  
          cy.get('#tipe_identitas').click()
          cy.contains('li', 'Paspor').click()
          cy.get('#no_identitas').type('1a3')
          cy.get('.MuiButton-contained').click();
          cy.get('.MuiButton-contained').click();
    
          cy.get('#no_identitas-helper-text').should('have.text','Nomor Passport harus lebih dari 6 karakter')
          
        })
        
        it('Menampilkan text helper ketika tipe identitas paspor input dengan 6 karakter', () => {
          cy.get("#tipe_kontak").click();
          cy.contains("li", "Pelanggan").click();
  
          cy.get('#tipe_identitas').click()
          cy.contains('li', 'Paspor').click()
          cy.get('#no_identitas').type('6chars')
          cy.get('.MuiButton-contained').click();
          cy.get('.MuiButton-contained').click();
    
          cy.get('#no_identitas-helper-text').should('not.be.exist')
          
        })
      })
      context('Pengujian inputan nomor hp dan telepon dengan ekspektasi inputan hanya dengan angka', () => {
  
        it('Mencoba input nomor hp dengan karakter', () => {
          cy.get("#tipe_kontak").click();
          cy.contains("li", "Pelanggan").click();
  
          cy.get('#no_hp').type('char@#$!')
          cy.get('#no_hp').should('have.value', '')
        });
        
        it.skip('Mencoba input nomor hp dengan angka', () => {
          cy.get("#tipe_kontak").click();
          cy.contains("li", "Pelanggan").click();
  
          cy.get('#no_hp').type('12345678')
          cy.get('#no_hp').should('have.value', "12345678")
          // cy.get('#no_hp').should('have.value', "12345678       ")
        });
        
        it('Mencoba input nomor telp dengan karakter', () => {
          cy.get("#tipe_kontak").click();
          cy.contains("li", "Pelanggan").click();
  
          cy.get('#no_telp').type('char@#$!')
          cy.get('#no_telp').should('have.value', '')
        });
        
        it.skip('Mencoba input nomor telp dengan angka', () => {
          cy.get("#tipe_kontak").click();
          cy.contains("li", "Pelanggan").click();
  
          cy.get('#no_telp').type('12345678')
          cy.get('#no_telp').should('have.value', "12345678")
          // cy.get('#no_telp').should('have.value', "12345678       ")
        });
        
      })
  
      context('Pengujian fungsi samakan dengan alamat penagihan', () => { 
        it('Memastikan value alamat pengiriman sama dengan alamat penagihan', () => {
          cy.get("#tipe_kontak").click();
          cy.contains("li", "Pelanggan").click();
  
          cy.get('input[id=":rk:"]').type('Samakan dengan di bawah')
          cy.get('input[name="alamatPengirimanEqPenagihan"]').click()
          cy.get('input[name="alamatPengirimanEqPenagihan"]').click()
          cy.get('input[name="alamatPengirimanEqPenagihan"]').click()
          cy.get('input[id=":rl:"]').should('have.value', 'Samakan dengan di bawah')
        });
        
        it('Memastikan input alamat pengiriman disable saat fitur "samakan alamat" dicentang', () => {
          cy.get("#tipe_kontak").click();
          cy.contains("li", "Pelanggan").click();
  
          cy.get('input[id=":rk:"]').type('Samakan dengan di bawah')
          cy.get('input[name="alamatPengirimanEqPenagihan"]').click()
          cy.get('input[name="alamatPengirimanEqPenagihan"]').click()
          cy.get('input[name="alamatPengirimanEqPenagihan"]').click()
          cy.get('input[id=":rl:"]').should('be.disabled')
        });
        
      })
      context('Pengujian fitur input bank', () => {
        it('Manambah satu input bank', () => {
          cy.get("#tipe_kontak").click();
          cy.contains("li", "Pelanggan").click();
          cy.get(':nth-child(3) > .MuiCardContent-root > .css-1i24z3d > .css-1st318m > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').click()
          cy.get('label[id="data_bank[0].bank_name-label"]').should('have.text', 'Nama Bank')
          cy.get('label[id="data_bank[0].bank_branch-label"]').should('have.text', 'Cabang')
          cy.get('label[id="data_bank[0].holder_name-label"]').should('have.text', 'Nama Pemegang Akun')
          cy.get('label[id="data_bank[0].rek_no-label"]').should('have.text', 'No Rekening')
          cy.get('label[id="data_bank[1].bank_name-label"]').should('have.text', 'Nama Bank')
          cy.get('label[id="data_bank[1].bank_branch-label"]').should('have.text', 'Cabang')
          cy.get('label[id="data_bank[1].holder_name-label"]').should('have.text', 'Nama Pemegang Akun')
          cy.get('label[id="data_bank[1].rek_no-label"]').should('have.text', 'No Rekening')
         
          cy.get('input[id="data_bank[0].bank_name"]').should('have.attr', 'placeholder','Masukkan nama bank')
          cy.get('input[id="data_bank[0].bank_branch"]').should('have.attr', 'placeholder','Masukkan cabang')
          cy.get('input[id="data_bank[0].holder_name"]').should('have.attr', 'placeholder','Masukkan nama pemegang akun')
          cy.get('input[id="data_bank[0].rek_no"]').should('have.attr', 'placeholder','Masukkan nomor rekening')
          cy.get('input[id="data_bank[1].bank_name"]').should('have.attr', 'placeholder','Masukkan nama bank')
          cy.get('input[id="data_bank[1].bank_branch"]').should('have.attr', 'placeholder','Masukkan cabang')
          cy.get('input[id="data_bank[1].holder_name"]').should('have.attr', 'placeholder','Masukkan nama pemegang akun')
          cy.get('input[id="data_bank[1].rek_no"]').should('have.attr', 'placeholder','Masukkan nomor rekening')
          cy.get(':nth-child(3) > .MuiCardContent-root > .css-1i24z3d > .css-1st318m > .MuiGrid2-grid-md-8 > .css-1ov46kg > :nth-child(2) > .MuiButtonBase-root').should('have.text', 'Hapus')
          cy.get(':nth-child(3) > .MuiCardContent-root > .css-1i24z3d > .css-1st318m > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').should('have.text', 'Tambah Bank Lainnya')
          
        });
  
        it('Manambah lebih dari satu input bank', () => {
          cy.get("#tipe_kontak").click();
          cy.contains("li", "Pelanggan").click();
          
          cy.get(':nth-child(3) > .MuiCardContent-root > .css-1i24z3d > .css-1st318m > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').click()
          cy.get(':nth-child(3) > .MuiCardContent-root > .css-1i24z3d > .css-1st318m > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').click()
          cy.get('label[id="data_bank[0].bank_name-label"]').should('have.text', 'Nama Bank')
          cy.get('label[id="data_bank[0].bank_branch-label"]').should('have.text', 'Cabang')
          cy.get('label[id="data_bank[0].holder_name-label"]').should('have.text', 'Nama Pemegang Akun')
          cy.get('label[id="data_bank[0].rek_no-label"]').should('have.text', 'No Rekening')
          cy.get('label[id="data_bank[1].bank_name-label"]').should('have.text', 'Nama Bank')
          cy.get('label[id="data_bank[1].bank_branch-label"]').should('have.text', 'Cabang')
          cy.get('label[id="data_bank[1].holder_name-label"]').should('have.text', 'Nama Pemegang Akun')
          cy.get('label[id="data_bank[1].rek_no-label"]').should('have.text', 'No Rekening')
          cy.get('label[id="data_bank[2].bank_name-label"]').should('have.text', 'Nama Bank')
          cy.get('label[id="data_bank[2].bank_branch-label"]').should('have.text', 'Cabang')
          cy.get('label[id="data_bank[2].holder_name-label"]').should('have.text', 'Nama Pemegang Akun')
          cy.get('label[id="data_bank[2].rek_no-label"]').should('have.text', 'No Rekening')
          
          cy.get('input[id="data_bank[0].bank_name"]').should('have.attr', 'placeholder','Masukkan nama bank')
          cy.get('input[id="data_bank[0].bank_branch"]').should('have.attr', 'placeholder','Masukkan cabang')
          cy.get('input[id="data_bank[0].holder_name"]').should('have.attr', 'placeholder','Masukkan nama pemegang akun')
          cy.get('input[id="data_bank[0].rek_no"]').should('have.attr', 'placeholder','Masukkan nomor rekening')
          cy.get('input[id="data_bank[1].bank_name"]').should('have.attr', 'placeholder','Masukkan nama bank')
          cy.get('input[id="data_bank[1].bank_branch"]').should('have.attr', 'placeholder','Masukkan cabang')
          cy.get('input[id="data_bank[1].holder_name"]').should('have.attr', 'placeholder','Masukkan nama pemegang akun')
          cy.get('input[id="data_bank[1].rek_no"]').should('have.attr', 'placeholder','Masukkan nomor rekening')
          cy.get('input[id="data_bank[2].bank_name"]').should('have.attr', 'placeholder','Masukkan nama bank')
          cy.get('input[id="data_bank[2].bank_branch"]').should('have.attr', 'placeholder','Masukkan cabang')
          cy.get('input[id="data_bank[2].holder_name"]').should('have.attr', 'placeholder','Masukkan nama pemegang akun')
          cy.get('input[id="data_bank[2].rek_no"]').should('have.attr', 'placeholder','Masukkan nomor rekening')
          cy.get(':nth-child(3) > .MuiCardContent-root > .css-1i24z3d > .css-1st318m > .MuiGrid2-grid-md-8 > .css-1ov46kg > :nth-child(2) > .MuiButtonBase-root').should('have.text', 'Hapus')
          cy.get(':nth-child(3) > .MuiCardContent-root > .css-1i24z3d > .css-1st318m > .MuiGrid2-grid-md-8 > .css-1ov46kg > :nth-child(3) > .MuiButtonBase-root').should('have.text', 'Hapus')
          cy.get(':nth-child(3) > .MuiCardContent-root > .css-1i24z3d > .css-1st318m > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').should('have.text', 'Tambah Bank Lainnya')
        });
        
        it('Manambah 3 input bank dan menghapus satu pada bagian paling bawah ekspektasi menghapus form yang benar', () => {
          cy.get("#tipe_kontak").click();
          cy.contains("li", "Pelanggan").click();
  
          cy.get(':nth-child(3) > .MuiCardContent-root > .css-1i24z3d > .css-1st318m > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').click()
          cy.get(':nth-child(3) > .MuiCardContent-root > .css-1i24z3d > .css-1st318m > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').click()
          cy.get('input[id="data_bank[0].bank_name"]').type('nama 1')
          cy.get('input[id="data_bank[0].bank_branch"]').type('cabang 1')
          cy.get('input[id="data_bank[0].holder_name"]').type('holder 1')
          cy.get('input[id="data_bank[0].rek_no"]').type('1')
          cy.get('input[id="data_bank[1].bank_name"]').type('nama 2')
          cy.get('input[id="data_bank[1].bank_branch"]').type('cabang 2')
          cy.get('input[id="data_bank[1].holder_name"]').type('holder 2')
          cy.get('input[id="data_bank[1].rek_no"]').type('2')
          cy.get('input[id="data_bank[2].bank_name"]').type('nama 3')
          cy.get('input[id="data_bank[2].bank_branch"]').type('cabang 3')
          cy.get('input[id="data_bank[2].holder_name"]').type('holder 3')
          cy.get('input[id="data_bank[2].rek_no"]').type('3')
  
          cy.get('input[id="data_bank[0].bank_name"]').should('have.attr', 'placeholder','Masukkan nama bank')
          cy.get('input[id="data_bank[0].bank_branch"]').should('have.attr', 'placeholder','Masukkan cabang')
          cy.get('input[id="data_bank[0].holder_name"]').should('have.attr', 'placeholder','Masukkan nama pemegang akun')
          cy.get('input[id="data_bank[0].rek_no"]').should('have.attr', 'placeholder','Masukkan nomor rekening')
          cy.get('input[id="data_bank[1].bank_name"]').should('have.attr', 'placeholder','Masukkan nama bank')
          cy.get('input[id="data_bank[1].bank_branch"]').should('have.attr', 'placeholder','Masukkan cabang')
          cy.get('input[id="data_bank[1].holder_name"]').should('have.attr', 'placeholder','Masukkan nama pemegang akun')
          cy.get('input[id="data_bank[1].rek_no"]').should('have.attr', 'placeholder','Masukkan nomor rekening')
          cy.get('input[id="data_bank[2].bank_name"]').should('have.attr', 'placeholder','Masukkan nama bank')
          cy.get('input[id="data_bank[2].bank_branch"]').should('have.attr', 'placeholder','Masukkan cabang')
          cy.get('input[id="data_bank[2].holder_name"]').should('have.attr', 'placeholder','Masukkan nama pemegang akun')
  
          cy.get('label[id="data_bank[0].bank_name-label"]').should('have.text', 'Nama Bank')
          cy.get('label[id="data_bank[0].bank_branch-label"]').should('have.text', 'Cabang')
          cy.get('label[id="data_bank[0].holder_name-label"]').should('have.text', 'Nama Pemegang Akun')
          cy.get('label[id="data_bank[0].rek_no-label"]').should('have.text', 'No Rekening')
          cy.get('label[id="data_bank[1].bank_name-label"]').should('have.text', 'Nama Bank')
          cy.get('label[id="data_bank[1].bank_branch-label"]').should('have.text', 'Cabang')
          cy.get('label[id="data_bank[1].holder_name-label"]').should('have.text', 'Nama Pemegang Akun')
          cy.get('label[id="data_bank[1].rek_no-label"]').should('have.text', 'No Rekening')
          cy.get('label[id="data_bank[2].bank_name-label"]').should('have.text', 'Nama Bank')
          cy.get('label[id="data_bank[2].bank_branch-label"]').should('have.text', 'Cabang')
          cy.get('label[id="data_bank[2].holder_name-label"]').should('have.text', 'Nama Pemegang Akun')
          cy.get('label[id="data_bank[2].rek_no-label"]').should('have.text', 'No Rekening')
          cy.get('input[id="data_bank[2].rek_no"]').should('have.attr', 'placeholder','Masukkan nomor rekening')
          cy.get(':nth-child(3) > .MuiCardContent-root > .css-1i24z3d > .css-1st318m > .MuiGrid2-grid-md-8 > .css-1ov46kg > :nth-child(2) > .MuiButtonBase-root').should('have.text', 'Hapus')
          cy.get(':nth-child(3) > .MuiCardContent-root > .css-1i24z3d > .css-1st318m > .MuiGrid2-grid-md-8 > .css-1ov46kg > :nth-child(3) > .MuiButtonBase-root').click()
          cy.get(':nth-child(3) > .MuiCardContent-root > .css-1i24z3d > .css-1st318m > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').should('have.text', 'Tambah Bank Lainnya')
  
          cy.get('input[id="data_bank[0].bank_name"]').should('have.value','nama 1')
          cy.get('input[id="data_bank[0].bank_branch"]').should('have.value','cabang 1')
          cy.get('input[id="data_bank[0].holder_name"]').should('have.value','holder 1')
          cy.get('input[id="data_bank[0].rek_no"]').should('have.value','1')
          cy.get('input[id="data_bank[1].bank_name"]').should('have.value','nama 2')
          cy.get('input[id="data_bank[1].bank_branch"]').should('have.value','cabang 2')
          cy.get('input[id="data_bank[1].holder_name"]').should('have.value','holder 2')
          cy.get('input[id="data_bank[1].rek_no"]').should('have.value','2')
          cy.get('input[id="data_bank[2].bank_name"]').should('not.exist')
          cy.get('input[id="data_bank[2].bank_branch"]').should('not.exist')
          cy.get('input[id="data_bank[2].holder_name"]').should('not.exist')
          cy.get('input[id="data_bank[2].rek_no"]').should('not.exist')
  
          cy.get('label[id="data_bank[0].bank_name-label"]').should('have.text', 'Nama Bank')
          cy.get('label[id="data_bank[0].bank_branch-label"]').should('have.text', 'Cabang')
          cy.get('label[id="data_bank[0].holder_name-label"]').should('have.text', 'Nama Pemegang Akun')
          cy.get('label[id="data_bank[0].rek_no-label"]').should('have.text', 'No Rekening')
          cy.get('label[id="data_bank[1].bank_name-label"]').should('have.text', 'Nama Bank')
          cy.get('label[id="data_bank[1].bank_branch-label"]').should('have.text', 'Cabang')
          cy.get('label[id="data_bank[1].holder_name-label"]').should('have.text', 'Nama Pemegang Akun')
          cy.get('label[id="data_bank[1].rek_no-label"]').should('have.text', 'No Rekening')
          cy.get('label[id="data_bank[2].bank_name-label"]').should('not.exist')
          cy.get('label[id="data_bank[2].bank_branch-label"]').should('not.exist')
          cy.get('label[id="data_bank[2].holder_name-label"]').should('not.exist')
          cy.get('label[id="data_bank[2].rek_no-label"]').should('not.exist')
        });
        
        it('Manambah 2 input bank dan menghapus satu pada bagian tengah ekspektasi menghapus form yang benar', () => {
          cy.get("#tipe_kontak").click();
          cy.contains("li", "Pelanggan").click();
  
          cy.get(':nth-child(3) > .MuiCardContent-root > .css-1i24z3d > .css-1st318m > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').click()
          cy.get('input[id="data_bank[0].bank_name"]').type('nama 1')
          cy.get('input[id="data_bank[0].bank_branch"]').type('cabang 1')
          cy.get('input[id="data_bank[0].holder_name"]').type('holder 1')
          cy.get('input[id="data_bank[0].rek_no"]').type('1')
          cy.get('input[id="data_bank[1].bank_name"]').type('nama 2')
          cy.get('input[id="data_bank[1].bank_branch"]').type('cabang 2')
          cy.get('input[id="data_bank[1].holder_name"]').type('holder 2')
          cy.get('input[id="data_bank[1].rek_no"]').type('2')
  
          cy.get('label[id="data_bank[0].bank_name-label"]').should('have.text', 'Nama Bank')
          cy.get('label[id="data_bank[0].bank_branch-label"]').should('have.text', 'Cabang')
          cy.get('label[id="data_bank[0].holder_name-label"]').should('have.text', 'Nama Pemegang Akun')
          cy.get('label[id="data_bank[0].rek_no-label"]').should('have.text', 'No Rekening')
          cy.get('label[id="data_bank[1].bank_name-label"]').should('have.text', 'Nama Bank')
          cy.get('label[id="data_bank[1].bank_branch-label"]').should('have.text', 'Cabang')
          cy.get('label[id="data_bank[1].holder_name-label"]').should('have.text', 'Nama Pemegang Akun')
          cy.get('label[id="data_bank[1].rek_no-label"]').should('have.text', 'No Rekening')
  
          cy.get('.css-1ov46kg > :nth-child(3) > .MuiButtonBase-root')
          cy.get(':nth-child(3) > .MuiCardContent-root > .css-1i24z3d > .css-1st318m > .MuiGrid2-grid-md-8 > .css-1ov46kg > :nth-child(2) > .MuiButtonBase-root').click()
  
          cy.get('input[id="data_bank[0].bank_name"]').should('have.value','nama 1')
          cy.get('input[id="data_bank[0].bank_branch"]').should('have.value','cabang 1')
          cy.get('input[id="data_bank[0].holder_name"]').should('have.value','holder 1')
          cy.get('input[id="data_bank[0].rek_no"]').should('have.value','1')
          cy.get('input[id="data_bank[1].bank_name"]').should('not.exist')
          cy.get('input[id="data_bank[1].bank_branch"]').should('not.exist')
          cy.get('input[id="data_bank[1].holder_name"]').should('not.exist')
          cy.get('input[id="data_bank[1].rek_no"]').should('not.exist')
  
          cy.get('label[id="data_bank[0].bank_name-label"]').should('have.text', 'Nama Bank')
          cy.get('label[id="data_bank[0].bank_branch-label"]').should('have.text', 'Cabang')
          cy.get('label[id="data_bank[0].holder_name-label"]').should('have.text', 'Nama Pemegang Akun')
          cy.get('label[id="data_bank[0].rek_no-label"]').should('have.text', 'No Rekening')
          cy.get('label[id="data_bank[1].bank_name-label"]').should('not.exist')
          cy.get('label[id="data_bank[1].bank_branch-label"]').should('not.exist')
          cy.get('label[id="data_bank[1].holder_name-label"]').should('not.exist')
          cy.get('label[id="data_bank[1].rek_no-label"]').should('not.exist')
        });
  
        it.skip('Manambah 3 input bank dan menghapus satu pada bagian tengah ekspektasi menghapus form yang benar', () => {
          cy.get("#tipe_kontak").click();
          cy.contains("li", "Pelanggan").click();
  
          cy.get(':nth-child(3) > .MuiCardContent-root > .css-1i24z3d > .css-1st318m > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').click()
          cy.get(':nth-child(3) > .MuiCardContent-root > .css-1i24z3d > .css-1st318m > .MuiGrid2-grid-md-8 > .css-1ov46kg > .css-n4rzf0 > .MuiButtonBase-root').click()
          cy.get('input[id="data_bank[0].bank_name"]').type('nama 1')
          cy.get('input[id="data_bank[0].bank_branch"]').type('cabang 1')
          cy.get('input[id="data_bank[0].holder_name"]').type('holder 1')
          cy.get('input[id="data_bank[0].rek_no"]').type('1')
          cy.get('input[id="data_bank[1].bank_name"]').type('nama 2')
          cy.get('input[id="data_bank[1].bank_branch"]').type('cabang 2')
          cy.get('input[id="data_bank[1].holder_name"]').type('holder 2')
          cy.get('input[id="data_bank[1].rek_no"]').type('2')
          cy.get('input[id="data_bank[2].bank_name"]').type('nama 3')
          cy.get('input[id="data_bank[2].bank_branch"]').type('cabang 3')
          cy.get('input[id="data_bank[2].holder_name"]').type('holder 3')
          cy.get('input[id="data_bank[2].rek_no"]').type('3')
  
          cy.get('label[id="data_bank[0].bank_name-label"]').should('have.text', 'Nama Bank')
          cy.get('label[id="data_bank[0].bank_branch-label"]').should('have.text', 'Cabang')
          cy.get('label[id="data_bank[0].holder_name-label"]').should('have.text', 'Nama Pemegang Akun')
          cy.get('label[id="data_bank[0].rek_no-label"]').should('have.text', 'No Rekening')
          cy.get('label[id="data_bank[1].bank_name-label"]').should('have.text', 'Nama Bank')
          cy.get('label[id="data_bank[1].bank_branch-label"]').should('have.text', 'Cabang')
          cy.get('label[id="data_bank[1].holder_name-label"]').should('have.text', 'Nama Pemegang Akun')
          cy.get('label[id="data_bank[1].rek_no-label"]').should('have.text', 'No Rekening')
          cy.get('label[id="data_bank[2].bank_name-label"]').should('have.text', 'Nama Bank')
          cy.get('label[id="data_bank[2].bank_branch-label"]').should('have.text', 'Cabang')
          cy.get('label[id="data_bank[2].holder_name-label"]').should('have.text', 'Nama Pemegang Akun')
          cy.get('label[id="data_bank[2].rek_no-label"]').should('have.text', 'No Rekening')
          cy.get('.css-1ov46kg > :nth-child(3) > .MuiButtonBase-root')
          cy.get(':nth-child(3) > .MuiCardContent-root > .css-1i24z3d > .css-1st318m > .MuiGrid2-grid-md-8 > .css-1ov46kg > :nth-child(3) > .MuiButtonBase-root').should('have.text', 'Hapus')
          cy.get(':nth-child(3) > .MuiCardContent-root > .css-1i24z3d > .css-1st318m > .MuiGrid2-grid-md-8 > .css-1ov46kg > :nth-child(2) > .MuiButtonBase-root').click()
  
          cy.get('input[id="data_bank[0].bank_name"]').should('have.value','nama 1')
          cy.get('input[id="data_bank[0].bank_branch"]').should('have.value','cabang 1')
          cy.get('input[id="data_bank[0].holder_name"]').should('have.value','holder 1')
          cy.get('input[id="data_bank[0].rek_no"]').should('have.value','1')
          cy.get('input[id="data_bank[1].bank_name"]').should('have.value','nama 3')
          cy.get('input[id="data_bank[1].bank_branch"]').should('have.value','cabang 3')
          cy.get('input[id="data_bank[1].holder_name"]').should('have.value','holder 3')
          cy.get('input[id="data_bank[1].rek_no"]').should('have.value','3')
          cy.get('input[id="data_bank[2].bank_name"]').should('not.exist')
          cy.get('input[id="data_bank[2].bank_branch"]').should('not.exist')
          cy.get('input[id="data_bank[2].holder_name"]').should('not.exist')
          cy.get('input[id="data_bank[2].rek_no"]').should('not.exist')
  
          cy.get('label[id="data_bank[0].bank_name-label"]').should('have.text', 'Nama Bank')
          cy.get('label[id="data_bank[0].bank_branch-label"]').should('have.text', 'Cabang')
          cy.get('label[id="data_bank[0].holder_name-label"]').should('have.text', 'Nama Pemegang Akun')
          cy.get('label[id="data_bank[0].rek_no-label"]').should('have.text', 'No Rekening')
          cy.get('label[id="data_bank[1].bank_name-label"]').should('have.text', 'Nama Bank')
          cy.get('label[id="data_bank[1].bank_branch-label"]').should('have.text', 'Cabang')
          cy.get('label[id="data_bank[1].holder_name-label"]').should('have.text', 'Nama Pemegang Akun')
          cy.get('label[id="data_bank[1].rek_no-label"]').should('have.text', 'No Rekening')
          cy.get('label[id="data_bank[2].bank_name-label"]').should('not.exist')
          cy.get('label[id="data_bank[2].bank_branch-label"]').should('not.exist')
          cy.get('label[id="data_bank[2].holder_name-label"]').should('not.exist')
          cy.get('label[id="data_bank[2].rek_no-label"]').should('not.exist')
        });
      })
    })

    context.only('Pengujian penginputan tipe kontak pelanggan', () => {
      it("Input data required saja type kontak(Pelanggan)- Memantau body request sesuai dengan ui - dan expect berhasil dengan message berhasil - pindah ke halaman kontak tab pelanggan ", () => {
        const expectedRequestBody = {
          active_piutang_max: 0,
          alamat_penagihan: "jalan penagihan pelanggan",
          alamat_pengiriman: "",
          company_id: "b13e5210-8564-11ef-af27-a72e65a1d49c",
          email: ["email@pelanggan.com"],
          fk_grup: ["30a2c042-a658-11ef-8f78-25bebcc62186"],
          data_bank: [
            {
              bank_branch: "",
              bank_name: "",
              holder_name: "",
              rek_no: "",
            },
          ],
          nama: "Username Pelanggan",
          nama_perusahaan: "",
          no_identitas: "",
          no_fax: "",
          no_hp: "",
          no_npwp: "",
          no_telp: "",
          nitku: "",
          piutang_max: 0,
          fk_akun_hutang: "",
          fk_akun_piutang: "",
          sapaan: "",
          syarat_pembayaran: "",
          tipe_identitas: "",
          tipe_kontak: "pelanggan",
        };
  
        // Intercept the API request
        cy.intercept(
          "POST",
          "https://api-cashflow.assist.id/api/kontak/add",
          (req) => {
            // Log the request body to the Cypress console
            console.log("Request Body:", req.body);
  
            // Modify the response (if needed)
            req.reply({
              statusCode: 200,
              body: { message: "Kontak berhasil disimpan" },
            });
          }
        ).as("addContactPelanggan");
  
        // Perform UI actions
        cy.get("#tipe_kontak").click(); // tipe kontak
        cy.contains("li", "Pelanggan").click();
        cy.get("#tipe_kontak").should("have.text", "Pelanggan");
  
        cy.get("#fk_grup").click(); // grup
        cy.contains("li", "vendor obat asist 2", { timeout: 10000 }).click();
        cy.get("#fk_grup").should("have.text", "vendor obat asist 2");
        cy.contains("li", "Tambah Baru").click();
        cy.get('[data-testid="CloseIcon"] > path').click();
  
        cy.get("#nama").type("username pelanggan"); // nama lengkap
        cy.get('input[placeholder="Masukkan alamat email"]')
          .eq(0)
          .type("email@pelanggan.com"); // email
        cy.get('input[placeholder="Masukkan alamat penagihan"]').type(
          "jalan penagihan pelanggan"
        );
        cy.get(".MuiButton-contained").click();
        cy.get(".MuiButton-contained").click();
        
  
        // Wait for the intercepted API request
        cy.wait("@addContactPelanggan").then((interception) => {
          // Verify the request body matches the expected data
          expect(interception.request.body).to.deep.equal(expectedRequestBody);
  
          // Optionally log the interception data for debugging
          cy.log("Intercepted Request:", interception);
        });
  
        // Assert success message is displayed
        cy.get(".MuiAlert-message").should(
          "contain.text",
          "Kontak berhasil disimpan"
        );
        cy.url().should('eq', 'https://cashflow.assist.id/admin/contacts')
        cy.get('.MuiTypography-h6').should('have.text', 'Pelanggan')
      });

      it.only('Menginput seluruh form dan mengkosongkan salah satu required data (tipe kontak) dengan ekspektasi data tidak dapat dikirim', () => {
        cy.intercept(
          "GET",
          "https://api-cashflow.assist.id/api/grupkontak/list?companyId=b13e5210-8564-11ef-af27-a72e65a1d49c"
        ).as("getGrupKontak");
        cy.wait("@getGrupKontak")
        cy.get("#tipe_kontak").click(); // tipe kontak
        cy.contains("li", "Pilih Tipe Kontak").click();
        
        cy.get("#tipe_kontak").should("have.text", '​');
        cy.get("#fk_grup").click(); // grup
        cy.contains("li", "Tambah Baru").click();
        cy.get('[data-testid="CloseIcon"] > path').click();
        cy.get("#fk_grup").click(); // grup
        cy.contains("li", "vendor obat asist 2").click();
        cy.get('[data-testid="CloseIcon"] > path').click();
        cy.get("#fk_grup").should("have.text", "vendor obat asist 2");
        cy.contains("li", "vendor obat asist 2", { timeout: 30000 }).click();
        
        cy.get("#nama").type("username pelanggan"); // nama lengkap
        cy.get('input[placeholder="Masukkan alamat email"]')
          .eq(0)
          .type("email@pelanggan.com"); // email
        cy.get('input[placeholder="Masukkan alamat penagihan"]').type(
          "jalan penagihan pelanggan"
        );
      });
    })
  })

