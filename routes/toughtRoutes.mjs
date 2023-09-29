import express from 'express';
import ToughtController from '../controllers/ToughtController.mjs';

//helpers
import checkAuth from '../helpers/auth.mjs';

const router = express.Router()

router.get('/add', checkAuth, ToughtController.createTought)
router.post('/add', checkAuth, ToughtController.createToughtSave)
router.get('/dashboard', checkAuth, ToughtController.dashboard)
router.post('/remove', checkAuth, ToughtController.removeTought)
router.get('/', ToughtController.showToughts)

export default router;