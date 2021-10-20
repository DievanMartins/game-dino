const dino = document.querySelector('.dino');
const backgroud = document.querySelector('.backgroud');

let isJumping = false;
let isGameOver = false;
let position = 0;
let point = 0;

function handleKeyUp(event){
    if(event.keyCode === 32){
        if(!isJumping){
            jump();
        }
    }
}

function jump(){
    isJumping = true;

    let upInterval = setInterval(() => {
        if(position >= 150){
            // Descendo
            clearInterval(upInterval);

            let downInterval = setInterval(() => {
                if(position <= 0){
                    clearInterval(downInterval);
                    isJumping = false;
                }else{
                    position -= 20;
                    dino.style.bottom = position + 'px'
                }
            }, 20);
        }else{
            position += 20;
            dino.style.bottom = position + 'px'
        }
        
    }, 20);
}

function createCactus(){
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;

    if (isGameOver) return;

    cactus.classList.add('cactus');
    backgroud.appendChild(cactus);
    cactus.style.left = 1000 + 'px';
    
    let leftInterval = setInterval(() =>{
        if(cactusPosition < -60) {
            // Saiu da tela
            clearInterval(leftInterval);
            backgroud.removeChild(cactus);
        }else if(cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            //game over
            clearInterval(leftInterval);
            isGameOver = true;
            document.body.innerHTML = `<h1  class="game-over">Fim de jogo sua pontuação foi ${point}</h1>`;
            //document.body.innerHTML = '<h1  class="game-over">Fim de jogo</h1>';
        }else{
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);

    setTimeout(createCactus, randomTime);
}

function score() {
    let date = new Date();
    let time = date.getSeconds();
    point += time
}
 
const createClock = setInterval(score, 1000);

createCactus();
document.addEventListener('keyup', handleKeyUp);