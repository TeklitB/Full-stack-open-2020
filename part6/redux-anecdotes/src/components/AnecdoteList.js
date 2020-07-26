import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteObject } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/reducerNotification'

const Anecdotes = () => {

    const anecdotes = useSelector(({ filter, anecdotes }) => {
        return anecdotes.filter(anna => anna.content.toLowerCase().includes(filter.toLowerCase()))
    })
    //const anecdotes = useSelector(state => state)
    // console.log('------------------')
    // console.log(anecdotes)
    // console.log('++++++++++++++++++++++')
    //const anecdotes = anna.sort((a, b) => a.data.votes - b.data.votes)
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(voteObject(id))
    }

    const setNotif = (notifMessage) => {
        dispatch(setNotification(notifMessage, 5))
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            {
                anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.id}
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => {
                                vote(anecdote.id)
                                setNotif(`You voted '${anecdote.content}'`)
                            }
                            }>vote</button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Anecdotes