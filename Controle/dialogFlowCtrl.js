import { obterCardLanches } from "../funcoesDialogFlow/funcoesDLFlow.js";

export default class DialogFlowCtrl {

    processarIntencoes(requisicao, resposta) {
        console.log(requisicao.body)
        if (requisicao.method === 'POST') {
            const intencao = requisicao.body.queryResult.intent.displayName;
            const origem = requisicao.body?.originalDetectIntentRequest?.source;
            if (intencao === 'Default Welcome Intent') {
                if (origem) {
                    obterCardLanches('custom').then((listaCards) => {
                        let respostaDF = {
                            "fulfillmentMessages": []
                        }
                        respostaDF.fulfillmentMessages.push({
                            "text": {
                                "text": [
                                    "Bem vindo a Lanchonete da Maria! \n",
                                    "Esses são os sabores disponíveis: \n"
                                ]
                            }
                        });
                        respostaDF.fulfillmentMessages.push(...listaCards);
                        respostaDF.fulfillmentMessages.push({
                            "text": {
                                "text": [
                                    "Qual lanche você deseja?"
                                ]
                            }
                        })
                        resposta.json(respostaDF);
                    }).catch((erro) => {
                        console.log(erro)
                        let respostaDF = {
                            "fulfillmentMessages": [{
                                "text": {
                                    "text": [
                                        "Erro ao recuperar o cardápio: \n",
                                        "Não foi possível consultar o cardápio!",
                                        "Desculpe pelo transtorno!"
                                    ]
                                }
                            }]
                        }
                        resposta.json(respostaDF);
                    })

                }
                else {
                    obterCardLanches('messenger').then((listaCards) => {
                        let respostaDF = {
                            "fulfillmentMessages": []
                        }
                        respostaDF.fulfillmentMessages.push({
                            "payload": {
                                "richContent": [[{
                                    "type": "description",
                                    "title": "Bem vindo a Lanchonete da Maria!",
                                    "text": [
                                        "Estamos muito felizes em ter você por aqui!",
                                        "Esses são nossos lanches: \n"
                                    ]
                                }]]
                            }
                        });
                        respostaDF.fulfillmentMessages[0].payload.richContent[0].push(...listaCards);
                        respostaDF.fulfillmentMessages[0].payload.richContent[0].push({
                            "type": "description",
                            "title": "Qual lanche você deseja?",
                            "text": []
                        });
                        resposta.json(respostaDF);
                    }).catch((erro) => {
                        console.log('error ', erro)
                        let respostaDF = {
                            "fulfillmentMessages": []
                        }
                        respostaDF.fulfillmentMessages.push({
                            "payload": {
                                "richContent": [[{
                                    "type": "description",
                                    "title": "Erro ao recuperar o cardápio: \n",
                                    "text": [
                                        "Não foi possível consultar o cardápio!",
                                        "Desculpe pelo transtorno!"
                                    ]
                                }]]
                            }
                        });

                    })
                }
            }

        }
    }
}