function Spritesheet(context, imagem, linhas, colunas) { //criada a função constrtutora que vai receber os parâmetros de context, imagem, linhas e colunas
    this.context = context; //recebe contexto
    this.imagem = imagem; //recebe imagem
    this.numLinhas = linhas; //recebe linhas
    this.numColunas = colunas; //recebe colunas
    this.intervalo = 0; //define o intervalo como 0
    this.linha = 0; //define a linha como 0
    this.coluna = 0; //define a coluna como 0
}

Spritesheet.prototype = { //prototype para renderizar melhor a função
    proximoQuadro: function() { //novo método próximo quadro
        // Momento atual
        var agora = new Date().getTime(); //a var agora recebe a data e o horário de agora

        // Se ainda não tenho último tempo medido
        if (!this.ultimoTempo) this.ultimoTempo = agora; //se não for o ultimoTempo (medido), o ultimoTempo vai ser iual a var agora

        // Já é hora de mudar de coluna?
        if (agora - this.ultimoTempo < this.intervalo) return; //se a var agora - o tempo medido, for menor que o intervalo (0), retorne
        if (this.coluna < this.numColunas - 1) { //se a coluna for menor que o número de colunas menos 1
            this.coluna++; //incremente
        } else { //caso contrário
            this.coluna = 0; //a coluna permanece no valor de 0
        }

        // Guardar a mudança
        this.ultimoTempo = agora;
    }, // vírgula separando métodos
    desenhar: function(x, y) { //método novo desenhar com os parâmetros de x e y
        var largura = this.imagem.width / this.numColunas; // largura é igual a largura da imagem dividida pelo número de colunas
        var altura = this.imagem.height / this.numLinhas; // altura é a altura da imagem dividida pelo número de linhas

        this.context.drawImage( //função utilizada para desenhar imagens em um elemento canvas HTML
            this.imagem, //referenciando a imagem
            largura * this.coluna, //largura vezes o número da coluna
            altura * this.linha, //altura vezes a línha
            largura, //largura
            altura, //altura
            x, //o x
            y, //o y
            largura, //a largura
            altura //a altura
        );
    }
};
