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

$data = json_decode(file_get_contents("php://input"))
$obj = json_decode($data);
echo "".$data;
echo "".$data["name"];
echo "".$data["city"];

/*try {

    $data = json_decode(file_get_contents("php://input"))
    $obj = json_decode($data);
    echo "".$data;
    echo "".$data["name"];
    echo "".$data["city"];
    
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

    // bind new values
    $stmt->bindParam(':name', $_REQUEST['name']);
    $stmt->bindParam(':legalName', $_REQUEST['legalName']);
    $stmt->bindParam(':otherName', $_REQUEST['otherName']);
    $stmt->bindParam(':address', $_REQUEST['address']);
    $stmt->bindParam(':city', $_REQUEST['city']);
    $stmt->bindParam(':postalCode', $_REQUEST['postalCode']);
    $stmt->bindParam(':province', $_REQUEST['province']);
    $stmt->bindParam(':country', $_REQUEST['country']);
    $stmt->bindParam(':latitude', $_REQUEST['latitude']);
    $stmt->bindParam(':longitude', $_REQUEST['longitude']);
    $stmt->bindParam(':adminRegion', $_REQUEST['adminRegion']);
    $stmt->bindParam(':numPermit', $_REQUEST['numPermit']);
    $stmt->bindParam(':brasseUnderPermit', $_REQUEST['brasseUnderPermit']);
    $stmt->bindParam(':typePermit', $_REQUEST['typePermit']);
    $stmt->bindParam(':isAMBQMember', $_REQUEST['isAMBQMember']);
    $stmt->bindParam(':yearFondation', $_REQUEST['yearFondation']);
    $stmt->bindParam(':webSite', $_REQUEST['webSite']);
    $stmt->bindParam(':email', $_REQUEST['email']);
    $stmt->bindParam(':phone', $_REQUEST['phone']);
    $stmt->bindParam(':facebook', $_REQUEST['facebook']);
    $stmt->bindParam(':ratebeer', $_REQUEST['ratebeer']);
    $stmt->bindParam(':untappd', $_REQUEST['untappd']);
    $stmt->bindParam(':auMenu', $_REQUEST['auMenu']);
    $stmt->bindParam(':twitter', $_REQUEST['twitter']);
    $stmt->bindParam(':wikidata', $_REQUEST['wikidata']);
    $stmt->bindParam(':youtube', $_REQUEST['youtube']);
    $stmt->bindParam(':instagram', $_REQUEST['instagram']);
    $stmt->bindParam(':pinterest', $_REQUEST['pinterest']);
    $stmt->bindParam(':snapchat', $_REQUEST['snapchat']);
    $stmt->bindParam(':autre', $_REQUEST['autre']);
    $stmt->bindParam(':notes', $_REQUEST['notes']);

// execute the query
$res->execute();

}
catch (PDOException $e)
{
 // If there is a PDO exception, throw a standard exception
 throw new Exception('Database query error');
}

echo '{';
    echo '"message": "Brasserie has been added."';
echo '}';*/

// // execute the query
// if($res->execute()){
//     // update the product
//     echo '{';
//         echo '"message": "Product was updated."';
//     echo '}';
//     return true;
// }