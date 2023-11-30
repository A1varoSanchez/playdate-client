import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from './../../contexts/auth.context'
import { useContext } from 'react'
import logo from './../../assets/playdate-logo.png'

const Navigation = () => {
    const { loggedUser, logout } = useContext(AuthContext)
    return (
        <Navbar bg="dark" data-bs-theme="dark" className='mb-5' expand="lg">

            <Navbar.Brand href="#home">
                <img
                    src={logo}
                    height="30"
                    className="d-inline-block align-top"
                    alt="Company Logo"
                    style={{ marginLeft: '15px' }}
                />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Link to={'/'} className='nav-link'>Inicio</Link>

                    <Link to={'/eventos'} className='nav-link'>Eventos</Link>
                    <Link to={'/mapa'} className='nav-link'>Mapa</Link>

                    {
                        loggedUser
                            ?
                            <>
                                <Link to={`/perfil/${loggedUser._id}`} className='nav-link'>Mi perfil</Link>
                                <span className='nav-link' onClick={logout}>Cerrar sesión</span>
                            </>
                            :
                            <>
                                <Link to={'/crear-evento'} className='nav-link'>Crear evento</Link>
                                <Link to={'/inicio-sesion'} className='nav-link'>Inicio sesión</Link>
                                <Link to={'/registro'} className='nav-link'>Registro</Link>
                            </>
                    }

                </Nav>
                <Navbar.Text className='justify-content-end'>
                    {loggedUser && <Navbar.Text>Bienvenido {loggedUser.username}</Navbar.Text>}
                </Navbar.Text>
            </Navbar.Collapse>

        </Navbar>

    )
}

export default Navigation