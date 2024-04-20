import React, { useState, useEffect } from "react";
import Nav from "./sesAndResManagementSys_Nav";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";

function AddReservation() {
  const history = useNavigate();
  const location = useLocation();
  const [inputs, setInputs] = useState({
    refID: "",
    stdname: "",
    sessionID: "",
    date: "",
    time: "",
    numOfParticipents: "",
    contactNum: "",
    email: "",
    amount: "",
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const sessionIDParam = searchParams.get("sessionID");
    const dateParam = searchParams.get("date");
    const timeParam = searchParams.get("time");
    if (sessionIDParam) {
      setInputs((prevInputs) => ({
        ...prevInputs,
        sessionID: sessionIDParam,
        date: dateParam || "",
        time: timeParam || "",
      }));
    }
  }, [location.search]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (name === "numOfParticipents") {
      const amount = parseInt(value) * 5000;
      setInputs((prevState) => ({
        ...prevState,
        amount: amount,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => history("/reservationdetails"));
  };

  const sendRequest = async () => {
    await axios.post("http://localhost:8070/reservations", inputs);
  };

  return (
    <div>
      <Nav />
      <h1>Add Reservation</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="stdname" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            name="stdname"
            onChange={handleChange}
            value={inputs.stdname}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="sessionID" className="form-label">
            Session ID
          </label>
          <input
            type="text"
            className="form-control"
            name="sessionID"
            onChange={handleChange}
            value={inputs.sessionID}
            disabled
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Date</label>
          <br />
          <DatePicker
            selected={inputs.date ? new Date(inputs.date) : null}
            onChange={handleChange}
            dateFormat="yyyy-MM-dd"
            className="form-control"
            disabled
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Time</label>
          <br />
          <TimePicker
            onChange={handleChange}
            value={inputs.time}
            className="form-control"
            disabled
          />
        </div>

        <div className="mb-3">
          <label htmlFor="numOfParticipents" className="form-label">
            Number of Participants
          </label>
          <input
            type="number"
            className="form-control"
            name="numOfParticipents"
            onChange={handleChange}
            value={inputs.numOfParticipents}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="contactNum" className="form-label">
            Contact Number
          </label>
          <input
            type="text"
            className="form-control"
            name="contactNum"
            onChange={handleChange}
            value={inputs.contactNum}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            onChange={handleChange}
            value={inputs.email}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="amount" className="form-label">
            Amount
          </label>
          <input
            type="number"
            className="form-control"
            name="amount"
            onChange={handleChange}
            value={inputs.amount}
            required
            readOnly
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddReservation;
