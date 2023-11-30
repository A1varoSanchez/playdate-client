import { Card, Col, Button } from 'react-bootstrap'
import logo from './../../assets/playdate-logo.png'
import { Link } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/auth.context.jsx'
import eventServices from '../../services/event.services.js'


const EventsCard = ({ event, refreshEvents }) => {


    const { loggedUser } = useContext(AuthContext)


    const [joinEvent, setJoinEvent] = useState({
        participants: [],


    })

    const [deleteEvent, setDeleteEvent] = useState({
        participants: [],


    })

    const handleJoinSubmit = () => {
        eventServices
            .joinEvent(event._id)
            .then(({ data }) => {
                setJoinEvent(data)
                refreshEvents()
            })
            .catch(err => console.log(err))
    }

    const handleDeleteSubmit = () => {
        eventServices
            .deletedJoin(event._id)
            .then(({ data }) => {
                setDeleteEvent(data)
                refreshEvents()
            })
            .catch(err => console.log(err))
    }


    return (

        <>
            <Col lg={{ span: 3 }} md={{ span: 6 }}>
                <article>
                    <Card border="warning" style={{ width: '18rem' }}>
                        <Card.Header>{event.name}</Card.Header>
                        <Card.Img variant="top" src={logo} />
                        <Card.Body>
                            <Card.Title>Tipo de Evento: {event.type}</Card.Title>
                            <Card.Text>Edad recomendada de {event.ageGroup} años</Card.Text>
                            <Link to={`/eventos/${event._id}`} className="btn btn-warning btn-sm">ver detalles</Link>
                            {/* <h1>{event.participants[0]?.username}</h1> */}
                            {
                                event.participants.map((elm, i) => {
                                    return (
                                        <div key={i}>
                                            <p >{elm.username}</p>
                                        </div>
                                    )
                                })
                            }


                            {
                                event.participants.includes(loggedUser._id)
                                    ?
                                    <Button onClick={() => handleDeleteSubmit(event._id)}> Delete </Button>
                                    :
                                    <Button onClick={() => handleJoinSubmit(event._id)}> Join </Button>
                            }
                        </Card.Body>
                    </Card >
                </article>
            </Col>
        </>
    )
}

export default EventsCard