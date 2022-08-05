describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Jesper',
      username: 'Jepsu',
      password: 'root'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('Jepsu')
      cy.get('#password').type('root')
      cy.get('#login').click()

      cy.contains('logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('Jesu')
      cy.get('#password').type('roooot')
      cy.contains('login').click()

      cy.contains('wrong username or password')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'Jepsu', password: 'root' })
    })

    it('a new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('First blog')
      cy.get('#author').type('Jepsu')
      cy.get('#url').type('localhost')
      cy.get('#create').click()

      cy.contains('First blog')
    })

    describe('blogs on list already', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'First blog',
          author: 'Jepsu',
          url: 'Localhost'
        })
      })

      it('can like a blog', function() {
        cy.contains('view').click()
        cy.contains('like').click()

        cy.contains('likes 1')
      })

      it('can remove a blog', function() {
        cy.contains('view').click()
        cy.contains('remove').click()

        cy.contains('Removed blog')
      })
    })

    describe('blogs on list in order', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'First blog',
          author: 'Jepsu',
          url: 'Localhost'
        })
        cy.createBlog({
          title: 'Second blog',
          author: 'Jepsu',
          url: 'Localhost'
        })
        cy.createBlog({
          title: 'Third blog',
          author: 'Jepsu',
          url: 'Localhost'
        })
      })

      it('blog in order', function() {
        cy.contains('First blog')
          .contains('view').click()
        cy.contains('like').click()
        cy.contains('hide').click()

        cy.contains('Second blog')
          .contains('view').click()
        cy.contains('like').click()
        cy.contains('hide').click()

        cy.contains('First blog')
          .contains('view').click()
        cy.contains('like').click()
        cy.contains('hide').click()

        cy.contains('Third blog')
          .contains('view').click()
        cy.contains('like').click()
        cy.contains('hide').click()

        cy.contains('Third blog')
          .contains('view').click()
        cy.contains('like').click()
        cy.contains('hide').click()

        cy.contains('Third blog')
          .contains('view').click()
        cy.contains('like').click()
        cy.contains('hide').click()

        cy.get('#blog').should(($blog) => {

          expect($blog.first()).to.contain('Third blog')
        })
      })
    })
  })
})