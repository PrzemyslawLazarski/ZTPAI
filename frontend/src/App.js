import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import HowItWorks from './pages/How-it-works';
import AboutUs from './pages/Aboutus';
import Features from './pages/Features';
import Dashboard from './pages/Dashboard';
import MyQuizzes from './pages/My-quizzes';
import Discover from './pages/Discover';
import AddQuiz from './pages/AddQuiz';
import QuizGame from './pages/QuizGame';
import Profile from './pages/Profile';
import QuizInfo from './pages/QuizInfo'; 
import AdminPanel from './pages/AdminPanel'; 

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
        <Route path="/discover" element={<Discover />} />
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
