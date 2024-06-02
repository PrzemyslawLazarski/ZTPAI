import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Security/Login';
import Register from './pages/Security/Register';
import HowItWorks from './pages/Home/How-it-works';
import AboutUs from './pages/Home/Aboutus';
import Features from './pages/Home/Features';
import Dashboard from './pages/Dashboard/Dashboard';
import MyQuizzes from './pages/Dashboard/My-quizzes';
import AddQuiz from './pages/Quiz/AddQuiz';
import QuizGame from './pages/Quiz/QuizGame';
import Profile from './pages/Dashboard/Profile';
import QuizInfo from './pages/Quiz/QuizInfo'; 
import AdminPanel from './pages/Dashboard/AdminPanel'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/features" element={<Features />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-quizzes" element={<MyQuizzes />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/adminpanel" element={<AdminPanel />} />
        <Route path="/addquiz" element={<AddQuiz />} />
        <Route path="/quiz/:id" element={<QuizGame />} />
        <Route path="/quiz/:id/info" element={<QuizInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
