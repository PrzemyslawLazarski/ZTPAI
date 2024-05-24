import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';

function AddQuiz() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    questions: []
  });

  const navigate = useNavigate();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://localhost:8001/api/quizzes', formData);
      console.log('Quiz created:', response.data);
      alert('Quiz created successfully');
      navigate("/my-quizzes")
    } catch (error) {
      console.error('Error creating quiz:', error);
      alert('Quiz creation failed. Please try again.');
    }
  };

  return (
    <div className="container">
      <NavBar />
      <div className="board">
        Add Quiz
        <div className="separator"></div>
        <section class="project-form">
        <form onSubmit={handleFormSubmit}>
          <div className="header">
            <div className="quiz-header">
              Quiz
            </div>
            <div className="template-header">
              Questions
            </div>
          </div>
          <div className="quiz">
            <div className="template-container">
              <input name="title" type="text" placeholder="Add title" value={formData.title} onChange={handleInputChange} />
              <textarea name="description" rows="5" placeholder="Add description" value={formData.description} onChange={handleInputChange} />
              <input type="file" name="image" onChange={handleInputChange} /><br />
            </div>
            <div id="questions-container">
              {/* Add logic for adding questions here */}
            </div>
          </div>
          <div className="form-buttons">
            <button type="submit">Send</button>
            <button type="button">Add question</button>
          </div>
        </form>
        </section>
      </div>
    </div>
  );
}

export default AddQuiz;
