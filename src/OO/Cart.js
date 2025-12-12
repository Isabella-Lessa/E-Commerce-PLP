class Cart {
    constructor () {
        this.items = [] // É uma lista que contêm product (do tipo Movie ou Snack), quantidade, ticetType
    }

    add(item) {
        this.items.push(item)
    }

    calculateTotal() {
        const total = this.items.reduce((acc, item) => acc + item.product.cost(item.quantity), 0)
        return total.toFixed(2)
    }

    // Polimorfismo: item.product.cost é um método que varia conforme o tipo do produto

    // Se o item for um Snack: Ele executa a conta simples: Preço x Quantidade.
    // Se o item for um Movie: Ele executa a lógica dele (que no futuro poderia incluir regra de meia-entrada, dia da semana, etc).
}

module.exports = Cart