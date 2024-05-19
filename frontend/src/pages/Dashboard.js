import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css'; 
import NavBar from './NavBar'; 

function Dashboard() {

    useEffect(() => {
        document.title = 'Dashboard';
      }, []);

  return (
    <div className="container">
      <NavBar/>
      <div className="right">
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
    </div>
  );
}

export default Dashboard;
