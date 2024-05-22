
import { Link } from 'react-router-dom';
import './Dashboard.css'; 
import NavBar from './NavBar'; 

function AddQuiz(){

return(
    <div className="container">     
        <NavBar />
        <div className="board">
            Add Quiz
            <div className="separator"></div>
            <section class="project-form">
        <form id="quiz-form" onsubmit="return handleFormSubmit(event)">
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

            <input name="title" type="text" placeholder="Add title"  />
            <textarea name="description" rows="5" placeholder="Add description"/>
            <input type="file" name="file"/><br/>
        </div>
        <div id="questions-container">
            <div className="question">
                <input name="questions[]" type="text" placeholder="Question 1"></input>
                <div className="answer">
                    <input name="answers[0][]" type="text" placeholder="Answer"></input>
                    <input type="radio" name="correct_answer[0]" value="0"></input>
                </div>
                <div className="answer">
                    <input name="answers[0][]" type="text" placeholder="Answer"></input>
                    <input type="radio" name="correct_answer[0]" value="1"></input>
                </div>
                <div className="answer">
                    <input name="answers[0][]" type="text" placeholder="Answer"></input>
                    <input type="radio" name="correct_answer[0]" value="2"></input>
                </div>
                <div className="answer">
                    <input name="answers[0][]" type="text" placeholder="Answer"></input>
                    <input type="radio" name="correct_answer[0]" value="3"></input>
                </div>
            </div>
        </div>
    </div>
    <div className="form-buttons">
        <button type="submit">Send</button>
        <button type="button" onclick="addQuestion()">Add question</button>
    </div>
</form>
</section>
</div>
</div>
);
}

export default AddQuiz;