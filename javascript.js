const h = document.body.querySelector('#rgb');
const banner = document.body.querySelector('#banner');
const rows = document.body.querySelectorAll('.row');
const divs = document.body.querySelectorAll('.color');
const again = document.body.querySelector('#play');
const choice = document.body.querySelectorAll('.mode');
const msg = document.body.querySelector('#msg');

let mode = false;
let n = 3;
let round;
let chosen;
let won = false;

for(let i=0; i<6; i++) {
    divs[i].addEventListener('click', ()=>updateGame(i));
}

again.addEventListener('click', (e)=> startGame());

choice[0].addEventListener('click', ()=> {
    if(!mode) {
        return;
    }

    mode = false;
    n = 3;
    startGame();
})
choice[1].addEventListener('click', ()=> {
    if(mode) {
        return;
    }

    mode = true;
    n = 6;
    startGame();
})


// a function to generate rgb strings
function rgbGen() {
    const r = Math.floor(Math.random()*255);
    const g = Math.floor(Math.random()*255);
    const b = Math.floor(Math.random()*255);
    const color = `rgb(${r}, ${g}, ${b})`;
    return color;
}

// a function to generate the colors
// an array of 3 for easy and 6 for hard mode
function rgbArr() {
    const colors = new Array(n);
    for (let i=0; i<n; i++) {
        colors[i] = rgbGen();
    }
    return colors;
}

function startGame() {
    won = false;
    banner.style.background = 'rgb(255, 188, 2)';
    msg.textContent = '';

    if(mode) {
        rows[1].style.display = "flex";
    } else {
        rows[1].style.display = "none";
    }

    round = rgbArr(mode);
    console.table(round);

    chosen = round[Math.floor(Math.random()*n)];

    h.textContent = chosen;

    for(let i=0; i<n; i++) {
        divs[i].classList.remove('wrong');
        divs[i].style.background = round[i];
    }
}

function updateGame(index) {
    if(won) {
        return;
    }

    if(round[index]===chosen) {
        gameWon();
    } else {
        wrongChoice(index);
    }
}

function gameWon() {
    for(let i=0; i<n; i++) {
        divs[i].style.background = chosen;
    }
    banner.style.background = chosen;
    msg.textContent = 'You Won!!';
    won = true;
}

function wrongChoice(index) {
    divs[index].style.background = "rgb(17, 17, 13)";
    msg.textContent = 'Try Again';
    divs[index].classList.add('wrong');
}

startGame();