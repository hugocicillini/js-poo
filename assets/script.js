class Produtos {
    constructor() {
        this.idProduto = 1;
        this.arrayProdutos = [];
        this.isEmpty();
        this.editId = null;

    }

    isEmpty() {
        if (this.arrayProdutos.length === 0) {
            const tr = tbody.insertRow();
            const tdEmpty = tr.insertCell();

            tdEmpty.innerText = "Não há produtos!";
            tdEmpty.colSpan = "4";
            tdEmpty.style.padding = ".2rem";
            tdEmpty.style.textAlign = "center";
        }
    }

    Salvar() {
        const Produto = this.lerDados();

        if (this.validaCampos(Produto)) {
            if (this.editId == null) {
                this.Adicionar(Produto)
            }
            else {
                this.Atualizar(this.editId, Produto);
            }
        }

        this.listaTabela();
        this.Cancelar();
    }

    listaTabela() {
        const tbody = document.getElementById("tbody");
        tbody.innerText = '';

        for (let i = 0; i < this.arrayProdutos.length; i++) {
            const tr = tbody.insertRow();

            const tdId = tr.insertCell();
            const tdProduto = tr.insertCell();
            const tdValor = tr.insertCell();
            const tdAcoes = tr.insertCell();

            tdId.innerText = this.arrayProdutos[i].idProduto;
            tdProduto.innerText = this.arrayProdutos[i].nomeProduto;
            tdValor.innerText = this.arrayProdutos[i].valorProduto;

            const iconEdit = document.createElement('i');
            iconEdit.classList.add('bx', 'bxs-edit', 'bx-sm')
            iconEdit.style.padding = ".1rem .2rem";
            iconEdit.style.marginRight = ".5rem";
            iconEdit.style.cursor = "pointer";
            iconEdit.setAttribute("onclick", "obj_Produtos.preEdicao(" + JSON.stringify(this.arrayProdutos[i]) + ")");
            tdAcoes.appendChild(iconEdit);

            const iconRemove = document.createElement('i');
            iconRemove.classList.add('bx', 'bxs-trash', 'bx-sm')
            iconRemove.style.padding = ".1rem .2rem";
            iconRemove.style.cursor = "pointer";
            iconRemove.setAttribute("onclick", "obj_Produtos.Deletar(" + this.arrayProdutos[i].idProduto + ", '" + this.arrayProdutos[i].nomeProduto + "')");
            tdAcoes.appendChild(iconRemove);
        }

        this.isEmpty();
    }

    Adicionar(Produto) {
        this.arrayProdutos.push(Produto);
        this.idProduto++;
    }

    Atualizar(idProduto, Produto) {
        for (let i = 0; i < this.arrayProdutos.length; i++) {
            if (this.arrayProdutos[i].idProduto == idProduto) {
                this.arrayProdutos[i].nomeProduto = Produto.nomeProduto
                this.arrayProdutos[i].valorProduto = Produto.valorProduto
            }
        }
    }

    preEdicao(dados) {
        this.editId = dados.idProduto;

        document.getElementById("produto").value = dados.nomeProduto
        document.getElementById("valor").value = dados.valorProduto

        document.getElementById("btnSalvar").innerText = "Atualizar"
    }

    lerDados() {
        const Produto = {}

        Produto.idProduto = this.idProduto;
        Produto.nomeProduto = document.getElementById("produto").value;
        Produto.valorProduto = document.getElementById("valor").value

        return Produto;
    }

    validaCampos(Produto) {
        let Mensagem = '';
        if (Produto.nomeProduto == "") {
            Mensagem += "Informe o Nome do Produto! \n"
        }

        if (Produto.valorProduto == "" || isNaN(Number(Produto.valorProduto.replace(',', '.')))) {
            Mensagem += "Informe um Preço Válido para o Produto! \n"
        }

        if (Mensagem != '') {
            alert(Mensagem);
            return false
        }

        return true
    }

    Cancelar() {
        document.getElementById("produto").value = '';
        document.getElementById("valor").value = '';

        document.getElementById("btnSalvar").innerText = "Salvar"
        this.editId = null;
    }

    Deletar(idProduto, nomeProduto) {
        if (confirm("Deseja deletar o produto: " + nomeProduto + "?")) {
            const tbody = document.getElementById("tbody");

            for (let i = 0; i < this.arrayProdutos.length; i++) {
                if (this.arrayProdutos[i].idProduto == idProduto) {
                    this.arrayProdutos.splice(i, 1);
                    tbody.deleteRow(i);
                }
            }
        }
        this.isEmpty();
    }
}

const obj_Produtos = new Produtos();