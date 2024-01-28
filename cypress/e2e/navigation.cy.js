
describe("Navigation", () => {
    it("test 1", () => {
        cy.visit("https://translate.google.com/")

        cy.get("[jsname='SHEbFd']").click(); 
        cy.url().contain("images")

        cy.go('back') // go back to home
        cy.url().should("eq", "https://translate.google.com/")

        cy.go('forward') // cameras
        cy.url().contain("images")

        cy.go(-1);
        cy.url().should("eq", "https://translate.google.com/")

        cy.go(1)
        cy.url().contain("images")

        cy.reload();
    })
})