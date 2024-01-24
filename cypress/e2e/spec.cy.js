
describe('Login Element Color Test', () => {
  it('should have red font color for element with id "login"', () => {
    
    cy.visit('your_application_url');

    cy.get('#login').should('be.visible');
  
    cy.get('#login').invoke('css', 'color').should('eq', 'rgb(255, 0, 0)');
  });
});
