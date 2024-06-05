var canvas = document.getElementById('canvasGame');
var context = canvas.getContext('2d');

        var teclado = new Teclado(document);
        var animacao = new Animacao(context);

        var imgBentinho = new Image();
        imgBentinho.src = './IMG/BENTO.png';

        var bentinho = new Bentinho(context, teclado, imgBentinho);
        bentinho.x = 270;
        bentinho.y = 560;
        animacao.novoSprite(bentinho);

        imgBentinho.onload = function() {
            animacao.ligar();
        };

        function loopPrincipal() { //função para renderizar melhor
            requestAnimationFrame(loopPrincipal);
          }
          
          loopPrincipal();

        window.onload = function() {
            // Define uma função para mostrar o texto
            function showText() {
                var textContainer = document.getElementById('teclas');
                textContainer.style.opacity = '1';
            }
        
            // Configura o timeout para chamar a função após 5 segundos (5000 milissegundos)
            setTimeout(showText, 500);
            var imagemX = document.getElementById('home');
            if (imagemX) {
                imagemX.addEventListener('click', function() {
                    window.location.href = '../index.html'; // Redirecionar para o HTML do jogo principal
                });
            } else {
                console.error('Elemento com ID "X" não encontrado.');
            }
                var audio = document.getElementById("som1");
                var startTime = 0; // 16:06 in seconds
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
                   