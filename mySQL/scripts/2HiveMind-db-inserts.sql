INSERT INTO `HiveMind`.`users` (`id`, `firstName`, `lastName`, `username`, `email`, `dateOfBirth`, `phoneNumber`, `isActivated`, `lastLogin`, `emailVerified`)
VALUES
  (UUID(), 'Saul', 'Mora', 'BigSamo', 'saulmorahernandez96@gmail.com', '1996-07-10', '+34123456789', TRUE, '2025-02-08 20:42:16', FALSE);

INSERT INTO `HiveMind`.`user_auth` (`id`, `userId`, `authType`, `password`, `isActive`, `createdAt`, `updatedAt`)
VALUES
  (UUID(), (SELECT id FROM `HiveMind`.`users` WHERE username = 'BigSamo'), 'local', '$2a$10$iIa7Je5.8INLoXzQOMbBDeCzLGVR0ZiXNL/TS2FSzZerw/WV1hS0C', TRUE, NOW(), NOW());