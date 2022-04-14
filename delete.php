<?php
// Le code ci-dessous a été pris des notes de cours de IFT3225-H22 (rest.pdf)

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
    $res->execute($_GET['name']);

}
catch (PDOException $e)
{
    /* If there is a PDO exception, throw a standard exception */
    throw new Exception('Database query error');
}

echo json_encode(array("message" => "Brasserie has been removed."));

// echo '{';
//     echo '"message": "Brasserie has been removed."';
// echo '}';

// // execute the query
// // if($res->execute()){
// //     // update the product
// //     echo '{';
// //         echo '"message": "Product was updated."';
// //     echo '}';
// //     return true;
// // }
// if($product->execute()){
  
//     // set response code - 200 ok
//     http_response_code(200);
  
//     // tell the user
//     echo json_encode(array("message" => "Product was deleted."));
// }
  
// // if unable to delete the product
// else{
  
//     // set response code - 503 service unavailable
//     http_response_code(503);
  
//     // tell the user
//     echo json_encode(array("message" => "Unable to delete product."));
// }



