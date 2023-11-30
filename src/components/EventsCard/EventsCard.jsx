import { Card, Col } from 'react-bootstrap'
import logo from './../../assets/playdate-logo.png'
import { Link } from 'react-router-dom'

const EventsCard = ({ _id, name, type, ageGroup }) => {

    return (
        
        <>
            <Col lg={{ span: 3 }} md={{ span: 6 }}>
                <article>
                    <Card border="warning" style={{ width: '18rem' }}>
                        <Card.Header>{name}</Card.Header>
                        <Card.Img variant="top" src={logo} />
                        <Card.Body>
                            <Card.Title>Tipo de Evento: {type}</Card.Title>
                            <Card.Text>Edad recomendada de {ageGroup} años</Card.Text>
                            <Link to={`/eventos/${_id}`} className="btn btn-warning btn-sm">ver detalles</Link>
                        </Card.Body>
                    </Card >
                </article>
            </Col>
        </>
    )
}

export default EventsCard