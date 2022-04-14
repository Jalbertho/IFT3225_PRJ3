<?php
// Le code ci-dessous a été pris des notes de cours de IFT3225-H22 (rest.pdf)
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
    $local = $_SERVER[SERVER_NAME]."/~jalbertk/fyWdSJ8v/PRJ3/App/queries";
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $local.$p);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	$output = curl_exec($ch);
    curl_close($ch);
    echo $output;
}

// URL : https://www-ens.iro.umontreal.ca/~jalbertk/fyWdSJ8v/PRJ3/App/queries/all
$r->add('/all', array(), function(Route $route) {
    // Query :: SELECT * FROM brasseries;
    run("/queries/all.php");
    die();
});

// URL : https://www-ens.iro.umontreal.ca/~jalbertk/fyWdSJ8v/PRJ3/App/queries/names
$r->add('/names', array(), function(Route $route) {
    // Query :: SELECT NAME FROM brasseries;
    run("/queries/names.php".$route->pfx);
    die();
});

// URL : https://www-ens.iro.umontreal.ca/~jalbertk/fyWdSJ8v/PRJ3/App/queries/names/ho
$r->add('/names/:pfx', array(), function(Route $route) {
    // Query :: SELECT NAME FROM brasseries NAME LIKE <pfx>% ;
    run("/queries/names.php?pfx=".$route->pfx);
    die();
});

// URL : https://www-ens.iro.umontreal.ca/~jalbertk/fyWdSJ8v/PRJ3/App/queries/permis/<num>
$r->add('/permis/:num', array(), function(Route $route) {
    // Query :: SELECT * FROM brasseries WHERE numPermit=<numPermit> ;
    run("/queries/permis.php?num=".$route->num);
    die();
});

// URL : https://www-ens.iro.umontreal.ca/~jalbertk/fyWdSJ8v/PRJ3/App/queries/permis/<input>
$r->add('/add/:input', array(), function(Route $route) {
    run("/queries/add.php?input=".$route->input);
    die();
});

// URL : https://www-ens.iro.umontreal.ca/~jalbertk/fyWdSJ8v/PRJ3/App/queries/login/<username>/<pwd>
$r->add('/login/:name/:pwd', array(), function(Route $route) {
    // Query :: SELECT PRIVILEDGE FROM account WHERE name='<name>' AND pwd='<pwd>' ;
    run("/queries/exists.php?name=".$route->name."&pwd=".$route->pwd);
    die();
});

// URL : https://www-ens.iro.umontreal.ca/~jalbertk/fyWdSJ8v/PRJ3/App/queries/delete/<name>
$r->add('/delete/:name', array(), function(Route $route) {
    run("/queries/delete.php?name=".$route->name);
    die();
})

$r->route($_GET['url']);
?>