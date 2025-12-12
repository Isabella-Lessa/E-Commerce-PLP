// Funções Puras

// Imutabilidade / Funções Puras: As funções em catalogOperations.js não possuem efeitos colaterais e transformam dados usando map, filter e reduce.
// Map & Reduce: Usados para transformar dados de entrada (map) e calcular o total do carrinho (reduce).

// High Order Function: Recebe uma função de critério (fn) e aplica a lista
// Paradigma Funcional
// Função de Ordem Superior: A função filterByCriteria recebe uma função de critério (isMovie) como argumento.
const filterByCriteria = (list, criteriaFn) => {
    return list.filter(criteriaFn);
};

// Exemplos de critérios (funções que serão passadas como parâmetro)
const isMovie = (item) => item.category === 'movie';
const isSnack = (item) => item.category === 'snacks';
const isCheap = (item) => item.price < 20.00;

// Map: Transformação de dados para exibição (formatar preço)
const formatCatalogView = (list) => {
    return list.map((item, index) => ({
        id: index + 1,
        display: `${item.name.toUpperCase()} - R$ ${item.price.toFixed(2)}`
    }));
};

// Reduce: Calcular estatísticas
const getAveragePrice = (list) => {
    const total = list.reduce((acc, item) => acc + item.price, 0);
    return list.length > 0 ? (total / list.length).toFixed(2) : 0;
};

module.exports = { 
    filterByCriteria, 
    isMovie, 
    isSnack, 
    isCheap,
    formatCatalogView, 
    getAveragePrice 
};