import { useEffect, useState } from "react"
import { Button, ButtonGroup, Card, Col, Container, Row } from "react-bootstrap"
import Chat from "../Chat/Chats"
import userservices from "../../services/user.services"
import './ProfileFriendsTab4.css'
import { Link } from "react-router-dom"


const ProfileFriendsTab4 = ({ profile, loadUser }) => {

    const [addFriend, setAddFriend] = useState({
        friends: [],
    })
    const [deletedFriend, setdeletedFriend] = useState({
        friends: [],
    })

    useEffect(() => {
        setAddFriend()
        loadUser()
    }, [])

    const handledeleteSubmit = (friendId) => {
        userservices
            .deletedFriend(friendId)
            .then(({ data }) => {
                setdeletedFriend(data)
                loadUser()
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

        <Container >
            {profile.friendAdd.length === 0 ? (
                <p>No tienes ninguna petición de amistad pendiente</p>
            ) : (
                <div>
                    <p><b>Peticiones de amistad:</b></p>

                    <ul>
                        <Row >
                            {
                                profile.friendAdd.map(elm => (
                                    <Col key={elm._id}>
                                        <div className="rounded-container" style={{ background: `url(${elm.photo}) center/cover no-repeat` }}>
                                            <Button
                                                onClick={() => handleFriendSubmit(elm._id)}
                                                className="boton-add"
                                            >
                                                {elm.username}
                                            </Button>
                                        </div>
                                    </Col>
                                ))
                            }
                        </Row>
                    </ul>

                </div>
            )}
            <p><b>Amigos:</b></p>

            <Row>
                {profile.friends.map(elm => (
                    <Col key={elm._id} className="custom-col">
                        <Card className="custom-card">
                            <Card.Img variant="top" src={elm.photo} className="custom-card-img" />
                            <Card.Body>
                                <Card.Title className="custom-card-title">{elm.username}</Card.Title>


                                <Chat profile={profile} onlyOne={elm} />




                            </Card.Body>
                            <Button
                                onClick={() => handledeleteSubmit(elm._id)}
                                className="button-deleted"
                                variant="link"
                            >
                                Borrar amigo
                            </Button>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>



    )
}

export default ProfileFriendsTab4