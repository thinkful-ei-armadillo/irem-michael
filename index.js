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
    correctAns: 'ans4'}
];

let qNum = 0;
let score = 0;

//render question
function renderQuestion(){
  $('.answerForm').html(genQuestion());
}

//gen question html
function genQuestion(){
  if(qNum < STORE.length && qNum !== 0){
    return `
    <div class="question">
      <h2>This is the question. What is the answer?</h2>
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
  else{
    renderResult();
    $('.qNum').text(5);
  }
}

//event handler
function handleSubmit(){
  $('.answerForm').on('submit', '.question-form',function(event){
    event.preventDefault();
    let selected = $('input:checked');
    let guess = selected.val();
    // console.log(guess);
    let correctAnswer = `${STORE[qNum].correctAns}`;
    // console.log(correctAnswer);
    if(guess === correctAnswer){
      answerFeedbackCorrect();
      changeQNumber();
      incScore();
    }
    else{
      answerFeedbackIncorrect();
      changeQNumber();
    }
  });
}
//answer feedback
function answerFeedbackCorrect(){
 let correctAns = `${STORE[qNum].correctAns}`;
 $('.answerForm').html(`
   <div class="feedback>
     <p>Correct!</p>
     <button type="button" class="nextQ">Next Question</button>
   </div>`);
}

function answerFeedbackIncorrect(){
 let correctAns = `${STORE[qNum].correctAns}`;
 $('.answerForm').html(`
   <div class="feedback>
     <p>Incorrect! The correct answer is "${correctAns}"</p>
     <button type="button" class="nextQ">Next Question</button>
   </div>`);
}

//change question number
function changeQNumber(){
 qNum ++;
 $('.qNum').text(qNum + 1);
}


//increment score if correct answer
function incScore(){
  score ++;
  $('.score').text(score);
}

//render results post-quiz
function renderResult(){
  if(score = 5){
    //you got everything right
  }
  else if(score >= 3){
    //you passed
  }
  else{
    //you failed
  }
}

//render next question after user clicks 'next'
function renderNextQuestion(){
  $('main').on('click', '.nextQ', function(event){
    changeQNumber();
    renderQuestion();
    handleSubmit();
  });
}

//begin quiz
function startQuiz(){
  $('.startQuiz').on('click', '.startBtn', function(event){
    $('.startQuiz').remove();
    console.log('startQuiz ran');
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
  renderNextQuestion();
}

$(createQuiz);