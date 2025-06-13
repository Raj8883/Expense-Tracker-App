import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.config.js';
import {authRoutes} from './routes/auth.route.js'
import {incomeRoutes} from './routes/income.route.js'
import {expenseRoutes} from './routes/expense.route.js'
import {dashboardRoutes} from './routes/dashboard.route.js'

dotenv.config();
const app=express();

// middleware to handle cors 
app.use(
    cors({
        origin: process.env.CLIENT_URL || '*',
        methods:['GET','POST','PUT','DELETE'],
        allowedHeaders:['Content-Type','Authorization'],
    })
);

app.use(express.json());


connectDB();

app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/income',incomeRoutes);
app.use('/api/v1/expense',expenseRoutes);
app.use('/api/v1/dashboard',dashboardRoutes);

// serve uploads folder 
app.use("/uploads",express.static(path.join(__dirname,"uploads")));



const PORT=process.env.PORT||5000;
app.listen(PORT,()=>console.log(`server running on port ${PORT}`));