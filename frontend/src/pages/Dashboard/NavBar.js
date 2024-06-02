import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPuzzlePiece, faCompass, faUserShield, faSignOutAlt, faCog } from '@fortawesome/free-solid-svg-icons';

function NavBar() {
    const [userRole, setUserRole] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            const user = JSON.parse(loggedInUser);
            setUserRole(user.role);
        }
    }, []);

    const handleLogout = () => {
        // Usunięcie danych użytkownika z localStorage
        localStorage.removeItem('user');
        // Przekierowanie na stronę logowania
        navigate('/login');
    };

    return (
        <div className="menu">
            <div className="dashboard-logo">
                <Link to="/dashboard"><img src="/img/logowhite.svg" alt="Logoo" /></Link>
            </div>
            <div className="links">
                <Link to="/dashboard"><FontAwesomeIcon icon={faHome} /><div className='home-nav'>Home</div> </Link>
                <Link to="/my-quizzes"><FontAwesomeIcon icon={faPuzzlePiece} /> <div className='quizzes-nav'>My Quizzes</div></Link>
                <Link to="/discover"><FontAwesomeIcon icon={faCompass} /> <div className='discover-nav'>Discover</div></Link>
                <Link to="/profile"><FontAwesomeIcon icon={faUserShield} /> <div className='profile-nav'>Profile</div></Link>
                {userRole === 'admin' && (
                    <Link to="/adminpanel"><FontAwesomeIcon icon={faCog} /> <div className='admin-nav'>Admin Panel</div></Link>
                )}
                <button onClick={handleLogout}><FontAwesomeIcon icon={faSignOutAlt} /> <div className='logout-nav'>Log out</div></button>
            </div>
        </div>
    );
}

export default NavBar;
