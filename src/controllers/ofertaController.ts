import { PrismaClient } from '@prisma/client';
import { Oferta } from '@prisma/client'
const prisma = new PrismaClient();

export const insertOne = async (data: any) => {
    try {
        const novaOferta: any = await prisma.oferta.create({
            data
            // docenteId: number;
            // turmaId: number;
            // cicloLetivoId: number;
            // disciplinaId: number;
            , include: {
                docente: true,
                turma: true,
                cicloLetivo: true,
                disciplina: true
            }
        });
        console.log('New oferta created:', novaOferta);
        return novaOferta
    }
    catch (e) {
        console.error(e)
    } finally {
        await prisma.$disconnect();
    }

}

export const getAll = async (): Promise<Oferta[] | null | undefined | void> => {
    try {
        const ofertas = await prisma.oferta.findMany({
            include: {
                docente: true,
                turma: true,
                cicloLetivo: true,
                disciplina: true
            }
        });
        return ofertas
    } catch (error) {
        console.error('Error retrieving ofertas:', error);
    } finally {
        await prisma.$disconnect();
    }
}

export const deleteByIds = async (
    docenteId: number,
    turmaId: number,
    cicloLetivoId: number,
    disciplinaId: number,
) => {
    try {
        const oferta = await prisma.oferta.findFirst({
            where: {
                docenteId,
                turmaId,
                cicloLetivoId,
                disciplinaId
            },
        });

        if (!oferta) {
            console.error(`oferta with IDs not found.`);
            return;
        }

        const ofertaDeletado = await prisma.oferta.deleteMany({
            where: {
                docenteId,
                turmaId,
                cicloLetivoId,
                disciplinaId
            },
        });

        console.log(`oferta with IDs and related records deleted:`, ofertaDeletado)
        return ofertaDeletado
    } catch (error) {
        console.error(`Error deleting oferta with IDs:`, error);
    } finally {
        await prisma.$disconnect()
    }
}
