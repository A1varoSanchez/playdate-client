import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import { AuthContext } from './../../contexts/auth.context'
import { useContext } from 'react'
import logo from './../../assets/playdate-logo2.png'
import "./Navigation.css"

const Navigation = () => {

    const { loggedUser, logout, isAdmin } = useContext(AuthContext)

    const location = useLocation();

    const isHomePage = location.pathname === '/'


    return (

        <Navbar data-bs-theme="dark" expand="lg" style={{ background: 'rgba(0, 0, 0, 0)', zIndex: '20', color: isHomePage ? 'white' : 'black' }}>

            <Navbar.Brand href="/">
                <img
                    src={logo}
                    height="35"
                    className="d-inline-block align-top"
                    alt="Company Logo"
                    style={{ marginLeft: '15px' }}
                />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Link to={'/'} className='nav-link my-navlink'>Inicio</Link>

                    <Link to={'/eventos'} className='nav-link my-navlink'>Eventos</Link>
                    <Link to={'/mapa'} className='nav-link my-navlink'>Mapa</Link>
                    <Link to={'/usuarios'} className='nav-link my-navlink'>usuarios</Link>
                    {
                        loggedUser
                            ?
                            <>
                                <Link to={`/perfil`} className='nav-link my-navlink'>Mi perfil</Link>
                                <span className='nav-link my-navlink' onClick={logout}>Cerrar sesión</span>
                            </>
                            :
                            <>
                                <Link to={'/inicio-sesion'} className='nav-link my-navlink'>Inicio sesión</Link>
                                <Link to={'/registro'} className='nav-link my-navlink'>Registro</Link>
                            </>
                    }

                </Nav>
                <Navbar.Text className='justify-content-end my-link'>
                    {loggedUser && <Navbar.Text>Bienvenido {loggedUser.username}</Navbar.Text>}
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    )
}


export default Navigation