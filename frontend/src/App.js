import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AdmissionForm from './components/AdmissionForm';
import LoginForm from './components/LoginForm'; 
import StudentList from './components/StudentList';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
    return (
        <Router>
            <div>
                <Header />
                <Routes>
                    <Route path="/" element={<AdmissionForm />} />
                    <Route path="/login" element={<LoginForm />} /> 
                    <Route path="/student-list" element={<StudentList />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;