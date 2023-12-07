import React, { useState, useEffect } from 'react'
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps'
import { useParams } from 'react-router-dom'
import eventServices from '../../services/event.services'

const MapMarker = () => {

    const { event_id } = useParams()
    const [event, setEvent] = useState({})

    useEffect(() => {
        loadEventDetails()
    }, [])

    const loadEventDetails = () => {
        eventServices
            .getEventDetails(event_id)
            .then(({ data }) => setEvent(data))
            .catch(err => console.log(err))
    }

    const mapStyle = {
        height: '500px',
        width: '80%',
    }

    const mapContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '50px'
    }

    return (

        !event.location
            ?
            <h1>cargando...</h1>
            :
            <div style={mapContainerStyle}>
                <APIProvider apiKey={'AIzaSyB39i6Kh0SoXQxEFnpM81DFNfY6QWfvfE4'}>
                    <Map zoom={13} center={{ lat: event.location.coordinates[1], lng: event.location.coordinates[0] }} style={mapStyle}>
                        <Marker
                            key={event._id}
                            id={event._id}
                            position={{
                                lat: event.location.coordinates[1],
                                lng: event.location.coordinates[0],
                            }}
                        />
                    </Map>
                </APIProvider>
            </div>
    )
}


export default MapMarker