import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { allUsers } from "../reducers/usersReducer"
import { Link } from "react-router-dom"

const Users = () => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.users)

    useEffect(() =>{
        dispatch(allUsers())
    }, [dispatch])
    return(
        <div>
            <h2>Users</h2>
            <br />
            <div style={{ display: "flex"}}><ul style={{listStyleType: "none"}}>
                <li><br /></li>
                {users.map(user => 
                    <Link to={`/api/users/${user.id}`} >
                    <li >{user.name}</li>
                    </Link>
                )}
            </ul>
            <ul style={{listStyleType: "none"}}>
                <li>Blogs created</li>
                {users.map(user => 
                    <li >{user.blogs.length}</li>
                )}
            </ul>
                
            </div>
        </div>
    )
}

export default Users