import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import './Quiz.css';

function QuizGame() {
    const { id } = useParams();
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userScore, setUserScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
    const [showNextButton, setShowNextButton] = useState(false);
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);
    const [incorrectAnswerIndex, setIncorrectAnswerIndex] = useState(null); 

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(`https://localhost:8001/api/quizzes/${id}/questions`);
                setQuestions(response.data);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        fetchQuestions();
    }, [id]);

    const handleOptionClick = (isCorrect, index) => {
        setSelectedAnswerIndex(index);
        setCorrectAnswerIndex(questions[currentQuestionIndex].answers.findIndex(answer => answer.is_correct));
        if (!isCorrect) {
            setIncorrectAnswerIndex(index);
        }
        if (isCorrect) {
            setUserScore(userScore + 1);
        }
        setShowNextButton(true);
    };

    const handleNextQuestion = () => {
        setSelectedAnswerIndex(null);
        setShowNextButton(false);
        setCorrectAnswerIndex(null);
        setIncorrectAnswerIndex(null);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setQuizFinished(true);
        }
    };

    const handleCompleteQuiz = () => {
        setQuizFinished(true);
    };

    const handleRestart = () => {
        setUserScore(0);
        setCurrentQuestionIndex(0);
        setQuizFinished(false);
        setSelectedAnswerIndex(null);
        setShowNextButton(false);
        setCorrectAnswerIndex(null);
        setIncorrectAnswerIndex(null);
    };

    if (quizFinished) {
        return (
            <div className="result_box">
                <div className="score_text">
                    <span>Your score: {userScore} out of {questions.length}</span>
                </div>
                <div className="buttons">
                    <button onClick={handleRestart}>Replay Quiz</button>
                    <button onClick={() => window.location.href = '/my-quizzes'}>Complete</button>
                </div>
            </div>
        );
    }

    if (questions.length === 0) {
        return <div>Loading...</div>;
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="quiz_box">
            <header>
                <div className="title">{currentQuestion.question_text}</div>
            </header>
            <section>
                <div className="option_list">
                    {currentQuestion.answers.map((answer, index) => (
                        <div
                            key={index}
                            className={`option ${
                                selectedAnswerIndex === index
                                    ? answer.is_correct
                                        ? 'correct'
                                        : 'incorrect'
                                    : ''
                            } ${correctAnswerIndex === index ? 'correct' : ''}`}
                            onClick={() => handleOptionClick(answer.is_correct, index)}
                            style={{ pointerEvents: selectedAnswerIndex !== null ? 'none' : 'auto' }}
                        >
                            {answer.answer_text}
                            {selectedAnswerIndex !== null && index === incorrectAnswerIndex && (
                                <FontAwesomeIcon icon={faTimes} className="icon cross" />
                            )}
                            {selectedAnswerIndex !== null && index === correctAnswerIndex && (
                                <FontAwesomeIcon icon={faCheck} className="icon tick" />
                            )}
                        </div>
                    ))}
                </div>
            </section>
            <footer>
                <div className="total_que">
                    Question {currentQuestionIndex + 1} out of {questions.length}
                </div>
                <div className='next-button-quiz'> 
                {showNextButton && (
                    currentQuestionIndex < questions.length - 1 ? (
                        <button className="next_btn" onClick={handleNextQuestion}>
                            Next
                        </button>
                    ) : (
                        <button className="next_btn" onClick={handleCompleteQuiz}>
                            Complete
                        </button>
                    )
                )}
                </div>
            </footer>
        </div>
    );
}
export default QuizGame;
