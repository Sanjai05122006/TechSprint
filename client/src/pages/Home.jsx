import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Layout, Book, Trophy, Terminal } from 'lucide-react';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <section className="hero">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="hero-content"
                >
                    <span className="hero-badge">Welcome to StudyStack</span>
                    <h1 className="hero-title">StudyStack</h1>
                    <p className="hero-description">
                        All-in-one platform for notes, PYQs, quizzes, and interview prep — built by students, for students.
                    </p>
                    <div className="hero-actions">
                        <Link to="/login" className="btn btn-brand btn-large">
                            Get Started <ChevronRight size={18} />
                        </Link>
                        <Link to="/contact" className="btn btn-outline btn-large">
                            Contact Us
                        </Link>
                    </div>
                </motion.div>
            </section>

            <section className="features container">
                <div className="features-grid">
                    <div className="feature-card card">
                        <div className="feature-icon"><Book size={24} /></div>
                        <h3>Resource Hub</h3>
                        <p>Access and share notes, PPTs, and previous year question papers categorized by subject and exam.</p>
                    </div>
                    <div className="feature-card card">
                        <div className="feature-icon"><Layout size={24} /></div>
                        <h3>Quiz Engine</h3>
                        <p>Challenge yourself with topic-wise MCQs and track your accuracy across different difficulty levels.</p>
                    </div>
                    <div className="feature-card card">
                        <div className="feature-icon"><Terminal size={24} /></div>
                        <h3>Interview Prep</h3>
                        <p>Curated DSA problems, mock interview generator, and core CS fundamentals all in one place.</p>
                    </div>
                    <div className="feature-card card">
                        <div className="feature-icon"><Trophy size={24} /></div>
                        <h3>Leaderboard</h3>
                        <p>Stay motivated by competing with peers and earning points for your contributions and quiz scores.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
