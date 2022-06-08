import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({ filter, anecdotes}) => {
      if(filter === ''){
        return anecdotes
      }else{
        return anecdotes.filter(anec => 
          anec.content.includes(filter))
      }
    })
    
    console.log(anecdotes)
    const data = [].concat(anecdotes).sort((a,b) => 
       b.votes - a.votes
    )

    return(
    <div>
      <h2>Anecdotes</h2>
      {data.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => {
              dispatch(vote(anecdote.id))
              dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
             }}>vote</button>
          </div>
        </div>
      )}
      
    </div>
    )
}

export default AnecdoteList