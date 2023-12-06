import * as ofertaController from '../controllers/ofertaController'
import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/ofertas', async (req: Request, res: Response) => {
    try {
        const ofertas = await ofertaController.getAll()
        return res.json(ofertas)
    } catch (err) {
        return res.sendStatus(400)
    }
})

router.post('/oferta', async (req: Request, res: Response) => {
    const { data } = req.body
    try {
        const novaOferta = await ofertaController.insertOne(data)
        return res.json(novaOferta)
    } catch (err) {
        return res.sendStatus(400)
    }
})

router.put('/oferta/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    return res.send('put /oferta/:id')
    try {
        // const ofertaAlterado = await ofertaController.update(parseInt(id))
        // return res.json(ofertaAlterado)
    } catch (err) {
        return res.sendStatus(400)
    }
})

router.delete('/oferta/:docenteId/:turmaId/:cicloLetivoId/:disciplinaId', async (req: Request, res: Response) => {
    const { id } = req.params
    const docenteId: number = parseInt(req.params.docenteId)
    const turmaId: number = parseInt(req.params.turmaId)
    const cicloLetivoId: number = parseInt(req.params.cicloLetivoId)
    const disciplinaId: number = parseInt(req.params.disciplinaId)
    try {
        const ofertaDeletado = await ofertaController.deleteByIds(docenteId,turmaId,cicloLetivoId,disciplinaId)
        return res.json(ofertaDeletado)
    } catch (err) {
        return res.sendStatus(400)
    }
})

export default router