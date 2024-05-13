import React, { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';

import axios from 'axios'; // Importujemy bibliotekę Axios
import './Login.css'; 

function Login() {

  useEffect(() => {
    document.title = 'Login';
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleClick() {
    
  }

  const login = (e) => {
    e.preventDefault()
      axios
      .post("https://localhost:8001/login", {
        email,
        password,
      })
      navigate("/dashboard");
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  

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
          <form className="login" onSubmit={login}>
            <input name="email" type="text" placeholder="Email Address" onChange={onChangeEmail}></input><br />
            <input name="password" type="password" placeholder="Password" onChange={onChangePassword}></input><br />
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
      <div className="login-right">
        <div className="image">
          <img src="/img/people2.svg" alt="People"></img>
        </div>
        <div className="go-back-button">
          <a href="/">Go back</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
