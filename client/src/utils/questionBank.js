export const questionBank = [
    {
        id: 1,
        text: "Which of the following is not a fundamental state of a process in an Operating System?",
        options: ["Running", "Ready", "Waiting", "Executing"],
        correct: "Executing",
        difficulty: "Easy",
        topic: "Operating Systems",
        explanation: "Executing is another word for Running, but 'Running' is the standard state name in OS theory."
    },
    {
        id: 2,
        text: "What is the time complexity of building a heap from an array of n elements?",
        options: ["O(n log n)", "O(n)", "O(log n)", "O(n^2)"],
        correct: "O(n)",
        difficulty: "Hard",
        topic: "Data Structures",
        explanation: "Building a heap takes O(n) time using the bottom-up approach."
    },
    {
        id: 3,
        text: "Which SQL clause is used to filter the results of an aggregate function?",
        options: ["WHERE", "GROUP BY", "HAVING", "ORDER BY"],
        correct: "HAVING",
        difficulty: "Medium",
        topic: "DBMS",
        explanation: "The HAVING clause was added to SQL because the WHERE keyword could not be used with aggregate functions."
    },
    {
        id: 4,
        text: "What is the primary purpose of the 'Critical Section' in concurrent programming?",
        options: ["To maximize CPU usage", "To ensure thread safety by preventing simultaneous access", "To speed up data processing", "To manage memory allocation"],
        correct: "To ensure thread safety by preventing simultaneous access",
        difficulty: "Medium",
        topic: "Operating Systems",
        explanation: "A critical section is a part of a program that accesses a shared resource that must not be concurrently accessed by more than one thread."
    },
    {
        id: 5,
        text: "In a B-Tree, all leaf nodes must be at the same level.",
        options: ["True", "False"],
        correct: "True",
        type: "True/False",
        difficulty: "Medium",
        topic: "Data Structures",
        explanation: "One of the fundamental properties of a B-Tree is that it is perfectly balanced."
    },
    {
        id: 6,
        text: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "High Tech Multi Language", "Hyper Tabular Mail Line", "None of the above"],
        correct: "Hyper Text Markup Language",
        difficulty: "Easy",
        topic: "Web Development",
        explanation: "HTML is the standard markup language for documents designed to be displayed in a web browser."
    },
    {
        id: 7,
        text: "Which layer of the OSI model is responsible for routing?",
        options: ["Physical Layer", "Data Link Layer", "Network Layer", "Transport Layer"],
        correct: "Network Layer",
        difficulty: "Easy",
        topic: "Computer Networks",
        explanation: "The Network Layer (Layer 3) handles routing of data packets."
    },
    {
        id: 8,
        text: "What is the default port for HTTP?",
        options: ["443", "21", "80", "8080"],
        correct: "80",
        difficulty: "Easy",
        topic: "Computer Networks",
        explanation: "Port 80 is the default for unencrypted HTTP traffic."
    }
];
