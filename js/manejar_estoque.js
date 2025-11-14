document.addEventListener('DOMContentLoaded', function() {
    var listaManejar = document.getElementById('lista-manejar');

    function carregarEstoque() {
        var estoque = JSON.parse(localStorage.getItem('estoque')) || [];
        return estoque;
    }

    function calcularDiasRestantes(dataValidade) {
        var hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
        
        var validade = new Date(dataValidade);
        validade.setHours(0, 0, 0, 0);
        
        var diferencaTempo = validade - hoje;
        var diferencaDias = Math.ceil(diferencaTempo / (1000 * 60 * 60 * 24));
        
        return diferencaDias;
    }

    function renderizarLista() {
        var estoque = carregarEstoque();
        listaManejar.innerHTML = '';

        if (estoque.length === 0) {
            listaManejar.innerHTML = '<li class="item-card"><div class="item-text">Nenhum produto no estoque</div></li>';
            return;
        }

        // Renderizar todos os produtos
        estoque.forEach(item => {
            var li = document.createElement('li');
            li.className = 'item-card item-card--manejar';
            
            var diasRestantes = calcularDiasRestantes(item.validade);
            var textoValidade = diasRestantes === 1 ? '1 dia' : diasRestantes + ' dias';
            
            li.innerHTML = '<div class="card-row"><div class="nome">' + item.nome + '</div><div class="quantidade">' + item.quantidade + 'x</div></div>' +
                          '<div class="card-row card-row--bottom"><div class="validade">Validade: <strong>' + textoValidade + '</strong></div><div class="slot-empty"></div></div>';
            
            listaManejar.appendChild(li);
        });
    }

    renderizarLista();
});
