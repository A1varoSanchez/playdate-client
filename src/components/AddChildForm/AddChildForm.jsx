import { useState } from "react"
import userservices from "../../services/user.services"
import { Button, Form } from "react-bootstrap"


const AddChildForm = ({ setShowModal1, loadUser }) => {

    const [childInfo, setChildInfo] = useState({
        children: [{
            gender: '',
            birth: ''
        }],
    })

    const handleInputChange = e => {
        const { value, name } = e.currentTarget
        setChildInfo({ ...childInfo, [name]: value })
    }

    const handleEventSubmit = e => {
        e.preventDefault()

        userservices
            .addChild(childInfo)
            .then(({ data }) => {
                setChildInfo(data)
                setShowModal1(false)
                loadUser()
            })
            .catch(err => console.log(err))
    }

    return (
        <Form onSubmit={handleEventSubmit}>
            <Form.Group className="mb-3" controlId="birthday">
                <Form.Label>Fecha de nacimiento</Form.Label>
                <Form.Control type="date" name="birthday" value={childInfo.children.birthday} onChange={handleInputChange} />
            </Form.Group>

            <Form.Select className="mb-3" aria-label="Default select example" name="gender" value={childInfo.children.gender} onChange={handleInputChange}>
                <option type="text">Selecciona género</option>
                <option type="text" value="niño">Niño</option>
                <option type="text" value="niña">Niña</option>
            </Form.Select>

            <div className="d-grid">
                <Button variant="dark" type="submit">Añadir hijo/a</Button>
            </div>
        </Form>
    )
}


export default AddChildForm

