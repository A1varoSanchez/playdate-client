import { Card, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import museo from './../../assets/dinosaurio.jpg'
import deporte from './../../assets/nadar.jpg'
import musica from './../../assets/concierto.jpg'
import parque from './../../assets/aire-libre.jpg'
import cumple from './../../assets/cumple.jpg'
import taller from './../../assets/talleres.jpg'
import otros from './../../assets/deporte.jpg'
import './EventsCard.css'

const EventsCard = ({ event }) => {

    return (
        !event ?
            <h1>Cargando...</h1>
            :
            <Col className='mb-5' lg={{ span: 3 }} md={{ span: 6 }}>
                <article className="h-100 d-flex flex-column">
                    <Card border="warning" className="d-flex flex-column h-100">
                        <Card.Header className='text-center'>{event.type}</Card.Header>
                        {event.type === 'Cultura' ? <Card.Img variant="top" src={museo} /> : ''}
                        {event.type === 'Deportes' ? <Card.Img variant="top" src={deporte} /> : ''}
                        {event.type === 'Música' ? <Card.Img variant="top" src={musica} /> : ''}
                        {event.type === 'Aire libre' ? <Card.Img variant="top" src={parque} /> : ''}
                        {event.type === 'Cumpleaños' ? <Card.Img variant="top" src={cumple} /> : ''}
                        {event.type === 'Talleres' ? <Card.Img variant="top" src={taller} /> : ''}
                        {event.type === 'Otros' ? <Card.Img variant="top" src={otros} /> : ''}
                        <Card.Body className="d-flex flex-column">
                            <Card.Title>{event.name} </Card.Title>
                            <Card.Text>Edad recomendada: {event.ageGroup}</Card.Text>
                        </Card.Body>
                        <Link to={`/eventos/${event._id}`} className="button text-center" >ver detalles</Link>
                    </Card >
                </article>
            </Col>
    )
}

export default EventsCard