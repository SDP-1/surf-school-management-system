import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import TimePicker from "react-time-picker";
import DatePicker from "react-datepicker"; // Import DatePicker from react-datepicker

import "react-datepicker/dist/react-datepicker.css"; // Import DatePicker CSS

function UpdateSession() {
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:8070/sessions/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.session));
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios
      .put(`http://localhost:8070/sessions/${id}`, {
        name: String(inputs.name),
        type: String(inputs.type),
        instructor: String(inputs.instructor),
        date: String(inputs.date),
        time: String(inputs.time),
      })
      .then((res) => res.data);
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleTimeChange = (time) => {
    setInputs((prevState) => ({
      ...prevState,
      time: time,
    }));
  };
  
  const handleDateChange = (date) => {
    if (date) {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      setInputs((prevState) => ({
        ...prevState,
        date: formattedDate,
      }));
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => history("/sessiondetails"));
  };

  return (
    <div>
      <h1>update session</h1>
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

export default UpdateSession;
