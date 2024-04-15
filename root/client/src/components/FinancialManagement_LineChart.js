import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { startOfMonth, endOfMonth, eachDayOfInterval, format } from 'date-fns';

const LineChart = ({ year, month }) => {
  const [incomeData, setIncomeData] = useState([]);
  const [outgoingData, setOutgoingData] = useState([]);

  useEffect(() => {
    fetchIncomeData();
    fetchOutgoingData();
  }, [year, month]);

  const fetchIncomeData = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/payment/?month=${month}&year=${year}`);
      setIncomeData(response.data);
    } catch (error) {
      console.error("Error fetching income data:", error);
    }
  };

  const fetchOutgoingData = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/outgoing/?month=${month}&year=${year}`);
      setOutgoingData(response.data);
    } catch (error) {
      console.error("Error fetching outgoing data:", error);
    }
  };

  // Generate array of all dates in the selected month and year
  const currentDate = new Date(year, month - 1, 1); // Month index starts from 0
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);
  const allDatesOfMonth = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth });

  // Extract date part from date (YYYY-MM-DD format)
  const formatDate = (date) => format(date, 'yyyy-MM-dd');

  // Generate array of labels (dates) for the x-axis
  const dates = allDatesOfMonth.map(formatDate);

  // Calculate total income amount for each date with status "confirm"
  const incomeByDate = {};
  incomeData.forEach((income) => {
    if (income.status === "confirm") {
      const date = formatDate(new Date(income.date));
      incomeByDate[date] = (incomeByDate[date] || 0) + income.amountPaid;
    }
  });

  // Calculate total outgoing amount for each date with status "confirm"
  const outgoingByDate = {};
  outgoingData.forEach((outgoing) => {
    if (outgoing.status === "confirm") {
      const date = formatDate(new Date(outgoing.date));
      outgoingByDate[date] = (outgoingByDate[date] || 0) + outgoing.amount;
    }
  });

  // Fill in missing data with 0 for both income and outgoing
  const incomes = dates.map((date) => incomeByDate[date] || 0);
  const outgoings = dates.map((date) => outgoingByDate[date] || 0);

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow chart to adjust its size
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Line Chart: Daily Income and Outgoing Comparison",
      },
    },
  };

  // Chart data
  const data = {
    labels: dates,
    datasets: [
      {
        label: "Daily Outgoing",
        data: outgoings,
        fill: false,
        borderColor: "rgba(255, 159, 64)",
        tension: 0.1,
      },
      {
        label: "Daily Income",
        data: incomes,
        fill: false,
        borderColor: "rgba(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div style={{ width: "100%", minHeight: "300px" }}>
      <Line options={options} data={data} />
    </div>
  );
};

export default LineChart;
