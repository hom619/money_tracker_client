import { createContext, useContext, useState } from "react";
import { getTransactions } from "../../helpers/axiosHelper";
import { toast } from "react-toastify";
export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [editState, setEditState] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const getAllTransactions = async () => {
    const { status, transactions } = await getTransactions();
    status === "success" && setTransactions(transactions);
  };
  const [transactionById, setTransactionById] = useState([]);
  const [show, setShow] = useState(false);
  const [chartData, setChartData] = useState([]);
  const toggleModal = (value) => setShow(value);
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        getAllTransactions,
        transactions,
        toggleModal,
        setTransactionById,
        transactionById,
        setEditState,
        editState,
        show,
        chartData,
        setChartData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => useContext(UserContext);
