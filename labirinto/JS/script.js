(function(){
    var cnv = document.querySelector("canvas");
    var ctx = cnv.getContext("2d");
    var milhoCounter = document.createElement("div");
    milhoCounter.id = "milhoCounter";
    document.body.appendChild(milhoCounter);

    var WIDTH = cnv.width, HEIGHT = cnv.height;
    var LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;
    var mvLeft = mvUp = mvRight = mvDown = false;
    var tileSize = 100;
    var tileSrcSize = 96;
    var audio = document.getElementById("som1");
    var startTime = 0; // 4:05 in seconds
    var endTime = 7 * 60 + 54; // 7:54 in seconds
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
    
    audio.addEventListener("timeupdate", function() {
        if (audio.currentTime >= endTime) {
            audio.pause();
        }
    });
    
    // Loop the audio from start to end if needed
    audio.addEventListener("ended", function() {
        audio.currentTime = startTime;
        audio.play();
    });
    var img = new Image();
    img.src = "IMG/img.png";
    img.addEventListener("load",function(){
        requestAnimationFrame(loop,cnv);
    },false);

    var itemImg1 = new Image();
    itemImg1.src = "IMG/mir.png";

    var itemImg2 = new Image();
    itemImg2.src = "IMG/mir.png";

    var itemImg3 = new Image();
    itemImg3.src = "IMG/mir.png";

    var itemImg4 = new Image();
    itemImg4.src = "IMG/mir.png";

    var itemImg5 = new Image();
    itemImg5.src = "IMG/mir.png";

    var walls = [];
    var items = [
        { img: itemImg1, x: 5 * tileSize, y: 7 * tileSize, width: 20, height: 20, collected: false },
        { img: itemImg2, x: 8.8 * tileSize, y: 9.8 * tileSize, width: 20, height: 20, collected: false },
        { img: itemImg3, x: 8.8 * tileSize, y: 18.8 * tileSize, width: 20, height: 20, collected: false },
        { img: itemImg4, x: 5.8 * tileSize, y: 17.8 * tileSize, width: 20, height: 20, collected: false },
        { img: itemImg5, x: 18.8 * tileSize, y: 2.8 * tileSize, width: 20, height: 20, collected: false }
    ];
    var collectedItems = 0;

    var player = {
        x: tileSize + 2,
        y: tileSize + 2,
        width: 24,
        height: 32,
        speed: 5,
        srcX: 0,
        srcY: tileSrcSize,
        countAnim: 0
    };

    var maze = [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1],
        [1,1,1,0,1,1,1,0,0,1,0,0,0,1,0,0,0,1,0,1],
        [1,0,0,0,0,0,1,0,1,1,1,1,1,1,0,1,1,1,1,1],
        [1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,1,0,1],
        [1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1],
        [1,0,0,1,0,0,1,0,0,1,0,0,0,0,1,0,0,0,0,1],
        [1,0,1,1,1,1,1,1,0,1,0,1,1,0,0,0,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,1,0,1,0,0,1,0,0,1,0,1,0,0,0,0,1],
        [1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,1,1,1,0,1],
        [1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1],
        [1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1],
        [1,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,1,0,1,1,1,0,0,0,0,1,0,0,1,1],
        [1,1,0,1,0,0,1,0,0,1,0,0,1,0,1,1,1,0,0,1],
        [1,1,0,1,1,1,1,0,0,1,0,0,1,0,1,0,1,0,0,1],
        [1,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,1,0,0,1],
        [1,0,1,1,0,0,1,0,0,1,0,0,0,0,1,0,1,1,1,1],
        [1,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,0,1],
        [1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1],
        [1,0,1,0,1,0,0,1,0,0,0,0,1,0,1,1,1,1,0,1],
        [1,1,1,0,1,1,0,1,0,1,0,0,0,0,0,0,0,1,0,1],
        [1,0,1,0,0,1,1,1,0,1,1,0,0,1,1,0,0,1,1,1],
        [1,0,0,0,0,0,0,1,0,0,1,1,0,0,1,0,0,0,0,0],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ];
     // Defina a posição da saída (coluna 19, linha 27)
     var exitPosition = { col: 19, row: 27 };

    var T_WIDTH = maze[0].length * tileSize,
        T_HEIGHT = maze.length * tileSize;

    for(var row in maze){
        for(var column in maze[row]){
            var tile = maze[row][column];
            if(tile === 1){
                var wall = {
                    x: tileSize*column,
                    y: tileSize*row,
                    width: tileSize,
                    height: tileSize
                };
                walls.push(wall);
            }
        }
    }

    var cam = {
        x: 0,
        y: 0,
        width: WIDTH,
        height: HEIGHT,
        innerLeftBoundary: function(){
            return this.x + (this.width*0.25);
        },
        innerTopBoundary: function(){
            return this.y + (this.height*0.25);
        },
        innerRightBoundary: function(){
            return this.x + (this.width*0.75);
        },
        innerBottomBoundary: function(){
            return this.y + (this.height*0.75);
        }
    };

    function blockRectangle(objA,objB){
        var distX = (objA.x + objA.width/2) - (objB.x + objB.width/2);
        var distY = (objA.y + objA.height/2) - (objB.y + objB.height/2);

        var sumWidth = (objA.width + objB.width)/2;
        var sumHeight = (objA.height + objB.height)/2;

        if(Math.abs(distX) < sumWidth && Math.abs(distY) < sumHeight){
            var overlapX = sumWidth - Math.abs(distX);
            var overlapY = sumHeight - Math.abs(distY);

            if(overlapX > overlapY){
                objA.y = distY > 0 ? objA.y + overlapY : objA.y - overlapY;
            } else {
                objA.x = distX > 0 ? objA.x + overlapX : objA.x - overlapX;
            }
        }
    }

    window.addEventListener("keydown",keydownHandler,false);
    window.addEventListener("keyup",keyupHandler,false);

    function keydownHandler(e){
        var key = e.keyCode;
        switch(key){
            case LEFT:
                mvLeft = true;
                break;
            case UP:
                mvUp = true;
                break;
            case RIGHT:
                mvRight = true;
                break;
            case DOWN:
                mvDown = true;
                break;
        }
    }

    function keyupHandler(e){
        var key = e.keyCode;
        switch(key){
            case LEFT:
                mvLeft = false;
                break;
            case UP:
                mvUp = false;
                break;
            case RIGHT:
                mvRight = false;
                break;
            case DOWN:
                mvDown = false;
                break;
        }
    }

    function update(){
        var volumeControl = document.getElementById("volumeControl");
        volumeControl.style.position = "absolute";
        volumeControl.style.marginTop = "-550px";
        volumeControl.style.transform = "rotate(90deg)"; // Equal to rotateZ(45deg)
        volumeControl.style.marginLeft = "-40px";
        volumeControl.style.zIndex = "5";
    
        // Home
        var home = document.getElementById("home");
        home.style.position = "absolute";
        home.style.marginTop = "-785px";
        home.style.marginLeft = "-5px";
        home.style.zIndex = "6";
    
        // Som
        var som = document.getElementById("som");
        som.style.position = "absolute";
        som.style.marginTop = "-640px";
        som.style.marginLeft = "7px";
        som.style.zIndex = "7";

        if(mvLeft && !mvRight){
            player.x -= player.speed;
            player.srcY = tileSrcSize + player.height * 2;
        } else if(mvRight && !mvLeft){
            player.x += player.speed;
            player.srcY = tileSrcSize + player.height * 3;
        }
        if(mvUp && !mvDown){
            player.y -= player.speed;
            player.srcY = tileSrcSize + player.height * 1;
        } else if(mvDown && !mvUp){
            player.y += player.speed;
            player.srcY = tileSrcSize + player.height * 0;
        }
      
        var exitX = exitPosition.col * tileSize;
        var exitY = exitPosition.row * tileSize;
        if (collectedItems === 5 && player.x >= exitX && player.x <= exitX + tileSize &&
            player.y >= exitY && player.y <= exitY + tileSize) {
            // Redirecionar para outra página
            window.location.href = "../colete.html";
        }
        if(mvLeft || mvRight || mvUp || mvDown){
            player.countAnim++;

            if(player.countAnim >=             40){
                player.countAnim = 0;
            }

            player.srcX = Math.floor(player.countAnim/5) * player.width;
        } else {
            player.srcX = 0;
            player.countAnim = 0;
        }

        for(var i in walls){
            var wall = walls[i];
            blockRectangle(player,wall);
        }

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (!item.collected && player.x < item.x + tileSize &&
                player.x + player.width > item.x &&
                player.y < item.y + tileSize &&
                player.y + player.height > item.y) {
                item.collected = true;
                collectedItems++;
                milhoCounter.textContent = "Milhos coletados: " + collectedItems + "/5";
                if (collectedItems === 5) {
                    milhoCounter.textContent = "Parabéns! Você coletou todos os milhos!";
                    setTimeout(function() {
                        var congratsMsg = document.createElement("div");
                        congratsMsg.id = "congratsMsg";
                        congratsMsg.textContent = "A saída do labirinto está liberada";
                        document.body.appendChild(congratsMsg);
                        congratsMsg.style.visibility = "visible";
                        setTimeout(function() {
                            congratsMsg.style.visibility = "hidden";
                        }, 4000); // Mostrar após 4 segundos
                    }, 4000); // Após 4 segundos
                }
                break;
            }
        }

        if(player.x < cam.innerLeftBoundary()){
            cam.x = player.x - (cam.width * 0.25);
        }
        if(player.y < cam.innerTopBoundary()){
            cam.y = player.y - (cam.height * 0.25);
        }
        if(player.x + player.width > cam.innerRightBoundary()){
            cam.x = player.x + player.width - (cam.width * 0.75);
        }
        if(player.y + player.height > cam.innerBottomBoundary()){
            cam.y = player.y + player.height - (cam.height * 0.75);
        }

        cam.x = Math.max(0, Math.min(T_WIDTH - cam.width, cam.x));
        cam.y = Math.max(0, Math.min(T_HEIGHT - cam.height, cam.y));
    }

    function render(){
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        ctx.save();
        ctx.translate(-cam.x, -cam.y);
        for(var row in maze){
            for(var column in maze[row]){
                var tile = maze[row][column];
                var x = column * tileSize;
                var y = row * tileSize;

                ctx.drawImage(
                    img,
                    tile * tileSrcSize, 0, tileSrcSize, tileSrcSize,
                    x, y, tileSize, tileSize
                );
            }
        }

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (!item.collected) {
                ctx.drawImage(
                    item.img,
                    item.x, item.y, item.width, item.height
                );
            }
        }

        ctx.drawImage(
            img,
            player.srcX, player.srcY, player.width, player.height,
            player.x, player.y, player.width, player.height
        );
        ctx.restore();
    }

    function loop(){
        update();
        render();
        requestAnimationFrame(loop, cnv);
    }
}());

window.onload = function() {
    
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
    var imagemX = document.getElementById('home');
    if (imagemX) {
        imagemX.addEventListener('click', function() {
            window.location.href = '../index.html'; // Redirecionar para o HTML do jogo principal
        });
    } else {
        console.error('Elemento com ID "X" não encontrado.');
    }
}

