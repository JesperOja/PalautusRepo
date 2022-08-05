import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom'
import { useField } from './hooks'

const Menu = (props) => {
  const padding = {
    paddingRight: 5
  }
  return (
    <Router>
    <div>
      <Link to='/' style={padding}>anecdotes</Link>
      <Link to='/create' style={padding}>create new</Link>
      <Link to='/about' style={padding}>about</Link>
    </div>

    <Routes>
      <Route path="/:id" element={<Anec anecs={props.anecs}/>} />
      <Route path="/" element={<AnecdoteList anecdotes={props.anecs} notification={props.notification}/>} />
      <Route path="/create" element={<CreateNew addNew={props.addNew}/>} />
      <Route path="/about" element={<About />} />
    </Routes>
    </Router>
  )
}

const Anec = (props) => {
  const id = useParams().id
  const anec = props.anecs.find(b => b.id === Number(id))
  
  return(
    <div>
      <h2>{anec.content} by {anec.author}</h2>
      <p>votes {anec.votes}</p>
      <p>for more info see <a href={anec.info}>{anec.info}</a></p>
    </div>
  )
}

const AnecdoteList = (props) => (
  <div>
    <Notification notification={props.notification} />
    <h2>Anecdotes</h2>
    <ul>
      {props.anecdotes.map(anecdote => <li key={anecdote.id} >
        <Link to={`/${anecdote.id}`}>{anecdote.content}</Link></li>)}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const author = useField('text')
  const content = useField('text')
  const info = useField('text')
  
  const newAuthor = () => {
    const {reset, ...newAuthor} = author
    return newAuthor
  }

  const removeReset = () => {
    const {reset, ...newInfo} = info
    return newInfo
  }
  
  const newContent = () => {
    const {reset, ...newContent} = content
    return newContent
  }

  const inputAuthor = newAuthor()
  const inputContent = newContent()
  const inputInfo = removeReset()

  const navigate = useNavigate()
  const handleReset = () => {
    author.reset()
    content.reset()
    info.reset()
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    navigate('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...inputContent} />
        </div>
        <div>
          author
          <input {...inputAuthor} />
        </div>
        <div>
          url for more info
          <input {...inputInfo} />
        </div>
        <input type='submit'  value='Create' /><input type='reset' onClick={handleReset} value='reset' />
      </form>
    </div>
  )

}

const Notification = (props) =>{
  if(props.notification === ''){
    return (
      <></>
    )
  }
  return(
    <div>
      {props.notification}
    </div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`a new anecdote ${anecdote.content} created!`)
    setTimeout(()=>{
      setNotification('')
    },5000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      
      <Menu anecs={anecdotes} addNew={addNew} notification={notification}/>
      
      <Footer />
    </div>
  )
}

export default App
