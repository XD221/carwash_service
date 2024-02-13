-- con Usuario
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `createdAt`, `updatedAt`) VALUES ('Juan', 'Perez', '12345678', '343 Elm St', now(), now());
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `createdAt`, `updatedAt`) VALUES ('Maria', 'Lopez', '98765432', '123 Main St', now(), now());
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `createdAt`, `updatedAt`) VALUES ('Pedro', 'Gomez', '56789012', '456 Elm St', now(), now());
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `createdAt`, `updatedAt`) VALUES ('Laura', 'Rodriguez', '34567890', '789 Oak St', now(), now());
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `createdAt`, `updatedAt`) VALUES ('Carlos', 'Gonzalez', '90123456', '321 Pine St', now(), now());
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `createdAt`, `updatedAt`) VALUES ('Ana', 'Martinez', '67890123', '654 Maple St', now(), now());
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `createdAt`, `updatedAt`) VALUES ('Luis', 'Sanchez', '23456789', '987 Cedar St', now(), now());
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `createdAt`, `updatedAt`) VALUES ('Sofia', 'Hernandez', '89012345', '210 Walnut St', now(), now());
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `createdAt`, `updatedAt`) VALUES ('Diego', 'Torres', '45678901', '543 Birch St', now(), now());
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `createdAt`, `updatedAt`) VALUES ('Fernanda', 'Ramirez', '01234567', '876 Spruce St', now(), now());
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `createdAt`, `updatedAt`) VALUES ('Ricardo', 'Luna', '76543210', '109 Cherry St', now(), now());
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `createdAt`, `updatedAt`) VALUES ('Mario', 'Flores', '12345678', '432 Oak St', now(), now());
-- sin Usuario
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `createdAt`, `updatedAt`) VALUES ('Andrea', 'Garcia', '87654321', null, now(), now());
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `createdAt`, `updatedAt`) VALUES ('Roberto', 'Hernandez', '54321098', null, now(), now());
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `createdAt`, `updatedAt`) VALUES ('Isabella', 'Lopez', '21098765', null, now(), now());
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `createdAt`, `updatedAt`) VALUES ('Santiago', 'Gomez', '78901234', null, now(), now());
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `createdAt`, `updatedAt`) VALUES ('Valentina', 'Rodriguez', '45678901', null, now(), now());
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `createdAt`, `updatedAt`) VALUES ('Emilio', 'Gonzalez', '01234567', null, now(), now());
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `createdAt`, `updatedAt`) VALUES ('Camila', 'Martinez', '78901234', null, now(), now());
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `createdAt`, `updatedAt`) VALUES ('Mateo', 'Sanchez', '23456789', null, now(), now());
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `createdAt`, `updatedAt`) VALUES ('Luciana', 'Torres', '90123456', null, now(), now());
INSERT INTO `carwash`.`Persona` (`nombre`, `apellido`, `telefono`, `direccion`, `createdAt`, `updatedAt`) VALUES ('Sebastian', 'Ramirez', '56789012', null, now(), now());


