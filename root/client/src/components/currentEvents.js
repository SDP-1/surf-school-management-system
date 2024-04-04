import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function CurrentEvents() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        function getEvents() {
            axios.get("http://localhost:8070/event/")
                .then((res) => {
                    setEvents(res.data);
                })
                .catch((err) => {
                    alert(err);
                });
        }
        getEvents();
    }, []);

    // Format today's date to 'YYYY-MM-DD' format
    const currentDate = new Date().toISOString().slice(0, 10);

    // Filter only current events
    const currentEvents = events.filter(event => {
        // Check if event.Date is defined before accessing its properties
        if (event.Date) {
            // Extract date part from the database date
            const eventDate = event.Date.slice(0, 10);
            return eventDate === currentDate;
        }
        return false; // Return false if event.Date is undefined
    });

    return (
        <div>
          
          <div className="link-container">
                <Link to="/">All Events</Link>
                <Link to="/freeevents">Free Events</Link>
                <Link to="/currentevents">Current Events</Link>
            </div>

            {/* Event Items */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', paddingTop: '20px', paddingRight: '20px' }}>
                {currentEvents.map((event, index) => (
                    <div key={event.id} style={{ flex: `0 0 calc(25% - 20px)`, marginBottom: '20px' }}>
                        <div className="event-item" style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '10px', backgroundColor: '#f8f8f8', maxWidth: '100%', boxSizing: 'border-box', paddingRight: '40px' }}>
                            <div className="event-details" style={{ fontSize: '14px', padding: '5px 0' }}>
                                {event.Image && <img src={event.Image} alt="Event Image" style={{ maxWidth: '600px', height: '150px', paddingBottom: '10px' }} />}
                                <p style={{ margin: 0 }}>Title: {event.Title}</p>
                                <p style={{ margin: 0 }}>Location: {event.Location}</p>
                                <p style={{ margin: 0 }}>Capacity: {event.Capacity}</p>
                                <Link to={`/getsingleEvent/${encodeURIComponent(event.Title)}`} style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>View</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CurrentEvents;
