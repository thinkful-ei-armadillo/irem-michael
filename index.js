'use strict';

const STORE = [
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
  }
];

let qNum = 0;
let score = 0;
let begun = false;

//render question
function renderQuestion(){
  $('.answerForm').html(genQuestion());
  //console.log('`renderQuestion` ran');
}

//gen question html
function genQuestion(){
  if(begun && qNum < STORE.length){
    return `
    <div class="progress">
      <ul>
        <li>Question: <span class="qNum">${qNum + 1}</span>/5</li>
        <li>Score: <span class="score">${score}</span></li>
      </ul>
    </div>
    <div class="question">
      <h2>${STORE[qNum].question}</h2>
        <form class ="question-form">
          <label class="option">
            <input type="radio" value="${STORE[qNum].answers[0]}" name="answer" required>
              <span>${STORE[qNum].answers[0]}</span>
          </label>
          <br>
          <label class="option">
            <input type="radio" value="${STORE[qNum].answers[1]}" name="answer" required>
              <span>${STORE[qNum].answers[1]}</span>
          </label>
          <br>
          <label class="option">
            <input type="radio" value="${STORE[qNum].answers[2]}" name="answer" required>
                <span>${STORE[qNum].answers[2]}</span>
          </label>
          <br>
          <label class="option">
            <input type="radio" value="${STORE[qNum].answers[3]}" name="answer" required>
                <span>${STORE[qNum].answers[3]}</span>
          </label>
          <br>
          <button type="submit" class="submitAnswer">Submit</button>
          </form>
      </div>`;
  }
  else if(begun && qNum === (STORE.length - 1)){
    renderResult();
    $('.qNum').text(5);
  }
  //console.log('`genQuestion` ran');
}

//event handler
function handleSubmit(){
  $('.answerForm').on('submit', '.question-form', function(event){
    event.preventDefault();
    let selected = $('input:checked');
    let guess = selected.val();
    let correctAnswer = STORE[qNum].correctAns;
    if(qNum < (STORE.length -1)){
      if(guess === correctAnswer){
        answerFeedbackCorrect();
        incScore();
      }
      else{
        answerFeedbackIncorrect();
      }
      qNum++;
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
    console.log('`handleSubmit` ran');
  });
}

//event handler for answer pg
function handleNextQ(){
  $('.answerForm').on('click', '.nextQ', function(event){
    event.preventDefault();
    renderQuestion();
    console.log('`handleNextQ` ran');
  });
}

//event handler for final q
function handleResults(){
  $('.answerForm').on('click', '.resultBtn', function(event){
    event.preventDefault();
    renderResult();
    console.log('`handleResults` ran');
  });
}
function handleRestart(){
  $('.answerForm').on('click', '.startBtn', function(event){
    event.preventDefault();
    qNum = 0;
    score =0;
    renderQuestion();
    console.log('`handleRestart` ran');
  });
}

//answer feedback
function answerFeedbackCorrect(){
  let correctAns = `${STORE[qNum].correctAns}`;
  $('.answerForm').html(`
   <div class="feedback">
     <p>Correct!</p>
     <button type="button" class="nextQ">Next Question</button>
   </div>`);
  console.log('`answerFeedbackCorrect` ran');
}

function answerFeedbackIncorrect(){
 let correctAns = `${STORE[qNum].correctAns}`;
 $('.answerForm').html(`
   <div class="feedback">
     <p>Incorrect! The correct answer is "${correctAns}"</p>
     <button type="button" class="nextQ">Next Question</button>
   </div>`);
   console.log('`answerFeedbackIncorrect` ran');
}

function lastAnswerFeedbackCorrect(){
  let correctAns = `${STORE[qNum].correctAns}`;
  $('.answerForm').html(`
   <div class="feedback">
     <p>Correct!</p>
     <button type="button" class="resultBtn">View Results</button>
   </div>`);
  console.log('`lastAnswerFeedbackCorrect` ran');
}

function lastAnswerFeedbackIncorrect(){
  let correctAns = `${STORE[qNum].correctAns}`;
  $('.answerForm').html(`
   <div class="feedback">
     <p>Incorrect! The correct answer is "${correctAns}"</p>
     <button type="button" class="resultBtn">View Results</button>
   </div>`);
  console.log('`lastAnswerFeedbackIncorrect` ran');
}

//change question number
function changeQNumber(){
 $('.qNum').text(qNum + 1);
 console.log('`changeQNumber` ran');
}

//increment score if correct answer
function incScore(){
  score ++;
  $('.score').text(score);
  console.log('`incScore` ran');
}

//render results post-quiz
function renderResult(){
  if(score >= 3){
    $('.answerForm').html(`
      <div class="result">
        <p>Congratulations, you passed! You got ${score}/5 questions right!</p>
          <button type="button" class="startBtn">Restart Quiz</button>
      </div>`);
  }
  else{
    $('.answerForm').html(`
      <div class="result">
        <p>Sorry, you failed! You got ${score}/5 questions right.</p>
          <button type="button" class="startBtn">Restart Quiz</button>
      </div>`);
  }
  console.log('`renderResult` ran');
}

//begin quiz
function startQuiz(){
  $('.startQuiz').on('click', '.startBtn', function(event){
    $('.startQuiz').remove();
    begun = true;
    //$('.answerForm').css();
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