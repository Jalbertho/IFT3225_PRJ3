<?php
// Le code ci-dessous a été pris des notes de cours de IFT3225-H22 (rest.pdf)
use Kunststube\Router\Router,
    Kunststube\Router\Route;

require_once 'Kunststube/Router.php';

$r = new Router;

// if you see this: you are good (no more .htaccess to fix): -)
// echo 'router url: '.$_GET['url'].'<br>';

// note: en theorie, on peut seuelemnt faire un require_once du script php qui fait la job
//       mais comme mes scripts lisent $_GET, il me faut passer les arguments à $_GET pour que le script l'obtienne  
//       faire appel à curl fait la job, il y a peut-etre plus simple (ca depend aussi de l'environnement php)

function run ($p) {
    $local = $_SERVER[SERVER_NAME]."/~jalbertk/fyWdSJ8v/PRJ3/IFT3225_PRJ3/";
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $local.$p);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	$output = curl_exec($ch);
    curl_close($ch);
    echo $output;
}

$r->add('/all', array(), function(Route $route) {
    // Query :: SELECT * FROM brasseries;
    run("/queries/all.php");
    die();
});

// TODO : try https://www-ens.iro.umontreal.ca/~jalbertk/fyWdSJ8v/PRJ3/IFT3225_PRJ3/names
$r->add('/names', array(), function(Route $route) {
    // Query :: SELECT NAME FROM brasseries;
    run("/queries/names.php".$route->pfx);
    die();
});

// TODO : try https://www-ens.iro.umontreal.ca/~jalbertk/fyWdSJ8v/PRJ3/IFT3225_PRJ3/names/ho
$r->add('/names/:pfx', array(), function(Route $route) {
    // Query :: SELECT NAME FROM brasseries NAME LIKE <pfx>% ;
    run("/queries/names.php?pfx=".$route->pfx);
    die();
});

$r->add('/permis/:permis', array(), function(Route $route) {
    // Query :: SELECT * FROM brasseries WHERE numPermit=<numPermit> ;
    run("/queries/permis.php?permis=".$route->permis);
    die();
});

// TODO : try https://www-ens.iro.umontreal.ca/~jalbertk/fyWdSJ8v/PRJ3/IFT3225_PRJ3/login/<username>/<pwd>
$r->add('/login/:name/:pwd', array(), function(Route $route) {
    // Query :: SELECT PRIVILEDGE FROM account WHERE name='<name>' AND pwd='<pwd>' ;
    run("/queries/exists.php?name=".$route->name."&pwd=".$route->pwd);
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