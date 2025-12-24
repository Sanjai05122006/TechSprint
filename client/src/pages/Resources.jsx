import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Filter,
    Plus,
    FileText,
    ArrowBigUp,
    ArrowBigDown,
    MoreVertical,
    ExternalLink,
    X,
    Download,
    Eye,
    Link as LinkIcon,
    Globe
} from 'lucide-react';
import './Resources.css';

const Resources = () => {
    const [resources, setResources] = useState([]);
    const [activeTab, setActiveTab] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [previewResource, setPreviewResource] = useState(null);

    const [formData, setFormData] = useState({
        title: '',
        subject: '',
        type: 'PDF',
        link: '',
        file: null
    });

    const categories = ['All', 'End-Sem', 'Placements', 'GATE', 'Notes'];

    // Initialize with some demo data if empty
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('study_resources') || '[]');
        if (stored.length === 0) {
            const demoData = [
                {
                    id: 1,
                    title: 'Database Management Systems - Handwritten Notes',
                    type: 'PDF',
                    subject: 'DBMS',
                    uploader: 'Rahul Kumar',
                    votes: 124,
                    tags: ['Notes', 'Semester 4'],
                    time: '1 day ago',
                    link: '#'
                },
                {
                    id: 2,
                    title: 'Top 50 DSA Interview Questions - Google/Amazon',
                    type: 'Link',
                    subject: 'DSA',
                    uploader: 'Placement Cell',
                    votes: 256,
                    tags: ['LeetCode', 'Placements'],
                    time: '3 hours ago',
                    link: 'https://leetcode.com/problemset/all/'
                }
            ];
            setResources(demoData);
            localStorage.setItem('study_resources', JSON.stringify(demoData));
        } else {
            setResources(stored);
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'file') {
            setFormData(prev => ({ ...prev, file: files[0] }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simple Validation
        if (!formData.title || !formData.subject) {
            alert('Please fill in title and subject');
            return;
        }

        const newResource = {
            id: Date.now(),
            title: formData.title,
            type: formData.type,
            subject: formData.subject,
            uploader: 'Me (You)',
            votes: 0,
            tags: [formData.type, formData.subject],
            time: 'Just now',
            link: formData.link || (formData.file ? URL.createObjectURL(formData.file) : '#'),
            isLocalFile: !!formData.file
        };

        const updated = [newResource, ...resources];
        setResources(updated);
        localStorage.setItem('study_resources', JSON.stringify(updated));

        // Reset and Close
        setFormData({ title: '', subject: '', type: 'PDF', link: '', file: null });
        setIsUploadModalOpen(false);
    };

    const filteredResources = resources.filter(res => {
        const matchesTab = activeTab === 'All' || res.tags.includes(activeTab) || res.subject === activeTab;
        const matchesSearch = res.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            res.subject.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesTab && matchesSearch;
    });

    const isLeetCode = (url) => url && url.includes('leetcode.com');

    return (
        <div className="page-container">
            <header className="page-header">
                <div>
                    <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Resource Explorer</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Download notes, PYQs, and specialized prep material.</p>
                </div>
                <button className="btn btn-brand" onClick={() => setIsUploadModalOpen(true)}>
                    <Plus size={18} />
                    <span>Upload Study Material</span>
                </button>
            </header>

            <div className="hub-controls" style={{ marginTop: '30px' }}>
                <div className="search-bar card">
                    <Search size={18} color="var(--text-secondary)" />
                    <input
                        type="text"
                        placeholder="Search problems, subjects, or notes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="filter-tabs">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`tab-btn ${activeTab === cat ? 'active' : ''}`}
                            onClick={() => setActiveTab(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="resources-grid">
                {filteredResources.map((res) => (
                    <motion.div
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        key={res.id}
                        className="card resource-card"
                    >
                        <div className="card-top">
                            <div className="res-icon" style={{
                                background: 'var(--bg-card)',
                                width: '40px',
                                height: '40px',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {res.type === 'PDF' ? <FileText size={20} color="#ef4444" /> :
                                    res.type === 'Link' ? <LinkIcon size={20} color="var(--brand)" /> :
                                        <Globe size={20} color="#3b82f6" />}
                            </div>
                            <div className="res-meta">
                                <h4>{res.title}</h4>
                                <p style={{ fontSize: '12px' }}>{res.subject} • {res.uploader} • {res.time}</p>
                            </div>
                            {isLeetCode(res.link) && (
                                <div className="leetcode-verify" title="Verified LeetCode Link">
                                    <span className="badge badge-easy" style={{ fontSize: '10px' }}>LeetCode</span>
                                </div>
                            )}
                        </div>

                        <div className="res-tags">
                            {res.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                        </div>

                        <div className="card-footer">
                            <div className="vote-controls">
                                <button className="vote-btn"><ArrowBigUp size={18} /></button>
                                <span>{res.votes}</span>
                                <button className="vote-btn"><ArrowBigDown size={18} /></button>
                            </div>
                            <div className="action-btns" style={{ display: 'flex', gap: '8px' }}>
                                {res.type === 'PDF' && (
                                    <>
                                        <button className="btn btn-outline sm" onClick={() => setPreviewResource(res)}>
                                            <Eye size={14} /> Preview
                                        </button>
                                        <a href={res.link} download={`${res.title}.pdf`} className="btn btn-brand sm">
                                            <Download size={14} />
                                        </a>
                                    </>
                                )}
                                {res.type === 'Link' && (
                                    <a
                                        href={res.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-brand sm"
                                    >
                                        Open <ExternalLink size={14} style={{ marginLeft: '4px' }} />
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Upload Modal */}
            <AnimatePresence>
                {isUploadModalOpen && (
                    <div className="modal-overlay" onClick={() => setIsUploadModalOpen(false)}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="card modal-content"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="modal-header">
                                <h3>Upload New Resource</h3>
                                <button className="icon-btn" onClick={() => setIsUploadModalOpen(false)}><X size={20} /></button>
                            </div>
                            <form onSubmit={handleSubmit} className="upload-form">
                                <div className="form-group">
                                    <label>Resource Title</label>
                                    <input
                                        name="title"
                                        type="text"
                                        placeholder="e.g. Operating Systems PYQ 2023"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Subject</label>
                                    <input
                                        name="subject"
                                        type="text"
                                        placeholder="e.g. OS, DBMS, DSA"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Type</label>
                                    <select name="type" value={formData.type} onChange={handleInputChange}>
                                        <option value="PDF">PDF Document</option>
                                        <option value="PPT">PPT Presentation</option>
                                        <option value="Link">External Link (LeetCode/Web)</option>
                                    </select>
                                </div>

                                {formData.type === 'Link' ? (
                                    <div className="form-group">
                                        <label>Link URL</label>
                                        <input
                                            name="link"
                                            type="url"
                                            placeholder="https://leetcode.com/..."
                                            value={formData.link}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                ) : (
                                    <div className="form-group">
                                        <label>File Upload</label>
                                        <input
                                            name="file"
                                            type="file"
                                            accept=".pdf,.ppt,.pptx,.doc,.docx"
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                )}

                                <button type="submit" className="btn btn-brand" style={{ width: '100%', justifyContent: 'center', marginTop: '10px', padding: '12px' }}>
                                    Publish Resource
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* PDF Preview Modal */}
            <AnimatePresence>
                {previewResource && (
                    <div className="modal-overlay" onClick={() => setPreviewResource(null)}>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="card preview-modal"
                            onClick={e => e.stopPropagation()}
                            style={{ width: '90%', height: '90%', maxWidth: '1000px' }}
                        >
                            <div className="modal-header">
                                <h3>{previewResource.title}</h3>
                                <button className="icon-btn" onClick={() => setPreviewResource(null)}><X size={20} /></button>
                            </div>
                            {previewResource.link === '#' ? (
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                                    <FileText size={64} color="var(--text-secondary)" />
                                    <p style={{ marginTop: '20px' }}>Demo PDF files cannot be previewed in mock mode.</p>
                                </div>
                            ) : (
                                <iframe
                                    src={previewResource.link}
                                    title="PDF Preview"
                                    style={{ width: '100%', height: 'calc(100% - 60px)', border: 'none', background: 'white', borderRadius: '4px' }}
                                ></iframe>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Resources;
