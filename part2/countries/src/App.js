import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SearchForm from './components/SearchForm'
import FilterCountries from './components/FilterCountries'

const App = () => {
    const [countries, setCountries] = useState([])
    const [searchCountry, setSearchCountry] = useState('')

    useEffect(() => {
        axios.get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
            })
    }, [])

    return (
        <div>
            <SearchForm searchCountry={searchCountry} setSearchCountry={setSearchCountry} />
            <div>
                <FilterCountries searchCountry={searchCountry} countries={countries} />
            </div>
        </div>
    )
}

export default App