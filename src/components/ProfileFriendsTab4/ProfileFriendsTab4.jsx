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


    return (
<<<<<<< HEAD



        <Container className='mt-5'>

            {profile.friendAdd.length === 0 ? (
                <div></div>
            ) : (
                <div>
                    <p>peticiones de amistad</p>
                    <ul>
                        {
                            profile.friendAdd.map(elm => {
                                return (
                                    <div key={elm._id}>
                                        <p>{elm.username}</p>
                                        <Button
                                            onClick={() => handleFriendSubmit(elm._id)}
                                            className="boton-add"
                                        > ADD FRIEND </Button>
                                    </div>
                                )
                            })
                        }
                    </ul>
                </div>
            )}

            <p><b>Amigos:</b></p>
            <Container>
                <Row>
=======
        <Container className='mt-5'>
            <Row>
                <p>peticiones de amistad</p>
                <ul>
>>>>>>> bddfa609998ce7eeee3ab899eb9f21e040239dee
                    {
                        profile.friends.map(elm => {
                            return (

                                <Col key={elm._id}>
                                    <Card style={{ width: '14rem', backgroundColor: 'rgba(255, 255, 255, 0.3)', marginBottom: '10px' }}>
                                        <Card.Img variant="top" src={elm.photo} />
                                        <Card.Body>
                                            <Card.Title>{elm.username}</Card.Title>
                                            <Chat profile={profile} onlyOne={elm} />
                                            <Button
                                                onClick={() => handledeleteSubmit(elm._id)}
                                                className="button-deleted"
                                            >Borrar amigo</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>

                            )
                        })
                    }
                </Row >
            </Container >

<<<<<<< HEAD

=======
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
>>>>>>> bddfa609998ce7eeee3ab899eb9f21e040239dee
        </Container >
    )
}

export default ProfileFriendsTab4