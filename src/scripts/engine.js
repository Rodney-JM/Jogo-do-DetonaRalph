document.querySelectorAll('.mode').forEach((button)=>{
    button.addEventListener('click', function(){
        const mode = this.getAttribute('data-mode');
        state.actions.setGameMode(mode);
    })
})
// Views e Value, Os views são variáveis visuais, já o value são variáveis de controle

//Gerenciamento de status globais
const state = {
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives"),
        start: document.querySelector("#start"),
        initialPage: document.querySelector(".game-start"),
        easy_mode: document.querySelector("#easy"),
        medium_mode: document.querySelector("#medium"),
        hard_mode: document.querySelector("#hard"),
        impossible_mode: document.querySelector("#impossible"),
        game_mode: document.querySelector(".game-mode"),
    },
    value:{
        gameVelocity: 1000,
        hitPosition:0,
        result: 0,
        currentTime: 60,
        currentLive: 3
    },
    actions:{
        countDownTimerId: null,
        timeId: null,
        setGameMode: function(mode){
            switch(mode){
                case 'easy':
                    state.value.gameVelocity = 1000;
                break;
                case 'medium':
                    state.value.gameVelocity = 850;
                    break;
                case 'hard':
                    state.value.gameVelocity = 600;
                    break;
                case 'impossible':
                    state.value.gameVelocity = 400;
                    break;
            }
        }
    }//Executam funções
}//A function pode ser colocada dentro do próprio init ou dentro do objeto


function initialPage() {
    state.view.initialPage.classList.remove("active");    
    state.view.start.addEventListener('click', () => {
        state.view.initialPage.classList.add("active");
        countDownTimer();
    });
}


function countDownTimer() {
    state.actions.countDownTimerId = setInterval(countDown, 1000);
}


function countDown(){
    state.value.currentTime--;
    state.view.timeLeft.textContent = state.value.currentTime;

    if(state.value.currentTime<=0){
        clearInterval(state.actions.countDownTimerId);
        alert("Game Over! A sua pontuação foi: "+ state.value.result);
    }
}

//function que adiciona o  inimigo aleatoriamente

function randomSquare(){
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy");
    })
    let randomNumber = Math.floor(Math.random()*9); // Pego a parte inteira dele de 1 a 9
    let randomSquare = state.view.squares[randomNumber];

    randomSquare.classList.add("enemy");
    state.value.hitPosition = randomSquare.id;
}

function playSound(soundName){
    let audio = new Audio(`./src/audios/${soundName}.mp3`);
    audio.volume = 0.2;
    audio.play();
}

 function moveEnemy(){
    state.value.timeId = setInterval(randomSquare, state.value.gameVelocity);
} 

//Um listener é adicionar uma forma de ouvir alguma ação

function livesUser(){
    state.view.lives.textContent= state.value.currentLive--;
        if(state.view.lives.textContent<0){
            alert("Game Over!");
            window.location.reload();
        }

}

function addListenerHitBox(){
    state.view.squares.forEach((square)=>{
        square.addEventListener('mousedown', ()=>{
            if(square.id === state.value.hitPosition){
                state.value.result++; //Aumenta a pontuação do player
                state.view.score.textContent = state.value.result;//Mostra de forma visual
                state.value.hitPosition = null;//Faz o próximo quadrado ser escolhido de forma randomica
                playSound("hit");
            }else if(square.id!== state.value.hitPosition){
                livesUser();
            }
        })
    })
}

//Sempre existe uma function de início
function init(){
        initialPage();
        moveEnemy(); 
        addListenerHitBox();
}

init();