import { useContext, useEffect, useState } from "react"
import eventServices from "../../services/event.services"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Col, Container, Row, Button, Modal, Offcanvas, Form, Toast } from "react-bootstrap"
import logo from './../../assets/playdate-logo.png'
import { AuthContext } from "../../contexts/auth.context"
import EditEventForm from "../../components/EditEventForm/EditEventForm"
import MapMarkerDetails from './../../components/MapMarkerDetails/MapMarkerDetails.jsx'
import museo from './../../assets/dinosaurio.jpg'
import deporte from './../../assets/nadar.jpg'
import musica from './../../assets/concierto.jpg'
import parque from './../../assets/aire-libre.jpg'
import cumple from './../../assets/cumple.jpg'
import taller from './../../assets/talleres.jpg'
import otros from './../../assets/deporte.jpg'


const EventDetailsPage = () => {

    const { event_id } = useParams()
    const { loggedUser, isAdmin } = useContext(AuthContext)
    const [event, setEvent] = useState({})
    const [joinEvent, setJoinEvent] = useState({
        participants: [],
    })
    const [eventInfo, setEventInfo] = useState({
        messages: {
            text: ''
        }
    })
    const [deleteEvent, setDeleteEvent] = useState({
        participants: [],
    })
    const [showModal, setShowModal] = useState(false)
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const navigate = useNavigate()

    useEffect(() => {
        loadEventDetails()
    }, [])

    const loadEventDetails = () => {

        eventServices
            .getEventDetails(event_id)
            .then(({ data }) => {
                setEvent(data)

            })
            .catch(err => console.log(err))
    }

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

    const handleDeleteEventSubmit = () => {
        eventServices
            .deleteEvent(event_id)
            .then(() => {
                loadEventDetails()
                navigate('/eventos')
            })
            .catch(err => console.log(err))
    }

    const handleInputChange = e => {
        const { value: text, name } = e.currentTarget
        setEventInfo(prevState => ({
            ...prevState,
            messages: { text }
        }))
    }

    const handleEventSubmit = (e, eventId) => {
        e.preventDefault()
        const dataToSend = {
            ...eventInfo.messages,
        }

        eventServices
            .sendComments(eventId, dataToSend)
            .then(({ data }) => {
                setEventInfo({
                    ...eventInfo,
                    messages: {
                        ...eventInfo.messages,
                        text: '',
                    },
                })
                loadEventDetails()
            })
            .catch(err => console.log(err))
    }

    return (
        !event
            ?
            <h1>Cargando...</h1>
            :
            <Container >
                <h1 className="mb-4">Detalles de {event.name}</h1>
                <Button variant="primary" onClick={() => {
                    handleShow()
                    loadEventDetails()
                }} >
                    Comentarios del Evento
                </Button>

                <Offcanvas show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Comentarios</Offcanvas.Title>
                    </Offcanvas.Header>

                    <Offcanvas.Body>
                        {event.messages?.slice().reverse().map((elm, i) => (
                            <Toast key={i} className="custom-toast">
                                <Toast.Header>
                                    <strong className="me-auto">{elm.sender.username}</strong>
                                </Toast.Header>
                                <Toast.Body>{elm.text}</Toast.Body>
                            </Toast>
                        ))}
                    </Offcanvas.Body>

                    <Form onSubmit={(e) => handleEventSubmit(e, event._id)}>
                        <Form.Group className="mb-3" controlId="text">
                            <p>{event?._id}</p>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="text"
                                value={eventInfo.messages.text}
                                onChange={handleInputChange}
                            />
                            <Button type="submit">Enviar</Button>
                        </Form.Group>
                    </Form>
                </Offcanvas>
                <hr />
                <Row >
                    <Col md={{ span: 6, offset: 1 }}>
                        <h3 ><strong>Organizadores: </strong> {event.organizer?.username}</h3>
                        <h4><strong>Tipo de evento: </strong> {event.type}</h4>
                        <h4><strong>Edad recomendada: </strong> {event.ageGroup} años</h4>
                        <h4><strong>Plan: </strong> {event.description}</h4>
                        <br />

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
                                <span className='btn btn-primary mb-3' onClick={() => handleDeleteSubmit()}> Abandonar evento </span>
                                :
                                <span className='btn btn-primary mb-3' onClick={() => handleJoinSubmit()}> Apuntarme al evento </span>
                        }
                        {
                            (loggedUser._id === event.organizer?._id)
                                ?
                                <div>
                                    <Button variant='warning mb-3' onClick={() => setShowModal(true)}> Editar Tu Propio Evento</Button>
                                    <br />
                                    <Button className='btn btn-primary' onClick={() => handleDeleteEventSubmit()}> Borrar evento </Button>
                                </div>
                                :
                                <br />
                        }
                        <hr />
                        <Link to="/eventos" className="btn btn-dark">Volver a los eventos</Link>
                    </Col>

                    <Col md={{ span: 4 }}>
                        {event.type === 'Cultura' ? <img src={museo} style={{ width: '100%' }} /> : ''}
                        {event.type === 'Deportes' ? <img src={deporte} style={{ width: '100%' }} /> : ''}
                        {event.type === 'Música' ? <img src={musica} style={{ width: '100%' }} /> : ''}
                        {event.type === 'Aire libre' ? <img src={parque} style={{ width: '100%' }} /> : ''}
                        {event.type === 'Cumpleaños' ? <img src={cumple} style={{ width: '100%' }} /> : ''}
                        {event.type === 'Talleres' ? <img src={taller} style={{ width: '100%' }} /> : ''}
                        {event.type === 'Otros' ? <img src={otros} style={{ width: '100%' }} /> : ''}
                        <div className="particpants mt-5">

                            <h2>Participantes:</h2>
                            {
                                event.participants?.map((elm, i) => {
                                    return (
                                        <div key={i}>
                                            <Link to={`/perfil/${elm._id}`} >{elm.username}</Link>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </Col>
                </Row>
                <div>
                    <MapMarkerDetails />
                </div>
            </Container >
    )
}


export default EventDetailsPage
