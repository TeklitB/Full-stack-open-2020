import React, { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import SinglePerson from './components/SinglePerson'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchName, setSearchName] = useState('')

    // const handleSearch = (event) => {
    //     console.log(event.target.value)
    //     setSearch(event.target.value)
    //     filterByName()
    // }


    return (
        <div>
            <h2>Phonebook</h2>
            <Filter searchName={searchName} setSearchName={setSearchName} />
            <SinglePerson searchName={searchName} persons={persons} />
            <h2>Add a new</h2>
            <PersonForm newName={newName} setNewName={setNewName}
                newNumber={newNumber} setNewNumber={setNewNumber}
                persons={persons} setPersons={setPersons}
            />
            <h2>Numbers</h2>
            {persons.map(person => <Persons key={person.name} person={person} />)}
        </div>
    )
}

export default App