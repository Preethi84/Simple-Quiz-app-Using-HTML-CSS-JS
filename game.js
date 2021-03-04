const question = document.getElementById('question'); 
const choices =Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressbarfull = document.getElementById('progress-bar-full');
const loader = document.getElementById('loader');
const game=document.getElementById('game');

let currentquestion ={}; //object
let acceptingAnswers = false;
let score=0;
let questionCounter =0;
let availableQuestions =[]; //array

let questions = [];
fetch("https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple")
.then(res =>{
 return res.json();
    })
    .then(loadedquestions =>{
       questions= loadedquestions.results.map(loadedquestion =>{
            const formattedquestion = {
                question:loadedquestion.question
            };
            const answerchoices = [...loadedquestion.incorrect_answers];
            formattedquestion.answer = Math.floor(Math.random()*3) +1 ;
            answerchoices.splice(formattedquestion.answer -1, 0,loadedquestion.correct_answer);
          
            answerchoices.forEach((choice,index) => {
                formattedquestion["choice" + (index+1)] = choice
            })
            return formattedquestion;  
        });
        //questions=loadedquestions;
        startGame();
    })
    .catch(err =>{
        console.error(err);
    })




//CONSTANTS

let CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = (/*parameters*/) => {
    questionCounter=0;
    availableQuestions =[...questions]; //... is spread operator
    console.log(availableQuestions);
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
};

getNewQuestion = () =>{
    if(availableQuestions === 0 || questionCounter >= MAX_QUESTIONS){
    //go to end  page
    localStorage.setItem("mostRecentscore", score);
    return window.location.assign('/end.html');
    }
    questionCounter++;
progressText.innerText = `Question: ${questionCounter}/${MAX_QUESTIONS}`;
//update the progress bar
progressbarfull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`


const questionIndex = Math.floor(Math.random() * availableQuestions.length);
currentquestion = availableQuestions[questionIndex];
question.innerText = currentquestion.question;

choices.forEach(choice => {
    const number = choice.dataset['number'];
    choice.innerText = currentquestion['choice'+  number]
});
 
availableQuestions.splice(questionIndex,1);
acceptingAnswers = true;

};

choices.forEach(choice => {
    choice.addEventListener('click', e =>{
        if(!acceptingAnswers) return;

        acceptingAnswers= false;
        const selectedchoice = e.target;
        const selectedAnswer = selectedchoice.dataset['number'];

        const classToApply =
        selectedAnswer == currentquestion.answer ? 'correct': 'Incorrect';
        if(classToApply === "correct")
        {
            incrementScore(CORRECT_BONUS);
        }

         selectedchoice.parentElement.classList.add(classToApply);

         setTimeout( () =>{
         selectedchoice.parentElement.classList.remove(classToApply);
         getNewQuestion();
         },1000);
         
    });
})

incrementScore = num =>{
    score +=num;
    scoreText.innerText =score;
}
 