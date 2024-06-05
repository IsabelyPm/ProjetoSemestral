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
