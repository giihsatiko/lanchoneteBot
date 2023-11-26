import Lanche from "../Modelo/lanche.js";
import conectar from "./conexao.js";

export default class LancheDAO{

    async gravar(lanche){
        if (lanche instanceof Lanche){
            const sql ='INSERT INTO lanche (descricao, sabor, valor, urlImagem) VALUES (?, ?, ?, ?)';
            const parametros = [lanche.descricao, lanche.sabor, lanche.valor, lanche.urlImagem];
            const conexao = await conectar();
            const resultado = await conexao.execute(sql, parametros);
            lanche.codigo = resultado[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(lanche){
        if (lanche instanceof Lanche){
            const sql =`UPDATE lanche SET descricao = ?, sabor = ?,
                        valor = ?, urlImagem = ? WHERE codigo = ?`;
            const parametros = [lanche.descricao, lanche.sabor, lanche.valor, lanche.urlImagem];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(lanche){
        if (lanche instanceof Lanche){
            const sql =`DELETE FROM lanche WHERE codigo = ?`;
            const parametros = [lanche.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }

    }

    async consultar(){
        const sql =`SELECT * FROM lanche`;
        const conexao = await conectar();
        const [registros] = await conexao.execute(sql);
        let listaLanches = [];
        for (const registro of registros){
            const lanche = new Lanche(registro.codigo, registro.descricao, registro.sabor, registro.valor, registro.urlImagem);
            listaLanches.push(lanche);
        }
        global.poolConexoes.releaseConnection(conexao);
        return listaLanches;
    }
}