import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => {
  return (
    <div>
      <button onClick={props.onClick}> {props.text} </button>
    </div>
  )
}

const Statistics = (props) => {

  if (props.value === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <h2>statistics</h2>
      <GoodStatistics text={props.statText} value={props.value} />
      <NeutralStatistics text={props.statText} value={props.value} />
      <BadStatistics text={props.statText} value={props.value} />
      <AllStatistics text={props.text} value={props.value} />
      <AverageStatistics text={props.text} value={props.value} />
      <PositiveStatistics text={props.text} value={props.value} />
    </div >
  )
}

const GoodStatistics = (props) => {
  return (
    <div>
      <p>{props.text} {props.good}</p>
    </div>
  )
}

const NeutralStatistics = (props) => {
  return (
    <div>
      <p>{props.text} {props.neutral}</p>
    </div>
  )
}

const BadStatistics = (props) => {
  return (
    <div>
      <p>{props.text} {props.bad}</p>
    </div>
  )
}

const AllStatistics = (props) => {
  return (
    <div>
      <p>{props.text} {props.feedbackSum}</p>
    </div>
  )
}

const AverageStatistics = (props) => {
  return (
    <div>
      <p>{props.text} {props.good / props.feedback}</p>
    </div>
  )
}

const PositiveStatistics = (props) => {
  return (
    <div>
      <p>{props.text} {(props.good / props.feedbackSum) * 100} %</p>
    </div>
  )
}
const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handlGood = () => {
    return setGood(good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }
  return (
    <div>
      <div>
        <h2>give feedback</h2>
        <Button onClick={handlGood} text="good" />
        <Button onClick={handleNeutral} text="neutral" />
        <Button onClick={handleBad} text="bad" />
      </div>
      <div>
        <Statistics statText="good" value={good} />
        <Statistics statText="neutral" value={neutral} />
        <Statistics statText="bad" value={bad} />
        <Statistics statText="all" totalfeed={good + neutral + bad} />
        <Statistics statText="average" averagefeed={(good + neutral * 0 + bad * -1) / (good + neutral + bad)} />
        <Statistics statText="positive" positivefeed={(good) / (good + neutral + bad)} />
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))