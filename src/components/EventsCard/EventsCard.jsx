import { Card, Col, Button } from 'react-bootstrap'
import logo from './../../assets/playdate-logo.png'
import { Link } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/auth.context.jsx'
import eventServices from '../../services/event.services.js'


const EventsCard = ({ event, refreshEvents }) => {
    console.log('----------------Event', event)
    console.log('----------------refresh', refreshEvents)

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


    if (event.type == "Deportes") {
        console.warn(event)
    }
    return (
        !event ?
            <h1>casfa</h1>
            :
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
                                    event.participants.find((participant) => participant._id === loggedUser._id)

                                        ?
                                        <span className='btn btn-primary' onClick={() => handleDeleteSubmit()}> Delete </span>
                                        :
                                        <span className='btn btn-primary' onClick={() => handleJoinSubmit()}> Join </span>
                                }
                            </Card.Body>
                        </Card >
                    </article>
                </Col>
            </>
    )
}

export default EventsCard