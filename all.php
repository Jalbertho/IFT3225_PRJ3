<?php
// Le code ci-dessous a été pris des notes de cours de IFT3225-H22 (rest.pdf)

require "./config.php";

$query = "SELECT * FROM brasseries";

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