import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function FreeEvents() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        function getEvents() {
            axios.get("http://localhost:4000/event/")
                .then((res) => {
                    setEvents(res.data);
                })
                .catch((err) => {
                    alert(err);
                });
        }
        getEvents();
    }, []);

    const itemsPerRow = 4; // Number of items per row

    // Filter only free events
    const freeEvents = events.filter(event => event.Type.toLowerCase() === "free" || event.Type === "Free");


    return (
        <div>
          
          <div className="link-container">
                <Link to="/Event/">All Events</Link>
                <Link to="/Event/freeevents">Free Events</Link>
                <Link to="/Event/currentevents">Current Events</Link>
            </div>

            {/* Event Items */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', paddingTop: '20px', paddingRight: '20px' }}>
                {freeEvents.map((event, index) => (
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

export default FreeEvents;
