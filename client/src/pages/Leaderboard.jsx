import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Star, Target, Zap, Clock } from 'lucide-react';

const Leaderboard = () => {
    const topUsers = [
        { rank: 1, name: 'Sanjay S', points: 1250, solved: 45, level: 'Advanced', color: '#ffa116' },
        { rank: 2, name: 'Ananya R', points: 1100, solved: 38, level: 'Advanced', color: '#c0c0c0' },
        { rank: 3, name: 'Rahul K', points: 950, solved: 32, level: 'Intermediate', color: '#cd7f32' },
    ];

    const currentRankings = [
        { rank: 4, name: 'Priya M', points: 880, solved: 28 },
        { rank: 5, name: 'Vikram A', points: 820, solved: 25 },
        { rank: 6, name: 'Sneha L', points: 750, solved: 22 },
        { rank: 7, name: 'Arjun V', points: 710, solved: 20 },
        { rank: 8, name: 'Aditi G', points: 650, solved: 18 },
    ];

    return (
        <div className="page-container">
            <div style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Global Leaderboard</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Compete with top performers and rise through the ranks.</p>
            </div>

            <div className="top-three" style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-end',
                gap: '30px',
                margin: '60px 0',
                padding: '0 20px'
            }}>
                {topUsers.map((user, i) => (
                    <motion.div
                        key={user.rank}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.2 }}
                        className="card"
                        style={{
                            flex: 1,
                            textAlign: 'center',
                            padding: '30px 20px',
                            borderTop: `4px solid ${user.color}`,
                            maxWidth: '280px',
                            height: user.rank === 1 ? '320px' : '280px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                        }}
                    >
                        <div style={{ position: 'relative', width: '80px', height: '80px', margin: '0 auto 20px' }}>
                            <div style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: '50%',
                                background: 'var(--bg-card)',
                                border: `2px solid ${user.color}`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '28px',
                                fontWeight: '700'
                            }}>
                                {user.name.charAt(0)}
                            </div>
                            <div style={{
                                position: 'absolute',
                                bottom: '-10px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                background: user.color,
                                color: '#000',
                                padding: '2px 10px',
                                borderRadius: '12px',
                                fontSize: '12px',
                                fontWeight: '700'
                            }}>
                                Rank {user.rank}
                            </div>
                        </div>
                        <h3 style={{ margin: '10px 0 5px' }}>{user.name}</h3>
                        <p style={{ color: 'var(--brand)', fontWeight: '700', fontSize: '20px' }}>{user.points}</p>
                        <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{user.level} • {user.solved} Solved</p>
                    </motion.div>
                ))}
            </div>

            <div className="card" style={{ padding: '0' }}>
                <div style={{ padding: '20px', borderBottom: '1px solid var(--border)', display: 'grid', gridTemplateColumns: '80px 1fr 150px 150px', color: 'var(--text-secondary)', fontSize: '14px', fontWeight: '600' }}>
                    <span>Rank</span>
                    <span>User</span>
                    <span style={{ textAlign: 'center' }}>Problems Solved</span>
                    <span style={{ textAlign: 'right' }}>Points</span>
                </div>
                {currentRankings.map((user) => (
                    <div key={user.rank} style={{ padding: '20px', borderBottom: '1px solid var(--border)', display: 'grid', gridTemplateColumns: '80px 1fr 150px 150px', alignItems: 'center', transition: 'var(--transition)' }}>
                        <span style={{ fontWeight: '700', color: 'var(--text-secondary)' }}>{user.rank}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>{user.name.charAt(0)}</div>
                            <span style={{ fontWeight: '500' }}>{user.name}</span>
                        </div>
                        <span style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>{user.solved}</span>
                        <span style={{ textAlign: 'right', fontWeight: '700', color: 'var(--text-primary)' }}>{user.points}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Leaderboard;
