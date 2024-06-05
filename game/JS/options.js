var largura; //variável da largura do fundo
var altura; //variável da altura do fundo
var larguraMenu = 400; //variável da largura do menu
var alturaMenu = 300; //variável da altura do menu
var canvas = document.getElementById("canvasMenu"); //variável do canvas
var ctx = canvas.getContext("2d"); //variável do contexto

function loopPrincipal() { //função para renderizar melhor
  desenharMenu();
  requestAnimationFrame(loopPrincipal);
}

loopPrincipal();

function drawPopup() { //função para desenhar o pop-up
  ctx.beginPath();

// Linear borda
const grad2=ctx.createLinearGradient(200,210, 700,900);
grad2.addColorStop(0, "lightblue");
grad2.addColorStop(1, "darkblue");


// borda com gradiente
ctx.lineWidth = 15;
ctx.strokeStyle = grad2;
ctx.strokeRect(500,210,500,500);


// Gradiete linear do fundo
const grad=ctx.createLinearGradient(500,210, 700,900);
grad.addColorStop(0, "lightblue");
grad.addColorStop(1, "darkblue");



// Linear retângulo
ctx.fillStyle = grad;
ctx.fillRect(500,210, 500,500);


// Shadow
ctx.shadowColor = "#0019FF";
ctx.shadowOffsetX = 5;
ctx.shadowOffsetY = 5;



//texto escrito
ctx.font = '21px pixely';
ctx.fillStyle = "white";
ctx.fillText('Movimento do personagem - setas', 515, 400);
ctx.fillText('Tecla para interagir - E', 585, 440);
ctx.fillText('Enter - Volta ao menu inicial', 565, 480);
ctx.fillText('Tenha um bom jogo :)', 600, 650);
ctx.font = '40px pixely';
ctx.fillText('Options', 660, 260);

// Shadow
ctx.shadowColor = "darkblue";
ctx.shadowOffsetX = 55;
ctx.shadowOffsetY = 15;

ctx.closePath(); 
}

function atualizarPlanoDeFundo() { //função para desenhar e atualizar o fundo
    largura = 1500;
    altura = 720;
    canvas.setAttribute("width", largura); //Adiciona um novo atributo ou modifica o valor de um atributo existente num elemento específico. (string pra valor)
    canvas.setAttribute("height", altura); //Adiciona um novo atributo ou modifica o valor de um atributo existente num elemento específico. (string pra valor)
    var img = new Image();
    img.src = "./IMG/bg1.jpg";
    ctx.drawImage(img, 0, 0, 1500, 720);
}

function desenharBaseMenu() { //desenha a base do menu (transparente)
    ctx.fillStyle = "rgba(55, 10, 90, 0)";
    var x = parseInt((largura / 2) - (larguraMenu / 2));
    var y = parseInt((altura / 2) - (alturaMenu / 2));
    ctx.fillRect(x, y, larguraMenu, alturaMenu);
    
}
function desenharItensMenu() { //desenha os itens do menu
    var x = parseInt((largura / 2) - (larguraMenu / 2));
    var y = parseInt((altura / 2) - (alturaMenu / 2));
    var img;

    img = new Image();
    img.className = "menu-item";
    img.src = "./IMG/nightfall.png";
    ctx.drawImage(img, x -290, y -200);

    img = new Image();
    img.className = "menu-item";
    img.src = "./IMG/enigma.png";
    ctx.drawImage(img, x -90, y -80, 594, 94);

    img = new Image();
    img.className = "opcoes";
    img.src = "./IMG/options2.png";
    ctx.drawImage(img, x + 100, y + 95, 250, 80);
}
    
    
function desenharMenu() { //função de desenhar o menu
    atualizarPlanoDeFundo();
    desenharBaseMenu();
    desenharItensMenu();
    drawPopup();
}
function selecionarItem(indice) { //função para selecionar os itens (não funciona aqui)
    desenharMenu();
    var x = parseInt((largura / 2) - (larguraMenu / 2));
    var y = parseInt((altura / 2) - (alturaMenu / 2));
    var img;
    img = new Image();
    
}
window.onresize = function () { //document view é redimensionado
    desenharMenu();
    loopPrincipal();
}
window.onmousemove = function () { //evento de movimentação do mouse
    var posX = event.clientX;
    var posY = event.clientY;
    var x = parseInt((largura / 2) - (larguraMenu / 2));
    var y = parseInt((altura / 2) - (alturaMenu / 2));
    var indice = -1;

    if (posX > x && posX < x + larguraMenu) {
        if (posY > y && posY < y + alturaMenu) {
            indice = parseInt((posY - y) / 100);
        }
    }

    selecionarItem(indice);
}
window.onload = function() {
var imagemX = document.getElementById('X');
if (imagemX) {
    imagemX.addEventListener('click', function() {
        window.location.href = '../index.html'; // Redirecionar para o HTML do jogo principal
    });
} else {
    console.error('Elemento com ID "X" não encontrado.');
    window.onload = function() {
        var audio = document.getElementById("som1");
        var startTime = 16 * 60 + 6; // 16:06 in seconds
        var endTime = 20 * 60 + 13; // 20:13 in seconds
        var volumeControl = document.getElementById("volumeControl");
    
        // Tentar tocar o áudio ao carregar a página
        audio.currentTime = startTime;
        var playPromise = audio.play();
    
        if (playPromise !== undefined) {
            playPromise.then(function() {
                console.log("Audio started successfully.");
            }).catch(function(error) {
                console.error("Error playing audio: ", error);
                // Handle the error if autoplay is blocked
                document.body.addEventListener('click', function() {
                    audio.play();
                }, { once: true });
            });
        }
    
        // Controle de volume
        audio.volume = volumeControl.value;
        volumeControl.addEventListener("input", function() {
            audio.volume = this.value;
        });
    
        // Pausar o áudio quando alcançar o endTime
        audio.addEventListener("timeupdate", function() {
            if (audio.currentTime >= endTime) {
                audio.pause();
                audio.currentTime = startTime;
                audio.play();
            }
        });
    
        // Reiniciar o áudio do startTime quando acabar
        audio.addEventListener("ended", function() {
            audio.currentTime = startTime;
            audio.play();
        });
    };
    
}
}