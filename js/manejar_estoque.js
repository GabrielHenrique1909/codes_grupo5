document.addEventListener('DOMContentLoaded', function() {
    var listaManejar = document.getElementById('lista-manejar');

    function carregarEstoque() {
        var estoque = JSON.parse(localStorage.getItem('estoque')) || [];
        return estoque;
    }

    function renderizarLista() {
        var estoque = carregarEstoque();
        listaManejar.innerHTML = '';

        if (estoque.length === 0) {
            listaManejar.innerHTML = '<li class="item-card"><div class="item-text">Nenhum produto no estoque</div></li>';
            return;
        }

        for (var i = 0; i < estoque.length; i++) {
            var produto = estoque[i];
            var li = document.createElement('li');
            li.className = 'item-card item-card--manejar';
            
            var textoValidade = produto.validade > 0 ? (produto.validade === 1 ? '1 dia' : produto.validade + ' dias') : '-';
            
            li.innerHTML = '<div class="card-row"><div class="nome">' + produto.nome + '</div><div class="quantidade">' + produto.quantidade + 'x</div></div>' +
                          '<div class="card-row card-row--bottom"><div class="validade">Validade: <strong>' + textoValidade + '</strong></div><div class="slot-empty"></div></div>';
            
            listaManejar.appendChild(li);
        }
    }

    renderizarLista();
});
