-- con Usuario
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `ci`, `createdAt`, `updatedAt`) VALUES ('Juan', 'Perez', '12345678', '343 Elm St', '1234567', now(), now());
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `ci`, `createdAt`, `updatedAt`) VALUES ('Maria', 'Lopez', '98765432', '123 Main St', '2604341', now(), now());
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `ci`, `createdAt`, `updatedAt`) VALUES ('Pedro', 'Gomez', '56789012', '456 Elm St', '9876543', now(), now());
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `ci`, `createdAt`, `updatedAt`) VALUES ('Laura', 'Rodriguez', '34567890', '789 Oak St', '5432109', now(), now());
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `ci`, `createdAt`, `updatedAt`) VALUES ('Carlos', 'Gonzalez', '90123456', '321 Pine St', '2109876', now(), now());
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `ci`, `createdAt`, `updatedAt`) VALUES ('Ana', 'Martinez', '67890123', '654 Maple St', '7890123', now(), now());
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `ci`, `createdAt`, `updatedAt`) VALUES ('Luis', 'Sanchez', '23456789', '987 Cedar St', '4567890', now(), now());
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `ci`, `createdAt`, `updatedAt`) VALUES ('Sofia', 'Hernandez', '89012345', '210 Walnut St', '3214064', now(), now());
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `ci`, `createdAt`, `updatedAt`) VALUES ('Diego', 'Torres', '45678901', '543 Birch St', '7654321', now(), now());
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `ci`, `createdAt`, `updatedAt`) VALUES ('Fernanda', 'Ramirez', '01234567', '876 Spruce St', '8967453', now(), now());
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `ci`, `createdAt`, `updatedAt`) VALUES ('Ricardo', 'Luna', '76543210', '109 Cherry St', '5264258', now(), now());
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `ci`, `createdAt`, `updatedAt`) VALUES ('Mario', 'Flores', '12345678', '432 Oak St', '4258643', now(), now());
-- sin Usuario
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `ci`, `createdAt`, `updatedAt`) VALUES ('Andrea', 'Garcia', '87654321', null, '2381290', now(), now());
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `ci`, `createdAt`, `updatedAt`) VALUES ('Roberto', 'Hernandez', '12864258', null, '1642485', now(), now());
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `ci`, `createdAt`, `updatedAt`) VALUES ('Isabella', 'Lopez', '21098750', null, '3793471', now(), now());
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `ci`, `createdAt`, `updatedAt`) VALUES ('Santiago', 'Gomez', '78901248', null, '49214829', now(), now());
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `ci`, `createdAt`, `updatedAt`) VALUES ('Valentina', 'Rodriguez', '45678911', null, '4773732', now(), now());
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `ci`, `createdAt`, `updatedAt`) VALUES ('Emilio', 'Gonzalez', '03128034', null, '1268937', now(), now());
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `ci`, `createdAt`, `updatedAt`) VALUES ('Camila', 'Martinez', '78901227', null, '3571235', now(), now());
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `ci`, `createdAt`, `updatedAt`) VALUES ('Mateo', 'Sanchez', '23456789', null, '7421150', now(), now());
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `ci`, `createdAt`, `updatedAt`) VALUES ('Luciana', 'Torres', '90123456', null, '2381294', now(), now());
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `ci`, `createdAt`, `updatedAt`) VALUES ('Sebastian', 'Ramirez', '56789012', null, '2381298', now(), now());


