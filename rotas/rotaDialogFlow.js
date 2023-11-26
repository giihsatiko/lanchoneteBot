import { Router } from "express";
import DialogFlowCtrl from "../Controle/dialogFlowCtrl.js";

const rota = new Router();
const dialogFlowCtrl = new DialogFlowCtrl();

rota.post("/",dialogFlowCtrl.processarIntencoes);

export default rota;
