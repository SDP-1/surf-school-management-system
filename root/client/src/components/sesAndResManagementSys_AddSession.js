import React, { useState } from "react";
import Nav from "./sesAndResManagementSys_Nav";
import { useNavigate } from "react-router";
import axios from "axios";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";

import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";

function AddSession() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    type: "",
    instructor: "",
    date: new Date(),
    time: "12:00",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setInputs((prevState) => ({
      ...prevState,
      date,
    }));
  };

  const handleTimeChange = (time) => {
    setInputs((prevState) => ({
      ...prevState,
      time,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    await sendRequest();
    history("/sessiondetails");
  };

  const sendRequest = async () => {
    await axios.post("http://localhost:8070/sessions", {
      ...inputs,
      date: inputs.date.toISOString().split("T")[0], // Convert date to YYYY-MM-DD format
    });
  };

  return (
    <div>
      <Nav />
      <h1>Add Session</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            onChange={handleChange}
            value={inputs.name}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="type" className="form-label">
            Type
          </label>
          <select
            className="form-select"
            name="type"
            value={inputs.type}
            onChange={handleChange}
          >
            <option value="">Select Type</option>
            <option value="Wave Surfing">Wave Surfing</option>
            <option value="Kite Boarding">Kite Boarding</option>
            <option value="Paddle Boarding">Paddle Boarding</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="instructor" className="form-label">
            Instructor
          </label>
          <select
            className="form-select"
            name="instructor"
            value={inputs.instructor}
            onChange={handleChange}
          >
            <option value="">Select Instructor</option>
            <option value="Instructor 1">Instructor 1</option>
            <option value="Instructor 2">Instructor 2</option>
            <option value="Instructor 3">Instructor 3</option>
            <option value="Instructor 4">Instructor 4</option>
            <option value="Instructor 5">Instructor 5</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Date</label>
          <br />
          <DatePicker
            selected={inputs.date}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Time</label>
          <br />
          <TimePicker
            onChange={handleTimeChange}
            value={inputs.time}
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddSession;
