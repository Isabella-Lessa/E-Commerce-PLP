class Cart {
    constructor (items) {
        this.items = [] // É uma lista que contêm product (do tipo Movie ou Snack), quantidade, ticetType
    }

    add(item) {
        this.items.push(item)
    }

    calculateTotal() {
        const total = this.items.reduce((acc, item) => acc + item.product.cost(item.quantity), 0)
        return total
    }
}

module.exports = Cart