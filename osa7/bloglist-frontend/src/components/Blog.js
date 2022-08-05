import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { initializeBlogs } from '../reducers/blogReducer'
import { Link } from "react-router-dom"
import Togglable from './Togglable'
import Create from './Create'

const Blog = () => {
  const dispatch = useDispatch()
  const blogFormReg = useRef()
  const blogs = useSelector(state => state.blogs)
  const sortedBlogs = [...blogs].sort((a1,a2) => a2.likes - a1.likes)

  useEffect(() => {
    dispatch(initializeBlogs())
  },[dispatch])

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
 
    return (
      <>
        <h2>Blogs</h2>
        <Togglable buttonLabel="new blog" ref={blogFormReg}>
        <Create blogFormReg={blogFormReg} />
      </Togglable>
      <div style={blogStyle}>
        {sortedBlogs.map(blog =>
        <div key={blog.id}>
        <Link to={`/api/blogs/${blog.id}`} >
          {blog.title}; {blog.author}
        </Link></div>)}
      </div>
      </>
    )
  
}

export default Blog