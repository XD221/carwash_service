-- CreateTable
CREATE TABLE `Persona` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(35) NOT NULL,
    `apellido` VARCHAR(40) NULL,
    `telefono` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(50) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `direccion` VARCHAR(255) NOT NULL,
    `role` ENUM('INVERSIONISTA', 'Operadores', 'ADMIN') NOT NULL DEFAULT 'INVERSIONISTA',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `personaId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Usuario_username_key`(`username`),
    UNIQUE INDEX `Usuario_personaId_key`(`personaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Servicio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(60) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sucursal` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `personaId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Sucursal_personaId_key`(`personaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Producto` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(35) NOT NULL,
    `precio` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Inventario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cantidad` INTEGER NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `productoId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Inventario_productoId_key`(`productoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ventas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `detalle` VARCHAR(500) NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `personaId` VARCHAR(191) NOT NULL,
    `sucursalId` VARCHAR(191) NOT NULL,
    `servicioId` INTEGER NOT NULL,

    UNIQUE INDEX `Ventas_personaId_key`(`personaId`),
    UNIQUE INDEX `Ventas_sucursalId_key`(`sucursalId`),
    UNIQUE INDEX `Ventas_servicioId_key`(`servicioId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VehiculoMantenimiento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `estado` TINYINT NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `vehiculoId` VARCHAR(191) NOT NULL,
    `ventaId` INTEGER NOT NULL,

    UNIQUE INDEX `VehiculoMantenimiento_vehiculoId_key`(`vehiculoId`),
    UNIQUE INDEX `VehiculoMantenimiento_ventaId_key`(`ventaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ConsumoServicio` (
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `servicioId` INTEGER NOT NULL,
    `ventaId` INTEGER NOT NULL,

    UNIQUE INDEX `ConsumoServicio_servicioId_key`(`servicioId`),
    UNIQUE INDEX `ConsumoServicio_ventaId_key`(`ventaId`),
    PRIMARY KEY (`servicioId`, `ventaId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ConsumoProducto` (
    `cantidad` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `productoId` VARCHAR(191) NOT NULL,
    `ventaId` INTEGER NOT NULL,

    UNIQUE INDEX `ConsumoProducto_productoId_key`(`productoId`),
    UNIQUE INDEX `ConsumoProducto_ventaId_key`(`ventaId`),
    PRIMARY KEY (`productoId`, `ventaId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vehiculo` (
    `id` VARCHAR(191) NOT NULL,
    `placa` VARCHAR(60) NOT NULL,
    `marca` VARCHAR(60) NOT NULL,
    `modelo` VARCHAR(60) NOT NULL,
    `color` VARCHAR(20) NOT NULL,
    `anio` VARCHAR(4) NOT NULL,
    `tipoVehiculo` ENUM('MOTO', 'AUTO', 'CAMIONETA', 'VAGONETA', 'CAMION', 'BUS', 'TRACTOR', 'OTRO') NOT NULL DEFAULT 'AUTO',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `personaId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Vehiculo_personaId_key`(`personaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tarifaTipoVehiculo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipoVehiculo` ENUM('MOTO', 'AUTO', 'CAMIONETA', 'VAGONETA', 'CAMION', 'BUS', 'TRACTOR', 'OTRO') NOT NULL DEFAULT 'AUTO',
    `tarifa` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_personaId_fkey` FOREIGN KEY (`personaId`) REFERENCES `Persona`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sucursal` ADD CONSTRAINT `Sucursal_personaId_fkey` FOREIGN KEY (`personaId`) REFERENCES `Persona`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inventario` ADD CONSTRAINT `Inventario_productoId_fkey` FOREIGN KEY (`productoId`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ventas` ADD CONSTRAINT `Ventas_personaId_fkey` FOREIGN KEY (`personaId`) REFERENCES `Persona`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ventas` ADD CONSTRAINT `Ventas_sucursalId_fkey` FOREIGN KEY (`sucursalId`) REFERENCES `Sucursal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VehiculoMantenimiento` ADD CONSTRAINT `VehiculoMantenimiento_vehiculoId_fkey` FOREIGN KEY (`vehiculoId`) REFERENCES `Vehiculo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VehiculoMantenimiento` ADD CONSTRAINT `VehiculoMantenimiento_ventaId_fkey` FOREIGN KEY (`ventaId`) REFERENCES `Ventas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ConsumoServicio` ADD CONSTRAINT `ConsumoServicio_servicioId_fkey` FOREIGN KEY (`servicioId`) REFERENCES `Servicio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ConsumoServicio` ADD CONSTRAINT `ConsumoServicio_ventaId_fkey` FOREIGN KEY (`ventaId`) REFERENCES `Ventas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ConsumoProducto` ADD CONSTRAINT `ConsumoProducto_productoId_fkey` FOREIGN KEY (`productoId`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ConsumoProducto` ADD CONSTRAINT `ConsumoProducto_ventaId_fkey` FOREIGN KEY (`ventaId`) REFERENCES `Ventas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vehiculo` ADD CONSTRAINT `Vehiculo_personaId_fkey` FOREIGN KEY (`personaId`) REFERENCES `Persona`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
