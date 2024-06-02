import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPuzzlePiece, faCompass, faUserShield, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function NavBar() {
    const handleLogout = () => {
        // Wyczyść dane z local storage
        localStorage.clear();
    };

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
                <Link to="/login" onClick={handleLogout}><FontAwesomeIcon icon={faSignOutAlt} /> <div className='logout-nav'>Log out</div></Link>
            </div>
        </div>
    );
}

export default NavBar;
