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
$json = json_decode($_GET['input']);
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

    // prepare query statement
    $res = $pdo->prepare($query);

    echo "".$json->name;
    echo "".$json->city;
    echo "".$json->name;

    // bind new values
    $res->bindParam(':name', $json->name);
    $res->bindParam(':legalName', $json->legalName);
    $res->bindParam(':otherName', $json->otherName);
    $res->bindParam(':address', $json->address);
    $res->bindParam(':city', $json->city);
    $res->bindParam(':postalCode', $json->postalCode);
    $res->bindParam(':province', $json->province);
    $res->bindParam(':country', $json->country);
    $res->bindParam(':latitude', $json->latitude);
    $res->bindParam(':longitude', $json->longitude);
    $res->bindParam(':adminRegion', $json->adminRegion);
    $res->bindParam(':numPermit', $json->numPermit);
    $res->bindParam(':brasseUnderPermit', $json->brasseUnderPermit);
    $res->bindParam(':typePermit', $json->typePermit);
    $res->bindParam(':isAMBQMember', $json->isAMBQMember);
    $res->bindParam(':yearFondation', $json->yearFondation);
    $res->bindParam(':webSite', $json->webSite);
    $res->bindParam(':email', $json->email);
    $res->bindParam(':phone', $json->phone);
    $res->bindParam(':facebook', $json->facebook);
    $res->bindParam(':ratebeer', $json->ratebeer);
    $res->bindParam(':untappd', $json->untappd);
    $res->bindParam(':auMenu', $json->auMenu);
    $res->bindParam(':twitter', $json->twitter);
    $res->bindParam(':wikidata', $json->wikidata);
    $res->bindParam(':youtube', $json->youtube);
    $res->bindParam(':instagram', $json->instagram);
    $res->bindParam(':pinterest', $json->pinterest);
    $res->bindParam(':snapchat', $json->snapchat);
    $res->bindParam(':autre', $json->autre);
    $res->bindParam(':notes', $json->notes);
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
 // If there is a PDO exception, throw a standard exception
 throw new Exception('Database query error');
}

echo '{';
    echo '"message": "Brasserie '.$pdo->lastInsertId().' has been added."';
echo '}';
return $pdo->lastInsertId();

// echo '{';
//     echo '"message": "Brasserie has been added."';
// echo '}';

// // execute the query
// if($res->execute()){
//     // update the product
//     echo '{';
//         echo '"message": "Product was updated."';
//     echo '}';
//     return true;
// }