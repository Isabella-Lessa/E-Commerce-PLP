// O require é uma função nativa do js responsável por importar um arquivo JSON e transformá-lo em um Objeto JS
const data = require('../../db/products.json')
const resumoCompra = require('./resumoCompra');


// A função recebe o objeto completo de dados
function listMovies (data) {
    let catalog = ""
    console.log("Confira o catálogo abaixo:")
    // Dentro do objeto percorre apenas a lista de filmes
    for (let index = 0; index < data["movies"].length; index++) {
        // Para cada filme: exibe seu nome em letras maiúsculas
        catalog += `\n[${index+1}] ${String(data["movies"][index].name).toUpperCase()}\n`
    }

    return catalog
}



console.log(listMovies(data))

const filme = "O Senhor dos Anéis";
const hora = "20:00";
const lanche = "Pipoca + Refrigerante";
const qtdMeias = 2;
const qtdInteiras = 1;
const total = 67.80;

// Chama sua função
const resumo = resumoCompra(filme, hora, lanche, qtdMeias, qtdInteiras, total);
console.log(resumo);