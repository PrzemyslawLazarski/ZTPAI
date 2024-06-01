import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css'; 
import NavBar from './NavBar'; 

function Dashboard() {
    // 1. Ustawienie stanu dla nazwy użytkownika
    const [userName, setUserName] = useState('');

    useEffect(() => {
        document.title = 'Dashboard';

        // 2. Pobranie nazwy użytkownika z localStorage
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
                    
                    <div className="hello-message">
                        {userName ? `Hello, ${userName}` : 'Hello'}
                    </div>
                    <div className="session">
                      
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
