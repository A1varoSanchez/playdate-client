import { useState } from "react"
import { Form, Button, Col, Row } from "react-bootstrap"
import userServices from "../../services/user.services"
import uploadServices from "../../services/upload.services"

import avatar from "./../../assets/avatar.png"
import FormError from "../Error-handling/ErrorHandling"

const EditProfileForm = ({ profile, loadUser, setShowModal2 }) => {

    const [errors, setErrors] = useState([])

    const [user, setUser] = useState({
        username: profile.username,
        email: profile.email,
        children: profile.children || [{ gender: '', birth: { type: Date } }],
        aboutUs: profile.aboutUs,
        photo: profile.photo || avatar
    })

    const [loadingImage, setLoadingImage] = useState(false)

    const handleInputChange = e => {
        const { value, name } = e.target
        setUser({ ...user, [name]: value })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()

        userServices.editProfile(user)
            .then(({ data }) => {
                setUser(data)
                setShowModal2()
                loadUser()
            })
            .catch(err => { setErrors(err.response.data.errorMessages) })
    }


    const handleFileUpload = e => {

        setLoadingImage(true)

        const formData = new FormData()
        formData.append('imageData', e.target.files[0])

        uploadServices
            .uploadimage(formData)
            .then(res => {
                setUser({ ...user, photo: res.data.cloudinary_url })
                setLoadingImage(false)
            })
            .catch(err => {
                console.log(err)
                setLoadingImage(false)
            })
    }

    return (
        <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email*</Form.Label>
                <Form.Control type="email" value={user.email} onChange={handleInputChange} name="email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="username">
                <Form.Label>Nombre de usuario*</Form.Label>
                <Form.Control type="text" value={user.username} onChange={handleInputChange} name="username" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="photo">
                <Form.Label>Foto de perfil</Form.Label>
                <Form.Control type="file" onChange={handleFileUpload} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="aboutUs">
                <Form.Label>Bio</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    value={user.aboutUs}
                    onChange={handleInputChange}
                    name="aboutUs"
                    placeholder="Cuéntanos un poco sobre tu familia :)" />
            </Form.Group>

            <div className="d-grid">
                {errors.length > 0 && <FormError>{errors.map(elm => <p>{elm}</p>)}</FormError>}
                <Button variant="dark" type="submit">Editar usuario</Button>
            </div>

        </Form>
    )
}


export default EditProfileForm