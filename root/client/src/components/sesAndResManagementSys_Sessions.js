import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Nav from "./sesAndResManagementSys_Nav";
import Session from "./sesAndResManagementSys_Session";
import { useReactToPrint } from "react-to-print";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const URL = "http://localhost:8070/sessions";

const fetchHandler = async () => {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching sessions:", error);
    return { sessions: [] };
  }
};

const Sessions = () => {
  const [sessions, setSessions] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  // eslint-disable-next-line
  const [noResults, setNoResults] = useState(false);
  const navigate = useNavigate();
  const ComponentsRef = useRef();

  useEffect(() => {
    fetchHandler().then((data) => setSessions(data.sessions));
  }, []);

  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    DocumentTitle: "Sessions Report",
    onafterprint: () => alert("Sessions Report Successfully Download!"),
  });

  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filteredSessions = data.sessions.filter(
        (session) =>
          new Date(session.date).toDateString() === selectedDate.toDateString()
      );
      setSessions(filteredSessions);
      setNoResults(filteredSessions.length === 0);
    });
  };

  const handleSendReport = () => {
    const phoneNumber = prompt("Please enter the phone number:");
    if (phoneNumber) {
      const message = "Selected Reservation Reports";
      const WhatsAppUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(WhatsAppUrl, "_blank");
    }
  };

  const handleAddSession = () => {
    navigate("/addsession");
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleReset = () => {
    setSelectedDate(new Date());
    fetchHandler().then((data) => setSessions(data.sessions));
  };

  return (
    <div className="container">
      <Nav />
      <h1 className="mt-4 mb-3">Sessions Calendar</h1>
      <div>
        <div className="row mb-3">
          <div className="col-md-4">
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              className="form-control"
            />
          </div>
          <div className="col-md-8 d-flex align-items-end">
            <button onClick={handleSearch} className="btn btn-primary mr-2">
              Search
            </button>
            <button onClick={handleReset} className="btn btn-secondary mr-2">
              Reset
            </button>
            <button onClick={handleAddSession} className="btn btn-success">
              Add Session
            </button>
          </div>
        </div>
      </div>

      {sessions.length === 0 ? (
        <div>
          <p>No available sessions</p>
        </div>
      ) : (
        <div>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={sessions.map((session) => ({
              title: session.name,
              date: session.date,
            }))}
          />
          <br></br>
          <br></br>
          <h2>Available Sessions</h2>
          <div ref={ComponentsRef}>
            {sessions.map((session, i) => (
              <div key={i}>
                <Session session={session} />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4">
        <button onClick={handlePrint} className="btn btn-primary mr-2">
          Print Session Report
        </button>
        <br />
        <br />
        <button onClick={handleSendReport} className="btn btn-success">
          Send WhatsApp Message
        </button>
        <br />
        <br />
      </div>
    </div>
  );
};

export default Sessions;
