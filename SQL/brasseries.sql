CREATE TABLE IF NOT EXISTS `brasseries` (
  `name` VARCHAR(255) NOT NULL,
  `legalName` VARCHAR(255),
  `otherName` VARCHAR(255),
  `address` VARCHAR(255) NOT NULL,
  `city` VARCHAR(255) NOT NULL,
  `postalCode` VARCHAR(7) NOT NULL,
  `province` VARCHAR(255) NOT NULL,
  `country` VARCHAR(255) NOT NULL,
  `latitude` DECIMAL(8,5) NOT NULL,
  `longitude` DECIMAL(8,5) NOT NULL,
  `adminRegion` TINYINT NOT NULL,
  `numPermit` VARCHAR(255),
  `brasseUnderPermit` VARCHAR(255),
  `typePermit`ENUM('Brasseur', 'Sans permis', 'Producteur artisanal de bière') NOT NULL,
  `isAMBQMember` tinyint(1) UNSIGNED NOT NULL,
  `yearFondation`VARCHAR(4),
  `webSite` VARCHAR(255),
  `email` VARCHAR(255),
  `phone` VARCHAR(12) NOT NULL DEFAULT '?',
  `facebook` VARCHAR(255),
  `ratebeer` VARCHAR(255),
  `untappd` VARCHAR(255),
  `auMenu` VARCHAR(255),
  `twitter` VARCHAR(255),
  `wikidata` VARCHAR(255),
  `youtube` VARCHAR(255),
  `instagram` VARCHAR(255),
  `pinterest`VARCHAR(255),
  `snapchat` VARCHAR(255),
  `autre` VARCHAR(255),
  `notes` VARCHAR(255),
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOAD DATA LOCAL INFILE '/home/www-ens/jalbertk/public_html/fyWdSJ8v/PRJ3/IFT3225_PRJ3/SQL/microbrasseries.csv'
INTO TABLE `brasseries`
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;