-- con Usuario
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `correo`, `ci`, `creado_en`, `actualizado_en`) VALUES ('Juan', 'Perez', '12345678', '343 Elm St', 'juan_perez314@hotmail.com', '1234567', now(), now());
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `correo`, `ci`, `creado_en`, `actualizado_en`) VALUES ('Maria', 'Lopez', '98765432', '123 Main St', 'maria_lopez462@hotmail.com', '2604341', now(), now());
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `correo`, `ci`, `creado_en`, `actualizado_en`) VALUES ('Pedro', 'Gomez', '56789012', '456 Elm St', 'pedro_gomez767@hotmail.com', '9876543', now(), now());
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `correo`, `ci`, `creado_en`, `actualizado_en`) VALUES ('Laura', 'Rodriguez', '34567890', '789 Oak St', 'laura_rodriguez534@hotmail.com', '5432109', now(), now());
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `correo`, `ci`, `creado_en`, `actualizado_en`) VALUES ('Carlos', 'Gonzalez', '90123456', '321 Pine St', null, '2109876', now(), now());
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `correo`, `ci`, `creado_en`, `actualizado_en`) VALUES ('Ana', 'Martinez', '67890123', '654 Maple St', null, '7890123', now(), now());
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `correo`, `ci`, `creado_en`, `actualizado_en`) VALUES ('Luis', 'Sanchez', '23456789', '987 Cedar St', null, '4567890', now(), now());
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `correo`, `ci`, `creado_en`, `actualizado_en`) VALUES ('Sofia', 'Hernandez', '89012345', '210 Walnut St', null, '3214064', now(), now());
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `correo`, `ci`, `creado_en`, `actualizado_en`) VALUES ('Diego', 'Torres', '45678901', '543 Birch St', null, '7654321', now(), now());
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `correo`, `ci`, `creado_en`, `actualizado_en`) VALUES ('Fernanda', 'Ramirez', '01234567', '876 Spruce St', null, '8967453', now(), now());
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `correo`, `ci`, `creado_en`, `actualizado_en`) VALUES ('Ricardo', 'Luna', '76543210', '109 Cherry St', null, '5264258', now(), now());
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `correo`, `ci`, `creado_en`, `actualizado_en`) VALUES ('Mario', 'Flores', '12345678', '432 Oak St', null, '4258643', now(), now());
-- sin Usuario
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `correo`, `ci`, `creado_en`, `actualizado_en`) VALUES ('Andrea', 'Garcia', '87654321', null, null, '2381290', now(), now());
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `correo`, `ci`, `creado_en`, `actualizado_en`) VALUES ('Roberto', 'Hernandez', '12864258', null, null, '1642485', now(), now());
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `correo`, `ci`, `creado_en`, `actualizado_en`) VALUES ('Isabella', 'Lopez', '21098750', null, null, '3793471', now(), now());
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `correo`, `ci`, `creado_en`, `actualizado_en`) VALUES ('Santiago', 'Gomez', '78901248', null, null, '49214829', now(), now());
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `correo`, `ci`, `creado_en`, `actualizado_en`) VALUES ('Valentina', 'Rodriguez', '45678911', null, null, '4773732', now(), now());
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `correo`, `ci`, `creado_en`, `actualizado_en`) VALUES ('Emilio', 'Gonzalez', '03128034', null, null, '1268937', now(), now());
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `correo`, `ci`, `creado_en`, `actualizado_en`) VALUES ('Camila', 'Martinez', '78901227', null, null, '3571235', now(), now());
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `correo`, `ci`, `creado_en`, `actualizado_en`) VALUES ('Mateo', 'Sanchez', '23456789', null, null, '7421150', now(), now());
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `correo`, `ci`, `creado_en`, `actualizado_en`) VALUES ('Luciana', 'Torres', '90123456', null, null, '2381294', now(), now());
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `correo`, `ci`, `creado_en`, `actualizado_en`) VALUES ('Sebastian', 'Ramirez', '56789012', null, null, '2381298', now(), now());


