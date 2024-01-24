
describe('Login Element Color Test', () => {
  it.skip('should have login element', () => {
    
    cy.visit('/');

    cy.get('#loginForm').should('be.visible');
  
    
  });
});
