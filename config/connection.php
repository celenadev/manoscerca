<?php

class connection_BD {
  private $host = "localhost";
  private $user = "root";
  private $password = "";
  private $database = "manoscerca";
  public $conexion;

  public function __construct() {
    $this->conexion = new mysqli($this->host, $this->user, $this->password, $this->database)
      or die(mysqli_error($this->conexion));
    $this->conexion->set_charset("utf8");
  }
}
?>
