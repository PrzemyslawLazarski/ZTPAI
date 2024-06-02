import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css'; 
import axios from 'axios'; 
import Validation from './RegisterValidation'

function Register() {
useEffect(() => {
    document.title = 'Register';
  }, []);

  const [values,setValues] = useState({
    nickname: "",
    email: "",
    password: "",
    confirmedPassword: ""
  });
  const navigate = useNavigate();
  const [errors,setErrors] = useState({})

  const handleInput = (event) => {
  const { name, value } = event.target;
  setValues(prev => ({ ...prev, [name]: value }));
};

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    if(errors.nickname === "" && errors.email === "" && errors.password === "")
      {
        axios.post('https://localhost:8001/register', values)
        .then(res => console.log(res))
        .catch(err => console.log(err));
        navigate("/login");
      }
  }

  return (
    <div className="container">
      <div className="left">
        <div className="logo">
          <Link to="/"><img src="img/logo.svg" alt="" /></Link>
        </div>
        <div className="welcome-message">
          Welcome!<br />
          Kindly fill in this form to register.
        </div>
        <div className="login-container">
          <form  action="" onSubmit={handleSubmit} className="register">
            
            <input name="nickname" onChange={handleInput} type="text" placeholder="nickname" />
            {errors.nickname && <span className='text-danger'>{errors.nickname} </span> }
            <input name="email" onChange={handleInput} type="text" placeholder="email@email.com" />
            {errors.email && <span className='text-danger'>{errors.email} </span> }
            <input name="password" onChange={handleInput} type="password" placeholder="password" />
            {errors.password && <span className='text-danger'>{errors.password} </span> }
            <input name="confirmedPassword"  onChange={handleInput} type="password" placeholder="confirm password" />
            {errors.confirmedPassword && <span className='text-danger'>{errors.confirmedPassword} </span> }
            <div className="already-have"> Already have an account?<Link to="/login">Login</Link></div>
            <button type="submit" className='sign-up-button' id="sign-up-button">Sign up</button>
          </form>
        </div>
      </div>
      <div className="login-right">
        <div className="image">
          <img src="img/people2.svg" alt=""/>
        </div>
        <div className="go-back-button">
          <Link to="/login">Go back</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
