import { createSlice } from "@reduxjs/toolkit"

const initialState = ''
const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilter(state,action){
            const string = action.payload
            return string
        }
    }
})

export const { setFilter } = filterSlice.actions
export default filterSlice.reducer