import { useState } from 'react'
import eventServices from '../../services/event.services'
import './SearchBar.css'
import logo from './../../assets/playdate-logo.png'

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
                .searchByType(value)
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
            <input type="text" placeholder="Buscar..." value={searchValue} onChange={handleInputChange} />
            <img src={logo} alt="" className="small-image" />
        </div>

    )
}

export default SearchBar
