import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../Dashboard/NavBar';

function QuizInfo() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`https://localhost:8001/api/quizzes/${id}`);
        console.log('Quiz data:', response.data);
        setQuiz(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Błąd pobierania quizu:', error);
        setError('Failed to fetch quiz');
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!quiz) {
    return <div>Quiz not found</div>;
  }

  if (!quiz.questions || !Array.isArray(quiz.questions)) {
    return <div>Invalid quiz structure</div>;
  }

  return (
    <div className="container">
      <NavBar />
      <div className="right">
        <div className="board">
        {quiz.title}
          <div className="separator"></div>
            <div className="hello-message">
              
              <p>{quiz.description}</p>
              {quiz.image && <img src={`/img/${quiz.image}`} alt="Quiz" />}
                <div>
                {quiz.questions.map((question, questionIndex) => (
                 <div key={questionIndex}>
                <h3>Pytanie {questionIndex +1}</h3>{question.question_text}
                
               </div>
))}
            </div>
            </div>
          <div className="session">
            {/* Informacje o sesji */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizInfo;
