CREATE TABLE IF NOT EXISTS `brasseries` (
  `name` NVARCHAR(255) NOT NULL,
  `legalName` NVARCHAR(255),
  `otherName` NVARCHAR(255),
  `address` NVARCHAR(255) NOT NULL,
  `city` NVARCHAR(255) NOT NULL,
  `postalCode` NVARCHAR(7) NOT NULL,
  `province` NVARCHAR(255) NOT NULL,
  `country` NVARCHAR(255) NOT NULL,
  `latitude` DECIMAL(8,5) NOT NULL,
  `longitude` DECIMAL(8,5) NOT NULL,
  `adminRegion` TINYINT NOT NULL,
  `numPermit` NVARCHAR(255),
  `brasseUnderPermit` NVARCHAR(255),
  `typePermit`ENUM('Brasseur', 'Sans permis', 'Producteur artisanal de bière') NOT NULL,
  `isAMBQMember` tinyint(1) UNSIGNED NOT NULL,
  `yearFondation`NVARCHAR(4),
  `webSite` NVARCHAR(255),
  `email` NVARCHAR(255),
  `phone` NVARCHAR(12) DEFAULT '?',
  `facebook` NVARCHAR(255),
  `ratebeer` NVARCHAR(255),
  `untappd` NVARCHAR(255),
  `auMenu` NVARCHAR(255),
  `twitter` NVARCHAR(255),
  `wikidata` NVARCHAR(255),
  `youtube` NVARCHAR(255),
  `instagram` NVARCHAR(255),
  `pinterest`NVARCHAR(255),
  `snapchat` NVARCHAR(255),
  `autre` NVARCHAR(255),
  `notes` NVARCHAR(255),
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOAD DATA LOCAL INFILE '/home/www-ens/jalbertk/public_html/fyWdSJ8v/PRJ3/App/SQL/microbrasseries.csv'
INTO TABLE `brasseries`
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;