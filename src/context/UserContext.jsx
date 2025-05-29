import { createContext, useContext, useState } from "react";
import { getTransactions } from "../../helpers/axiosHelper";
export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [transactions, setTransactions] = useState([]);
  const getAllTransactions = async () => {
    const { status, transactions } = await getTransactions();
    status === "success" && setTransactions(transactions);
  };
  return (
    <UserContext.Provider
      value={{ user, setUser, getAllTransactions, transactions }}
    >
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => useContext(UserContext);
