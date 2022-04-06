<?php
// Le code ci-dessous a été pris des notes de cours de IFT3225-H22 (rest.pdf)

echo ":)";

use Kunststube\Router\Router,
    Kunststube\Router\Route;


require_once 'Kunststube/Router.php';

$r = new Router;

// if you see this: you are good (no more .htaccess to fix): -)
echo 'router url: '.$_GET['url'].'<br>';

// note: en theorie, on peut seuelemnt faire un require_once du script php qui fait la job
//       mais comme mes scripts lisent $_GET, il me faut passer les arguments à $_GET pour que le script l'obtienne  
//       faire appel à curl fait la job, il y a peut-etre plus simple (ca depend aussi de l'environnement php)

function run ($p) {
    // possible de l'obtenir à partir de $_SERVER:
    $local = "https://www-ens.iro.umontreal.ca/~jalbertk/fyWdSJ8v/PRJ3/IFT3225_PRJ3";
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $local.$p);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	$output = curl_exec($ch);
    curl_close($ch);
    echo $output;
}

$r->add('/names/:pfx', array(), function(Route $route) {
    run("/names.php?pfx=".$route->pfx);
    die();
});

// $r->add('/permis/:permis', array(), function(Route $route) {
// //    echo "permis: ".$route->dispatchValue('permis'). 
// //         " route: ".$route->url(). "<br>";
// //
//     run("/brasserie2.php?permis=".$route->permis);
//     die();
// });

$r->route($_GET['url']);
?>