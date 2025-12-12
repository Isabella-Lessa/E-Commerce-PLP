const readline = require('readline');
const data = require('./db/products.json');

const Cart = require('./src/OO/Cart');
const CartItem = require('./src/OO/CartItem');
const Snack = require('./src/OO/Snack');
const Movie = require('./src/OO/Movie');
const { CreditCardPayment, PixPayment } = require('./src/OO/Payment');

const { filterByCriteria, isMovie, formatCatalogView } = require('./src/functions/catalogOperations');

const movies = data.movies.map(m => new Movie(
    m.category, 
    m.name, 
    m.description, 
    m.price, 
    m.in_stock || m.stock, // O JSON tem variações (in_stock/stock), isso resolve
    m.genre, 
    m.duration
));

const snacks = data.snacks.map(s => new Snack(
    s.category, 
    s.type, // Passamos o 'type' (Pipoca) como 'name' para a classe pai
    "Lanche delicioso do cinema", // Valor padrão para descrição
    s.price, 
    100, // Estoque padrão
    s.type
));

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const myCart = new Cart();

// --- Funções Auxiliares de Validação ---
function isValidNumber(input, maxOption) {
    const number = Number(input);
    // Verifica se é NaN ou se está fora do intervalo permitido
    return !isNaN(number) && number >= 0 && number <= maxOption;
}

// --- Fluxo Principal ---

function showMainMenu() {
    console.log('\n--- CINE MULTI-PARADIGMA ---');
    rl.question('[1] Comprar Ingresso\n[2] Consultar Catálogo (Filtro Funcional)\n[0] Sair\nOpção: ', (option) => {
        const opt = Number(option);
        
        switch (opt) {
            case 1:
                listMovies();
                break;
            case 2:
                showFilteredCatalog();
                break;
            case 0:
                console.log("Saindo...");
                rl.close();
                break;
            default:
                console.log(">> Opção inválida. Tente novamente.");
                showMainMenu();
        }
    });
}

function showFilteredCatalog() {
    const onlyMovies = filterByCriteria(movies, isMovie);
    const formattedView = formatCatalogView(onlyMovies);
    
    console.log("\n--- Filmes Disponíveis (Filtrado Funcionalmente) ---");
    formattedView.forEach(item => console.log(item.display));
    
    showMainMenu(); 
}

function listMovies() {
    const menu = movies.map((m, i) => `[${i + 1}] - ${m.name}`).join('\n');
    
    rl.question(`\n${menu}\nEscolha o filme ou 0 para voltar: `, (input) => {
        // Validação rigorosa
        if (!isValidNumber(input, movies.length)) {
            console.log(">> Opção inválida. Digite um número da lista.");
            return listMovies(); // Recursividade: pergunta de novo
        }

        const index = Number(input) - 1;
        if (index === -1) return showMainMenu(); // Opção 0 volta pro menu

        const selectedMovie = movies[index];
        console.log(`\nSelecionado: ${selectedMovie.name} | R$ ${selectedMovie.price.toFixed(2)}`);
        selectSession(selectedMovie);
    });
}

function selectSession(movie) {
    rl.question('\nSessões: [1] 15h00 [2] 18h00 [3] 21h00\nEscolha: ', (opt) => {
        const sessions = { 1: '15h00', 2: '18h00', 3: '21h00' };
        
        // Validação de chave do objeto
        if (!sessions[opt]) {
            console.log(">> Sessão inválida.");
            return selectSession(movie);
        }
        
        selectTickets(movie, sessions[opt]);
    });
}

function selectTickets(movie, session) {
    rl.question(`Quantos ingressos para a sessão das ${session}? `, (qtd) => {
        const quantity = Number(qtd);
        
        // Validar se é número positivo
        if (isNaN(quantity) || quantity <= 0) {
            console.log(">> Quantidade inválida.");
            return selectTickets(movie, session);
        }

        myCart.add(new CartItem(movie, quantity));
        offerSnacks(); 
    });
}

function offerSnacks() {
    rl.question('\nDeseja adicionar snacks? (S/N): ', (ans) => {
        const resposta = ans.toUpperCase();
        
        if (resposta === 'S') {
            listSnacks();
        } else if (resposta === 'N') {
            checkout();
        } else {
            console.log(">> Responda com S ou N.");
            offerSnacks(); // Pergunta de novo se digitar errado
        }
    });
}

function listSnacks() {
    const menu = snacks.map((s, i) => `[${i + 1}] - ${s.name} (R$ ${s.price.toFixed(2)})`).join('\n');
    
    rl.question(`\n${menu}\nEscolha o snack ou 0 para finalizar: `, (input) => {
        
        // Validação no menu de snacks
        if (!isValidNumber(input, snacks.length)) {
            console.log(">> Opção inválida.");
            return listSnacks();
        }

        const index = Number(input) - 1;

        // Se digitou 0, vai para o checkout (finalizar)
        if (index === -1) {
            return checkout();
        }

        const selectedSnack = snacks[index];
        
        // Pergunta a quantidade do snack selecionado
        rl.question(`Quantas unidades de ${selectedSnack.name}? `, (qtd) => {
            const quantity = Number(qtd);
            
            if (isNaN(quantity) || quantity <= 0) {
                console.log(">> Quantidade inválida.");
                return listSnacks();
            }

            myCart.add(new CartItem(selectedSnack, quantity));
            console.log(`${quantity}x ${selectedSnack.name} adicionado!`);
            
            // Pergunta se quer MAIS snacks
            offerSnacks();
        });
    });
}

function askForCreditCardInstallments(total) {
    // Definimos um máximo para a validação
    const maxInstallments = 12;
    
    rl.question(`\nEm quantas parcelas (1 a ${maxInstallments})? `, (input) => {
        const installments = Number(input);

        // --- Estruturado: Validação de Condição ---
        if (isNaN(installments) || installments < 1 || installments > maxInstallments) {
            console.log(`>> Número de parcelas inválido. Mínimo 1, Máximo ${maxInstallments}.`);
            return askForCreditCardInstallments(total); // Recursividade para tentar de novo
        }
        
        const paymentProcessor = new CreditCardPayment(total, installments);

        try {
            // --- OO: Chamada Polimórfica ---
            paymentProcessor.process();
            console.log("Compra finalizada com sucesso!");
            rl.close();
        } catch (e) {
            console.log("Erro no processamento: " + e.message);
            rl.close();
        }
    });
}

function checkout() {
    const total = parseFloat(myCart.calculateTotal());
    
    if (total === 0) {
        console.log("Carrinho vazio.");
        return showMainMenu();
    }

    console.log(`\n=== PAGAMENTO ===\nTotal: R$ ${total.toFixed(2)}`);
    rl.question('[1] Cartão de Crédito\n[2] Pix\nEscolha: ', (opt) => {
        
        // --- Estruturado: Uso do Switch/Case (Obrigatório no requisito) ---
        switch (opt) {
            case '1':
                // Se for Cartão, chama a função para perguntar as parcelas
                return askForCreditCardInstallments(total); 
            
            case '2':
                // Se for Pix, cria o objeto e processa imediatamente
                const paymentProcessor = new PixPayment(total);
                try {
                    // --- OO: Chamada Polimórfica ---
                    paymentProcessor.process(); 
                    console.log("Compra finalizada com sucesso!");
                    rl.close();
                } catch (e) {
                    console.log("Erro no processamento: " + e.message);
                    rl.close();
                }
                break; // Sai do switch
            
            default:
                console.log(">> Opção de pagamento inválida.");
                return checkout(); // Tenta o pagamento de novo
        }
    });
}

// Inicia o programa
showMainMenu();