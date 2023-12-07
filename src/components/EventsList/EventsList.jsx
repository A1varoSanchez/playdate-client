import { Row } from 'react-bootstrap'
import EventsCard from '../EventsCard/EventsCard.jsx'

const EventsList = ({ events }) => {

    return (

        !events
            ?
            <h1>Cargando...</h1>
            :
            <>
                <Row>
                    {
                        events.map(elm => <EventsCard key={elm._id} {...elm} />)
                    }
                </Row>
            </>
    )
}


export default EventsList