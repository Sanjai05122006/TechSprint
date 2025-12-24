import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Trophy,
    Clock,
    ArrowRight,
    CheckCircle,
    AlertCircle,
    Play,
    RotateCcw,
    Award,
    ChevronRight,
    BookOpen,
    Sparkles,
    FileUp,
    Search,
    Zap
} from 'lucide-react';
import { questionBank } from '../utils/questionBank';
import { generateQuiz, getEvaluationRubric } from '../utils/quizUtils';
import './Quizzes.css';

const Quizzes = () => {
    const [activeQuiz, setActiveQuiz] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const [evaluation, setEvaluation] = useState(null);

    // Magic Quiz State
    const [magicInput, setMagicInput] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const startQuiz = (topic = null, isMagic = false) => {
        setIsProcessing(true);

        // Simulate AI extraction delay for "Magic" mode
        setTimeout(() => {
            const config = {
                n: 5,
                difficulty: 'balanced',
                topics: topic ? [topic] : []
            };

            // Generate randomized quiz
            const quiz = generateQuiz(questionBank, config);

            setActiveQuiz(quiz);
            setCurrentQuestionIndex(0);
            setAnswers({});
            setShowResults(false);
            setTimeLeft(10 * 60);
            setEvaluation(null);
            setIsProcessing(false);
            setMagicInput('');
        }, isMagic ? 2000 : 0);
    };

    useEffect(() => {
        let timer;
        if (activeQuiz && timeLeft > 0 && !showResults) {
            timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        handleQuizFinish();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [activeQuiz, timeLeft, showResults]);

    const handleAnswer = (questionId, option) => {
        setAnswers(prev => ({ ...prev, [questionId]: option }));
    };

    const handleQuizFinish = () => {
        const results = getEvaluationRubric(activeQuiz, answers);
        setEvaluation(results);
        setShowResults(true);
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const quizCategories = [
        { title: 'Data Structures', icon: '🌲', topic: 'Data Structures' },
        { title: 'Algorithms', icon: '⚡', topic: 'Algorithms' },
        { title: 'Operating Systems', icon: '⚙️', topic: 'Operating Systems' },
        { title: 'Aptitude', icon: '🔢', topic: 'Aptitude' },
        { title: 'DBMS', icon: '🗄️', topic: 'DBMS' },
        { title: 'Computer Networks', icon: '🌐', topic: 'Computer Networks' },
    ];

    if (activeQuiz && !showResults) {
        const currentQ = activeQuiz[currentQuestionIndex];
        return (
            <div className="page-container">
                <div className="quiz-active-header">
                    <div>
                        <span className="badge badge-easy" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
                            StudyStack Adaptive Quiz
                        </span>
                        <h2 style={{ marginTop: '10px' }}>Question {currentQuestionIndex + 1} of {activeQuiz.length}</h2>
                    </div>
                    <div className="quiz-timer card">
                        <Clock size={18} />
                        <span>Time Left: {formatTime(timeLeft)}</span>
                    </div>
                </div>

                <div className="quiz-progress-bar">
                    <div
                        className="quiz-progress-fill"
                        style={{ width: `${((currentQuestionIndex + 1) / activeQuiz.length) * 100}%` }}
                    ></div>
                </div>

                <motion.div
                    key={currentQuestionIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="card quiz-question-card"
                    style={{ marginTop: '30px', padding: '40px' }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                        <span className={`badge badge-${currentQ.difficulty.toLowerCase()}`}>{currentQ.difficulty}</span>
                        <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{currentQ.topic}</span>
                    </div>

                    <h3 style={{ fontSize: '20px', marginBottom: '30px', lineHeight: '1.5' }}>{currentQ.text}</h3>

                    <div className="options-grid" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {currentQ.options.map((opt, i) => (
                            <button
                                key={i}
                                className={`option-btn ${answers[currentQ.id] === opt ? 'selected' : ''}`}
                                onClick={() => handleAnswer(currentQ.id, opt)}
                            >
                                <div className="option-label">{String.fromCharCode(65 + i)}</div>
                                <div className="option-text">{opt}</div>
                            </button>
                        ))}
                    </div>

                    <div className="quiz-actions" style={{ marginTop: '40px', display: 'flex', justifyContent: 'space-between' }}>
                        <button
                            className="btn btn-outline"
                            disabled={currentQuestionIndex === 0}
                            onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                        >
                            Previous
                        </button>
                        {currentQuestionIndex === activeQuiz.length - 1 ? (
                            <button className="btn btn-brand" onClick={handleQuizFinish}>
                                Finish Quiz
                            </button>
                        ) : (
                            <button
                                className="btn btn-brand"
                                onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                            >
                                Next Question <ArrowRight size={18} />
                            </button>
                        )}
                    </div>
                </motion.div>
            </div>
        );
    }

    if (showResults) {
        return (
            <div className="page-container">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="card results-card"
                    style={{ textAlign: 'center', padding: '50px' }}
                >
                    <div className="medal-icon">
                        <Award size={64} color="var(--brand)" />
                    </div>
                    <h1 style={{ fontSize: '48px', margin: '20px 0' }}>{evaluation.percentage}%</h1>
                    <h2 style={{ marginBottom: '10px' }}>Quiz Completed!</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        You patterns indicate {evaluation.score} correct answers out of {evaluation.total} questions.
                    </p>

                    <div className="result-stats" style={{ display: 'flex', justifyContent: 'center', gap: '30px', margin: '40px 0' }}>
                        <div className="stat">
                            <h4>{formatTime(600 - timeLeft)}</h4>
                            <p>Time Taken</p>
                        </div>
                        <div className="stat">
                            <h4>{evaluation.score}/{evaluation.total}</h4>
                            <p>Score</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                        <button className="btn btn-brand" onClick={() => setActiveQuiz(null)}>
                            Return to Quizzes
                        </button>
                        <button className="btn btn-outline" onClick={() => startQuiz()}>
                            Try New Quiz <RotateCcw size={16} />
                        </button>
                    </div>
                </motion.div>

                <div style={{ marginTop: '40px' }}>
                    <h3>Review Answers</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
                        {activeQuiz.map((q, i) => (
                            <div key={i} className="card" style={{ padding: '20px', borderLeft: `4px solid ${answers[q.id] === q.correct ? 'var(--success)' : 'var(--error)'}` }}>
                                <p style={{ fontWeight: '600', marginBottom: '10px' }}>{i + 1}. {q.text}</p>
                                <p style={{ fontSize: '14px', marginBottom: '5px' }}>
                                    Your answer: <span style={{ color: answers[q.id] === q.correct ? 'var(--success)' : 'var(--error)' }}>{answers[q.id] || 'Not answered'}</span>
                                </p>
                                {answers[q.id] !== q.correct && (
                                    <p style={{ fontSize: '14px', color: 'var(--success)' }}>Correct answer: {q.correct}</p>
                                )}
                                <div style={{ marginTop: '10px', padding: '10px', background: 'var(--bg-card)', borderRadius: '4px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                                    <strong>Explanation:</strong> {q.explanation}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container">
            <header className="page-header" style={{ marginBottom: '40px' }}>
                <div>
                    <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Brain Training</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Intelligent randomized quizzes based on StudyStack resources.</p>
                </div>
                <button className="btn btn-brand" onClick={() => startQuiz()}>
                    <Play size={18} />
                    <span>Quick Start (Mixed)</span>
                </button>
            </header>

            {/* Magic Search Bar Section */}
            <section className="card magic-search-section" style={{ marginBottom: '40px', padding: '30px', background: 'var(--bg-card)', border: '2px dashed var(--brand)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-10px', right: '-10px', opacity: 0.1 }}>
                    <Zap size={120} color="var(--brand)" />
                </div>

                <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                    <Sparkles color="var(--brand)" size={20} />
                    Magic Quiz Generator
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '20px' }}>
                    Paste a YouTube URL, link, or upload a PDF/PPT. Our AI will generate a customized quiz instantly.
                </p>

                <div className="magic-input-wrapper" style={{ display: 'flex', gap: '10px' }}>
                    <div style={{ flex: 1, position: 'relative' }}>
                        <Search size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                        <input
                            type="text"
                            placeholder="Paste YouTube/Web URL or type topic..."
                            value={magicInput}
                            onChange={(e) => setMagicInput(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '14px 14px 14px 45px',
                                background: 'var(--bg-surface)',
                                border: '1px solid var(--border)',
                                borderRadius: '8px',
                                color: 'var(--text-primary)',
                                outline: 'none'
                            }}
                        />
                    </div>

                    <label className="btn btn-outline" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FileUp size={18} />
                        <span>Upload File</span>
                        <input type="file" style={{ display: 'none' }} accept=".pdf,.docx,.ppt,.pptx" onChange={() => startQuiz(null, true)} />
                    </label>

                    <button
                        className="btn btn-brand"
                        disabled={!magicInput || isProcessing}
                        onClick={() => startQuiz(null, true)}
                    >
                        {isProcessing ? 'Analyzing...' : 'Generate Quiz'}
                    </button>
                </div>

                {isProcessing && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ marginTop: '15px', color: 'var(--brand)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                        <div className="loader-dots"><span>.</span><span>.</span><span>.</span></div>
                        Processing source content... Initializing AI extraction...
                    </motion.div>
                )}
            </section>

            <div className="quiz-grid">
                {quizCategories.map((quiz, i) => (
                    <div key={i} className="card quiz-card" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <div className="quiz-card-icon" style={{ fontSize: '32px', marginBottom: '10px' }}>{quiz.icon}</div>
                        <h3 style={{ fontSize: '18px' }}>{quiz.title}</h3>
                        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', flex: 1 }}>
                            Randomly selected questions specifically focusing on {quiz.title} concepts.
                        </p>
                        <div className="quiz-card-footer" style={{ borderTop: '1px solid var(--border)', paddingTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span className="badge badge-medium">10-15 Min</span>
                            <button
                                className="btn-start"
                                onClick={() => startQuiz(quiz.topic)}
                                style={{ background: 'none', border: 'none', color: 'var(--brand)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: '600' }}
                            >
                                Launch <Play size={14} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <section className="card practice-modes" style={{ marginTop: '40px', padding: '30px' }}>
                <h3 style={{ marginBottom: '20px' }}>Evaluation Rubric</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                    <div style={{ textAlign: 'center' }}>
                        <CheckCircle color="var(--success)" size={32} style={{ marginBottom: '10px' }} />
                        <h4 style={{ fontSize: '15px' }}>Instant Correction</h4>
                        <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Detailed explanations for every answer.</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <Award color="var(--brand)" size={32} style={{ marginBottom: '10px' }} />
                        <h4 style={{ fontSize: '15px' }}>Adaptive Difficulty</h4>
                        <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Balanced mix of easy, medium, and hard.</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <BookOpen color="#3b82f6" size={32} style={{ marginBottom: '10px' }} />
                        <h4 style={{ fontSize: '15px' }}>Resource Aligned</h4>
                        <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Directly related to StudyStack materials.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Quizzes;
