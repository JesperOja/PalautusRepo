import React from 'react'
import { connect, useDispatch} from 'react-redux'
import { createNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'

const Create = (props) => {

  const dispatch = useDispatch()

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    }

    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''

    props.createBlog(blogObject)

    props.blogFormReg.current.toggleVisibility()

        const message = `a new blog ${blogObject.title} by ${blogObject.author} added`
        dispatch(createNotification(message, 5))
      
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>title: <input
          name='title'
          placeholder='title'
        /></div>
        <div>author:  <input
          name='author'
          placeholder='author'
        /></div>
        <div>url:  <input
          name='url'
          placeholder='url'
        /></div>
        <button id='create' type="submit">create</button>
      </form>
    </>
  )
}

export default connect(null, {createNotification, createBlog })(Create)