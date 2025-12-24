import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MessageSquare,
    ThumbsUp,
    Bookmark,
    Share2,
    Send,
    User,
    MoreHorizontal,
    Hash,
    Filter,
    PlusCircle,
    Clock,
    CheckCircle2,
    Trash2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Discussion.css';

const Discussion = () => {
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({ content: '', subject: '', topic: '' });
    const [activeFilter, setActiveFilter] = useState('All');
    const [replyTo, setReplyTo] = useState(null);
    const [replyContent, setReplyContent] = useState('');

    const subjects = ['All', 'Data Structures', 'Operating Systems', 'DBMS', 'Networks', 'Aptitude'];

    // Initial Demo Data
    useEffect(() => {
        const savedPosts = JSON.parse(localStorage.getItem('study_discussions') || '[]');
        if (savedPosts.length === 0) {
            const demoPosts = [
                {
                    id: 1,
                    author: 'Sanjay S',
                    verified: true,
                    content: 'Does anyone have a clear explanation for the difference between a mutex and a binary semaphore? I keep getting confused in OS mock tests.',
                    subject: 'Operating Systems',
                    topic: 'Process Sync',
                    likes: 24,
                    saves: 5,
                    time: '2h ago',
                    replies: [
                        { id: 101, author: 'Ananya R', content: 'Mutex is a locking mechanism (ownership), while Semaphore is a signaling mechanism. Only the thread that locks a mutex can unlock it!', time: '1h ago' }
                    ]
                },
                {
                    id: 2,
                    author: 'Rahul K',
                    verified: false,
                    content: 'Just found this great visualization for AVL tree rotations. Definitely check it out if you are struggling with balancing logic: https://visualgo.net/en/bst',
                    subject: 'Data Structures',
                    topic: 'AVL Trees',
                    likes: 42,
                    saves: 18,
                    time: '5h ago',
                    replies: []
                }
            ];
            setPosts(demoPosts);
            localStorage.setItem('study_discussions', JSON.stringify(demoPosts));
        } else {
            setPosts(savedPosts);
        }
    }, []);

    const handlePostSubmit = (e) => {
        e.preventDefault();
        if (!newPost.content || !newPost.subject || !newPost.topic) return;

        const post = {
            id: Date.now(),
            author: user?.name || 'Guest Student',
            verified: false,
            content: newPost.content,
            subject: newPost.subject,
            topic: newPost.topic,
            likes: 0,
            saves: 0,
            time: 'Just now',
            replies: []
        };

        const updated = [post, ...posts];
        setPosts(updated);
        localStorage.setItem('study_discussions', JSON.stringify(updated));
        setNewPost({ content: '', subject: '', topic: '' });
    };

    const handleLike = (postId) => {
        const updated = posts.map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p);
        setPosts(updated);
        localStorage.setItem('study_discussions', JSON.stringify(updated));
    };

    const handleReply = (postId) => {
        if (!replyContent) return;
        const updated = posts.map(p => {
            if (p.id === postId) {
                return {
                    ...p,
                    replies: [...p.replies, { id: Date.now(), author: user?.name || 'Guest Student', content: replyContent, time: 'Just now' }]
                };
            }
            return p;
        });
        setPosts(updated);
        localStorage.setItem('study_discussions', JSON.stringify(updated));
        setReplyContent('');
        setReplyTo(null);
    };

    const filteredPosts = activeFilter === 'All' ? posts : posts.filter(p => p.subject === activeFilter);

    return (
        <div className="page-container discussion-page">
            <div className="discussion-layout">

                {/* Left Sidebar - Navigation/Filters */}
                <aside className="discussion-sidebar">
                    <div className="card sticky-sidebar">
                        <h3 style={{ marginBottom: '20px', fontSize: '18px' }}>Study Streams</h3>
                        <div className="filter-list">
                            {subjects.map(sub => (
                                <button
                                    key={sub}
                                    className={`filter-item ${activeFilter === sub ? 'active' : ''}`}
                                    onClick={() => setActiveFilter(sub)}
                                >
                                    <Hash size={16} />
                                    <span>{sub}</span>
                                </button>
                            ))}
                        </div>
                        <div style={{ marginTop: '30px', padding: '15px', background: 'rgba(255,161,22,0.05)', borderRadius: '8px', border: '1px solid var(--brand)' }}>
                            <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                                <strong>Pro Tip:</strong> Verified contributors’ posts are highlighted in the feed.
                            </p>
                        </div>
                    </div>
                </aside>

                {/* Main Feed */}
                <main className="discussion-feed">
                    {/* Create Post Section */}
                    <div className="card post-create-card">
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <div className="avatar-small">{user?.name?.charAt(0) || 'U'}</div>
                            <form onSubmit={handlePostSubmit} style={{ flex: 1 }}>
                                <textarea
                                    placeholder="Share a doubt, tip, or resource..."
                                    value={newPost.content}
                                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                                    maxLength={280}
                                />
                                <div className="post-metadata-inputs">
                                    <select
                                        value={newPost.subject}
                                        onChange={(e) => setNewPost({ ...newPost, subject: e.target.value })}
                                        required
                                    >
                                        <option value="">Select Subject</option>
                                        {subjects.filter(s => s !== 'All').map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                    <input
                                        type="text"
                                        placeholder="Topic Tag (e.g. Recursion)"
                                        value={newPost.topic}
                                        onChange={(e) => setNewPost({ ...newPost, topic: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="post-actions-bar">
                                    <span className="char-count">{newPost.content.length}/280</span>
                                    <button type="submit" className="btn btn-brand" disabled={!newPost.content || !newPost.subject}>
                                        <Send size={16} />
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="feed-separator">
                        <span>Recent Academic Discussions</span>
                    </div>

                    <div className="posts-container">
                        <AnimatePresence>
                            {filteredPosts.map(post => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={post.id}
                                    className="card post-card"
                                >
                                    <div className="post-header">
                                        <div className="post-author-info">
                                            <div className="avatar-small">{post.author.charAt(0)}</div>
                                            <div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                    <span className="author-name">{post.author}</span>
                                                    {post.verified && <CheckCircle2 size={14} color="var(--brand)" />}
                                                </div>
                                                <span className="post-time">{post.time}</span>
                                            </div>
                                        </div>
                                        <div className="post-subject-tag">
                                            <span className="subject-pill">{post.subject}</span>
                                            <span className="topic-pill">#{post.topic}</span>
                                        </div>
                                    </div>

                                    <div className="post-content">
                                        {post.content}
                                    </div>

                                    <div className="post-footer">
                                        <button className="post-action-btn" onClick={() => handleLike(post.id)}>
                                            <ThumbsUp size={18} />
                                            <span>{post.likes}</span>
                                        </button>
                                        <button className="post-action-btn" onClick={() => setReplyTo(replyTo === post.id ? null : post.id)}>
                                            <MessageSquare size={18} />
                                            <span>{post.replies.length}</span>
                                        </button>
                                        <button className="post-action-btn">
                                            <Bookmark size={18} />
                                        </button>
                                        <button className="post-action-btn">
                                            <Share2 size={18} />
                                        </button>
                                    </div>

                                    {/* Replies Section */}
                                    {(replyTo === post.id || post.replies.length > 0) && (
                                        <div className="replies-section">
                                            {post.replies.map(reply => (
                                                <div key={reply.id} className="reply-item">
                                                    <div className="reply-avatar">{reply.author.charAt(0)}</div>
                                                    <div className="reply-body">
                                                        <div className="reply-header">
                                                            <span className="reply-author">{reply.author}</span>
                                                            <span className="reply-time">{reply.time}</span>
                                                        </div>
                                                        <div className="reply-content">{reply.content}</div>
                                                    </div>
                                                </div>
                                            ))}

                                            {replyTo === post.id && (
                                                <div className="reply-input-box">
                                                    <input
                                                        autoFocus
                                                        placeholder="Write an academic reply..."
                                                        value={replyContent}
                                                        onChange={(e) => setReplyContent(e.target.value)}
                                                    />
                                                    <button onClick={() => handleReply(post.id)}>
                                                        <Send size={16} />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </main>

                {/* Right Sidebar - Trends/Announcements */}
                <aside className="discussion-sidebar right">
                    <div className="card">
                        <h3 style={{ fontSize: '16px', marginBottom: '15px' }}>Trending Topics</h3>
                        <div className="trend-items">
                            <div className="trend-item">
                                <span className="trend-subject">Operating Systems</span>
                                <span className="trend-tag">#PageReplacement</span>
                                <span className="trend-count">42 Doubts</span>
                            </div>
                            <div className="trend-item">
                                <span className="trend-subject">Data Structures</span>
                                <span className="trend-tag">#DynamicProgramming</span>
                                <span className="trend-count">128 Tips</span>
                            </div>
                        </div>
                    </div>

                    <div className="card" style={{ marginTop: '20px' }}>
                        <h3 style={{ fontSize: '16px', marginBottom: '10px' }}>Community Guidelines</h3>
                        <ul style={{ fontSize: '13px', color: 'var(--text-secondary)', paddingLeft: '15px', lineHeight: '1.6' }}>
                            <li>Academic content only</li>
                            <li>Be helpful or curious</li>
                            <li>No spam or off-topic memes</li>
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default Discussion;
