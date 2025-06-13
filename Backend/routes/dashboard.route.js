import express from 'express'
import { protect } from '../Middlewares/auth.middleware'
import {getDashboardData} from '../controllers/dashboard.controller.js'

const router = express.Router();

router.get('/',protect,getDashboardData);

export default router;