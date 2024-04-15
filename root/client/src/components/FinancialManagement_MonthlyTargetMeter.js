import React, { useState, useEffect } from "react";
import styled from "styled-components";

const MonthlyTargetMeter = ({ incomeAchieved }) => {
  const [targetIncome, setTargetIncome] = useState(0);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Calculate the percentage of completion
    const calculatedPercentage = (incomeAchieved / targetIncome) * 100;
    setPercentage(calculatedPercentage);
  }, [incomeAchieved, targetIncome]);

  const fetchData = async () => {
    try {
      // Mock fetching targetIncome from the database
      // In a real scenario, replace this with actual data fetching
      const target = await fetchTargetIncome(); // Fetch targetIncome
      setTargetIncome(target);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchTargetIncome = async () => {
    // Simulate fetching targetIncome (replace this with your actual fetching mechanism)
    return 5000; // Mocked targetIncome
  };

  const circumference = 2 * Math.PI * 40;
  const dashOffset = ((100 - percentage) / 100) * circumference;

  return (
    <MeterContainer>
      <CircularMeter viewBox="0 0 100 100">
        <Circle cx="50" cy="50" r="40" />
        <Percentage
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#007bff"
          strokeWidth="12"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={dashOffset}
        />
        <PercentageText
          x="50"
          y="55"
          dominantBaseline="middle"
          textAnchor="middle"
        >
          {isNaN(percentage) ? 0 : percentage.toFixed(2)}% {/* Handle NaN */}
        </PercentageText>
      </CircularMeter>
      <LabelContainer>
        <Label>Monthly Target: ${targetIncome}</Label>
        <Label>Income Achieved: ${incomeAchieved}</Label>
      </LabelContainer>
    </MeterContainer>
  );
};

const MeterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CircularMeter = styled.svg`
  width: 150px;
  height: 150px;
`;

const Circle = styled.circle`
  fill: none;
  stroke: #f0f0f0;
  strokeWidth: 12;
`;

const Percentage = styled.circle`
  fill: none;
  stroke-width: 12;
  stroke-linecap: round;
  transform: rotate(-90deg);
  transform-origin: center;
`;

const PercentageText = styled.text`
  font-size: 16px;
  font-weight: bold;
  fill: #007bff;
`;

const LabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.div`
  margin-top: 10px;
  font-size: 14px;
`;

export default MonthlyTargetMeter;
