import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Weather from './Weather'

const CountryDetails = ({ result }) => {
    const accessKey = process.env.REACT_APP_API_KEY;
    const [weather, setWeather] = useState([])
    console.log(result.capital)

    useEffect(() => {
        axios.get(`http://api.weatherstack.com/current?access_key=${accessKey}&query=${result.capital}`)
            .then(response => {
                if (response.data.success !== false) {
                    setWeather(response.data.current)
                    //console.log(response.data.current)
                }
            })
    }, [])
    //console.log(weather)
    return (
        <div>
            <h1>{result.name}</h1>
            <p>Capital city: {result.capital}</p>
            <p>Populaation: {result.population}</p>
            <h2>Languages spoken:</h2>
            <ul>
                {result.languages.map(language => <li key={language.name}> {language.name} </li>)}
            </ul>
            <h2>Flag</h2>
            <img alt='Flag' src={result.flag} height="100px" />
            <div>
                <h2>Weather in {result.capital}</h2>
                <Weather weather={weather} />
            </div>
        </div>
    )
}

export default CountryDetails