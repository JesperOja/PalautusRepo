import React from "react"
import { useDispatch } from "react-redux"
import { userLogin } from "../reducers/userReducer"
import { createNotification } from "../reducers/notificationReducer"

const Login = () => {
    const dispatch = useDispatch()

    const handleLogin = (event) => {
        event.preventDefault()
        
        try {
          dispatch(userLogin(event.target.username.value, event.target.password.value))
          
        } catch (exception) {
          console.log(exception)
          const message = 'wrong username or password'
          dispatch(createNotification(message,5))
        }
      }

    return (
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              type="text"
              name="username"
            />
          </div>
          <div>
            password
            <input
              id='password'
              type="password"
              name="password"
            />
          </div>
          <button id='login' type="submit">login</button>
        </form>
    )
}

export default Login