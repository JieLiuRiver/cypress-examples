const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: "pwh6zn",
  env: {
    username: 'test',
    // password hard code, it is not a good way
    // need to use system environment variable: CYPRESS_password=xxx
    // cypress will auto handle variable with prefix CYPRESS_, and get password variable
    // and set to env obj
    // password: 'test'
  },
  e2e: {
    baseUrl: 'http://localhost:4500',
  },
})
