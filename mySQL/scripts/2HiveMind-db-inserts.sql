INSERT INTO `HiveMind`.`users` (`user_id`, `user_name`, `user_lastName`,`user_username`, `user_email` ,`user_password`, `user_dateOfBirth`, `user_phoneNumber`, `user_isActivated`, `user_lastLogin`) 
VALUES 
(1, 'Saul', 'Mora', 'BigSamo', 'saulmorahernandez96@gmail.com', '12345', '1996-07-10', '+34123456789', 'Active', '2025-02-08 20:42:16'),
(2, 'Maria', 'Garcia', 'MariG', 'maria.garcia@example.com', 'password123', '1990-03-15', '+34987654321', 'Active', '2025-02-08 21:15:30'),
(3, 'Carlos', 'Lopez', 'Carlitos', 'carlos.lopez@example.com', 'securepass', '1985-11-22', '+34654789123', 'Active', '2025-02-08 19:50:00'),
(4, 'Ana', 'Rodriguez', 'AnitaR', 'ana.rodriguez@example.com', 'mysecret', '1998-06-05', '+34789456123', 'Inactive', '2025-01-20 10:20:45'),
(5, 'Javier', 'Martinez', 'JaviM', 'javier.martinez@example.com', 'strongpass', '1975-09-18', '+34159357486', 'Active', '2025-02-07 14:35:10'),
(6, 'Sofia', 'Sanchez', 'SofiS', 'sofia.sanchez@example.com', 'complexpass', '2001-02-28', '+34963852741', 'Active', '2025-02-08 17:05:55');



INSERT INTO `HiveMind`.`groups` (`group_id`, `group_name`, `group_description`, `group_image`, `group_createdAt`, `group_status`)
VALUES
(1, 'TheBridge', 'Group to cry together while studying web development', 'ajjjjjjj', '2025/02/09', 'Active'),
(2, 'Bootcamp Survivors', 'A support group for those who survived the coding bootcamp', 'bootcamp_image.jpg', '2025-02-10', 'Active'),
(3, 'Frontend Fanatics', 'Passionate about HTML, CSS, and JavaScript', 'frontend_image.png', '2025-02-11', 'Active'),
(4, 'Backend Builders', 'Building the server-side magic', 'backend_image.svg', '2025-02-12', 'Inactive'),
(5, 'Fullstack Force', 'Conquering both front and back end', 'fullstack_image.gif', '2025-02-13', 'Active');

