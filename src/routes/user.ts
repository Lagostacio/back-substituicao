import * as userController from '../controllers/userController'
import { isAuth } from '../middlewares/isAuth';
import express, { Request, Response } from 'express';
const router = express.Router();


router.get('/users', async (req: Request, res: Response) => {
    try {
        const usuarios = await userController.getAll()
        return res.json(usuarios)
    } catch (err) {
        return res.sendStatus(400)
    }
})

router.post('/user', async (req: Request, res: Response) => {
    const { data } = req.body
    try {
        const novoUsuario = await userController.insertDocenteUsuario(data)
        return res.json(novoUsuario)
    } catch (err) {
        return res.sendStatus(400)
    }
})

router.put('/user/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    return res.send('put /user/:id')
    try {
        // const usuarioAlterado = await userController.update(parseInt(id))
        // return res.json(usuarioAlterado)
    } catch (err) {
        return res.sendStatus(400)
    }
})

router.delete('/user/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const usuarioDeletado = await userController.deleteById(parseInt(id))
        return res.json(usuarioDeletado)
    } catch (err) {
        return res.sendStatus(400)
    }
})

router.post('/login', async (req: Request, res: Response) => {
    const { login, senha } = req.body
    try {
        const { status, token, msg } = await userController.login({ login, senha })
        if (token) {
            return res.status(status).json(token)
        } else {
            return res.status(status).send(msg)
        }
    } catch (err) {
        return res.sendStatus(400)
    }
})

router.get('/ping', isAuth, async (req: Request, res: Response) => {
    return res.json("token válido")
})


export default router