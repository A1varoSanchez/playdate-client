import { useState, useEffect } from 'react'
import { APIProvider, Map, Marker, useMarkerRef } from '@vis.gl/react-google-maps'
import { useNavigate } from 'react-router-dom'
import eventServices from '../../services/event.services'

const MapMarker = () => {
    const [events, setEvents] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        loadEvents()
    }, [])

    const handleMarkerClick = (eventId) => {
        navigate(`/eventos/${eventId}`)
    }

    const mapStyle = {
        height: '500px',
        width: '80%',
    }
    const mapContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    const loadEvents = () => {
        eventServices
            .getEvents()
            .then(({ data }) => {
                console.log('Eventos cargados:', data)
                setEvents(data)
            })
            .catch(err => console.log(err))
    }

    return (
        <div style={mapContainerStyle}>
            <APIProvider apiKey={'AIzaSyB39i6Kh0SoXQxEFnpM81DFNfY6QWfvfE4'}>
                <Map zoom={12} center={{ lat: 40.4169177926384, lng: -3.7036169094295338 }} style={mapStyle}>
                    {events.map((event) => (
                        <Marker
                            key={event._id}
                            id={event._id}
                            position={{
                                lat: event.location.coordinates[1],
                                lng: event.location.coordinates[0],
                            }}

                            onClick={() => handleMarkerClick(event._id)}
                        />
                    ))}
                </Map>
            </APIProvider>
        </div>
    )
}

export default MapMarker

//AIzaSyB39i6Kh0SoXQxEFnpM81DFNfY6QWfvfE4

