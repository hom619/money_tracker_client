import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { AiFillDollarCircle } from "react-icons/ai";
import { useUser } from "../context/UserContext";
import { AiOutlineTransaction } from "react-icons/ai";
import { IoMdTrendingUp } from "react-icons/io";
import { IoMdTrendingDown } from "react-icons/io";
import { FaScaleBalanced } from "react-icons/fa6";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { GoBell } from "react-icons/go";
import { HiUserCircle } from "react-icons/hi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Rectangle,
  ResponsiveContainer,
  PieChart,
  Pie,
  Sector,
  Cell,
  Line,
  LineChart,
  AreaChart,
  Area,
} from "recharts";
export const Dashboard = () => {
  const [displayTransactions, setDisplayTransactions] = useState([]);
  const { transactions, getAllTransactions, user } = useUser();
  // Fetch data on mount only
  useEffect(() => {
    getAllTransactions();
  }, []);

  // Sync local display state whenever transactions change
  useEffect(() => {
    setDisplayTransactions(transactions);
  }, [transactions]);
  const today = new Date();
  const firstDayOfCurrentMonth = new Date(
    today.getFullYear(),
    today.getMonth(),
    1
  );
  const lastDayOfPreviousMonth = new Date(firstDayOfCurrentMonth);
  lastDayOfPreviousMonth.setDate(lastDayOfPreviousMonth.getDate() - 1);
  const firstDayOfPreviousMonth = new Date(
    lastDayOfPreviousMonth.getFullYear(),
    lastDayOfPreviousMonth.getMonth(),
    1
  );
  const previousMonthTransactions = displayTransactions.filter(
    (transaction) => {
      const transactionDate = new Date(transaction.tranDate); // Ensure it's a Date object
      return (
        transactionDate >= firstDayOfPreviousMonth &&
        transactionDate <= lastDayOfPreviousMonth
      );
    }
  );
  const previousMonthBalance =
    previousMonthTransactions
      .filter((t) => t.type === "income")
      .reduce((acc, tran) => acc + tran.amount, 0) -
    previousMonthTransactions
      .filter((t) => t.type === "expense")
      .reduce((acc, tran) => acc + tran.amount, 0);
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const currentMonthTransactions = displayTransactions.filter((transaction) => {
    const transactionDate = new Date(transaction.tranDate); // Ensure it's a Date object
    return (
      transactionDate.getMonth() === currentMonth &&
      transactionDate.getFullYear() === currentYear
    );
  });
  const comparisonDateLength =
    currentMonthTransactions.length - previousMonthTransactions.length;
  const income = displayTransactions
    .filter((t) => t.type === "income")
    .reduce((acc, tran) => acc + tran.amount, 0);
  const expense = displayTransactions
    .filter((t) => t.type === "expense")
    .reduce((acc, tran) => acc + tran.amount, 0);
  const totalBudget = income + expense;
  const balance = income - expense;
  const data = Object.values(
    displayTransactions.reduce((acc, { tranDate, amount, type }) => {
      const date = tranDate.slice(0, 10);
      if (!acc[date]) {
        acc[date] = { tranDate: date, income: 0, expense: 0 };
      }
      acc[date][type] += amount;
      return acc;
    }, {})
  ).sort((a, b) => new Date(a.tranDate) - new Date(b.tranDate));
  return (
    <>
      <Container className="p-3">
        <div
          className="dashboardCounts rounded p-3 d-flex justify-content-end gap-2"
          style={{ background: "#F7F7F7" }}
        >
          <div className="topDasboardItems">
            <HiOutlineEnvelope />
          </div>
          <div className="topDasboardItems">
            <GoBell />
          </div>
          <div className="d-flex align-items-center gap-2 mr-5">
            <HiUserCircle
              style={{ width: "50px", height: "40px", color: "#e5e4e2" }}
            />
            <div className="d-flex flex-column">
              <label className="text-dark">{user?.name}</label>
              <label className="text-secondary"> {user?.email}</label>
            </div>
          </div>
        </div>
        <div
          className="dashboardCounts p-3 rounded d-flex justify-content-between align-items-center"
          style={{ background: "#F7F7F7" }}
        >
          <div
            className="dashboardCounts text-white p-2 rounded"
            style={{
              border: "1px solid #ccc",
              background:
                balance < 0
                  ? "#e41c38"
                  : "linear-gradient(to bottom right, #ef9b0f, #2e8b57, #00573f)",
            }}
          >
            <div>
              <FaScaleBalanced />
              Total Balance
            </div>
            <div className="text-start fw-bold fs-1">${balance}</div>
            <label style={{ fontSize: "12px", color: "#FADA5E" }}>
              Balance Last Month: ${previousMonthBalance}
            </label>
          </div>
          <div
            className="dashboardCounts bg-white p-2 rounded"
            style={{ border: "1px solid #ccc", color: "grey" }}
          >
            <div>
              <AiOutlineTransaction />
              Total Transactions
            </div>

            <div
              className="text-start fw-bold fs-1"
              style={{ color: "#00573F" }}
            >
              {transactions.length}
            </div>
            <label style={{ fontSize: "12px", color: "#228B22" }}>
              {comparisonDateLength > 0
                ? `${comparisonDateLength + 1} increased from last month`
                : `${comparisonDateLength + 1} decreased from last month`}
            </label>
          </div>

          <div
            className="dashboardCounts bg-white p-2 rounded"
            style={{ border: "1px solid #ccc", color: "grey" }}
          >
            <div>
              <AiFillDollarCircle />
              Total Income
            </div>
            <div
              className="text-start fw-bold fs-1"
              style={{ color: "#00573F" }}
            >
              ${income}
            </div>
            <label style={{ color: "#00AB66" }}>
              <IoMdTrendingUp />
              {((income / totalBudget) * 100).toFixed(2)}%
            </label>
          </div>
          <div
            className="dashboardCounts bg-white p-2 rounded"
            style={{ border: "1px solid #ccc", color: "grey" }}
          >
            <div>
              <AiFillDollarCircle />
              Total Expense
            </div>
            <div
              className="text-start fw-bold fs-1"
              style={{ color: "#00573F" }}
            >
              ${expense}
            </div>
            <div>
              <label style={{ color: "#e41c38" }}>
                {" "}
                <IoMdTrendingDown />
                {((expense / totalBudget) * 100).toFixed(2)}%
              </label>
            </div>
          </div>
        </div>
        <div
          className=" dashboardCounts p-5 rounded"
          style={{ background: "#F7F7F7" }}
        >
          <ResponsiveContainer width={"100%"} height={300}>
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="tranDate" />
              <YAxis />
              <Legend />
              <Tooltip />
              <Bar
                dataKey="income"
                fill="#B3CDAD"
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              />
              <Bar
                dataKey="expense"
                fill="#FF5F5E"
                activeBar={<Rectangle fill="gold" stroke="purple" />}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div
          className="dashboardCounts p-5 rounded"
          style={{ background: "#F7F7F7" }}
        >
          <ResponsiveContainer width={"100%"} height={300}>
            <AreaChart
              width={500}
              height={400}
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="tranDate" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="expense"
                stroke="#ED2939"
                fill="#ED2939"
              />
              <Area
                type="monotone"
                dataKey="income"
                stroke="#3CB371"
                fill="#3CB371"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div
          className=" mt-3 rounded d-flex justify-content-between"
          style={{
            boxSizing: "border-box",
            overflow: "hidden",
            maxWidth: "100%",
            background: "#F7F7F7",
          }}
        >
          <div className="dashboardCounts bg-white rounded p-2">
            <ResponsiveContainer width={"100%"} height={300}>
              <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="tranDate" padding={{ left: 20, right: 20 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#177245"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className=" dashboardCounts bg-white rounded p-2">
            <ResponsiveContainer width={"100%"} height={300}>
              <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="tranDate" padding={{ left: 20, right: 20 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="expense"
                  stroke="#ED2939"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Container>
    </>
  );
};
