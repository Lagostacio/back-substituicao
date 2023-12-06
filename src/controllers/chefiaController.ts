import { PrismaClient } from '@prisma/client';
import { Chefia } from '@prisma/client'
const prisma = new PrismaClient();

export const insertOne = async (data: any) => {
    try {
        const novochefia: any = await prisma.chefia.create({
            data
            // :{ inicio: 2023-06-30T23:59:59Z;
            //     fim: 2023-06-30T23:59:59Z;
            //     nivel: string;
            //     docenteId: number;}
            // , include: {
            //     docente: true
            // }
            , include: { docente: true }
        })
        console.log('New chefia created:', novochefia);
        return novochefia
    }
    catch (e) {
        console.error(e)
    } finally {
        await prisma.$disconnect();
    }

}

export const getAll = async (): Promise<Chefia[] | null | undefined | void> => {
    try {
        const chefias = await prisma.chefia.findMany({
            include: {
                docente: true
            }
        });
        return chefias
    } catch (error) {
        console.error('Error retrieving chefias:', error);
    } finally {
        await prisma.$disconnect();
    }
}

export const deleteById = async (chefiaId: number) => {
    try {
        const chefia = await prisma.chefia.findUnique({
            where: {
                id: chefiaId,
            },
        });

        if (!chefia) {
            console.error(`chefia with ID ${chefiaId} not found.`);
            return;
        }

        const chefiaDeletado = await prisma.chefia.delete({
            where: {
                id: chefiaId,
            },
        });

        console.log(`chefia with ID ${chefiaId} and related records deleted:`, chefiaDeletado)
        return chefiaDeletado
    } catch (error) {
        console.error(`Error deleting chefia with ID ${chefiaId}:`, error);
    } finally {
        await prisma.$disconnect()
    }
}
