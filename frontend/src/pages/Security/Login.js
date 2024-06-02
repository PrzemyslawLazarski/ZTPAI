import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'; 
import './Login.css'; 
import Validation from './LoginValidation';


function Login() {
  useEffect(() => {
    document.title = 'Login';
  }, []);

  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    console.log('Form submitted');
    event.preventDefault();
    const validationErrors = Validation(values);
    setErrors(validationErrors);
    console.log('Validation Errors:', validationErrors); 
    
    if (Object.keys(validationErrors).length === 0) {
      try {
        console.log('Sending request with values:', values);
        const response = await axios.post('https://localhost:8001/login', values);
        console.log('Response:', response);
        if (response.data.success) {
          
          localStorage.setItem('user', JSON.stringify(response.data.user));
          navigate('/dashboard'); 
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error('Login error:', error);
        alert('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className="container">
      <div className="left">
        <div className="logo">
          <Link to="/"><img src="/img/logo.svg" alt=""/></Link>
        </div>
        <div className="welcome-message">
          Welcome back!<br />
          Please login/Signup to your account.
        </div>
        <div className="login-container">
          <form className="login" onSubmit={handleSubmit}>
            <input name="email" type="text" placeholder="Email Address" onChange={handleInput} />
            {errors.email && <span className='text-danger'>{errors.email}</span>}
            <input name="password" type="password" placeholder="Password" onChange={handleInput} />
            {errors.password && <span className='text-danger'>{errors.password}</span>}
            <div className="log">
              <button type="submit" className="login-button">Login</button>
              <Link to="/register" className="sign-up-button">Sign up</Link>
            </div>
          </form>
          
        </div>
      </div>
      <div className="login-right">
        <div className="image">
          <img src="/img/people2.svg" alt=""/>
        </div>
        <div className="go-back-button">
          <Link to="/">Go back</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
