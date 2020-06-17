import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import SinglePerson from './components/SinglePerson'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchName, setSearchName] = useState('')

    useEffect(() => {
        axios.get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data)
            })
    }, [])

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