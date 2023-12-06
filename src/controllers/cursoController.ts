import { PrismaClient } from '@prisma/client';
import { Curso } from '@prisma/client'
const prisma = new PrismaClient();

export const insertOne = async (data: any) => {
    try {
        const novoCurso: any = await prisma.curso.create({
            data
            // : {
            //     nome: 'Informatica'
            // }
        });
        console.log('New curso created:', novoCurso);
        return novoCurso
    }
    catch (e) {
       console.error(e)
    } finally {
        await prisma.$disconnect();
    }

}

export const getAll = async (): Promise<Curso[] | null | undefined | void> => {
    try {
        const cursos = await prisma.curso.findMany();
        return cursos
    } catch (error) {
        console.error('Error retrieving cursos:', error);
    } finally {
        await prisma.$disconnect();
    }
}

export const deleteById = async (cursoId: number) => {
    try {
        const curso = await prisma.curso.findUnique({
            where: {
                id: cursoId,
            },
        });

        if (!curso) {
            console.error(`Curso with ID ${cursoId} not found.`);
            return;
        }

        const cursoDeletado = await prisma.curso.delete({
            where: {
                id: cursoId,
            },
        });

        console.log(`curso with ID ${cursoId} and related records deleted:`, cursoDeletado)
        return cursoDeletado
    } catch (error) {
        console.error(`Error deleting curso with ID ${cursoId}:`, error);
    } finally {
        await prisma.$disconnect()
    }
}
