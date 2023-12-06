import * as disciplinaController from '../controllers/disciplinaController'
import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/disciplinas', async (req: Request, res: Response) => {
    try {
        const disciplinas = await disciplinaController.getAll()
        return res.json(disciplinas)
    } catch (err) {
        return res.sendStatus(400)
    }
})

router.post('/disciplina', async (req: Request, res: Response) => {
    const { data } = req.body
    try {
        const novodisciplina = await disciplinaController.insertOne(data)
        return res.json(novodisciplina)
    } catch (err) {
        return res.sendStatus(400)
    }
})

router.put('/disciplina/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    return res.send('put /disciplina/:id')
    try {
        // const disciplinaAlterado = await disciplinaController.update(parseInt(id))
        // return res.json(disciplinaAlterado)
    } catch (err) {
        return res.sendStatus(400)
    }
})

router.delete('/disciplina/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const disciplinaDeletado = await disciplinaController.deleteById(parseInt(id))
        return res.json(disciplinaDeletado)
    } catch (err) {
        return res.sendStatus(400)
    }
})

export default router