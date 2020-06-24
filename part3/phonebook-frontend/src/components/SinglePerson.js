import React from 'react'

const SinglePerson = ({ searchName, persons }) => {

    const searchResult = persons.filter(person =>
        person.name.toLowerCase().startsWith(searchName.toLowerCase())
    )
    if (searchName === '') {
        return (
            <div>

            </div>
        )
    }
    else if (searchResult.length > 0) {
        return (
            <div>
                <h2>Search Result</h2>
                {searchResult.map(result =>
                    <p key={result.name}>{result.name} {result.number}</p>
                )}
            </div>
        )
    } else {
        return (
            <div>
                <h2>Search Result</h2>
                <p>No result is found.</p>
            </div>
        )
    }

}

export default SinglePerson