import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Logout from './components/Logout'
import Create from './components/Create'
import Notification from './components/Notification'
import Togglable from './components/Togglable'




const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [infoMessage, setInfoMessage] = useState(null)
  const [infoStyle, setInfoStyle] = useState(null)

  const blogFormReg = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
      setInfoMessage('wrong username or password')
      setInfoStyle('delete')
      setTimeout(() => {
        setInfoMessage(null)
      }, 5000)
    }
  }


  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort(((a, b) => b.likes - a.likes))
      setBlogs(blogs)
    })
  })


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  if (user === null) {
    return (
      <div>
        <h2>Login</h2>
        <Notification message={infoMessage} style={infoStyle} />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login' type="submit">login</button>
        </form>
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={infoMessage} style={infoStyle} />
      <Logout name={user.name} setUser={setUser} />
      <Togglable buttonLabel="new blog" ref={blogFormReg}>
        <Create blogs={blogs} blogFormReg={blogFormReg} setBlogs={setBlogs} blogService={blogService} setStyle={setInfoStyle} setMessage={setInfoMessage} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} blogService={blogService} setStyle={setInfoStyle} setMessage={setInfoMessage} user={user} />
      )}
    </div>
  )
}

export default App