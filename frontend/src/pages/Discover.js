import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; 
import './Dashboard.css'; 
import NavBar from './NavBar';

function Discover() {
  const [quizzes, setQuizzes] = useState([]); 
  
  useEffect(() => {
    document.title = 'Discover';
    
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('https://localhost:8001/api/quizzes');
        setQuizzes(response.data); 
      } catch (error) {
        console.error('Błąd pobierania quizów:', error);
      }
    };

    fetchQuizzes(); 
  }, []);

  return (
    <div className="container">
      <NavBar/>
      <div className="right">
        <div className="board">
          Discover
          <div className="separator"></div>
          <header>
            <div className="search-bar">
              <input placeholder="search quiz" />
            </div>
            
          </header>
          <section className="projects">
            {quizzes.map((quiz) => (
                <div key={quiz.id}>
                    <h3>{quiz.title}</h3>
                    <p>{quiz.description}</p>
                    {quiz.image && <img src={`/img/${quiz.image}`} alt="Quiz" />}
                    <a href="#>">PLAY</a>
                </div>
            ))}

          </section>
        </div>
      </div>
    </div>
  );
}

export default Discover;
