import { useContext, useEffect, useState } from "react"
import './Chat.css'
import { Button, Form, Offcanvas, Toast } from "react-bootstrap"
import { AuthContext } from "../../contexts/auth.context"
import chatService from "../../services/chat.services"


const Chat = ({ profile, onlyOne }) => {

    const { loggedUser } = useContext(AuthContext)
    const [chat, setChat] = useState([])
    const [loadMyChat, setLoadChatMyChat] = useState(null)
    const [show, setShow] = useState(false)
    const [chatInit, setChatInit] = useState({
        participantTwo: '',
    })
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

    //create chat
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
                loadChat()
            })
            .catch(err => console.log(err))
    }

    //get all chat
    const loadChat = () => {
        chatService
            .getChat()
            .then(({ data }) => {
                setChat(data)
            })
            .catch(err => console.log(err))
    }

    //send messages
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
                loadChat()
                loadChatDetails(e, chatId)
            })
            .catch(err => console.log(err))
    }

    //get one chat
    const loadChatDetails = (e, chatId) => {
        e.preventDefault()

        chatService
            .getOneChats(chatId)
            .then(({ data }) => {
                setLoadChatMyChat(data)
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <div key={onlyOne._id}>
                {chat.find((el) =>
                    (el.participantOne === loggedUser._id && el.participantTwo === onlyOne._id) ||
                    (el.participantTwo === loggedUser._id && el.participantOne === onlyOne._id))
                    ? (
                        <>
                            <Button
                                variant="primary"
                                onClick={(e) => {
                                    handleShow()
                                    const selectedChat = chat.find((el) =>
                                        (el.participantOne === loggedUser._id && el.participantTwo === onlyOne._id) ||
                                        (el.participantTwo === loggedUser._id && el.participantOne === onlyOne._id)
                                    )
                                    if (selectedChat) {
                                        loadChatDetails(e, selectedChat._id)
                                    }
                                }}
                                className="me-2"
                            >
                                iniciar
                            </Button>
                            <Offcanvas show={show} onHide={handleClose} placement="end" closeButton={false}>
                                <Offcanvas.Header closeButton={false}>
                                </Offcanvas.Header>
                                <Offcanvas.Body  >
                                    {loadMyChat?.messages.slice().reverse().map((elm, i) => (
                                        <Toast key={i} className="custom-toast" style={{ marginBottom: '10px' }}>
                                            <Toast.Header>
                                                <strong className="me-auto">{elm.owner}</strong>
                                            </Toast.Header>
                                            <Toast.Body>{elm.content}</Toast.Body>
                                        </Toast>
                                    ))}
                                </Offcanvas.Body>
                                <Form onSubmit={(e) => handleChatSubmit(e, loadMyChat._id)}>
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
                                </Form>
                            </Offcanvas>
                        </>
                    ) : (
                        <Form key={onlyOne._id} onSubmit={(e) => handleInitSubmit(e, onlyOne._id)}>
                            <Form.Group className="mb-3" controlId="participantTwo">
                                <Form.Label>Name</Form.Label>
                                <Button type="submit">Iniciar Chat</Button>
                            </Form.Group>
                        </Form>
                    )
                }
            </div >
        </>
    )
}





export default Chat











