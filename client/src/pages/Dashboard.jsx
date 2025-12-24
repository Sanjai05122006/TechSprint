import React from 'react';
import { motion } from 'framer-motion';
import {
    Zap,
    Clock,
    CheckCircle2,
    TrendingUp,
    BookOpen,
    HelpCircle
} from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
    const stats = [
        { title: 'Questions Solved', value: '124', icon: <CheckCircle2 color="#22c55e" />, trend: '+12% this week' },
        { title: 'Quiz Accuracy', value: '88%', icon: <Zap color="#eab308" />, trend: '+5% improvement' },
        { title: 'Study Hours', value: '42h', icon: <Clock color="#6366f1" />, trend: 'Streak: 5 days' },
        { title: 'Community Rank', value: '#12', icon: <TrendingUp color="#ec4899" />, trend: 'Top 5%' }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="dashboard-content"
        >
            <header className="dashboard-header">
                <div>
                    <h1>Welcome back, Sanjay! 👋</h1>
                    <p className="subtitle">Here's your preparation overview for today.</p>
                </div>
                <button className="btn-primary">
                    <Zap size={18} />
                    <span>Resume Daily Plan</span>
                </button>
            </header>

            <section className="stats-grid">
                {stats.map((stat, index) => (
                    <div key={index} className="glass-card stat-card">
                        <div className="stat-icon">{stat.icon}</div>
                        <div className="stat-info">
                            <p className="stat-title">{stat.title}</p>
                            <h3>{stat.value}</h3>
                            <span className="stat-trend">{stat.trend}</span>
                        </div>
                    </div>
                ))}
            </section>

            <div className="dashboard-main-grid">
                <section className="glass-panel activity-section">
                    <div className="section-header">
                        <h3>Recent Activity</h3>
                        <button className="text-btn">View All</button>
                    </div>
                    <div className="activity-list">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="activity-item">
                                <div className="activity-indicator"></div>
                                <div className="activity-details">
                                    <p className="activity-text">Completed <b>Arrays & Hashing</b> Quiz</p>
                                    <p className="activity-time">2 hours ago</p>
                                </div>
                                <div className="activity-badge">DSA</div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="glass-panel recommendations-section">
                    <h3>Smart Recommendations</h3>
                    <div className="rec-list">
                        <div className="rec-card glass-panel">
                            <div className="rec-icon"><BookOpen size={20} /></div>
                            <div>
                                <h4>Operating Systems Notes</h4>
                                <p>Based on your upcoming End-Sem exams</p>
                            </div>
                        </div>
                        <div className="rec-card glass-panel">
                            <div className="rec-icon"><HelpCircle size={20} /></div>
                            <div>
                                <h4>Practice Graph Theory</h4>
                                <p>Improve your weak areas in DSA</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </motion.div>
    );
};

export default Dashboard;
