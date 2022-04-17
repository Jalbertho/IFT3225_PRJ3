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

// Setup columns and values.
$json = json_decode(str_replace('_', ' ', $_GET['input']));

$fields = '';
$values = '';

echo "hello <br>";

echo "".strpos("L'Hydromel", "'");
$val = (strpos("L'Hydromel", "'") !== false ? substr_replace("L'Hydromel", "'", $strpos("L'Hydromel", "'")) : "L'Hydromel" );
echo "".$val;

echo "hello <br>";

// foreach($json as $key => $val){
//     $fields = $fields.", `".$key."`";
//     $values = $values.", '".(strpos($val, "'") !== false ? substr_replace($val, "'", $strpos($val, "'")) : $val )."'";
// }
// $fields = substr($fields, 1);
// $values = substr($values, 1);

try {
    
    // add query
    $query = "INSERT INTO brasseries ($fields) VALUES ($values)";
    echo "".$query."<br>";

    // {"name":"Brasserie L'Hydromel","address":"64 avenue northmount","city":"montreal","postalCode":"J1P2T3","province":"Québec","country":"Canada","latitude":48.0,"longitude":-66.00,"adminRegion":6,"isAMBQMember":1,"typePermit":"Brasseur","phone":"51478945665"}

    // prepare query statement
    // $res = $pdo->prepare($query);
    // $res->execute();
}
catch (PDOException $e)
{
 echo "ERROR:: PDOException ".$e;

 // If there is a PDO exception, throw a standard exception
 throw new Exception('Database query error');
}

// // $json->name is brasserie's ID.
// echo '{';
//     echo '"message": "Brasserie '.$json->name.' has been added."';
// echo '}';

// return $json->name;