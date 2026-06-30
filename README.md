# 🔐 Cifra de Hill 2x2

Uma aplicação web interativa e minimalista que transforma conceitos abstratos de **Álgebra Linear** e **Criptografia** em uma ferramenta prática de segurança.

---

## ✨ Funcionalidades Principais

*   **Cifragem e Decifragem Automática:** O sistema atualiza o campo de texto sozinho após cifrar, permitindo descriptografar com um único clique.
*   **Tratamento de Texto Inteligente:** Remove caracteres especiais, padroniza para maiúsculas e adiciona preenchimento para blocos pares (`bigramas`).
*   **Segurança com Validação Algorítmica:** Impede o uso de chaves inválidas calculando o MDC em tempo real.
*   **Interface Fluida:** Design moderno com efeito Glassmorphism e planos de fundo dinâmicos que mudam a cada acesso.

---

## 🛠️ Tecnologias Utilizadas

*   **HTML5** — Estrutura semântica do app.
*   **CSS3** — Grid Layout, Flexbox e efeitos visuais translúcidos (`backdrop-filter`).
*   **JavaScript (ES6+)** — Manipulação de strings, lógica de matrizes e automação da interface.

---

## 🧠 Desafios Matemáticos Resolvidos

1.  **Módulo Matemático Verdadeiro:** O operador `%` padrão do JavaScript falha com números negativos (ex: `-3 % 26` resulta em `-3`). Foi implementada uma função cíclica pura para garantir o retorno positivo correto (`23`), crucial para a decifragem.
2.  **Inversão de Matrizes:** Implementação real da estrutura da Matriz Adjunta multiplicada pelo Inverso Modular do Determinante.
3.  **Algoritmo de Euclides:** Validação exata para checar se $\text{mdc}(\text{det}, 26) = 1$, critério obrigatório para a existência da chave inversa.

---

## 📂 Estrutura do Projeto

*   `index.html` — Interface e inputs da aplicação.
*   `style.css` — Estilização moderna e responsiva.
*   `script.js` — Core matemático da Cifra de Hill e controle de UI.

---

## 🚀 Como Testar

O projeto está hospedado e rodando diretamente no **GitHub Pages**! 

🔗 **[Acesse o sistema clicando aqui](https://luizotaviofaria.github.io/cifra-de-hill-2x2/)**