<?php
// Le code ci-dessous a été pris des notes de cours de IFT3225-H22 (rest.pdf)
// et de la page https://phpdelusions.net/pdo_examples/delete

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// include database and object files
require "./config.php";

echo "name: ".$_GET['name']."<br>";

$query = "DELETE FORM brasseries WHERE name= '".$_GET['name']."'";

try {

    $res = $pdo->prepare($query);

    if($res->execute($_GET['name'])){
        echo json_encode(array("message" => "Brasserie has been removed."));

    }else{
        echo json_encode(array("message" => "Brasserie doesn't exist."));
    }

}
catch (PDOException $e)
{
    /* If there is a PDO exception, throw a standard exception */
    throw new Exception('Database query error');
}