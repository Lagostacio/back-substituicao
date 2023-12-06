import { PrismaClient } from '@prisma/client';
import { Docente } from '@prisma/client'
const prisma = new PrismaClient();

// export const insertWithUserId = async (data: any) => {
//     try {
//         const newDocente: any = await prisma.docente.create({
//             data
//                 : {
//                 nome: "Salt Goh",
//                 siape: "123456",
//                 usuarioId: 1
//             }
//         }
//         );
//         console.log('New docente created:', newDocente);
//         return newDocente
//     }
//     catch (e) {
//         throw e;
//     } finally {
//         await prisma.$disconnect();
//     }

// }

export const getAll = async (): Promise<Docente[] | null | undefined | void> => {
    try {
        const docentes = await prisma.docente.findMany({
            include: { usuario: true }
        });
        return docentes
    } catch (error) {
        console.error('Error retrieving docentes:', error);
    } finally {
        await prisma.$disconnect();
    }
}

export const deleteById = async (docenteId: number) => {
    try {
        const docente = await prisma.docente.findUnique({
            where: {
                id: docenteId,
            },
        });

        if (!docente) {
            console.error(`docente with ID ${docenteId} not found.`);
            return;
        }

        const docenteDeletado = await prisma.docente.delete({
            where: {
                id: docenteId,
            }
        });

        console.log(`docente with ID ${docenteId} and related records deleted:`, docenteDeletado)
        return docenteDeletado
    } catch (error) {
        console.error(`Error deleting docente with ID ${docenteId}:`, error);
    } finally {
        await prisma.$disconnect()
    }
}
