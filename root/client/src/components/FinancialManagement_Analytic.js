import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { BsCreditCard } from "react-icons/bs";
import { AiOutlineMore } from "react-icons/ai";
import { BiTransfer } from "react-icons/bi";
import { BsBank } from "react-icons/bs";
import { GiTakeMyMoney } from "react-icons/gi";
import MonthlyTargetMeter from "../components/FinancialManagement_MonthlyTargetMeter";

function Analytic({ year, month }) {
  const [income, setIncome] = useState(0);
  const [outgoing, setOutgoing] = useState(0);
  const [pendingIncome, setPendingIncome] = useState(0);
  const [unconfirmedIncome, setUnconfirmedIncome] = useState(0);
  const [unconfirmedOutgoing, setUnconfirmedOutgoing] = useState(0);
  const [monthlyTargetIncome, setMonthlyTargetIncome] = useState(5000);

  useEffect(() => {
    fetchData();
  }, [year, month]);

  const fetchData = async () => {
    try {
      const transactionsResponse = await axios.get(
        "http://localhost:4000/transaction/"
      );
      const unconfirmedIncomesResponse = await axios.get(
        "http://localhost:4000/payment/status/pending"
      );
      const unconfirmedOutgoingsResponse = await axios.get(
        "http://localhost:4000/outgoing/status/pending"
      );

      const transactions = transactionsResponse.data;
      const unconfirmedIncomes = unconfirmedIncomesResponse.data;
      const unconfirmedOutgoings = unconfirmedOutgoingsResponse.data;

      calculateData(transactions, unconfirmedIncomes, unconfirmedOutgoings);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const calculateData = (
    transactions,
    unconfirmedIncomes,
    unconfirmedOutgoings
  ) => {
    let incomeSum = 0;
    let outgoingSum = 0;
    let pendingIncomeSum = 0;
    let unconfirmedIncomeSum = 0;
    let unconfirmedOutgoingSum = 0;

    transactions.forEach((transaction) => {
      const transactionDate = new Date(transaction.date);
      if (
        transactionDate.getFullYear() === year &&
        transactionDate.getMonth() === month - 1
      ) {
        if (transaction.incomeOrOutgoing === "income") {
          incomeSum += transaction.amountPaid;
        } else if (transaction.status === true) {
          pendingIncomeSum += transaction.amountDue;
        } else if (transaction.incomeOrOutgoing === "outgoing") {
          outgoingSum += transaction.amountPaid;
        }
      }
    });

    unconfirmedIncomes.forEach((income) => {
      const incomeDate = new Date(income.date);
      if (
        incomeDate.getFullYear() === year &&
        incomeDate.getMonth() === month - 1 &&
        income.status === "pending"
      ) {
        unconfirmedIncomeSum += income.amountPaid;
      }
    });

    unconfirmedOutgoings.forEach((outgoing) => {
      const outgoingDate = new Date(outgoing.date);
      if (
        outgoingDate.getFullYear() === year &&
        outgoingDate.getMonth() === month - 1 &&
        outgoing.status === "pending"
      ) {
        unconfirmedOutgoingSum += outgoing.amount;
      }
    });

    setIncome(incomeSum);
    setOutgoing(outgoingSum);
    setPendingIncome(pendingIncomeSum);
    setUnconfirmedIncome(unconfirmedIncomeSum);
    setUnconfirmedOutgoing(unconfirmedOutgoingSum);
  };

  return (
    <Container>
      <Section>
        <AnalyticCard
          icon={<BsCreditCard />}
          value={`Rs. ${income}`}
          label="Income"
        />
        <AnalyticCard
          icon={<BiTransfer />}
          value={`Rs. ${outgoing}`}
          label="Outgoing"
        />
        <AnalyticCard
          icon={<BsBank />}
          value={`Rs. ${pendingIncome}`}
          label="Pending Income"
        />
        <AnalyticCard
          icon={<GiTakeMyMoney />}
          value={`Rs. ${unconfirmedIncome}`}
          label="Unconfirmed Income"
        />
        <AnalyticCard
          icon={<GiTakeMyMoney />}
          value={`Rs. ${unconfirmedOutgoing}`}
          label="Unconfirmed Outgoing"
        />
      </Section>
      {/* Wrap MonthlyTargetMeter in a styled container with top margin */}
      <MonthlyTargetContainer>
        <MonthlyTargetMeter incomeAchieved={income} />
      </MonthlyTargetContainer>
    </Container>
  );
}

const Container = styled.div`
  /* Add styling for the main container if needed */
`;

const Section = styled.section`
  display: flex;
  justify-content: center;
  grid-template-columns: repeat(5, 1fr);
  justify-content: space-between;
  margin: 0 60px;

  .analytic {
    justify-content: space-between;
    padding: 1rem 2rem 1rem 2rem;
    border-radius: 1rem;
    color: black;
    background-color: #2f69cc;
    justify-content: space-evenly;
    align-items: center;
    transition: 0.5s ease-in-out;
    width: 200px;

    h6 {
      color: white;
    }

    .design {
      display: flex;
      align-items: center;

      .logo {
        background-color: #2f69cc;
        display: flex;
        justify-content: center;
        align-items: center;

        svg {
          font-size: 2rem;
        }
      }
      .action {
        margin-left: 80px;
        svg {
          font-size: 1.5rem;
        }
      }
    }
    .transfer {
      margin-top: 20px;
      color: grey;
    }
    .money {
      margin-top: 20px;
    }
  }
`;

const MonthlyTargetContainer = styled.div`
  margin-top: 40px; /* Adjust the top margin as needed */
`;

function AnalyticCard({ icon, value, label }) {
  return (
    <div className="analytic">
      <div className="design">
        <div className="logo">{icon}</div>
        <div className="action">
          <AiOutlineMore />
        </div>
      </div>
      <div className="transfer">
        <h6>{label}</h6>
      </div>
      <div className="money">
        <h5>{value}</h5>
      </div>
    </div>
  );
}

export default Analytic;
