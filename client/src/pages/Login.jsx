import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to login');
        } finally {
            setLoading(false);
        }
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
                    <h2 style={{ fontSize: '24px' }}>Welcome Back</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Log in to continue your progress</p>
                </div>

                {error && <div style={{ background: 'rgba(239, 71, 67, 0.1)', color: 'var(--error)', padding: '10px', borderRadius: '4px', marginBottom: '20px', fontSize: '14px' }}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            placeholder="e.g. user@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-brand"
                        style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
                        disabled={loading}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div style={{ marginTop: '25px', textAlign: 'center', fontSize: '14px', color: 'var(--text-secondary)' }}>
                    Don't have an account? <Link to="/register" style={{ color: 'var(--brand)', textDecoration: 'none' }}>Register now</Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
