import { useContext, useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { AuthContext } from "../../contexts/auth.context"
import { useNavigate, useParams } from "react-router-dom"
import { AGE_GROUP, EVENT_TYPE } from './../../consts/event-consts'
import eventServices from "../../services/event.services"
import FormError from "../Error-handling/ErrorHandling"

const EditEventForm = ({ event, setShowModal, refreshEvents }) => {
    const { loggedUser } = useContext(AuthContext)

    const [errors, setErrors] = useState([])

    const [newData, setEventData] = useState({
        name: event.name,
        type: event.type,
        description: event.description,
        latitude: event.location.coordinates[1],
        longitude: event.location.coordinates[0],
        ageGroup: event.ageGroup,

    })

    // console.log('latitude', event.location.coordinates[1])
    // console.log('longitude', event.location.coordinates[0])

    const handleInputChange = e => {
        const { value, name } = e.currentTarget
        setEventData({ ...newData, [name]: value })
    }

    const navigate = useNavigate()

    const handleEventSubmit = e => {

        e.preventDefault()
        eventServices
            .editEvent(event._id, newData)
            .then(() => {
                console.log(newData)
                setShowModal(false)
                refreshEvents()
                navigate(`/eventos/${_id}`)
            })
            .catch(err => { setErrors(err.response.data.errorMessages) })
    }
    return (
        <div >
            <Form onSubmit={handleEventSubmit}>
                <Form.Group className="mb-3" controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" value={newData.name} onChange={handleInputChange}></Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Tipo de Evento</Form.Label>
                    <Form.Select type="text" name="type" value={newData.type} onChange={handleInputChange} className="mb-3" aria-label="Default select example">
                        {
                            EVENT_TYPE.map(elm => <option value={elm} key={elm}>{elm}</option>)
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
                                AGE_GROUP.map(elm => <option value={elm} key={elm}>{elm}</option>)
                            }
                        </Form.Select>
                    </Form.Group>

                    <Col>
                        <Form.Group className="mb-3" controlId='latitude'>
                            <Form.Label>Latitud</Form.Label>
                            <Form.Control type="text" name="latitude" value={newData.latitude} onChange={handleInputChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId='longitude'>
                            <Form.Label>Longitude</Form.Label>
                            <Form.Control type="text" name="longitude" value={newData.longitude} onChange={handleInputChange} />
                        </Form.Group>
                    </Col>

                </Row>
                <div className="d-grid">
                    {errors.length > 0 && <FormError>{errors.map((elm, i) => <p key={i}>{elm}</p>)}</FormError>}
                    <Button variant="dark" type="submit">Editar evento</Button>
                </div>
            </Form>
        </div>
    )
}

export default EditEventForm