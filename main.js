/* classes */

class item {
    constructor(nome, qtd) {
        this.nome = nome;
        this.qtd = qtd;
    }
}
/* variáveis globais */
const mochila = [];

const form = document.querySelector("#novoItem");

const lista = document.querySelector(".lista")
console.log(lista)

/* funções */
const addItem = () => {
    const nomeItem = document.querySelector("#nome").value;
    const qtdItem = parseInt(document.querySelector("#quantidade").value);

    if(nomeItem == '' || qtdItem == ''){
        console.log("nenhum item adicionado à mochila");
    }else{
        const novoItem = new item(nomeItem, qtdItem);
        mochila.push(novoItem);
        addLista(novoItem);
    }
}

const addLista = (item) =>{
    const novoListItem = document.createElement("li");
    const novoStrongNumber = document.createElement("strong");
    novoStrongNumber.textContent = `${item.qtd}`;
    novoListItem.classList.add("item");
    novoListItem.append(novoStrongNumber);
    novoListItem.insertAdjacentText("beforeend", item.nome);
    lista.append(novoListItem);
}

const clearForm = () => {
    document.querySelector("#nome").value = '';
    document.querySelector("#quantidade").value = '';
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    addItem();
    clearForm();
});