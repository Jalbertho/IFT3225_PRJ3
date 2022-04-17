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

// echo "REQUEST :: ADD <br>";
// echo "".$_GET['input'];
// echo "<br>";
// $input = json_decode(file_get_contents("php://input"));
$json = json_decode(str_replace('_', ' ', $_GET['input']));
// echo "DATA : ".$input. "<br>";
// echo "OBJ : ".$obj."<br>";
// echo "".$obj["name"];
// echo "".$obj->name;
// echo "".$input["name"];
// echo "".$input->name;

try {
    
    // add query
    $query = "INSERT INTO brasseries (
            `name`,
            `legalName`,
            `otherName`,
            `address`,
            `city`,
            `postalCode`,
            `province`,
            `country`,
            `latitude`,
            `longitude`,
            `adminRegion`,
            `numPermit`,
            `brasseUnderPermit`,
            `typePermit`,
            `isAMBQMember`,
            `yearFondation`,
            `webSite`,
            `email`,
            `phone`,
            `facebook`,
            `ratebeer`,
            `untappd`,
            `auMenu`,
            `twitter`,
            `wikidata`,
            `youtube`,
            `instagram`,
            `pinterest`,
            `snapchat`,
            `autre`,
            `notes`
        )

        VALUES

        (
            :name,
            :legalName,
            :otherName,
            :address,
            :city,
            :postalCode,
            :province,
            :country,
            :latitude,
            :longitude,
            :adminRegion,
            :numPermit,
            :brasseUnderPermit,
            :typePermit,
            :isAMBQMember,
            :yearFondation,
            :webSite,
            :email,
            :phone,
            :facebook,
            :ratebeer,
            :untappd,
            :auMenu,
            :twitter,
            :wikidata,
            :youtube,
            :instagram,
            :pinterest,
            :snapchat,
            :autre,
            :notes
        )";

    // {"name":"chantale","address":"64avenuenorthmount","city":"montreal","postalCode":"J1P2T3","province":"Québec","country":"Canada","latitude":46.0,"longitude":-64.00,"adminRegion":6,"isAMBQMember":1,"typePermit":"Brasseur","phone":"51478945665"}

    // prepare query statement
    $res = $pdo->prepare($query);

    // bind new values
    $res->bindParam(':name', $json->name, PDO::PARAM_STR);
    $res->bindParam(':legalName', $json->legalName, PDO::PARAM_STR);
    $res->bindParam(':otherName', $json->otherName, PDO::PARAM_STR, PDO::PARAM_STR);
    $res->bindParam(':address', $json->address, PDO::PARAM_STR);
    $res->bindParam(':city', $json->city, PDO::PARAM_STR);
    $res->bindParam(':postalCode', $json->postalCode, PDO::PARAM_STR);
    $res->bindParam(':province', $json->province, PDO::PARAM_STR);
    $res->bindParam(':country', $json->country, PDO::PARAM_STR);
    $res->bindParam(':latitude', $json->latitude, PDO::PARAM_INT);
    $res->bindParam(':longitude', $json->longitude, PDO::PARAM_INT);
    $res->bindParam(':adminRegion', $json->adminRegion, PDO::PARAM_INT);
    $res->bindParam(':numPermit', $json->numPermit, PDO::PARAM_STR);
    $res->bindParam(':brasseUnderPermit', $json->brasseUnderPermit, PDO::PARAM_STR);
    $res->bindParam(':typePermit', $json->typePermit, PDO::PARAM_STR);
    $res->bindParam(':isAMBQMember', $json->isAMBQMember, PDO::PARAM_INT);
    $res->bindParam(':yearFondation', $json->yearFondation, PDO::PARAM_STR);
    $res->bindParam(':webSite', $json->webSite, PDO::PARAM_STR);
    $res->bindParam(':email', $json->email, PDO::PARAM_STR);
    $res->bindParam(':phone', $json->phone, PDO::PARAM_STR);
    $res->bindParam(':facebook', $json->facebook, PDO::PARAM_STR);
    $res->bindParam(':ratebeer', $json->ratebeer, PDO::PARAM_STR);
    $res->bindParam(':untappd', $json->untappd, PDO::PARAM_STR);
    $res->bindParam(':auMenu', $json->auMenu, PDO::PARAM_STR);
    $res->bindParam(':twitter', $json->twitter, PDO::PARAM_STR);
    $res->bindParam(':wikidata', $json->wikidata, PDO::PARAM_STR);
    $res->bindParam(':youtube', $json->youtube, PDO::PARAM_STR);
    $res->bindParam(':instagram', $json->instagram, PDO::PARAM_STR);
    $res->bindParam(':pinterest', $json->pinterest, PDO::PARAM_STR);
    $res->bindParam(':snapchat', $json->snapchat, PDO::PARAM_STR);
    $res->bindParam(':autre', $json->autre, PDO::PARAM_STR);
    $res->bindParam(':notes', $json->notes, PDO::PARAM_STR);
    // $res->bindParam(':name', $_REQUEST['name']);
    // $res->bindParam(':legalName', $_REQUEST['legalName']);
    // $res->bindParam(':otherName', $_REQUEST['otherName']);
    // $res->bindParam(':address', $_REQUEST['address']);
    // $res->bindParam(':city', $_REQUEST['city']);
    // $res->bindParam(':postalCode', $_REQUEST['postalCode']);
    // $res->bindParam(':province', $_REQUEST['province']);
    // $res->bindParam(':country', $_REQUEST['country']);
    // $res->bindParam(':latitude', $_REQUEST['latitude']);
    // $res->bindParam(':longitude', $_REQUEST['longitude']);
    // $res->bindParam(':adminRegion', $_REQUEST['adminRegion']);
    // $res->bindParam(':numPermit', $_REQUEST['numPermit']);
    // $res->bindParam(':brasseUnderPermit', $_REQUEST['brasseUnderPermit']);
    // $res->bindParam(':typePermit', $_REQUEST['typePermit']);
    // $res->bindParam(':isAMBQMember', $_REQUEST['isAMBQMember']);
    // $res->bindParam(':yearFondation', $_REQUEST['yearFondation']);
    // $res->bindParam(':webSite', $_REQUEST['webSite']);
    // $res->bindParam(':email', $_REQUEST['email']);
    // $res->bindParam(':phone', $_REQUEST['phone']);
    // $res->bindParam(':facebook', $_REQUEST['facebook']);
    // $res->bindParam(':ratebeer', $_REQUEST['ratebeer']);
    // $res->bindParam(':untappd', $_REQUEST['untappd']);
    // $res->bindParam(':auMenu', $_REQUEST['auMenu']);
    // $res->bindParam(':twitter', $_REQUEST['twitter']);
    // $res->bindParam(':wikidata', $_REQUEST['wikidata']);
    // $res->bindParam(':youtube', $_REQUEST['youtube']);
    // $res->bindParam(':instagram', $_REQUEST['instagram']);
    // $res->bindParam(':pinterest', $_REQUEST['pinterest']);
    // $res->bindParam(':snapchat', $_REQUEST['snapchat']);
    // $res->bindParam(':autre', $_REQUEST['autre']);
    // $res->bindParam(':notes', $_REQUEST['notes']);

    // execute the query
    $res->execute();
}
catch (PDOException $e)
{
 echo "ERROR:: PDOException ".$e;

 // If there is a PDO exception, throw a standard exception
 throw new Exception('Database query error');
}

// $json->name is brasserie's ID.
echo '{';
    echo '"message": "Brasserie '.$json->name.' has been added."';
echo '}';

return $json->name;