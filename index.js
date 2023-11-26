import express from 'express';
import rotaDialogFlow from './rotas/rotaDialogFlow.js';
import Lanche from './Modelo/lanche.js';

const host = '0.0.0.0';
const porta = 3500;

const app = express();
app.use(express.json());
app.use('/dialogflow', rotaDialogFlow);

app.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`);
})


let lanche1 = new Lanche(1, 'Hamburguer, queijo e bacon', 'X-Bacon', 22, 'https://vocegastro.com.br/app/uploads/2021/11/x-bacon.jpg.webp')

let lanche2 = new Lanche(1, 'Hamburguer, queijo, alface e tomate', 'X-Salada', 22, 'https://www.sabornamesa.com.br/media/k2/items/cache/b4cd45b9dcdf28778c9b938159445747_XL.jpg')

let lanche3 = new Lanche(1, 'Hamburguer e queijo', 'X-Burguer', 20, 'https://imagens.jotaja.com/produtos/33c05f99-133a-4d1f-9e67-e2c28c6408c2.jpg')

let lanche4 = new Lanche(1, 'Hamburguer, queijo, bacon, tomate, salada e ovo', 'X-Tudo', 25, 'https://t3.ftcdn.net/jpg/05/83/73/04/360_F_583730453_THhAbEJ5P2uyDAHEVdfNXEtRWAjzmmAJ.jpg')

let listaLanches = [lanche1, lanche2, lanche3, lanche4];

for (const lanche of listaLanches) {
    lanche.gravar().then(() => {
        console.log('Lanche gravado')
    }).catch((erro) => {
        console.log(erro)
    })
}
