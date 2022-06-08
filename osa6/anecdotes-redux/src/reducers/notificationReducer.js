import { createSlice } from "@reduxjs/toolkit"

const initialState = [{message: null,
show: false}]
let timerID = 0
const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers:{
        hide(state,action){
            state.push({
                message: null,
                show: false
            })
        },
        notification(state,action){
            state.push({
                message: action.payload,
                show: true
            })
        }
    }
})

export const setNotification = (message, time) => {
    return dispatch => {
        dispatch(notification(message))
        if(timerID !== 0){
            clearTimeout(timerID)
        }
        timerID = setTimeout(()=> {
            dispatch(hide())
            timerID = 0
        }, time*1000)
        
    }
}

export const { hide, notification } = notificationSlice.actions
export default notificationSlice.reducer