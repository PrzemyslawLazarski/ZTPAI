import React from 'react';
import { createBrowserRouter,Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import HowItWorks from './pages/How-it-works';
import Dashboard from './pages/Dashboard';
import MyQuizzes from './pages/My-quizzes';

import RootLayout from './RootLayout';

const router = createBrowserRouter(
  createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="how-it-works" element={<HowItWorks />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="my-quizzes" element={<MyQuizzes />} />
        </Route>
    )
  
)

function App() {
  return (
    
    
      <RouterProvider router={router} />
    
  );
}

export default App;