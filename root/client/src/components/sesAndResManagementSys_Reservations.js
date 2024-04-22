import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Nav from "./sesAndResManagementSys_Nav";
import Reservation from "./sesAndResManagementSys_Reservation";
import { useReactToPrint } from "react-to-print";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import jsPDF from "jspdf"; // Import jsPDF library

const sessionURL = "http://localhost:4000/sessions";
const reservationURL = "http://localhost:4000/reservations";

const fetchSessions = async () => {
  return await axios.get(sessionURL).then((res) => res.data);
};

const fetchReservations = async () => {
  return await axios.get(reservationURL).then((res) => res.data);
};

const Reservations = () => {
  const [sessions, setSessions] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const ComponentsRef = useRef();
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchSessions().then((data) => setSessions(data.sessions || []));
    fetchReservations().then((data) =>
      setReservations(data.reservations || [])
    );
  }, []);

  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    DocumentTitle: "Reservations Report",
    onafterprint: () => alert("Reservations Report Successfully Download!"),
  });

  const handleSearch = () => {
    fetchReservations().then((data) => {
      const filteredReservations = data.reservations.filter((reservation) =>
        Object.values(reservation).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setReservations(filteredReservations);
      setNoResults(filteredReservations.length === 0);
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

  const handleDownloadReport = () => {
    // Generate PDF report
    const doc = new jsPDF();
    doc.text("Sessions Report", 10, 10);
    sessions.forEach((session, index) => {
      const sessionInfo = `Session ${index + 1}:\nName: ${session.name}\nType: ${session.type}\nInstructor: ${session.instructor}\nDate: ${session.date}\nTime: ${session.time}\n\n`;
      doc.text(sessionInfo, 10, 20 + index * 50);
    });
  
    doc.addPage();
  
    doc.text("Reservations Report", 10, 10);
    reservations.forEach((reservation, index) => {
      const reservationInfo = `Reservation ${index + 1}:\nSession ID: ${reservation.sessionID}\nCustomer Name: ${reservation.customerName}\nDate: ${reservation.date}\nTime: ${reservation.time}\n\n`;
      doc.text(reservationInfo, 10, 20 + index * 50);
    });
  
    // Save the PDF report
    doc.save("reservation_report.pdf");
  };
  
  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Refetch sessions and reservations based on the selected date
    const formattedDate = date.toISOString().split("T")[0];
    fetchSessions().then((data) => {
      const filteredSessions = data.sessions.filter(
        (session) => session.date === formattedDate
      );
      setSessions(filteredSessions);
    });
    fetchReservations().then((data) => {
      const filteredReservations = data.reservations.filter(
        (reservation) => reservation.date === formattedDate
      );
      setReservations(filteredReservations);
    });
  };

  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
  };

  return (
    <div className="container">
      <Nav />
      <h1 className="mt-4 mb-3">Reservations Calendar</h1>
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
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            name="search"
            placeholder="Search Reservation Details"
            className="form-control mr-2"
          />
          <button onClick={handleSearch} className="btn btn-primary mr-2">
            Search
          </button>
        </div>
      </div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={sessions.concat(
          reservations.map((r) => ({ ...r, title: "Reservation" }))
        )}
        eventTimeFormat={{
          hour: "numeric",
          minute: "2-digit",
          meridiem: "short",
        }}
        dateClick={handleDateClick}
        className="mb-4"
      />
      {noResults ? (
        <div>
          <p>No Reservations Found</p>
        </div>
      ) : (
        <div ref={ComponentsRef}>
          <h2>Sessions</h2>
          <ul className="list-group mb-4">
            {sessions.length === 0 ? (
              <p>No Sessions Found</p>
            ) : (
              sessions.map((session) => (
                <li key={session._id} className="list-group-item">
                  <p>Session ID: {session._id}</p>
                  <p>Name: {session.name}</p>
                  <p>Type: {session.type}</p>
                  <p>Instructor: {session.instructor}</p>
                  <p>Date: {session.date}</p>
                  <p>Time: {session.time}</p>
                  <Link
                    to={`/sesAndResManagement/addreservation?sessionID=${session._id}&date=${session.date}&time=${session.time}`}
                    className="btn btn-primary"
                  >
                    Make Reservation
                  </Link>
                </li>
              ))
            )}
          </ul>
          <h2>Reservations</h2>
          {reservations.length === 0 ? (
            <p>No Reservations Found</p>
          ) : (
            reservations.map((reservation, i) => (
              <div key={i}>
                <Reservation reservation={reservation} />
              </div>
            ))
          )}
        </div>
      )}
      <br />
      <button onClick={handlePrint} className="btn btn-primary">
        Print Reservation Report
      </button>{" "}

      <button onClick={handleDownloadReport} className="btn btn-primary">
        Download Sessions Report
      </button>{" "}
      <br />
      <br />
      <button onClick={handleSendReport} className="btn btn-success">
        Send WhatsApp Message
      </button>
      <br />
      <br />      <br />
      <br />
    </div>
  );
};

export default Reservations;
