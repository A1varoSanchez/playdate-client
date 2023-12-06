import { useState } from 'react'
import eventServices from '../../services/event.services'
import './SearchBar.css'
import lupa from './../../assets/lupa.svg'

const SearchBar = ({ refreshEvents, handleFilteredEvents }) => {
    const [searchValue, setSearchValue] = useState('')

    const handleInputChange = (event) => {
        const { value } = event.target
        setSearchValue(value)

        const searchQuery = value

        if (searchQuery.trim() === '') {
            refreshEvents()
        } else {
            eventServices
                .searchByType(searchQuery)
                .then(response => {
                    if (response && response.data) {
                        handleFilteredEvents(response.data)
                    } else {
                        console.log('No hay eventos')
                    }
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <div className="search-bar">
            <img src={lupa} alt="" style={{ with: '20px', height: '20px', paddingLeft: '10px' }} />
            <input type="text" placeholder="Busca tu tematica...ej: Parques" value={searchValue} onChange={handleInputChange} />
        </div>

    )
}

export default SearchBar
