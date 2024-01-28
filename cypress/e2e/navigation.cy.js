
describe("Navigation", () => {
    it("test 1", () => {
        cy.visit("https://translate.google.com/")

        cy.get("[jsname='SHEbFd']").click(); 
        cy.url().should('include', 'images');

        cy.go('back') // go back to home
        cy.url().should("eq", "https://translate.google.com/")

        cy.go('forward') // cameras
        cy.url().should('include', 'images');
        
        cy.go(-1);
        cy.url().should("eq", "https://translate.google.com/")

        cy.go(1)
        cy.url().should('include', 'images');

        cy.reload();
    })
})