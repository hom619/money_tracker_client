import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { AiFillDollarCircle, AiOutlineTransaction } from "react-icons/ai";
import { IoMdTrendingUp, IoMdTrendingDown } from "react-icons/io";
import { FaScaleBalanced } from "react-icons/fa6";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { GoBell } from "react-icons/go";
import { HiUserCircle } from "react-icons/hi";
import { MonthPicker } from "../components/MonthPicker";
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
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import { useUser } from "../context/UserContext";

export const Dashboard = () => {
  const [displayTransactions, setDisplayTransactions] = useState([]);
  const [previousMonthBalance, setPreviousMonthBalance] = useState(0);
  const [previousMonthTransactions, setPreviousMonthTransactions] = useState(
    []
  );
  const firstLoadRef = useRef(true);
  const [selectedMonth, setSelectedMonth] = useState(null);

  const { transactions, getAllTransactions, user } = useUser();

  useEffect(() => {
    getAllTransactions();
  }, []);

  useEffect(() => {
    if (transactions.length > 0) {
      setDisplayTransactions(transactions);
      updateMonthData(selectedMonth ?? new Date()); // Initial comparison
    }
  }, [transactions]);

  const updateMonthData = (date) => {
    const selected = date ?? new Date();

    const currentStart = new Date(
      selected.getFullYear(),
      selected.getMonth(),
      1
    );
    const currentEnd = new Date(
      selected.getFullYear(),
      selected.getMonth() + 1,
      0
    );

    const previousStart = new Date(
      selected.getFullYear(),
      selected.getMonth() - 1,
      1
    );
    const previousEnd = new Date(
      selected.getFullYear(),
      selected.getMonth(),
      0
    );

    const previousMonthTrans = transactions.filter((t) => {
      const d = new Date(t.tranDate);
      return d >= previousStart && d <= previousEnd;
    });

    setPreviousMonthTransactions(previousMonthTrans);

    const prevIncome = previousMonthTrans
      .filter((t) => t.type === "income")
      .reduce((acc, t) => acc + t.amount, 0);

    const prevExpense = previousMonthTrans
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => acc + t.amount, 0);

    setPreviousMonthBalance(prevIncome - prevExpense);

    if (firstLoadRef.current) {
      // First load — show all transactions
      setDisplayTransactions(transactions);
      setCompareTranLength(transactions.length - previousMonthTrans.length);
      firstLoadRef.current = false;
    } else {
      // After first load — filter by selected month
      const currentMonthTrans = transactions.filter((t) => {
        const d = new Date(t.tranDate);
        return d >= currentStart && d <= currentEnd;
      });

      setDisplayTransactions(currentMonthTrans);
      setCompareTranLength(
        currentMonthTrans.length - previousMonthTrans.length
      );
    }
  };

  const handleOnSearchByMonth = (date) => {
    setSelectedMonth(date);
    updateMonthData(date);
  };

  const income = displayTransactions
    .filter((t) => t.type === "income")
    .reduce((acc, tran) => acc + tran.amount, 0);

  const expense = displayTransactions
    .filter((t) => t.type === "expense")
    .reduce((acc, tran) => acc + tran.amount, 0);

  const totalBudget = income + expense;
  const balance = income - expense;

  const [compareTranLength, setCompareTranLength] = useState(0);
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
    <Container fluid className="p-3">
      {/* Top Section */}
      <Row
        className="dashboardCounts rounded p-3 mb-3"
        style={{ background: "#F7F7F7" }}
      >
        <Col className="d-flex justify-content-end align-items-center gap-3">
          <div className="w-md-auto">
            <MonthPicker
              selectedMonth={selectedMonth}
              onChange={handleOnSearchByMonth}
            />
          </div>
          <div className="topDasboardItems">
            <HiOutlineEnvelope />
          </div>
          <div className="topDasboardItems">
            <GoBell />
          </div>
          <div className="d-flex align-items-center gap-2">
            <HiUserCircle
              style={{ width: "40px", height: "40px", color: "#e5e4e2" }}
            />
            <div className="d-flex flex-column">
              <label className="text-dark mb-0">{user?.name}</label>
              <label className="text-secondary">{user?.email}</label>
            </div>
          </div>
        </Col>
      </Row>

      {/* Summary Cards */}
      <Row
        className="dashboardCounts p-3 rounded mb-3 g-3"
        style={{ background: "#F7F7F7" }}
      >
        <Col xs={12} md={6} lg={3}>
          <div
            className="dashboardCounts text-white p-3 rounded"
            style={{
              border: "1px solid #ccc",
              background:
                balance < 0
                  ? "#e41c38"
                  : "linear-gradient(to bottom right, #ef9b0f, #2e8b57, #00573f)",
            }}
          >
            <div>
              <FaScaleBalanced /> Total Balance
            </div>
            <div className="text-start fw-bold fs-1">${balance}</div>
            <label style={{ fontSize: "12px", color: "#FADA5E" }}>
              Last Month: ${previousMonthBalance}
            </label>
          </div>
        </Col>

        <Col xs={12} md={6} lg={3}>
          <div
            className="dashboardCounts bg-white p-3 rounded"
            style={{ border: "1px solid #ccc", color: "grey" }}
          >
            <div>
              <AiOutlineTransaction /> Total Transactions
            </div>
            <div
              className="text-start fw-bold fs-1"
              style={{ color: "#00573F" }}
            >
              {displayTransactions?.length}
            </div>
            <label style={{ fontSize: "12px", color: "#228B22" }}>
              {compareTranLength >= 0
                ? `${compareTranLength} ↑ from last month`
                : `${Math.abs(compareTranLength)} ↓ from last month`}
            </label>
          </div>
        </Col>

        <Col xs={12} md={6} lg={3}>
          <div
            className="dashboardCounts bg-white p-3 rounded"
            style={{ border: "1px solid #ccc", color: "grey" }}
          >
            <div>
              <AiFillDollarCircle /> Total Income
            </div>
            <div
              className="text-start fw-bold fs-1"
              style={{ color: "#00573F" }}
            >
              ${income}
            </div>
            <label style={{ color: "#00AB66" }}>
              <IoMdTrendingUp />{" "}
              {((income / totalBudget) * 100 || 0).toFixed(2)}%
            </label>
          </div>
        </Col>

        <Col xs={12} md={6} lg={3}>
          <div
            className="dashboardCounts bg-white p-3 rounded"
            style={{ border: "1px solid #ccc", color: "grey" }}
          >
            <div>
              <AiFillDollarCircle /> Total Expense
            </div>
            <div
              className="text-start fw-bold fs-1"
              style={{ color: "#00573F" }}
            >
              ${expense}
            </div>
            <label style={{ color: "#e41c38" }}>
              <IoMdTrendingDown />{" "}
              {((expense / totalBudget) * 100 || 0).toFixed(2)}%
            </label>
          </div>
        </Col>
      </Row>
      {/* Bar Chart */}
      <Row
        className="dashboardCounts p-3 rounded mb-3"
        style={{ background: "#F7F7F7" }}
      >
        <Col xs={12}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="tranDate" />
              <YAxis />
              <Tooltip />
              <Legend />
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
        </Col>
      </Row>

      {/* Area Chart */}
      <Row
        className="dashboardCounts p-3 rounded mb-3"
        style={{ background: "#F7F7F7" }}
      >
        <Col xs={12}>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
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
        </Col>
      </Row>

      {/* Two Line Charts */}
      <Row
        className="dashboardCounts p-3 rounded mb-3 g-3"
        style={{ background: "#F7F7F7" }}
      >
        <Col xs={12} md={6}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="tranDate" />
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
        </Col>
        <Col xs={12} md={6}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="tranDate" />
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
        </Col>
      </Row>
    </Container>
  );
};
