import { createStore, combineReducers, applyMiddleware } from 'redux'
import anecdoteReducer from '../reducers/anecdoteReducer'
import reducerNotif from '../reducers/reducerNotification'
import filtReducer from '../reducers/filterReducer'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notification: reducerNotif,
    filter: filtReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store