import { Form, Button, Row, Col } from 'react-bootstrap'
import eventServices from '../../services/event.services'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/auth.context'
import { useNavigate } from 'react-router-dom'


const NewEventForm = ({ eventFinal }) => {

    const { loggedUser } = useContext(AuthContext)

    const [newData, setEventData] = useState({
        name: '',
        type: 'Otros',
        description: '',
        location: [{
            type: {
                type: String
            },
            coordinates: {
                type: [Number]
            }
        }],
        ageGroup: 'all',

    })
    const navigate = useNavigate()


    const handleInputChange = e => {
        const { value, name } = e.currentTarget
        setEventData({ ...newData, [name]: value })
    }

    const handleEventSubmit = e => {

        e.preventDefault()

        eventServices
            .createEvent(newData)
            .then(() => {
                eventFinal()
                navigate('/')
            })
            .catch(err => console.log(err))

    }
    return (
        <div >
            <Form onSubmit={handleEventSubmit}>
                <Form.Group className="mb-3" controlId='name'>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" name="name" value={newData.name} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Tipo de Evento</Form.Label>
                    <Form.Select type="text" name="type" value={newData.type} onChange={handleInputChange} className="mb-3" aria-label="Default select example">
                        <option value='Música'>Música</option>
                        <option value='Cultura'>Cultura</option>
                        <option value='Aire libre'>Aire libre</option>
                        <option value='Deportes'>Deportes</option>
                        <option value='Cumpleaños'>Cumpleaños</option>
                        <option value='Parques'>Parques</option>
                        <option value='Talleres'>Talleres</option>
                        <option value='Otros'>Otros</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId='description'>
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control type="text" name="description" value={newData.description} onChange={handleInputChange} />
                </Form.Group>

                <Row>

                    <Form.Group>
                        <Form.Label>Edad Recomendadad</Form.Label>
                        <Form.Select type="text" name="ageGroup" value={newData.ageGroup} onChange={handleInputChange} className="mb-3" aria-label="Default select example">
                            <option value='0-3'>0-3 años</option>
                            <option value='3-6'>3-6 años</option>
                            <option value='6-9'>6-9 años</option>
                            <option value='2-5'>2-5 años</option>
                            <option value='5-8'>5-8 años</option>
                            <option value='8-11'>8-11 años</option>
                            <option value='10-13'>10-13 años</option>
                            <option value='all'>Para todas las edades</option>
                        </Form.Select>
                    </Form.Group>

                    <Col>
                        <Form.Group className="mb-3" controlId='latitude'>
                            <Form.Label>Latitud</Form.Label>
                            <Form.Control type="text" name="latitude" value={newData.location.latitude} onChange={handleInputChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId='longitude'>
                            <Form.Label>Longitude</Form.Label>
                            <Form.Control type="text" name="longitude" value={newData.location.longitude} onChange={handleInputChange} />
                        </Form.Group>
                    </Col>

                </Row>

                <div className="d-grid">
                    <Button variant="dark" type="submit">Crear nuevo evento</Button>
                </div>
            </Form>
        </div>
    )
}


export default NewEventForm