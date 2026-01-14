// ============================================================
// script.js — Versão Final Corrigida (Mario Grande + Invencibilidade + Blocos Funcionais)
// ============================================================

const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const moedas = document.querySelectorAll('.moeda');

// SELETORES DOS BLOCOS
const blocoPrever = document.getElementById('blocoPrever');       
const blocoOrganizar = document.getElementById('blocoOrganizar'); 
const blocoEntrega = document.getElementById('blocoEntrega');     
const blocoProduzir = document.getElementById('blocoProduzir');   

const coinScoreElement = document.getElementById('coin-score');
let coins = 0;

let gameRunning = true;
let loop;

// Variável para controlar a invencibilidade após responder
let isInvincible = false; 

// Flags para evitar perguntas repetidas
let blocoPreverAtivado = false;
let blocoOrganizarAtivado = false;
let blocoEntregaAtivado = false;
let blocoProduzirAtivado = false; 

// Atualiza placar
const updateCoinScore = () => {
    coinScoreElement.textContent = coins;
}

// Pulo
const jump = (event) => {
    if ((event.key === ' ' || event.key === 'ArrowUp') && gameRunning && !mario.classList.contains('jump')) {
        mario.classList.add('jump');
        setTimeout(() => {
            mario.classList.remove('jump'); 
        }, 600); // duração do jump conforme CSS
    }
}
document.addEventListener('keydown', jump);

// ===============================================
// SISTEMA DE INVENCIBILIDADE
// ===============================================
const activateInvincibility = () => {
    isInvincible = true;
    mario.style.opacity = '0.5';
    setTimeout(() => {
        isInvincible = false;
        mario.style.opacity = '1';
    }, 2000); 
}

// ===============================================
// PAUSAR E RETOMAR
// ===============================================
const pauseGame = () => {
    gameRunning = false;
    clearInterval(loop);
    document.removeEventListener('keydown', jump);

    pipe.style.animationPlayState = 'paused';
    mario.style.animationPlayState = 'paused';
    
    moedas.forEach(moeda => moeda.style.animationPlayState = 'paused');
    if(document.querySelector('.clouds')) document.querySelector('.clouds').style.animationPlayState = 'paused';

    if(blocoPrever) blocoPrever.style.animationPlayState = 'paused';
    if(blocoOrganizar) blocoOrganizar.style.animationPlayState = 'paused';
    if(blocoEntrega) blocoEntrega.style.animationPlayState = 'paused';
    if(blocoProduzir) blocoProduzir.style.animationPlayState = 'paused';
}

const resumeGame = (grantInvincibility = false) => {
    gameRunning = true;
    loop = setInterval(gameLoopLogic, 10);
    document.addEventListener('keydown', jump);

    pipe.style.animationPlayState = 'running';
    mario.style.animationPlayState = 'running';
    moedas.forEach(moeda => moeda.style.animationPlayState = 'running');
    if(document.querySelector('.clouds')) document.querySelector('.clouds').style.animationPlayState = 'running';

    if(blocoPrever) blocoPrever.style.animationPlayState = 'running';
    if(blocoOrganizar) blocoOrganizar.style.animationPlayState = 'running';
    if(blocoEntrega) blocoEntrega.style.animationPlayState = 'running';
    if(blocoProduzir) blocoProduzir.style.animationPlayState = 'running';
    
    if (grantInvincibility) {
        activateInvincibility();
        mario.classList.remove('jump');
    }
}

// ===============================================
// FUNÇÕES DE PERGUNTAS DOS BLOCOS
// ===============================================
const showPreverInfo = () => {
    pauseGame();
    setTimeout(() => {
        const pergunta = 
            "O que 'Prever' significa na Administração de Produção?\n" +
            "1. Ignorar dados passados.\n" +
            "2. Estimar eventos futuros com base em dados para planejar.\n" +
            "3. Reagir aos problemas apenas quando aparecem.\n" +
            "Digite o número da resposta:";
        let resposta = prompt(pergunta);
        if (resposta === "2") { coins += 5; alert("Parabéns! Resposta correta! +5 moedas."); }
        else alert("Resposta incorreta. Prever ajuda a planejar o futuro!");
        updateCoinScore();
        resumeGame(true);
    }, 50);
}

