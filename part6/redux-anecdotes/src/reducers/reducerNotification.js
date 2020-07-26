const initialState = ""

const notifReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NOTIFICATION':
            return action.data.notifMessage
        case 'CLEAR':
            return initialState
        default:
            return state
    }
}

export const setNotification = (notifMessage, time) => {
    return async dispatch => {
        dispatch({
            type: 'NOTIFICATION',
            data: { notifMessage }
        })
        setTimeout(() => {
            dispatch({
                type: 'CLEAR'
            })
        }, time * 1000)
    }
}

export default notifReducer