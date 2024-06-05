  // Mostrar o texto após 2000 milissegundos
  setTimeout(function() {
    var textContainer = document.getElementById('teclas');
    if (textContainer) {
        textContainer.style.opacity = 1;
    } else {
        console.error('Elemento com ID "teclas" não encontrado.');
    }
}, 500);
    var audio = document.getElementById("som1");
    var startTime = 16 * 60 + 6; // 16:06 in seconds
    var endTime = 20 * 60 + 13; // 20:13 in seconds
    var volumeControl = document.getElementById("volumeControl");
    document.addEventListener('DOMContentLoaded', function() {
        var audio = document.getElementById("som1");
        var savedTime = localStorage.getItem('audioCurrentTime');
        if (savedTime) {
            audio.currentTime = parseFloat(savedTime);
        }
    });
    
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
    var imagemX = document.getElementById('X');
    setTimeout(function() {
        if (imagemX) {
            imagemX.style.opacity = 1; // Altere a opacidade para 1 para fazer a imagem aparecer
        } else {
            console.error('Elemento com ID "barraca" não encontrado.');
        }
    }, 500); // 500 milissegundos = 0.5 segundos

    if (imagemX) {
        imagemX.addEventListener('click', function() {
            window.location.href = '../index.html'; // Redirecionar para o HTML do jogo principal
        });
    } else {
        console.error('Elemento com ID "X" não encontrado.');
    }

