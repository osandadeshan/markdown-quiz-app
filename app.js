require('dotenv').config();
const express = require('express');
const session = require('express-session');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET, // Replace with a secure random string
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Middleware to parse URL-encoded data and serve static files
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Simple user authentication (hardcoded credentials)
const validUsername = 'user';
const validPassword = 'password';

// Serve the root page
app.get('/', (req, res) => {
    res.redirect('/login'); // Redirect to login page
});

// Serve login page
app.get('/login', (req, res) => {
    res.send(`
        <link rel="stylesheet" href="/styles.css">
        <div class="container">
            <h1>Login</h1>
            <form action="/login" method="POST">
                <label>Username:</label>
                <input type="text" name="username" required>
                <label>Password:</label>
                <input type="password" name="password" required>
                <button type="submit">Login</button>
            </form>
        </div>
    `);
});

// Handle login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === validUsername && password === validPassword) {
        req.session.user = { username }; // Store user in session
        res.redirect('/quizzes'); // Redirect to quizzes page after login
    } else {
        res.send('Invalid credentials. <a href="/login">Try again</a>');
    }
});

function isAuthenticated(req, res, next) {
    if (req.session.user) { // Check if user is logged in
        return next(); // User is authenticated, proceed to the next middleware/route
    } else {
        res.redirect('/login'); // Redirect to login if not authenticated
    }
}

// Serve the quizzes list
app.get('/quizzes', isAuthenticated, (req, res) => {
    const quizFiles = fs.readdirSync(path.join(__dirname, 'quizzes'));
    res.send(`
        <link rel="stylesheet" href="/styles.css">
        <h1>Available Quizzes</h1>
        <ul>
            ${quizFiles.map(file => `<li><a href="/quiz/${file}">${file}</a></li>`).join('')}
        </ul>
    `);
});

function preventBackNavigation(req, res, next) {
    if (req.session.submittedQuiz) {
        return res.redirect('/results'); // Redirect to results if quiz has been submitted
    }
    next(); // Otherwise, proceed to the quiz page
}


// Serve the selected quiz
app.get('/quiz/:quizFile', isAuthenticated, (req, res) => {
    const quizFile = req.params.quizFile;
    const filePath = path.join(__dirname, 'quizzes', quizFile);
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(404).send('Quiz not found');
        }

        const questions = parseMarkdown(data);
        res.send(`
            <link rel="stylesheet" href="/styles.css">
            <div class="container">
            <h1>Quiz: ${quizFile.replace('.md', '')}</h1>
            <form action="/submit" method="POST" onsubmit="disableBackNavigation()">
                <input type="hidden" name="quizFile" value="${quizFile}">
                ${questions.map((q, index) => renderQuestion(q, index)).join('')}
                <div class="button-container">
                    <a href="/quizzes">Back to Quizzes</a>
                    <button type="submit">Submit</button>
                </div>
            </form>
            <script>
                function disableBackNavigation() {
                    // Use replaceState to prevent navigation
                    window.history.replaceState(null, '', window.location.href);
                    // Prevent back navigation
                    window.onpopstate = function() {
                        window.history.pushState(null, '', window.location.href);
                    };
                }
            </script>
            </div>
        `);
    });
});

