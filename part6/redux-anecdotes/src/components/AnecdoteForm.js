import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecodte } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {

    //const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    const createAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecd.value
        event.target.anecd.value = ''
        //console.log(content)
        //const newAnecdote = await anecdotesService.createNewAnecdote(content)
        dispatch(createAnecodte(content))
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={createAnecdote}>
                <div><input name='anecd' /></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm