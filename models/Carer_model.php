<?php
require_once "../config/connection.php";

$cnx = new connection_BD();

$response['success'] = false;
if (isset($_REQUEST["opc"])) {
    $response['success'] = true;
    //search list, create, update, delete
    $opc = $_REQUEST["opc"];

    switch ($opc) {
        case 'list':
            $res = $cnx->search("carers", "1");
            if ($res) {
                $response["success"] = true;
                $response['carers'] = $res;
            }
            break;
    }
}

// SEARCH method should be part of the connection_BD class in connection.php
// Ensure the search method is defined in the connection_BD class in connection.php

$cnx = null;
die(json_encode($response));
?>

