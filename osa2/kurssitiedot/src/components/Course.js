const Header = (props) =>{
    return(
      <>
        <h1>{props.course}</h1>
      </>
    )
    }
    
    const Content = (props) =>{
    return(
      <div>
        {props.parts.map(part =>
          
            <Part key={part.id} part={part}/>
          
          )}
      </div>
    )
    }
    
    const Total = (props) =>{
      let count = props.parts.reduce((s,p) => s + p.exercises, 0)
      return(
        <>
          <h4>Number of exercises {count}</h4>
        </>
      )
    }
    
    const Part = ({part}) =>{
      return(
        <p>
          {part.name}, {part.exercises}
        </p>
      )
    }
    
    const Course = (props) =>{
      return(
        <>
          <Header course={props.course.name}/>
          <Content parts={props.course.parts}/>
          <Total parts={props.course.parts}/>
        </>
      )
    }

    export default Course