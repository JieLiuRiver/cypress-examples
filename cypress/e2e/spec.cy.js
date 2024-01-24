
describe('Login Element Color Test', () => {
  it('should have login element', () => {
    
    cy.visit('/');

    cy.get('#loginForm').should('be.visible');
  
    cy.window().its('localStorage.user').invoke('forEach', (key, value) => {
      cy.log(`${key}: ${value}`);
  });
  });
});
