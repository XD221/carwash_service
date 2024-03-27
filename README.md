# CARWASH SERVICE APP

Descripcion...

## Setup

### Docker compose

```bash
sudo docker compose up -d
```

### Prisma Migrations

Configurar la conexion a la base de datos correctamente.

Si es la primera vez cargando la base de datos ejecutar:

```bash
npx prisma migrate dev
```

Para ejecutar solamente el seed

```bash
npx prisma db seed
```

Para crear nuevas migraciones

```bash
npx prisma migrate dev --name nombre_de_la_migracion
```

Para resetear toda la base de datos (development)

```bash
npx prisma migrate reset
```
