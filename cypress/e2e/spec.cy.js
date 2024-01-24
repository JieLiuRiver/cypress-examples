// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="Cypress" />

lakey.
  // @see https://www.cypress.io/blog/2020/12/03/retry-rerun-repeat/
  describe('loading style', { retries: 0 }, () => {
    const timeout = 1500 // ms
  
    it('applies app.css styles', () => {
      cy.visit('/')
      cy.waitForResource('base.css')
      cy.waitForResource('app.css')
      // red color means the style from "app.css" has been loaded and applied
      cy.get('h1', { timeout }).should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  
    it('app.css is a tiny resource', { browser: '!firefox' }, () => {
      cy.visit('/')
      cy.waitForResource('app.css').then((resourceTiming) => {
        expect(resourceTiming, 'got resource timing').to.not.be.null
  
        // there are lots of timing properties in this object
        expect(resourceTiming)
        .property('entryType')
        .to.equal('resource')
  
        expect(resourceTiming, 'the CSS file is very small (in bytes)')
        .property('transferSize')
        .to.be.lt(500)
  
        expect(resourceTiming, `loads in less than ${timeout}ms`)
        .property('duration')
        .to.be.lt(timeout)
      })
    })
  
    it('waits for multiple resources', () => {
      cy.visit('/')
      // the "cy.waitForResources" command was written in cypress/support/e2e.js file
      cy.waitForResources('base.css', 'app.css')
      // red color means the style from "app.css" has been loaded and applied
      cy.get('h1', { timeout }).should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  
    it('waits on resource using wait-until 3rd party plugin', { browser: '!firefox' }, () => {
      cy.visit('/')
  
      // 3rd party module "cypress-wait-until" is really useful
      // for simple conditions like waiting for an item
      // @see https://github.com/NoriSte/cypress-wait-until
      cy.waitUntil(() => {
        return cy.window().then((win) => {
          return win.performance
          .getEntriesByType('resource')
          // note: ".some(...)" method returns boolean value
          // which cypress-wait-until expects
          .some((item) => item.name.endsWith('app.css'))
        })
      })
  
      // red color means the style from "app.css" has been loaded and applied
      cy.get('h1', { timeout }).should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
  
  describe('loading images', () => {
    it('waits for the image to load', () => {
      cy.visit('/')
  
      // we can wait for the <img> element to appear
      // but the image has not been loaded yet.
      cy.get('[alt="delayed image"]').should('be.visible')
  
      // Let's wait for the actual image to load
      cy.waitForResource('cypress-logo.png')
    })
  
    it('waits for the image to have actual dimensions', () => {
      cy.visit('/')
  
      // we can wait for the <img> element to appear
      // but the image has not been loaded yet.
      cy.get('[alt="delayed image"]')
      .should('be.visible')
      .and(($img) => {
        // "naturalWidth" and "naturalHeight" are set when the image loads
        expect(
          $img[0].naturalWidth,
          'image has natural width'
        ).to.be.greaterThan(0)
      })
    })
  })
  
  describe('loading script', () => {
    it('waits for the script to load', () => {
      cy.visit('/')
      cy.window().its('console').then((console) => cy.spy(console, 'log').as('console'))
      cy.waitForResource('a-script.js')
      // once the resource is loaded, it might take a turn to compile and run
      // thus we need to give the script time to call the console by retrying
      cy.get('@console').should('have.been.calledOnce')
    })
  })