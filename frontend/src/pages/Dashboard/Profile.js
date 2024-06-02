import React, { useEffect, useState } from 'react';
import './Dashboard.css'; 
import NavBar from './NavBar'; 

function Profile() {

    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState(''); 
    const [userId, setUserId] = useState(''); 
    const [userRole, setUserRole] = useState(''); 

    useEffect(() => {
        document.title = 'Profile';

        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            const user = JSON.parse(loggedInUser);
            setUserName(user.nickname);
            setUserEmail(user.email);
            setUserId(user.id);
            setUserRole(user.role);
        }
    }, []);

    return (
        <div className="container">
            <NavBar/>
            <div className="right">
                <div className="board">
                    Profile
                    <div className="separator"></div>

                            <div className='UserData'>
                                <div className="user-info">  <div className="User-nickname"> Nick: </div>{userName}</div>
                                <div className="user-info">  <div className="User-email"> Email: </div>{userEmail}</div>
                                <div className="user-info"> <div className="User-role"> Your Role: </div>{userRole}</div>
                                <div className="user-info"> <div className="User-id"> Your ID: </div>{userId}</div>
                            </div>    
                </div>
            </div>
        </div>
    );
}

export default Profile;
