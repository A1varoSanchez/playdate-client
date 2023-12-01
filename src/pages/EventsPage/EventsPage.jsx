import { useEffect, useState } from 'react'
import eventServices from '../../services/event.services'
import { Container } from 'react-bootstrap'
import EventsList from '../../components/EventsList/EventsList.jsx'



const EventsPage = () => {

    const [events, setEvents] = useState()


    useEffect(() => {
        console.log(events)
        loadEvents()
    }, [])

    const loadEvents = () => {
        eventServices
            .getEvents()
            .then(({ data }) => {
                setEvents(data)
            })
            .catch(err => console.log(err))
    }

    const handleFilteredEvents = (filteredEvents) => {
        setEvents(filteredEvents)
    }

    return (
        <div>
            <Container>
                <h1>Eventos</h1>
                <hr />
                <EventsList events={events} refreshEvents={loadEvents} handleFilteredEvents={handleFilteredEvents} />
            </Container>
        </div>
    )
}


export default EventsPage