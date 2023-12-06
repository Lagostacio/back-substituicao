import { PrismaClient } from '@prisma/client';
import { Disciplina } from '@prisma/client'
const prisma = new PrismaClient();

export const insertOne = async (data: any) => {
    try {
        const novodisciplina: any = await prisma.disciplina.create({
            data
            // : {
            //     nome: 'Informatica'
            // }
        });
        console.log('New disciplina created:', novodisciplina);
        return novodisciplina
    }
    catch (e) {
        throw e;
    } finally {
        await prisma.$disconnect();
    }

}

export const getAll = async (): Promise<Disciplina[] | null | undefined | void> => {
    try {
        const disciplinas = await prisma.disciplina.findMany();
        return disciplinas
    } catch (error) {
        console.error('Error retrieving disciplinas:', error);
    } finally {
        await prisma.$disconnect();
    }
}

export const deleteById = async (disciplinaId: number) => {
    try {
        const disciplina = await prisma.disciplina.findUnique({
            where: {
                id: disciplinaId,
            },
        });

        if (!disciplina) {
            console.error(`disciplina with ID ${disciplinaId} not found.`);
            return;
        }

        const disciplinaDeletada = await prisma.disciplina.delete({
            where: {
                id: disciplinaId,
            },
        });

        console.log(`disciplina with ID ${disciplinaId} and related records deleted:`, disciplinaDeletada)
        return disciplinaDeletada
    } catch (error) {
        console.error(`Error deleting disciplina with ID ${disciplinaId}:`, error);
    } finally {
        await prisma.$disconnect()
    }
}
