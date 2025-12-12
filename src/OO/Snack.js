class Snack extends Product {
    constructor(category, name, description, price, stock, type, size,) {
        super(category, name, description, price, stock)
        this.type = type // Pode ser pipoca, refrigerante ou chocolate
        this.size = size // Pode ser P, M ou G
    }

    cost(quantity) {
        return quantity * this.price
    }
}