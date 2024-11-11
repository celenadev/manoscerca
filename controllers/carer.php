<?php

class Carer extends MY_Controller {
    public function __construct() {
        // Establece el modelo
        $this->model = "carer";
        //Llama al constructor de la clase base
        parent::__construct();
      }
      public function getAllCarers = async (req, res) => {
        try {
          //Devuelve un array de dos objetos uno con el resultado de la consulta y el otro con metadatos[0]
          const [resultado] = await conexion.query("SELECT * FROM carers");
          console.log(resultado);
          //Respuesta
          res.status(200).json(resultado);
        } catch (error) {
          res.status(500).json({
            message: "Error en el servidor.",
            error,
          });
        }
      };

}