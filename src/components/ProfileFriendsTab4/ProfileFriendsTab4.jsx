import { useEffect, useState } from "react"
import { Button, Container, Row } from "react-bootstrap"
import Chat from "../Chat/chat"
import userservices from "../../services/user.services"


const ProfileFriendsTab4 = ({ profile, loadUser }) => {

    const [addFriend, setAddFriend] = useState({
        friends: [],
    })

    useEffect(() => {
        setAddFriend()
        loadUser()
    }, [])

    // const loadUser = () => {
    //     userservices
    //         .findUser()
    //         .then(({ data }) => {
    //             setProfile(data)
    //         })
    //         .catch(err => console.log(err))
    // }

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
        <Container className='mt-5'>
            <Row>
                <p>peticiones de amistad</p>
                <ul>
                    {
                        profile.friendAdd.map(elm => {
                            return (
                                <div key={elm._id}>
                                    <p>{elm.username}</p>
                                    <Button onClick={() => handleFriendSubmit(elm._id)}> ADD FRIEND </Button>

                                </div>
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
    )
}

export default ProfileFriendsTab4