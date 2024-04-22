import React, { useState, useEffect } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from "axios";

function CalendarComponent() {
    const [date, setDate] = useState(new Date());
    const [allEvents, setAllEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);

    useEffect(() => {
        // Fetch all events from the backend
        axios.get("http://localhost:4000/event/")
            .then((res) => {
                setAllEvents(res.data);
            })
            .catch((err) => {
                console.error("Error fetching events:", err);
            });
    }, []);

    useEffect(() => {
        // Filter events based on the selected date
        setFilteredEvents(allEvents.filter(event => {
            const eventDate = new Date(event.Date);
            return eventDate.toDateString() === date.toDateString();
        }));
    }, [date, allEvents]);

    const onChange = (date) => {
        setDate(date);
    };

    return (
        <div className="calendar-container">
            <div className="calendar-wrapper">
                <Calendar
                    onChange={onChange}
                    value={date}
                    className="custom-calendar"
                    calendarType="US"
                />
            </div>
            <div className="events-container">
                <h2>Events on {date.toDateString()}</h2>
                <ul>
                    {filteredEvents.map((event, index) => (
                        <li key={index}>{event.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default CalendarComponent;
