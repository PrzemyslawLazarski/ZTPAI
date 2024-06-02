import React, { useEffect, useState } from 'react';
import './Dashboard.css'; 
import NavBar from './NavBar'; 

function Profile() {

    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState(''); 
    const [userId, setUserId] = useState(''); 

    useEffect(() => {
        document.title = 'Profile';

        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            const user = JSON.parse(loggedInUser);
            setUserName(user.nickname);
            setUserEmail(user.email);
            setUserId(user.id);
        }
    }, []);

    return (
        <div className="container">
            <NavBar/>
            <div className="right">
                <div className="board">
                    Profile
                    <div className="separator"></div>
                    <div className="user-info">
                        {
                            <div className='UserData'>
                                <div className="User-nickname"> Nick: {userName}</div>
                                <div className="User-email"> Email: {userEmail}</div>
                                <div className="User-id"> Your ID: {userId}</div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
