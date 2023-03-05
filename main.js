/* classes */

class Item {
    constructor(nome, qtd) {
        this.nome = nome;
        this.qtd = qtd;
    }
}
/* variáveis globais */
const mochila = [];
/* teste */
/* teste */
const form = document.querySelector("#novoItem");

const lista = document.querySelector(".lista");

/* funções */
const addItem = (nome, qtd) => {
    if(nome == '' || qtd == ''){
        console.log("nenhum item adicionado à mochila");
    }else{
        const novoItem = new Item(nome, qtd);
        mochila.push(novoItem);
        addLista(novoItem);
    }
}


const removeItem = (cancelar,item) =>{
    console.log(cancelar.parentElement);
    lista.removeChild(cancelar.parentElement);
    const removerDaMochila = mochila.indexOf(item);
    mochila.splice(removerDaMochila,1);
}

const addLista = (item) =>{
    const novoListItem = document.createElement("li");
    const novoStrongNumber = document.createElement("strong");
    const cancelar = document.createElement("button");
    cancelar.classList.add("cancelar");
    cancelar.type = "button";
    cancelar.textContent = "x";
    cancelar.onclick = () => removeItem(cancelar,item);
    novoStrongNumber.textContent = `${item.qtd}`;
    novoListItem.classList.add("item");
    novoListItem.append(novoStrongNumber);
    novoListItem.insertAdjacentText("beforeend", item.nome);
    novoListItem.append(cancelar);
    lista.append(novoListItem);
    localStorage.setItem("mochila", JSON.stringify(mochila));
}

const loadLista = () =>{
    const guardados = JSON.parse(localStorage.mochila);
    console.log(guardados)
    for (let i in guardados){
        const novoItem = guardados[i];
        mochila.push(new Item(novoItem.nome, novoItem.qtd));
    }
    mochila.forEach((item)=>{
        addLista(item);
    })
}

const clearForm = () => {
    document.querySelector("#nome").value = '';
    document.querySelector("#quantidade").value = '';
}

form.addEventListener("submit", (e) => {
    
    e.preventDefault();
    const nomeItem = document.querySelector("#nome").value;
    const qtdItem = parseInt(document.querySelector("#quantidade").value);
    addItem(nomeItem, qtdItem);
    clearForm();
});

loadLista();