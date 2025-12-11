// O require é uma função nativa do js responsável por importar um arquivo ou função para o documento atual
const data = require('./db/products.json') // Importamos o arquivo json e o salvamos em data
const readline = require('readline') // Readline é um módulo de Node.js usado para lidar com input e output via terminal em aplicações JS
const { listMovies, movieDetails, movieCost } = require('./src/estruturado/functions')

// Habilita as interações via terminal
const rl = readline.createInterface({
    input: process.stdin, // define o teclado como input
    output: process.stdout // define o terminal como saída
})

rl.question(
    // 1. Escolhe o filme
    `${listMovies(data)}\nInforme o número da opção desejada: `,
    
    (movie) => {
            console.log(`Você escolheu o filme ${(data["movies"][movie-1].name).toUpperCase()}`)
            
            // 2. Exibe os detalhes do filme
            movieDetails(data["movies"][movie-1])

            // 3. Pergunta a sessão
            rl.question(

                '\nInforme o número da sessão desejada: ',
                (session) => {
                    console.log(`\nSessão escolhida: ${session}`)
 
                    // 4. Pergunta a quantidade de inteiras
                    rl.question('\nInteira: R$30,00 | Meia: R$15,00\nQuantas inteiras você deseja? ',
                        (fullprice) => {
                            console.log(`inteiras compradas: ${fullprice}`)

                            // 5. Quantidade de meias
                            rl.question('\nInteira: R$30,00 | Meia: R$15,00\nQuantas meias você deseja? ',
                                (halfprice) => {
                                    console.log(`meias compradas: ${halfprice}`)

                                    // 6. Exibe o valor total de entradas
                                    console.log(`Preço do cinema ${movieCost(data["movies"][movie-1].price, Number(fullprice), Number(halfprice))}`)
                                    rl.close()

                                }
                            )
                        }
                    )

                }

            )
        }
)

