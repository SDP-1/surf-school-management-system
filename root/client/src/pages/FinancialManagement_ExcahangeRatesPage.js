import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CurrencyExchangeRate from "../components/FinancialManagement_CurrencyExchangeRateTable";

function ExchangeRate() {
  return (
    <Section>
      {/* Include CurrencyExchangeRate component */}
      <CurrencyExchangeRate />
    </Section>
  );
}

export default ExchangeRate;

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