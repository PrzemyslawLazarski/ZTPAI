import React, { useEffect } from 'react';
import './Dashboard.css'; // Importuj styl CSS

function MyQuizzes() {

    useEffect(() => {
        document.title = 'MyQuizzes';
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
          My Quizzes
          <div className="separator"></div>
          <header>
            <div className="search-bar">
              <input placeholder="search quiz" />
            </div>
            <a href="validateQuiz">
              <div className="Add">
                Add
              </div>
            </a>
          </header>
          <section className="projects">
            {/* Sekcja na wyświetlenie quizów */}
          </section>
        </div>
      </div>
    </div>
  );
}

export default MyQuizzes;
