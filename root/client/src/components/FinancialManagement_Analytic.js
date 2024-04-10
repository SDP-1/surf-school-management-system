import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { BsCreditCard } from "react-icons/bs";
import { AiOutlineMore } from "react-icons/ai";
import { BiTransfer } from "react-icons/bi";
import { BsBank } from "react-icons/bs";
import { GiTakeMyMoney } from "react-icons/gi";

function Analytic() {
  const [Income, setIncome] = useState("Loading...");
  const [Outgoing, setOutgoing] = useState("Loading...");
  const [PendingIncome, setPendingIncome] = useState("Loading...");
  const [UnconfirmIncome, setUnconfirmIncome] = useState("Loading...");
  const [UnconfirmOutgoing, setUnconfirmOutgoing] = useState("Loading...");

  const [transactions, setTransactions] = useState([]);
  const [UnconfirmIncomes, setUnconfirmIncomes] = useState([]);
  const [UnconfirmOutgoings, setUnconfirmOutgoings] = useState([]);

  useEffect(() => {
    getTransactions();
    getUnconfirmIncomes();
    getUnconfirmOutgoing();
  }, []);

  useEffect(() => {
    // Calculate income and outgoing only when transactions change
    calculateIncomeOutgoingPendingIncome();
    calculateUnconfirmIncome();
    calculateUnconfirmOutgoing();
  }, [transactions, UnconfirmIncomes, UnconfirmOutgoings]);

  function calculateIncomeOutgoingPendingIncome() {
    let incomeSum = 0;
    let OutgoingSum = 0;
    let PendingIncomeSum = 0;

    transactions.forEach((transaction) => {
      if (transaction.incomeOrOutgoing === "income") {
        incomeSum += transaction.amountPaid;
      } else if (transaction.status === true) {
        PendingIncomeSum += transaction.amountDue;
      } else if (transaction.incomeOrOutgoing === "outgoing") {
        OutgoingSum += transaction.amountPaid;
      }
    });

    setIncome(incomeSum);
    setOutgoing(OutgoingSum);
    setPendingIncome(PendingIncomeSum);
  }

  function calculateUnconfirmIncome() {
    let unconfirmIncomeSum = 0;

    UnconfirmIncomes.forEach((x) => {
      if (x.status === "pending") {
        unconfirmIncomeSum += x.amountPaid;
      }
    });

    setUnconfirmIncome(unconfirmIncomeSum);
  }

  function calculateUnconfirmOutgoing() {
    let unconfirmOutgoingSum = 0;

    UnconfirmOutgoings.forEach((x) => {
      if (x.status == "pending") {
        unconfirmOutgoingSum += x.amount;
      }
    });

    setUnconfirmOutgoing(unconfirmOutgoingSum);
  }

  function getTransactions() {
    axios
      .get("http://localhost:4000/transaction/")
      .then((res) => {
        setTransactions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getUnconfirmIncomes() {
    axios
      .get(`http://localhost:4000/payment/status/pending`)
      .then((res) => {
        setUnconfirmIncomes(res.data); // Filter payments based on selected status
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getUnconfirmOutgoing() {
    axios
        .get(`http://localhost:4000/outgoing/status/pending`)
        .then((res) => {
          setUnconfirmOutgoings(res.data); // Filter outgoings based on selected status
        })
        .catch((err) => {
          console.log(err);
        });
  }

  return (
    <Section>
      <div className="analytic ">
        <div className="design">
          <div className="logo">
            <BsCreditCard />
          </div>
          <div className="action">
            <AiOutlineMore />
          </div>
        </div>
        <div className="transfer">
          <h6>Income</h6>
          <h6>&nbsp;</h6>
        </div>
        <div className="money">
          <h5>Rs. {Income}</h5>
        </div>
      </div>
      <div className="analytic ">
        <div className="design">
          <div className="logo">
            <BiTransfer />
          </div>
          <div className="action">
            <AiOutlineMore />
          </div>
        </div>
        <div className="transfer">
          <h6>Outgoing </h6>
          <h6>&nbsp;</h6>
        </div>
        <div className="money">
          <h5>Rs. {Outgoing}</h5>
        </div>
      </div>
      <div className="analytic ">
        <div className="design">
          <div className="logo">
            <BsBank />
          </div>
          <div className="action">
            <AiOutlineMore />
          </div>
        </div>
        <div className="transfer">
          <h6>Pending </h6>
          <h6>Income</h6>
        </div>
        <div className="money">
          <h5>Rs. {PendingIncome}</h5>
        </div>
      </div>
      <div className="analytic ">
        <div className="design">
          <div className="logo">
            <GiTakeMyMoney />
          </div>
          <div className="action">
            <AiOutlineMore />
          </div>
        </div>
        <div className="transfer">
          <h6>Unconfirm</h6>
          <h6>Income</h6>
        </div>
        <div className="money">
          <h5>Rs. {UnconfirmIncome}</h5>
        </div>
      </div>
      <div className="analytic ">
        <div className="design">
          <div className="logo">
            <GiTakeMyMoney />
          </div>
          <div className="action">
            <AiOutlineMore />
          </div>
        </div>
        <div className="transfer">
          <h6>Unconfirm</h6>
          <h6>Outgoing</h6>
        </div>
        <div className="money">
          <h5>Rs. {UnconfirmOutgoing}</h5>
        </div>
      </div>
    </Section>
  );
}

export default Analytic;
const Section = styled.section`
  display: flex;
  width: 115%;
  justify-content: center;
  grid-template-columns: repeat(5, 1fr);
  justify-content: space-between;
  margin: 0 60px;

  .analytic {
    justify-content: space-between;
    padding: 1rem 2rem 1rem 2rem;
    border-radius: 1rem;
    color: black;
    // background-color: white;
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
