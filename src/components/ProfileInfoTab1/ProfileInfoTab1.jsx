import AddChildForm from '../../components/AddChildForm/AddChildForm'
import calculateAge from '../../utils/calculateAge'
import { Container, Col, Modal, Button, Row } from 'react-bootstrap'
import userservices from '../../services/user.services'
import { useEffect, useState } from 'react'
import loveheart from '../../assets/lovehearts.png'

const ProfileInfoTab1 = ({ profile, loadUser }) => {

    const [showModal, setShowModal] = useState(false)


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
                        onClick={() => setShowModal(true)}
                    >
                        Añadir hijo/a
                    </Button>


                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Datos del peque</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <AddChildForm loadUser={loadUser} setShowModal={setShowModal} />
                        </Modal.Body>
                    </Modal>
                </Col>
            </Row>

        </Container >
    )


}

export default ProfileInfoTab1
