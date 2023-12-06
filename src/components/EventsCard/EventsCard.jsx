import { Card, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import museo from './../../assets/museo.jpg'
import cocina from './../../assets/cocina.jpg'
import musica from './../../assets/musica.jpg'
import teatro from './../../assets/teatro.jpg'
import natacion from './../../assets/natacion.jpg'
import futbol from './../../assets/futbol.jpg'
import parque from './../../assets/parque.jpg'
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
                        {event.type === 'Deportes' ? <Card.Img variant="top" src={futbol} /> : ''}
                        {event.type === 'Música' ? <Card.Img variant="top" src={musica} /> : ''}
                        {event.type === 'Aire libre' ? <Card.Img variant="top" src={parque} /> : ''}
                        {event.type === 'Cumpleaños' ? <Card.Img variant="top" src={teatro} /> : ''}
                        {event.type === 'Talleres' ? <Card.Img variant="top" src={cocina} /> : ''}
                        {event.type === 'Otros' ? <Card.Img variant="top" src={natacion} /> : ''}
                        <Card.Body className="d-flex flex-column">
                            <Card.Title>{event.name} </Card.Title>
                            <Card.Text>Edad recomendada: {event.ageGroup}</Card.Text>
                        </Card.Body>
                        <Link to={`/eventos/${event._id}`} className="button-" >ver detalles</Link>
                    </Card >
                </article>
            </Col>
    )
}

export default EventsCard