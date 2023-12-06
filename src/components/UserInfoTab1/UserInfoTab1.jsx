import calculateAge from '../../utils/calculateAge'
import { Container, Col, Modal, Button, Row } from 'react-bootstrap'
import loveheart from '../../assets/lovehearts.png'

const UserInfoTab1 = ({ profile, loadUser }) => {

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
                </Col>
            </Row>
        </Container >
    )
}


export default UserInfoTab1