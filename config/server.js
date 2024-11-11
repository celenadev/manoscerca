"use strict";

import express from "express";
import cors from "cors";
import routerCarers from './router/carers.router.js'; // Nuevo router
//import routerReservas from "./router/reservas.router.js"

const app=express();

app.use(cors());
app.use(express.json());

app.use(routerCarers); // Usar el nuevo router

app.listen(3000,()=>{
    console.log('Escuchando solicitud');
})