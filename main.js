/* classes */

class Item {
    constructor(nome, qtd) {
        this.nome = nome.toLowerCase();
        this.qtd = qtd;
    }
    getNome (){
        return this.nome;
    }
    addQtd (add){
        this.qtd += add;
    }
}
/* variáveis globais */
const mochila = [];
const form = document.querySelector("#novoItem");

const lista = document.querySelector(".lista");

/* funções */
const addItem = (nome, qtd) => {
    if(nome == '' || qtd == ''){
        console.log("nenhum item adicionado à mochila");
    }else{
        const confNome = nome.toLowerCase();
        if(verificaNome(confNome)){
            const qtdAtual = somaQtd(confNome, qtd);
            atualizaElemento(confNome, qtdAtual);
        }else{
            const novoItem = new Item(confNome, qtd);
            mochila.push(novoItem);
            criaElemento(novoItem);
        }
    }
}

const verificaNome = (nome) => {
    let temNome = false;
    mochila.forEach((item)=>{
        item.getNome() == nome ? temNome = true: temNome = false;
    })
    return temNome;
}

const somaQtd = (nome, qtd) =>{
    let qtdAtual = 0
    mochila.forEach((item)=>{
        if(item.getNome() == nome){
            item.addQtd(qtd);
            localStorage.setItem("mochila", JSON.stringify(mochila));
            qtdAtual = item.qtd;
        }
    })
    return qtdAtual;
}

const removeItem = (cancelar,item) =>{
    console.log(cancelar.parentElement);
    lista.removeChild(cancelar.parentElement);
    const removerDaMochila = mochila.indexOf(item);
    mochila.splice(removerDaMochila,1);
    localStorage.setItem("mochila", JSON.stringify(mochila));
}

const criaElemento = (item) =>{
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
    novoListItem.innerHTML += item.nome;
    novoListItem.append(cancelar);
    lista.append(novoListItem);
    localStorage.setItem("mochila", JSON.stringify(mochila));
}

const atualizaElemento = (nome, qtd) =>{
    const listaLi = lista.querySelectorAll(".item")
    listaLi.forEach((li)=>{
        const nomeLi = li.querySelector("strong").nextSibling.textContent;
        if(nomeLi == nome){
            li.querySelector("strong").innerText = qtd; 
        }
    })
}

const loadLista = () =>{
    const guardados = JSON.parse(localStorage.mochila);
    for (let i in guardados){
        const novoItem = guardados[i];
        addItem(novoItem.nome, novoItem.qtd);
    }
}

const clearForm = () => {
    document.querySelector("#nome").value = '';
    document.querySelector("#quantidade").value = '';
}

/* funções e métodos chamados ao carregar a página */

form.addEventListener("submit", (e) => {
    
    e.preventDefault();
    const nomeItem = document.querySelector("#nome").value;
    const qtdItem = parseInt(document.querySelector("#quantidade").value);
    addItem(nomeItem, qtdItem);
    clearForm();
});

loadLista();