/// <reference types="cypress" />
describe('logs in', () => {
    it('using UI', () => {
      cy.visit('/')

      // enter valid username and password
      cy.get('[name=username]').type(Cypress.env('username'))
      cy.get('[name=password]').type(Cypress.env('password'))
      cy.contains('button', 'Login').click()
  
      // confirm we have logged in successfully
      cy.get('#loginForm')
      .should('be.not.visible')
      .then(() => {
      /* global window */
        const userString = window.localStorage.getItem('user')
        cy.log(userString)
        expect(userString).to.be.a('string')
        const user = JSON.parse(userString)
  
        expect(user).to.be.an('object')
        expect(user).to.have.keys([
          'id',
          'username',
          'firstName',
          'lastName',
          'token',
        ])
  
        expect(user.token).to.be.a('string')
      })
    })
    
    it('fails to access protected resource', () => {
      cy.request({
        url: 'http://localhost:3000/users',
        // allowing the test to continue even if the request does not return a success status. 
        // This can be useful in scenarios where you want to inspect the response or perform additional actions regardless of the status code.
        failOnStatusCode: false,
      })
      .its('status')
      .should('equal', 401)
    })
  
    it('Does not log in with invalid password', () => {
      cy.visit('/')
  
      // try logging in with invalid password
      cy.get('[name=username]').type('username')
      cy.get('[name=password]').type('wrong-password')
      cy.contains('button', 'Login').click()
  
      // still on /login page plus an error is displayed
      cy.contains('#passwordError', 'Username or password is incorrect').should(
        'be.visible'
      )
    })
  })