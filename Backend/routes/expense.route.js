import express from 'express'
import { protect } from '../Middlewares/auth.middleware.js'
import {
    addExpense,
    getAllExpense,
    deleteExpense,
    downloadExpenseExcel
} from '../controllers/expense.controller.js'

const router = express.Router();

router.post("/add", protect, addExpense);
router.post("/get", protect, getAllExpense);
router.post("/downloadexcel", protect, downloadExpenseExcel);
router.post("/:id", protect, deleteExpense);

export default router;