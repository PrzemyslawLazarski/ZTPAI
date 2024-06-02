import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; 
import './Dashboard.css'; 
import NavBar from './NavBar';

function AdminPanel() {
  const [quizzes, setQuizzes] = useState([]); 
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    document.title = 'Admin Panel';
    
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('https://localhost:8001/api/quizzes'); 
        setQuizzes(response.data); 
      } catch (error) {
        console.error('Błąd pobierania quizów:', error);
      }
    };

    fetchQuizzes(); 
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDeleteQuiz = async (id) => {
    try {
      await axios.delete(`https://localhost:8001/api/quizzes/${id}`);
      setQuizzes(prevQuizzes => prevQuizzes.filter(quiz => quiz.id !== id));
      alert('Quiz deleted successfully!');
    } catch (error) {
      console.error('Error deleting quiz:', error);
    }
  };

  const filteredQuizzes = quizzes.filter(quiz =>
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quiz.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <NavBar/>
      <div className="right">
        <div className="board">
          Admin Panel
          <div className="separator"></div>
          <header>
            <div className="search-bar">
              <input 
                placeholder="search quiz" 
                value={searchTerm} 
                onChange={handleSearchChange} 
              />
            </div>
          </header>
          <section className="projects">
            {filteredQuizzes.map((quiz) => (
                <div key={quiz.id}>
                    <h3>{quiz.title}</h3>
                    <p>{quiz.description}</p>
                    {quiz.image && <img src={`/img/${quiz.image}`} alt="Quiz" />}
                    <button onClick={() => handleDeleteQuiz(quiz.id)}>DELETE</button>
                </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
