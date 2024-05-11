import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Importujemy bibliotekę Axios
import './Dashboard.css'; // Importuj styl CSS

function Discover() {
  const [quizzes, setQuizzes] = useState([]); // Stan do przechowywania quizów
  
  useEffect(() => {
    document.title = 'Discover';
    // Funkcja do pobierania quizów z API
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('https://localhost:8001/api/quizzes'); // Wstaw odpowiedni adres URL do twojego API
        setQuizzes(response.data); // Ustaw quizy pobrane z API w stanie
      } catch (error) {
        console.error('Błąd pobierania quizów:', error);
      }
    };

    fetchQuizzes(); // Wywołaj funkcję pobierania quizów po zamontowaniu komponentu
  }, []);

  return (
    <div className="container">
      <div className="menu">
        <div className="dashboard-logo">
          <a href="dashboard"><img src="img/logowhite.svg" alt="Logo" /></a>
        </div>
        <div className="links">
          <a className="menu-button" href="dashboard"><i className="fas fa-home"></i> Home</a><br /><br />
          <a className="menu-button" href="my-quizzes"><i className="fas fa-puzzle-piece"></i> My Quizzes</a><br /><br />
          <a className="menu-button" href="discover"><i className="fas fa-compass"></i> Discover</a><br /><br />
          <a className="logout-button" href="/"><i className="fas fa-sign-out-alt"></i> Log Out</a>
        </div>
      </div>
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
