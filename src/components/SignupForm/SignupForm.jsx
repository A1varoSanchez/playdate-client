import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import authService from "../../services/auth.services"
import { useNavigate } from "react-router-dom"
import uploadServices from "../../services/upload.services"

import avatar from "./../../assets/avatar.png"

const SignupForm = () => {

    const [signupData, setSignupData] = useState({
        username: '',
        email: '',
        password: '',
        children: [{
            gender: '',
            birth: { type: Date }
        }],
        aboutUs: '',
        photo: avatar,
        friends: []
    })

    const [loadingImage, setLoadingImage] = useState(false)

    const handleInputChange = e => {
        const { value, name } = e.target
        setSignupData({ ...signupData, [name]: value })
    }

    const navigate = useNavigate()

    const handleFormSubmit = e => {
        e.preventDefault()

        authService
            .signup(signupData)
            .then(() => navigate('/inicio-sesion'))
            .catch(err => console.log(err))
    }

    const handleFileUpload = e => {

        setLoadingImage(true)

        const formData = new FormData()
        formData.append('imageData', e.target.files[0])

        uploadServices
            .uploadimage(formData)
            .then(res => {
                setSignupData({ ...signupData, photo: res.data.cloudinary_url })
                setLoadingImage(false)
            })
            .catch(err => {
                console.log(err)
                setLoadingImage(false)
            })
    }

    return (

        <Form onSubmit={handleFormSubmit}>

            <Form.Group className="mb-3" controlId="username">
                <Form.Label>Nombre de usuario*</Form.Label>
                <Form.Control type="text" value={signupData.username} onChange={handleInputChange} name="username" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email*</Form.Label>
                <Form.Control type="email" value={signupData.email} onChange={handleInputChange} name="email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Contraseña*</Form.Label>
                <Form.Control type="password" value={signupData.password} onChange={handleInputChange} name="password" />
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
                    value={signupData.aboutUs}
                    onChange={handleInputChange}
                    name="aboutUs"
                    placeholder="Cuéntanos un poco sobre tu familia :)" />
            </Form.Group>

            <div className="d-grid">
                <Button variant="dark" type="submit" disabled={loadingImage}>{loadingImage ? "Cargando..." : "Crear usuario"}</Button>
            </div>

        </Form>
    )
}


export default SignupForm   