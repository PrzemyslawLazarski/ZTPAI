import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPuzzlePiece, faCompass, faUserShield, faSignOutAlt, faCog } from '@fortawesome/free-solid-svg-icons';

function NavBar() {
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            const user = JSON.parse(loggedInUser);
            setUserRole(user.role);
        }
    }, []);

    return (
        <div className="menu">
            <div className="dashboard-logo">
                <Link to="/dashboard"><img src="/img/logowhite.svg" alt="Logoo" /></Link>
            </div>
            <div className="links">
                <Link to="/dashboard"><FontAwesomeIcon icon={faHome} /><div className='home-nav'>Home</div> </Link><br /><br />
                <Link to="/my-quizzes"><FontAwesomeIcon icon={faPuzzlePiece} /> <div className='quizzes-nav'>My Quizzes</div></Link><br /><br />
                <Link to="/discover"><FontAwesomeIcon icon={faCompass} /> <div className='discover-nav'>Discover</div></Link><br /><br />
                <Link to="/profile"><FontAwesomeIcon icon={faUserShield} /> <div className='profile-nav'>Profile</div></Link><br /><br />
                {userRole === 'admin' && (
                    <Link to="/adminpanel"><FontAwesomeIcon icon={faCog} /> <div className='admin-nav'>Admin Panel</div></Link>
                )}<br /><br />
                <Link to="/login"><FontAwesomeIcon icon={faSignOutAlt} /> <div className='logout-nav'>Log out</div></Link>
            </div>
        </div>
    );
}

export default NavBar;
