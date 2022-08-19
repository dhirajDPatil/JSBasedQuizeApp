const startButton = document.getElementById('start-btn');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const background = document.getElementsByTagName('body')[0];
let shuffeledQuestions;
let currentQuestionIndex;
let currentQestion;
let result=``;
let attemptedQuetions=0;
let correctQuetions = 0;
let wrongQuestions = 0;

startButton.addEventListener('click', startGame);

function startGame () {
    // console.log("Started");
    startButton.classList.add('hide');
    shuffeledQuestions = questions.sort((a, b) => Math.random()-0.5);
    currentQuestionIndex = 0;
    setNextQuestion(shuffeledQuestions, currentQuestionIndex);
    questionContainer.classList.remove('hide');
    nextButton.classList.remove('hide');
    nextButton.addEventListener('click', setonClickNextQuestion);
}

function setonClickNextQuestion (){
    currentQuestionIndex++;
    if(background.classList.contains('correct')){
        background.classList.remove('correct');
    }else{
        background.classList.remove('wrong');
    }
    
    if(currentQuestionIndex < shuffeledQuestions.length){
        showQuestion(shuffeledQuestions[currentQuestionIndex]);
    } else{
        answerButtonElement.removeEventListener('click', selectAnswer);
        showEndOfQuize();
    }
}

function setNextQuestion(shuffeledQuestions, currentQuestionIndex){
    showQuestion(shuffeledQuestions[currentQuestionIndex]);
}

function showQuestion(qData){
    // console.log(qData);
    currentQestion = qData;
    questionElement.innerText = qData.question;
    let ans = "";
    qData.answer.forEach((el)=>{
        ans += `<button class="btn">${el.text}</button>`;
    })
    answerButtonElement.innerHTML = ans;
    answerButtonElement.addEventListener('click', selectAnswer);
}

function showEndOfQuize(){
    let outputSentence;
    outputSentence =  attemptedQuetions>1 ? `Total number of questions attempted are ${attemptedQuetions} ` : `Total number of questions attempted is ${attemptedQuetions} `;
    outputSentence += correctQuetions>1 ? `out of which ${correctQuetions} are correct `: `out of which ${correctQuetions} is correct `;
    outputSentence += wrongQuestions>1 ? `and ${wrongQuestions} are wrong</h3>`: `and ${wrongQuestions} is wrong</h3>`;

    // result += `<h3 class="result">Total number of questions attempted ${attemptedQuetions} out of which ${correctQuetions} is/are correct and ${wrongQuestions} is/are wrong</h3>`;
    result += outputSentence;
    answerButtonElement.innerHTML = result; //"This is the End of the Quize, Thank you for your Time...!";
    nextButton.classList.add('hide');
    questionElement.classList.add('hide');
}

function selectAnswer(event){
    attemptedQuetions++;
    let userAnswer = event.target.innerText;
    // console.log(event.target.innerText);
    // console.log(currentQestion.answer);
    if(checkforCorrectAnswer(userAnswer, currentQestion.answer)){
        correctQuetions++;
        background.classList.add('correct');
        result += `<h3 style="background-color: green;" class="result">${currentQestion.question} is Correct for option ${userAnswer}</h3>`;
    } else{
        wrongQuestions++;
        background.classList.add('wrong');
        result += `<h3 style="background-color: red;" class="result">${currentQestion.question} is Wrong for option ${userAnswer}</h3>`;
    }
    answerButtonElement.removeEventListener('click', selectAnswer);
}

function checkforCorrectAnswer(uAns, options){
    let flag = false;
    options.forEach(element => {
        if(uAns === element.text && element.correct){
            flag = true;
        }
    });
    return flag;
}

const questions = [
    {
        question: "What is 2 + 2 ?",
        answer: [
            {text : "4", correct: true},
            {text : "22", correct: false}
        ]
    },
    {
        question: "What is 12 + 2 ?",
        answer: [
            {text : "14", correct: true},
            {text : "122", correct: false}
        ]
    },
    {
        question: "Who is Great in Animals ?",
        answer: [
            {text : "Lion", correct: false},
            {text : "Tiger", correct: false},
            {text : "Dog", correct: true},
            {text : "Cat", correct: false}
        ]
    },
]
