import React from 'react'

const CountryDetails = ({ result }) => {
    return (
        <div>
            <p><b>{result.name}</b></p>
            <p>Capital city: {result.capital}</p>
            <p>Populaation: {result.population}</p>
            <p><b>Languages spoken:</b></p>
            <ul>
                {result.languages.map(language => <li key={language.name}> {language.name} </li>)}
            </ul>
            <p><b>Flag</b></p>
            <img alt='Flag' src={result.flag} height="100px" />
        </div>
    )
}

export default CountryDetails