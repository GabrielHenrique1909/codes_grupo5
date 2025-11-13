document.addEventListener('DOMContentLoaded', function() {
    var listaVencer = document.getElementById('scroll-estoque-vencer');
    var listaFalta = document.getElementById('scroll-estoque-falta');

    function carregarEstoque() {
        var estoque = JSON.parse(localStorage.getItem('estoque')) || [];
        return estoque;
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

    renderizarListas();
});
