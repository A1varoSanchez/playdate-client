import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../../contexts/auth.context"
import chatService from "../../../../services/chat.services"
import { Button, Form } from "react-bootstrap"


const Chat = ({ profile }) => {

    const { loggedUser } = useContext(AuthContext)
    const [chatInit, setChatInit] = useState({
        participantTwo: '',
    })
    const [chat, setChat] = useState([])



    const handleInputChat = e => {
        const { value, name } = e.target
        setChatInit({ ...chatInit, [name]: value })
    }

    const handleChatSubmit = (e, friendId) => {
        e.preventDefault()

        chatService
            .chatInit(friendId)
            .then(({ data }) => {
                setChatInit(data)
                // loadUser()
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        loadChat()
    }, [])

    const loadChat = () => {

        chatService
            .getChat()
            .then(({ data }) => {
                setChat(data)
            })
            .catch(err => console.log(err))
    }


    return (
        <>

            {
                profile.friends.map((elm) => {
                    return (
                        <div key={elm._id}>
                            <p>{elm.username}</p>
                            {/* {chat.map((el) => {
                                return el.participantOne === loggedUser._id && el.participantTwo === elm._id
                                    ? <p key={el._id}>hola</p>
                                    : ( */}
                            <Form key={elm._id} onSubmit={(e) => handleChatSubmit(e, elm._id)}>
                                <Form.Group className="mb-3" controlId="participantTwo">
                                    <Form.Label>Name</Form.Label>
                                    <Button type="submit">Iniciar Chat</Button>
                                </Form.Group>
                            </Form>
                            {/* )
                            })} */}
                        </div>
                    )
                })
            }

        </>
    )
}

export default Chat

