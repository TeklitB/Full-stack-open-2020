import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const trackVotes = () => {
    const allVotes = [...votes]
    allVotes[selected]++
    setVotes(allVotes)
  }

  const randomAnecodets = () => {
    setSelected(Math.floor(Math.random() * 6))
    //trackVotes()
  }

  const highestVote = () =>
    votes.indexOf(Math.max(...votes))

  return (
    <div>
      {props.anecdotes[selected]}
      <p>has {votes[selected]} votes</p>
      <div>
        <button onClick={trackVotes}>vote</button>
        <button onClick={randomAnecodets}>next anecdote</button>
        <h1>Anecdote with most votes</h1>
        <p>{props.anecdotes[highestVote()]}</p>
        <p>has {votes[highestVote()]} votes</p>
      </div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)