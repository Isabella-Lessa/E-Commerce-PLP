// O require é uma função nativa do js responsável por importar um arquivo ou função para o documento atual
const data = require('./db/products.json') // Importamos o arquivo json e o salvamos em data
const readline = require('readline') // Readline é um módulo de Node.js usado para lidar com input e output via terminal em aplicações JS
// A ser apagado:
//const { listMovies, movieDetails, movieCost, listSnacks, snacksCost } = require('./src/estruturado/functions')

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

// Habilita as interações via terminal - NÃO MEXER
const rl = readline.createInterface({
    input: process.stdin, // define o teclado como input
    output: process.stdout // define o terminal como saída
})

// Instancia um novo carrinho assim que o programa inicia, para salvar os itens do usuário
const myCart = new Cart()

function showMainMenu() {
    rl.question('[1] - Comprar Ingresso\n[0] Sair\n',
        (option) => {
            switch (Number(option)) {
                case 1:
                    listMovies()
                    break;
                case 0:
                    rl.close()
                    break;
                default:
                    showMainMenu()
                    break;
            }
        }
    )
}

function listMovies() {
    rl.question(`${movies.map((movie, current) => `[${current+1}] - ${movie.name}\n`, 0).join('')}\nEscolha o número do filme desejado ou 0 para sair: `, 
    (inputMovie) => {
        
        if (inputMovie <= 0) {
            rl.close()
            return
        }

        const selectedMovie = movies[inputMovie-1]
        console.log(`\n\nVocê escolheu o filme ${selectedMovie.name}\n
        ${selectedMovie.description}\n
        ${selectedMovie.genre}\n
        ${selectedMovie.duration} minutos\n
        Assentos disponíveis: ${selectedMovie.stock}\n
        Ingresso: R$${selectedMovie.price}`)

        selectSession(selectedMovie)
    })
}

function selectSession(movie) {
    console.log(`Sessões disponíveis para ${movie.name}: \n`)
    rl.question('[1] 15h00 - [2] 18h00 - [3] 21h00\n\nEscolha o número da sessão ou 0 para sair: ', 
        (inputSession) => {
            if (inputSession <= 0) {
                rl.close()
                return
            }
            const session = inputSession == 1 ? '15h00' : inputSession == 2 ? '18h00' : '21h00'
            selectTickets(movie, session)
        }
    )
}

function selectTickets(movie, session) {
    console.log(`Preço do ingresso: R$${movie.price}`)
    rl.question('Informe ingressos você deseja ou 0 para sair: ',  
        (tickets) => {
            if (tickets <= 0) {
                rl.close()
                return
            }

            tickets = +tickets // O operador + na frente de uma variável que contémstring transforma-a em número
            const movieSession = new CartItem(movie, tickets)
            myCart.add(movieSession)

            // para reduzir a quantidade de parâmetros nas chamadas seguintes empacotei todos estes em um Objeto
            selectSnacks({movie, session, tickets})
        }
    )
}

function selectSnacks({movie, session, tickets}) {
    rl.question(`${snacks.map((snack, current) => `[${current+1}] - ${snack.name}\n`, 0).join('')}\nEscolha o número do snack desejado ou 0 para sair: `, 
    (inputSnack) => {
        
        if (inputSnack <= 0) {
            rl.close()
            return
        }

        const selectedSnack = snacks[inputSnack-1]
        console.log(`\n\nVocê escolheu ${selectedSnack.type}\n
        R$${selectedSnack.price}`)

        selectSnackQuantity({movie, session, tickets}, selectedSnack)
    })
}

function selectSnackQuantity({movie, session, tickets}, snack) {
    rl.question(`Quantas unidades de ${snack.type} você quer?`, 
        (snackQuantity) => {
            if (snackQuantity <= 0) {
                checkout()
                return
            }
            snackQuantity = +snackQuantity
            const snackSession = new CartItem(snack, snackQuantity)
            myCart.add(snackSession)
            checkout({movie, session, tickets}, snack)
        }
    )
}

function checkout(movie, snack) {

}

// rl.question(
//     // 1. Escolhe o filme
//     `${movies.map((movie, current) => `[${current+1}] - ${movie.name}\n`, 0).join('')}\nEscolha o número do filme desejado: `,
    
//     (inputMovie) => {
//         // 2. Exibe detalhes do filme
//         const selectedMovie = movies[inputMovie-1]
//         console.log(`\n\nVocê escolheu o filme ${selectedMovie.name}\n
//         ${selectedMovie.description}\n
//         ${selectedMovie.genre}\n
//         ${selectedMovie.duration} minutos\n
//         Assentos disponíveis: ${selectedMovie.stock}\n
//         Ingresso: R$${selectedMovie.price}`)

//         // 3. Pergunta a sessão
//         rl.question(

//             '\nInforme o número da sessão desejada: ',
//             (inputSession) => {

//                 // 4. Pergunta a quantidade de ingressos
//                 rl.question('\Ingresso: R$30,00 \nQuantos ingressos você deseja? ',
//                     (inputTicket) => {
//                         const movie = new CartItem(selectedMovie, inputTicket)
//                         myCart.add(movie)
//                         console.log(`\n=== TOTAL A PAGAR: R$ ${myCart.calculateTotal()} ===`)
//                         console.log("Obrigado pela preferência!")
                    
//                         rl.close()
//                 }
//                 )
//             }
//         )

//     }
// )

showMainMenu()