-- Password: 123
INSERT INTO `carwash`.`Usuario` (`username`, `password`, `role`, `personaId`, `createdAt`, `updatedAt`) VALUES ('jperez', 'bc657b0057a559ff826a1ca3413d135fcd4089b573fb9c4fa78514089e16edb8f3a96f8d73bbd80756c3f285dafa8d851f369fbb132e137c6af7b77979b910ad', 'ADMIN', 1, now(), now());
INSERT INTO `carwash`.`Usuario` (`username`, `password`, `role`, `personaId`, `createdAt`, `updatedAt`) VALUES ('mlopez', 'bc657b0057a559ff826a1ca3413d135fcd4089b573fb9c4fa78514089e16edb8f3a96f8d73bbd80756c3f285dafa8d851f369fbb132e137c6af7b77979b910ad', 'ADMIN', 2, now(), now());
INSERT INTO `carwash`.`Usuario` (`username`, `password`, `role`, `personaId`, `createdAt`, `updatedAt`) VALUES ('pgomez', 'bc657b0057a559ff826a1ca3413d135fcd4089b573fb9c4fa78514089e16edb8f3a96f8d73bbd80756c3f285dafa8d851f369fbb132e137c6af7b77979b910ad', 'INVERSIONISTA', 3, now(), now());
INSERT INTO `carwash`.`Usuario` (`username`, `password`, `role`, `personaId`, `createdAt`, `updatedAt`) VALUES ('lrodriguez', 'bc657b0057a559ff826a1ca3413d135fcd4089b573fb9c4fa78514089e16edb8f3a96f8d73bbd80756c3f285dafa8d851f369fbb132e137c6af7b77979b910ad', 'INVERSIONISTA', 4, now(), now());
INSERT INTO `carwash`.`Usuario` (`username`, `password`, `role`, `personaId`, `createdAt`, `updatedAt`) VALUES ('cgonzales', 'bc657b0057a559ff826a1ca3413d135fcd4089b573fb9c4fa78514089e16edb8f3a96f8d73bbd80756c3f285dafa8d851f369fbb132e137c6af7b77979b910ad', 'OPERADOR', 5, now(), now());
INSERT INTO `carwash`.`Usuario` (`username`, `password`, `role`, `personaId`, `createdAt`, `updatedAt`) VALUES ('amartinez', 'bc657b0057a559ff826a1ca3413d135fcd4089b573fb9c4fa78514089e16edb8f3a96f8d73bbd80756c3f285dafa8d851f369fbb132e137c6af7b77979b910ad', 'OPERADOR', 6, now(), now());
-- Password: abc
INSERT INTO `carwash`.`Usuario` (`username`, `password`, `role`, `personaId`, `createdAt`, `updatedAt`) VALUES ('lsanchez', 'cc57dfe8332a817346e4f9ccb73e022c3ae2415b5fdf83fc5289f8a16eb8bf0959aa0c9f401bb209f39b532a1ed7c1be1a1da2d798c3419ac17d918b4ca00101', 'ADMIN', 7, now(), now());
INSERT INTO `carwash`.`Usuario` (`username`, `password`, `role`, `personaId`, `createdAt`, `updatedAt`) VALUES ('shernandez', 'cc57dfe8332a817346e4f9ccb73e022c3ae2415b5fdf83fc5289f8a16eb8bf0959aa0c9f401bb209f39b532a1ed7c1be1a1da2d798c3419ac17d918b4ca00101', 'ADMIN', 8, now(), now());
INSERT INTO `carwash`.`Usuario` (`username`, `password`, `role`, `personaId`, `createdAt`, `updatedAt`) VALUES ('dtorres', 'cc57dfe8332a817346e4f9ccb73e022c3ae2415b5fdf83fc5289f8a16eb8bf0959aa0c9f401bb209f39b532a1ed7c1be1a1da2d798c3419ac17d918b4ca00101', 'INVERSIONISTA', 9, now(), now());
INSERT INTO `carwash`.`Usuario` (`username`, `password`, `role`, `personaId`, `createdAt`, `updatedAt`) VALUES ('framirez', 'cc57dfe8332a817346e4f9ccb73e022c3ae2415b5fdf83fc5289f8a16eb8bf0959aa0c9f401bb209f39b532a1ed7c1be1a1da2d798c3419ac17d918b4ca00101', 'INVERSIONISTA', 10, now(), now());
INSERT INTO `carwash`.`Usuario` (`username`, `password`, `role`, `personaId`, `createdAt`, `updatedAt`) VALUES ('rluna', 'cc57dfe8332a817346e4f9ccb73e022c3ae2415b5fdf83fc5289f8a16eb8bf0959aa0c9f401bb209f39b532a1ed7c1be1a1da2d798c3419ac17d918b4ca00101', 'OPERADOR', 11, now(), now());
INSERT INTO `carwash`.`Usuario` (`username`, `password`, `role`, `personaId`, `createdAt`, `updatedAt`) VALUES ('mflores', 'cc57dfe8332a817346e4f9ccb73e022c3ae2415b5fdf83fc5289f8a16eb8bf0959aa0c9f401bb209f39b532a1ed7c1be1a1da2d798c3419ac17d918b4ca00101', 'OPERADOR', 12, now(), now());

-- Command to run before
-- docker compose up -d --build --force-recreate 
-- npx prisma migrate dev --name init 