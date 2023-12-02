import { Row } from 'react-bootstrap'
import EventsCard from '../EventsCard/EventsCard.jsx'
import SearchBar from '../SearchBar/SearchBar.jsx'

const EventsList = ({ events, refreshEvents, handleFilteredEvents }) => {

    return (

        !events
            ?
            <h1>Cargando...</h1>
            :
            <>
                <Row>
                    {
                        events.map(elm => <EventsCard key={elm._id} event={elm} refreshEvents={refreshEvents} handleFilteredEvents={handleFilteredEvents} />)
                    }
                </Row>
            </>
    )
}

export default EventsList