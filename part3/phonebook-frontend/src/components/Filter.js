import React from 'react'

const Filter = ({ searchName, setSearchName }) => {

    const handleSearchName = (event) => {
        setSearchName(event.target.value)
    }
    return (
        <div>
            <form>
                <div>
                    Filter shown with: <input value={searchName} onChange={handleSearchName} />
                </div>
            </form>
        </div>
    )
}

export default Filter