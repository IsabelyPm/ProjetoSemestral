var SETA_A = 65; // define o valor decimal da seta esquerda segundo a tabela ASCII
var SETA_D = 68; // define o valor decimal da seta direita segundo a tabela ASCII
var SETA_W = 87; // define o valor decimal da seta para cima segundo a tabela ASCII
var SETA_S = 83; // define o valor decimal da seta para baixo segundo a tabela ASCII
var ESPACO = 32; // define o valor decimal da tecla de espaço segundo a tabela ASCII
var TECLA_L = 76;
var TECLA_C = 67;
var TECLA_F = 70;
var TECLA_O = 79;
var TECLA_Q = 81;
var TECLA_M = 77;
var TECLA_X = 88; // define o valor decimal da tecla X segundo a tabela ASCII

function Teclado(elemento) {
    this.elemento = elemento;

    // Array de teclas pressionadas
    this.pressionadas = [];

    // Registrar estado das teclas no array
    var teclado = this;
    elemento.addEventListener('keydown', function(evento) { // reconhece se a tecla está pressionada
        var tecla = evento.keyCode;
        teclado.pressionadas[tecla] = true;
        teclado.verificarRedirecionamento(tecla); // Chamar função de redirecionamento
    });
    elemento.addEventListener('keyup', function(evento) { // reconhece se a tecla está levantada
        teclado.pressionadas[evento.keyCode] = false;
    });
}

Teclado.prototype = { // para renderizar melhor a função
    pressionada: function(tecla) { // novo método pressionada para o parâmetro tecla
        return this.pressionadas[tecla]; // retorne a informação de pressionadas do parâmetro teclas
    },
    verificarRedirecionamento: function(tecla) { // Novo método para redirecionamento
        switch(tecla) {
            case TECLA_L:
                window.location.href = './barracalemb.html';
                break;
            case TECLA_C:
                window.location.href = './barracacaixa.html';
                break;
            case TECLA_F:
                window.location.href = './barracafoto.html';
                break;
            case TECLA_O:
                window.location.href = './barracadoce.html';
                break;
            case TECLA_Q:
                window.location.href = './barracaquent.html';
                break;
            case TECLA_M:
                window.location.href = './barracamilho.html';
                break;
        }
    }
};

window.onload = function() {
    var elemento = document;
    var teclado = new Teclado(elemento);

    // Adicionar evento específico para a tecla X
    elemento.addEventListener('keydown', function(evento) {
        if (evento.keyCode === TECLA_X) {
            var fotoElement = document.getElementById('fotos');
            if (fotoElement) {
                fotoElement.style.opacity = 1;
            } else {
                console.error('Elemento com ID "fotos" não encontrado.');
            }
        }
    });

    // Adicionar evento de clique à imagem
    var imagemX = document.getElementById('X');
    if (imagemX) {
        imagemX.addEventListener('click', function() {
            window.location.href = './festa.html'; // Redirecionar para o HTML do jogo principal
        });
    } else {
        console.error('Elemento com ID "X" não encontrado.');
    }

    function showText() {
        var textContainer = document.getElementById('teclas');
        textContainer.style.opacity = '1';
    }

    // Configura o timeout para chamar a função após 5 segundos (5000 milissegundos)
    setTimeout(showText, 500);
    
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

    var imagemX = document.getElementById('home');
    if (imagemX) {
        imagemX.addEventListener('click', function() {
            window.location.href = '../index.html'; // Redirecionar para o HTML do jogo principal
        });
    } else {
        console.error('Elemento com ID "X" não encontrado.');
    }
};