const showOrganizarInfo = () => {
    pauseGame();
    setTimeout(() => {
        const pergunta =
            "O que significa 'Organizar' na produção?\n" +
            "1. Deixar tudo bagunçado no estoque.\n" +
            "2. Definir tarefas, agrupar atividades e coordenar recursos.\n" +
            "3. Esperar que os funcionários decidam tudo sozinhos.\n" +
            "Digite o número da resposta:";
        let resposta = prompt(pergunta);
        if (resposta === "2") { coins += 5; alert("Excelente! Organização correta. +5 moedas."); }
        else alert("Resposta incorreta.");
        updateCoinScore();
        resumeGame(true);
    }, 50);
}

const showEntregaInfo = () => {
    pauseGame();
    setTimeout(() => {
        const pergunta = 
            "Qual o objetivo de 'Entregar'?\n" +
            "1. Enviar o produto certo, no tempo certo, para o cliente certo.\n" +
            "2. Enviar qualquer produto para se livrar do estoque.\n" +
            "3. Atrasar a entrega para economizar.\n" +
            "Digite o número da resposta:";
        let resposta = prompt(pergunta);
        if (resposta === "1") { coins += 5; alert("Muito bem! Entrega correta. +5 moedas."); }
        else alert("Resposta incorreta.");
        updateCoinScore();
        resumeGame(true);
    }, 50);
};

const showProduzirInfo = () => {
    pauseGame();
    setTimeout(() => {
        const pergunta = 
            "O que envolve a etapa de 'Produzir'?\n" +
            "1. Apenas comprar a matéria-prima e guardar.\n" +
            "2. Transformar insumos em produtos acabados, garantindo qualidade.\n" +
            "3. Vender o produto antes de ele existir.\n" +
            "Digite o número da resposta:";
        let resposta = prompt(pergunta);
        if (resposta === "2") { coins += 5; alert("Correto! Produção eficiente. +5 moedas."); }
        else alert("Resposta incorreta. Produzir é transformar insumos em produtos.");
        updateCoinScore();
        resumeGame(true);
    }, 50);
};

// ===============================================
// COLISÃO GENÉRICA AJUSTADA PARA ELEMENTOS GRANDES
// ===============================================
function isColliding(elementA, elementB) {
    if (!elementA || !elementB) return false;
    const rectA = elementA.getBoundingClientRect();
    const rectB = elementB.getBoundingClientRect();
    const paddingX = 20; // maior para Mario grande
    const paddingY = 10; 
    return (
        rectA.right > rectB.left + paddingX &&
        rectA.left < rectB.right - paddingX &&
        rectA.bottom > rectB.top + paddingY &&
        rectA.top < rectB.bottom - paddingY
    );
}

// ===============================================
// LOOP PRINCIPAL
// ===============================================
const gameLoopLogic = () => {
    if (!gameRunning) return;

    const marioRect = mario.getBoundingClientRect();
    const isJumping = mario.classList.contains('jump');
    const jumpPadding = 80; // tolerância maior para Mario grande

    // CANO (GAME OVER)
    if (isColliding(mario, pipe) && !isInvincible) {
        const pipeRect = pipe.getBoundingClientRect();
        if (!(isJumping && marioRect.bottom < pipeRect.top + jumpPadding)) {
            pauseGame();
            mario.src = 'img/game-over.png';
            mario.style.width = '75px';
            mario.style.marginLeft = '50px';
            setTimeout(() => {
                alert(`Game Over! Moedas: ${coins}. Pressione F5 para reiniciar.`);
            }, 100);
            return;
        }
    }

    // BLOCOS
    if (blocoPrever && !blocoPreverAtivado && isColliding(mario, blocoPrever)) { blocoPreverAtivado = true; showPreverInfo(); return; }
    if (blocoOrganizar && !blocoOrganizarAtivado && isColliding(mario, blocoOrganizar)) { blocoOrganizarAtivado = true; showOrganizarInfo(); return; }
    if (blocoEntrega && !blocoEntregaAtivado && isColliding(mario, blocoEntrega)) { blocoEntregaAtivado = true; showEntregaInfo(); return; }
    if (blocoProduzir && !blocoProduzirAtivado && isColliding(mario, blocoProduzir)) { blocoProduzirAtivado = true; showProduzirInfo(); return; }

    // MOEDAS
    moedas.forEach(moeda => {
        if (moeda.style.display !== 'none' && isColliding(mario, moeda)) {
            moeda.style.display = 'none';
            coins++;
            updateCoinScore();
        }
    });
};

// ===============================================
// INICIALIZAÇÃO
// ===============================================
document.addEventListener('DOMContentLoaded', () => {
    loop = setInterval(gameLoopLogic, 10);
    updateCoinScore();
});
