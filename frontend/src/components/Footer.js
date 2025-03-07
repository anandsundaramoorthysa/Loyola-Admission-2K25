import React from 'react';
import logo from '../assets/emblem.png';

const Footer = () => {
    const footerStyle = {
        backgroundColor: '#f0f0f0',
        padding: '20px 0',
        borderTop: '1px solid var(--medium-gray)',
        bottom: 0,
        width: '100%',
        zIndex: 100,
        textAlign: 'center',
    };

    const containerStyle = {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
    };

    const logoStyle = {
        height: '40px',
        marginBottom: '10px',
    };

    const textStyle = {
        color: 'var(--dark-gray)',
        textDecoration: 'none',
        fontWeight: 'bold',
    };

    const copyrightStyle = {
        color: 'var(--dark-gray)',
        fontSize: '0.9rem',
        marginTop: '10px',
    };


    return (
        <footer style={footerStyle}>
            <div style={containerStyle}>
                <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                    <img src={logo} alt="College Emblem" style={logoStyle} />
                    <div>
                        <a href="https://loyolacollege.ac.in/" target="_blank" rel="noopener noreferrer" style={textStyle}>
                            Loyola College of Arts & Science (Co-Ed.), Mettala
                        </a>
                    </div>
                    <p style={copyrightStyle}>&copy; {new Date().getFullYear()} Loyola College Mettala. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;