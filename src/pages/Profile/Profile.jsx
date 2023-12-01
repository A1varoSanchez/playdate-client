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

            <Container className='mt-5'>
                <Row>

                    <h1>El perfil de {profile.username}</h1>
                    <hr />

                    <Col md={{ span: 2 }}>
                        <img src={profile.photo} alt="photo" style={{ width: "100px", height: "auto" }} />
                    </Col>
                    <Col>
                        <p><b>Dirección de email: </b>{profile.email}</p>
                        <p><b>Conoce a mi familia: </b>{profile.aboutUs}</p>
<<<<<<< HEAD
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
=======

>>>>>>> 256a22e0a9f834e53d8522f03bd6f778bb29e66e
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
<<<<<<< HEAD
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
                                            
=======
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
                        </ul>


                        <p><b>Amigos:</b></p>
                        {
                            profile.friends.map(elm => {
                                return (<p>{elm.username}</p>)
                            })
                        }
                        <p><b>Peticiones de amistad:</b></p>
                        <ul>
                            {
                                profile.friendAdd.map(elm => {
                                    return (
                                        <>
                                            <p>{elm.username}</p>
                                            <Button onClick={() => handleFriendSubmit(elm._id)}> Aceptar </Button>
>>>>>>> 256a22e0a9f834e53d8522f03bd6f778bb29e66e
                                        </>
                                    )
                                })
                            } */}
                            <Chat profile={profile} />
                        </ul>


                    </Col>
                </Row>
            </Container>
    )
}


export default Profile