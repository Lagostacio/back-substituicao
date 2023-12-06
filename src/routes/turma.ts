import * as turmaController from '../controllers/turmaController'
import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/turmas', async (req: Request, res: Response) => {
    try {
        const turmas = await turmaController.getAll()
        return res.json(turmas)
    } catch (err) {
        return res.sendStatus(400)
    }
})

router.post('/turma', async (req: Request, res: Response) => {
    const { data } = req.body
    try {
        const novoturma = await turmaController.insertOne(data)
        return res.json(novoturma)
    } catch (err) {
        return res.sendStatus(400)
    }
})

router.put('/turma/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    return res.send('put /turma/:id')
    try {
        // const turmaAlterado = await turmaController.update(parseInt(id))
        // return res.json(turmaAlterado)
    } catch (err) {
        return res.sendStatus(400)
    }
})

router.delete('/turma/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const turmaDeletada = await turmaController.deleteById(parseInt(id))
        return res.json(turmaDeletada)
    } catch (err) {
        return res.sendStatus(400)
    }
})

export default router