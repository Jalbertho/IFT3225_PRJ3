<?php
// Le code ci-dessous a été pris des notes de cours de IFT3225-H22 (rest.pdf)
require "./config.php";

$name = "";
if (isset($_GET['name']))
  $name = $_GET["name"];

$pwd = "";
if (isset($_GET['pwd']))
  $pwd = $_GET["pwd"];

$query = "SELECT PRIVILEDGE FROM account WHERE name='".$name."' AND pwd='".$pwd."'";

// Execute query
try
{
 $res = $pdo->prepare($query);
 $res->execute();
}
catch (PDOException $e)
{
 /* If there is a PDO exception, throw a standard exception */
 throw new Exception('Database query error');
}
echo json_encode($res->fetchAll(PDO::FETCH_ASSOC));

?>