import React, { useState, useEffect } from "react";
import styled from "styled-components";

const PercentageMeter = ({ incomePercentage }) => {
  const [isIncome, setIsIncome] = useState(true); // State to determine if income or outgoing

  useEffect(() => {
    setIsIncome(incomePercentage >= 50); // Set isIncome based on incomePercentage
  }, [incomePercentage]);

  const circumference = 251.2;
  const blueDashArray = `${incomePercentage * 2.512} ${circumference}`;
  const blueDashOffset = 0;

  const redStart = (251.2 * incomePercentage) / 100; // Starting point for red stroke
  const redDashArray = `${redStart} 251.2`;
  const redDashOffset = -1 * (251.2 - redStart);

  // Conditional rendering to show/hide the circle based on incomePercentage
  const renderCircle = incomePercentage !== 0;

  return (
    <MeterContainer>
      <LabelContainer>
          <Label>Monthly Income precentage : {incomePercentage.toFixed(2)}%</Label>
          <Label>Income Outgong precentage : {(100-incomePercentage).toFixed(2)}%</Label>
        </LabelContainer>
      <CircularMeterContainer>
      
        <CircularMeter viewBox="0 0 100 100">
          {renderCircle && (
            <>
              {/* Blue Circle */}
              <Percentage
                cx="50"
                cy="50"
                r="40"
                fill="none"
                strokeWidth="12"
                stroke="red" // Set stroke color to blue
                strokeDasharray={blueDashArray}
                strokeDashoffset={blueDashOffset}
              />

              <Percentage
                cx="50"
                cy="50"
                r="40"
                fill="none"
                strokeWidth="12"
                stroke="#007bff" // Set stroke color to red
                strokeDasharray={redDashArray}
                strokeDashoffset={redDashOffset}
              />

              {/* Text */}
              <PercentageText
                x="50"
                y="55"
                dominantBaseline="middle"
                textAnchor="middle"
                fill={isIncome ? "#007bff" : "red"}
              >
                {isNaN(incomePercentage) ? 0 : incomePercentage.toFixed(2)}%
              </PercentageText>
            </>
          )}
        </CircularMeter>
      </CircularMeterContainer>
    </MeterContainer>
  );
};

const LabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.div`
  margin-top: 10px;
  font-size: 14px;
`;

const MeterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CircularMeterContainer = styled.div`
  position: relative;
`;

const CircularMeter = styled.svg`
  width: 150px;
  height: 150px;
`;

const Percentage = styled.circle`
  fill: none;
  stroke-linecap: round;
  transform: rotate(180deg);
  transform-origin: center;
`;

const PercentageText = styled.text`
  font-size: 16px;
  font-weight: bold;
`;

export default PercentageMeter;
