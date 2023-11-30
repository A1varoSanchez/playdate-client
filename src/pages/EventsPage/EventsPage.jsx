import { useEffect, useState } from 'react'
import eventServices from '../../services/event.services'
import { Container } from 'react-bootstrap'


const EventsPage = () => {

    const [events, setEvents] = useState()

    useEffect(() => {
        loadEvents()
    }, [])

    const loadEvents = () => {
        eventServices
            .getEvents()
            .then(({ data }) => setEvents(data))

            .catch(err => console.log(err))
    }

    return (
        !events ?

            <h1>holaaaa</h1>
            :


            <Container>
                <h1>Eventos</h1>
                <hr />
                {
                    events.map((elm, i) => {
                        return (
                            <p key={i}>{elm.name}</p>
                        )
                    })
                }
            </Container>

    )
}


export default EventsPage