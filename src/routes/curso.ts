import * as cursoController from '../controllers/cursoController'
import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/cursos', async (req: Request, res: Response) => {
    try {
        const cursos = await cursoController.getAll()
        return res.json(cursos)
    } catch (err) {
        return res.sendStatus(400)
    }
})

router.post('/curso', async (req: Request, res: Response) => {
    const { data } = req.body
    try {
        const novocurso = await cursoController.insertOne(data)
        return res.json(novocurso)
    } catch (err) {
        return res.sendStatus(400)
    }
})

router.put('/curso/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    return res.send('put /curso/:id')
    try {
        // const cursoAlterado = await cursoController.update(parseInt(id))
        // return res.json(cursoAlterado)
    } catch (err) {
        return res.sendStatus(400)
    }
})

router.delete('/curso/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const cursoDeletado = await cursoController.deleteById(parseInt(id))
        return res.json(cursoDeletado)
    } catch (err) {
        return res.sendStatus(400)
    }
})

export default router