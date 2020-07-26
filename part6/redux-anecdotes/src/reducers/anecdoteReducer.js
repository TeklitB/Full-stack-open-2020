import anecdoteService from '../services/anecdotesServer'

export const createAnecodte = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNewAnecdote(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: {
        content: newAnecdote.content,
        id: newAnecdote.id,
        votes: newAnecdote.votes
      }
    })
  }
  // return {
  //   type: 'NEW_ANECDOTE',
  //   data: {
  //     content: data.content,
  //     id: data.id,
  //     votes: data.votes
  //   }
  // }
}

export const voteObject = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

const reducer = (state = [], action) => {

  switch (action.type) {
    case 'NEW_ANECDOTE': {
      //console.log('+++++', action)
      const newData = {
        typ: action.tye,
        //data: {
        content: action.data.content,
        id: action.data.id,
        votes: action.data.votes
        // }
      }
      //console.log('NEW: ', newData)
      //console.log(state.concat(newData))
      return state.concat(newData)
    }
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE': {
      const id = action.data.id
      //console.log('||', id, '||')
      const voteAnecdote = state.find(n => n.id === id)
      //console.log('===', voteAnecdote)
      const votedAne = {
        tye: 'NEW_ANECDOTE',
        //data: {
        content: voteAnecdote.content,
        id: voteAnecdote.id,
        votes: voteAnecdote.votes + 1
        //}
      }
      // console.log('***', votedAne.votes)
      // console.log('=====================')
      // console.log(state.map(ane =>
      //   ane.id !== id ? ane : votedAne
      // ))
      // console.log('=====================')
      return state.map(ane =>
        ane.id !== id ? ane : votedAne
      )
    }
    default:
      return state
  }

}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
  // return {
  //   type: 'INIT_ANECDOTES',
  //   data: anecdotes,
  // }
}

export default reducer