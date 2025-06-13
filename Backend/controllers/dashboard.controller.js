import { Income } from "../models/Income.model";
import { Expense } from "../models/Expense.model";
import { isValidObjectId,Types } from "mongoose";

const getDashboardData = async (req , res)=>{
    try {
        const userId=req.user.id;
        const userObjectId = new Types.ObjectId(String(userId));

        // fetch total income & expense
        const totalIncome = await Income.aggregate([
            {$match :{userId:userObjectId}},
            {$group:{_id:null,total:{$sum:"$amount"}}},
        ]);

        console.log("totalIncome",{totalIncome,userId:isValidObjectId(userId)});

        const totalExpense = await Expense.aggregate([
            {$match :{userId:userObjectId}},
            {$group:{_id:null,total:{$sum:"$amount"}}},
        ]);

        // Get income Transcation in last 60 days 
        const incomeLast60Days=last60DaysIncomeTransactions.reduce(
        (sum ,transaction)=>sum+transaction.amount,
        0
        );

        // get expense transaction in last 30 days
        const last30daysExpenseTransaction=await Expense.find({
            userId,
            date:{$gate:new Date(Date.now()-30*24*60*60*1000)},
        }).sort({date:-1});

        // Get total expense in last 30 days 
        const expenseLast30Days=last30DaysExpenseTransactions.reduce(
        (sum ,transaction)=>sum+transaction.amount,
        0
        );

        // Fetch last 5 transactions (income+expense)
        const lastTrnasactions=[
            ...Expense(await Income.find({userId}).sort({date:-1}).limit(5)).map(
                (txn)=>({
                    ...txn.toObject(),
                    type:"expense",
                })
            ),
        ].sort((a,b)=>b.date-a.date);

        // final response
        res.json({
            totalBalance:
            (totalIncome[0]?.total||0)-(totalExpense[0]?.total||0),
            totalIncome:totalIncome[0]?.total||0,
            totalExpense:totalExpense[0]?.total||0,
            last30daysExpense:{
                total:expenseLast30Days,
                transaction:last30daysExpenseTransaction,
            },
            last60DaysIncome :{
                total:incomeLast60Days,
                transaction:last60DaysIncomeTransactions,
            },
            recentTransactions:lastTrnasactions,
        });

    } catch (error) {
        res.status(500).json({message:"server error",error});
    }
}

export {getDashboardData}