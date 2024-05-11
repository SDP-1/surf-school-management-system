import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ReadEvents() {
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

    return (
        <div>
            <div className="link-container">
                <Link to="/Event/">All Events</Link>
                <Link to="/Event/freeevents">Free Events</Link>
                <Link to="/Event/currentevents">Current Events</Link>
            </div>

            {/* Event Items */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', paddingTop: '20px', paddingRight: '20px', marginRight: '5px' }}>
                {events.map((event, index) => (
                    <div key={event.id} style={{ flex: '0 0 calc(25% - 20px)', marginBottom: '20px', maxWidth: 'calc(25% - 20px)', minWidth: 'calc(25% - 20px)', marginRight: '15px' }}>
                        <div className="event-item" style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '10px', backgroundColor: '#f8f8f8', boxSizing: 'border-box', paddingRight: '40px', width: '100%' }}>
                            <div className="event-details" style={{ fontSize: '14px', padding: '5px 0' }}>
                                {event.Image && <img src={event.Image} alt="Event Image" style={{ maxWidth: '100%', height: '150px', paddingBottom: '10px', display: 'block', margin: '0 auto' }} />}
                                <p style={{ margin: 0, textAlign: 'center',fontSize: '11px' }}>Title: {event.Title}</p>
                                <p style={{ margin: 0, textAlign: 'center',fontSize: '11px' }}>Location: {event.Location}</p>
                                <p style={{ margin: 0, textAlign: 'center' ,fontSize: '11px'}}>Capacity: {event.Capacity}</p>
                                <Link to={`/Event/getsingleEvent/${encodeURIComponent(event.Title)}`} style={{ display: 'block', textAlign: 'center', textDecoration: 'none',fontSize: '11px' }}>View</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ReadEvents;
