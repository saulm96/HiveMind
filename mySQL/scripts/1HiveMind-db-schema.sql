SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema ekhilur
-- -----------------------------------------------------
CREATE DATABASE IF NOT EXISTS `HiveMind`;

USE `HiveMind`;

-- -----------------------------------------------------
-- Table `users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `HiveMind`.`users` (
  `user_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(90) NOT NULL,
  `user_lastName` VARCHAR(90) NOT NULL,
  `user_username` VARCHAR(45) NOT NULL,
  `user_email` VARCHAR(100) NOT NULL,
  `user_password` VARCHAR(150) NOT NULL,
  `user_dateOfBirth` DATE NULL,
  `user_phoneNumber` VARCHAR(45) NULL,
  `user_isActivated` ENUM('True', 'False') NULL DEFAULT 'True',
  `user_lastLogin` DATETIME NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC) VISIBLE,
  UNIQUE INDEX `user_username_UNIQUE` (`user_username` ASC) VISIBLE,
  UNIQUE INDEX `user_email_UNIQUE` (`user_email` ASC) VISIBLE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
