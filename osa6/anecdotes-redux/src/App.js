import AnecdoteFrom from "./components/AnecdoteForm"
import AnecdoteList from "./components/AnecdoteList"
import Notification from "./components/Notification"
import Filter from "./components/Filter"
import { useEffect } from "react"
import { initializeAnecs } from "./reducers/anecdoteReducer"
import { useDispatch } from "react-redux"

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecs())
  }, [dispatch])
  

  return (
    <div>
      <Notification />
       <AnecdoteFrom />
       <Filter />
       <AnecdoteList />
    </div>
  )
}

export default App