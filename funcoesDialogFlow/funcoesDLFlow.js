import Lanche from "../Modelo/lanche.js";

export function criarMessengerCard(){
    return {
        type:"info",
        title:"",
        subtitle:"",
        image: {
            src : {
                rawUrl:""
            }
        },
        actionLink:""
    }
}

export function criarCustomCard(){
    return {
        card: {
            title:"",
            subtitle:"",
            imageUri:"",
            buttons: [
                {
                    text:"botão",
                    postback:""
                }
            ]
        }
    }
    
}

export async function obterCardLanches(tipoCard = 'custom'){
    const lancheModelo = new Lanche();
    const listaLanches = await lancheModelo.consultar();
    const listaCards = [];
    for (const lanche of listaLanches){
        let cartao;
        if (tipoCard == 'custom'){
            cartao = criarCustomCard();
            cartao.card.title = lanche.descricao;
            cartao.card.subtitle = `
                                    valor: R$${lanche.valor},
                                    sabores: ${lanche.sabor}`;
            cartao.card.imageUri = pizza.urlImagem;
            cartao.card.buttons[0].text = "Clique aqui para mais informações";
            cartao.card.buttons[0].postback = "https://portugalanches.menudino.com/";
        } 
        else{
            cartao = criarMessengerCard();
            cartao.title = lanche.descricao;
            cartao.subtitlesubtitle = `sabores: ${lanche.sabores}, 
            valor: R$${lanche.valor},
            ingredientes: ${lanche.ingredientes}`;
            cartao.image.src.rawUrl = lanche.urlImagem;
            cartao.actionLink = "https://portugalanches.menudino.com/";
        }
        listaCards.push(cartao);
    }
    return listaCards;
}