const moleHole = { 
     1: 'green',
     0: 'transparent'
    };
// Game Start variables.
const bonkLimit = 3;
let bonks = 0;
let score = 0; 
let molesMade = 0;
let gameModeMaxMoles = 5;
let board = [0,0,0,0,0,0,0,0,0];
let result = null;
let clicks = 0;
let accu;
let makeItStop = null;

const init = function(){    
    molesMade = 0;
    makeItStop = setInterval(() => {
        makeMole();
        render();
    },2000);
}
//let currentPercent = null;
const holes = document.querySelector('div.mole-land');

const startBtn = document.getElementById('start'); 

const scoreBoard = document.getElementById('score');

//<!------------ event listeners -------------->
holes.addEventListener('click', function(event){
    clicks+=1;
    moleClicked(event);
    console.log(event.target.id); 
});

startBtn.addEventListener('click', init);

    
function moleClicked(){
    if(board[event.target.id] === 0) {
        score-=2;
    }else if(board[event.target.id] === 1){
        score+=1
        bonks+=1
        if (bonks === bonkLimit){
            makeMole();
        }
    }    
    render();
}

let render = function(){
    board.forEach(function(value, index) {
        document.getElementById(index).style.backgroundColor = moleHole[value];
    });
score.innerHTML = `Score: ${score}`;

//display score
}
const gameEnd = function(){

    if(score > molesMade){
    scoreBoard.innerHTML = `high score: ${score}  Title earned SLAYER OF THE UNDERWORLD!`
    }else if(score === molesMade){
        scoreBoard = ('href', 'https://careers.servicemaster.com/en-US/page/terminix  ' ` good score: ${score} Terminex is hiring.`)
    }else if(score === 0){
        scoreBoard.innerHTML = `0 moles: You are a saint, a friend of the moles. The mole god is pleased.`
    }else{scoreBoard.innerHTML = `score: ${score} suggested read: How to Wack-A-Mole. for dummies.`
}
}



const makeMole = function(){
    bonks = 0;
    let moleLocation = Math.floor(Math.random() * 9); // 2
    if(molesMade >= gameModeMaxMoles){
        console.log(`moles made = ${molesMade} and clicks registered = ${clicks}.`)
        clearInterval(makeItStop);
        board.fill(0)
        gameEnd();
        render();
        // should be moved to render function.
       

    }else if (board[moleLocation] === 1){
        makeMole();
    } else {
    console.log(moleLocation);
    board.fill(0);
    molesMade+=1;
    console.log(`moles made ${molesMade}`);
    board[moleLocation] = 1;
    render();
    }
}









//this is a intervalcounter for keyframe animations
// var showPercent = window.setInterval(function() {
//     if (currentPercent < 100) {
//       currentPercent += 1;
//     } else {
//       currentPercent = 0;
//     }
//     // Updates a div that displays the current percent
//     document.getElementById('percent').innerHTML = currentPercent;
//   }, 40);

