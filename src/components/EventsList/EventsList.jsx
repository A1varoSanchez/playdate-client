import { Row } from 'react-bootstrap'
import EventsCard from '../EventsCard/EventsCard.jsx'

const EventsList = ({ events, refreshEvents }) => {

    return (

        !events
            ?
            <h1>Cargando...</h1>
            :
            <>

                <Row>
                    {
                        events.map(elm => <EventsCard key={elm._id} event={elm} refreshEvents={refreshEvents} />)
                    }
                </Row>

            </>
    )
}

export default EventsList