/* classes */

class item {
    constructor(nome, qtd){
        this.nome = nome;
        this.qtd = qtd;
    }
}
/* variáveis globais */
const itens = [];
const camisa = new item("camisa", 8)
itens.push(camisa);

const form = document.querySelector("#novoItem");

/* funções */
const addItem = () =>{
    const nomeItem = document.querySelector("#nome").value;
    const qtdItem = parseInt(document.querySelector("#quantidade").value);
    const novoItem = new item(nomeItem, qtdItem);
    console.log(novoItem)
    itens.push(novoItem);
}

form.addEventListener("submit", (e) =>{
    e.preventDefault();
    addItem();
    console.log("funfou");
}
);


/* testes */
