import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        collegeId: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await register(formData);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to register');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="auth-container">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card auth-card"
            >
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <div className="logo-icon" style={{ margin: '0 auto 15px', width: '40px', height: '40px', fontSize: '18px' }}>EP</div>
                    <h2 style={{ fontSize: '24px' }}>Create Account</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Join the community today</p>
                </div>

                {error && <div style={{ background: 'rgba(239, 71, 67, 0.1)', color: 'var(--error)', padding: '10px', borderRadius: '4px', marginBottom: '20px', fontSize: '14px' }}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name</label>
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
                        <label>Email Address</label>
                        <input
                            name="email"
                            type="email"
                            placeholder="e.g. user@college.edu"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>College ID (Optional)</label>
                        <input
                            name="collegeId"
                            type="text"
                            placeholder="e.g. SSN12345"
                            value={formData.collegeId}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-brand"
                        style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
                        disabled={loading}
                    >
                        {loading ? 'Creating account...' : 'Create Account'}
                    </button>
                </form>

                <div style={{ marginTop: '25px', textAlign: 'center', fontSize: '14px', color: 'var(--text-secondary)' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--brand)', textDecoration: 'none' }}>Sign In</Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
