import Login from '../page-objects/login';

describe("POM", () => {
    it('Login', () => {
        cy.visit("https://opensource-demo.orangehrmlive.com/")

        cy.fixture('account').then((data) => {
            const instance = new Login()
            instance.setUserName(data.username)
            instance.setPassword(data.password)
            instance.clickSubmit();
            instance.verifyLogin()
        })
    })  
})