import express from 'express'
import { protect } from '../Middlewares/auth.middleware.js'
import {
    addIncome,
    getAllIncome,
    deleteIncome,
    downloadIncomeExcel
} from '../controllers/income.controller.js'

const router = express.Router();

router.post("/add", protect, addIncome);
router.post("/get", protect, getAllIncome);
router.post("/downloadexcel", protect, downloadIncomeExcel);
router.post("/:id", protect, deleteIncome);

export default router;