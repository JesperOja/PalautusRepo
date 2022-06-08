import { createSlice } from "@reduxjs/toolkit"
import anecService from '../services/anectodes'

const anecSlice = createSlice({
  name: 'anectodes',
  initialState: [],
  reducers:{
    appendAnec(state,action){
      state.push(action.payload)
    },
    setAnecs(state,action){
      return action.payload
    }
  }
})

export const initializeAnecs = () => {
  return async dispatch => {
    const anecs = await anecService.getAll()
    dispatch(setAnecs(anecs))
  }
}

export const vote = (id) =>{
  return async dispatch =>{
    await anecService.voteAnec(id)
    dispatch(initializeAnecs())
  }
}
export const createAnec = content => {
  return async dispatch => {
    const newAnec = await anecService.createNew(content)
    dispatch(appendAnec(newAnec))
  }
}
export const { appendAnec, setAnecs } = anecSlice.actions 
export default anecSlice.reducer