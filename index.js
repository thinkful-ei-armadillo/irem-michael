'use strict';

const DATA = [
  {
    question: 'How many different types of coats do dachshunds have?',
    answers: [
      '1',
      '2',
      '3',
      '4'
      ],
    correctAns: '3'
  },
  {
    question: 'How much does a dachshund usually weigh?',
    answers: [
      '10 lbs',
      '20 lbs',
      '35 lbs',
      '50 lbs'
      ],
    correctAns: '35 lbs'
  },
  {
    question: 'What was the original purpose of breeding dachshunds?',
    answers: [
      'Hunting',
      'Herding',
      'Domestication',
      'Racing'
      ],
    correctAns: 'Hunting'
  },
  {
    question: 'What did the American Kennel Club rename the dachshund breed to during WWI?',
    answers: [
      'Liberty Pups',
      'Badger Dogs',
      'German Hound',
      'Hot Dogs'
      ],
    correctAns: 'Badger Dogs'
  },
  {
    question: 'How popular are dachshunds in the United States?',
    answers: [
      '8th',
      '11th',
      '16th',
      '23rd'
      ],
    correctAns: '11th'
  },
  {
    question: 'Where was the dachshund used as a mascot?',
    answers: [
      'The First Formula 1 Race',
      'An Early MLB Team',
      'Boston University',
      'The 1972 Munich Olympic Games'
      ],
    correctAns: 'The 1972 Munich Olympic Games'
  },
  {
    question: 'What fast food was named after the dachshund?',
    answers: [
      'Kielbasa',
      'Corn Dogs',
      'Hot Dogs',
      'Wienerwald'
      ],
    correctAns: 'Hot Dogs'
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
        <li>Question: <span class="qNum">${STATE.qNum + 1}</span>/${STATE.totalQ} | </li>
        <li>Score: <span class="score">${STATE.score}</span></li>
      </ul>
    </div>
    <br>
    <br>
    <div class="question">
      <h2>${DATA[STATE.qNum].question}</h2>
      <br>
        <form class ="questionForm">
        <span class ="ansOpt">
          <label class="option">
            <input type="radio" value="${DATA[STATE.qNum].answers[0]}" name="answer" required>
            ${DATA[STATE.qNum].answers[0]}
          </label>
        </span>
        <span class ="ansOpt">
          <label class="option">
            <input type="radio" value="${DATA[STATE.qNum].answers[1]}" name="answer" required>
            ${DATA[STATE.qNum].answers[1]}
          </label>
        </span>
        <span class ="ansOpt">
          <label class="option">
            <input type="radio" value="${DATA[STATE.qNum].answers[2]}" name="answer" required>
            ${DATA[STATE.qNum].answers[2]}
          </label>
        </span>
        <span class ="ansOpt">
          <label class="option">
            <input type="radio" value="${DATA[STATE.qNum].answers[3]}" name="answer" required>
            ${DATA[STATE.qNum].answers[3]}
          </label>
        </span>
        <button type="submit" class="button submitAnswer">Submit</button>
        </form>
      </div>`;
  }
}

//event handler for answer guesses
function handleSubmit(){
  $('.quizStage').on('submit', '.questionForm', function(event){
    event.preventDefault();
    let guess = $('input:checked').val();
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
    <br>
    <h2>Correct!</h2>
    <img src ="https://i.pinimg.com/originals/d3/12/c5/d312c5a4cc1a3cb67b09c9b31703c278.jpg" alt="smiling Daschund">
    <button type="button" class="button nextQ">Next Question</button>
   </div>`);
}

function answerFeedbackIncorrect(){
 let correctAns = `${DATA[STATE.qNum].correctAns}`;
 $('.quizStage').html(`
   <div class="feedback">
     <br>
     <h2>Incorrect! The correct answer is "${correctAns}".</h2>
     <img src ="https://i.pinimg.com/originals/cc/5c/26/cc5c266fca6cc71754049eab8c22ea34.jpg" alt="sad Daschund">
     <button type="button" class="button nextQ">Next Question</button>
   </div>`);
}

function lastAnswerFeedbackCorrect(){
  let correctAns = `${DATA[STATE.qNum].correctAns}`;
  $('.quizStage').html(`
   <div class="feedback">
     <br>
     <h2>Correct!</h2>
     <img src ="https://i.pinimg.com/originals/d3/12/c5/d312c5a4cc1a3cb67b09c9b31703c278.jpg" alt="smiling Daschund">
     <button type="button" class="button resultBtn">View Results</button>
   </div>`);
}

function lastAnswerFeedbackIncorrect(){
  let correctAns = `${DATA[STATE.qNum].correctAns}`;
  $('.quizStage').html(`
   <div class="feedback">
     <br>
     <h2>Incorrect! The correct answer is "${correctAns}".</h2>
     <img src ="https://i.pinimg.com/originals/cc/5c/26/cc5c266fca6cc71754049eab8c22ea34.jpg" alt="sad Daschund">
     <button type="button" class="button resultBtn">View Results</button>
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
        <br>
        <h2>Congratulations, you passed! You got ${STATE.score}/${STATE.totalQ} questions right!</h2>
        <img src ="https://i.pinimg.com/originals/d3/12/c5/d312c5a4cc1a3cb67b09c9b31703c278.jpg" alt="smiling Daschund"> 
        <button type="button" class="button startBtn">Restart Quiz</button>
      </div>`);
  }
  else{
    $('.quizStage').html(`
      <div class="result">
        <br>
        <h2>Sorry, you failed! You got ${STATE.score}/${STATE.totalQ} questions right.</h2>
        <img src ="https://i.pinimg.com/originals/cc/5c/26/cc5c266fca6cc71754049eab8c22ea34.jpg" alt="sad Daschund">
        <button type="button" class="button startBtn">Restart Quiz</button>
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