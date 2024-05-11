import React from 'react';
import './Login.css'; // Zaimportuj styl CSS

function Register() {
  return (
    <div className="container">
      <div className="left">
        <div className="logo">
          <a href="/"><img src="img/logo.svg" alt="Logo" /></a>
        </div>
        <div className="welcome-message">
          Welcome!<br />
          Kindly fill in this form to register.
        </div>
        <div className="login-container">
          <form method="POST" action="/addUser" className="register">
            <div className="messages">
              {/* Tutaj możesz umieścić logikę wyświetlania wiadomości */}
            </div>
            <input name="nickname" type="text" placeholder="nickname" />
            <input name="email" type="text" placeholder="email@email.com" />
            <input name="password" type="password" placeholder="password" />
            <input name="confirmedPassword" type="password" placeholder="confirm password" />
            <div className="already-have"> Already have an account?<a href="login">Login</a></div>
            <button type="submit" name='sign-up-button' id="sign-up-button">Sign up</button>
          </form>
        </div>
      </div>
      <div className="right">
        <div className="image">
          <img src="img/people2.svg" alt="People" />
        </div>
        <div className="go-back-button">
          <a href="/">Go back</a>
        </div>
      </div>
    </div>
  );
}

export default Register;
