import { PrismaClient } from '@prisma/client';
import { Turma } from '@prisma/client'
const prisma = new PrismaClient();

export const insertOne = async (data: any) => {
    try {
        const novaTurma: any = await prisma.turma.create({
            data
            // : {
            //     nome: "1º A",
            //     cursoId: "1"
            // }
        });
        console.log('New turma created:', novaTurma);
        return novaTurma
    }
    catch (e) {
        console.error(e)
    } finally {
        await prisma.$disconnect();
    }

}

export const getAll = async (): Promise<Turma[] | null | undefined | void> => {
    try {
        const turmas = await prisma.turma.findMany({
            include: { curso: true }
        });
        return turmas
    } catch (error) {
        console.error('Error retrieving turmas:', error);
    } finally {
        await prisma.$disconnect();
    }
}

export const deleteById = async (turmaId: number) => {
    try {
        const turma = await prisma.turma.findUnique({
            where: {
                id: turmaId,
            },
        });

        if (!turma) {
            console.error(`turma with ID ${turmaId} not found.`);
            return;
        }

        const turmaDeletada = await prisma.turma.delete({
            where: {
                id: turmaId,
            },
        });

        console.log(`turma with ID ${turmaId} and related records deleted:`, turmaDeletada)
        return turmaDeletada
    } catch (error) {
        console.error(`Error deleting turma with ID ${turmaId}:`, error);
    } finally {
        await prisma.$disconnect()
    }
}
