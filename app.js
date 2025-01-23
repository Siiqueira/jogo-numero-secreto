/* ---------    JOGO DO NUMERO SECRETO     ----------*/
//Escolhendo os limites do nosso jogo
//Minimo, máximo e a lista para guardar os números sorteados
let listaNumerosSorteados = [];
let numeroMinimo = 1;
let numeroMaximo = 100;

// Criando uma variavel com o numero secreto
// Variavel que recebe o resultado de uma função.
let numeroSecreto = gerarNumeroAleatorio();
console.log('Número sorteado',numeroSecreto);

// variavel para armazenar a quantidade de tentativas
let tentativas = 1;
console.log('Números de tentativas',tentativas);

//Função para exibir o texto nos campos de H1 e p do HTML
// usando speech para narrar o jogo
function exibirTextoNaTela(tag,texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.4; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}
//Função para eximir as mensagens na tela do jogo
function exbirMensagemInicial(){
    exibirTextoNaTela('h1','Jogo do Número Secreto');
    exibirTextoNaTela('p',`Escolha um número entre 1 e 100:`);
}
//Função para testar botão de chute (acessando o (button) no HTML)
function verificarChute(){
    let chute = document.querySelector('input').value; // acessando o valor dentro do input 
    console.log(chute);
    // Condicional principal comparação do valor do chute e o numero secreto
    if(chute == numeroSecreto){
        exibirTextoNaTela('h1','Muito Bem, Você Acertou!');
        let palavraTentativa = tentativas == 1 ? 'tentativa':'tentativas';
        let mensagemTentativa = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}! `;
        exibirTextoNaTela('p', mensagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto){
            exibirTextoNaTela('p','Errou! o número secreto é MENOR');
        } else {
            exibirTextoNaTela('p','Errou! o número secreto é MAIOR');
        }
    }
    tentativas ++;
    limpaCampo(); //limpa o capo de input toda vez que um numero é chutado
};
//Função para criar um número aleatório
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroMaximo + 1 );
    let quantidadeDeNumerosEscolhidos = listaNumerosSorteados.length;
    if(quantidadeDeNumerosEscolhidos == numeroMaximo){
        listaNumerosSorteados = []; // limpa a lista de numeros escolhidos
    }
    if(listaNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio(); // Se o número escolhido estiver na lista de número sorteados, gera outro número
    } else {
        listaNumerosSorteados.push(numeroEscolhido);// adiciona o número na lista de numero sorteados
        console.log('Lista de números sorteados',listaNumerosSorteados);
        return numeroEscolhido;
    }
}
//Função limpa campo do imput automaticamente
function limpaCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}
//Função do botão novo jogo (reiniciar)
function reiniciarJogo() {
    exbirMensagemInicial();
    limpaCampo();
    tentativas = 1;
    numeroSecreto = gerarNumeroAleatorio(); //gerar um novo número
    console.log(`Número secreto é : ${numeroSecreto}`);
    document.getElementById('reiniciar').setAttribute('disabled',true); //Habilita o botão Novo Jogo
}
//Chamando a função
exbirMensagemInicial();