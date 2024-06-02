import {Link} from 'react-router-dom';
import './Home.css'; 

function MenuBar() {

    return (     
        <div className="home-header">
            <div className="home-bar">
                <div className="home-logo">
                    <Link to="/"><img src="/img/logo.svg" alt=""></img></Link>
                </div>
                <div className="home-bar-buttons">
                    <Link to="/how-it-works">How it works?</Link>
                    <Link to="/aboutus">About us</Link>
                    <Link to="/features">Features</Link>
                </div>
            </div>
            <div className="home-login-button">
                <Link to="/login">Login</Link>
            </div>  
        </div>
      );
}

export default MenuBar;