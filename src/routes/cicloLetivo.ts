import * as cicloLetivoController from '../controllers/cicloLetivoController'
import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/ciclos-letivos', async (req: Request, res: Response) => {
    try {
        const cicloLetivos = await cicloLetivoController.getAll()
        return res.json(cicloLetivos)
    } catch (err) {
        return res.sendStatus(400)
    }
})

router.post('/ciclo-letivo', async (req: Request, res: Response) => {
    const { data } = req.body
    try {
        const novocicloLetivo = await cicloLetivoController.insertOne(data)
        return res.json(novocicloLetivo)
    } catch (err) {
        return res.sendStatus(400)
    }
})

router.put('/ciclo-letivo/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    return res.send('put /cicloLetivo/:id')
    try {
        // const cicloLetivoAlterado = await cicloLetivoController.update(parseInt(id))
        // return res.json(cicloLetivoAlterado)
    } catch (err) {
        return res.sendStatus(400)
    }
})

router.delete('/ciclo-letivo/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const cicloLetivoDeletado = await cicloLetivoController.deleteById(parseInt(id))
        return res.json(cicloLetivoDeletado)
    } catch (err) {
        return res.sendStatus(400)
    }
})

export default router