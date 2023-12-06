import { PrismaClient } from '@prisma/client';
import { Coordenador } from '@prisma/client'
const prisma = new PrismaClient();

export const insertOne = async (data: any) => {
    try {
        const novoCoordenador: any = await prisma.coordenador.create({
            data
            //     : {
            //     inicio: inicio,
            //     fim: fim,
            //     curso: {
            //         connect: { id: cursoId }
            //     },
            //     docente: {
            //         connect: { id: docenteId }
            //     }
            // }
            , include: {
                curso: true,
                docente: true
            }
        })
        console.log('New coordenador created:', novoCoordenador);
        return novoCoordenador
    }
    catch (e) {
        throw e;
    } finally {
        await prisma.$disconnect();
    }

}

export const getAll = async (): Promise<Coordenador[] | null | undefined | void> => {
    try {
        const coordenadors = await prisma.coordenador.findMany({
            include: {
                curso: true,
                docente: true
            }
        });
        return coordenadors
    } catch (error) {
        console.error('Error retrieving coordenadors:', error);
    } finally {
        await prisma.$disconnect();
    }
}

export const deleteById = async (coordenadorId: number) => {
    try {
        const coordenador = await prisma.coordenador.findUnique({
            where: {
                id: coordenadorId,
            },
        });

        if (!coordenador) {
            console.error(`coordenador with ID ${coordenadorId} not found.`);
            return;
        }

        const coordenadorDeletado = await prisma.coordenador.delete({
            where: {
                id: coordenadorId,
            },
        });

        console.log(`coordenador with ID ${coordenadorId} and related records deleted:`, coordenadorDeletado)
        return coordenadorDeletado
    } catch (error) {
        console.error(`Error deleting coordenador with ID ${coordenadorId}:`, error);
    } finally {
        await prisma.$disconnect()
    }
}
