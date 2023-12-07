import { Form, Button, Row, Col } from 'react-bootstrap'
import eventServices from '../../services/event.services'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AGE_GROUP, EVENT_TYPE } from './../../consts/event-consts'
import FormError from '../Error-handling/ErrorHandling'


const NewEventForm = ({ setShowModal, refreshEvents }) => {

    const [errors, setErrors] = useState([])
    const [newData, setEventData] = useState({
        name: '',
        type: 'Otros',
        description: '',
        location: {
            type: {
                type: String
            },
            coordinates: {
                type: [Number]
            }
        },
        ageGroup: 'todas las edades',

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
                setShowModal(false)
                refreshEvents()
                navigate('/eventos')
            })
            .catch(err => { setErrors(err.response.data.errorMessages) })
    }


    return (

        <Form onSubmit={handleEventSubmit}>
            <Form.Group className="mb-3" controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" value={newData.name} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Tipo de Evento</Form.Label>
                <Form.Select type="text" name="type" value={newData.type} onChange={handleInputChange} className="mb-3" aria-label="Default select example">
                    {
                        EVENT_TYPE?.map(elm => <option value={elm} key={elm}>{elm}</option>)
                    }
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
                        {
                            AGE_GROUP?.map(elm => <option value={elm} key={elm}>{elm}</option>)
                        }
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
                {errors.length > 0 && <FormError>{errors.map(elm => <p>{elm}</p>)}</FormError>}
                <Button variant="dark" type="submit">Crear nuevo evento</Button>
            </div>
        </Form>
    )
}


export default NewEventForm