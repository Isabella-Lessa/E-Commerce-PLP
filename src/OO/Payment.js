class Payment {
    constructor(value) {
        this.value = value;
    }

    // Método polimórfico - deve ser sobrescrito
    process() {
        throw new Error("O método process() deve ser implementado pelas subclasses.");
    }
}

class CreditCardPayment extends Payment {
    constructor(value, installments = 1) { // Adicionamos 'installments' (parcelas)
        super(value); // O super chama o construtor da classe pai (Payment)
        this.installments = installments;
        this.feeRate = 0.05; // 5% de juros se parcelar acima de 1x
    }

    calculateTotalWithFees() {
        if (this.installments > 1) {
            // Regra simples: 5% de juros sobre o valor total se parcelado
            return this.value * (1 + this.feeRate);
        }
        return this.value;
    }

    // Polimorfismo: Sobrescreve o método process()
    process() {
        const finalValue = this.calculateTotalWithFees();
        const valuePerInstallment = finalValue / this.installments;
        
        console.log(`\n--- Pagamento no Cartão de Crédito ---`);
        console.log(`Valor Original: R$ ${this.value.toFixed(2)}`);

        if (this.installments > 1) {
            console.log(`Taxa de Juros (5%): R$ ${(finalValue - this.value).toFixed(2)}`);
            console.log(`Valor Final: R$ ${finalValue.toFixed(2)}`);
        }
        
        console.log(`Processando em ${this.installments}x de R$ ${valuePerInstallment.toFixed(2)}...`);
        console.log(`Pagamento APROVADO.`);
        
        return true;
    }
}

class PixPayment extends Payment {
    // Polimorfismo: Sobrescreve o método process()
    process() {
        console.log(`\n--- Pagamento via Pix ---`);
        console.log(`Gerando código Pix para R$ ${this.value.toFixed(2)}...`);
        console.log(`Pagamento CONFIRMADO!`);
        return true;
    }
}

module.exports = { Payment, CreditCardPayment, PixPayment };