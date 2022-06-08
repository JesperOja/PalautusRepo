import { connect } from 'react-redux'
import { createAnec } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteFrom = (props) => {
    

    const addAnec = async (event) => {
        event.preventDefault()
        const content = event.target.anec.value
        event.target.anec.value = ''
        props.createAnec(content)
        props.setNotification(`you created new anecdote '${content}'`, 5)
      }

    return (
        <>
        <h2>create new</h2>
        <form onSubmit={addAnec}>
        <div><input name="anec"/></div>
        <button type="submit">create</button>
      </form>
      </>
    )
}

const mapDispatchToDrops = {
  createAnec,
  setNotification
}

const ConnectedForms = connect(null, mapDispatchToDrops)(AnecdoteFrom)
export default ConnectedForms