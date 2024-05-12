import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { Link } from "react-router-dom";

function CalendarComponent() {
  const [date, setDate] = useState(new Date());
  const [allEvents, setAllEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    // Fetch all events from the backend
    axios
      .get("http://localhost:4000/event/")
      .then((res) => {
        setAllEvents(res.data);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
      });
  }, []);

  useEffect(() => {
    // Filter events based on the selected date
    const filtered = allEvents.filter((event) => {
      const eventDate = new Date(event.Date);
      return eventDate.toDateString() === date.toDateString();
    });
    setFilteredEvents(filtered);
  }, [date, allEvents]);

  const onChange = (date) => {
    setDate(date);
  };

  return (
    <div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <div style={{ marginRight: "20px" }}>
          <Calendar
            onChange={onChange}
            value={date}
            className="custom-calendar"
            calendarType="US"
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: "20px",
          marginLeft: "20px",
        }}
      >
        {filteredEvents.map((event, index) => (
          <div
            key={index}
            style={{
              marginRight: "20px",
              marginBottom: "20px",
              maxWidth: "300px",
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flex: "0 0 calc(25% - 20px)",
            }}
          >
            <p style={{ fontSize: "11px" }}>{event.Title}</p>
            <img
              src={event.Image}
              alt={event.Title}
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                marginBottom: "10px",
              }}
            />
            <p style={{ textAlign: "center", fontSize: "11px" }}>
              <strong>Location:</strong> {event.Location}
            </p>
            <Link
              to={`/Event/getsingleEvent/${encodeURIComponent(event.Title)}`}
              style={{
                display: "block",
                textAlign: "center",
                textDecoration: "none",
                fontSize: "11px",
              }}
            >
              View
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CalendarComponent;
