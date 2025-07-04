import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosinstance'
import { API_PATHS } from '../../utils/apiPath';
import InfoCard from '../../components/Cards/InfoCard';
import { LuHandCoins,LuWalletMinimal } from 'react-icons/lu';
import {IoMdCard } from 'react-icons/io'
import {addThousandsSeparator} from '../../utils/helper'
import RecentTransactions from '../../components/dashboard/Recenttransactions';
import FinanceOverview from '../../components/Dashboard/FinanceOverview'
import ExpenseTransactions from '../../components/Dashboard/ExpenseTransactions';
import Last30DaysExpesnes from '../../components/Dashboard/Last30DaysExpesnes'
import RecentIncomeWithChart from '../../components/Dashboard/RecentIncomeWithChart';
import RecentIncome from '../../components/Dashboard/RecentIncome'

const Home = () => {
  useUserAuth();
  const navigate=useNavigate();

  const [dashboardData,setDashboardData]=useState(null);
  const [loading,setLoading]=useState(false);

  const fetchdashboardData = async ()=>{
    if(loading) return;

    setLoading(true);
    try {
      const response = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`

      );
      if(response.data){
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("something went wrong.please try agian...",error);
    }finally{
      setLoading(false);
    }
  };

  useEffect(()=>{
    fetchdashboardData();
    return ()=>{};
  },[]);
  return (
    <DashboardLayout activeMenu="Dashboard">
    <div className='my-5 mx-auto'>
      <div className='gird gird-cols-1 md:grid-cols-3 gap-6'>
        <InfoCard
        icon={<IoMdCard/>}
        label="Total Balance"
        value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
        color="bg-purple-300"
        />

        <InfoCard
        icon={<LuWalletMinimal/>}
        label="Total Income"
        value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
        color="bg-orange-500"
        />

        <InfoCard
        icon={<LuHandCoins/>}
        label="Total Expense"
        value={addThousandsSeparator(dashboardData?.totalExpense || 0)}
        color="bg-red-500"
        />

      </div>
      <div className='gird grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
        <RecentTransactions
        transactions={dashboardData?.recentTransactions}
        onseeMore={()=>navigate("/expense")}
        />

        <FinanceOverview 
        totalBalance ={dashboardData?.totalBalance||0}
        totalIncome ={dashboardData?.totalIncome||0}
        totalExpense ={dashboardData?.totalExpensee||0}
        />

        <ExpenseTransactions 
        transactions={dashboardData?.last30DaysExpesne?.transactions || []}
        onseeMore={()=>navigate("/expense")}
        />

        <Last30DaysExpesnes
        data={dashboardData?.last30DaysExpesnes?.transactions || []}
        />

        < RecentIncomeWithChart
        data={dashboardData?.last60DaysIncome?.transactions?.slice(0,4)|| []}
        totalIncome={dashboardData?.totalIncome|| 0}
        />

        < RecentIncome 
        transactions={dashboardData?.last60DaysIncome?.transactions|| []}
        onseeMore={()=>navigate("/income")}
        />

      </div>
    </div>
    </DashboardLayout> 
  );
}

export default Home
