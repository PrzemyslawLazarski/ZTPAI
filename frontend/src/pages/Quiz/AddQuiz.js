import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../Dashboard/NavBar';

function AddQuiz() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    filename: '',
    questions: [
      {
        text: '',
        answers: [
          { text: '', isCorrect: false },
          { text: '', isCorrect: false },
          { text: '', isCorrect: false },
          { text: '', isCorrect: false }
        ]
      }
    ]
  });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;
    if (name === 'image' && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          image: reader.result,
          filename: file.name
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleQuestionChange = (index, event) => {
    const newQuestions = [...formData.questions];
    newQuestions[index].text = event.target.value;
    setFormData((prevData) => ({
      ...prevData,
      questions: newQuestions
    }));
  };

  const handleAnswerChange = (questionIndex, answerIndex, event) => {
    const newQuestions = [...formData.questions];
    newQuestions[questionIndex].answers[answerIndex].text = event.target.value;
    setFormData((prevData) => ({
      ...prevData,
      questions: newQuestions
    }));
  };

  const handleCorrectAnswerChange = (questionIndex, answerIndex) => {
    const newQuestions = [...formData.questions];
    newQuestions[questionIndex].answers.forEach((answer, index) => {
      if (index === answerIndex) {
        answer.isCorrect = true;
      } else {
        answer.isCorrect = false;
      }
    });
    setFormData((prevData) => ({
      ...prevData,
      questions: newQuestions
    }));
  };

  const validateForm = () => {
    const { title, description, image, questions } = formData;

    if (!title.trim() || !description.trim() || !image) {
      alert('Title, description, and image are required!');
      return false;
    }

    for (const question of questions) {
      if (!question.text.trim()) {
        alert('Question cannot be empty!');
        return false;
      }

      let correctAnswerSelected = false;
      for (const answer of question.answers) {
        if (!answer.text.trim()) {
          alert('Answer cannot be empty!');
          return false;
        }

        if (answer.isCorrect) {
          correctAnswerSelected = true;
        }
      }

      if (!correctAnswerSelected) {
        alert('Select the correct answer for each question!');
        return false;
      }
    }

    return true;
  };

  const addQuestion = () => {
    setFormData((prevData) => ({
      ...prevData,
      questions: [
        ...prevData.questions,
        {
          text: '',
          answers: [
            { text: '', isCorrect: false },
            { text: '', isCorrect: false },
            { text: '', isCorrect: false },
            { text: '', isCorrect: false }
          ]
        }
      ]
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post('https://localhost:8001/api/quizzes', formData);
      console.log('Quiz created:', response.data);
      alert('Quiz created successfully');
      navigate("/my-quizzes");
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
        <section className="project-form">
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
                {formData.questions.map((question, questionIndex) => (
                  <div key={questionIndex} className="question-container">
                    <input
                      name="question"
                      type="text"
                      placeholder={`Question ${questionIndex + 1}`}
                      value={question.text}
                      onChange={(e) => handleQuestionChange(questionIndex, e)}
                    />
                    {question.answers.map((answer, answerIndex) => (
                      <div key={answerIndex} className="answer-container">
                        <input
                          name="answer"
                          type="text"
                          placeholder={`Answer ${answerIndex + 1}`}
                          value={answer.text}
                          onChange={(e) => handleAnswerChange(questionIndex, answerIndex, e)}
                        />
                        <div className="checkbox-container">
                          <input
                            type="radio"
                            id={`correct_${questionIndex}_${answerIndex}`}
                            checked={answer.isCorrect}
                            onChange={() => handleCorrectAnswerChange(questionIndex, answerIndex)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="form-buttons">
              <button type="submit">Send</button>
              <button type="button" onClick={addQuestion}>Add Question</button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default AddQuiz;
