const username = document.getElementById('username');
const saveScoreButton = document.getElementById('saveScoreButton'); 
const mostRecentscore = localStorage.getItem('mostRecentscore');
finalscore.innerText = mostRecentscore;

const highscores = JSON.parse(localStorage.getItem('highscores')) || [];
const MAX_HIGH_SCORES = 5;

username.addEventListener('keyup',() =>{
    console.log(username.value);
    saveScorebutton.disabled = !username.value;
});

saveHighScore = e =>{
    e.preventDefault();

    const score = {
        score:Math.floor(Math.random() * 100),
        name:username.value,
    };
    highscores.push(score);

    highscores.sort((a,b) => b.score - a.score)
    highscores.splice(5);

    localStorage.setItem('highscores',JSON.stringify(highscores));
    window.location.assign("/");
    console.log(highscores);
}