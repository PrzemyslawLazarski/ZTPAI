import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css'; 
import NavBar from './NavBar'; 

function Dashboard() {

    const [userName, setUserName] = useState('');
    useEffect(() => {
        document.title = 'Dashboard';

        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            const user = JSON.parse(loggedInUser);
            setUserName(user.nickname);
          
        }
    }, []);

    return (
        <div className="container">
            <NavBar/>
            <div className="right">
                <div className="board">
                    Home
                    <div className="separator"></div>
                    <div className="welcome-page">
                        <div className="hello-message">
                            {userName ? `Hello, ${userName}!` : 'Hello'}
                            <p>Let's explore together the world of quizzes</p>
                        </div>
                        <div className="banner">
                            <img src="/img/small-logo.png" alt="Logoo" />
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
