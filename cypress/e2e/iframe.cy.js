

describe("ifrme", () => {
    it("test 1 ", () => {
        cy.visit("https://the-internet.herokuapp.com/iframe")
        cy.frameLoaded("#mce_0_ifr")

        cy.iframe("#mce_0_ifr").clear().type("Welcome {cmd+a}")
        cy.get("[aria-label='Bold'").click();
    })
})