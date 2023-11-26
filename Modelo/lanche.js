import LancheDAO from "../Persistencia/lancheDAO.js";

export default class Lanche{
    #codigo;
    #descricao;
    #sabor;
    #valor;
    #urlImagem;

    constructor(codigo, descricao, sabor, valor, urlImagem){
        this.#codigo = codigo;
        this.#descricao = descricao;
        this.#sabor = sabor;
        this.#valor = valor;
        this.#urlImagem = urlImagem;
    }

    get codigo(){
        return this.#codigo;
    }

    set codigo(novoCodigo){
        this.#codigo = novoCodigo;
    }

    get descricao(){
        return this.#descricao;
    }

    set descricao(novaDescricao){
        this.#descricao = novaDescricao;
    }

    get sabor(){
        return this.#sabor;
    }

    set sabor(novoSabor){
        this.#sabor = novoSabor;
    }

    get valor(){
        return this.#valor;
    }

    set valor(novoValor){
        this.#valor = novoValor;
    }

    get urlImagem(){
        return this.#urlImagem;
    }

    set urlImagem(novaUrl){
        this.#urlImagem = novaUrl;
    }

    toJSON(){
        return {
            'codigo': this.#codigo,
            'descricao': this.#descricao,
            'sabor': this.#sabor,
            'valor': this.#valor,
            'urlImagem': this.#urlImagem,
        }
    }

    async gravar(){
        const lancheDAO = new LancheDAO();
        await lancheDAO.gravar(this);
    }

    async atualizar(){
        const lancheDAO = new LancheDAO();
        await lancheDAO.atualizar(this);
    }

    async excluir(){
        const lancheDAO = new LancheDAO();
        await lancheDAO.excluir(this);
    }

    async consultar(){
        const lancheDAO = new LancheDAO();
        return await lancheDAO.consultar();
    }

}