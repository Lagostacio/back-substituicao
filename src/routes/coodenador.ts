import * as coordenadorController from '../controllers/coordenadorController'
import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/coordenadores', async (req: Request, res: Response) => {
    try {
        const coordenadors = await coordenadorController.getAll()
        return res.json(coordenadors)
    } catch (err) {
        return res.sendStatus(400)
    }
})

router.post('/coordenador', async (req: Request, res: Response) => {
    const { data } = req.body
    try {
        const novoCoordenador = await coordenadorController.insertOne(data)
        return res.json(novoCoordenador)
    } catch (err) {
        return res.sendStatus(400)
    }
})

router.put('/coordenador/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    return res.send('put /coordenador/:id')
    try {
        // const coordenadorAlterado = await coordenadorController.update(parseInt(id))
        // return res.json(coordenadorAlterado)
    } catch (err) {
        return res.sendStatus(400)
    }
})

router.delete('/coordenador/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const coordenadorDeletado = await coordenadorController.deleteById(parseInt(id))
        return res.json(coordenadorDeletado)
    } catch (err) {
        return res.sendStatus(400)
    }
})

export default router