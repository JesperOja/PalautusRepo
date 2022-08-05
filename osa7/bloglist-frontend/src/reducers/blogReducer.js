import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlog(state, action){
            const blog = action.payload
            
            return state.map(a => a.id === blog.id ? blog : a)
        },
        appendBlog(state, action){
            state.push(action.payload)
        },
        getBlogs(state, action){
            return action.payload
        }
    }
})

export const createBlog = (newBlog) => {
    return async dispatch => {
        const createBlog = await blogService.create(newBlog)
        dispatch(appendBlog(createBlog))
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(getBlogs(blogs))
    }
}

export const voteBlog = (blog) =>{
    return async dispatch => {
        const updatedBlog = await blogService.likeBlog(blog.id)
        dispatch(setBlog(updatedBlog))
    }
}

export const getBlog = (id) => {
    return async dispatch => {
        const blog = await blogService.getBlog(id)
        dispatch(setBlog(blog))
    }
}

export const deleteBlog = (id) => {
    return async dispatch => {
        await blogService.deleteBlog(id)
        const blogs = await blogService.getAll()
        dispatch(getBlogs(blogs))
    }
}

export const addComment = (id, comment) => {
    return async dispatch => {
        const blog = await blogService.addComment(id, comment)
        dispatch(setBlog(blog))
    }
}

export const { setBlog, appendBlog, getBlogs } = blogSlice.actions
export default blogSlice.reducer