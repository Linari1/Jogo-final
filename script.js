window.addEventListener('DOMContentLoaded', () => {
    const casas = Array.from(document.querySelectorAll('.casa'));
    const jogadoranunciado = document.querySelector('.anunciar-jogador');
    const botaoreiniciar = document.querySelector('#reset');
    const anunciador = document.querySelector('.anunciador');

    let tabuleiro = ['', '', '', '', '', '', '', '', ''];
    let jogadoratual = 'X'; 
    let jogocontinua = true;

    const jogadorX_v = 'jogadorx_v';
    const jogadorO_v = 'jogadoro_v';
    const empate = 'empate';


    /*
        Numeração do tabuleiro
        [0] [1] [2]
        [3] [4] [5]
        [6] [7] [8]
    */

   const condicoesdevitoria = [
       [0, 1, 2],
       [3, 4, 5],
       [6, 7, 8],
       [0, 3, 6],
       [1, 4, 7],
       [2, 5, 8],
       [0, 4, 8],
       [2, 4, 6]
   ];

   function validarresultado() {
       let rodadavencida = false;
       for (let i = 0; i <=7; i++) {
           const condicaodevitoria = condicoesdevitoria [i];
           const a = tabuleiro[condicaodevitoria[0]];
           const b = tabuleiro[condicaodevitoria[1]];
           const c = tabuleiro[condicaodevitoria[2]];
           if (a === '' || b === '' || c === ''){
               continue;
           }
            if (a === b && b === c) {
               rodadavencida = true;
               break;
           }
       }

    if (rodadavencida) {
           anunciar(jogadoratual === 'X' ? jogadorX_v : jogadorO_v);
           jogocontinua = false;
           return;
       }

    if(!tabuleiro.includes(''))
       anunciar(empate);
   }

   const anunciar = (type) =>{
       switch(type){
            case jogadorO_v:
                anunciador.innerHTML = 'Jogador <span class="jogadorO">O</span> venceu';
               break;
            case jogadorX_v:
                anunciador.innerHTML = 'Jogador <span class="jogadorX">X</span> venceu';
                break;
            case empate:
                anunciador.innerText = 'Empate :c';
       }
       anunciador.classList.remove('hide');
   };

   const validaracao = (casa) => {
        if (casa.innerText === 'X' || casa.innerText === 'O'){
            return false;
        }

        return true;
    };

   const atualizartabuleiro = (index) => {
       tabuleiro[index] = jogadoratual;
   }
   
   const alterarjogador = () => {
       jogadoranunciado.classList.remove(`jogador${jogadoratual}`);
       jogadoratual = jogadoratual === 'X' ? 'O' : 'X';
       jogadoranunciado.innerText = jogadoratual;
       jogadoranunciado.classList.add(`jogador${jogadoratual}`);
   }

   const acaodousuario = (casa, index) =>{
       if(validaracao(casa) && jogocontinua){
           casa.innerText = jogadoratual;
           casa.classList.add(`jogador${jogadoratual}`);
           atualizartabuleiro(index);
           validarresultado();
           alterarjogador();
       }
   }

   const reiniciartabuleiro = () => {
       tabuleiro = ['','','','','','','','','',];
       jogocontinua = true;
       anunciador.classList.add('hide');

       if(jogadoratual === 'O'){
           alterarjogador();
       }
       casas.forEach(casa =>{
           casa.innerText = '';
           casa.classList.remove('jogadorX');
           casa.classList.remove('jogadorO');
       });
   }
   
   casas.forEach( (casa, index) => {
        casa.addEventListener('click', () => acaodousuario(casa, index));
   });


    botaoreiniciar.addEventListener('click', reiniciartabuleiro);
});