-- Password: 123
INSERT INTO `carwash`.`Usuario` (`username`, `password`, `role`, `personaId`, `createdAt`, `updatedAt`) VALUES ('jperez', 'bc657b0057a559ff826a1ca3413d135fcd4089b573fb9c4fa78514089e16edb8f3a96f8d73bbd80756c3f285dafa8d851f369fbb132e137c6af7b77979b910ad', 'ADMIN', 1, now(), now());
INSERT INTO `carwash`.`Usuario` (`username`, `password`, `role`, `personaId`, `createdAt`, `updatedAt`) VALUES ('mlopez', 'bc657b0057a559ff826a1ca3413d135fcd4089b573fb9c4fa78514089e16edb8f3a96f8d73bbd80756c3f285dafa8d851f369fbb132e137c6af7b77979b910ad', 'ADMIN', 2, now(), now());
INSERT INTO `carwash`.`Usuario` (`username`, `password`, `role`, `personaId`, `createdAt`, `updatedAt`) VALUES ('pgomez', 'bc657b0057a559ff826a1ca3413d135fcd4089b573fb9c4fa78514089e16edb8f3a96f8d73bbd80756c3f285dafa8d851f369fbb132e137c6af7b77979b910ad', 'ADMIN', 3, now(), now());
INSERT INTO `carwash`.`Usuario` (`username`, `password`, `role`, `personaId`, `createdAt`, `updatedAt`) VALUES ('lrodriguez', 'bc657b0057a559ff826a1ca3413d135fcd4089b573fb9c4fa78514089e16edb8f3a96f8d73bbd80756c3f285dafa8d851f369fbb132e137c6af7b77979b910ad', 'ADMIN', 4, now(), now());
INSERT INTO `carwash`.`Usuario` (`username`, `password`, `role`, `personaId`, `createdAt`, `updatedAt`) VALUES ('cgonzales', 'bc657b0057a559ff826a1ca3413d135fcd4089b573fb9c4fa78514089e16edb8f3a96f8d73bbd80756c3f285dafa8d851f369fbb132e137c6af7b77979b910ad', 'ADMIN', 5, now(), now());
INSERT INTO `carwash`.`Usuario` (`username`, `password`, `role`, `personaId`, `createdAt`, `updatedAt`) VALUES ('amartinez', 'bc657b0057a559ff826a1ca3413d135fcd4089b573fb9c4fa78514089e16edb8f3a96f8d73bbd80756c3f285dafa8d851f369fbb132e137c6af7b77979b910ad', 'ADMIN', 6, now(), now());
-- Password: abc
INSERT INTO `carwash`.`Usuario` (`username`, `password`, `role`, `personaId`, `createdAt`, `updatedAt`) VALUES ('lsanchez', 'cc57dfe8332a817346e4f9ccb73e022c3ae2415b5fdf83fc5289f8a16eb8bf0959aa0c9f401bb209f39b532a1ed7c1be1a1da2d798c3419ac17d918b4ca00101', 'ADMIN', 7, now(), now());
INSERT INTO `carwash`.`Usuario` (`username`, `password`, `role`, `personaId`, `createdAt`, `updatedAt`) VALUES ('shernandez', 'cc57dfe8332a817346e4f9ccb73e022c3ae2415b5fdf83fc5289f8a16eb8bf0959aa0c9f401bb209f39b532a1ed7c1be1a1da2d798c3419ac17d918b4ca00101', 'ADMIN', 8, now(), now());
INSERT INTO `carwash`.`Usuario` (`username`, `password`, `role`, `personaId`, `createdAt`, `updatedAt`) VALUES ('dtorres', 'cc57dfe8332a817346e4f9ccb73e022c3ae2415b5fdf83fc5289f8a16eb8bf0959aa0c9f401bb209f39b532a1ed7c1be1a1da2d798c3419ac17d918b4ca00101', 'ADMIN', 9, now(), now());
INSERT INTO `carwash`.`Usuario` (`username`, `password`, `role`, `personaId`, `createdAt`, `updatedAt`) VALUES ('framirez', 'cc57dfe8332a817346e4f9ccb73e022c3ae2415b5fdf83fc5289f8a16eb8bf0959aa0c9f401bb209f39b532a1ed7c1be1a1da2d798c3419ac17d918b4ca00101', 'ADMIN', 10, now(), now());
INSERT INTO `carwash`.`Usuario` (`username`, `password`, `role`, `personaId`, `createdAt`, `updatedAt`) VALUES ('rluna', 'cc57dfe8332a817346e4f9ccb73e022c3ae2415b5fdf83fc5289f8a16eb8bf0959aa0c9f401bb209f39b532a1ed7c1be1a1da2d798c3419ac17d918b4ca00101', 'ADMIN', 11, now(), now());
INSERT INTO `carwash`.`Usuario` (`username`, `password`, `role`, `personaId`, `createdAt`, `updatedAt`) VALUES ('mflores', 'cc57dfe8332a817346e4f9ccb73e022c3ae2415b5fdf83fc5289f8a16eb8bf0959aa0c9f401bb209f39b532a1ed7c1be1a1da2d798c3419ac17d918b4ca00101', 'ADMIN', 12, now(), now());