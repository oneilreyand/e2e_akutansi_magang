// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'


Cypress.on('uncaught:exception', (err, runnable) => {
    // Cek isi pesan error dan abaikan jika cocok
    if (
      err.message.includes('ResizeObserver') ||
      err.message.includes('Cannot read properties of undefined')
    ) {
      return false; // abaikan error ini
    }
  
    // Untuk error lain, biarkan Cypress tetap gagal
    return true;
  });