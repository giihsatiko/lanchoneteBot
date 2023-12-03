import Pedido from "../Modelo/pedido.js";
import conectar from "./conexao.js";

export default class PedidoDAO {
  async gravar(pedido) {
    if (pedido instanceof Pedido) {
      const conexao = await conectar();

      let sql = "INSERT INTO pedido (dataPedido) VALUES (?)";
      let parametros = [pedido.dataPedido];
      const resultado = await conexao.execute(sql, parametros);
      pedido.id = resultado[0].insertId;

      for (const item of pedido.itensPedidos) {
        let sql = `SELECT codigo FROM lanche WHERE sabor like ?`;
        const [registros] = await conexao.execute(sql, ['%'+ item.lanche +'%']);
        console.log(item.lanche, item)
        item.codigo = registros[0].codigo;
        sql = `INSERT INTO pedido_lanche(fk_id_pedido, fk_codigo_lanche, qtde) VALUES (?, ?, ?)`;
        parametros = [pedido.id, item.codigo, item.qtde];
        await conexao.execute(sql, parametros);
      }
      global.poolConexoes.releaseConnection(conexao);
    }
  }
}
