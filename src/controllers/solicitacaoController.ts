import { PrismaClient } from '@prisma/client';
import { Solicitacao } from '@prisma/client'
const prisma = new PrismaClient();

export const insertOne = async (data: any) => {
    try {
        const novosolicitacao: any = await prisma.solicitacao.create({
            data
            // : {
            //     nome: 'Informatica'
            // }
        });
        console.log('New solicitacao created:', novosolicitacao);
        return novosolicitacao
    }
    catch (e) {
       console.error(e)
    } finally {
        await prisma.$disconnect();
    }

}

export const getAll = async (): Promise<Solicitacao[] | null | undefined | void> => {
    try {
        const solicitacaos = await prisma.solicitacao.findMany();
        return solicitacaos
    } catch (error) {
        console.error('Error retrieving solicitacaos:', error);
    } finally {
        await prisma.$disconnect();
    }
}

export const deleteById = async (solicitacaoId: number) => {
    try {
        const solicitacao = await prisma.solicitacao.findUnique({
            where: {
                id: solicitacaoId,
            },
        });

        if (!solicitacao) {
            console.error(`solicitacao with ID ${solicitacaoId} not found.`);
            return;
        }

        const solicitacaoDeletado = await prisma.solicitacao.delete({
            where: {
                id: solicitacaoId,
            },
        });

        console.log(`solicitacao with ID ${solicitacaoId} and related records deleted:`, solicitacaoDeletado)
        return solicitacaoDeletado
    } catch (error) {
        console.error(`Error deleting solicitacao with ID ${solicitacaoId}:`, error);
    } finally {
        await prisma.$disconnect()
    }
}
