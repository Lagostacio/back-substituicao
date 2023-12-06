import { PrismaClient } from '@prisma/client';
import { DocenteCicloLetivo } from '@prisma/client'
const prisma = new PrismaClient();

export const insertOne = async (data: any) => {
    try {
        const novoDocenteCicloLetivo: any = await prisma.docenteCicloLetivo.create({
            data
            // docenteId: number;
            // cicloLetivoId: number;
            // nivel: string;
            , include: { docente: true, cicloLetivo: true }
        })
        console.log('New docenteCicloLetivo created:', novoDocenteCicloLetivo);
        return novoDocenteCicloLetivo
    }
    catch (e) {
        console.error(e)
    } finally {
        await prisma.$disconnect();
    }

}

export const getAll = async (): Promise<DocenteCicloLetivo[] | null | undefined | void> => {
    try {
        const docenteCicloLetivos = await prisma.docenteCicloLetivo.findMany({
            include: {
                docente: true,
                cicloLetivo: true
            }
        });
        return docenteCicloLetivos
    } catch (error) {
        console.error('Error retrieving docenteCicloLetivos:', error);
    } finally {
        await prisma.$disconnect();
    }
}

export const deleteByDocenteId = async (docenteId: number) => {
    try {
        const docenteCicloLetivo = await prisma.docenteCicloLetivo.findMany({
            where: {
                docenteId
            },
        });

        if (!docenteCicloLetivo) {
            console.error(`docenteCicloLetivo with ID ${docenteId} not found.`);
            return;
        }

        const docenteCicloLetivoDeletado = await prisma.docenteCicloLetivo.deleteMany({
            where: {
                docenteId,
            },
        });

        console.log(`docenteCicloLetivo with ID ${docenteId} and related records deleted:`, docenteCicloLetivoDeletado)
        return docenteCicloLetivoDeletado
    } catch (error) {
        console.error(`Error deleting docenteCicloLetivo with ID ${docenteId}:`, error);
    } finally {
        await prisma.$disconnect()
    }
}


export const deleteByIds = async (docenteId: number,cicloLetivoId: number,) => {
    try {
        const docenteCicloLetivo = await prisma.docenteCicloLetivo.findMany({
            where: {
                docenteId,
                cicloLetivoId
            },
        });

        if (!docenteCicloLetivo) {
            console.error(`docenteCicloLetivo with docente ID ${docenteId} and cicloLetivo ID ${cicloLetivoId} not found.`);
            return;
        }

        const docenteCicloLetivoDeletado = await prisma.docenteCicloLetivo.deleteMany({
            where: {
                docenteId,
                cicloLetivoId
            },
        });

        console.log(`docenteCicloLetivo with ID ${docenteId} and related records deleted:`, docenteCicloLetivoDeletado)
        return docenteCicloLetivoDeletado
    } catch (error) {
        console.error(`Error deleting docenteCicloLetivo with docente ID ${docenteId} and cicloLetivo ID ${cicloLetivoId}:`, error);
    } finally {
        await prisma.$disconnect()
    }
}
