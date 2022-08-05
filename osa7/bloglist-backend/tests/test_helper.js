const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'First blog',
        author: 'Jesper',
        url: 'localhost',
        likes: 4
    },
    {
        title: 'Second blog',
        author: 'Taavi',
        url: 'Blogisivu',
        likes: 6
    }
]

const initialUsers = [
    {
        username: "Jesper",
        name: "Jesper",
        password: "Root"
    },
    {
        username: "Jaakko",
        name: "Jaakko",
        password: "Jaakko"
    }
]
const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}
const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}
module.exports = {
    blogsInDb, initialBlogs, initialUsers,usersInDb
}