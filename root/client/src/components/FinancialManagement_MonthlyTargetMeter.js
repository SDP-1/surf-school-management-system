import React, { useState, useEffect } from "react";
import styled from "styled-components";

const MonthlyTargetMeter = ({ name, year, month, incomeAchieved }) => {
  const [targetIncome, setTargetIncome] = useState(0);
  const [newTarget, setNewTarget] = useState("");
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    fetchData();
  }, [name, year, month]); // Include year and month in the dependency array

  useEffect(() => {
    if (targetIncome === 0 && incomeAchieved === 0) {
      setPercentage(0);
    } else {
      // Calculate the percentage of completion
      const calculatedPercentage = Math.min(
        (incomeAchieved / targetIncome) * 100,
        100
      );
      setPercentage(calculatedPercentage);
    }
  }, [incomeAchieved, targetIncome]);

  const fetchData = async () => {
    try {
      // Make a GET request to fetch targetIncome
      const response = await fetch(
        `http://localhost:4000/monthlyTarget/byNameYearAndMonth/${name}/${year}/${month}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      // Check if data is empty or not as expected
      if (!data || !data.length) {
        setTargetIncome(0);
      }

      // Extract targetIncome from the response data
      const target = data[0].amount;

      // Set the targetIncome state
      setTargetIncome(target);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleUpdateTarget = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/monthlyTarget/updateByNameYearAndMonth/${name}/${year}/${month}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, year, month, amount: newTarget }), // Include name, year, and month in the request body
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update target");
      }

      // Fetch the updated targetIncome
      fetchData();
      // Clear the input field
      setNewTarget("");
    } catch (error) {
      console.error("Error updating target:", error);
    }
  };

  const circumference = 2 * Math.PI * 40;
  const dashOffset = ((100 - percentage) / 100) * circumference;

  return (
    <MeterContainer>
      <CircularMeterContainer>
        <LabelContainer>
          <Label>Monthly Income Target : Rs. {targetIncome}</Label>
          <Label>Income Achieved : Rs. {incomeAchieved}</Label>
        </LabelContainer>
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
            {isNaN(percentage) ? 0 : percentage.toFixed(2)}%
          </PercentageText>
        </CircularMeter>
      </CircularMeterContainer>
      <ButtonContainer>
        <Input
          type="number"
          value={newTarget}
          onChange={(e) => setNewTarget(e.target.value)}
          placeholder="Enter new target"
        />
        <Button onClick={handleUpdateTarget}>Update</Button>
      </ButtonContainer>
    </MeterContainer>
  );
};

const MeterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CircularMeterContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CircularMeter = styled.svg`
  width: 150px;
  height: 150px;
`;

const Circle = styled.circle`
  fill: none;
  stroke: #f0f0f0;
  strokewidth: 12;
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

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px; /* Add margin to separate from the circular meter */
`;

const Input = styled.input`
  margin-top: 10px;
  padding: 5px;
  width: 160px;
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

export default MonthlyTargetMeter;
