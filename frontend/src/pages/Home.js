import React, { useEffect } from 'react';
import './Home.css'; // Załóżmy, że plik App.css zawiera stylizację z pliku main.css

function Home() {

  useEffect(() => {
    document.title = 'QuizNinja';
  }, []);

  return (
    <div className="home-container">
      <div className="home-header">
        <div className="home-bar">
          <div className="home-logo">
            <a href="/"><img src="/img/logo.svg" alt="Logo"></img></a>
          </div>
          <div className="home-bar-buttons">
            <a href="/how-it-works">How it works?</a>
            <a href="#">About Us</a>
            <a href="#">Features</a>
          </div>
        </div>
        <div className="home-login-button">
          <a href="/login">Login</a>
        </div>
      </div>
      <div className="home-separator"></div>
      <div className="home-row-content">
        <div className="home-vertical-content">
          <div className="home-motto">
            Learn new concepts<br />
            for each question
          </div>
          <div className="home-lower-motto">
            | We help you prepare for exams and quizzes
          </div>
          <div className="home-start-bar">
            <div className="home-start-button">
              <a href="/login">Start solving</a>
            </div>
            <div className="home-knowmore-button">
              <a href="#">Know more</a>
            </div>
          </div>
          <div className="home-smaller-image">
            <img src="/img/smaller-lines.svg" alt="small Image"></img>
          </div>
        </div>
        <div className="home-image">
          <img src="/img/people1.svg" alt="Large Image"></img>
        </div>
      </div>
    </div>
  );
}

export default Home;
