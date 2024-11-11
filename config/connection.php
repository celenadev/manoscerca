<?php

//Creo conexión a la base de datos
import { createPool } from "mysql2/promise";
const conexion = createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "manoscerca",
//   port: 3306,
});
//Exportamos la conexión para poder utilizarla
export default conexion;