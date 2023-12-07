import { useState } from 'react'
import eventServices from '../../services/event.services'
import './SearchBar.css'
import lupa from './../../assets/lupa.svg'

const SearchBar = ({ refreshEvents, handleFilteredEvents }) => {

    const [searchValue, setSearchValue] = useState('')

    const handleInputChange = (event) => {
        const { value: searchQuery } = event.target
        setSearchValue(searchQuery)


        if (searchQuery.length === 0) {
            refreshEvents()
        } else {

            const sanitizedQuery = searchQuery.trim()

            eventServices
                .searchByType(sanitizedQuery)
                .then(response => {
                    response?.data ? handleFilteredEvents(response.data) : console.log('No hay eventos')
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <div className="search-bar" style={{ width: '250px' }}>
            <img src={lupa} alt="" style={{ height: '20px', paddingLeft: '10px' }} />
            <input type="text" value={searchValue} onChange={handleInputChange} />
        </div>
    )
}


export default SearchBar
