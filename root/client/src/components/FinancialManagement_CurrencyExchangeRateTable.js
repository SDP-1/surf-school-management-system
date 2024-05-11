import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

function CurrencyExchangeRate() {
  const [exchangeRates, setExchangeRates] = useState({});
  const [currencyNames, setCurrencyNames] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get(
          "https://api.exchangerate-api.com/v4/latest/USD"
        );
        setExchangeRates(response.data.rates);
        fetchCurrencyNames();
        setFilteredData(Object.keys(response.data.rates));
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchExchangeRates();

    const interval = setInterval(fetchExchangeRates, 60000);

    return () => clearInterval(interval);
  }, []);

  const fetchCurrencyNames = async () => {
    try {
      const response = await axios.get(
        "https://openexchangerates.org/api/currencies.json"
      );
      setCurrencyNames(response.data);
    } catch (error) {
      console.error("Error fetching currency names:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value === "") {
      setFilteredData(Object.keys(exchangeRates)); // Reset filteredData to full data set
    } else {
      const filtered = Object.keys(exchangeRates).filter((currency) => {
        const currencyName = currencyNames[currency] || "";
        const currencyCode = currency;
        const searchLowerCase = e.target.value.toLowerCase();
        return (
          currencyName.toLowerCase().includes(searchLowerCase) ||
          currencyCode.toLowerCase().includes(searchLowerCase)
        );
      });
      setFilteredData(filtered);
    }
  };

  const calculateExchangeRateAgainstLKR = (currency) => {
    const lkrRate = exchangeRates["LKR"];
    const currencyRate = exchangeRates[currency];
    if (lkrRate && currencyRate) {
      const exchangeRate = (1 / currencyRate) * lkrRate;
      return exchangeRate.toFixed(4);
    }
    return null;
  };

  const searchStyles = {
    width: "100px",
    fontSize: "15px",
  };

  const buttonStyles = {
    backgroundColor: "#1c4c74",
    borderColor: "#1c4c74",
    color: "white",
  };

  return (
    <div>
      <h2>Currency Exchange Rates</h2>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search currencies by name or code..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={searchStyles}
        />
        <Button
          variant="outline-secondary"
          onClick={() => handleSearchChange({ target: { value: "" } })}
          style={buttonStyles}
        >
          Clear
        </Button>
      </InputGroup>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Currency Name</th>
            <th>Currency Code</th>
            <th>Exchange Rate (against LKR)</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((currency) => (
            <tr key={currency}>
              <td>{currencyNames[currency]}</td>
              <td>{currency}</td>
              <td>{calculateExchangeRateAgainstLKR(currency)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default CurrencyExchangeRate;
