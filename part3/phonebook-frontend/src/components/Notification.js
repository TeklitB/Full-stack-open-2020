import React from 'react'

const Notification = ({ successMessage, message }) => {
    if (!message && !successMessage) {
        return null
    } else if (successMessage) {
        return (
            <div className="success">
                {successMessage}
            </div>
        )
    } else if (message) {
        return (
            <div className="error">
                {message}
            </div>
        )
    }
}

export default Notification