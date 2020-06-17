import React from 'react'

const SearchForm = ({ searchCountry, setSearchCountry }) => {

    const handleSearchCountry = (event) => {
        setSearchCountry(event.target.value)
    }
    return (
        <div>
            <form>
                <div>
                    Find countries: <input value={searchCountry} onChange={handleSearchCountry} />
                </div>
            </form>
        </div>
    )
}

export default SearchForm