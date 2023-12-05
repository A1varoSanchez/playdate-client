// import { useMapsLibrary } from "@vis.gl/react-google-maps";
// import { useState } from "react";
// import { useEffect } from "react";



// const MapPlace = () => {
//     const placesLibrary = useMapsLibrary('places')
//     const [placesService, setPlacesService] = useState(null)

//     useEffect(() => {
//         if (!placesLibrary) return

//         setPlacesService(new placesLibrary.PlacesService())
//     }, [placesLibrary]);

//     useEffect(() => {
//         if (!placesService) return;

//     }, [placesService])

//     return <></>
// }

import { useMapsLibrary } from '@vis.gl/react-google-maps';
import React, { useState, useEffect } from 'react';


const MapPlace = () => {
    const placesLibrary = useMapsLibrary('places')
    const [placesService, setPlacesService] = useState(null)
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])

    useEffect(() => {
        console.log("Biblioteca de lugares:", placesLibrary)
        if (!placesLibrary) return
        setPlacesService(new placesLibrary.PlacesService())
        console.log("Places Service:", service)
    }, [placesLibrary]);

    const handleSearch = () => {
        console.log("Botón de búsqueda clickeado")
        if (!placesService) return

        const request = {
            query: query,
        };

        placesService.textSearch(request, (results, status) => {
            if (status === placesLibrary.places.PlacesServiceStatus.OK) {
                setResults(results);
            } else {
                console.error(`Error al buscar lugares: ${status}`);
            }
        });
    };

    return (
        <>
            <div>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button onClick={handleSearch}>Buscar</button>
            </div>
            <ul>
                {results.map((place) => (
                    <li key={place.place_id}>{place.name}</li>
                ))}
            </ul>
        </>
    );
}

export default MapPlace