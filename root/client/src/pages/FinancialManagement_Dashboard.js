import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Analytic from "../components/FinancialManagement_Analytic";
import BarChart from "../components/FinancialManagement_BarChart";
import LineChart from "../components/FinancialManagement_LineChart";
import { getMonth, getYear } from "date-fns";

function Dashboard() {
  const [selectedYear, setSelectedYear] = useState(getYear(new Date()));
  const [selectedMonth, setSelectedMonth] = useState(getMonth(new Date()) + 1); // Month index starts from 0
  const [currentTime, setCurrentTime] = useState(new Date());
  const [monthlyTargetIncome, setMonthlyTargetIncome] = useState(5000); // Default target income

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  const handleMonthChange = (e) => {
    const monthName = e.target.value;
    // Convert month name to month index (0-indexed)
    const monthIndex =
      new Date(Date.parse(monthName + " 1, 2000")).getMonth() + 1;
    setSelectedMonth(monthIndex);
  };

  useEffect(() => {
    // Set default selected month to the current month
    setSelectedMonth(getMonth(new Date()) + 1);

    // Update current time every second
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <Section>
      <StyledWelcomeMessage>
        <h1>Welcome to Financial Management Dashboard!</h1>
        {/* <p>Current Date and Time: {currentTime.toLocaleString()}</p> */}
      </StyledWelcomeMessage>

      <RedCenteredText>
        <h5>
          Financial details about {selectedYear} / {getMonthName(selectedMonth)}
        </h5>
      </RedCenteredText>

      <div className="grid">
        <StyledSelectContainer>
          <label>Select Year: </label>
          <select value={selectedYear} onChange={handleYearChange}>
            {Array.from({ length: 10 }, (_, i) => (
              <option key={selectedYear - 5 + i} value={selectedYear - 5 + i}>
                {selectedYear - 5 + i}
              </option>
            ))}
          </select>
          <label>Select Month: </label>
          <select
            value={getMonthName(selectedMonth)}
            onChange={handleMonthChange}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={getMonthName(i + 1)}>
                {getMonthName(i + 1)}
              </option>
            ))}
          </select>
        </StyledSelectContainer>

        <Analytic year={selectedYear} month={selectedMonth} />

        <BarChart year={selectedYear} month={selectedMonth} />
        <LineChart year={selectedYear} month={selectedMonth} />
      </div>

    </Section>
  );
}

function getMonthName(monthIndex) {
  // Create a date object with the given month index and return its formatted month name
  return new Date(2000, monthIndex - 1, 1).toLocaleString("default", {
    month: "long",
  });
}

export default Dashboard;

const Section = styled.section`
  padding: 2rem;
  background-color: #f5f5fd;
  .grid {
    margin-top: 0.5rem;
    z-index: 2;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

const RedCenteredText = styled.div`
  text-align: center;
  color: red;
  margin-top: -20px;
`;

const StyledSelectContainer = styled.div`
  label {
    color: darkblue;
    margin-right: 0.5rem;
  }

  select {
    color: darkblue;
    background-color: #ffffff; /* White background */
    border: 1px solid darkblue;
    border-radius: 4px;
    padding: 0.5rem;
    margin-right: 1rem;
  }
`;

const StyledWelcomeMessage = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  margin-top: -2rem;

  h1 {
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.2rem;
  }
`;
