
import { Link } from 'react-router-dom';
function NavBar(){

    return(

    <div className="menu">
        <div className="dashboard-logo">
            <Link to="/dashboard"><img src="img/logowhite.svg" alt="Logo" /></Link>
        </div>
        <div className="links">
            <Link to="/dashboard"><i className="fas fa-home"></i> Home</Link><br /><br />
            <Link to="/my-quizzes"><i className="fas fa-puzzle-piece"></i> My Quizzes</Link><br /><br />
            <Link to="/discover"><i className="fas fa-compass"></i> Discover</Link><br /><br />
            <Link className="logout-button" to="/"><i className="fas fa-sign-out-alt"></i> Log Out</Link>
        </div>
    </div>
  );
}

export default NavBar;