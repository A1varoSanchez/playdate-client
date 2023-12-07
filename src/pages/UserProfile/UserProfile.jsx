import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap'

import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/auth.context.jsx'

import userservices from '../../services/user.services.js'
import { useParams } from 'react-router-dom'

import UserInfoTab1 from '../../components/UserInfoTab1/UserInfoTab1.jsx'
import UserEventsList from '../../components/UserEventsList/UserEventsList.jsx'
import UserAttendingEvents from '../../components/ProfileAttendingEvents/ProfileAttendingEvents.jsx'

const UserProfile = () => {

    const { loggedUser } = useContext(AuthContext)
    const [profile, setProfile] = useState(null)

    const { userId } = useParams()


    useEffect(() => {
        loadUsers()
    }, [])

    const loadUsers = () => {
        userservices
            .findUserById(userId)
            .then(({ data }) => {
                setProfile(data)
            })
            .catch(err => console.log(err))
    }

    return (

        !profile
            ?
            <h1>Cargando...</h1>
            :
            <Container className='mt-4'>
                <Row>
                    <Col>
                        <div>
                            <h1>El perfil de {profile.username}</h1>

                            <Tabs
                                defaultActiveKey="home"
                                id="myTabs"
                                className="mb-3 justify-content-start"
                            >

                                <Tab eventKey="home" title="Detalles usuario">
                                    <UserInfoTab1 profile={profile} loadUser={loadUsers} />
                                </Tab>

                                <Tab eventKey="eventos" title="Sus eventos">
                                    <UserEventsList userId={userId} />
                                </Tab>

                                <Tab eventKey="eventos2" title="Sus planes">
                                    <UserAttendingEvents userId={userId} />
                                </Tab>


                            </Tabs>


                        </div>
                    </Col>
                </Row>
            </Container>
    )
}


export default UserProfile