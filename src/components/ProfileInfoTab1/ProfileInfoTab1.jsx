import AddChildForm from '../../components/AddChildForm/AddChildForm'
import calculateAge from '../../utils/calculateAge'
import { Container, Col, Modal, Button, Row } from 'react-bootstrap'
import { useState } from 'react'
import loveheart from '../../assets/lovehearts.png'
import EditProfileForm from '../EditProfileForm/EditProfileForm'

const ProfileInfoTab1 = ({ profile, loadUser }) => {

    const [showModal1, setShowModal1] = useState(false)
    const [showModal2, setShowModal2] = useState(false)


    return (

        <Container>
            <Row>
                <Col md={{ span: 2 }}>
                    <img src={profile.photo} alt="photo"
                        style={{
                            width: '200px',
                            height: 'auto',
                            borderColor: '#332623',
                            borderStyle: 'solid',
                            borderWidth: '3px',
                            marginLeft: '-13px'
                        }} />
                </Col>
                <Col>
                    <p>
                        <b>Dirección de email: </b>
                        {profile.email}
                    </p>
                    <p>
                        <b>Conoce a mi familia: </b>
                        {profile.aboutUs}
                    </p>

                    <p>
                        <b>Peques: </b>{' '}
                    </p>
                    <ul style={{ padding: '0' }}>
                        {profile.children.map((elm, i) => (
                            <li key={i} style={{ listStyleType: 'none', display: 'flex', alignItems: 'center' }}>
                                <img src={loveheart} alt="loveheart icon" style={{ width: '35px', marginRight: '3px' }} />
                                <p style={{ margin: '0' }}>{elm.gender} - {calculateAge(elm.birthday)} años </p>
                            </li>
                        ))}
                    </ul>

                    <Button
                        variant="link"
                        size="sm"
                        style={{
                            textDecoration: 'underline',
                            color: '#60BFB2',
                            cursor: 'pointer',
                            border: 'none',
                            padding: '0',
                            marginLeft: '5px',
                        }}
                        onClick={() => setShowModal1(true)}
                    >
                        Añadir hijo/a
                    </Button>


                    <Modal show={showModal1} onHide={() => setShowModal1(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Datos del peque</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <AddChildForm loadUser={loadUser} setShowModal1={setShowModal1} />
                        </Modal.Body>
                    </Modal>
                </Col>

                <Col className='text-end'>
                    <Button
                        variant="link"
                        size="sm"
                        style={{
                            textDecoration: 'underline',
                            color: '#60BFB2',
                            cursor: 'pointer',
                            border: 'none',
                            padding: '0',
                            marginLeft: '5px',
                        }}
                        onClick={() => setShowModal2(true)}
                    >
                        Editar perfil
                    </Button>
                    <Modal show={showModal2} onHide={() => setShowModal2(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Editar perfil</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <EditProfileForm profile={profile} loadUser={loadUser} setShowModal2={setShowModal2} />
                        </Modal.Body>
                    </Modal>

                </Col>
            </Row>

        </Container >
    )
}


export default ProfileInfoTab1