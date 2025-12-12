# 🎬 CINE MULTI-PARADIGMA

Este projeto é uma simulação de um sistema de vendas de ingressos e snacks desenvolvido em Node.js com o objetivo principal de demonstrar a aplicação prática de múltiplos paradigmas de programação: **Orientado a Objetos (OO)**, **Funcional** e **Estruturado**.

## 🚀 Como Executar

1.  **Instalação de Dependências:**
    ```bash
    npm install
    ```
2.  **Execução:**
    ```bash
    node index.js
    ```
3.  **Interação:**
    O programa será executado no terminal, guie-se pelas opções [1], [2], [0].

## 🧩 Estrutura do Projeto

O código está organizado em módulos para isolar as responsabilidades de cada paradigma:

| Arquivo/Pasta      | Paradigma Principal     | Objetivo                                                                                                                        |
| :----------------- | :---------------------- | :------------------------------------------------------------------------------------------------------------------------------ |
| `index.js`         | **Estruturado**         | Contém o fluxo de controle principal (menus, `switch/case`, `readline`) e a inicialização de dados.                             |
| `src/OO/`          | **Orientado a Objetos** | Contém as classes que modelam o domínio: `Product`, `Movie`, `Snack`, `Cart`, `Payment`.                                        |
| `src/functions/`   | **Funcional**           | Contém funções puras e de ordem superior (`filterByCriteria`, `isMovie`, etc.) para manipulação e consulta de dados (catálogo). |
| `db/products.json` | **Dados**               | Fonte de dados do catálogo de filmes e snacks.                                                                                  |

## ✨ Conceitos Aplicados

### 1. Paradigma Orientado a Objetos (OO)

- **Herança:** `Movie` e `Snack` herdam da classe base `Product`.
- **Encapsulamento:** A classe `Cart` gerencia seus itens internamente, expondo apenas `add` e `calculateTotal`.
- **Polimorfismo:**
  - Método `cost()` é implementado de forma diferente em `Movie` e `Snack`.
  - O método `process()` é implementado por `CreditCardPayment` (com cálculo de juros e parcelas) e `PixPayment` (sem juros), herdando de `Payment`.

### 2. Paradigma Funcional

- **Funções de Ordem Superior:** A função `filterByCriteria` recebe uma função de critério (`isMovie`) como argumento.
- **Imutabilidade / Funções Puras:** As funções em `catalogOperations.js` não possuem efeitos colaterais e transformam dados usando `map`, `filter` e `reduce`.
- **Map & Reduce:** Usados para transformar dados de entrada (`map`) e calcular o total do carrinho (`reduce`).

### 3. Paradigma Estruturado

- **Fluxo de Controle:** Utilização extensiva de `switch/case` e `if/else` para direcionar o usuário nos menus.
- **Modularização:** O uso de `require()` em Node.js para dividir o código em pequenos arquivos lógicos.
- **Recursividade:** Usada em validações (ex: `askForCreditCardInstallments`) para forçar a entrada correta de dados pelo usuário.
