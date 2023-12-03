import { obterCardLanches } from "../funcoesDialogFlow/funcoesDLFlow.js";
import Pedido from "../Modelo/pedido.js";
import Lanche from "../Modelo/lanche.js";

export default class DialogFlowCtrl {
  processarIntencoes(requisicao, resposta) {
    if (requisicao.method === "POST") {
      const intencao = requisicao.body.queryResult.intent.displayName;
      const origem = requisicao.body?.originalDetectIntentRequest?.source;
      if (intencao === "Pedido") {
        if (origem) {
          obterCardLanches("custom")
            .then((listaCards) => {
              let respostaDF = {
                fulfillmentMessages: [],
              };
              respostaDF.fulfillmentMessages.push({
                text: {
                  text: [
                    "Bem vindo a Lanchonete da Maria! \n",
                    "Esses são os sabores disponíveis: \n",
                  ],
                },
              });
              respostaDF.fulfillmentMessages.push(...listaCards);
              respostaDF.fulfillmentMessages.push({
                text: {
                  text: ["Qual lanche você deseja?"],
                },
              });
              resposta.json(respostaDF);
            })
            .catch((erro) => {
              console.log(erro);
              let respostaDF = {
                fulfillmentMessages: [
                  {
                    text: {
                      text: [
                        "Erro ao recuperar o cardápio: \n",
                        "Não foi possível consultar o cardápio!",
                        "Desculpe pelo transtorno!",
                      ],
                    },
                  },
                ],
              };
              resposta.json(respostaDF);
            });
        } else {
          obterCardLanches("messenger")
            .then((listaCards) => {
              let respostaDF = {
                fulfillmentMessages: [],
              };
              respostaDF.fulfillmentMessages.push({
                payload: {
                  richContent: [
                    [
                      {
                        type: "description",
                        title: "Bem vindo a Lanchonete da Maria!",
                        text: [
                          "Estamos muito felizes em ter você por aqui!",
                          "Esses são nossos lanches: \n",
                        ],
                      },
                    ],
                  ],
                },
              });
              respostaDF.fulfillmentMessages[0].payload.richContent[0].push(
                ...listaCards
              );
              respostaDF.fulfillmentMessages[0].payload.richContent[0].push({
                type: "description",
                title: "Qual lanche você deseja?",
                text: [],
              });
              resposta.json(respostaDF);
            })
            .catch((erro) => {
              console.log("error ", erro);
              let respostaDF = {
                fulfillmentMessages: [],
              };
              respostaDF.fulfillmentMessages.push({
                payload: {
                  richContent: [
                    [
                      {
                        type: "description",
                        title: "Erro ao recuperar o cardápio: \n",
                        text: [
                          "Não foi possível consultar o cardápio!",
                          "Desculpe pelo transtorno!",
                        ],
                      },
                    ],
                  ],
                },
              });
            });
        }
      } else if (intencao === "RegistraEndereco") {
        console.log(intencao);
        let lanches = [];
        let qtde = [];

        for (const contexto of requisicao.body.queryResult.outputContexts) {
          if (contexto.parameters.lanche) {
            lanches = contexto.parameters.lanche;
            qtde = contexto.parameters.number;
          }
        }

        const dataHoje = new Date().toLocaleDateString();
        let itensPedido = [];

        for (let i = 0; i < lanches.length; i++) {
          itensPedido.push({
            codigo: 0,
            lanche: lanches[i],
            qtde: qtde[i],
          });
        }
        const enderecoEntrega = `Rua: ${requisicao.body.queryResult.parameters.location["street-address"]}`;
        const pedido = new Pedido(0, dataHoje, itensPedido);

        pedido
          .gravar()
          .then(() => {
            if (origem) {
              let respostaDF = {
                fulfillmentMessages: [
                  {
                    text: {
                      text: [
                        `Agradecemos a preferência. Seu pedido número ${pedido.id} foi registrado e logo logo sairá para entrega no endereço: ${enderecoEntrega} :D\n`,
                      ],
                    },
                  },
                ],
              };
              resposta.json(respostaDF);
            } else {
              let respostaDF = {
                fulfillmentMessages: [],
              };
              respostaDF.fulfillmentMessages.push({
                payload: {
                  richContent: [
                    [
                      {
                        type: "description",
                        title: `Agradecemos a preferência. Seu pedido número ${pedido.id} foi registrado e logo logo sairá para entrega no endereço: ${enderecoEntrega} :D\n`,
                        text: "",
                      },
                    ],
                  ],
                },
              });
            }
          })
          .catch((erro) => {
            console.log(e);
            if (origem) {
              let respostaDF = {
                fulfillmentMessages: [
                  {
                    text: {
                      text: [
                        "Erro ao registrar seu pedido.",
                        `Erro: ${erro.message}`,
                      ],
                    },
                  },
                ],
              };
              resposta.json(respostaDF);
            } else {
              let respostaDF = {
                fulfillmentMessages: [],
              };
              respostaDF.fulfillmentMessages.push({
                payload: {
                  richContent: [
                    [
                      {
                        type: "description",
                        title: "Erro ao registrar seu pedido.",
                        text: `Erro: ${erro.message}`,
                      },
                    ],
                  ],
                },
              });
            }
          });
      }
    }
  }
}
