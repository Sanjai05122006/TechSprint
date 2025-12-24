const mongoose = require('mongoose');
const Question = require('./models/Question');
require('dotenv').config();

const questions = [
    {
        text: 'What is the time complexity of searching in a Balanced Binary Search Tree?',
        options: [
            { text: 'O(n)', isCorrect: false },
            { text: 'O(log n)', isCorrect: true },
            { text: 'O(1)', isCorrect: false },
            { text: 'O(n log n)', isCorrect: false }
        ],
        category: 'Data Structures',
        difficulty: 'Easy',
        explanation: 'In a balanced BST like AVL or Red-Black Tree, the height is logarithmic.'
    },
    {
        text: 'Which of the following is NOT a property of an ACID transaction?',
        options: [
            { text: 'Atomicity', isCorrect: false },
            { text: 'Consistency', isCorrect: false },
            { text: 'Concurrency', isCorrect: true },
            { text: 'Durability', isCorrect: false }
        ],
        category: 'DBMS',
        difficulty: 'Medium',
        explanation: 'ACID stands for Atomicity, Consistency, Isolation, and Durability.'
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/eduprep');
        await Question.deleteMany({});
        await Question.insertMany(questions);
        console.log('✅ Database Seeded successfully!');
        process.exit();
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDB();
