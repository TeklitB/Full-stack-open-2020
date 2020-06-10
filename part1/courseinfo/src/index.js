import React, { useState } from 'react';
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
      <Part1 part1={props.course.parts[0].name} exercises1={props.course.parts[0].exercises} />
      <Part2 part2={props.course.parts[1].name} exercises2={props.course.parts[1].exercises} />
      <Part3 part3={props.course.parts[2].name} exercises3={props.course.parts[2].exercises} />
    </div>
  )
}

const Part1 = (props) => {
  return (
    <div>
      <p> {props.part1} {props.exercises1} </p>
    </div>
  )
}

const Part2 = (props) => {
  return (
    <div>
      <p> {props.part2} {props.exercises2} </p>
    </div>
  )
}

const Part3 = (props) => {
  return (
    <div>
      <p> {props.part3} {props.exercises3} </p>
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

const Statistics = (props) => {
  let feedbackSum = props.good + props.neutral + props.bad;
  let feedback = props.good + props.neutral * 0 + props.bad * -1;
  return (
    <div>
      <h2>statistics</h2>
      <p>all {feedbackSum}</p>
      <p>average {feedback / feedbackSum}</p>
      <p>positive {props.good / feedbackSum}</p>
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
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
      <div>
        <h2>give feedback</h2>
        <button onClick={() => setGood(good + 1)}> good </button>
        <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
        <button onClick={() => setBad(bad + 1)}>bad</button>
      </div>
      <div>
        <h2>statistics</h2>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))