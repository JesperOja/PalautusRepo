import { useState } from 'react'

const StatisticLine = (props) =>{
  return(
    <tr>
      <td>{props.txt}</td>
      <td>{props.value}</td>
    </tr>
  )
}
const Statistics = (props) =>{
  const bad = props.bad
  const good = props.good
  const neutral = props.neutral
  const all = props.all
if(all === 0){
  return(
    
      <h2>No feedback given</h2>
  )}else{
    return(
    <>
    <h2>statistics</h2>
      <table>
        <tbody>
      <StatisticLine txt="good" value={good}/>
      <StatisticLine txt="neutral" value={neutral}/>
      <StatisticLine txt="bad" value={bad}/>
      <StatisticLine txt="all" value={all}/>
      <StatisticLine txt="avarage" value={(good-bad)/all}/>
      <StatisticLine txt="pos" value={good/all*100 +"%"}/>
      </tbody>
      </table>
    </>
    
  )}
}

const Button = (props) =>(
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  

  const setToValueGood = newValue =>{
    setGood(newValue)
    setAll(all+1)
  }
  const setToValueNeutral = newValue =>{
    setNeutral(newValue)
    setAll(all+1)
  }
  const setToValueBad = newValue =>{
    setBad(newValue)
    setAll(all+1)
  }
  
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setToValueGood(good +1)} text="good" />
      <Button handleClick={() => setToValueNeutral(neutral +1)} text="neutral" />
      <Button handleClick={() => setToValueBad(bad +1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />

    </div>
  )
}

export default App