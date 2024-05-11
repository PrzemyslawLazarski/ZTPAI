import React, { useEffect } from 'react';
import './Home.css'; // Zaimportuj styl CSS

function HowItWorks() {

useEffect(() => {
    document.title = 'How it works?';
  }, []);

  return (
    <div className="home-container">
      <div className="home-header">
        <div className="home-bar">
          <div className="home-logo">
            <a href="/"><img src="img/logo.svg" alt="Logo"></img></a>
          </div>
          <div className="home-bar-buttons">
            <a href="howitworks">How it works?</a>
            <a href="aboutus">About Us</a>
            <a href="features">Features</a>
          </div>
        </div>
        <div className="home-login-button">
          <a href="login">Login</a>
        </div>
      </div>
      <div className="home-separator"></div>
      <div className="home-row-content">
        <div className="home-vertical-content">
          <div className="home-motto">
            How it works?
          </div>
          <div className="home-lower-motto">
            | Only 4 steps!
          </div>
          <div className="how-it-works-content">
            <p>
              1. Registration:
              We start with the first step - register on our website! Enter your details so
              that we can tailor the quizzes to your interests.
            </p>
            <p>
              2. Choose Topics:
              Once logged in, explore a variety of quiz topics. Choose what interests you,
              whether it's history, science or pop culture.
            </p>
            <p>
              3. Choose Quiz:
              When you find an interesting quiz, click and dive into the world of questions!
              Answer, learn and have fun.
            </p>
            <p>
              4. Check Results:
              After completing the quiz, see your results and find out how much you know.
              It's a great way to track your progress!
            </p>
          </div>
          <div className="home-start-bar">
            <div className="home-start-button">
              <a href="login">Start solving</a>
            </div>
          </div>
          <div className="home-smaller-image">
            <img src="img/smaller-lines.svg" alt="Large Image" />
          </div>
        </div>
        <div className="home-image">
          <img src="img/people1.svg" alt="Large Image" />
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
