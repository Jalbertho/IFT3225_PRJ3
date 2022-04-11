<?php
// Le code ci-dessous a été pris des notes de cours de IFT3225-H22 (rest.pdf)

require "./config.php";

echo ":)";

// if (! (isset($_GET['permis'])))
//   throw new Exception('Query must take an argument representing the permit number.')

$query = "SELECT * FROM brasseries WHERE numPermit='".$_GET['num']."%'";

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