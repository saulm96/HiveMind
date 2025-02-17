-- MySQL Script updated for HiveMind
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE SCHEMA IF NOT EXISTS `HiveMind` DEFAULT CHARACTER SET utf8;
USE `HiveMind`;

-- -----------------------------------------------------
-- Table `HiveMind`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HiveMind`.`users`;

CREATE TABLE IF NOT EXISTS `HiveMind`.`users` (
  `id` CHAR(36) NOT NULL DEFAULT (UUID()),
  `firstName` VARCHAR(90) NOT NULL,
  `lastName` VARCHAR(90) NOT NULL,
  `username` VARCHAR(45) NOT NULL UNIQUE,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `password` VARCHAR(150) NOT NULL,
  `dateOfBirth` DATE NULL,
  `phoneNumber` VARCHAR(20) NULL,
  `isActivated` BOOLEAN NOT NULL DEFAULT TRUE,
  `lastLogin` DATETIME NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `HiveMind`.`groups`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HiveMind`.`groups`;

CREATE TABLE IF NOT EXISTS `HiveMind`.`groups` (
  `id` CHAR(36) NOT NULL DEFAULT (UUID()),
  `name` VARCHAR(90) NOT NULL UNIQUE,
  `description` VARCHAR(360) NOT NULL,
  `image` VARCHAR(90) NULL,
  `createdAt` DATE NOT NULL,
  `status` ENUM("Active", "Inactive", "Archived") NULL DEFAULT 'Active',
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `HiveMind`.`users_in_group`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HiveMind`.`users_in_group`;

CREATE TABLE IF NOT EXISTS `HiveMind`.`users_in_group` (
  `user_id` CHAR(36) NOT NULL,
  `group_id` CHAR(36) NOT NULL,
  `joinedAt` DATE NOT NULL,
  `role_in_group` ENUM("owner", "admin", "leader", "user") NOT NULL,
  PRIMARY KEY (`user_id`, `group_id`),
  INDEX `user_id_idx` (`user_id` ASC),
  INDEX `group_id_idx` (`group_id` ASC),
  CONSTRAINT `fk_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `HiveMind`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_group`
    FOREIGN KEY (`group_id`)
    REFERENCES `HiveMind`.`groups` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
