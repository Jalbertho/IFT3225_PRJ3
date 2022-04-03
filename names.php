<?php
// Pris des notes de cours Rest.pdf

require "/.config.php";

$query = 'SELECT NAME FROM brasseries';

echo $query;

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