import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part1 part1={props.course.parts[0]} />
      <Part2 part2={props.course.parts[1]} />
      <Part3 part3={props.course.parts[2]} />
    </div>
  )
}

const Part1 = (props) => {
  return (
    <div>
      <p> {props.part1.name} {props.part1.exercises} </p>
    </div>
  )
}

const Part2 = (props) => {
  return (
    <div>
      <p> {props.part2.name} {props.part2.exercises} </p>
    </div>
  )
}

const Part3 = (props) => {
  return (
    <div>
      <p> {props.part3.name} {props.part3.exercises} </p>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}</p>
    </div>
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
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))