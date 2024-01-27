const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: "pwh6zn",
  defaultCommandTimeout: 10000,
  e2e: {
    baseUrl: 'http://localhost:4500',
  },
})