// Parse the markdown quiz file
function parseMarkdown(markdown) {
    const lines = markdown.split('\n');
    const questions = [];
    let currentQuestion = null;

    lines.forEach(line => {
        // Updated regex to match the new "1. What is the..." format
        const questionMatch = line.match(/## \d+\. (.+?) \[(single|multiple|text)\]/);
        if (questionMatch) {
            if (currentQuestion) {
                questions.push(currentQuestion);
            }
            currentQuestion = {
                question: questionMatch[1],  // Full question text
                type: questionMatch[2],      // Question type: single, multiple, or text
                options: [],
                correctAnswers: []           // Store correct answers
            };
        } else if (currentQuestion && currentQuestion.type === 'text') {
            const correctAnswerMatch = line.match(/Correct Answer: (.+)/);
            if (correctAnswerMatch) {
                currentQuestion.correctAnswers.push(correctAnswerMatch[1].toLowerCase().trim()); // Store correct answer for text input
            }
        } else if (currentQuestion) {
            const optionMatch = line.match(/- \[([ x])\] (.+)/);
            if (optionMatch) {
                currentQuestion.options.push({
                    answer: optionMatch[2],    // Store answer option
                    checked: optionMatch[1] === 'x' // Keep track of checked state
                });
                if (optionMatch[1] === 'x') {
                    currentQuestion.correctAnswers.push(optionMatch[2].toLowerCase()); // Store correct answer for single/multiple
                }
            }
        }
    });

    if (currentQuestion) {
        questions.push(currentQuestion);
    }

    return questions;
}

// Render the question based on its type
function renderQuestion(q, index) {
    let optionsHtml = '';

    if (q.type === 'single') {
        optionsHtml = q.options.map(opt => `
            <label>
                <input type="radio" name="answer_${index}" value="${opt.answer}">
                ${opt.answer}
            </label>
        `).join('<br>'); // Join with line breaks, no extra margin needed
    } else if (q.type === 'multiple') {
        optionsHtml = q.options.map(opt => `
            <label>
                <input type="checkbox" name="answer_${index}[]" value="${opt.answer}">
                ${opt.answer}
            </label>
        `).join('<br>');
    } else if (q.type === 'text') {
        optionsHtml = `<textarea name="answer_${index}" rows="4" cols="50"></textarea>`;
    }

    return `
        <div class="question">
            <strong>${index + 1}. ${q.question}</strong><br>
            <div class="options" style="margin-top: 10px;"> <!-- Space between question and first option -->
                ${optionsHtml}
            </div>
        </div>
    `;
}

// Handle quiz submission
app.post('/submit', isAuthenticated, preventBackNavigation, (req, res) => {
    // Store submission state in session to prevent further access
    req.session.submittedQuiz = true; // Mark quiz as submitted

    const results = [];
    const quizFile = req.body.quizFile;
    const filePath = path.join(__dirname, 'quizzes', quizFile);
    const markdownData = fs.readFileSync(filePath, 'utf8');
    const parsedQuestions = parseMarkdown(markdownData);

    parsedQuestions.forEach((question, index) => {
        const userAnswer = req.body[`answer_${index}`] || [];
        let isCorrect = false;

        // Normalize userAnswer to array if it's not one (for single and text type questions)
        const userAnswerArray = Array.isArray(userAnswer) ? userAnswer : [userAnswer];

        if (question.type === 'multiple') {
            const userAnswersNormalized = userAnswerArray.map(a => a.trim().toLowerCase()).sort();
            const correctAnswersNormalized = question.correctAnswers.map(a => a.trim().toLowerCase()).sort();
            isCorrect = userAnswersNormalized.toString() === correctAnswersNormalized.toString();
        } else if (question.type === 'single') {
            isCorrect = userAnswerArray[0]?.trim().toLowerCase() === question.correctAnswers[0]?.toLowerCase();
        } else if (question.type === 'text') {
            const userTextAnswer = userAnswerArray[0]?.trim().toLowerCase();
            const correctTextAnswer = question.correctAnswers[0]?.trim().toLowerCase();
            isCorrect = userTextAnswer && correctTextAnswer && userTextAnswer === correctTextAnswer;
        }

        // Store the result with question text and correct answers
        results.push({
            questionIndex: index + 1,
            questionText: question.question,
            userAnswer: userAnswerArray.length ? userAnswerArray : ['No answer provided'],
            correct: isCorrect,
            correctAnswers: question.correctAnswers // Add correct answers
        });
    });

    // Store results in session
    req.session.results = results;

    const totalCorrect = results.filter(result => result.correct).length; // Total correct answers
    const totalQuestions = results.length; // Total questions
    const scorePercentage = totalQuestions > 0 ? ((totalCorrect / totalQuestions) * 100).toFixed(2) : 0;
    
     // Store score in session (you can adjust to store more historical data if needed)
     if (!req.session.previousScores) {
        req.session.previousScores = []; // Initialize if not already present
    }
    req.session.previousScores.push({ score: scorePercentage, totalCorrect: totalCorrect, totalQuestions: totalQuestions, date: new Date().toLocaleString() }); // Store score and date

    // Render the results page
    res.send(`
        <link rel="stylesheet" href="/styles.css">
        <div class="container">
            <h1>Quiz Results</h1>
            <ul style="list-style: none; padding: 0;">
                ${results.map((result, index) => `
                    <li class="${result.correct ? 'correct' : 'wrong'}">
                        <strong>${index + 1}. ${result.questionText}</strong><br><br>
                        ${result.correct ? '<i>Correct Answer</i>' : '<i>Incorrect Answer</i>'}<br><br>
                        Your Answer: ${result.userAnswer.join(', ')}<br>
                        ${result.correct ? '' : `Correct Answer: ${result.correctAnswers.join(', ')}`}
                    </li>
                `).join('')}
            </ul>
            <h2>Your Score: ${scorePercentage}% (${totalCorrect} out of ${totalQuestions})</h2>
            <a href="/quizzes">Back to Quizzes</a>
        </div>
    `);
});

app.get('/results', isAuthenticated, (req, res) => {
    if (!req.session.submittedQuiz) {
        return res.redirect('/quizzes'); // Prevent access if quiz not submitted
    }

    const results = req.session.results || []; // Fetch results from session
    const totalCorrect = results.filter(result => result.correct).length; // Total correct answers
    const totalQuestions = results.length; // Total questions
    // Get previous scores
    const previousScores = req.session.previousScores || []; // Fetch previous scores from session

    // Render the results page
    res.send(`
        <link rel="stylesheet" href="/styles.css">
        <div class="container">
            <h1>Quiz Results</h1>
            <p>You have already submitted your quiz. You cannot retake it.</p>
            <h2>Your Score: ${previousScores.map(score => `${score.score}% (${totalCorrect} out of ${totalQuestions})`)}</h2>
            <a href="/quizzes">Back to Quizzes</a>
        </div>
    `);

    // Clear the submission state from session
    delete req.session.submittedQuiz;
});

// Start the server
app.listen(process.env.PORT || 3000, () => {
    // Application running port is 3000
    console.log("Quiz app running at: http://localhost:3000");
});
