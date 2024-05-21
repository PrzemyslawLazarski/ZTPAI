
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
        
        <div id="questions-container">
            <div className="question">
                <input name="questions[]" type="text" placeholder="Question 1"></input>
                <div class="answer">
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
</div>
</div>
);
}

export default AddQuiz;