-- Password: 123
INSERT INTO `carwash`.`Usuario` (`username`, `password`, `role`, `personaId`, `creado_en`, `actualizado_en`) VALUES ('jperez', 'bc657b0057a559ff826a1ca3413d135fcd4089b573fb9c4fa78514089e16edb8f3a96f8d73bbd80756c3f285dafa8d851f369fbb132e137c6af7b77979b910ad', 'ADMIN', 1, now(), now());
INSERT INTO `carwash`.`Usuario` (`username`, `password`, `role`, `personaId`, `creado_en`, `actualizado_en`) VALUES ('mlopez', 'bc657b0057a559ff826a1ca3413d135fcd4089b573fb9c4fa78514089e16edb8f3a96f8d73bbd80756c3f285dafa8d851f369fbb132e137c6af7b77979b910ad', 'ADMIN', 2, now(), now());
INSERT INTO `carwash`.`Usuario` (`username`, `password`, `role`, `personaId`, `creado_en`, `actualizado_en`) VALUES ('pgomez', 'bc657b0057a559ff826a1ca3413d135fcd4089b573fb9c4fa78514089e16edb8f3a96f8d73bbd80756c3f285dafa8d851f369fbb132e137c6af7b77979b910ad', 'INVERSIONISTA', 3, now(), now());
INSERT INTO `carwash`.`Usuario` (`username`, `password`, `role`, `personaId`, `creado_en`, `actualizado_en`) VALUES ('lrodriguez', 'bc657b0057a559ff826a1ca3413d135fcd4089b573fb9c4fa78514089e16edb8f3a96f8d73bbd80756c3f285dafa8d851f369fbb132e137c6af7b77979b910ad', 'INVERSIONISTA', 4, now(), now());
INSERT INTO `carwash`.`Usuario` (`username`, `password`, `role`, `personaId`, `creado_en`, `actualizado_en`) VALUES ('cgonzales', 'bc657b0057a559ff826a1ca3413d135fcd4089b573fb9c4fa78514089e16edb8f3a96f8d73bbd80756c3f285dafa8d851f369fbb132e137c6af7b77979b910ad', 'OPERADOR', 5, now(), now());
INSERT INTO `carwash`.`Usuario` (`username`, `password`, `role`, `personaId`, `creado_en`, `actualizado_en`) VALUES ('amartinez', 'bc657b0057a559ff826a1ca3413d135fcd4089b573fb9c4fa78514089e16edb8f3a96f8d73bbd80756c3f285dafa8d851f369fbb132e137c6af7b77979b910ad', 'OPERADOR', 6, now(), now());
-- Password: abc
INSERT INTO `carwash`.`Usuario` (`username`, `password`, `role`, `personaId`, `creado_en`, `actualizado_en`) VALUES ('lsanchez', 'cc57dfe8332a817346e4f9ccb73e022c3ae2415b5fdf83fc5289f8a16eb8bf0959aa0c9f401bb209f39b532a1ed7c1be1a1da2d798c3419ac17d918b4ca00101', 'ADMIN', 7, now(), now());
INSERT INTO `carwash`.`Usuario` (`username`, `password`, `role`, `personaId`, `creado_en`, `actualizado_en`) VALUES ('shernandez', 'cc57dfe8332a817346e4f9ccb73e022c3ae2415b5fdf83fc5289f8a16eb8bf0959aa0c9f401bb209f39b532a1ed7c1be1a1da2d798c3419ac17d918b4ca00101', 'ADMIN', 8, now(), now());
INSERT INTO `carwash`.`Usuario` (`username`, `password`, `role`, `personaId`, `creado_en`, `actualizado_en`) VALUES ('dtorres', 'cc57dfe8332a817346e4f9ccb73e022c3ae2415b5fdf83fc5289f8a16eb8bf0959aa0c9f401bb209f39b532a1ed7c1be1a1da2d798c3419ac17d918b4ca00101', 'INVERSIONISTA', 9, now(), now());
INSERT INTO `carwash`.`Usuario` (`username`, `password`, `role`, `personaId`, `creado_en`, `actualizado_en`) VALUES ('framirez', 'cc57dfe8332a817346e4f9ccb73e022c3ae2415b5fdf83fc5289f8a16eb8bf0959aa0c9f401bb209f39b532a1ed7c1be1a1da2d798c3419ac17d918b4ca00101', 'INVERSIONISTA', 10, now(), now());
INSERT INTO `carwash`.`Usuario` (`username`, `password`, `role`, `personaId`, `creado_en`, `actualizado_en`) VALUES ('rluna', 'cc57dfe8332a817346e4f9ccb73e022c3ae2415b5fdf83fc5289f8a16eb8bf0959aa0c9f401bb209f39b532a1ed7c1be1a1da2d798c3419ac17d918b4ca00101', 'OPERADOR', 11, now(), now());
INSERT INTO `carwash`.`Usuario` (`username`, `password`, `role`, `personaId`, `creado_en`, `actualizado_en`) VALUES ('mflores', 'cc57dfe8332a817346e4f9ccb73e022c3ae2415b5fdf83fc5289f8a16eb8bf0959aa0c9f401bb209f39b532a1ed7c1be1a1da2d798c3419ac17d918b4ca00101', 'OPERADOR', 12, now(), now());

-- Command to run before
-- docker compose up -d --build --force-recreate 
-- npx prisma migrate dev --name init 