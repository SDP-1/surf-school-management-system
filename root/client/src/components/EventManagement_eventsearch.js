import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";

function SearchView() {
    const [event, setEvent] = useState(null);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q');

    useEffect(() => {
        async function getEvent() {
            try {
                const response = await axios.get(`http://localhost:4000/event/get/${encodeURIComponent(query)}`);
                setEvent(response.data.event);
                console.log("fetched")
            } catch (error) {
                alert("No data found")
                window.location.href = "/Event/";
                // You might want to provide better user feedback here, such as displaying an error message
            }
        }
        if (query) {
            getEvent();
        }
    }, [query]);

    if (!event) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '20px', backgroundColor: '#f8f8f8' }}>
            <h2>{event.Title}</h2>
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

                <Link to={`/Event/getsingleEvent/${encodeURIComponent(event.Title)}`} style={{ display: 'block', textAlign: 'center', textDecoration: 'none',fontSize: '15px' }}>View</Link>


            </div>
       </div>
    );
}

export default SearchView;
