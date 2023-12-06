import * as docenteController from '../controllers/docenteController'
import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/docentes', async (req: Request, res: Response) => {
    try {
        const docentes = await docenteController.getAll()
        return res.json(docentes)
    } catch (err) {
        return res.sendStatus(400)
    }
})

// router.post('/docente', async (req: Request, res: Response) => {
//     const { data } = req.body
//     try {
//         const novodocente = await docenteController.insertWithUserId(data)
//         return res.json(novodocente)
//     } catch (err) {
//         return res.sendStatus(400)
//     }
// })

router.put('/docente/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    return res.send('put /docente/:id')
    try {
        // const docenteAlterado = await docenteController.update(parseInt(id))
        // return res.json(docenteAlterado)
    } catch (err) {
        return res.sendStatus(400)
    }
})

router.delete('/docente/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const docenteDeletado = await docenteController.deleteById(parseInt(id))
        return res.json(docenteDeletado)
    } catch (err) {
        return res.sendStatus(400)
    }
})

export default router