-- -----------------------------------------------------
INSERT INTO `HiveMind`.`users` (`id`, `firstName`, `lastName`, `username`, `email`, `password`, `dateOfBirth`, `phoneNumber`, `isActivated`, `lastLogin`)
VALUES
  (UUID(), 'Saul', 'Mora', 'BigSamo', 'saulmorahernandez96@gmail.com', '12345', '1996-07-10', '+34123456789', TRUE, '2025-02-08 20:42:16'),
  (UUID(), 'Maria', 'Garcia', 'MariG', 'maria.garcia@example.com', 'password123', '1990-03-15', '+34987654321', TRUE, '2025-02-08 21:15:30'),
  (UUID(), 'Carlos', 'Lopez', 'Carlitos', 'carlos.lopez@example.com', 'securepass', '1985-11-22', '+34654789123', TRUE, '2025-02-08 19:50:00'),
  (UUID(), 'Ana', 'Rodriguez', 'AnitaR', 'ana.rodriguez@example.com', 'mysecret', '1998-06-05', '+34789456123', FALSE, '2025-01-20 10:20:45'),
  (UUID(), 'Javier', 'Martinez', 'JaviM', 'javier.martinez@example.com', 'strongpass', '1975-09-18', '+34159357486', TRUE, '2025-02-07 14:35:10'),
  (UUID(), 'Sofia', 'Sanchez', 'SofiS', 'sofia.sanchez@example.com', 'complexpass', '2001-02-28', '+34963852741', TRUE, '2025-02-08 17:05:55');

INSERT INTO `HiveMind`.`groups` (`id`, `name`, `description`, `image`, `createdAt`, `status`)
VALUES
  (UUID(), 'TheBridge', 'Group to cry together while studying web development', 'ajjjjjjj', '2025-02-09', 'Active'),
  (UUID(), 'Bootcamp Survivors', 'A support group for those who survived the coding bootcamp', 'bootcamp_image.jpg', '2025-02-10', 'Active'),
  (UUID(), 'Frontend Fanatics', 'Passionate about HTML, CSS, and JavaScript', 'frontend_image.png', '2025-02-11', 'Active'),
  (UUID(), 'Backend Builders', 'Building the server-side magic', 'backend_image.svg', '2025-02-12', 'Inactive'),
  (UUID(), 'Fullstack Force', 'Conquering both front and back end', 'fullstack_image.gif', '2025-02-13', 'Active');