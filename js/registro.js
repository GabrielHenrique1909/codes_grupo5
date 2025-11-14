function calcularTotalPorProduto() {
  const vendas = JSON.parse(localStorage.getItem('vendas')) || [];
  const totaisPorProduto = {};

  vendas.forEach(venda => {
    const nomeProduto = venda.nome;
    const quantidade = parseInt(venda.quantidade);

    if (totaisPorProduto[nomeProduto]) {
      totaisPorProduto[nomeProduto] += quantidade;
    } else {
      totaisPorProduto[nomeProduto] = quantidade;
    }
  });

  return totaisPorProduto;
}

function encontrarMaisVendido(totaisPorProduto) {
  let maisVendido = { nome: 'Nenhum', quantidade: 0 };

  for (const produto in totaisPorProduto) {
    if (totaisPorProduto[produto] > maisVendido.quantidade) {
      maisVendido = {
        nome: produto,
        quantidade: totaisPorProduto[produto]
      };
    }
  }

  return maisVendido.nome;
}

function encontrarMenosVendido(totaisPorProduto) {
  let menosVendido = { nome: 'Nenhum', quantidade: Infinity };

  for (const produto in totaisPorProduto) {
    if (totaisPorProduto[produto] < menosVendido.quantidade) {
      menosVendido = {
        nome: produto,
        quantidade: totaisPorProduto[produto]
      };
    }
  }

  return menosVendido.quantidade === Infinity ? 'Nenhum' : menosVendido.nome;
}

function renderizarEstatisticas() {
  const totaisPorProduto = calcularTotalPorProduto();
  const maisVendido = encontrarMaisVendido(totaisPorProduto);
  const menosVendido = encontrarMenosVendido(totaisPorProduto);

  // Atualizar na tela
  const elementosMaisVendido = document.querySelectorAll('.estat-venda-valor');
  if (elementosMaisVendido[0]) {
    elementosMaisVendido[0].textContent = maisVendido;
  }
  if (elementosMaisVendido[1]) {
    elementosMaisVendido[1].textContent = menosVendido;
  }
}

function renderizarListaVendas() {
  const totaisPorProduto = calcularTotalPorProduto();
  const listaRegistro = document.getElementById('lista-registro');

  // Limpar lista
  listaRegistro.innerHTML = '';

  // Se não houver vendas
  if (Object.keys(totaisPorProduto).length === 0) {
    listaRegistro.innerHTML = '<li style="text-align:center; padding:1rem; color:#999;">Nenhuma venda registrada</li>';
    return;
  }

  // Converter objeto em array e ordenar por quantidade (maior para menor)
  const produtosOrdenados = Object.entries(totaisPorProduto)
    .map(([nome, quantidade]) => ({ nome, quantidade }))
    .sort((a, b) => b.quantidade - a.quantidade);

  // Renderizar cada produto
  produtosOrdenados.forEach(produto => {
    const li = document.createElement('li');
    li.className = 'item-card-registro';
    li.innerHTML = `
      <span class="produto-nome">${produto.nome}</span>
      <span class="produto-qtd">${produto.quantidade} un.</span>
    `;
    listaRegistro.appendChild(li);
  });
}

function atualizarTela() {
  renderizarEstatisticas();
  renderizarListaVendas();
}

document.addEventListener('DOMContentLoaded', function() {
  atualizarTela();
});
