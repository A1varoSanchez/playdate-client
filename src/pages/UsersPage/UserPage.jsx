// import { useContext, useEffect, useState } from 'react'
// import { Button, Container, Form, Col, Card, Row } from 'react-bootstrap'
// import userservices from '../../services/user.services'
// import { AuthContext } from '../../contexts/auth.context'
// import './UserPage.css'

// const UsersPage = () => {

//     const { loggedUser } = useContext(AuthContext)
//     const [user, setUser] = useState()

//     const [deletedFriend, setdeletedFriend] = useState({
//         friends: [],
//     })

//     useEffect(() => {
//         loadUser()
//     }, [])

//     const loadUser = () => {
//         userservices
//             .getAllUser()
//             .then(({ data }) => {
//                 setUser(data)
//             })
//             .catch(err => console.log(err))
//     }



//     const handledeleteSubmit = (friendId) => {
//         userservices
//             .deletedFriend(friendId)
//             .then(({ data }) => {
//                 setdeletedFriend(data)
//                 loadUser()
//             })
//             .catch(err => console.log(err))
//     }

//     const handlePetitionSubmit = (friendId) => {
//         userservices
//             .petitionFriend(friendId)
//             .then(({ data }) => {
//                 loadUser(data)
//             })
//             .catch(err => console.log(err))
//     }
//     return (

//         !user ?
//             <h1>Cargando...</h1>
//             :

//             <Container>
//                 <h1>usuarios</h1>
//                 <hr />
//                 <Row >
//                     {user.map((elm) => (
//                         <Col key={elm._id}>
//                             <Card style={{ width: '14rem', backgroundColor: 'rgba(255, 255, 255, 0.3)', marginBottom: '10px', minHeight: '300px' }}>
//                                 <Card.Img variant="top" src={elm.photo} />
//                                 <Card.Body>
//                                     <Card.Title>{elm.username}</Card.Title>
//                                     <p>{elm.aboutUs}</p>
//                                     {elm.friends.includes(loggedUser._id) ? (
//                                         <Button
//                                             onClick={() => handledeleteSubmit(elm._id)}
//                                             className="button-deleted"
//                                         >Borrar amigo</Button>
//                                     ) : elm.friendAdd.includes(loggedUser._id) ? (
//                                         <div></div>
//                                     ) : (
//                                         <Button
//                                             onClick={() => handlePetitionSubmit(elm._id)}
//                                             className="boton-add"
//                                         > Agregar amigo </Button>
//                                     )}
//                                 </Card.Body>
//                             </Card>
//                         </Col>
//                     ))}
//                 </Row>
//             </Container>
//     )
// }


// export default UsersPage

import { useContext, useEffect, useState } from 'react'
import { Button, Container, Form, Col, Card, Row } from 'react-bootstrap'
import userservices from '../../services/user.services'
import { AuthContext } from '../../contexts/auth.context'
import './UserPage.css'
import { Link } from 'react-router-dom'


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
            <h1>Cargando...</h1>
            :

            <Container>
                <h1 className="text-center">Usuarios</h1>
                <hr />
                <Row>
                    {user.map((elm) => (
                        <Col key={elm._id}>
                            <Card className="card-container">
                                <Card.Img variant="top" src={elm.photo} className="card-img" />
                                <Card.Body className="card">
                                    <Card.Title className="card-title"><Link to={`/perfil/${elm._id}`}>{elm.username}</Link></Card.Title>
                                    <p className="card-content">{elm.aboutUs}</p>
                                </Card.Body>
                                <div className="card-buttons">
                                    {
                                        elm.friends.includes(loggedUser._id)
                                            ?
                                            (
                                                <Button onClick={() => handledeleteSubmit(elm._id)} className="button-deleted">Borrar amigo</Button>
                                            ) : elm.friendAdd.includes(loggedUser._id) ? (
                                                <></>
                                            ) : (
                                                <Button onClick={() => handlePetitionSubmit(elm._id)} className="boton-add">Agregar</Button>
                                            )
                                    }
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
    )
}


export default UsersPage