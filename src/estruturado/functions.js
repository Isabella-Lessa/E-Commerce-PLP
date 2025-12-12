// A função recebe o objeto completo de dados (filmes e lanches)
function listMovies (data){
    let catalog = ""
    console.log("Confira o catálogo abaixo:")

    // Dentro do objeto percorre apenas a lista de filmes
    for (let index = 0; index < data["movies"].length; index++) {
        // Para cada filme: exibe seu nome em letras maiúsculas
        catalog += `\n[${index+1}] ${String(data["movies"][index].name).toUpperCase()}\n`
    }

    return catalog
}

function movieDetails(movie) {
    console.log(`\n--- ${movie.name.toUpperCase()} ---`)
    console.log(`Sinopse: ${movie.description}`)
    console.log(`Duração: ${movie.duration} min`)
    console.log(`\nAs sessões disponíveis são:\n[1] - 16h00 | [2] - 19h30 | [3] - 22h00`)
}

function movieCost(price, fullTicket, halfTicket) {
    return (price * fullTicket) + ((price/2)*halfTicket)
}

function listSnacks(data) {
    let menu = ""
    console.log("Confira nossas opções abaixo:")

    // Segue a mesma lógica de listMovies, mas percorrendo a lista de snacks
    for (let index = 0; index < data["snacks"].length; index++) {
        menu += `\n[${index+1}] ${data["snacks"][index].type} - R$${data["snacks"][index].price}\n`
        
    }

    return menu
}

function snacksCost(price, quantity) {
    return price * quantity
}

module.exports = { listMovies, movieDetails, movieCost, listSnacks, snacksCost }