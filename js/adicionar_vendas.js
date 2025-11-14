function mostrarErro(mensagem) {
  const modal = document.getElementById('modal-erro');
  const texto = document.getElementById('modal-erro-texto');
  texto.textContent = mensagem;
  modal.classList.remove('hidden');
}

function fecharErro() {
  document.getElementById('modal-erro').classList.add('hidden');
}

function popularSelectProdutos() {
  const estoque = JSON.parse(localStorage.getItem('estoque')) || [];
  const select = document.getElementById('nome-produto');
  
  // Limpar opções exceto a primeira
  select.innerHTML = '<option value="">Selecione um produto...</option>';
  
  // Verificar se há produtos no estoque
  if (estoque.length === 0) {
    select.innerHTML = '<option value="">Nenhum produto no estoque</option>';
    select.disabled = true;
    return;
  }
  
  // Adicionar cada produto como opção
  estoque.forEach(produto => {
    const option = document.createElement('option');
    option.value = produto.nome;
    option.textContent = `${produto.nome} (${produto.quantidade} disponíveis)`;
    option.dataset.quantidadeDisponivel = produto.quantidade;
    select.appendChild(option);
  });
}

function buscarProdutoNoEstoque(nomeProduto) {
  const estoque = JSON.parse(localStorage.getItem('estoque')) || [];
  return estoque.find(item => 
    item.nome.toLowerCase() === nomeProduto.toLowerCase()
  );
}

function atualizarEstoque(nomeProduto, quantidadeVendida) {
  let estoque = JSON.parse(localStorage.getItem('estoque')) || [];
  
  estoque = estoque.map(item => {
    if (item.nome.toLowerCase() === nomeProduto.toLowerCase()) {
      return {
        ...item,
        quantidade: item.quantidade - quantidadeVendida
      };
    }
    return item;
  }).filter(item => item.quantidade > 0);
  
  localStorage.setItem('estoque', JSON.stringify(estoque));
}

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('form-adicionar-vendas');
  const btnErro = document.getElementById('modal-erro-btn');
  const selectProduto = document.getElementById('nome-produto');

  // Popular select com produtos do estoque
  popularSelectProdutos();

  if (btnErro) {
    btnErro.addEventListener('click', fecharErro);
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const nomeProduto = selectProduto.value.trim();
    const valorUnitario = parseFloat(document.getElementById('valor-produto').value);
    const quantidade = parseInt(document.getElementById('qtd-produto').value);

    // Validações básicas
    if (!nomeProduto) {
      mostrarErro('Por favor, selecione um produto.');
      return;
    }

    if (!valorUnitario || valorUnitario <= 0) {
      mostrarErro('Por favor, informe um valor válido maior que zero.');
      return;
    }

    if (!quantidade || quantidade <= 0) {
      mostrarErro('Por favor, informe uma quantidade válida maior que zero.');
      return;
    }

    // Verificar se o produto existe no estoque
    const produtoEstoque = buscarProdutoNoEstoque(nomeProduto);
    
    if (!produtoEstoque) {
      mostrarErro('Produto não encontrado no estoque.');
      return;
    }

    // Verificar se há quantidade suficiente no estoque
    if (quantidade > produtoEstoque.quantidade) {
      mostrarErro(`Quantidade insuficiente no estoque. Disponível: ${produtoEstoque.quantidade} unidades.`);
      return;
    }

    // Calcular valor total da venda
    const valorTotal = valorUnitario * quantidade;

    // Buscar vendas existentes
    let vendas = JSON.parse(localStorage.getItem('vendas')) || [];

    // Adicionar nova venda
    vendas.push({
      nome: nomeProduto,
      valor: valorUnitario,
      quantidade: quantidade,
      valorTotal: valorTotal,
      data: new Date().toISOString().split('T')[0],
      timestamp: Date.now()
    });

    // Salvar vendas
    localStorage.setItem('vendas', JSON.stringify(vendas));

    // Atualizar estoque (diminuir quantidade)
    atualizarEstoque(nomeProduto, quantidade);

    // Mostrar modal de sucesso
    document.getElementById('modal-sucesso').classList.remove('hidden');
  });
});
