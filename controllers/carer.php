<?php

class Carer {
    public function __construct() {
        // Establece el modelo
        $this->model = "carer";
        //Llama al constructor de la clase base
        parent::__construct();
    }
        public function create($tabla, $datos) {
        $result = $this->conexion->query("INSERT INTO $tabla VALUES (null, $datos)") or die($this->conexion->error);
        if ($result) {
            return true;
        }
        return false;
    }
}