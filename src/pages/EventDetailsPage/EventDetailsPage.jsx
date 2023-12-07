import { useContext, useEffect, useState } from "react"
import eventServices from "../../services/event.services"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Col, Container, Row, Button, Modal, Offcanvas, Form, Toast } from "react-bootstrap"
import "./EventDetailsPage.css"
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
                <Link to="/eventos" className="volver-link "> ← Volver a listado </Link>

                <h1 className="mb-2 mt-3">Detalles de {event.name}</h1>
                <Button
                    variant="primary"
                    onClick={() => {
                        handleShow();
                        loadEventDetails();
                    }}
                    className="button-"
                >
                    Comentarios del Evento
                </Button>

                <Offcanvas show={show} onHide={handleClose} className="offcanvas">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Comentarios</Offcanvas.Title>
                    </Offcanvas.Header>

                    <Offcanvas.Body className="force-scroll">
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

                    <Col md={{ span: 4 }}>
                        {event.type === 'Cultura' ? <img src={museo} style={{ width: '100%' }} /> : ''}
                        {event.type === 'Deportes' ? <img src={deporte} style={{ width: '100%' }} /> : ''}
                        {event.type === 'Música' ? <img src={musica} style={{ width: '100%' }} /> : ''}
                        {event.type === 'Aire libre' ? <img src={parque} style={{ width: '100%' }} /> : ''}
                        {event.type === 'Cumpleaños' ? <img src={cumple} style={{ width: '100%' }} /> : ''}
                        {event.type === 'Talleres' ? <img src={taller} style={{ width: '100%' }} /> : ''}
                        {event.type === 'Otros' ? <img src={otros} style={{ width: '100%' }} /> : ''}

                    </Col>


                    <Col md={{ span: 6, offset: 1 }} style={{ marginTop: '10px' }} >
                        <h4><strong>Plan: </strong> {event.description}</h4>
                        <br />
                        <h5 ><strong>Organizadores: </strong> {event.organizer?.username}</h5>
                        <h5><strong>Tipo de evento: </strong> {event.type}</h5>
                        <h5><strong>Edad recomendada: </strong> {event.ageGroup} años</h5>
                        <h5><b>Participantes:</b> {
                            event.participants?.map((elm, i) => (
                                <span key={i}>
                                    <Link to={`/perfil/${elm._id}`} className="my-link" >{elm.username}</Link>
                                    {i < event.participants.length - 1 && ", "}
                                </span>
                            ))
                        }</h5>

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
                                <span className='link-evento' onClick={() => handleDeleteSubmit()}> Abandonar evento </span>
                                :
                                <span className='link-evento' onClick={() => handleJoinSubmit()}> ¡Me apunto! </span>
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

                    </Col>


                </Row>
                <div>
                    <MapMarkerDetails />
                </div>
            </Container >
    )
}


export default EventDetailsPage
