import React from 'react';
import { motion } from 'framer-motion';
import {
    Code2,
    Database,
    Globe,
    Users,
    Star,
    ChevronRight,
    ExternalLink,
    ShieldCheck
} from 'lucide-react';

const InterviewPrep = () => {
    const categories = [
        { title: 'Data Structures & Algorithms', icon: <Code2 size={24} />, color: '#6366f1', count: 450 },
        { title: 'System Design', icon: <Globe size={24} />, color: '#10b981', count: 85 },
        { title: 'Core Subjects (OS, DBMS, CN)', icon: <Database size={24} />, color: '#f59e0b', count: 120 },
        { title: 'HR & Behavioral', icon: <Users size={24} />, color: '#ec4899', count: 50 },
    ];

    const featuredProblems = [
        {
            name: 'Two Sum',
            platform: 'LeetCode',
            diff: 'Easy',
            tags: ['Arrays', 'Hash Map'],
            url: 'https://leetcode.com/problems/two-sum/'
        },
        {
            name: 'Reverse Linked List',
            platform: 'LeetCode',
            diff: 'Easy',
            tags: ['Linked List'],
            url: 'https://leetcode.com/problems/reverse-linked-list/'
        },
        {
            name: 'Trapping Rain Water',
            platform: 'LeetCode',
            diff: 'Hard',
            tags: ['Dynamic Programming', 'Two Pointers'],
            url: 'https://leetcode.com/problems/trapping-rain-water/'
        },
    ];

    return (
        <div className="page-container">
            <header className="page-header" style={{ marginBottom: '40px' }}>
                <div>
                    <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Interview Mastery</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Structured roadmaps and curated questions for SDE roles.</p>
                </div>
                <button className="btn btn-brand">
                    <Star size={18} />
                    <span>Practice Mock Session</span>
                </button>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                <section>
                    <h3 style={{ marginBottom: '20px', fontSize: '18px' }}>Preparation Topics</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {categories.map((topic, i) => (
                            <div key={i} className="card" style={{ display: 'flex', alignItems: 'center', gap: '20px', cursor: 'pointer', transition: 'var(--transition)' }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: `${topic.color}20`,
                                    color: topic.color
                                }}>
                                    {topic.icon}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ fontSize: '16px' }}>{topic.title}</h4>
                                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{topic.count}+ Questions</p>
                                </div>
                                <ChevronRight size={18} color="var(--text-secondary)" />
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '18px' }}>Trending Problems</h3>
                        <button className="btn btn-outline sm">Explore All</button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '30px' }}>
                        {featuredProblems.map((prob, i) => (
                            <div key={i} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div style={{
                                        width: '16px',
                                        height: '16px',
                                        borderRadius: '4px',
                                        border: '2px solid var(--border)',
                                        background: i === 0 ? 'var(--success)' : 'transparent',
                                        borderColor: i === 0 ? 'var(--success)' : 'var(--border)'
                                    }}></div>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <h4 style={{ fontSize: '15px' }}>{prob.name}</h4>
                                            {prob.platform === 'LeetCode' && (
                                                <ShieldCheck size={14} color="var(--brand)" title="Verified LeetCode Link" />
                                            )}
                                        </div>
                                        <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                                            {prob.platform} • {prob.tags.join(', ')}
                                        </p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <span className={`badge badge-${prob.diff.toLowerCase()}`}>{prob.diff}</span>
                                    <a
                                        href={prob.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="icon-btn"
                                    >
                                        <ExternalLink size={18} />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="card" style={{ background: 'rgba(255, 161, 22, 0.05)', border: '1px dashed var(--brand)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h4 style={{ marginBottom: '4px' }}>Ready for a Mock Interview?</h4>
                            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Randomly generate 3 questions across categories.</p>
                        </div>
                        <button className="btn btn-brand sm">Generate Now</button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default InterviewPrep;
