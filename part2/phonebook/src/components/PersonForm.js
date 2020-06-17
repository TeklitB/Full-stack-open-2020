import React from 'react'

const PersonForm = ({ newName, setNewName, newNumber, setNewNumber, persons, setPersons }) => {

    const addName = (event) => {
        event.preventDefault();

        const found = persons.find(person => person.name === newName)

        if (found) {
            window.alert(`${newName} is already added to phonebook`)
            setNewName('')
            setNewNumber('')
        } else {
            const nameObject = {
                name: newName,
                number: newNumber
            }
            setPersons(persons.concat(nameObject))
            setNewName('')
            setNewNumber('')
        }
    }
    const handleNewName = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    const handleNewNumber = (event) => {
        console.log(event.target.value)
        setNewNumber(event.target.value)
    }

    return (
        <div>
            <form onSubmit={addName}>
                <div>
                    Name: <input value={newName} onChange={handleNewName} />
                </div>
                <div>
                    Number: <input value={newNumber} onChange={handleNewNumber} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default PersonForm