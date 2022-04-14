<?php
// Le code ci-dessous a été pris des notes de cours de IFT3225-H22 (rest.pdf)

require "./config.php";

$pfx = "";
if (isset($_GET['pfx']))
  $pfx = str_replace('_', ' ', $_GET['pfx']); //$_GET["pfx"];

$query = "SELECT NAME FROM brasseries WHERE NAME LIKE '".$pfx."%'";

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