function resumoCompra(filme, hora, lanche, qtdMeias, qtdInteiras, total) {
    const formatador = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
    const totalFormatado = formatador.format(total);

    const textoMeias = qtdMeias === 1 ? `${qtdMeias} meia` : `${qtdMeias} meias`;
    const textoInteiras = qtdInteiras === 1 ? `${qtdInteiras} inteira` : `${qtdInteiras} inteiras`;

    return `
===== RESUMO DA COMPRA =====
Filme: ${filme}
Horário: ${hora}
Lanche: ${lanche}
Ingressos: ${textoMeias} + ${textoInteiras}
Total: ${totalFormatado}
=============================
`;
}

module.exports = resumoCompra;
