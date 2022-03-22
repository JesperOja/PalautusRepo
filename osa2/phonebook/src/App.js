import { useState, useEffect } from 'react'
import personService from './services/persons'

const SetFilter = (props) =>{
  return(
    <div>
    filter shown with <input value={props.filt} onChange={props.handle}/>
    </div>
  )
}

const PersonForm = (props) =>{
  return(
    <form onSubmit={props.addName}>
        <div>
          name: <input value={props.name} onChange={props.handleName} />
        </div>
        <div>
          number: <input value={props.number} onChange={props.handleNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Filter = ( props ) =>{
  const name = props.name.toLowerCase()
  const filt = props.filt.toLowerCase()

  const onClickDelete = (event) =>{
    if(window.confirm(`Delete ${props.name}`)){
      personService
        .deletePerson(props.id)
        .finally(info =>{
          props.setMessage(`Deleted ${props.name}`)
          props.setStyle("remove")
          setTimeout(() =>{
            props.setMessage(null)
          }, 5000)
        })
    }
  }

  if(name.includes(filt)){
    return(
      
      <p>
      {props.name} {props.number} <button onClick={onClickDelete}>delete</button>
      </p>
    )
  }
  return(
    <>
    </>
  )
}

const Persons = ( props ) =>{
  return(
  <div>
        {props.persons.map(person =>
          
            <Filter key={person.name} id={person.id} name={person.name} 
            number={person.number} filt={props.filt} setStyle={props.setStyle} setMessage={props.setMessage}/>
          
          )}
      </div>
      )
}

const Notification = ({message, style}) =>{
  if(message === null){
    return null
  }

  return(
    <div className={style}>
      {message}
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filt, setNewFilter] = useState('')
  const [infoMessage, setInfoMessage] = useState(null)
  const [infoStyle, setInfoStyle] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(returned => {
        setPersons(returned)
      })
  })

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) =>{
    setNewFilter(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    const isOnList = persons.some(person => person.name === newName)
    const newPerson = {
      name: newName,
      number: newNumber
    }

    if(!isOnList){
    personService
      .create(newPerson)
      .then(returned => {
        setPersons(persons.concat(returned))
        setNewName('')
        setNewNumber('')
      }).then(notify =>{
        setInfoMessage(`Added ${newPerson.name}`)
        setInfoStyle("added")
        setTimeout(() =>{
          setInfoMessage(null)
        }, 5000)
      })
  }else{
    const oldPerson = persons.find((element) => element.name === newName)
    if(window.confirm(`${newName} is on the phonebook already, replace the old number with the new one?`)){
      personService
        .update(oldPerson.id,newPerson)
        .then(response => {
          setPersons(persons.map(person => person.id !== oldPerson.id ? person : response))
          setNewName('')
          setNewNumber('')
        }).then(notify =>{
          setInfoMessage(`Modified ${newPerson.name} number`)
          setInfoStyle("edited")
          setTimeout(() =>{
            setInfoMessage(null)
          }, 5000)
    }).catch(error =>{
      setInfoMessage(`Information of ${newPerson.name} has already been removed from server`)
          setInfoStyle("remove")
          setTimeout(() =>{
            setInfoMessage(null)
          }, 5000)
    })
  
  }  
}
  }
  return (
    <div>
      <h2>Phonebook</h2>

        <Notification message={infoMessage} style={infoStyle} />
        <SetFilter filt={filt} handle={handleFilterChange}/>

      <h3>Add a new</h3>
      <PersonForm name={newName} number={newNumber} addName={addName} handleName={handleNameChange}
        handleNumber={handleNumberChange}/>

      <h3>Numbers</h3>
      
        <Persons persons={persons} filt={filt} setStyle={setInfoStyle} setMessage={setInfoMessage} />
    </div>
  )
}

export default App