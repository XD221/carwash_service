import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// export const obtenerAdmins = async () => {
//   return await prisma.usuario.findMany({
//     where: {
//       role: "ADMIN",
//     },
//   })
// }
