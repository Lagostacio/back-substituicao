import * as docenteCicloLetivoController from '../controllers/docenteCicloLetivoController'
import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/docentes-ciclos-letivos', async (req: Request, res: Response) => {
    try {
        const docenteCicloLetivos = await docenteCicloLetivoController.getAll()
        return res.json(docenteCicloLetivos)
    } catch (err) {
        return res.sendStatus(400)
    }
})

router.post('/docente-ciclo-letivo', async (req: Request, res: Response) => {
    const { data } = req.body
    try {
        const novodocenteCicloLetivo = await docenteCicloLetivoController.insertOne(data)
        return res.json(novodocenteCicloLetivo)
    } catch (err) {
        return res.sendStatus(400)
    }
})

router.put('/docente-ciclo-letivo/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    return res.send('put /docenteCicloLetivo/:id')
    try {
        // const docenteCicloLetivoAlterado = await docenteCicloLetivoController.update(parseInt(id))
        // return res.json(docenteCicloLetivoAlterado)
    } catch (err) {
        return res.sendStatus(400)
    }
})

router.delete('/docente-ciclo-letivo/:docenteId/:cicloLetivoId', async (req: Request, res: Response) => {
    const { docenteId, cicloLetivoId } = req.params
    try {
        const docenteCicloLetivoDeletado = await docenteCicloLetivoController.deleteByIds(parseInt(docenteId), parseInt(cicloLetivoId))
        return res.json(docenteCicloLetivoDeletado)
    } catch (err) {
        return res.sendStatus(400)
    }
})

export default router