<?php if (isset($_GET['source'])) die(highlight_file(__FILE__, 1)); ?>

<?php

/*
 *     This example script can be downloaded from Alex Web Develop "PHP Login and Authentication Tutorial":
 *     
 *     https://alexwebdevelop.com/user-authentication/
 *     
 *     You are free to use and share this script as you like.
 *     If you share it, please leave this disclaimer inside.
 *     
 *     Subscribe to my free newsletter and get my exclusive PHP tips and learning advice:
 *     
 *     https://alexwebdevelop.com/
 *     
*/ 

require "./requirements.php";

/* The PDO object */
$pdo = NULL;

/* Connection string, or "data source name" */
$dsn = 'mysql:host=' . $db_host . ';dbname=' . $db_name;

/* Connection inside a try/catch block */
try
{  
   /* PDO object creation */
   $pdo = new PDO($dsn, $db_user,  $db_pwd);
   
   /* Enable exceptions on errors */
   $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch (PDOException $e)
{
   /* If there is an error an exception is thrown */
   echo 'Database connection failed<br>';
   print_r($e);
   die();
}

?>