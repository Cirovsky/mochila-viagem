/* classes */

class Item {
    constructor(nome, qtd, id) {
        this.nome = nome.toLowerCase();
        this.qtd = qtd;
        this.id = id;
    }
    getNome() {
        return this.nome;
    }
    add(add) {
        this.qtd += add;
    }
}
/* variáveis globais */
const mochila = [];
const form = document.querySelector("#novoItem");

const lista = document.querySelector(".lista");

/* funções */
const addItem = (nome, qtd) => {
    if (nome == '' || qtd == '') {
        console.log("nenhum item adicionado à mochila");
    } else {
        const confNome = nome.toLowerCase();
        let existe = undefined;
        if (mochila.length > 0) {
            existe = mochila.find(item => {
            return item.nome == nome
            });
            console.log("existe?",existe);
        }
        if(existe){
            existe.add(qtd);
            atualizaElemento(existe.id);
        }else {
            const novoItem = new Item(confNome, qtd, mochila.length);
            mochila.push(novoItem);
            criaElemento(novoItem);
        }
    }
}

const somaQtd = (nome, qtd) => {
    let id = 0
    mochila.forEach((item) => {
        if (item.getNome() == nome) {
            item.add(qtd);
            localStorage.setItem("mochila", JSON.stringify(mochila));
            id = item.id;
        }
    })
    return id;
}

const removeItem = (cancelar, item) => {
    lista.removeChild(cancelar.parentElement);
    const removerDaMochila = mochila.indexOf(item);
    mochila.splice(removerDaMochila, 1);
    localStorage.setItem("mochila", JSON.stringify(mochila));
}

const criaElemento = (item) => {
    const novoListItem = document.createElement("li");
    const novoStrongNumber = document.createElement("strong");
    const cancelar = document.createElement("button");
    cancelar.classList.add("cancelar");
    cancelar.type = "button";
    cancelar.textContent = "x";
    cancelar.onclick = () => removeItem(cancelar, item);
    novoStrongNumber.textContent = `${item.qtd}`;
    novoListItem.classList.add("item");
    novoStrongNumber.dataset.id = item.id;
    novoListItem.append(novoStrongNumber);
    novoListItem.innerHTML += item.nome;
    novoListItem.append(cancelar);
    lista.append(novoListItem);
    localStorage.setItem("mochila", JSON.stringify(mochila));
}

const atualizaElemento = (id) => {
    const li = document.querySelector(`[data-id='${id}']`);
    li.innerHTML = mochila[id].qtd;
}

const loadLista = () => {
    const guardados = JSON.parse(localStorage.mochila);
    for (let i in guardados) {
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