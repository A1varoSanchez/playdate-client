<<<<<<< HEAD
=======
// import { useContext, useEffect, useState } from "react"
// import './Chat.css'
// import { Button, Form, Offcanvas, Toast } from "react-bootstrap"
// import { AuthContext } from "../../contexts/auth.context"
// import chatService from "../../services/chat.services"


// const Chat = ({ profile, onlyOne }) => {

//     const { loggedUser } = useContext(AuthContext)
//     const [chatInit, setChatInit] = useState({
//         participantTwo: '',
//     })
//     const [chat, setChat] = useState([])

//     const [loadMyChat, setLoadChatMyChat] = useState(null)

//     const [show, setShow] = useState(false)

//     const [chatInfo, setChatInfo] = useState({
//         messages: {
//             content: '',
//         }
//     })

//     useEffect(() => {

//         loadChat()
//     }, [])

//     const handleClose = () => setShow(false)
//     const handleShow = () => setShow(true)


//     const handleInputChat = e => {
//         const { value, name } = e.target
//         setChatInit({ ...chatInit, [name]: value })
//     }

//     const handleInitSubmit = (e, friendId) => {
//         e.preventDefault()

//         chatService
//             .chatInit(friendId,)
//             .then(({ data }) => {
//                 setChatInit(data)
//                 loadChat()
//             })
//             .catch(err => console.log(err))
//     }

//     const loadChat = () => {
//         chatService
//             .getChat()
//             .then(({ data }) => {
//                 setChat(data)
//             })
//             .catch(err => console.log(err))
//     }


//     const handleInputChange = e => {
//         const { value, name } = e.currentTarget
//         setChatInfo(prevState => ({
//             ...prevState,
//             messages: {
//                 content: value,
//             }
//         }))
//     }

//     const handleChatSubmit = (e, chatId) => {
//         e.preventDefault()
//         const dataToSend = {
//             ...chatInfo.messages,
//         }

//         chatService
//             .sendChat(chatId, dataToSend)
//             .then(({ data }) => {
//                 setChatInfo({
//                     ...chatInfo,
//                     messages: {
//                         ...chatInfo.messages,
//                         content: '',
//                     },
//                 })
//                 loadChat()
//                 loadChatDetails(e, chatId)
//                 setLoadChatMyChat(data)
//             })
//             .catch(err => console.log(err))
//     }

//     const loadChatDetails = (e, chatId) => {
//         e.preventDefault()

//         chatService
//             .getOneChats(chatId)
//             .then(({ data }) => {
//                 setLoadChatMyChat(data)
//             })
//             .catch(err => console.log(err))
//     }

//     return (
//         <>
//             <div key={onlyOne._id}>
//                 {chat.find((el) =>
//                     (el.participantOne === loggedUser._id && el.participantTwo === onlyOne._id) ||
//                     (el.participantTwo === loggedUser._id && el.participantOne === onlyOne._id))
//                     ? (
//                         <>
//                             <Button
//                                 variant="primary"
//                                 onClick={(e) => {
//                                     handleShow()
//                                     const selectedChat = chat.find((el) =>
//                                         (el.participantOne === loggedUser._id && el.participantTwo === onlyOne._id) ||
//                                         (el.participantTwo === loggedUser._id && el.participantOne === onlyOne._id)
//                                     )
//                                     if (selectedChat) {
//                                         loadChatDetails(e, selectedChat._id)
//                                     }
//                                 }}
//                                 className="me-2"
//                             >
//                                 iniciar
//                             </Button>
//                             <Offcanvas show={show} onHide={handleClose} placement="end" closeButton={false}>
//                                 <Offcanvas.Header closeButton={false}>
//                                 </Offcanvas.Header>
//                                 <Offcanvas.Body  >
//                                     {loadMyChat?.messages.slice().reverse().map((elm, i) => (
//                                         <Toast key={i} className="custom-toast" style={{ marginBottom: '10px' }}>
//                                             <Toast.Header>
//                                                 <strong className="me-auto">{elm.owner}</strong>
//                                             </Toast.Header>
//                                             <Toast.Body>{elm.content}</Toast.Body>
//                                         </Toast>
//                                     ))}
//                                 </Offcanvas.Body>
//                                 <Form onSubmit={(e) => handleChatSubmit(e, loadMyChat._id)}>
//                                     <Form.Group className="mb-3" controlId="content">
//                                         <p>{loadMyChat?._id}</p>
//                                         <Form.Control
//                                             as="textarea"
//                                             rows={3}
//                                             name="content"
//                                             value={chatInfo.messages.content}
//                                             onChange={handleInputChange}
//                                         />
//                                         <Button type="submit">Enviar</Button>
//                                     </Form.Group>
//                                 </Form>
//                             </Offcanvas>
//                         </>
//                     ) : (
//                         <Form key={onlyOne._id} onSubmit={(e) => handleInitSubmit(e, onlyOne._id)}>
//                             <Form.Group className="mb-3" controlId="participantTwo">
//                                 <Form.Label>Name</Form.Label>
//                                 <Button type="submit">Iniciar Chat</Button>
//                             </Form.Group>
//                         </Form>
//                     )
//                 }
//             </div>
//         </>
//     )
// }
>>>>>>> 8c8ac5f3f8a9cd03c5f5b594e25bfb9196114953
import { useContext, useEffect, useState } from "react"
import './Chat.css'
import { Button, Form, Offcanvas, Toast } from "react-bootstrap"
import { AuthContext } from "../../contexts/auth.context"
import chatService from "../../services/chat.services"
<<<<<<< HEAD
=======
import io from "socket.io-client"
>>>>>>> 8c8ac5f3f8a9cd03c5f5b594e25bfb9196114953


