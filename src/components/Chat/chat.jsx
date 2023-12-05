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

    const [loadMyChat, setLoadChatMyChat] = useState(null)

    const [show, setShow] = useState(false)

    const [chatInfo, setChatInfo] = useState({
        messages: {
            content: '',
        }
    })
    useEffect(() => {

        loadChat()

    }, [])

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)


    const handleInputChat = e => {
        const { value, name } = e.target
        setChatInit({ ...chatInit, [name]: value })
    }

    const handleInitSubmit = (e, friendId) => {
        e.preventDefault()

        chatService
            .chatInit(friendId,)
            .then(({ data }) => {
                setChatInit(data)
            })
            .catch(err => console.log(err))
    }

    const loadChat = () => {
        chatService
            .getChat()
            .then(({ data }) => {
                setChat(data)
            })
            .catch(err => console.log(err))
    }


    const handleInputChange = e => {
        const { value, name } = e.currentTarget
        setChatInfo(prevState => ({
            ...prevState,
            messages: {
                content: value,
            }
        }))
    }

    const handleChatSubmit = (e, chatId) => {
        e.preventDefault()
        const dataToSend = {
            ...chatInfo.messages,
        }

        chatService
            .sendChat(chatId, dataToSend)
            .then(({ data }) => {
                setChatInfo({
                    ...chatInfo,
                    messages: {
                        ...chatInfo.messages,
                        content: '',
                    },
                })
                setLoadChatMyChat(data)
                loadChat()
            })
            .catch(err => console.log(err))
    }

    const loadChatDetails = (e, chatId) => {
        e.preventDefault()

        chatService
            .getOneChats(chatId)
            .then(({ data }) => {
                console.log(data)
                setLoadChatMyChat(data)

            })
            .catch(err => console.log(err))
    }



    return (
        <>
            {
                profile.friends.map((elm) => {
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
                                    < Button variant="primary" onClick={(e) => { handleShow(), loadChatDetails(e, myChat._id) }} className="me-2">iniciar</Button >
                                    <Offcanvas show={show} onHide={handleClose} placement="end" >
                                        <Offcanvas.Header closeButton>
                                            <Offcanvas.Title>
                                                {loggedUser.username === loadMyChat?.participantTwo.username
                                                    ? loadMyChat?.participantOne.username :
                                                    loggedUser.username} y {loggedUser.username === loadMyChat?.participantOne.username
                                                        ? loadMyChat?.participantTwo.username :
                                                        loggedUser.username}
                                            </Offcanvas.Title>
                                        </Offcanvas.Header>
                                        <Offcanvas.Body >
                                            {
                                                loadMyChat?.messages.slice().reverse().map((elm, i) => (
                                                    <Toast key={i} className="custom-toast">
                                                        <Toast.Header>
                                                            <strong className="me-auto">{elm.owner}</strong>
                                                        </Toast.Header>
                                                        <Toast.Body>{elm.content}</Toast.Body>
                                                    </Toast>
                                                ))
                                            }
                                        </Offcanvas.Body>
                                        <Form onSubmit={(e) => handleChatSubmit(e, loadMyChat._id)}>
                                            <Form.Group className="mb-3" controlId="content">
                                                <p>{loadMyChat?._id}</p>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    name="content"
                                                    value={chatInfo.messages.content}
                                                    onChange={handleInputChange}
                                                />
                                                <Button type="submit">Enviar</Button>
                                            </Form.Group>
                                        </Form>
                                    </Offcanvas>
                                </>
                            )
                                :
                                (
                                    <Form key={elm._id} onSubmit={(e) => handleInitSubmit(e, elm._id)}>
                                        <Form.Group className="mb-3" controlId="participantTwo">
                                            <Form.Label>Name</Form.Label>
                                            <Button type="submit">Iniciar Chat</Button>
                                        </Form.Group>
                                    </Form>
                                )}
                        </div >
                    )
                })}
        </>
    )

}


export default Chat








