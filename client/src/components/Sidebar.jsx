import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    BookOpen,
    FileText,
    Terminal,
    User,
    LogOut,
    Trophy,
    BarChart3
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

const Sidebar = () => {
    const { logout, user } = useAuth();

    const menuItems = [
        { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
        { name: 'Resource Hub', icon: <BookOpen size={20} />, path: '/resources' },
        { name: 'Quiz Practice', icon: <FileText size={20} />, path: '/quizzes' },
        { name: 'Interview Prep', icon: <Terminal size={20} />, path: '/interview-prep' },
        { name: 'Leaderboard', icon: <Trophy size={20} />, path: '/leaderboard' },
        { name: 'My Profile', icon: <User size={20} />, path: '/profile' },
    ];

    return (
        <aside className="sidebar glass-panel">
            <div className="sidebar-header">
                <div className="logo-icon">EP</div>
                <h2 className="logo-text">EduPrep</h2>
            </div>

            <nav className="sidebar-nav">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    >
                        {item.icon}
                        <span>{item.name}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="sidebar-footer">
                <div className="user-info">
                    <div className="user-avatar">{user?.name?.charAt(0)}</div>
                    <div className="user-details">
                        <p className="user-name">{user?.name}</p>
                        <p className="user-role">{user?.prepLevel || 'Beginner'}</p>
                    </div>
                </div>
                <button className="logout-btn" onClick={logout}>
                    <LogOut size={18} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
