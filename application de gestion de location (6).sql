CREATE TABLE `User` (
  `UserID` int PRIMARY KEY AUTO_INCREMENT,
  `FirstName` varchar(255),
  `LastName` varchar(255),
  `Email` varchar(32) UNIQUE,
  `Password` varchar(255),
  `role` varchar(16)
);

CREATE TABLE `Equipment` (
  `EquipmentID` int PRIMARY KEY AUTO_INCREMENT,
  `EquipmentName` varchar(255),
  `Description` varchar(255),
  `Price` float,
  `Quantity` int
);

CREATE TABLE `Rental` (
  `RentalID` int PRIMARY KEY AUTO_INCREMENT,
  `UserID` int,
  `EquipmentID` int,
  `RentalStartDate` date,
  `RentalEndDate` date,
  `TotalRentalAmount` float
);

ALTER TABLE `User` ADD FOREIGN KEY (`UserID`) REFERENCES `Rental` (`UserID`);

ALTER TABLE `Rental` ADD FOREIGN KEY (`EquipmentID`) REFERENCES `Equipment` (`EquipmentID`);
