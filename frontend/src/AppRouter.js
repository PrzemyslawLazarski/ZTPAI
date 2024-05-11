import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; // Importujesz Switch razem z BrowserRouter

// Definicja komponentów dla różnych ścieżek
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import HowItWorks from './pages/How-it-works';
import Dashboard from './pages/Dashboard';
import MyQuizzes from './pages/My-quizzes';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/how-it-works" component={HowItWorks} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/my-quizzes" component={MyQuizzes} />
        {/* Dodaj więcej tras tutaj */}
      </Switch>
    </Router>
  );
};

export default AppRouter;
