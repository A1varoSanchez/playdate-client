import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import { AuthContext } from './../../contexts/auth.context'
import { useContext } from 'react'
import logo2 from './../../assets/playdate-logo4.png'
import "./Navigation.css"

const Navigation = () => {

    const { loggedUser, logout, isAdmin } = useContext(AuthContext)
    const location = useLocation();
    const isHomePage = location.pathname === '/'


    return (

        <Navbar data-bs-theme="dark" expand="lg" style={{ background: 'rgba(0, 0, 0, 0)', zIndex: '20' }}>

            <Navbar.Brand href="/">
                <img
                    src={logo2}
                    height="35"
                    className="d-inline-block align-top"
                    alt="Company Logo"
                    style={{ marginLeft: '15px' }}
                />
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className={`me-auto ${isHomePage ? 'white-text' : ''}`}>
                    {
                        loggedUser
                            ?
                            <>
                                <Link to={'/eventos'} className='nav-link '>Eventos</Link>
                                <Link to={'/mapa'} className='nav-link '>Mapa</Link>
                                <Link to={'/usuarios'} className='nav-link '>usuarios</Link>
                                <Link to={`/perfil`} className='nav-link '>Mi perfil</Link>
                                <span className='nav-link ' onClick={logout}>Cerrar sesión</span>
                            </>
                            :
                            <>
                                <Link to={'/eventos'} className='nav-link '>Eventos</Link>
                                <Link to={'/inicio-sesion'} className='nav-link '>Inicio sesión</Link>
                                <Link to={'/registro'} className='nav-link '>Registro</Link>
                            </>
                    }
                </Nav>

                <Navbar.Text className='justify-content-end my-link' >
                    {loggedUser && <Navbar.Text style={{ color: '#60BFB2' }}  >Bienvenido {loggedUser.username}</Navbar.Text>}
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    )
}


export default Navigation