const Chat = ({ profile, onlyOne }) => {

    const { loggedUser } = useContext(AuthContext)
<<<<<<< HEAD
    const [chat, setChat] = useState([])
    const [loadMyChat, setLoadChatMyChat] = useState(null)
    const [show, setShow] = useState(false)
    const [chatInit, setChatInit] = useState({
        participantTwo: '',
    })
=======
    const [chatInit, setChatInit] = useState({
        participantTwo: '',
    })
    const [chat, setChat] = useState([])

    const [loadMyChat, setLoadChatMyChat] = useState(null)

    const [show, setShow] = useState(false)

    const [socket, setSocket] = useState(null)



>>>>>>> 8c8ac5f3f8a9cd03c5f5b594e25bfb9196114953
    const [chatInfo, setChatInfo] = useState({
        messages: {
            content: '',
        }
    })
<<<<<<< HEAD

    useEffect(() => {

        loadChat()
    }, [])
=======
    useEffect(() => {
        loadChat()
        const socketInstance = io("http://localhost:5174")
        setSocket(socketInstance)
        return () => {
            if (socketInstance) {
                socketInstance.disconnect()
            }
        }
    }, [])
    useEffect(() => {
        if (socket) {

            socket.on("message", (data) => {
                console.log("Nuevo mensaje recibido:", data)

            })
        }
    }, [socket])
    // useEffect(() => {
    //     if (socket) {
    //         console.log("Socket está conectado y escuchando eventos.")

    //         socket.on("connect", () => {
    //             console.log("Conexión establecida con el servidor WebSocket.")
    //         })

    //         socket.on("disconnect", () => {
    //             console.log("Conexión cerrada con el servidor WebSocket.")
    //         })

    //         socket.on("message", (data) => {
    //             console.log("Mensaje recibido:", data)
    //         })
    //     }

    //     return () => {
    //         if (socket) {
    //             socket.off("connect")
    //             socket.off("disconnect")
    //             socket.off("message")
    //         }
    //     }
    // }, [socket])

>>>>>>> 8c8ac5f3f8a9cd03c5f5b594e25bfb9196114953

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

<<<<<<< HEAD
    //create chat
=======

>>>>>>> 8c8ac5f3f8a9cd03c5f5b594e25bfb9196114953
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

<<<<<<< HEAD
    //get all chat
=======
>>>>>>> 8c8ac5f3f8a9cd03c5f5b594e25bfb9196114953
    const loadChat = () => {
        chatService
            .getChat()
            .then(({ data }) => {
                setChat(data)
            })
            .catch(err => console.log(err))
    }

<<<<<<< HEAD
    //send messages
=======

>>>>>>> 8c8ac5f3f8a9cd03c5f5b594e25bfb9196114953
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
<<<<<<< HEAD
=======
                if (socket) {
                    socket.emit("message", { content: dataToSend.content })
                }

>>>>>>> 8c8ac5f3f8a9cd03c5f5b594e25bfb9196114953
                setChatInfo({
                    ...chatInfo,
                    messages: {
                        ...chatInfo.messages,
                        content: '',
                    },
                })
<<<<<<< HEAD
                loadChat()
                loadChatDetails(e, chatId)
=======
                loadChatDetails(e, chatId)
                setLoadChatMyChat(data)
                loadChat()
>>>>>>> 8c8ac5f3f8a9cd03c5f5b594e25bfb9196114953
            })
            .catch(err => console.log(err))
    }

<<<<<<< HEAD
    //get one chat
=======
>>>>>>> 8c8ac5f3f8a9cd03c5f5b594e25bfb9196114953
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
<<<<<<< HEAD
                            <Offcanvas show={show} onHide={handleClose} placement="end" closeButton={false}>
                                <Offcanvas.Header closeButton={false}>
                                </Offcanvas.Header>
                                <Offcanvas.Body  >
                                    {loadMyChat?.messages.slice().reverse().map((elm, i) => (
                                        <Toast key={i} className="custom-toast" style={{ marginBottom: '10px' }}>
=======
                            <Offcanvas show={show} onHide={handleClose} placement="end">
                                <Offcanvas.Header closeButton={false}>
                                </Offcanvas.Header>
                                <Offcanvas.Body>
                                    {loadMyChat?.messages.slice().reverse().map((elm, i) => (
                                        <Toast key={i} className="custom-toast">
>>>>>>> 8c8ac5f3f8a9cd03c5f5b594e25bfb9196114953
                                            <Toast.Header>
                                                <strong className="me-auto">{elm.owner}</strong>
                                            </Toast.Header>
                                            <Toast.Body>{elm.content}</Toast.Body>
                                        </Toast>
                                    ))}
                                </Offcanvas.Body>
                                <Form onSubmit={(e) => handleChatSubmit(e, loadMyChat._id)}>
                                    <Form.Group className="mb-3" controlId="content">
<<<<<<< HEAD
=======
                                        <p>{loadMyChat?._id}</p>
>>>>>>> 8c8ac5f3f8a9cd03c5f5b594e25bfb9196114953
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
<<<<<<< HEAD
            </div >
        </>
    )
}
=======
            </div>


        </>
    )
}

>>>>>>> 8c8ac5f3f8a9cd03c5f5b594e25bfb9196114953





export default Chat











