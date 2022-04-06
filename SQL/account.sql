-- CREATE ACCOUNT TABLE W/ ID AS AN AUTOINCREMENT PRIMARY KEY
-- AND NAME AS A UNIQUE KEY.
-- (FROM: https://alexwebdevelop.com/user-authentication/)
CREATE TABLE `account` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `pwd` varchar(255) NOT NULL,
  `priviledge` ENUM('READ', 'WRITE') NOT NULL DEFAULT 'READ', -- WRITE CAN ALSO READ THE DATABASE.
  `enabled` tinyint(1) UNSIGNED NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `account`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

ALTER TABLE `account`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

-- POPULATE ACCOUNT TABLE 
INSERT INTO `account` (`name`, `pwd`, `priviledge`)
VALUES 
  ('ift3225', 'sésame', 'READ'),
  ('admin', 'ouvre-toi', 'WRITE');