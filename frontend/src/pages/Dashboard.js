import React, { useEffect } from 'react';
import './Dashboard.css'; // Importuj styl CSS

function Dashboard() {

    useEffect(() => {
        document.title = 'Dashboard';
      }, []);

  return (
    <div className="container">
      <div className="menu">
        <div className="dashboard-logo">
          <a href="dashboard"><img src="img/logowhite.svg" alt="Logo" /></a>
        </div>
        <div className="links">
          <a href="dashboard"><i className="fas fa-home"></i> Home</a><br /><br />
          <a href="my-quizzes"><i className="fas fa-puzzle-piece"></i> My Quizzes</a><br /><br />
          <a href="discover"><i className="fas fa-compass"></i> Discover</a><br /><br />
          <a className="logout-button" href="/"><i className="fas fa-sign-out-alt"></i> Log Out</a>
        </div>
      </div>
      <div className="board">
        Home
        <div className="separator"></div>
        <div className="hello-message">
          {/* Treść wiadomości powitalnej */}
        </div>
        <div className="session">
          {/* Informacje o sesji */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
