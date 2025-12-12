
// A função recebe o objeto completo de dados
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

module.exports = { listMovies, movieDetails, movieCost }