function Animacao(context) {
    this.context = context;
    this.sprites = [];
    this.ligado = false;
    this.processamentos = [];
    this.spritesExcluir = [];
    this.processamentosExcluir = [];
    this.ultimoCiclo = 0;
    this.decorrido = 0;
}

Animacao.prototype = {
    novoSprite: function(sprite) {
        this.sprites.push(sprite);
        sprite.animacao = this;
    },

    ligar: function() {
        this.ultimoCiclo = 0;
        this.ligado = true;
        this.proximoFrame();
    },

    desligar: function() {
        this.ligado = false;
    },

    proximoFrame: function() {
        if (!this.ligado) return;

        var agora = new Date().getTime();
        if (this.ultimoCiclo == 0) this.ultimoCiclo = agora;
        this.decorrido = agora - this.ultimoCiclo;
        
        this.context.clearRect(20, 550, this.context.canvas.width, this.context.canvas.height);
        
        for (var sprite of this.sprites) sprite.atualizar();
        for (var sprite of this.sprites) sprite.desenhar();
        for (var processo of this.processamentos) processo.processar();

        this.processarExclusoes();
        this.ultimoCiclo = agora;

        var animacao = this;
        requestAnimationFrame(function() {
            animacao.proximoFrame();
        });
    },

    novoProcessamento: function(processamento) {
        this.processamentos.push(processamento);
        processamento.animacao = this;
    },

    excluirSprite: function(sprite) {
        this.spritesExcluir.push(sprite);
    },

    excluirProcessamento: function(processamento) {
        this.processamentosExcluir.push(processamento);
    },

    processarExclusoes: function() {
        if (this.spritesExcluir.length === 0 && this.processamentosExcluir.length === 0) return;

        var novoSprites = [];
        var novoProcessamentos = [];

        for (var sprite of this.sprites) {
            if (this.spritesExcluir.indexOf(sprite) == -1) novoSprites.push(sprite);
        }

        for (var processo of this.processamentos) {
            if (this.processamentosExcluir.indexOf(processo) == -1) novoProcessamentos.push(processo);
        }

        this.spritesExcluir = [];
        this.processamentosExcluir = [];
        this.sprites = novoSprites;
        this.processamentos = novoProcessamentos;
    }
};

