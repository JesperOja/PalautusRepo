import { createSlice } from "@reduxjs/toolkit"
import userService from "../services/users"

const usersSlice = createSlice({
    name:'users',
    initialState: [],
    reducers:{
        getUsers(state, action){
            return action.payload
        }
    }
})

export const allUsers = () => {
    return async dispatch =>{
        const users = await userService.getAll()
        dispatch(getUsers(users))
    }
}

export const {getUsers} = usersSlice.actions
export default usersSlice.reducer