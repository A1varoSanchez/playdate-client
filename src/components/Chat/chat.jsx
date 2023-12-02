import { useContext, useEffect, useState } from "react"

import { Button, Form, Offcanvas, Toast } from "react-bootstrap"
import { AuthContext } from "../../contexts/auth.context"
import chatService from "../../services/chat.services"


const Chat = ({ profile }) => {

    const { loggedUser } = useContext(AuthContext)
    const [chatInit, setChatInit] = useState({
        participantTwo: '',
    })
    const [chat, setChat] = useState([])

    const [show, setShow] = useState(false);

    const [chatInfo, setChatInfo] = useState({
        messages: {
            content: '',
        }
    })

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    const handleInputChat = e => {
        const { value, name } = e.target
        setChatInit({ ...chatInit, [name]: value })

    }

    const handleInitSubmit = (e, friendId) => {
        e.preventDefault()
        console.log(friendId)

        chatService
            .chatInit(friendId,)
            .then(({ data }) => {
                setChatInit(data)
                loadChat()


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
                console.log(data)
                setChat(data)

            })
            .catch(err => console.log(err))
    }


    const handleInputChange = e => {
        const { value, name } = e.currentTarget
        // setChatInfo({ ...chatInfo, [name]: value })
        setChatInfo(prevState => ({
            ...prevState,
            messages: {
                content: value,
            }
        }))
    }

    const handleChatSubmit = (e, chatId) => {
        e.preventDefault()
        chatService
            .sendChat(chatId, chatInfo)
            .then(({ data }) => {
                setChatInfo(data)
                loadChat()
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            {
                profile.friends.map((elm, i) => {
                    const myChat = chat.find((el) =>
                        (el.participantOne === loggedUser._id &&
                            el.participantTwo === elm._id) ||
                        (el.participantTwo === loggedUser._id &&
                            el.participantOne === elm._id)
                    )

                    return (
                        <div key={elm._id}>
                            {myChat ? (
                                <>
                                    <p key={i}>{myChat._id}</p>
                                    <Button variant="primary" onClick={handleShow} className="me-2">iniciar </Button>

                                    {/* <Form onSubmit={(e) => handleChatSubmit(e, myChat._id)}>
                                        <Form.Group className="mb-3" controlId="content">
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                name="content"
                                                value={chatInfo.messages.content}
                                                onChange={handleInputChange}
                                            />
                                            <Button type="submit">Enviar</Button>
                                        </Form.Group>
                                    </Form> */}


                                    <Offcanvas show={show} onHide={handleClose} placement="end" >
                                        <Offcanvas.Header closeButton>
                                            <Offcanvas.Title>{loggedUser.username} y {elm.username}</Offcanvas.Title>
                                        </Offcanvas.Header>
                                        <Offcanvas.Body >
                                            <Toast>
                                                <Toast.Header>
                                                    <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                                                    <strong className="me-auto">nombre</strong>
                                                    <small>11 mins ago</small>
                                                </Toast.Header>
                                                <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
                                            </Toast>
                                        </Offcanvas.Body>
                                        <Form onSubmit={(e) => handleChatSubmit(e, myChat._id)}>
                                            <Form.Group className="mb-3" controlId="content">
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    name="content"
                                                    //value={chatInfo.messages.content}
                                                    onChange={handleInputChange}
                                                //onChange={(e) => handleInputChange(e, chatInfo.messages.content)}
                                                />
                                                <Button type="submit">Enviar</Button>
                                            </Form.Group>
                                        </Form>
                                    </Offcanvas>
                                </>

                            ) : (
                                <Form key={elm._id} onSubmit={(e) => handleInitSubmit(e, elm._id)}>
                                    <Form.Group className="mb-3" controlId="participantTwo">
                                        <Form.Label>Name</Form.Label>
                                        <Button type="submit">Iniciar Chat</Button>
                                    </Form.Group>
                                </Form>
                            )}
                        </div>
                    )
                })}
        </>
    )
}

export default Chat