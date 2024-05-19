import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; 
import MenuBar from './MenuBar'; 

function Home() {
  useEffect(() => {
    document.title = 'QuizNinja';
  }, []);

  return (
    <div className="home-container">
      <MenuBar />
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
              <Link to="/login">Start solving</Link>
            </div>
            <div className="home-knowmore-button">
              <Link to="/aboutus">Know more</Link>
            </div>
          </div>
          <div className="home-smaller-image">
            <img src="/img/smaller-lines.svg" alt="small" />
          </div>
        </div>
        <div className="home-image">
          <img src="/img/people1.svg" alt="Large" />
        </div>
      </div>
    </div>
  );
}

export default Home;
