import React, { useEffect, useState } from 'react';
import { useNavigate, Link} from 'react-router-dom';

import axios from 'axios'; 
import './Login.css'; 
import Validation from './LoginValidation';

function Login() {

  useEffect(() => {
    document.title = 'Login';
  }, []);


  const navigate = useNavigate();


  const [values,setValues] = useState({
    email: "",
    password: ""
  });

  const [errors,setErrors] = useState({})
  const handleInput = (event) => {
    setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
  }

  return (
    <div className="container">
      <div className="left">
        <div className="logo">
          <Link to="/"><img src="/img/logo.svg" alt="Logo"></img></Link>
        </div>
        <div className="welcome-message">
          Welcome  back!<br />
          Please login/Signup to your account.
        </div>
        <div className="login-container">

          <form className="login" onSubmit={handleSubmit}>
            
            <input name="email" type="text" placeholder="Email Address" onChange={handleInput}></input>
            {errors.email && <span className='text-danger'>{errors.email} </span> }
            
            <input name="password" type="password" placeholder="Password" onChange={handleInput}></input>
            {errors.password && <span className='text-danger'>{errors.password} </span> }
            <div className="log">
              <button type="submit" className="login-button">Login</button>
              <Link to="/register" className="sign-up-button">Sign up</Link>
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
          <Link to="/">Go back</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
