import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import SinglePerson from './components/SinglePerson'
import bookServices from './services/book'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchName, setSearchName] = useState('')

    useEffect(() => {
        bookServices
            .getAll()
            .then(initialNotes => {
                setPersons(initialNotes)
            })
    }, [])

    const addName = (event) => {
        event.preventDefault();

        const found = persons.find(person => person.name === newName)
        const foundPerson = persons.find(person => person.name === newName)

        if (found) {
            const id = foundPerson.id
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                const changeNumber = { ...foundPerson, number: newNumber }
                bookServices
                    .update(id, changeNumber)
                    .then(retNumber => {
                        setPersons(persons.map(person => person.name !== newName ? person : retNumber))
                        setNewName('')
                        setNewNumber('')
                    })
                    .catch(error => {
                        alert('Unable to update number.')
                    })
            }

        } else {
            const nameObject = {
                name: newName,
                number: newNumber
            }
            bookServices
                .create(nameObject)
                .then(returnedName => {
                    setPersons(persons.concat(returnedName))
                    setNewName('')
                    setNewNumber('')
                })
        }
    }
    const handleNewName = (event) => {
        //console.log(event.target.value)
        setNewName(event.target.value)
    }

    const handleNewNumber = (event) => {
        //console.log(event.target.value)
        setNewNumber(event.target.value)
    }

    const deleteContact = id => {
        const deletePerson = persons.find(n => n.id === id)

        if (window.confirm(`Delete '${deletePerson.name}'?`)) {
            bookServices
                .deleteP(id)
                .then(returnedPerson => {
                    setPersons(persons.filter(person => person.id !== id))
                    //console.log(returnedPerson)
                })
                .catch(error => {
                    alert(
                        ` '${deletePerson.name}' was already deleted`
                    )
                })
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter searchName={searchName} setSearchName={setSearchName} />
            <SinglePerson searchName={searchName} persons={persons} />
            <h2>Add a new</h2>
            <PersonForm newName={newName} handleNewName={handleNewName}
                newNumber={newNumber} handleNewNumber={handleNewNumber}
                addName={addName}
            />
            <h2>Numbers</h2>
            {persons.map(person => <Persons key={person.name} person={person}
                deleteContact={() => deleteContact(person.id)} />
            )}
        </div>
    )
}

export default App