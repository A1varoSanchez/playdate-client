import { useContext, useEffect, useState } from "react"
import eventServices from "../../services/event.services"
import { Link, useParams } from "react-router-dom"
import { Col, Container, Row, Button, Modal } from "react-bootstrap"
import logo from './../../assets/playdate-logo.png'
import { AuthContext } from "../../contexts/auth.context"
import EditEventForm from "../../components/EditEventForm/EditEventForm"

const EventDetailsPage = () => {

    const { event_id } = useParams()
    const { loggedUser } = useContext(AuthContext)

    const [event, setEvent] = useState({})

    useEffect(() => {
        loadEventDetails()
    }, [])

    const loadEventDetails = () => {
        eventServices
            .getEventDetails(event_id)
            .then(({ data }) => setEvent(data))
            .catch(err => console.log(err))
    }

    const [joinEvent, setJoinEvent] = useState({
        participants: [],
    })

    const [deleteEvent, setDeleteEvent] = useState({
        participants: [],
    })

    const [showModal, setShowModal] = useState(false)

    const handleJoinSubmit = () => {
        eventServices
            .joinEvent(event._id)
            .then(({ data }) => {
                setJoinEvent(data)
                loadEventDetails()
            })
            .catch(err => console.log(err))
    }

    const handleDeleteSubmit = () => {
        eventServices
            .deletedJoin(event._id)
            .then(({ data }) => {
                setDeleteEvent(data)
                loadEventDetails()
            })
            .catch(err => console.log(err))
    }

    return (

        !event
            ?
            <h1>Cargando...</h1>
            :
            <Container>

                <h1 className="mb-4">Detalles de {event.name}</h1>
                <hr />
                <Row>
                    <Col md={{ span: 6, offset: 1 }}>
                        <h3 ><strong>Organizadores: </strong> {event.organizer?.username}</h3>
                        <h4><strong>Tipo de evento: </strong> {event.type}</h4>
                        <h4><strong>Edad recomendada: </strong> {event.ageGroup} años</h4>
                        <h4><strong>Plan: </strong> {event.description}</h4>
                        <Button variant='warning' onClick={() => setShowModal(true)}> Editar Tu Propio Evento</Button>
                        <Modal show={showModal} onHide={() => setShowModal(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Editar Evento</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <EditEventForm event={event} setShowModal={setShowModal} refreshEvents={loadEventDetails} />
                            </Modal.Body>
                        </Modal>
                        {
                            event.participants?.find((participant) => participant._id === loggedUser._id)

                                ?
                                <span className='btn btn-primary' onClick={() => handleDeleteSubmit()}> Abandonar evento </span>
                                :
                                <span className='btn btn-primary' onClick={() => handleJoinSubmit()}> Apuntarme al evento </span>
                        }
                        <hr />
                        <Link to="/eventos" className="btn btn-dark">Volver a los eventos</Link>
                    </Col>
                    <Col md={{ span: 4 }}>
                        <img src={logo} style={{ width: '100%' }} />
                        <div className="particpants mt-5">
                            <h2>Participantes:</h2>
                            {
                                event.participants?.map((elm, i) => {
                                    return (
                                        <div key={i}>
                                            <p >{elm.username}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </Col>
                </Row>
            </Container >
    )
}


export default EventDetailsPage