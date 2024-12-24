const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
        // Configure plugins
    },
    experimentalSessionAndOrigin: true, // Untuk mengaktifkan session
  },
});
