import { Card, Col } from 'react-bootstrap'
import logo from './../../assets/playdate-logo.png'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth.context.jsx'


const EventsCard = ({ event }) => {

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
                            <Card.Text>Edad recomendada de {event.ageGroup} años</Card.Text>
                            <Link to={`/eventos/${event._id}`} className="btn btn-warning btn-sm" >ver detalles</Link>
                        </Card.Body>
                    </Card >
                </article>
            </Col>
    )
}

export default EventsCard