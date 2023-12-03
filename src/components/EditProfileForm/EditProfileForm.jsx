import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import userServices from "../../services/user.services"
import uploadServices from "../../services/upload.services"

import avatar from "./../../assets/avatar.png"

const EditProfileForm = (userData) => {

    const [errors, setErrors] = useState([])

    const [profileData, setProfileData] = useState({
        username: '',
        email: '',
        children: [{
            gender: '',
            birth: { type: Date }
        }],
        aboutUs: '',
        photo: avatar
    })

    const [loadingImage, setLoadingImage] = useState(false)

    const handleInputChange = e => {
        const { value, name } = e.target
        setProfileData({ ...profileData, [name]: value })
    }

    const handleFormSubmit = e => {
        e.preventDefault()

        userServices
            .editUser(userData)
            .then(({ data }) => {
                setProfile(data)
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
                setProfileData({ ...profileData, photo: res.data.cloudinary_url })
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
                <Form.Control type="email" value={profileData.email} onChange={handleInputChange} name="email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="username">
                <Form.Label>Nombre de usuario*</Form.Label>
                <Form.Control type="text" value={profileData.username} onChange={handleInputChange} name="username" />
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
                    value={profileData.aboutUs}
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