import React from 'react'
import { filterSearch } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'


const Filter = () => {
    const dispatch = useDispatch()

    const handleFilter = (event) => {
        dispatch(filterSearch(event.target.value))
    }

    return (
        <div>
            Filter <input onChange={handleFilter} />
        </div>
    )
}

export default Filter