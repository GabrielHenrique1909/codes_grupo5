function mostrarErro(mensagem) {
  const modal = document.getElementById('modal-erro');
  const texto = document.getElementById('modal-erro-texto');
  texto.textContent = mensagem;
  modal.classList.remove('hidden');
}

function fecharErro() {
  document.getElementById('modal-erro').classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('form-adicionar-gasto');
  const btnErro = document.getElementById('modal-erro-btn');

  btnErro.addEventListener('click', fecharErro);

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nome-gasto').value.trim();
    const valor = document.getElementById('valor-gasto').value;
    const data = document.getElementById('data-gasto').value;

    // Validações
    if (!nome) {
      mostrarErro('Por favor, preencha o nome do gasto.');
      return;
    }

    if (!valor || parseFloat(valor) <= 0) {
      mostrarErro('Por favor, informe um valor válido maior que zero.');
      return;
    }

    if (!data) {
      mostrarErro('Por favor, selecione uma data.');
      return;
    }

    // Buscar gastos existentes
    let gastos = JSON.parse(localStorage.getItem('gastos')) || [];

    // Adicionar novo gasto
    gastos.push({
      nome: nome,
      valor: parseFloat(valor),
      data: data,
      timestamp: Date.now()
    });

    // Salvar no localStorage
    localStorage.setItem('gastos', JSON.stringify(gastos));

    // Mostrar modal de sucesso
    document.getElementById('modal-sucesso').classList.remove('hidden');
  });
});
