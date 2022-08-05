import { useParams } from "react-router-dom"
import React from "react"
import { useDispatch, useSelector, connect } from "react-redux"
import { voteBlog, deleteBlog, getBlog, addComment } from "../reducers/blogReducer"
import { createNotification } from "../reducers/notificationReducer"


const Info = (props) =>{
    const id = useParams().id
    const blogs = useSelector(state => state.blogs)
    const loggedUser = useSelector(state => state.user)
    const dispatch = useDispatch()
    dispatch(getBlog(id))
    const blog = blogs.find(n => n.id === id)

    const like = (id) => {
  
        const likedBlog = blogs.find(a => a.id === id)
        dispatch(voteBlog(likedBlog))
        const message = `you liked ${blogs.find(a => a.id === id).title} by ${blogs.find(a => a.id === id).author}`
        dispatch(createNotification(message,5))
       }
       const remove = (id) => {
    
        const removeBlog = blogs.find(a => a.id === id)
        if (window.confirm(`Remove blog ${blogs.find(a => a.id === id).title} by ${blogs.find(a => a.id === id).author}`)) {
          dispatch(deleteBlog(removeBlog.id))
    
          const message = `Removed blog  ${blogs.find(a => a.id === id).title} by ${blogs.find(a => a.id === id).author}`
          dispatch(createNotification(message, 5))
        }
      }
      
      const newComment = (id, event) => {
        event.preventDefault()
        
        dispatch(addComment(id, event.target.comment.value))
      }
      if(loggedUser[0].name === blog.user.name){
        return(
          <div>
            <h1>{blog.title} by {blog.author}</h1>
            <div>{blog.url}</div>
            <div>likes {blog.likes} <button onClick={() => like(blog.id)}>like</button></div>
            <div>added by {blog.user.name}</div>
            <button onClick={() => remove(blog.id)}>remove</button>
            <br />
            <h3>comments</h3>
            <form onSubmit={(event) => {newComment(blog.id,event)}}>
              <div>
              <input 
              name="comment"
              type="text"
              id="comment"
              />
              <button id="newComment" type="submit">add comment</button>
              </div>
              
            </form>
            <ul>
              {blog.comments.map(comment =>
                <li>{comment.comment}</li>
                )}
            </ul>
          </div>
          )
      }else{
      return (
           
          <div>
            <h1>{blog.title} by {blog.author}</h1>
            <div>{blog.url}</div>
            <div>likes {blog.likes} <button onClick={() => like(blog.id)}>like</button></div>
            <div>added by {blog.user.name}</div>
            <br />
            <h3>comments</h3>
            <form onSubmit={(event) => {newComment(blog.id,event)}}>
              <div>
              <input 
              name="comment"
              type="text"
              id="comment"
              />
              <button id="newComment" type="submit">add comment</button>
              </div>
              
            </form>
            <ul>
              {blog.comments.map(comment =>
                <li>{comment.comment}</li>
                )}
            </ul>
          </div>)
      }
}

export default connect(null, {createNotification, addComment  })(Info)