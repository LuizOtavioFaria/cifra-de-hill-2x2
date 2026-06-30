// =========================================================================
// 1. LÓGICA DO BACKGROUND DINÂMICO (SORTEIO DE IMAGENS)
// =========================================================================

// Aguarda todo o conteúdo da página (HTML) carregar antes de rodar o script
window.addEventListener('DOMContentLoaded', () => {
    // Array contendo links diretos de imagens em alta definição (Unsplash)
    const imagens = [
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1920",
        "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1920",
        "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=1920",
        "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?q=80&w=1920",
        "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=1920",
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1920",
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920",
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1920"
    ];
    
    // Sorteia um índice aleatório baseado no tamanho do array de imagens
    const imagemSorteada = imagens[Math.floor(Math.random() * imagens.length)];
    
    // Injeta a imagem sorteada diretamente no estilo de background do body do HTML
    document.body.style.backgroundImage = `url('${imagemSorteada}')`;
});


// =========================================================================
// 2. MATEMÁTICA E LÓGICA DA CIFRA DE HILL
// =========================================================================

/**
 * Função para calcular o Módulo Matemático Verdadeiro.
 * Garante que números negativos virem o equivalente positivo correto no espaço [0, 25].
 */
function mod(n, m) {
    return ((n % m) + m) % m;
}

/**
 * Captura os valores digitados nos inputs numéricos e monta a matriz de chave 2x2.
 * Retorna uma matriz no formato: [[k00, k01], [k10, k11]]
 */
function obterMatrizChave() {
    return [
        [parseInt(document.getElementById('k00').value) || 0, parseInt(document.getElementById('k01').value) || 0],
        [parseInt(document.getElementById('k10').value) || 0, parseInt(document.getElementById('k11').value) || 0]
    ];
}

/**
 * Algoritmo de Euclides para calcular o Máximo Divisor Comum (MDC).
 * Essencial para validar se o determinante possui inverso modular (MDC com 26 deve ser 1).
 */
function mdc(a, b) {
    while (b !== 0) {
        let t = b;
        b = a % b;
        a = t;
    }
    return a;
}

/**
 * Encontra o inverso modular de um número (determinante) em relação ao módulo 26.
 * Procura um número 'i' de 1 a 25 onde: (determinante * i) % 26 == 1
 */
function encontrarInversoModular(det) {
    det = mod(det, 26);
    for (let i = 1; i < 26; i++) {
        if (mod(det * i, 26) === 1) {
            return i; // Retorna o inverso multiplicativo correspondente
        }
    }
    return null; // Caso não exista inverso modular
}

/**
 * Inverte a matriz chave 2x2 para possibilitar a operação de decifragem.
 * Aplica a regra: Matriz Inversa = Inverso_do_Determinante * Matriz_Adjunta (mod 26)
 */
function inverterMatriz2x2(matriz) {
    let a = matriz[0][0];
    let b = matriz[0][1];
    let c = matriz[1][0];
    let d = matriz[1][1];

    // Calcula o determinante da matriz 2x2: (a*d - b*c)
    let det = (a * d) - (b * c);
    
    // Verifica se o determinante é coprimo com 26 (MDC deve ser igual a 1)
    if (mdc(mod(det, 26), 26) !== 1) {
        alert("Erro: O determinante da matriz chave (" + mod(det, 26) + ") não possui inverso modular mod 26. Escolha outra chave.");
        return null;
    }

    // Busca o inverso multiplicativo do determinante mod 26
    let invDet = encontrarInversoModular(det);
    if (invDet === null) return null;

    // MATRIZ ADJUNTA COM MULTIPLICAÇÃO DO INVERSO DO DETERMINANTE:
    // Troca 'a' com 'd' de lugar, inverte o sinal de 'b' e 'c', multiplicando por invDet
    let invMatriz = [
        [mod(d * invDet, 26), mod(-b * invDet, 26)],
        [mod(-c * invDet, 26), mod(a * invDet, 26)]
    ];

    return invMatriz;
}

/**
 * Trata a mensagem digitada pelo usuário: remove acentos/caracteres especiais,
 * transforma tudo em maiúsculo e, caso o tamanho seja ímpar, adiciona um 'X' no final
 * para fechar os blocos de pares (bigramas) exigidos pela matriz 2x2.
 */
function prepararTexto(txt) {
    txt = txt.toUpperCase().replace(/[^A-Z]/g, ""); // Remove espaços, números e símbolos
    if (txt.length % 2 !== 0) {
        txt += "X"; // Preenchimento obrigatório para fechar o último par 2x2
    }
    return txt;
}

/**
 * Função principal disparada pelos botões "Cifrar" e "Decifrar".
 * Controla o fluxo completo da criptografia.
 */
function processar(cifrar) {
    let inputMensagem = document.getElementById('texto'); // Captura o elemento do input
    let textoInput = inputMensagem.value;
    let txt = prepararTexto(textoInput);
    
    // Validação simples de segurança caso o campo de texto esteja vazio
    if (!txt) {
        document.getElementById('resultado').innerText = "Insira um texto válido.";
        return;
    }

    // Obtém a matriz chave digitada nos inputs
    let matrizChave = obterMatrizChave();
    
    // Se a operação solicitada for "Decifrar", altera a chave para a sua versão Inversa real
    if (!cifrar) {
        matrizChave = inverterMatriz2x2(matrizChave);
        if (!matrizChave) return; // Interrompe caso a matriz não possa ser invertida
    }

    let resultado = "";

    // Percorre o texto tratado de 2 em 2 caracteres (bigramas)
    for (let i = 0; i < txt.length; i += 2) {
        // Converte as duas letras do bloco em números de 0 a 25 (A=0, B=1, ..., Z=25)
        let v = [
            txt.charCodeAt(i) - 65,
            txt.charCodeAt(i + 1) - 65
        ];

        // Multiplicação de Matrizes aplicando o módulo matemático verdadeiro
        let resV = [
            mod(matrizChave[0][0] * v[0] + matrizChave[0][1] * v[1], 26),
            mod(matrizChave[1][0] * v[0] + matrizChave[1][1] * v[1], 26)
        ];

        // Converte os novos números resultantes de volta para caracteres ASCII (letras)
        resultado += String.fromCharCode(resV[0] + 65);
        resultado += String.fromCharCode(resV[1] + 65);
    }

    // Exibe a string final criptografada/descriptografada no painel de resultados do HTML
    document.getElementById('resultado').innerText = resultado;

    // Se você acabou de cifrar, o código atualiza o input de texto automaticamente
    // com o resultado cifrado para você poder clicar em decifrar logo em seguida!
    if (cifrar) {
        inputMensagem.value = resultado;
    }
}