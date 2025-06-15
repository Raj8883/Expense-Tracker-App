import React from 'react'
const COLORS=["#875C5","#FA2C37","#FF6900"];

const FinanceOverview = ({totalBalance ,totalIncome ,totalExpense}) => {

    const balancedata = [
            {name:"Total Balance",amount:totalBalance},
            {name:"Total Expenses",amount:totalExpense},
            {name:"Total Income",amount:totalIncome}
        ];

  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Financial Overview</h5>
      </div>

      <CustomePieChart 
      dta={balancedata}
      label="Totla Balance"
      totalAmount={`$${totalBalance}`}
      colors={COLORS}
      showTextAnchor
      />
    </div>
  )
}

export default FinanceOverview
