function formatarReais(valor) {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

function calcularTotalGastos() {
  const gastos = JSON.parse(localStorage.getItem('gastos')) || [];
  let total = 0;
  
  gastos.forEach(gasto => {
    total += parseFloat(gasto.valor);
  });
  
  return total;
}

function calcularTotalVendas() {
  const vendas = JSON.parse(localStorage.getItem('vendas')) || [];
  let total = 0;
  
  vendas.forEach(venda => {
    // Usar valorTotal se existir, senão calcular
    if (venda.valorTotal) {
      total += parseFloat(venda.valorTotal);
    } else {
      total += parseFloat(venda.valor) * parseInt(venda.quantidade);
    }
  });
  
  return total;
}

function atualizarValores() {
  const totalGastos = calcularTotalGastos();
  const totalVendas = calcularTotalVendas();
  const lucro = totalVendas - totalGastos;

  // Atualizar na tela
  document.getElementById('valor-gasto').textContent = formatarReais(totalGastos);
  document.getElementById('valor-vendas').textContent = formatarReais(totalVendas);
  
  const elementoLucro = document.getElementById('valor-lucro');
  elementoLucro.textContent = formatarReais(lucro);
  
  // Aplicar cor verde ou vermelha no lucro
  if (lucro >= 0) {
    elementoLucro.classList.add('valor-positivo');
    elementoLucro.classList.remove('valor-negativo');
  } else {
    elementoLucro.classList.remove('valor-positivo');
    elementoLucro.classList.add('valor-negativo');
  }
}

document.addEventListener('DOMContentLoaded', function() {
  atualizarValores();
});
