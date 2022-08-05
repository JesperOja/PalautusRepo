import React from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const User = () => {
    const id = useParams().id
    const users = useSelector(state => state.users)
    const user = users.find(u => u.id === id)

    if(!user){
        return null
    }
    return (
        <div>
            <h1>{user.name}</h1>
            <div>Blogs added</div>
            <ul>
                {user.blogs.map(blog =>
                    <li><Link to={`/api/blogs/${blog.id}`} >
                        {blog.title} by {blog.author}</Link></li>)}
            </ul>
        </div>
    )
}

export default User