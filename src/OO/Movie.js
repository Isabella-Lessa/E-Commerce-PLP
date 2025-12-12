const Product = require("./Product")

// A classe Movie Extende a classe de Product
class Movie extends Product {
    constructor(category, name, description, price, stock, genre, duration) {
        super(category, name, description, price, stock)
        this.genre = genre // ação, fantasia, ficção, comédia, etc..
        this.duration = duration // tempo em minutos
    }

    cost(quantity) {
        // Polimorfismo: sobrescrevemos o método para aceitar a lógica de Meia Entrada
        return (this.price * quantity)
    }
}

module.exports = Movie