const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: "pwh6zn",
  env: {
    'cypress-plugin-snapshots': {},
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
  },
})