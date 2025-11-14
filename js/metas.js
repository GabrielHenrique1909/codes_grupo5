document.addEventListener('DOMContentLoaded', function() {
    var form = document.querySelector('.form-metas');
    var valorMetaInput = document.getElementById('valor-meta');
    var dataMetaInput = document.getElementById('data-meta');
    var modalErro = document.getElementById('modal-erro');
    var btnFecharErro = document.getElementById('btn-fechar-erro');
    var modalSucesso = document.getElementById('modal-sucesso');

    function carregarMeta() {
        var meta = JSON.parse(localStorage.getItem('meta')) || null;
        return meta;
    }

    function salvarMeta(valor, data) {
        var meta = {
            valor: parseFloat(valor),
            data: data
        };
        localStorage.setItem('meta', JSON.stringify(meta));
    }

    // Carregar meta existente ao abrir a página
    var metaExistente = carregarMeta();
    if (metaExistente) {
        valorMetaInput.value = metaExistente.valor;
        dataMetaInput.value = metaExistente.data;
    }

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            var valor = valorMetaInput.value.trim();
            var data = dataMetaInput.value.trim();

            // Validar se os campos estão preenchidos
            if (!valor || !data || parseFloat(valor) <= 0) {
                modalErro.classList.remove('hidden');
                return;
            }

            // Salvar meta
            salvarMeta(valor, data);
            
            // Mostrar modal de sucesso
            modalSucesso.classList.remove('hidden');
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

    // Fechar modal de sucesso ao clicar fora (link redireciona)
    if (modalSucesso) {
        modalSucesso.addEventListener('click', function(e) {
            if (e.target === modalSucesso) {
                modalSucesso.classList.add('hidden');
            }
        });
    }
});
