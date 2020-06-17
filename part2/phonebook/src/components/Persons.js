import React from 'react'

const Persons = ({ person }) => {
    return (
        <p>{person.name} {person.number}</p>
    )
}

export default Persons