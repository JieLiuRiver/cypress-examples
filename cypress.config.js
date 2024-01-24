const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: "pwh6zn",
  e2e: {
    baseUrl: 'http://localhost:4500',
  },
})
