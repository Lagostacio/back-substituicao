import { PrismaClient } from '@prisma/client';
import { CicloLetivo } from '@prisma/client'
const prisma = new PrismaClient();

export const insertOne = async (data: any) => {
    try {
        const novoCicloLetivo: any = await prisma.cicloLetivo.create({
            data
            // : {
               
            //         ano: "2023",
            //         semestre: 1,
            //         inicio: new Date(),
            //         fim: "2023-06-30T23:59:59Z"
            // }
        });
        console.log('New cicloLetivo created:', novoCicloLetivo);
        return novoCicloLetivo
    }
    catch (e) {
        console.error(e)
    } finally {
        await prisma.$disconnect();
    }

}

export const getAll = async (): Promise<CicloLetivo[] | null | undefined | void> => {
    try {
        const cicloLetivos = await prisma.cicloLetivo.findMany();
        return cicloLetivos
    } catch (error) {
        console.error('Error retrieving CiclosLetivos:', error);
    } finally {
        await prisma.$disconnect();
    }
}

export const deleteById = async (cicloLetivoId: number) => {
    try {
        const cicloLetivo = await prisma.cicloLetivo.findUnique({
            where: {
                id: cicloLetivoId,
            },
        });

        if (!cicloLetivo) {
            console.error(`cicloLetivo with ID ${cicloLetivoId} not found.`);
            return;
        }

        const cicloLetivoDeletado = await prisma.cicloLetivo.delete({
            where: {
                id: cicloLetivoId,
            },
        });

        console.log(`cicloLetivo with ID ${cicloLetivoId} and related records deleted:`, cicloLetivoDeletado)
        return cicloLetivoDeletado
    } catch (error) {
        console.error(`Error deleting cicloLetivo with ID ${cicloLetivoId}:`, error);
    } finally {
        await prisma.$disconnect()
    }
}
