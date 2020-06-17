import React from 'react'

const LanguagesSpoken = ({ language }) => {
    return (
        <li>{language.name}</li>
    )
}
const CountryDetails = ({ result }) => {
    return (
        <div>
            <p><b>{result.name}</b></p>
            <p>Capital city: {result.capital}</p>
            <p>Populaation: {result.population}</p>
            <p><b>Languages spoken:</b></p>
            <ul>
                {result.languages.map(language => <LanguagesSpoken key={language.name} language={language} />)}
            </ul>
            <p><b>Flag</b></p>
            <img alt='Flag' src={result.flag} height="100px" />
        </div>
    )
}

export default CountryDetails