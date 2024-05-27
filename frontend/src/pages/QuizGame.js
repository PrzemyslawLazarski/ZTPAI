import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Quiz.css';

function QuizGame() {
    const { id } = useParams();
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userScore, setUserScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);

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

    const handleOptionClick = (isCorrect) => {
        if (isCorrect) {
            setUserScore(userScore + 1);
        }

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setQuizFinished(true);
        }
    };

    const handleRestart = () => {
        setUserScore(0);
        setCurrentQuestionIndex(0);
        setQuizFinished(false);
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
                            className="option"
                            onClick={() => handleOptionClick(answer.is_correct)}
                        >
                            {answer.answer_text}
                        </div>
                    ))}
                </div>
            </section>
            <footer>
                <div className="total_que">
                    Question {currentQuestionIndex + 1} out of {questions.length}
                </div>
                <button
                    className="next_btn"
                    onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                    disabled={currentQuestionIndex >= questions.length - 1}
                >
                    Next
                </button>
            </footer>
        </div>
    );
}

export default QuizGame;
