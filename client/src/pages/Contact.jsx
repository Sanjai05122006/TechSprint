import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Mail, User, MessageSquare, Send } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState({ type: '', msg: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', msg: '' });

        try {
            await axios.post('http://localhost:5000/api/contact', formData);
            setStatus({ type: 'success', msg: 'Message sent successfully! We will get back to you soon.' });
            setFormData({ name: '', email: '', message: '' });
        } catch (err) {
            setStatus({ type: 'error', msg: 'Failed to send message. Please try again later.' });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="auth-container" style={{ padding: '60px 20px' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card"
                style={{ width: '100%', maxWidth: '600px' }}
            >
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '32px', marginBottom: '10px' }}>Contact Us</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Have a question or feedback? We'd love to hear from you.
                    </p>
                </div>

                {status.msg && (
                    <div style={{
                        background: status.type === 'success' ? 'rgba(44, 187, 93, 0.1)' : 'rgba(239, 71, 67, 0.1)',
                        color: status.type === 'success' ? 'var(--success)' : 'var(--error)',
                        padding: '12px',
                        borderRadius: '6px',
                        marginBottom: '20px',
                        fontSize: '14px',
                        textAlign: 'center'
                    }}>
                        {status.msg}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <User size={14} /> Full Name
                        </label>
                        <input
                            name="name"
                            type="text"
                            placeholder="e.g. John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Mail size={14} /> Email Address
                        </label>
                        <input
                            name="email"
                            type="email"
                            placeholder="e.g. john@college.edu"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <MessageSquare size={14} /> Message
                        </label>
                        <textarea
                            name="message"
                            rows="5"
                            placeholder="What's on your mind?"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '12px',
                                background: 'var(--bg-card)',
                                border: '1px solid var(--border)',
                                border_radius: '6px',
                                color: 'var(--text-primary)',
                                outline: 'none',
                                resize: 'none'
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-brand"
                        style={{ width: '100%', justifyContent: 'center', padding: '14px' }}
                        disabled={loading}
                    >
                        <Send size={18} />
                        {loading ? 'Sending...' : 'Send Message'}
                    </button>
                </form>

                <div style={{ marginTop: '40px', paddingTop: '30px', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                        College Project: Built with ❤️ by StudyStack Team
                    </p>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '5px' }}>
                        support@studystack.edu
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Contact;
