import userRouter from './routes/user'
import cursoRouter from './routes/curso'
import disciplinaRouter from './routes/disciplina'
import turmaRouter from './routes/turma'
import docenteRouter from './routes/docente'
import cicloLetivoRouter from './routes/cicloLetivo'
import coordenadorRouter from './routes/coodenador'
import chefiaRouter from './routes/chefia'
import docenteCicloLetivoRouter from './routes/docenteCicloLetivo'
import ofertaRouter from './routes/oferta'
import express from 'express'
const router = express.Router()



router.use(userRouter)
router.use(cursoRouter)
router.use(turmaRouter)
router.use(docenteRouter)
router.use(disciplinaRouter)
router.use(cicloLetivoRouter)
router.use(coordenadorRouter)
router.use(chefiaRouter)
router.use(docenteCicloLetivoRouter)
router.use(ofertaRouter)

export default router