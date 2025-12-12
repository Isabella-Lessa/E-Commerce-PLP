class Snack extends Product {
    constructor(category, name, description, price, stock, type, size,) {
        super(category, name, description, price, stock)
        this.type = type // Pode ser pipoca, refrigerante ou chocolate
        this.size = size // Pode ser P, M ou G
    }

    cost(quantity) {
        if (this.size.toUpperCase() === "P") {
            return quantity * (this.price * 0.95) // O produto de tamanho P tem 05% de desconto
        } else if (this.size.toUpperCase() === "G") {
            return quantity * (this.price * 1.1) // O produto de tamanho G é 10% mais caro
        } else {
            return quantity * this.price
        }
    }
}