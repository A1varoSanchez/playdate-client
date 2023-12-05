import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap'

import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/auth.context.jsx'

import userservices from '../../services/user.services.js'

import ProfileInfoTab1 from '../ProfileInfoTab1/ProfileInfoTab1.jsx'
import ProfileEventsTab2 from '../ProfileEventsTab2/ProfileEventsTab2.jsx'
import ProfileEventsTab3 from '../ProfileEventsTab3/ProfileEventsTab3.jsx'
import ProfileFriendsTab4 from '../ProfileFriendsTab4/ProfileFriendsTab4.jsx'

const Profile = () => {

    const { loggedUser } = useContext(AuthContext)
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
                            <h1>El perfil de {profile.username}</h1>

                            <Tabs
                                defaultActiveKey="home"
                                id="myTabs"
                                className="mb-3 justify-content-start"
                            >

                                <Tab eventKey="home" title="Detalles perfil">
                                    <ProfileInfoTab1 profile={profile} loadUser={loadUser} />
                                </Tab>

                                <Tab eventKey="eventos" title="Mis eventos">
                                    <ProfileEventsTab2 />
                                </Tab>

                                <Tab eventKey="eventos2" title="Mis planes">
                                    <ProfileEventsTab3 />
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