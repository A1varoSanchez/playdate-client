import { useEffect, useState } from "react"
import { Button, Card, Col, Container, Row } from "react-bootstrap"
import Chat from "../Chat/chat"
import userservices from "../../services/user.services"
import './ProfileFriendsTab4.css'


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
    console.log(profile)
    return (

        <Container >
            {profile.friendAdd.length === 0 ? (
                <div></div>
            ) : (
                <div>
                    <p><b>peticiones de amistad:</b></p>

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
            <Container>
                <Row>
                    {
                        profile.friends.map(elm => {
                            return (

                                <Col key={elm._id} className="custom-col">
                                    <Card className="custom-card">
                                        <Card.Img variant="top" src={elm.photo} className="custom-card-img" />
                                        <Card.Body>
                                            <Card.Title className="custom-card-title">{elm.username}</Card.Title>
                                            <Chat profile={profile} onlyOne={elm} />
                                            <Button
                                                onClick={() => handledeleteSubmit(elm._id)}
                                                className="button-deleted"
                                            >
                                                Borrar amigo
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>

                            )
                        })
                    }
                </Row >
            </Container >

        </Container >
    )
}

export default ProfileFriendsTab4