function doRequestLogin() {
    return cy.request('POST', 'http://localhost:3000/users/authenticate', {
        username: Cypress.env('username'),
        password: Cypress.env('password'),
      })
      .its('body')
      .then((res) => {
        cy.wrap(res).as('user');
      });
}

module.exports = {
    doRequestLogin
}