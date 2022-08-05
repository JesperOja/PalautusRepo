const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')
const jwt = require('jsonwebtoken')


const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const notes = await Blog.find({})
  .populate('user', { username: 1, name: 1 })
  

  response.json(notes)
})

blogsRouter.get('/:id', async (request, response) => {
    const blogs =  await Blog.find({}).populate('comments', {comment: 1})
    
    const blog = blogs.find(n => n.id === request.params.id)
    
    if (blog) {
        response.json(blog)
      } else {
        response.status(404).end()
      }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  if(blog.title === undefined || blog.author === undefined){ 
    return response.status(400).json({
      error: 'Title and author is required'
    })
  }

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    
  response.status(201).json(updatedBlog)  
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const body = request.body
  const blog = await Blog.findById(request.params.id)
  const comment = new Comment({
    comment: body.comment
  })

  const savedComment = await comment.save()
  
  blog.comments = blog.comments.concat(savedComment._id)
  await blog.save()
  
  response.status(201).json(savedComment)
})

module.exports = blogsRouter