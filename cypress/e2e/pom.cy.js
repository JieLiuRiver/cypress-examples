import Login from '../page-objects/login';

describe("POM", () => {
    it('Login', () => {
        cy.visit("https://opensource-demo.orangehrmlive.com/")
        const loginInstance = new Login()
        loginInstance.setUserName('test')
        loginInstance.setPassword('test')
        loginInstance.clickSubmit();
        loginInstance.verifyLogin()
    })  
})