const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    "viewportWidth": 1440,
    "viewportHeight": 900,
    "baseUrl": "https://www.clearscore.com",
    "defaultCommandTimeout": 15000,
    "watchForFileChanges": false,
    "hideXHRInCommandLog": true
  },
});
