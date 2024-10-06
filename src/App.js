

import React, { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import './App.css';

const allQuestions = [
  {
    question: "What is the primary purpose of React?",
    options: ["A. Database management", "B. Building user interfaces", "C. Data analysis", "D. Server-side scripting"],
    answer: "B"
  },
  {
    question: "Which method is used to create a new React component?",
    options: ["A. React.component()", "B. createComponent()", "C. ReactDOM.createComponent()", "D. React.createElement()"],
    answer: "D"
  },
  {
    question: "What is the virtual DOM in React?",
    options: ["A. A JavaScript representation of the actual DOM", "B. A new type of HTML", "C. A faster version of the real DOM", "D. An alternate DOM structure"],
    answer: "A"
  },
  {
    question: "Which hook is used to manage state in functional components?",
    options: ["A. useContext", "B. useReducer", "C. useState", "D. useEffect"],
    answer: "C"
  },
  {
    question: "What does JSX stand for?",
    options: ["A. Java Syntax XML", "B. JavaScript XML", "C. JavaScript Extension", "D. JavaScript Express"],
    answer: "B"
  },
  {
    question: "What is the command to create a new React application?",
    options: ["A. npm start", "B. npx create-react-app", "C. npm init react", "D. react init"],
    answer: "B"
  },
  {
    question: "Which method is used to pass data from parent to child components in React?",
    options: ["A. props", "B. state", "C. context", "D. setState"],
    answer: "A"
  },
  {
    question: "What is the primary use of the useEffect hook in React?",
    options: ["A. To fetch data", "B. To apply side effects", "C. To initialize state", "D. To handle events"],
    answer: "B"
  },
  {
    question: "Which of the following is used to define routes in a React application?",
    options: ["A. Router", "B. RouteProvider", "C. BrowserRouter", "D. RouteManager"],
    answer: "C"
  },
  {
    question: "Which keyword is used to import a module in Python?",
    options: ["A. require", "B. export", "C. import", "D. include"],
    answer: "C"
  },
  {
    question: "What is the output of `print(type([]))` in Python?",
    options: ["A. <class 'array'>", "B. <class 'list'>", "C. <class 'dict'>", "D. <class 'tuple'>"],
    answer: "B"
  },
  {
    question: "Which of the following is NOT a built-in data type in Python?",
    options: ["A. list", "B. dict", "C. class", "D. set"],
    answer: "C"
  },
  {
    question: "What is the correct syntax to define a function in Python?",
    options: ["A. func myFunction():", "B. function myFunction:", "C. def myFunction():", "D. myFunction():"],
    answer: "C"
  },
  {
    question: "In React, which method is used to render components to the DOM?",
    options: ["A. ReactDOM.render()", "B. React.create()", "C. ReactDOM.show()", "D. renderComponent()"],
    answer: "A"
  },
  {
    question: "What is used to handle errors in Python?",
    options: ["A. try-except", "B. try-catch", "C. error handler", "D. exception wrapper"],
    answer: "A"
  },
  {
    question: "What is JSX in React?",
    options: ["A. A JavaScript extension for writing HTML", "B. A syntax for handling events", "C. A new type of CSS", "D. A way to structure state"],
    answer: "A"
  },
  {
    question: "How do you create a list comprehension in Python?",
    options: ["A. [x for x in list]", "B. list{x for x in list}", "C. {x in list}", "D. list(x in list)"],
    answer: "A"
  },
  {
    question: "Which method is used to update the state in a functional component in React?",
    options: ["A. setState", "B. useState", "C. updateState", "D. changeState"],
    answer: "B"
  },
  {
    question: "Which of the following methods removes an item from a list in Python?",
    options: ["A. delete()", "B. remove()", "C. pop()", "D. discard()"],
    answer: "B"
  },
  {
    question: "In React, what does lifting state up mean?",
    options: ["A. Passing state down as props", "B. Moving state to a higher component", "C. Using state across all components", "D. Making state accessible in a single function"],
    answer: "B"
  }

  
];


const App = () => {
  
  const [questions, setQuestions] = useState([]);
  const [playerName, setPlayerName] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [error, setError] = useState(""); 
  const [isGameOver, setIsGameOver] = useState(false);
  const [selectedOption, setSelectedOption] = useState(""); 

  useEffect(() => {
    if (isGameStarted) {
      const shuffled = allQuestions.sort(() => 0.5 - Math.random());
      setQuestions(shuffled.slice(0, 5));
      setCurrentQuestion(0);
      setScore(0);
      setTimeLeft(60); 
    }
  }, [isGameStarted]);

  
  useEffect(() => {
    if (timeLeft > 0 && isGameStarted) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (timeLeft === 0) {
      setFeedback("Time's up! Game Over.");
      setIsGameStarted(false);
      setIsGameOver(true);
    }
  }, [timeLeft, isGameStarted]);

  
  const startGame = () => {
    if (playerName) {
      setIsGameStarted(true);
      setFeedback("");
      setError(""); 
    } else {
      setError("Please enter your name to start!");
    }
  };

 
  const handleAnswer = () => {
    if (selectedOption) {
      if (questions[currentQuestion]?.answer === selectedOption) {
        setFeedback("Correct Answer!");
        setScore(score + 1);
      } else {
        setFeedback("Wrong Answer! Try Again.");
      }
    }
  };

  
  const handleNextQuestion = () => {
    setFeedback(""); 
    setSelectedOption(""); 

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsGameStarted(false);
      setIsGameOver(true);
    }
  };

  
  const handleSkipQuestion = () => {
    setFeedback(""); 
    setSelectedOption(""); 

    setQuestions((prevQuestions) => [
      ...prevQuestions.slice(0, currentQuestion),
      ...prevQuestions.slice(currentQuestion + 1),
      prevQuestions[currentQuestion],
    ]);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsGameStarted(false);
      setIsGameOver(true);
    }
  };

  
  const restartGame = () => {
    setIsGameOver(false);
    setPlayerName("");
    setIsGameStarted(false);
    setScore(0);
    setCurrentQuestion(0);
    setTimeLeft(60);
  };

  return (
    <div className="app">
      <h1>Quiz Game (KBC Style)</h1>

      {!isGameStarted && !isGameOver ? (
        <div className="join-section">
          <h2>Join the Game</h2>
          <QRCodeCanvas value="https://majestic-biscuit-f19509.netlify.app/" size={128} />
          <input
            type="text"
            placeholder="Enter your name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
          <button onClick={startGame}>Start Game</button>
          <p className="error-message">{error}</p>
        </div>
      ) : isGameStarted ? (
        <div className="question-section">
          <h2>Time Left: {timeLeft} seconds</h2>
          {questions[currentQuestion] ? (
            <>
              <h2>{questions[currentQuestion].question}</h2>
              <div className="options">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedOption(option[0])}
                    className={selectedOption === option[0] ? "selected" : ""}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <button  onClick={handleAnswer} disabled={!selectedOption}>
                Submit
              </button>
              <button  onClick={handleSkipQuestion}>Skip</button>
              {feedback && <p>{feedback}</p>}
              {feedback && (
                <button onClick={handleNextQuestion}>Next Question</button>
              )}
            </>
          ) : (
            <p>No more questions available.</p>
          )}
        </div>
      ) : (
        isGameOver && (
          <div className="result-section">
            <h2>Congratulations, {playerName}!</h2>
            <p>You scored {score} out of {questions.length}.</p>
            <button onClick={restartGame}>Retake the Test</button>
          </div>
        )
      )}
    </div>
  );
};

export default App;
