import { useContext, useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import userservices from '../../services/user.services'
import { AuthContext } from '../../contexts/auth.context'


const UsersPage = () => {

    const { loggedUser } = useContext(AuthContext)
    const [user, setUser] = useState()

    const [deletedFriend, setdeletedFriend] = useState({
        friends: [],
    })

    useEffect(() => {
        loadUser()
    }, [])

    const loadUser = () => {
        userservices
            .getAllUser()
            .then(({ data }) => {
                setUser(data)
            })
            .catch(err => console.log(err))
    }



    const handledeleteSubmit = (friendId) => {
        userservices
            .deletedFriend(friendId)
            .then(({ data }) => {
                setdeletedFriend(data)
                loadUser()
            })
            .catch(err => console.log(err))
    }

    const handlePetitionSubmit = (friendId) => {
        userservices
            .petitionFriend(friendId)
            .then(({ data }) => {
                loadUser(data)
            })
            .catch(err => console.log(err))
    }
    return (

        !user ?
            <h1>holaaaa</h1>
            :

            <Container>
                <h1>usuarios</h1>
                <hr />
                {
                    user.map((elm, i) => {
                        return (
                            <div key={elm._id}>
                                <p>{elm.username}</p>
                                {
                                    elm.friends.includes(loggedUser._id)
                                        ?
                                        <Button onClick={() => handledeleteSubmit(elm._id)}> DELETE FRIEND </Button>
                                        :
                                        <Button onClick={() => handlePetitionSubmit(elm._id)}> ADD FRIEND </Button>
                                }
                            </div>
                        )
                    })
                }
            </Container>
    )
}


export default UsersPage