import React, { useEffect } from 'react';
import './Home.css'; 
import MenuBar from './MenuBar'; 

function Features() {

useEffect(() => {
    document.title = 'How it works?';
  }, []);

  return (
    <div className="home-container">
      <MenuBar/>
      <div className="home-separator"></div>
      <div className="home-row-content">
        <div className="home-vertical-content">
          <div className="home-motto">
            Features
          </div>
          <div className="home-lower-motto">
            | Our Top Features
          </div>
          <div className="how-it-works-content">
            <p>
            Personalized Quizzes:
            Customize your experience! Create quizzes tailored to your interests and knowledge level.
            </p>
            <p>
            Visual Appeal:
            Expect beautiful graphics and a clear design that will make quizzing not only educational.
            but also aesthetic.
            </p>
            <p>
            Ease of Use:
            Our website has been designed with ease of use in mind. Play quizzes without unnecessary
            difficulties!
            </p>
            <p>
            Progress Tracking:
            See how you develop your knowledge! Check your results, track your progress and enjoy
            learning every question.
            </p>
            
          </div>
          <div className="home-start-bar">
            <div className="home-start-button">
              <a href="login">Start solving</a>
            </div>
          </div>
          <div className="home-smaller-image">
            <img src="img/smaller-lines.svg" alt=""/>
          </div>
        </div>
        <div className="home-image">
          <img src="img/people1.svg"  alt=""/>
        </div>
      </div>
    </div>
  );
}

export default Features;
