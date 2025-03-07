import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const LoginForm = () => {
    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
    });
    const [loginStatus, setLoginStatus] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoginStatus('logging-in');
        try {
            const response = await axios.post('http://localhost:5000/api/login', loginData);
            setLoginStatus('success');
            console.log('Login successful:', response.data.message);
            navigate('/student-list');
        } catch (error) {
            console.error('Login error:', error);
            setLoginStatus('error');
        }
    };

    const formContainerStyle = {
        maxWidth: '450px', 
        margin: '3rem auto',
        padding: '2.5rem', 
        backgroundColor: '#f9f9f9', 
        borderRadius: '10px',     
        boxShadow: '0 5px 12px rgba(0,0,0,0.1)', 
        borderTop: '4px solid var(--primary-color)',
    };

    const formHeadingStyle = {
        textAlign: 'center',
        marginBottom: '2rem',  
        fontSize: '2.2rem', 
        fontWeight: 'bold',
        color: 'var(--dark-gray)',
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.15)',
    };

    const formGroupStyle = {
        marginBottom: '1.5rem',
    };

    const labelStyle = {
        fontWeight: 'bold',
        marginBottom: '0.5rem',
        display: 'block',
        color: 'var(--dark-gray)'
    };

    const inputStyle = {
        borderRadius: '6px',    
        border: '2px solid var(--medium-gray)', 
        padding: '0.6rem 0.75rem',
    };

    const loginButtonStyle = {
        backgroundColor: 'var(--primary-color)',
        borderColor: 'var(--primary-color)',
        color: 'var(--white)',
        fontWeight: 'bold',
        padding: '0.8rem 1.8rem', 
        fontSize: '1.2rem',      
        marginTop: '1.5rem',    
        borderRadius: '0.5rem',  
        boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)', 
        transition: 'box-shadow 0.3s ease, transform 0.3s ease', 
    };

    const alertSuccessStyle = {
        backgroundColor: '#d4edda',
        borderColor: '#c3e6cb',
        color: '#155724',
        borderRadius: '6px',
        padding: '0.8rem',
        marginBottom: '1.5rem',
        fontWeight: 'bold',
    };

    const alertErrorStyle = {
        backgroundColor: '#f8d7da',
        borderColor: '#f5c6cb',
        color: '#721c24',
        borderRadius: '6px',
        padding: '0.8rem',
        marginBottom: '1.5rem',
        fontWeight: 'bold',
    };

    const buttonHoverStyle = {
        boxShadow: '3px 3px 8px rgba(0, 0, 0, 0.3)',
        transform: 'scale(1.03)', 
    };


    return (
        <Container style={formContainerStyle}>
            <h2 style={formHeadingStyle}>Admin Login</h2>

            {loginStatus === 'success' && (
                <Alert style={alertSuccessStyle} className="mt-3">
                    Login successful! Redirecting...
                </Alert>
            )}
            {loginStatus === 'error' && (
                <Alert style={alertErrorStyle} variant="danger" className="mt-3">
                    Invalid username or password. Please try again.
                </Alert>
            )}

            <Form onSubmit={handleSubmit}>
                <Form.Group style={formGroupStyle}>
                    <Form.Label style={labelStyle} htmlFor="username">Username:</Form.Label>
                    <Form.Control
                        type="text"
                        id="username"
                        name="username"
                        value={loginData.username}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                </Form.Group>

                <Form.Group style={formGroupStyle}>
                    <Form.Label style={labelStyle} htmlFor="password">Password:</Form.Label>
                    <Form.Control
                        type="password"
                        id="password"
                        name="password"
                        value={loginData.password}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                </Form.Group>

                <Button
                    variant="primary"
                    type="submit"
                    disabled={loginStatus === 'logging-in'}
                    style={loginButtonStyle}
                    onMouseOver={(e) => Object.assign(e.target.style, buttonHoverStyle)} onMouseOut={(e) => Object.assign(e.target.style, loginButtonStyle)}
                >
                    {loginStatus === 'logging-in' ? 'Logging in...' : 'Login'}
                </Button>
            </Form>
        </Container>
    );
};

export default LoginForm;