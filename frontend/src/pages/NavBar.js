import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPuzzlePiece, faCompass, faUserShield, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';


function NavBar() {
    return (
        <div className="menu">
            <div className="dashboard-logo">
                <Link to="/dashboard"><img src="/img/logowhite.svg" alt="Logoo" /></Link>
            </div>
            <div className="links">
                <Link to="/dashboard"><FontAwesomeIcon icon={faHome} /> Home</Link><br /><br />
                <Link to="/my-quizzes"><FontAwesomeIcon icon={faPuzzlePiece} /> My Quizzes</Link><br /><br />
                <Link to="/discover"><FontAwesomeIcon icon={faCompass} /> Discover</Link><br /><br />
                <Link to="/profile"><FontAwesomeIcon icon={faUserShield} /> Profile</Link><br /><br /> 
                <Link className="logout-button" to="/"><FontAwesomeIcon icon={faSignOutAlt} /> Log Out</Link>
            </div>
        </div>
    );
}

export default NavBar;
