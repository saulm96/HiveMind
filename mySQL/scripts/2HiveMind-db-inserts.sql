INSERT INTO `HiveMind`.`users` 
    (`user_name`, `user_lastName`, `user_username`, `user_email`, `user_password`, 
     `user_dateOfBirth`, `user_phoneNumber`, `user_isActivated`, `user_lastLogin`) 
VALUES 
    ('Saul', 'Mora', 'BigSamo', 'saulmorahernandez96@gmail.com', '12345', 
     '1996-07-10', '+34123456789', 'Active', '2025-02-08 20:42:16');

INSERT INTO `HiveMind`.`groups` 
    (`group_name`, `group_description`, `group_image`, `group_createdAt`, `group_status`)
VALUES
    ('TheBridge', 'Group to cry together while studying web development', 'ajjjjjjj', 
     '2025-02-09', 'Active');