import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Resources from './pages/Resources';
import Quizzes from './pages/Quizzes';
import InterviewPrep from './pages/InterviewPrep';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import Discussion from './pages/Discussion';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import './App.css';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <div className="app-container">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/quizzes" element={<Quizzes />} />
                <Route path="/interview-prep" element={<InterviewPrep />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/discussion" element={<Discussion />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </main>
          </div>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
