class Product {
    constructor(category, name, description, price, stock) {
        this.category = category
        this.name = name
        this.description = description
        this.price = price
        this.stock = stock
    }

    cost() {
        return this.price
    }
}

module.exports = Product