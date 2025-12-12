// A classe Movie Extende a classe de Product
class Movie extends Product {
    constructor(category, name, description, price, stock, genre, duration) {
        super(category, name, description, price, stock)
        this.genre = genre // ação, fantasia, ficção, comédia, etc..
        this.duration = duration // tempo em minutos
    }

    cost(ticket_type, quantity) {
        // Polimorfismo: sobrescrevemos o método para aceitar a lógica de Meia Entrada
        return ticket_type === 'INTEIRA' ? (this.price * quantity) : ((this.price/2) * quantity)
    }
}