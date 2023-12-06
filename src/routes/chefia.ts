import * as chefiaController from '../controllers/chefiaController'
import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/chefias', async (req: Request, res: Response) => {
    try {
        const chefias = await chefiaController.getAll()
        return res.json(chefias)
    } catch (err) {
        return res.sendStatus(400)
    }
})

router.post('/chefia', async (req: Request, res: Response) => {
    const { data } = req.body
    try {
        const novochefia = await chefiaController.insertOne(data)
        return res.json(novochefia)
    } catch (err) {
        return res.sendStatus(400)
    }
})

router.put('/chefia/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    return res.send('put /chefia/:id')
    try {
        // const chefiaAlterado = await chefiaController.update(parseInt(id))
        // return res.json(chefiaAlterado)
    } catch (err) {
        return res.sendStatus(400)
    }
})

router.delete('/chefia/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const chefiaDeletado = await chefiaController.deleteById(parseInt(id))
        return res.json(chefiaDeletado)
    } catch (err) {
        return res.sendStatus(400)
    }
})

export default router