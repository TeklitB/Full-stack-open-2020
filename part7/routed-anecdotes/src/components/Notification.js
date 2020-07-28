import React from 'react'

const Notification = ({ notification, setNewCreated }) => {
    if (!notification) {
        return (
            <div>

            </div>
        )
    } else {
        setNewCreated(false)
        return (
            <div className="success">
                {notification}
            </div>
        )
    }
}

export default Notification