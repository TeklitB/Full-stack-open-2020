describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'Arto Hellas',
            username: 'hellas',
            password: 'teklit'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', () => {
        cy.contains("Log in to application")
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get('#username').type('hellas')
            cy.get('#password').type('teklit')
            cy.get('#login-button').click()
            cy.contains('Arto Hellas logged-in')
        })

        it('fails with wrong credentials', function () {
            cy.get('#username').type('hellas')
            cy.get('#password').type('mash')
            cy.get('#login-button').click()
            cy.contains('Wrong username or password')
        })
    })

    describe.only('When logged in', function () {
        beforeEach(function () {
            cy.get('#username').type('hellas')
            cy.get('#password').type('teklit')
            cy.get('#login-button').click()
        })

        it('A blog can be created', function () {
            cy.get('#show-form').click()
            cy.get('#title').type("Canonical string reduction")
            cy.get('#author').type("Edsger Dijkstra")
            cy.get('#url').type("http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html")
            cy.get('#submitbutton').click()
            cy.contains("A new blog Canonical string reduction by Edsger Dijkstra is added")

            cy.get("#view-button").click()
            cy.get("#like-button").click()
            cy.contains("1")

            cy.get("#delete-button").click()
            cy.contains("http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html").should("not.exist")

        })

        it('Blogs ordered with most likes', function () {
            cy.get('#show-form').click()
            cy.get('#title').type("Canonical")
            cy.get('#author').type("Dijkstra")
            cy.get('#url').type("http://www.cs.utexas.edu/~EWD/")
            cy.get('#submitbutton').click()

            cy.visit('http://localhost:3000')

            cy.get('#show-form').click()
            cy.get('#title').type("Reduction")
            cy.get('#author').type("Edsger")
            cy.get('#url').type("http://www.cs.utexas.edu/")
            cy.get('#submitbutton').click()

            cy.visit('http://localhost:3000')

            cy.get("#view-button").click()
            cy.get("#like-button").click()
            cy.contains("1")

            cy.visit('http://localhost:3000')

            cy.get("#view-button").click()
            cy.get('.titleblog').contains("Canonical Dijkstra")

        })
    })
})


