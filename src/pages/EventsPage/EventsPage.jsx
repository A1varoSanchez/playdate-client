import { useContext, useEffect, useState } from 'react'
import eventServices from '../../services/event.services'
import { Container, Modal, Button } from 'react-bootstrap'
import EventsList from '../../components/EventsList/EventsList.jsx'
import SearchBar from './../../components/SearchBar/SearchBar.jsx'
import NewEventForm from './../../components/NewEventForm/NewEventForm.jsx'
import './EventsPage.css'
import { AuthContext } from '../../contexts/auth.context.jsx'
import { Link } from 'react-router-dom'


const EventsPage = () => {

    const { loggedUser } = useContext(AuthContext)
    const [events, setEvents] = useState()
    const [showModal, setShowModal] = useState(false)


    useEffect(() => {
        loadEvents()
    }, [])

    const loadEvents = () => {
        eventServices
            .getEvents()
            .then(({ data }) => {
                setEvents(data)
            })
            .catch(err => console.log(err))
    }

    const handleFilteredEvents = (filteredEvents) => {
        setEvents(filteredEvents)
    }

    return (
        <div>
            <Container>
                <div className='header mb-4 mt-4'>
                    <h1 className='title'>Eventos</h1>
                    <div className='searchBar'>
                        <SearchBar refreshEvents={loadEvents} handleFilteredEvents={handleFilteredEvents} />
                    </div>
                </div>
                <hr />

                <div>

                    {
                        loggedUser ?
                            <Button className='mb-3 botoncito' variant='warning' onClick={() => setShowModal(true)}> Crea un evento</Button>
                            :
                            <></>
                        // <Link to={'/inicio-sesion'}>
                        //     <Button className='mb-3 botoncito' variant='warning'> Crea un evento</Button>
                        // </Link>
                    }

                </div>


                <EventsList events={events} refreshEvents={loadEvents} handleFilteredEvents={handleFilteredEvents} />
            </Container>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Nuevo Evento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <NewEventForm setShowModal={setShowModal} refreshEvents={loadEvents} />
                </Modal.Body>
            </Modal>
        </div>

    )
}


export default EventsPage