import React, { useEffect } from 'react';
import './Home.css'; 
import MenuBar from './MenuBar'; 

function AboutUs() {

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
            About Us
          </div>
          <div className="home-lower-motto">
            | Nice to meet you!
          </div>
          <div className="how-it-works-content">
            <p>
            Our mission is to make learning enjoyable and accessible to everyone. That's why we 
            create quizzes that engage, inspire and make acquiring knowledge a fascinating journey.
            </p>
            <p>
            Regardless of, whether you are students, teachers or simply lovers of acquiring new 
            information we hope that our quizzes will provide you with unforgettable moments and
            broaden your horizons.
            </p>
            <p>
            Join our quiz community and let's discover the world of knowledge together in a fun
            and interactive way!
            </p>
          </div>
          <div className="home-start-bar">
            <div className="home-start-button">
              <a href="login">Start solving</a>
            </div>
          </div>
          <div className="home-smaller-image">
            <img src="img/smaller-lines.svg"  alt=""/>
          </div>
        </div>
        <div className="home-image">
          <img src="img/people1.svg" alt=""/>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
