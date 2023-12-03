import { useEffect, useState } from 'react'
import eventServices from '../../services/event.services'
import { Row } from 'react-bootstrap'
import EventsCard from '../EventsCard/EventsCard'

const ProfileEventsList = () => {

    const [events, setEvents] = useState()

    useEffect(() => {
        loadEvents()
    }, [])

    const loadEvents = () => {
        eventServices
            .getMyEvents()
            .then(({ data }) => {
                setEvents(data)
            })
            .catch(err => console.log(err))
    }

    return (

        !events
            ?
            <h1>Cargando...</h1>
            :
            <Row>
                {
                    events.map(event => <EventsCard event={event} key={event.name} />)
                }
            </Row>
    )
}

export default ProfileEventsList