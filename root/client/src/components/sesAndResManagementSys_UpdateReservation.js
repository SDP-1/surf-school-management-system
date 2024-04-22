import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";

function UpdateReservation() {
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:4000/reservations/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.reservation));
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios
      .put(`http://localhost:4000/reservations/${id}`, inputs)
      .then((res) => res.data);
  };

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
    sendRequest().then(() => history("/sesAndResManagement/reservationdetails"));
  };

  const handleDateChange = (date) => {
    if (date) {
      const formattedDate = date.toISOString().split("T")[0]; // Format date to YYYY-MM-DD
      setInputs((prevState) => ({
        ...prevState,
        date: formattedDate,
      }));
    } else {
      setInputs((prevState) => ({
        ...prevState,
        date: "",
      }));
    }
  };

  const handleTimeChange = (time) => {
    setInputs((prevState) => ({
      ...prevState,
      time,
    }));
  };

  return (
    <div>
      <h1>Update Reservation</h1>
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
            value={inputs.stdname || ""}
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
            value={inputs.sessionID || ""}
            disabled
          />
        </div>

        <div className="mb-3">
          <label htmlFor="refID" className="form-label">
            Reference ID
          </label>
          <input
            type="text"
            className="form-control"
            name="sessionID"
            onChange={handleChange}
            value={inputs.refID || ""}
            disabled
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Date</label>
          <br />
          <DatePicker
            selected={inputs.date ? new Date(inputs.date) : null}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            className="form-control"
            disabled
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Time</label>
          <br />
          <TimePicker
            onChange={handleTimeChange}
            value={inputs.time || ""}
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
            value={inputs.numOfParticipents || ""}
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
            value={inputs.contactNum || ""}
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
            value={inputs.email || ""}
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
            value={inputs.amount || ""}
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

export default UpdateReservation;
