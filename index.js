// O require é uma função nativa do js responsável por importar um arquivo ou função para o documento atual
const data = require('./db/products.json') // Importamos o arquivo json e o salvamos em data
const readline = require('readline') // Readline é um módulo de Node.js usado para lidar com input e output via terminal em aplicações JS
// A ser apagado:
const { listMovies, movieDetails, movieCost, listSnacks, snacksCost } = require('./src/estruturado/functions')

// Refatoração do código para usar as classes
const Cart = require('./src/OO/Cart')
const CartItem = require('./src/OO/CartItem')
const Snack = require('./src/OO/Snack')
const Movie = require('./src/OO/Movie')

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

// Habilita as interações via terminal
const rl = readline.createInterface({
    input: process.stdin, // define o teclado como input
    output: process.stdout // define o terminal como saída
})


const myCart = new Cart()

rl.question(
    // 1. Escolhe o filme
    `${movies.map((movie, current) => `[${current+1}] - ${movie.name}\n`, 0).join('')}\nEscolha o número do filme desejado: `,
    
    (inputMovie) => {
        // 2. Exibe detalhes do filme
        const selectedMovie = movies[inputMovie-1]
        console.log(`\n\nVocê escolheu o filme ${selectedMovie.name}\n
        ${selectedMovie.description}\n
        ${selectedMovie.genre}\n
        ${selectedMovie.duration} minutos\n
        Assentos disponíveis: ${selectedMovie.stock}\n
        Ingresso: R$${selectedMovie.price}`)

        // 3. Pergunta a sessão
        rl.question(

            '\nInforme o número da sessão desejada: ',
            (inputSession) => {

                // 4. Pergunta a quantidade de ingressos
                rl.question('\Ingresso: R$30,00 \nQuantos ingressos você deseja? ',
                    (inputTicket) => {
                        const movie = new CartItem(selectedMovie, inputTicket)
                        myCart.add(movie)
                        console.log(`\n=== TOTAL A PAGAR: R$ ${myCart.calculateTotal()} ===`)
                        console.log("Obrigado pela preferência!")
                    
                        rl.close()
                }
                                            )
                                        }
                                    )

                                }
                            )

