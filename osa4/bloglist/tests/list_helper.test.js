const listHelper = require('../utils/list_helper')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const Blog = require('../models/blog')
const User = require('../models/user')
const mongoose = require('mongoose')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)

  await Blog.insertMany(helper.initialBlogs)
})

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('totalLikes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const listWithManyBlogs = [
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 7,
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 2,
    }
  ]

  test('of empty array is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithManyBlogs)
    expect(result).toBe(14)
  })
})

describe('Favorite', () => {
  const listWithManyBlogs = [
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    },
    {
      title: 'Is this the one?',
      author: 'Jesper',
      likes: 7,
    },
    {
      title: 'Shitties one',
      author: 'Niko',
      likes: 2,
    }
  ]

  test('blog with most likes', () => {
    const result = listHelper.favoriteBlog(listWithManyBlogs)
    expect(result).toEqual({
      title: 'Is this the one?',
      author: 'Jesper',
      likes: 7,
    })
  })
})

test('there are two notes', async () => {
  const response = await helper.blogsInDb()

  expect(response).toHaveLength(2)
})

test('the first note is about HTTP methods', async () => {
  const response = await helper.blogsInDb()

  expect(response[0].title).toBe('First blog')
})


describe('Getting blogs from database', () => {
  test('blogs returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('getting id', async () => {
    const response = await helper.blogsInDb()

    expect(response[0].id).toBeDefined()
  })

  test('valid blog can be added', async () => {
    const newBlog = {
      title: 'Third blog',
      author: 'Annika',
      url: 'Testausta',
      likes: 22
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await helper.blogsInDb()

    expect(response).toHaveLength(helper.initialBlogs.length + 1)
    expect(response[2].title).toContain('Third blog')
  })

  test('new blog has 0 likes', async () => {
    const newBlog = {
      title: 'Third blog',
      author: 'Annika',
      url: 'Testausta'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await helper.blogsInDb()

    expect(response).toHaveLength(helper.initialBlogs.length + 1)
    expect(response[2].likes).toBe(0)
  })

  test('failing to add new blog without author nor title', async () => {
    const newBlog = {
      url: 'Testausta'
    }

    const results = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)

    
    expect(results.body.error).toContain('Title and author is required')
  })
})

describe('Removing or editing single blog', () => {
  test('removing one blog', async () => {
    const blogs = await helper.blogsInDb()
    const idToRemove = blogs[0].id

    await api
      .delete(`/api/blogs/${idToRemove}`)
      .expect(204)
  })

  test('editing one blog', async () =>{
    const editedBlog = {
      title: 'New Blog',
      author: 'Jesper',
      url: 'Serveri'
    }

    const blogs = await helper.blogsInDb()
    const idToEdit = blogs[0].id

    await api
      .put(`/api/blogs/${idToEdit}`)
      .send(editedBlog)
      .expect(201)

    const response = await helper.blogsInDb()

    expect(response[0].title).toContain('New Blog')
  })
})

describe('Adding users and users for blogs', () => {
  
  test('too short username', async () => {
    const newUser = {
      username: 'Yo',
      name: 'Jouni',
      password: 'Haaha'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    
      const response = await helper.usersInDb()
    expect(response.length).toBe(helper.initialUsers.length)
  })

})

afterAll(() => {
  mongoose.connection.close()
})