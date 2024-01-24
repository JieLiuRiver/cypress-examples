function doRequestLogin() {
    return cy.request('POST', 'http://localhost:3000/users/authenticate', {
      username: Cypress.env('username'), 
      password: Cypress.env('password')
    }).its('body'); 
  }

module.exports = {
    doRequestLogin
}