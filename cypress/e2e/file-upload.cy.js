

describe('File Uploads', function () {
    it('Single file upload', () => {
        cy.visit("http://the-internet.herokuapp.com/upload")
        cy.get('#file-upload').attachFile('cypress-logo.png')
        cy.get('#file-submit').click()
        cy.wait(5000)
        cy.get('div[class="example"] h3').should('have.text', 'File Uploaded!');
    })

    it('File upload - Rename', () => {
        cy.visit("http://the-internet.herokuapp.com/upload")
        cy.get('#file-upload').attachFile({
            filePath: 'cypress-logo.png',
            fileName: 'james'
        })
        cy.get('#file-submit').click()
        cy.wait(5000)
        cy.get('div[class="example"] h3').should('have.text', 'File Uploaded!');
    })

    it('File upload - drag & drop', () => {
        cy.visit("http://the-internet.herokuapp.com/upload")
        cy.get('#drag-drop-upload').attachFile('cypress-logo.png', {subjectType: 'drag-n-drop'})
        cy.wait(5000)
        cy.get('#drag-drop-upload > .dz-preview > .dz-details > .dz-filename > span').contains('cypress-logo.png');
    })

})