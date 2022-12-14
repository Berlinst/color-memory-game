let order = [];
let clickedOrder = [];
let score = 0;

//0 - verde
//1 - vermelho
//2 - amarelo
//3 - azul

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

const button = document.querySelector('.btn');

let start = false;
button.onclick = () => {
    button.classList.add("btn-ligado");
    button.innerHTML = "LIGADO";
    start = true;
    playGame();
}

// criando ordem aleatória

let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for(let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1, order[i]);
    }
}

// acende a proxima cor

let lightColor = (element, number, i) => {
    number = number * 500;
    setTimeout(() => {
        element.classList.add('selected');
    }, number - 250);
    setTimeout(() => {
        element.classList.remove('selected');
    }, number - 50);
    
}

// checagem de cor clicada e cor acendida

let checkOrder = () => {
    if(start) {
        for(let i in clickedOrder) {
            if(clickedOrder[i] != order[i]) {
                gameOver();
                break;
            }
        }
        if(clickedOrder.length == order.length) {
            alert(`Pontuação: ${score}\nVocê acertou! Iniciando próximo nível!`);
            nextLevel();
        }
    }
}

// clique do usuario

let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    },250);
}

// função de retorno da cor

let createColorElement = (color) => {
    if(color == 0) {
        return green;
    } else if(color == 1) {
        return red;
    } else if (color == 2) {
        return yellow;
    } else if (color == 3) {
        return blue;
    }
}

// cria próximo nível do jogo

let nextLevel = () => {
    score++;
    shuffleOrder();
}

// jogador perder :(

let gameOver = () => {
    if(start) {
        alert(`Pontuação: ${score}!\nVocê perdeu o jogo!\nClique em OK para iniciar um novo jogo`);
        order = [];
        clickedOrder = [];

        playGame();
    }
}

//função de inicio do jogo
let playGame = () => {
    if(start) {
        alert('Iniciando novo jogo!');
        score = 0;
        nextLevel();
    }
}

// eventos de clique para as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

// inicio do jogo
playGame();