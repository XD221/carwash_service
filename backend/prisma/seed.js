import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
//import json
import personas from "./defaultData.json" assert { type: "json" }

//-- Password: 123 -> bc657b0057a559ff826a1ca3413d135fcd4089b573fb9c4fa78514089e16edb8f3a96f8d73bbd80756c3f285dafa8d851f369fbb132e137c6af7b77979b910ad
//-- Password: abc -> cc57dfe8332a817346e4f9ccb73e022c3ae2415b5fdf83fc5289f8a16eb8bf0959aa0c9f401bb209f39b532a1ed7c1be1a1da2d798c3419ac17d918b4ca00101

async function main() {
  for (const persona of personas) {
    await prisma.persona.create({
      data: {
        ci: persona.ci,
        nombre: persona.nombre,
        apellido: persona.apellido,
        telefono: persona.telefono,
        direccion: persona.direccion,
        correo: persona.correo,
        creado_en: new Date(),
        actualizado_en: new Date(),
        usuario:
          persona.usuario !== null
            ? {
                create: {
                  username: persona.usuario.username,
                  password: persona.usuario.password,
                  role: persona.usuario.role,
                  creado_en: new Date(),
                  actualizado_en: new Date(),
                },
              }
            : undefined,
      },
    })
  }
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
