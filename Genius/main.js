const start = document.querySelector(".start")
startBotao = start.querySelector(".startbttn")

//Start do jogo e ir para o jogo de fato
window.onload = ()=>{
    startBotao.onclick = ()=>{
        start.classList.add("hide");
        playBoard.classList.add("show");
        startGame()
    }
}

//Para recomeçar o jogo
reload = document.querySelector(".reload")
pontuacao = reload.querySelector(".gameover")
replayBtn = reload.querySelector("button")

replayBtn.onclick = () =>{
    window.location.reload()
}

//Código funcional do jogo
playBoard = document.querySelector(".playboard")

const game = playBoard.querySelector(".game")

carinha = playBoard.querySelector(".carinha")
const olhos = carinha.querySelector(".olhos")
const boca = carinha.querySelector(".boca")
const contagem = playBoard.querySelector(".contagem")


const Vermelho = playBoard.querySelector(".box4")
const Azul = playBoard.querySelector(".box2")
const Verde = playBoard.querySelector(".box6")
const Amarelo = playBoard.querySelector(".box8")

const score = reload.querySelector(".score")

//Pra selecionar as cores
function control(e){
    if(animatingColors==false){
    switch(e.keyCode){
    case 37:
        bVermelho()
        break;

    case 38:
        bAzul()
        break;
    
    case 39:
        bVerde()
        break;

    case 40:
        bAmarelo()
        break;
    }
}
}

document.addEventListener('keyup',control)

function bVermelho(){
    Vermelho.classList.add("branco")
}
function bAzul(){
    Azul.classList.add("branco")
}
function bVerde(){
    Verde.classList.add("branco")
}
function bAmarelo(){
    Amarelo.classList.add("branco")
}

//Pra conseguir clicar novamente
const botoes = Array.from(playBoard.querySelectorAll("span"))
botoes.forEach(bttn => {
    bttn.addEventListener("animationend", () => {
        Vermelho.classList.remove("branco")
        Azul.classList.remove("branco")
        Verde.classList.remove("branco")
        Amarelo.classList.remove("branco")

        carinha.classList.remove("erro")
        boca.classList.remove("erro")

        carinha.classList.remove("acerto")
        boca.classList.remove("acerto")

    })
})

//Para jogo do computador
const cores = [Vermelho, Azul, Verde, Amarelo]
const numCor = [37, 38, 39, 40]

let animatingColors = false
let currentColorPosition = 0

document.addEventListener("keyup", ev =>{
    const idxPressedElement = numCor.indexOf(ev.keyCode)

    if(idxPressedElement == -1 || animatingColors){
        carinha.classList.add("erro")
        boca.classList.add("erro")
        return

    }else{

    if(idxPressedElement !== sequencia[currentColorPosition]){
        reload.classList.add("show")
        playBoard.classList.remove("show")
        score.innerHTML = (sequencia.length-1)
    }
    currentColorPosition++
    if (currentColorPosition >= sequencia.length) {
        currentColorPosition = 0
        computer()
        setTimeout(()=>{
            carinha.classList.add("acerto"),
            boca.classList.add("acerto")
        }, 1000)

        setTimeout(() =>{
            shift()
        }, 2000)
    }
    }
})

function playAnimationColors(){
    sequencia.forEach((current, index) => {
        setTimeout(() => {
            cores[current].classList.add("branco")
            animatingColors = index < sequencia.length - 1
        }, 1000 * index);
    })
    computerOff()
}

//Função de começo e o funcionamento da carinha para começar
function startGame() {
    computer()
    hideFace()
    let cnt = 3
    sequencia = []
    currentColorPosition = 0
    let idx = setInterval(() => {
        contagem.textContent=(cnt--)
        if(cnt < 0) {
            showFace()
            shift()
            clearInterval(idx)
        }
    }, 1000)
}

function computer(){
    game.classList.add("active")
}

function computerOff(){
    game.classList.remove("active")
}

function hideFace(){
    olhos.classList.add("hide")
    boca.classList.add("hide")
}

function showFace(){
    olhos.classList.remove("hide")
    boca.classList.remove("hide")
    contagem.classList.add("hide")
}

function shift() {
    const rnd = Math.round(Math.random() * 3)
    sequencia.push(rnd)
    playAnimationColors()
}