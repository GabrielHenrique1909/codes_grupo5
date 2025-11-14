document.addEventListener('DOMContentLoaded', function() {
    var listaVencer = document.getElementById('scroll-estoque-vencer');
    var listaFalta = document.getElementById('scroll-estoque-falta');

    function carregarEstoque() {
        var estoque = JSON.parse(localStorage.getItem('estoque')) || [];
        return estoque;
    }

    function calcularDiasParaVencer(dataValidade) {
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
        
        const validade = new Date(dataValidade + 'T00:00:00');
        
        const diferencaMilissegundos = validade - hoje;
        const diferencaDias = Math.ceil(diferencaMilissegundos / (1000 * 60 * 60 * 24));
        
        return diferencaDias;
    }

    function renderizarProdutosAVencer() {
        const estoque = JSON.parse(localStorage.getItem('estoque')) || [];
        const lista = document.getElementById('lista-produtos-vencer');
        
        lista.innerHTML = '';
        
        // Filtrar produtos que vencem em 7 dias ou menos
        const produtosAVencer = estoque.filter(item => {
            const diasParaVencer = calcularDiasParaVencer(item.validade);
            return diasParaVencer <= 7 && diasParaVencer >= 0;
        });
        
        if (produtosAVencer.length === 0) {
            lista.innerHTML = '<li class="item-card"><span class="item-text">Nenhum produto a vencer</span></li>';
            return;
        }
        
        // Ordenar por dias restantes (menor para maior)
        produtosAVencer.sort((a, b) => {
            return calcularDiasParaVencer(a.validade) - calcularDiasParaVencer(b.validade);
        });
        
        produtosAVencer.forEach(item => {
            const diasParaVencer = calcularDiasParaVencer(item.validade);
            const textoVencimento = diasParaVencer === 0 ? 'Vence hoje' : 
                                diasParaVencer === 1 ? '1 dia' : 
                                `${diasParaVencer} dias`;
            
            const li = document.createElement('li');
            li.className = 'item-card';
            li.innerHTML = `
              <span class="item-text">${item.nome}</span>
              <span class="item-text" style="color: var(--laranja);">${textoVencimento}</span>
            `;
            lista.appendChild(li);
        });
    }

    function renderizarProdutosEmFalta() {
        const estoque = JSON.parse(localStorage.getItem('estoque')) || [];
        const lista = document.getElementById('lista-produtos-falta');
        
        lista.innerHTML = '';
        
        // Filtrar produtos com quantidade <= 10
        const produtosEmFalta = estoque.filter(item => item.quantidade <= 10);
        
        if (produtosEmFalta.length === 0) {
            lista.innerHTML = '<li class="item-card"><span class="item-text">Nenhum produto em falta</span></li>';
            return;
        }
        
        // Ordenar por quantidade (menor para maior)
        produtosEmFalta.sort((a, b) => a.quantidade - b.quantidade);
        
        produtosEmFalta.forEach(item => {
            const li = document.createElement('li');
            li.className = 'item-card';
            li.innerHTML = `
              <span class="item-text">${item.nome}</span>
              <span class="item-text" style="color: var(--vermelho);">${item.quantidade} un.</span>
            `;
            lista.appendChild(li);
        });
    }

    function renderizarListas() {
        var estoque = carregarEstoque();
        var aVencer = [];
        var emFalta = [];

        // Separar produtos a vencer (validade <= 5 dias) e em falta (quantidade <= 1)
        for (var i = 0; i < estoque.length; i++) {
            var produto = estoque[i];
            if (produto.quantidade <= 1) {
                emFalta.push(produto);
            } else if (produto.validade <= 5 && produto.validade > 0) {
                aVencer.push(produto);
            }
        }

        // Renderizar produtos a vencer
        listaVencer.innerHTML = '';
        if (aVencer.length === 0) {
            listaVencer.innerHTML = '<li class="item-card"><div class="item-text">Nenhum produto a vencer</div></li>';
        } else {
            for (var j = 0; j < aVencer.length; j++) {
                var li = document.createElement('li');
                li.className = 'item-card';
                var textoValidade = aVencer[j].validade === 1 ? '1 dia' : aVencer[j].validade + ' dias';
                li.innerHTML = '<div class="item-text">' + aVencer[j].nome + ' - <span class="alerta">' + textoValidade + '</span></div>';
                listaVencer.appendChild(li);
            }
        }

        // Renderizar produtos em falta
        listaFalta.innerHTML = '';
        if (emFalta.length === 0) {
            listaFalta.innerHTML = '<li class="item-card"><div class="item-text">Nenhum produto em falta</div></li>';
        } else {
            for (var k = 0; k < emFalta.length; k++) {
                var liF = document.createElement('li');
                liF.className = 'item-card';
                liF.innerHTML = '<div class="item-text">' + emFalta[k].nome + ' - <span class="alerta">' + emFalta[k].quantidade + 'x</span></div>';
                listaFalta.appendChild(liF);
            }
        }
    }

    renderizarProdutosAVencer();
    renderizarProdutosEmFalta();
    renderizarListas();
});
