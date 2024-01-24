const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: "pwh6zn",
  env: {
    username: 'test',
    password: 'test',
  },
  e2e: {
    baseUrl: 'http://localhost:4500',
  },
})
