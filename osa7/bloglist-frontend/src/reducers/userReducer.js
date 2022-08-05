import { createSlice } from "@reduxjs/toolkit"
import loginService from "../services/login"
import blogService from "../services/blogs"

const userSlice = createSlice({
    name: 'user',
    initialState: [],
    reducers: {
        login(state, action){
            state.pop()
            state.push(action.payload)
        },
        logout(state, action){
            state.pop()
        }
    }
})

export const userLogin = (username, password) =>{
    return async dispatch => {
        const user = await loginService.login({
            username, password,
          })
        
          window.localStorage.setItem(
            'loggedBloglistUser', JSON.stringify(user)
          )
    
          blogService.setToken(user.token)

          dispatch(login(user))
    }
}

export const userLogged = (user) => {
    return async dispatch => {
        dispatch(login(user))
    }
}

export const userLogout = () => {
    return async dispatch => {
        window.localStorage.clear()
        dispatch(logout())
    }
}


export const { login, logout } = userSlice.actions
export default userSlice.reducer