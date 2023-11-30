import { Container, Row, Col } from 'react-bootstrap'

import { AuthContext } from './../../contexts/auth.context'
import { useContext, useEffect, useState } from 'react'
import authService from '../../services/auth.services'
import { useParams } from 'react-router-dom'
import AddChildForm from '../../components/AddChildForm/AddChildForm'

const Profile = () => {

    const { loggedUser } = useContext(AuthContext)
    const { _id } = useParams()

    const [profile, setProfile] = useState(null)

    useEffect(() => {
        loadUser()
    }, [_id])

    const loadUser = () => {
        if (loggedUser._id === _id) {
            authService
                .findUser(_id)
                .then(({ data }) => {
                    setProfile(data)
                })
        }
    }

    return (
        !profile
            ?
            <h1>Cargando...</h1>
            :
            <Container>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <h1>El perfil de {profile.username}</h1>
                        <hr />
                        <p><b>Dirección de email: </b>{profile.email}</p>
                        <p><b>Conoce a mi familia: </b>{profile.aboutUs}</p>
                        <p><b>Peques: </b> </p>
                        <AddChildForm />
                    </Col>
                </Row>
            </Container>
    )
}

export default Profile