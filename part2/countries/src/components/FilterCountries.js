import React, { useState } from 'react'
import CountryDetails from './CountryDetails'

const FilterCountries = ({ searchCountry, countries }) => {
    const [showDetails, setShowDetails] = useState(true)

    // const viewDetails=(result)=>{
    //     <div>
    //         <p><b>{result.name}</b></p>
    //         <p>Capital city: {result.capital}</p>
    //         <p>Populaation: {result.population}</p>
    //         <p><b>Languages spoken:</b></p>
    //         <ul>
    //             {result.languages.map(language => <li key={language.name}> {language.name} </li>)}
    //         </ul>
    //         <p><b>Flag</b></p>
    //         <img alt='Flag' src={result.flag} height="100px" />
    //     </div>
    // }
    const viewDetails = () => {
        setShowDetails(!showDetails)
    }
    const searchResult = countries.filter((country) =>
        country.name.toLowerCase().includes(searchCountry.toLowerCase())
    )

    if (searchCountry === '') {
        return (
            <div>

            </div>
        )
    } else if (searchResult.length > 10) {
        return (
            <div>
                <p>Too many matches, specify another filter.</p>
            </div>
        )
    }

    else if (searchResult.length <= 10 && searchResult.length > 1) {
        return (
            <div>
                <h2>Search Result</h2>
                {searchResult.map(result =>
                    <p key={result.name}>{result.name}<button onClick={viewDetails}>
                        {showDetails ? 'show' : <CountryDetails key={result.name} result={result} />}
                    </button>
                    </p>
                )}
            </div>
        )
    } else if (searchResult.length === 1) {
        return (
            <div>
                {searchResult.map(result =>
                    <CountryDetails key={result.name} result={result} />
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

export default FilterCountries