import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap'

import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/auth.context.jsx'

import userservices from '../../services/user.services'

import ProfileInfoTab1 from '../../components/ProfileInfoTab1/ProfileInfoTab1'
import ProfileFriendsTab4 from '../../components/ProfileFriendsTab4/ProfileFriendsTab4.jsx'
import ProfileEventsList from '../../components/ProfileEventsList/ProfileEventsList.jsx'
import ProfileAttendingEvents from '../../components/ProfileAttendingEvents/ProfileAttendingEvents.jsx'

const Profile = () => {

    const [profile, setProfile] = useState(null)

    useEffect(() => {
        loadUser()
    }, [])

    const loadUser = () => {
        userservices
            .findUser()
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
                            <h1 className='mb-4'>El perfil de {profile.username}</h1>

                            <Tabs
                                defaultActiveKey="home"
                                id="myTabs"
                                className="mb-3 justify-content-start"
                            >

                                <Tab eventKey="home" title="Detalles perfil">
                                    <ProfileInfoTab1 profile={profile} loadUser={loadUser} />
                                </Tab>

                                <Tab eventKey="eventos" title="Mis eventos">
                                    <ProfileEventsList />
                                </Tab>

                                <Tab eventKey="eventos2" title="Mis planes">
                                    <ProfileAttendingEvents />
                                </Tab>

                                <Tab eventKey="amigos" title="Amigos">
                                    <ProfileFriendsTab4 profile={profile} loadUser={loadUser} />
                                </Tab>

                            </Tabs>


                        </div>
                    </Col>
                </Row>
            </Container>
    )
}


export default Profile