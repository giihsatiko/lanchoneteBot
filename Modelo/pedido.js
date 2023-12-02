import PedidoDAO from "../Persistencia/pedidoDAO.js";

export default class Pedido {
  #id;
  #dataPedido;
  #itensPedidos;

  constructor(id = 0, dataPedido = "", itensPedidos = []) {
    this.#id = id;
    this.#dataPedido = dataPedido;
    this.#itensPedidos = itensPedidos;
  }

  get id() {
    return this.#id;
  }
  set id(novoId) {
    this.#id = novoId;
  }

  get dataPedido() {
    return this.#dataPedido;
  }
  set dataPedido(novaData) {
    this.#dataPedido = novaData;
  }

  get itensPedidos() {
    return this.#itensPedidos;
  }
  set itensPedidos(novosItens) {
    this.#itensPedidos = novosItens;
  }

  toJSON() {
    return {
      'id': this.#id,
      'dataPedido': this.#dataPedido,
      'itensPedidos': this.#itensPedidos,
    };
  }

  async gravar() {
    const pedidoDAO = new PedidoDAO();
    await pedidoDAO.gravar(this);
  }

  async atualizar() {}

  async excluir() {}

  async consultar(termoBusca) {}
}
