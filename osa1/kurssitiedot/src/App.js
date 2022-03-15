const Header = (props) =>{
return(
  <>
    <h1>{props.course}</h1>
  </>
)
}

const Content = (props) =>{
return(
  <>
  <Part1 part={props.parts[0].name} exe={props.parts[0].exercises}/>
  <Part2 part={props.parts[1].name} exe={props.parts[1].exercises}/>
  <Part3 part={props.parts[2].name} exe={props.parts[2].exercises}/>
  </>
)
}

const Total = (props) =>{
  return(
    <>
      <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    </>
  )
}

const Part1 = (props) =>{
  return(
    <p>
      {props.part}, {props.exe}
    </p>
  )
}
const Part2 = (props) =>{
  return(
    <p>
      {props.part}, {props.exe}
    </p>
  )
}
const Part3 = (props) =>{
  return(
    <p>
      {props.part}, {props.exe}
    </p>
  )
}

const App = () => {
  const course = {
  name: 'Half Stack application development',
  parts: [
  {
    name: 'Fundamentals of React',
    exercises: 10
  },
  {
    name: 'Using props to pass data',
    exercises: 7
  },
  {
    name: 'State of a component',
    exercises: 14
  }
]
  }

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App;
