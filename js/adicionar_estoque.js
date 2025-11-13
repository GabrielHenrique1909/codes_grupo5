document.addEventListener('DOMContentLoaded', function() {
    var form = document.querySelector('.form-adicionar');
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

    function adicionarProduto(nome, quantidade, validade) {
        var estoque = carregarEstoque();
        var produto = {
            nome: nome,
            quantidade: parseInt(quantidade),
            validade: parseInt(validade)
        };
        estoque.push(produto);
        salvarEstoque(estoque);
    }

    // Validação ao submeter o formulário
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            var produtoNome = document.getElementById('produto-nome');
            var produtoQuantidade = document.getElementById('produto-quantidade');
            var produtoValidade = document.getElementById('produto-validade');
            var todosPreenchidos = true;

            // Verificar se todos os campos estão preenchidos
            if (!produtoNome.value.trim()) {
                todosPreenchidos = false;
            }
            if (!produtoQuantidade.value.trim()) {
                todosPreenchidos = false;
            }
            if (!produtoValidade.value.trim()) {
                todosPreenchidos = false;
            }

            // Mostrar modal de erro se algum campo estiver vazio
            if (!todosPreenchidos) {
                modalErro.classList.remove('hidden');
            } else {
                // Adicionar produto ao estoque
                adicionarProduto(
                    produtoNome.value.trim(),
                    produtoQuantidade.value,
                    produtoValidade.value
                );
                // Mostrar modal de sucesso
                modalSucesso.classList.remove('hidden');
            }
        });
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

    // Fechar modal de sucesso ao clicar fora (agora apenas fecha, link redireciona)
    if (modalSucesso) {
        modalSucesso.addEventListener('click', function(e) {
            if (e.target === modalSucesso) {
                modalSucesso.classList.add('hidden');
            }
        });
    }
});