/*Create initial table*/
CREATE DATABASE Bamazon;
USE Bamazon;

CREATE TABLE `Products` (
  `ItemID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `ProductName` varchar(50) DEFAULT NULL,
  `DepartmentName` varchar(50) DEFAULT NULL,
  `Price` decimal(10,0) DEFAULT NULL,
  `StockQuantity` int(10) DEFAULT NULL,
  PRIMARY KEY (`ItemID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;