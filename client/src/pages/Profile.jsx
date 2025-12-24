import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import {
    User,
    Mail,
    MapPin,
    Calendar,
    Award,
    Code2,
    BarChart3,
    TrendingUp,
    Settings
} from 'lucide-react';

const Profile = () => {
    const { user } = useAuth();

    const stats = [
        { label: 'Points', value: user?.points || 0, icon: <Award size={18} />, color: '#ffa116' },
        { label: 'Solved', value: user?.solvedQuestions?.length || 0, icon: <Code2 size={18} />, color: '#2cbb5d' },
        { label: 'Rank', value: '#124', icon: <TrendingUp size={18} />, color: '#fac515' },
        { label: 'Streak', value: user?.dailyStreak || 0, icon: <Zap size={18} />, color: '#ef4743' },
    ];

    return (
        <div className="page-container">
            <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '40px' }}>
                {/* Profile Sidebar */}
                <div className="profile-sidebar">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="card"
                        style={{ textAlign: 'center' }}
                    >
                        <div style={{
                            width: '120px',
                            height: '120px',
                            borderRadius: '24px',
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border)',
                            margin: '0 auto 20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '48px',
                            fontWeight: '700',
                            color: 'var(--brand)'
                        }}>
                            {user?.name?.charAt(0) || 'U'}
                        </div>
                        <h2 style={{ fontSize: '24px', marginBottom: '5px' }}>{user?.name || 'Guest User'}</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '20px' }}>
                            {user?.targetRole || 'Software Development Engineer'}
                        </p>
                        <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>
                            <Settings size={16} /> Edit Profile
                        </button>

                        <div style={{ marginTop: '30px', textAlign: 'left', borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '12px' }}>
                                <Mail size={16} /> {user?.email}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '12px' }}>
                                <MapPin size={16} /> Chennai, India
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-secondary)', fontSize: '14px' }}>
                                <Calendar size={16} /> Joined Dec 2025
                            </div>
                        </div>
                    </motion.div>

                    <div className="card" style={{ marginTop: '24px' }}>
                        <h3 style={{ fontSize: '16px', marginBottom: '16px' }}>My Badges</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                            <div style={{ background: 'var(--bg-card)', padding: '8px', borderRadius: '8px', border: '1px solid var(--border)' }} title="Early Adopter">
                                🚀
                            </div>
                            <div style={{ background: 'var(--bg-card)', padding: '8px', borderRadius: '8px', border: '1px solid var(--border)' }} title="Code Ninja">
                                🥷
                            </div>
                            <div style={{ opacity: 0.3, background: 'var(--bg-card)', padding: '8px', borderRadius: '8px', border: '1px solid var(--border)' }} title="Top Contributor">
                                🏆
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="profile-main">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
                        {stats.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="card"
                                style={{ textAlign: 'center' }}
                            >
                                <div style={{ color: stat.color, marginBottom: '8px', display: 'flex', justifyContent: 'center' }}>
                                    {stat.icon}
                                </div>
                                <h4 style={{ fontSize: '20px', marginBottom: '2px' }}>{stat.value}</h4>
                                <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="card"
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <h3>Activity Overview</h3>
                            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', gap: '15px' }}>
                                <span>Solved: 12</span>
                                <span>Contributions: 5</span>
                            </div>
                        </div>

                        <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '12px', padding: '10px 0' }}>
                            {[3, 5, 2, 8, 4, 6, 9].map((val, i) => (
                                <div key={i} style={{ flex: 1, position: 'relative' }}>
                                    <div style={{
                                        height: `${val * 20}px`,
                                        background: i === 6 ? 'var(--brand)' : 'var(--bg-card)',
                                        border: '1px solid var(--border)',
                                        borderRadius: '4px'
                                    }}></div>
                                    <span style={{ position: 'absolute', bottom: '-25px', left: '50%', transform: 'translateX(-50%)', fontSize: '10px', color: 'var(--text-secondary)' }}>
                                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <div className="card" style={{ marginTop: '40px' }}>
                        <h3>Recent Submissions</h3>
                        <div style={{ marginTop: '20px' }}>
                            <div style={{ padding: '12px 0', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                    <h4 style={{ fontSize: '14px' }}>Two Sum</h4>
                                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Data Structures • 2 hours ago</p>
                                </div>
                                <span className="badge badge-easy">Easy</span>
                            </div>
                            <div style={{ padding: '12px 0', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                    <h4 style={{ fontSize: '14px' }}>Reverse Linked List</h4>
                                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Algorithms • 1 day ago</p>
                                </div>
                                <span className="badge badge-easy">Easy</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
