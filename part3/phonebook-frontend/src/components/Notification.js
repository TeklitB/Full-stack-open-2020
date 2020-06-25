import React from 'react'

const Notification = ({ successMessage, errorMessage }) => {
    if (!errorMessage && !successMessage) {
        return (
            <div>

            </div>
        )
    } else if (successMessage) {
        return (
            <div className="success">
                {successMessage}
            </div>
        )
    } else if (errorMessage) {
        return (
            <div className="error">
                {errorMessage}
            </div>
        )
    }
}

export default Notification