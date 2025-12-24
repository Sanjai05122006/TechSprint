/**
 * Intelligent Quiz Generator Logic
 */

export const generateQuiz = (bank, config = {}) => {
    const {
        n = 5,
        difficulty = 'balanced', // 'easy', 'medium', 'hard', 'balanced'
        topics = [] // specific topics to include
    } = config;

    // 1. Filter by topics if specified
    let pool = bank;
    if (topics.length > 0) {
        pool = pool.filter(q => topics.includes(q.topic));
    }

    // 2. Shuffle the entire pool initially
    const shuffledPool = [...pool].sort(() => Math.random() - 0.5);

    // 3. Select N questions based on difficulty balance
    let selected = [];

    if (difficulty === 'balanced') {
        const easy = shuffledPool.filter(q => q.difficulty === 'Easy');
        const medium = shuffledPool.filter(q => q.difficulty === 'Medium');
        const hard = shuffledPool.filter(q => q.difficulty === 'Hard');

        // Distribute N as evenly as possible
        const countPerType = Math.ceil(n / 3);
        selected = [
            ...easy.slice(0, countPerType),
            ...medium.slice(0, countPerType),
            ...hard.slice(0, countPerType)
        ].slice(0, n);
    } else {
        selected = shuffledPool.slice(0, n);
    }

    // 4. Final shuffling to mix difficulty levels
    selected = [...selected].sort(() => Math.random() - 0.5);

    // 5. Ensure no two consecutive questions are from the same topic (if pool allows)
    const reordered = [];
    if (selected.length > 0) {
        reordered.push(selected.shift());
        while (selected.length > 0) {
            let found = false;
            for (let i = 0; i < selected.length; i++) {
                if (selected[i].topic !== reordered[reordered.length - 1].topic) {
                    reordered.push(selected.splice(i, 1)[0]);
                    found = true;
                    break;
                }
            }
            if (!found) reordered.push(selected.shift()); // fallback if no different topic found
        }
    }

    // 6. Shuffle options for each question
    return reordered.map((q, index) => ({
        ...q,
        quizIndex: index + 1,
        options: q.options ? [...q.options].sort(() => Math.random() - 0.5) : null
    }));
};

export const getEvaluationRubric = (questions, answers) => {
    let score = 0;
    const breakdown = questions.map(q => {
        const isCorrect = answers[q.id] === q.correct;
        if (isCorrect) score += 1;
        return {
            id: q.id,
            correct: isCorrect,
            correctAnswer: q.correct,
            explanation: q.explanation
        };
    });

    return {
        score,
        total: questions.length,
        percentage: ((score / questions.length) * 100).toFixed(2),
        breakdown
    };
};
