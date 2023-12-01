import { Container, Row, Col, Modal, Button, Form } from 'react-bootstrap'
import { useContext, useEffect, useState } from 'react'
import AddChildForm from '../../components/AddChildForm/AddChildForm'
import calculateAge from '../../utils/calculateAge'
import userservices from '../../services/user.services'
import { AuthContext } from '../../contexts/auth.context.jsx'
//import chatService from '../../services/chat.services.js'
import Chat from '../../components/Chat/ChatInit/ChatInit/ChatInit.jsx'

const Profile = () => {

    const [showModal, setShowModal] = useState(false)
    const { loggedUser } = useContext(AuthContext)
    const [profile, setProfile] = useState(null)
    const [addFriend, setAddFriend] = useState({
        friends: [],
    })
    // const [chatInit, setChatInit] = useState({
    //     participantTwo: '',
    // })


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

    // const handleInputChat = e => {
    //     const { value, name } = e.target
    //     setChatInit({ ...chatInit, [name]: value })
    // }

    // const handleChatSubmit = (e, friendId) => {
    //     e.preventDefault()

    //     chatService
    //         .chatInit(friendId)
    //         .then(({ data }) => {
    //             setChatInit(data)
    //             //  loadUser()
    //         })
    //         .catch(err => console.log(err))
    // }


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
                        <p><b>Peques: </b> </p>
                        <ul>
                            {
                                profile.children.map((elm, i) => {

                                    return (
                                        <>
                                            <p><b>Peque {i + 1}:</b></p>
                                            <p>Edad: {calculateAge(elm.birthday)} años</p>
                                            <p>Género: {elm.gender}</p>
                                        </>
                                    )
                                })
                            }
                            <h3>Amigos</h3>
                            {/* {
                                profile.friends.map(elm => {
                                    return (
                                        <>
                                            <p>{elm.username}</p>
                                    

                                                <Form onSubmit={(e) => handleChatSubmit(e, elm._id)}>
                                                    <Form.Group className="mb-3" controlId='participantTwo'>
                                                        <Form.Label>Name</Form.Label>
                                                        <Button type="submit">Iniciar Chat</Button>
                                                    </Form.Group>
                                                </Form>
                                            
                                        </>
                                    )
                                })
                            } */}
                            <Chat profile={profile} />
                        </ul>
                        <Button variant="secondary" size="sm" onClick={() => setShowModal(true)}>
                            Añadir hijo/a
                        </Button>

                        <Modal show={showModal} onHide={() => setShowModal(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Datos del peque</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <AddChildForm refreshProfile={loadUser} setShowModal={setShowModal} />
                            </Modal.Body>
                        </Modal>
                    </Col>
                </Row>
            </Container>
    )
}


export default Profile