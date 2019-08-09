const moleHole = { 
     1: 'transparent',
     0: 'transparent'
    };
// Game Start variables.
debugger
let sounds = new Audio();
const bonkLimit = null;
let bonks = 0;
let score = 0; 
let molesMade;
let gameModeMaxMoles = 20;
let board = new Array(27).fill(0);
console.log(board)//[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
let result = null;
let clicks = 0;
let accu;
let makeItStop = null;
let moleLocation = null;

//localStorge for de user IghScore mon,da setup 

let highScore = localStorage.getItem('highScore') || 0;
localStorage.setItem('highScore',highScore);

const varInit = function(){
    clicks = 0;
    makeItStop = 0;
    moleLocation = null;
    bonks = 0;
    score = 0;
    molesMade = 0;    
}
const bonkSound = function(){
    sounds.src = '/sounds/hammerDown.wav'
    sounds.play();
}

const moleSound = function(){
    sounds.src = '/sounds/dead.wav'
    sounds.play();
}
const gameEnd = function(){
    getHigh(score);
    
    console.log(` 
        bonkLimit:${bonkLimit}
        bonks:${bonks}
        score:${score} 
        molesMade:${molesMade}
        gameModeMaxMoles:${gameModeMaxMoles}
        board:${board}
        result:${result}
        clicks:${clicks}
        makeItStop:${makeItStop}
        moleLocation :${moleLocation} 
        highScore:${highScore}
`)
    if(score > molesMade){
    display.innerHTML = `Ultra Score: ${score} Title earned SLAYER OF THE UNDERWORLD!`
    }else if(score === molesMade){
        display.innerHTML = `good score: ${score} Terminex is hiring. https://careers.servicemaster.com/en-US/page/terminix `
    }else if(score === 0){
        display.innerHTML = `0 moles: You are a saint, a friend of the moles. The mole god is pleased.`
    }else if(score < 0){display.innerHTML = `score: ${score} suggested read: How to Wack-A-Mole. for dummies.`
}
varInit();
}
const getHigh = function(s){
    if(s > highScore){
        highScore = s;
        localStorage.setItem('highScore',highScore);
    }
    return highScore;
}

const init = function(){ 
    score = 0;
    molesMade = 0;

    makeItStop = setInterval(() => {
        makeMole();
        render();
        
    },2000);

}

function moleClicked(e){
   
    if(e.target.classList[1] === 'up'){
        console.log('direct hit!')
        moleSound();
        score++;
        bonks++;
        if (bonks === bonkLimit){
            bonks = 0;
            makeMole();
        }
    } else {
        bonkSound();
        console.log('miss')
        score--;
    }    
    render();
}

//<----------------html ref vars--------------------->
const startBtn = document.getElementById('start'); 
const holes = document.querySelector('div.mole-land');
const display = document.getElementById('display');
const theScore = document.getElementById('score');
const mole = document.getElementsByClassName('down');
const hiScrB = document.getElementById('hiScore');
//<!------------- event listeners ---------------->

holes.addEventListener('click', function(event){
    clicks+=1;
    moleClicked(event);
    console.log(event.target.id); 
});

startBtn.addEventListener('click', init);

let render = function(){
    theScore.innerHTML = `Score: ${score}`; 
    hiScrB.innerHTML = `Hi-Score:${highScore}`
}


const makeMole = function(){
    if(molesMade >= 1){
    mole[moleLocation].classList.remove('up');
    mole[moleLocation].classList.add('down');
    }
    moleLocation = Math.floor(Math.random() * 27); 
    
    if(molesMade === gameModeMaxMoles){
        console.log(`moles made = ${molesMade} and clicks registered = ${clicks}.`)
        clearInterval(makeItStop);
        gameEnd();
        board.fill(0)
        render();
    }else if (board[moleLocation] === 1){
        makeMole();
    } else {
    
    board.fill(0);
    molesMade++;
    
    board[moleLocation] = 1;
    mole[moleLocation].classList.add('up')
    
    render();
    
    }
}
render();
