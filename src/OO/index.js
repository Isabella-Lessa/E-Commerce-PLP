// Arquivo responsável por pegar a base de dados em JSON e transformá-los em objetos das classes Movie e Snack
const Cart = require('./Cart')
const CartItem = require('./CartItem')
const Movie = require('./Movie')
const Snack = require('./Snack')
const data = require('../../db/products.json')

// Percorre a lista de filmes e cria um objeto Movie com os dados de cada filme da lista
const movies = data.movies.map(movie => new Movie(
    movie.category,
    movie.name,
    movie.description,
    movie.price,
    movie.stock,
    movie.genre,
    movie.duration
))

// Percorre a lista de lanches e cria um objeto Snack com os dados de cada lanche da lista
const snacks = data.snacks.map(snack => new Snack(
    snack.category,
    snack.name,
    snack.description,
    snack.price,
    snack.stock,
    snack.type
))

// Cria uma nova instância de carrinho
const myCart = new Cart()
// Cria e adiciona um novo item no carrinho (um filme e um lanche)
const movie = new CartItem(movies[0], 2)
const snack = new CartItem(snacks[0], 1)

// Adiciona os items ao carrinho
myCart.add(movie)
myCart.add(snack)

// Soma o valor total dos itens no carrinho
console.log(myCart.calculateTotal())

module.exports = { movies, snacks }