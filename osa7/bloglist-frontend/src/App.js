import React, { useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Logout from './components/Logout'
import Notification from './components/Notification'
import { useDispatch, useSelector} from 'react-redux'
import { userLogged } from './reducers/userReducer'
import Login from './components/Login'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from "react-router-dom"
import Info from './components/Info'
import Users from './components/Users'
import User from './components/User'


const App = () => {
 
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  
  const padding = {
    padding: 5
  }
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(userLogged(user))
      blogService.setToken(user.token)
    }
  }, [])
  
  if (user.length === 0) {
    return (
      <div>
        <h2>Login</h2>
        <Notification  />
        <Login />
      </div>
    )
  }
  return (
    <Router>
    <div>
      <Link style={padding} to='/'>blogs</Link>
      <Link style={padding} to='/users'>users</Link>
      <Logout />
      <Notification />
    </div>
    <Routes>
      <Route path='/' element={<Blog />} />
      <Route path='/users' element={<Users />} />
      <Route path="/api/blogs/:id" element={<Info />} />
      <Route path='/api/users/:id' element={<User />} />
    </Routes>
    
    </Router>
  )
}

export default App