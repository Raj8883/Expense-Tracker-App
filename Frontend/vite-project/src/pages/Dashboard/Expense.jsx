import React from 'react';
import { useUserAuth } from '../../hooks/useUserAuth'
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { API_PATHS } from '../../utils/apiPath';
import axiosInstance from '../../utils/axiosinstance';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import ExpenseList from '../../components/Expense/ExpenseList';
import DeleteAlert from '../../components/DeleteAlert';

const Expense = () => {
    useUserAuth();

    const [expenseData, setExpenseData] = useState([]);
    const [loading, setLoading] = useState(false)
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null,
    });
    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

    // Get All Expense Details 
    const fetchExpenseDetails = async () => {
        if (loading) return;

        setLoading(true);
        try {
            const response = await axiosInstance.get(`${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`);

            if (response.data) {
                setExpenseData(response.data);
            }
        } catch (error) {
            console.log("Something went wrong, pleae try again..", error);
        } finally {
            setLoading(false);
        }
    };

    // Handle Add Expense 
    const handleAddExpense = async (expense) => {
        const { category, amount, date, icon } = income;

        if (!category.trim()) {
            toast.error("category is required..")
            return;
        }

        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            toast.error("Amount should be a valid number greater than 0..")
            return;
        }

        if (!date) {
            toast.error("Date is required");
            return;
        }

        try {
            await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
                category,
                amount,
                date,
                icon,
            });
            setOpenAddExpenseModal(false);
            toast.success("Expense added successfully..");
            fetchExpenseDetails();
        } catch (error) {
            console.error("error adding Expense!!", error.response?.data?.message || error.message);
        };
    };

    // Delete Expense 
    const deleteExpense = async (id) => {
        try {
            await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));

            setOpenDeleteAlert({ show: false, data: null });
            toast.success("Expense details deleted successfully...");
            fetchIncomeDetails();
        } catch (error) {
            console.error("Error deleting Expense:", error.response?.data?.message || error.message);
        }
    };


    // handle download Expense details 
    const handleDownloadExpenseDetails = async (id) => {
        try {
            const response = await axiosInstance.get(API_PATHS.EXPENSE.DONWLOAD_EXPENSE, {
                responseType: "blob",
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "expense_details.xlsx");
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error downloading expense details", error);
            toast.error("Failed to download expense details, please try again..");
        }
    };

    useEffect(() => {
        fetchExpenseDetails();
        return () => {

        };
    }, []);
    return (
        <DashboardLayout activeMenu="Expense">
            <div className='my-5 mx-auto'>
                <div className="grid grid-cols-1 gap-6">
                    <div className="">
                        <ExpenseOverview
                            transactions={expenseData}
                            onExpenseIncome={() => setOpenAddExpenseModal(true)}
                        />
                    </div>
                </div>

                <ExpenseList
                    transactions={expenseData}
                    onDelete={(id) => {
                        setOpenDeleteAlert({ show: true, data: id });
                    }}
                    onDownload={handleDownloadExpenseDetails}
                />

                <Modal
                    isopen={openAddExpenseModal}
                    onClose={() => setOpenAddExpenseModal(false)}
                    title="Add Expense">
                    < AddExpenseForm onAddExpense={handleAddExpense} />
                </Modal>

                <Modal
                    isopen={openDeleteAlert.show}
                    onClose={() => setOpenDeleteAlert({ show: false, data: null })}
                    title="Delete expense">
                    <DeleteAlert
                        content="Are you sure you wnat to delete this income details?.."
                        onDelete={() => deleteExpense(openDeleteAlert.data)}
                    />
                </Modal>
            </div>
        </DashboardLayout>
    )
}

export default Expense
