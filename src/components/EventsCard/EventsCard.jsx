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
import { AuthContext } from '../../contexts/auth.context'
import { useContext } from 'react'

const EventsCard = ({ type, name, ageGroup, _id }) => {

    const { loggedUser, } = useContext(AuthContext)


    return (
        <Col className='mb-5' lg={{ span: 3 }} md={{ span: 6 }}>
            <article className="h-100 d-flex flex-column">
                <Card border="warning" className="d-flex flex-column h-100">
                    <Card.Header className='text-center'>{type}</Card.Header>
                    {type === 'Cultura' ? <Card.Img variant="top" src={museo} /> : ''}
                    {type === 'Deportes' ? <Card.Img variant="top" src={deporte} /> : ''}
                    {type === 'Música' ? <Card.Img variant="top" src={musica} /> : ''}
                    {type === 'Aire libre' ? <Card.Img variant="top" src={parque} /> : ''}
                    {type === 'Cumpleaños' ? <Card.Img variant="top" src={cumple} /> : ''}
                    {type === 'Talleres' ? <Card.Img variant="top" src={taller} /> : ''}
                    {type === 'Otros' ? <Card.Img variant="top" src={otros} /> : ''}
                    <Card.Body className="d-flex flex-column">
                        <Card.Title>{name} </Card.Title>
                        <Card.Text>Edad recomendada: {ageGroup}</Card.Text>
                    </Card.Body>
                    {
                        loggedUser ?
                            <Link to={`/eventos/${_id}`} className="button text-center" >ver detalles</Link>
                            :
                            <Link to={'/registro'} className="button text-center" >ver detalles</Link>
                    }
                </Card >
            </article>
        </Col>
    )
}


export default EventsCard