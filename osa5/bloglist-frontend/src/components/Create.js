import { useState } from 'react'

const Create = ({ blogService, setBlogs,
  blogs, setStyle, setMessage, blogFormReg }) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    blogFormReg.current.toggleVisibility()

    blogService
      .create(blogObject)
      .then(returned => {
        setBlogs(blogs.concat(returned))
        setNewAuthor('')
        setNewTitle('')
        setNewUrl('')
      }).then(() => {
        setMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
        setStyle('added')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>title: <input
          id='title'
          value={newTitle}
          onChange={handleTitleChange}
          placeholder='title'
        /></div>
        <div>author:  <input
          id='author'
          value={newAuthor}
          onChange={handleAuthorChange}
          placeholder='author'
        /></div>
        <div>url:  <input
          id='url'
          value={newUrl}
          onChange={handleUrlChange}
          placeholder='url'
        /></div>
        <button id='create' type="submit">create</button>
      </form>
    </>
  )
}

export default Create