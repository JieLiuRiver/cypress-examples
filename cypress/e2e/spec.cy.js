
describe('Login Element Color Test', () => {
  it('should have login element', () => {
    
    cy.visit('/');

    cy.get('#loginForm').should('be.visible');
  
    cy.getAllLocalStorage({log: true})
  });
});
