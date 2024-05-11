import React from 'react';
import './Login.css'; 

function Login() {
  return (
    <div className="container">
      <div className="left">
        <div className="logo">
          <a href="/"><img src="/img/logo.svg" alt="Logo"></img></a>
        </div>
        <div className="welcome-message">
          Welcome  back!<br />
          Please login/Signup to your account.
        </div>
        <div className="login-container">
          <form className="login" action="login" method="POST">
            <input name="email" type="text" placeholder="Email Address"></input><br />
            <input name="password" type="password" placeholder="Password"></input><br />
            <div className="log">
              <button type="submit" className="login-button">Login</button>
              <a href="/register" className="sign-up-button">Sign up</a>
            </div>
          </form>
          <div className="alt-login">
            <div className="or-login-with">
              Or login with
            </div>
            <div className="facebook">
              <a href="#">Facebook</a>
            </div>
            <div className="google">
              <a href="#">Google</a>
            </div>
          </div>
        </div>
      </div>
      <div className="right">
        <div className="image">
          <img src="/img/people2.svg" alt="Image"></img>
        </div>
        <div className="go-back-button">
          <a href="/">Go back</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
