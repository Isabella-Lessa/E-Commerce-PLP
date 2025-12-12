const Product = require('./Product')

class Snack extends Product {
    constructor(category, name, description, price, stock, type, size,) {
        super(category, name, description, price, stock)
        this.type = type // Pode ser pipoca, refrigerante ou chocolate
    }

    cost(quantity) {
        return quantity * this.price
    }
}

module.exports = Snack