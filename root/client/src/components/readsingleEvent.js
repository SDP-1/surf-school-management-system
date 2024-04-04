import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function ReadSingleEvents() {
    const [event, setEvent] = useState(null); // Change 'events' to 'event'
    const { Title } = useParams(); // Use useParams to get route parameters

    useEffect(() => {
        async function getEvent() {
            try {
                const response = await axios.get(`http://localhost:8070/event/get/${Title}`);
                setEvent(response.data.event); // Change 'events' to 'event'
                console.log("fetched")
            } catch (error) {
                console.error("Error fetching event:", error);
                // You might want to provide better user feedback here, such as displaying an error message
            }
        }
        getEvent();
    }, [Title]);

    if (!event) {
        return <div>Loading...</div>;
    }

    return (
        <div className="event-container">
            <h1>{event.Title}</h1>
            {event.Image && <img src={event.Image} alt="Event Image" style={{ maxWidth: '900px', height: '400px', paddingBottom: '10px' }} />}
            <div className="event-details">
                <p>Location: {event.Location}</p>
                <p>Capacity: {event.Capacity}</p>
                <p>Description: {event.Description}</p>
                <Link
                to={`/deleteEvent/${encodeURIComponent(event.Title)}`}
                style={{
                  color:'red',
                  textDecoration: 'none'
                 }}
                >
                Delete
                </Link>
                

                <Link
                to={`/updateEvent/${encodeURIComponent(event.Title)}`}
                style={{
                  color:'green',
                  textDecoration: 'none',
                  marginLeft: '20px'
                 }}
                >
                Update
                </Link>
                <Link to={`/Purchaseform/${encodeURIComponent(event.Title)}`} style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>purchase</Link>


            </div>
       </div>
    );
}

export default ReadSingleEvents;
