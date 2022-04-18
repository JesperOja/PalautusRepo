import React, { useState } from 'react'

const Blog = ({ blog, blogService, setStyle, setMessage, user }) => {
  const [info, setInfo] = useState(false)

  const toggle = () => {
    setInfo(!info)
  }

  const like = () => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user
    }

    blogService
      .update(blog.id, updatedBlog)
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  let showWhenVisible = { display: '' }
  if (user.username === blog.user.username) {
    showWhenVisible = { display: '' }
  } else {
    showWhenVisible = { display: 'none' }
  }


  const remove = () => {

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService
        .deleteBlog(blog.id)

      setMessage(`Removed blog ${blog.title} by ${blog.author}`)
      setStyle('delete')
      setTimeout(() => {
        setMessage(null)
      }, 5000)

    }
  }

  if (info) {
    return (
      <div style={blogStyle} className='fullInfo'>
        <div>
          {blog.title} by {blog.author} <button onClick={toggle}>hide</button>
          <div>{blog.url}</div>
          <div>likes {blog.likes} <button onClick={like}>like</button></div>
          <div>{blog.user.username}</div>
          <button style={showWhenVisible} onClick={remove}>remove</button>
        </div>
      </div>
    )
  } else {
    return (
      <div style={blogStyle} className='smallInfo'>
        <div id='blog'>
          {blog.title}; {blog.author} <button onClick={toggle}>view</button>
        </div>
      </div>
    )
  }
}

export default Blog