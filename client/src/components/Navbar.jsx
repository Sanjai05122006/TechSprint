import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sun, Moon, User, Bell, Search, LogOut } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="nav-left">
                    <Link to="/" className="nav-logo">
                        <span className="logo-icon">SS</span>
                        <span className="logo-text">StudyStack</span>
                    </Link>
                    <div className="nav-links">
                        <Link to="/" className="nav-item">Home</Link>
                        <Link to="/resources" className="nav-item">Explore</Link>
                        <Link to="/quizzes" className="nav-item">Quizzes</Link>
                        <Link to="/discussion" className="nav-item">Discussion</Link>
                        <Link to="/interview-prep" className="nav-item">Interview</Link>
                        <Link to="/leaderboard" className="nav-item">Leaderboard</Link>
                        <Link to="/contact" className="nav-item">Contact</Link>
                    </div>
                </div>

                <div className="nav-right">
                    <div className="search-box">
                        <Search size={16} />
                        <input type="text" placeholder="Search..." />
                    </div>

                    <button onClick={toggleTheme} className="theme-toggle">
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    <Bell size={20} className="nav-icon" />

                    {user ? (
                        <div className="nav-user">
                            <Link to="/profile" className="user-avatar">
                                {user.name?.charAt(0)}
                            </Link>
                            <button onClick={logout} className="logout-icon-btn">
                                <LogOut size={18} />
                            </button>
                        </div>
                    ) : (
                        <div className="auth-btns">
                            <Link to="/login" className="btn btn-outline">Sign In</Link>
                            <Link to="/register" className="btn btn-brand">Register</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
