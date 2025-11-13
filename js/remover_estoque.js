document.addEventListener('DOMContentLoaded', function() {
    var listaRemover = document.getElementById('scroll-remover-manejar');
    var btnConfirmar = document.getElementById('btn-confirmar-remocao');
    var modalErro = document.getElementById('modal-erro');
    var btnFecharErro = document.getElementById('btn-fechar-erro');
    var modalSucesso = document.getElementById('modal-sucesso');

    function carregarEstoque() {
        var estoque = JSON.parse(localStorage.getItem('estoque')) || [];
        return estoque;
    }

    function salvarEstoque(estoque) {
        localStorage.setItem('estoque', JSON.stringify(estoque));
    }

    function renderizarLista() {
        var estoque = carregarEstoque();
        listaRemover.innerHTML = '';

        if (estoque.length === 0) {
            listaRemover.innerHTML = '<li class="item-card"><div class="item-text">Nenhum produto no estoque</div></li>';
            btnConfirmar.style.display = 'none';
            return;
        }

        for (var i = 0; i < estoque.length; i++) {
            var produto = estoque[i];
            var li = document.createElement('li');
            
            var textoValidade = produto.validade > 0 ? (produto.validade === 1 ? '1 dia' : produto.validade + ' dias') : '-';
            
            li.innerHTML = '<input class="select" type="checkbox" id="r' + i + '" data-index="' + i + '">' +
                          '<label class="item-card item-card--manejar" for="r' + i + '">' +
                          '<span class="card-row"><span class="nome">' + produto.nome + '</span><span class="quantidade">' + produto.quantidade + 'x</span></span>' +
                          '<span class="card-row card-row--bottom"><span class="validade">Validade: <strong>' + textoValidade + '</strong></span><span class="slot-empty"></span></span>' +
                          '</label>';
            
            listaRemover.appendChild(li);
        }
    }

    function removerSelecionados() {
        var checkboxes = document.querySelectorAll('#scroll-remover-manejar .select:checked');
        
        // Validar se há itens selecionados
        if (checkboxes.length === 0) {
            modalErro.classList.remove('hidden');
            return;
        }

        var estoque = carregarEstoque();
        var indicesParaRemover = [];

        for (var i = 0; i < checkboxes.length; i++) {
            var index = parseInt(checkboxes[i].getAttribute('data-index'));
            indicesParaRemover.push(index);
        }

        // Remover de trás para frente para não alterar os índices
        indicesParaRemover.sort(function(a, b) { return b - a; });
        for (var j = 0; j < indicesParaRemover.length; j++) {
            estoque.splice(indicesParaRemover[j], 1);
        }

        salvarEstoque(estoque);
        
        // Mostrar modal de sucesso
        modalSucesso.classList.remove('hidden');
    }

    // Fechar modal de erro ao clicar no botão OK
    if (btnFecharErro) {
        btnFecharErro.addEventListener('click', function() {
            modalErro.classList.add('hidden');
        });
    }

    // Fechar modal de erro ao clicar fora do conteúdo
    if (modalErro) {
        modalErro.addEventListener('click', function(e) {
            if (e.target === modalErro) {
                modalErro.classList.add('hidden');
            }
        });
    }

    // Fechar modal de sucesso ao clicar fora (link redireciona)
    if (modalSucesso) {
        modalSucesso.addEventListener('click', function(e) {
            if (e.target === modalSucesso) {
                modalSucesso.classList.add('hidden');
            }
        });
    }

    if (btnConfirmar) {
        btnConfirmar.addEventListener('click', removerSelecionados);
    }

    renderizarLista();
});
