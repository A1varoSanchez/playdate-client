import { useState } from "react"
import userservices from "../../services/user.services"
import { Button, Form, Row, Col } from "react-bootstrap"
import loveheart from '../../assets/lovehearts.png'
import calculateAge from '../../utils/calculateAge'

const EditChildForm = ({ profile, loadUser, setShowModal3 }) => {

    const [removingChild, setRemovingChild] = useState(false);

    const [user, setUser] = useState({
        username: profile.username,
        email: profile.email,
        children: profile.children || [{ gender: '', birth: { type: Date } }],
        aboutUs: profile.aboutUs,
        photo: profile.photo || avatar
    })

    const handleRemoveChild = (e, child) => {
        e.preventDefault()

        userservices
            .removeChild(child)
            .then(({ data }) => {
                setUser(data)
                loadUser()
            })
            .catch(err => {
                console.error("Error deleting child:", err)
            })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()

        userservices
            .editProfile(user)
            .then(({ data }) => {
                setUser(data)
                setShowModal3(false)
                loadUser()
            })
            .catch(err => {
                console.error("Error editing profile:", err)
            })
    }

    return (

        <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" controlId="children">
                <Form.Label>Hijos</Form.Label>
                <ul style={{ padding: '0' }}>
                    {profile.children.map((elm, i) => (
                        <li key={i} style={{ listStyleType: 'none', display: 'flex', alignItems: 'center' }}>
                            <img src={loveheart} alt="loveheart icon" style={{ width: '35px', marginRight: '3px' }} />
                            <p style={{ margin: '0' }}>{elm.gender} - {calculateAge(elm.birthday)} años </p>
                            <Button
                                variant="link"
                                size="sm"
                                style={{
                                    textDecoration: 'underline',
                                    color: '#60BFB2',
                                    cursor: 'pointer',
                                    border: 'none',
                                    padding: '0',
                                    marginLeft: '5px',
                                }}
                                onClick={(e) => handleRemoveChild(e, elm._id)}
                                disabled={removingChild}
                            >
                                Eliminar
                            </Button>
                        </li>
                    ))}
                </ul>
            </Form.Group>

            <div className="d-grid">
                <Button variant="dark" type="submit" className="my-modal-button">Aceptar</Button>
            </div>
        </Form>
    )
}


export default EditChildForm