'use strict';

const DATA = [
  {
    question: 'Question 1?',
    answers: [
      'ans1',
      'ans2',
      'ans3',
      'ans4'
      ],
    correctAns: 'ans1'
  },
  {
    question: 'Question 2?',
    answers: [
      'ans1',
      'ans2',
      'ans3',
      'ans4'
      ],
    correctAns: 'ans1'
  },
  {
    question: 'Question 3?',
    answers: [
      'ans1',
      'ans2',
      'ans3',
      'ans4'
      ],
    correctAns: 'ans1'
  },
  {
    question: 'Question 4?',
    answers: [
      'ans1',
      'ans2',
      'ans3',
      'ans4'
      ],
    correctAns: 'ans1'
  },
  {
    question: 'Question 5?',
    answers: [
      'ans1',
      'ans2',
      'ans3',
      'ans4'
      ],
    correctAns: 'ans1'
  },
  {
    question: 'Question 6?',
    answers: [
      'ans1',
      'ans2',
      'ans3',
      'ans4'
      ],
    correctAns: 'ans1'
  },
  {
    question: 'Question 7?',
    answers: [
      'ans1',
      'ans2',
      'ans3',
      'ans4'
      ],
    correctAns: 'ans1'
  }
];

const STATE = {
  qNum: 0,
  totalQ: DATA.length,
  score: 0,
  begun: false
};

//render question
function renderQuestion(){
  $('.quizStage').html(genQuestion());
}

//gen question html
function genQuestion(){
  if(STATE.begun && STATE.qNum < DATA.length){
    return `
    <div class="progress">
      <ul>
        <li>Question: <span class="qNum">${STATE.qNum + 1}</span>/${STATE.totalQ}</li>
        <li>Score: <span class="score">${STATE.score}</span></li>
      </ul>
    </div>
    <div class="question">
      <h2>${DATA[STATE.qNum].question}</h2>
        <form class ="questionForm">
          <label class="option">
            <input type="radio" value="${DATA[STATE.qNum].answers[0]}" name="answer" required>
              <span>${DATA[STATE.qNum].answers[0]}</span>
          </label>
          <br>
          <label class="option">
            <input type="radio" value="${DATA[STATE.qNum].answers[1]}" name="answer" required>
              <span>${DATA[STATE.qNum].answers[1]}</span>
          </label>
          <br>
          <label class="option">
            <input type="radio" value="${DATA[STATE.qNum].answers[2]}" name="answer" required>
                <span>${DATA[STATE.qNum].answers[2]}</span>
          </label>
          <br>
          <label class="option">
            <input type="radio" value="${DATA[STATE.qNum].answers[3]}" name="answer" required>
                <span>${DATA[STATE.qNum].answers[3]}</span>
          </label>
          <br>
          <button type="submit" class="submitAnswer">Submit</button>
          </form>
      </div>`;
  }
}

//event handler for answer guesses
function handleSubmit(){
  $('.quizStage').on('submit', '.questionForm', function(event){
    event.preventDefault();
    let selected = $('input:checked');
    let guess = selected.val();
    let correctAnswer = DATA[STATE.qNum].correctAns;
    if(STATE.qNum < (DATA.length -1)){
      if(guess === correctAnswer){
        answerFeedbackCorrect();
        incScore();
      }
      else{
        answerFeedbackIncorrect();
      }
      STATE.qNum += 1;
    }
    else{
      if(guess === correctAnswer){
        lastAnswerFeedbackCorrect();
        incScore();
      }
      else{
        lastAnswerFeedbackIncorrect();
      }
    }
  });
}

//event handler for answer page
function handleNextQ(){
  $('.quizStage').on('click', '.nextQ', function(event){
    event.preventDefault();
    renderQuestion();
  });
}

//event handler for final q
function handleResults(){
  $('.quizStage').on('click', '.resultBtn', function(event){
    event.preventDefault();
    renderResult();
  });
}

//event handler for restart btn
function handleRestart(){
  $('.quizStage').on('click', '.startBtn', function(event){
    event.preventDefault();
    $('.result').remove();
    $('.startQuiz').show();
    STATE.begun = false;
    STATE.qNum = 0;
    STATE.score = 0;
    renderQuestion();
  });
}

//answer feedback
function answerFeedbackCorrect(){
  let correctAns = `${DATA[STATE.qNum].correctAns}`;
  $('.quizStage').html(`
   <div class="feedback">
     <p>Correct!</p>
     <button type="button" class="nextQ">Next Question</button>
   </div>`);
}

function answerFeedbackIncorrect(){
 let correctAns = `${DATA[STATE.qNum].correctAns}`;
 $('.quizStage').html(`
   <div class="feedback">
     <p>Incorrect! The correct answer is "${correctAns}"</p>
     <button type="button" class="nextQ">Next Question</button>
   </div>`);
}

function lastAnswerFeedbackCorrect(){
  let correctAns = `${DATA[STATE.qNum].correctAns}`;
  $('.quizStage').html(`
   <div class="feedback">
     <p>Correct!</p>
     <button type="button" class="resultBtn">View Results</button>
   </div>`);
}

function lastAnswerFeedbackIncorrect(){
  let correctAns = `${DATA[STATE.qNum].correctAns}`;
  $('.quizStage').html(`
   <div class="feedback">
     <p>Incorrect! The correct answer is "${correctAns}"</p>
     <button type="button" class="resultBtn">View Results</button>
   </div>`);
}

//change question number
function changeQNumber(){
 $('.qNum').text(STATE.qNum + 1);
}

//increment score if correct answer
function incScore(){
  STATE.score += 1;
  $('.score').text(STATE.score);
}

//render results post-quiz
function renderResult(){
  if(STATE.score >= (STATE.totalQ / 2)){
    $('.quizStage').html(`
      <div class="result">
        <p>Congratulations, you passed! You got ${STATE.score}/${STATE.totalQ} questions right!</p>
          <button type="button" class="startBtn">Restart Quiz</button>
      </div>`);
  }
  else{
    $('.quizStage').html(`
      <div class="result">
        <p>Sorry, you failed! You got ${STATE.score}/${STATE.totalQ} questions right.</p>
          <button type="button" class="startBtn">Restart Quiz</button>
      </div>`);
  }
}

//begin quiz
function startQuiz(){
  $('.startQuiz').on('click', '.startBtn', function(event){
    $('.startQuiz').hide();
    STATE.begun = true;
    changeQNumber();
    renderQuestion();
  });
}

//create the quiz with all functions
function createQuiz(){
  startQuiz();
  renderQuestion();
  handleSubmit();
  handleRestart();
  handleResults();
  handleNextQ();
}

$(createQuiz);