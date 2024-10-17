# Markdown Quiz Application

A simple, lightweight quiz application built with Node.js that allows candidates to take quizzes based on a markdown file of questions and answers. The application supports multiple-choice (radio buttons), multiple-answer (checkboxes), and text input (case-insensitive) question formats. It also provides user login, quiz results, and answer review functionality.

---

## Key Features

- **Multiple Question Types**: Supports single answer (radio buttons), multiple answer (checkboxes), and text input questions.
- **User Authentication**: Simple login functionality to allow candidates to access quizzes.
- **Quiz Progress & Results**: Displays quiz score upon completion with correct/incorrect answer feedback.
- **Markdown Support**: Quiz questions are read from a markdown file, making quiz creation easy and scalable.
- **Results Persistence**: Users can review their previous scores after completing the quiz.

---

## Advantages

1. **Flexibility**: The markdown-driven quiz setup allows easy modification of questions and answers without changing the code.
2. **User-Friendly**: Intuitive interface for candidates to take quizzes, login, and view results.
3. **Scalable**: The markdown structure ensures scalability for quizzes with different question types.
4. **Customizable**: You can easily modify the types of questions, add new question types, or integrate additional functionality.
5. **Easy Hosting**: Front-end can be deployed on GitHub Pages, while the back-end can be hosted on platforms like Heroku or Render for free.

---

## Tools and Technologies

- **Node.js**: JavaScript runtime used to build the backend logic of the application.
- **Express.js**: Web framework for handling routes and HTTP requests.
- **Sessions & Cookies**: Used for maintaining user sessions and ensuring quiz state.
- **Markdown**: Simplifies quiz creation and management by storing questions in a plain text file.
- **Bootstrap**: Provides styling and responsive design for the UI.
- **Render**: For deploying the back-end (Node.js server).

---

## How to Use the Application

### 1. Clone the Repository

To get started, clone the repository to your local machine:

```bash
git clone https://github.com/osandadeshan/markdown-quiz-app.git
cd markdown-quiz-app
```

### 2. Install Dependencies
Make sure you have Node.js installed, then install the required dependencies by running:

```bash
npm install
```

### 3. Set Up the Application
Ensure you have a .env file in the root directory of the project for environment variables such as:

```bash
SESSION_SECRET=your_random_secret_key
```

Update the markdown file with your quiz content in the questions.md file.

### 4. Run the Application
To run the application in production mode, run:

```bash
npm start
```

To run the application in development mode using Nodemon, run:

```bash
npm run dev
```

### 5. Access the Application
Visit http://localhost:3000 in your browser to interact with the quiz application.

---

## Sample Application
A sample version of the application is deployed on [Render](https://dashboard.render.com/). You can try it out [here](https://markdown-quiz-app.onrender.com).


---

## Project Structure

```bash
├── node_modules        # Dependencies installed via npm
├── public              # Static files like HTML, CSS
│   ├── views
│   │   ├── login.html  # Login page
│   │   ├── styles.css  # CSS for styling
├── quizzes             # Markdown files containing quizzes
│   ├── quiz.md         # Example quiz markdown file
│   ├── maxsoft.md      # Another quiz file
├── .env                # Environment variables (session secret, etc.)
├── app.js              # Main application logic
├── package-lock.json   # Dependency lock file
├── package.json        # Project configuration and scripts
├── README.md           # Project documentation
└── users.json          # Users' login credentials
```
---

## Future Enhancements
- **Add Admin Dashboard**: Enable admin users to upload new markdown quiz files through a UI.
- **Add Timer Feature**: Implement a quiz timer for competitive scenarios.
- **Improve Results Page**: Show more statistics such as time taken and comparison with other users.
- **Enhanced Authentication**: Add more secure login methods, including OAuth.

---

## Contributing
We welcome contributions to this project! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a pull request.

---

## License
This project is licensed under the MIT License. You are free to use, modify, and distribute this software under the terms of the license.

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/License_icon-mit-2.svg/2000px-License_icon-mit-2.svg.png" alt="MIT License" width="100" height="100"/> [MIT License](https://opensource.org/licenses/MIT)

---

## Contact
For any inquiries or issues, feel free to open an issue on the repository or contact me at:

- **Email**: your.osanda.deshan@gmail.com
- **LinkedIn**: [Osanda Deshan](https://www.linkedin.com/in/osandadeshan/)

---

## Acknowledgments
Thanks to Node.js, Express.js, Bootstrap, and the open-source community for making this project possible.