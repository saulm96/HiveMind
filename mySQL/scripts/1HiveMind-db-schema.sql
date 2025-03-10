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
  `dateOfBirth` DATE NULL,
  `phoneNumber` VARCHAR(20) NULL,
  `isActivated` BOOLEAN NOT NULL DEFAULT TRUE,
  `lastLogin` DATETIME NULL,
  `emailVerified` BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;



-- -----------------------------------------------------
-- Table `for authentication methods`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `HiveMind`.`user_auth` (
  `id` CHAR(36) NOT NULL DEFAULT (UUID()),
  `userId` CHAR(36) NOT NULL,
  `authType` ENUM('local', 'google', 'facebook') NOT NULL,
  `authIdentifier` VARCHAR(255) NULL, 
  `password` VARCHAR(150) NULL, 
  `isActive` BOOLEAN NOT NULL DEFAULT TRUE,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  UNIQUE INDEX `unique_user_auth_type` (`userId`, `authType`)
) ENGINE = InnoDB;



-- -----------------------------------------------------
-- Table `HiveMind`.`user_tokens` to store different kind of tokens like refresh token, verification token, password reset token
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `HiveMind`.`user_tokens` (
  `id` CHAR(36) NOT NULL DEFAULT (UUID()),
  `userId` CHAR(36) NOT NULL,
  `token` VARCHAR(500) NOT NULL,
  `tokenType` ENUM('email_verification', 'password_reset', 'refresh_token') NOT NULL,
  `expiresAt` DATETIME NOT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `usedAt` DATETIME NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  INDEX `idx_token` (`token`)
) ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
