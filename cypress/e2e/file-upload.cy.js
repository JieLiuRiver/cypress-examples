

describe('File Uploads', function () {
    it('Single file upload', () => {
        cy.visit("http://the-internet.herokuapp.com/upload")
        cy.get('#file-upload').attachFile('art.png')
        cy.get('#file-submit').click()
        cy.wait(5000)
        cy.get('div[class="example"] h3').should('have.text', 'File Uploaded!');
    })
})