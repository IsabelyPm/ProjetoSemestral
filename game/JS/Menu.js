var largura;
var altura;
var larguraMenu = 400;
var alturaMenu = 300;
var canvas = document.getElementById("canvasMenu");
var ctx = canvas.getContext("2d");

function loopPrincipal() {
  requestAnimationFrame(loopPrincipal);
}

loopPrincipal();
function atualizarPlanoDeFundo() {
    largura = 1500;
    altura = 720;
    canvas.setAttribute("width", largura);
    canvas.setAttribute("height", altura);
    var img = new Image();
    img.src = "./game/IMG/bg1.jpg";
    ctx.drawImage(img, 0, 0, 1500, 720);
}

function desenharBaseMenu() {
    ctx.fillStyle = "rgba(55, 10, 90, 0)";
    var x = parseInt((largura / 2) - (larguraMenu / 2));
    var y = parseInt((altura / 2) - (alturaMenu / 2));
    ctx.fillRect(x, y, larguraMenu, alturaMenu);
    
}
function desenharItensMenu() {
    var x = parseInt((largura / 2) - (larguraMenu / 2));
    var y = parseInt((altura / 2) - (alturaMenu / 2));
    var img;

    img = new Image();
    img.className = "menu-item";
    img.src = "./game/IMG/nightfall.png";
    ctx.drawImage(img, x -290, y -200);

    img = new Image();
    img.className = "menu-item";
    img.src = "./game/IMG/enigma.png";
    ctx.drawImage(img, x -90, y -80, 594, 94);
    
    img = new Image();
    img.className = "menu-item";
    img.src = "./game/IMG/Start-Game-29-04-2024.png";
    ctx.drawImage(img, x + 20, y + 15, 400, 100);
    
    img = new Image();
    img.className = "menu-item";
    img.src = "./game/IMG/Options-29-04-2024.png";
    ctx.drawImage(img, x + 100, y + 95, 250, 80);

    img = new Image();
    img.className = "menu-item";
    img.src = "./game/IMG/Quit-29-04-2024.png";
    ctx.drawImage(img, x + 150, y + 175, 150, 70);
}
function desenharMenu() {
    atualizarPlanoDeFundo();
    desenharBaseMenu();
    desenharItensMenu();
    
}
function selecionarItem(indice) {
    desenharMenu();
    var x = parseInt((largura / 2) - (larguraMenu / 2));
    var y = parseInt((altura / 2) - (alturaMenu / 2));
    var img;
    img = new Image();
    switch (indice) {
        case 0:
            img.className = "start";
            img.src = "./game/IMG/start2.png";
            ctx.drawImage(img, x + 20, y + 15, 400, 100);
            break;
        case 1:
            img.className = "opcoes";
            img.src = "./game/IMG/options2.png";
            ctx.drawImage(img, x + 100, y + 95, 250, 80);
            break;
        case 2:
            img.className = "sair";
            img.src = "./game/IMG/quit2.png";
            ctx.drawImage(img, x + 150, y + 175, 150, 70);
            break;
            default:
            break;
    }
}
window.onresize = function () {
    desenharMenu();
    loopPrincipal();
}
window.onmousemove = function () {
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
canvas.addEventListener('click', function(event) {
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

    if (indice >= 0) {
      switch (indice) {
        case 0:
          window.location.href = './game/festa.html'; // substitua pelo nome da página de destino do item 0
          break;
        case 1:
          window.location.href = './game/options.html'; // substitua pelo nome da página de destino do item 1
          break;
        case 2:
          window.close();

    // Se a janela não foi aberta pelo script, então tenta redirecionar para uma página "sobre"
    setTimeout(() => {
        window.location.href = 'about:blank';
    }, 100);
          break;
      }
    }
  });