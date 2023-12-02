import { Container, Row, Col, Modal, Button, Form, Tabs, Tab } from 'react-bootstrap'
import { useContext, useEffect, useState } from 'react'
import userservices from '../../services/user.services'
import { AuthContext } from '../../contexts/auth.context.jsx'
//import chatService from '../../services/chat.services.js'
import Chat from '../../components/Chat/chat.jsx'
import ProfileInfoTab1 from '../../components/ProfileInfoTab1/ProfileInfoTab1'
import ProfileEventsTab2 from '../../components/ProfileEventsTab2/ProfileEventsTab2'

const Profile = () => {

    const { loggedUser } = useContext(AuthContext)
    const [profile, setProfile] = useState(null)
    const [addFriend, setAddFriend] = useState({
        friends: [],
    })

    useEffect(() => {
        setAddFriend()
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

    const handleFriendSubmit = (idFriend) => {
        userservices
            .addFriend(idFriend)
            .then(({ data }) => {
                setAddFriend(data)
                loadUser()
            })
            .catch(err => console.log(err))
    }


    return (

        !profile
            ?
            <h1>Cargando...</h1>
            :
            <>

                <Container className='mt-4'>
                    <Row>
                        <Col>
                            <div>
                                <h1>El perfil de {profile.username}</h1>

                                <Tabs
                                    defaultActiveKey="home"
                                    id="myTabs"
                                    className="mb-3 justify-content-end"
                                >

                                    <Tab eventKey="eventos" title="Mis planes">
                                        {/* Aquí irán los eventos a los que me he unido*/}
                                    </Tab>

                                    <Tab eventKey="eventos" title="Mis eventos">
                                        <ProfileEventsTab2 />
                                    </Tab>

                                    <Tab eventKey="home" title="Detalles perfil">
                                        <ProfileInfoTab1 profile={profile} loadUser={loadUser} />
                                    </Tab>

                                </Tabs>


                            </div>
                        </Col>
                    </Row>
                </Container>

                {/* HASTA AQUÍ LO DE CHIARA. */}

                <Container className='mt-5'>
                    <Row>


                        <p>peticiones de amistad</p>
                        <ul>
                            {
                                profile.friendAdd.map(elm => {
                                    return (
                                        <>
                                            <p>{elm.username}</p>
                                            <Button onClick={() => handleFriendSubmit(elm._id)}> ADD FRIEND </Button>

                                        </>
                                    )
                                })
                            }
                        </ul>


                        <p><b>Amigos:</b></p>
                        {
                            profile.friends.map(elm => {
                                return (
                                    <>
                                        <p>{elm.username}</p>
                                        <Chat profile={profile} />
                                    </>
                                )
                            })
                        }

                    </Row >
                </Container >
            </>
    )
}


export default Profile