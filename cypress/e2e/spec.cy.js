/// <reference types="cypress" />
const { doRequestLogin } = require('../support/e2e')
// login just once using API
let user

before(function () {
  user = doRequestLogin()
})

// but set the user before visiting the page
// so the app thinks it is already authenticated
beforeEach(function setUser () {
  cy.visit('/', {
    onBeforeLoad (win) {
      // and before the page finishes loading
      // set the user object in local storage
      cy.log(user)
      win.localStorage.setItem('user', JSON.stringify(user))
    },
  })
  // the page should be opened and the user should be logged in
})

describe('JWT', () => {
  it('makes authenticated request', () => {
  // we can make authenticated request ourselves
  // since we know the token
    cy.request({
      url: 'http://localhost:3000/users',
      auth: {
        bearer: user.token,
      },
    })
    .its('body')
    .should('deep.equal', [
      {
        id: 1,
        username: 'test',
        firstName: 'Test',
        lastName: 'User',
      },
    ])
  })

  it('is logged in', () => {
    cy.contains('Hi Test!').should('be.visible')
  })
})