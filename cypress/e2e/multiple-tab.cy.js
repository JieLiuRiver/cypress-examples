describe('Multi-tabs Example', () => {
    it('should open two tabs, but Cypress does not directly support interacting with them', () => {
      // Visit the first page
      cy.visit('https://translate.google.com/');
  
      // Open a new tab and try to visit another page
      cy.visit('https://www.google.co.uk/', { log: false });

    })
})