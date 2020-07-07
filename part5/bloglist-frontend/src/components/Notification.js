import React from 'react'

const Notification = ({ errMessage, notifMessage }) => {
    if (notifMessage) {
        return (
            <div className="notify">
                {notifMessage}
            </div>
        )
    } else if (errMessage) {
        return (
            <div className="error">
                {errMessage}
            </div>
        )
    } else {
        return null
    }

}

export default Notification