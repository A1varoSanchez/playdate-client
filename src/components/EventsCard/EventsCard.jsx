import { Card, Col } from 'react-bootstrap'
import logo from './../../assets/playdate-logo.png'
import { Link } from 'react-router-dom'


const EventsCard = ({ event, refreshEvents }) => {

    return (
        !event ?
            <h1>Cargando...</h1>
            :
            <Col className='mb-5' lg={{ span: 3 }} md={{ span: 6 }}>
                <article className="h-100 d-flex flex-column">
                    <Card border="warning" style={{ width: '18rem' }} className="d-flex flex-column h-100">
                        <Card.Header>{event.type}</Card.Header>
                        <Card.Img variant="top" src={logo} />
                        <Card.Body className="d-flex flex-column">
                            <Card.Title>{event.name} </Card.Title>
<<<<<<< HEAD
                            <Card.Text>Edad recomendada: {event.ageGroup} años</Card.Text>
                            <Link to={`/eventos/${event._id}`} className="btn btn-warning btn-sm" >ver detalles</Link>
=======
                            <Card.Text>Edad recomendada de {event.ageGroup} años</Card.Text>
                            <Link to={`/eventos/${event._id}`} className="btn btn-warning btn-sm" refreshEvents={refreshEvents}>ver detalles</Link>
>>>>>>> d14675b6129b4d5b1c06acd9d8092725ca19dbd6
                        </Card.Body>
                    </Card >
                </article>
            </Col>
    )
}

export default EventsCard