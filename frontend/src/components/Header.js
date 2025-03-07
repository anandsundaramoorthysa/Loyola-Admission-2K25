// frontend/src/components/Header.js
import React from 'react';
import { Navbar, Container, Nav, Image } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/emblem.png';

const Header = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';

    const headerStyle = {
        fontFamily: 'Arial',
        background: 'linear-gradient(135deg, #003366, #001a33)',
        padding: '15px 0',
        boxShadow: '0 3px 7px rgba(0,0,0,0.4)',
    };

    const brandStyle = {
        fontWeight: 'bold',
        fontSize: '2.0rem', 
        color: 'var(--white)',
        textDecoration: 'none',
        marginLeft: '10px',
        fontFamily: 'serif',
        textShadow: '2px 2px 3px rgba(0, 0, 0, 0.5)',
    };

    const logoStyle = {
        height: '65px',
        marginRight: '0px',
    };

    const loginButtonStyle = {
        backgroundColor: '#f8f9fa',
        color: '#003366',
        padding: '0.6rem 1.2rem',
        borderRadius: '0.5rem',
        textDecoration: 'none',
        fontWeight: 'bold',
        marginLeft: '1.5rem',
        border: 'none',
        boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
        transition: 'box-shadow 0.3s ease, background-color 0.3s ease, color 0.3s ease',
    };

    const loginButtonHoverStyle = {
        boxShadow: '3px 3px 7px rgba(0, 0, 0, 0.3)',
        backgroundColor: '#e0e0e0',
        color: '#001a33',
    };

    return (
        <Navbar style={headerStyle} bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="/" style={{ display: 'flex', alignItems: 'center' }}>
                    <Image src={logo} alt="College Emblem" style={logoStyle} />
                    <span style={brandStyle}> 
                        Loyola College, Mettala
                    </span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        {!isLoginPage && (
                            <Nav.Item>
                                <Link to="/login" className="nav-link" style={loginButtonStyle}
                                    onMouseOver={(e) => Object.assign(e.target.style, loginButtonHoverStyle)}
                                    onMouseOut={(e) => Object.assign(e.target.style, loginButtonStyle)}>Login</Link>
                            </Nav.Item>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;