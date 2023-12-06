import { PrismaClient } from '@prisma/client';
import { Usuario } from '@prisma/client'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import 'dotenv/config'
const SECRET = <jwt.Secret>process.env.AUTH_SECRET
const prisma = new PrismaClient();
const saltRounds = 8

export const login = async (data: { login: string, senha: string }): Promise<any> => {

    try {
        const foundUser = await prisma.usuario.findFirst({ where: { login: data.login } })

        if (!foundUser) {
            return { status: 403, token: undefined, msg: 'User not found.' }
        }
        const passMatch: boolean = bcrypt.compareSync(data.senha, foundUser.senha)

        if (!passMatch)
            return { status: 403, token: undefined, msg: 'Incorrect password.' }

        const token = jwt.sign({ userId: foundUser.id }, SECRET, { expiresIn: 60 * 30 })
        return { status: 200, token, msg: 'ok' }

    } catch (error) {
        console.error(`Error during login: `, error);
    } finally {
        await prisma.$disconnect()
    }

}



export const insertDocenteUsuario = async (data: any) => {
    try {
        data.usuario.create.senha = await bcrypt.hash(data.usuario.create.senha, saltRounds)
        const newDocente: any = await prisma.docente.create({
            data
            // : {
            //     nome: 'Salt Goh',
            //     siape: '123456',
            //     usuario: {
            //         create: {
            //             login: 'john_doe',
            //             senha: '123',
            //             papel: 'teacher',
            //         },
            //     },
            // }
            , include: {
                usuario: true,
            },
        });
        console.log('New docente created:', newDocente);
        return newDocente
    }
    catch (e) {
        console.error(e)
    } finally {
        await prisma.$disconnect();
    }

}

export const getAll = async (): Promise<Usuario[] | null | undefined | void> => {
    try {
        const usuarios = await prisma.usuario.findMany();
        return usuarios
    } catch (error) {
        console.error('Error retrieving users:', error);
    } finally {
        await prisma.$disconnect();
    }
}

export const deleteById = async (userId: number) => {
    try {
        const user = await prisma.usuario.findUnique({
            where: {
                id: userId,
            },
        });

        if (!user) {
            console.error(`User with ID ${userId} not found.`);
            return;
        }

        const usuarioDeletado = await prisma.usuario.delete({
            where: {
                id: userId,
            },
        });

        console.log(`User with ID ${userId} and related records deleted:`, usuarioDeletado)
        return usuarioDeletado
    } catch (error) {
        console.error(`Error deleting user with ID ${userId}:`, error);
    } finally {
        await prisma.$disconnect()
    }
}
