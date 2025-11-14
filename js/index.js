document.addEventListener('DOMContentLoaded', function() {
    var valorMetaDisplay = document.getElementById('valor-meta-display');
    var diasMetaDisplay = document.getElementById('dias-meta-display');
    var lucroDisplay = document.getElementById('lucro-display');
    var porcentagemMeta = document.getElementById('porcentagem-meta');

    function carregarMeta() {
        var meta = JSON.parse(localStorage.getItem('meta')) || null;
        return meta;
    }

    function carregarLucro() {
        // Calcular total de vendas
        var vendas = JSON.parse(localStorage.getItem('vendas')) || [];
        var totalVendas = 0;
        
        vendas.forEach(function(venda) {
            if (venda.valorTotal) {
                totalVendas += parseFloat(venda.valorTotal);
            } else {
                totalVendas += parseFloat(venda.valor) * parseInt(venda.quantidade);
            }
        });
        
        // Calcular total de gastos
        var gastos = JSON.parse(localStorage.getItem('gastos')) || [];
        var totalGastos = 0;
        
        gastos.forEach(function(gasto) {
            totalGastos += parseFloat(gasto.valor);
        });
        
        // Retornar o lucro (vendas - gastos)
        return totalVendas - totalGastos;
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

    function atualizarMetaDisplay() {
        var meta = carregarMeta();
        var lucroAtual = carregarLucro();
        
        // Atualizar lucro sempre
        if (lucroDisplay) {
            lucroDisplay.textContent = 'R$ ' + lucroAtual.toFixed(2).replace('.', ',');
        }
        
        if (meta) {
            // Exibir valor da meta
            valorMetaDisplay.textContent = 'R$ ' + meta.valor.toFixed(2).replace('.', ',');
            
            // Calcular e exibir dias restantes
            var diasRestantes = calcularDiasRestantes(meta.data);
            diasMetaDisplay.textContent = diasRestantes;
            
            // Calcular porcentagem da meta atingida
            var porcentagem = meta.valor > 0 ? (lucroAtual / meta.valor) * 100 : 0;
            if (porcentagemMeta) {
                porcentagemMeta.textContent = Math.round(porcentagem) + '% da meta';
            }
        } else {
            valorMetaDisplay.textContent = 'Nenhuma meta definida';
            diasMetaDisplay.textContent = '-';
            if (porcentagemMeta) {
                porcentagemMeta.textContent = 'Defina uma meta';
            }
        }
    }

    atualizarMetaDisplay();
});
