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

echo " ".$_GET["input"];
echo " ".$_GET["input"]['value'];

// update query
// $query = "INSERT INTO brasseries (
//         `name`,
//         `legalName`,
//         `otherName`,
//         `address`,
//         `city`,
//         `postalCode`,
//         `province`,
//         `country`,
//         `latitude`,
//         `longitude`,
//         `adminRegion`,
//         `numPermit`,
//         `brasseUnderPermit`,
//         `typePermit`,
//         `isAMBQMember`,
//         `yearFondation`,
//         `webSite`,
//         `email`,
//         `phone`,
//         `facebook`,
//         `ratebeer`,
//         `untappd`,
//         `auMenu`,
//         `twitter`,
//         `wikidata`,
//         `youtube`,
//         `instagram`,
//         `pinterest`,
//         `snapchat`,
//         `autre`,
//         `notes`
//         )

//         VALUES

//         (
//             name = :name,
//             price = :price,
//             description = :description,
//             category_id = :category_id
//         )";

// prepare query statement
$res = $pdo->prepare($query);

// // sanitize
// $this->name=htmlspecialchars(strip_tags($this->name));
// $this->price=htmlspecialchars(strip_tags($this->price));
// $this->description=htmlspecialchars(strip_tags($this->description));
// $this->category_id=htmlspecialchars(strip_tags($this->category_id));
// $this->id=htmlspecialchars(strip_tags($this->id));

// // bind new values
// $stmt->bindParam(':name', $this->name);
// $stmt->bindParam(':price', $this->price);
// $stmt->bindParam(':description', $this->description);
// $stmt->bindParam(':category_id', $this->category_id);
// $stmt->bindParam(':id', $this->id);

// execute the query
if($res->execute()){
    // update the product
    echo '{';
        echo '"message": "Product was updated."';
    echo '}';
    return true;
}

// if unable to update the product, tell the user
echo '{';
    echo '"message": "Unable to update product."';
echo '}';
return false;











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

// update the product
if($product->update()){
    echo '{';
        echo '"message": "Product was updated."';
    echo '}';
}
 
// if unable to update the product, tell the user
else{
    echo '{';
        echo '"message": "Unable to update product."';
    echo '}';
}
?>