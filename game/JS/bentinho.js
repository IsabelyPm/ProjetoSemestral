var BENTINHO_DIREITA = 1; //informação do qual sonic direita
var BENTINHO_ESQUERDA = 2; //informação do qual sonic esquerda
var BENTINHO_ABAIXO = 0;
var BENTINHO_CIMA = 3;

function Bentinho(context, teclado, imagem){ //cria a função construtora passando os parâmetros contexto, o teclado e a imagem
    this.context = context; //informa o contexto
    this.teclado = teclado; //informa o teclado
    this.x = 0; //define x = 0
    this.y = 0; // define y = 0
    this.velocidade = 5; // informa que a velocidade é 10

    //Criando a spritesheet
    this.sheet = new Spritesheet(context, imagem, 4, 4); //passa informação do contexto, imagem, a quantidade de linhas e quantidade de colunas
    this.sheet.intervalo = 80; //define o intervalo de frames pra 60
    
    // Estado inicial 
    this.andando = false;
    this.direcao = BENTINHO_DIREITA;
}

Bentinho.prototype = {
    atualizar: function(){ //cria método
       
       //UP And DOWN
     if (this.teclado.pressionada(SETA_S)){ //se a seta está pressionada (seta abaixo)
        //Se já não está neste estado
        if(!this.andando || 
            this.direcao != BENTINHO_ABAIXO){ //se nao estiver andando e a direção não for a direita
            // Seleciono o quadro da spritesheet
            this.sheet.linha = 0;
            this.sheet.coluna = 0;
        }
        this.andando = true;
        this.direcao = BENTINHO_ABAIXO;

        //Neste estado, a animação deve rodar
        this.sheet.proximoQuadro();

        //Deslocar o Sonic
        if (this.y + this.velocidade <= 610) {
           this.y += this.velocidade;
        }
         // o y e atribuição de adição da velocidade
    }
    else if(this.teclado.pressionada(SETA_W)){ //se a seta está pressionada (seta abaixo)
        // Se já não está no estado 
        if(!this.andando || this.direcao 
            != BENTINHO_CIMA){
        // Seleciono o quadro da spritesheet
        this.sheet.linha = 3;
        this.sheet.coluna = 0;
    }
    this.andando = true;
    this.direcao = BENTINHO_CIMA;

    this.sheet.proximoQuadro();
    if (this.y - this.velocidade >= 530) {
        this.y -= this.velocidade;
    }
} else {
        this.andando = true;
}
       

//direita e esquerda
        if(this.teclado.pressionada(SETA_D)){
            //Se já não está neste estado
            if(!this.andando || 
                this.direcao != BENTINHO_DIREITA){
                // Seleciono o quadro da spritesheet
                this.sheet.linha = 2;
                this.sheet.coluna = 0;
            }
            this.andando = true;
            this.direcao = BENTINHO_DIREITA;

            //Neste estado, a animação deve rodar
            this.sheet.proximoQuadro();

            //Deslocar o Sonic
            if (this.x + this.velocidade <= 1350) {
                this.x += this.velocidade;
            }
        }
        else if(this.teclado.pressionada(SETA_A)){
            // Se já não está no estado
            if(!this.andando || this.direcao 
                != BENTINHO_ESQUERDA){
            // Seleciono o quadro da spritesheet
            this.sheet.linha = 1;
            this.sheet.coluna = 0;
        }
        this.andando = true;
        this.direcao = BENTINHO_ESQUERDA;

        this.sheet.proximoQuadro();
        if (this.x - this.velocidade >= 100) {
            this.x -= this.velocidade;
        }
    } else {
            this.andando = true; 
            this.sheet.proximoQuadro;
        }
     // Verificar a posição para exibir o alerta
     if (this.y == 530 && this.x == 700) {
        alert('Cuidado com o fogo sô!');
        this.x +50;
       this.andando = false ;
       this.direcao = null;
       this.velocidade = 5;
    }
},
desenhar: function(){
    this.sheet.desenhar(this.x, this.y); //desenhar o x e y no canvas
    }
}


