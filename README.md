# 🔐 Cifra de Hill 2x2 — Criptografia e Álgebra Linear

Uma aplicação web interativa e minimalista que implementa a **Cifra de Hill 2x2**, demonstrando na prática conceitos fundamentais de Álgebra Linear, Teoria dos Números e criptografia simétrica clássica.

---

## 🚀 Sobre o Projeto

O objetivo deste projeto é tirar a matemática abstrata da sala de aula e trazê-la para o mundo real do desenvolvimento de software. A aplicação permite cifrar e decifrar blocos de texto (bigramas) utilizando uma matriz chave de tamanho $2 \times 2$ sobre o alfabeto latino modular ($\mathbb{Z}_{26}$).

O projeto conta com um design moderno em **Dark Glassmorphism**, interface responsiva, alinhamento simétrico e planos de fundo dinâmicos que mudam de forma rotativa a cada carregamento da página.

---

## 🧠 Conceitos Matemáticos Aplicados

Para que o sistema funcione com precisão científica, foram implementados os seguintes pilares algébricos:

*   **Multiplicação de Matrizes:** O texto é dividido em vetores de tamanho 2 e multiplicado linearmente pela matriz chave escolhida.
*   **Determinante e Matriz Adjunta:** Utilizados no cálculo da matriz inversa para possibilitar a operação de decifragem.
*   **Algoritmo de Euclides (MDC):** Validação em tempo real para garantir que o determinante da matriz chave seja coprimo com 26 ($\text{mdc}(\text{det}, 26) = 1$), pré-requisito obrigatório para a existência do inverso modular.
*   **Módulo Matemático Verdadeiro:** Correção da aritmética de números negativos gerados pela matriz adjunta, substituindo o comportamento padrão do operador `%` do JavaScript por uma função pura de módulo cíclico.

---

## 🛠️ Tecnologias Utilizadas

*   **HTML5:** Estrutura semântica da aplicação.
*   **CSS3:** Estilização avançada com variáveis, Grid Layout, Flexbox e efeitos de desfoque (`backdrop-filter`).
*   **JavaScript (ES6+):** Lógica matemática modular, manipulação de strings (Regex/ASCII) e controle do background randômico.

---

## 📂 Estrutura de Arquivos

```text
├── index.html   # Estrutura e marcação da página
├── style.css    # Identidade visual escura e estilização responsiva
└── script.js    # Funções algébricas e automação da interface