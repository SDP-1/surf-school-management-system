import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";

function Filtersearch() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true); 
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const locationQuery = searchParams.get('location');
    const timeQuery = searchParams.get('time');
    const dateQuery = searchParams.get('date');

    useEffect(() => {
        async function fetchEvents() {
            
            try {
                const response = await axios.get("http://localhost:4000/event/");
                console.log("Response:", response);
                if (response.data && Array.isArray(response.data)) { // Check if response data exists and is an array
                    const allEvents = response.data;
                    const filteredEvents = allEvents.filter(event => {
                        return (
                            event.Location === locationQuery &&
                            event.Start.slice(0, 10) === timeQuery &&
                            event.Date.slice(0, 10) === dateQuery
                        );
                    });
                    setEvents(filteredEvents);
                } else {
                 
                    console.error("Invalid API response:", response.data);
                }
                
            } catch (error) {
               
                console.error("Error fetching events:", error);
            }finally{
                setLoading(false); 
            }
            
        }
        fetchEvents();
    }, [locationQuery, timeQuery, dateQuery]);
    if (loading) {
        return <div>Loading...</div>; // Display loading message while fetching events
    }

    if (events.length === 0) {
        return <div>No events found matching the criteria.</div>;
        
    }
   
   

    return (
        <div>
        <div className="link-container">
            <Link to="/Event/">All Events</Link>
            <Link to="/Event/freeevents">Free Events</Link>
            <Link to="/Event/currentevents">Current Events</Link>
        </div>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', paddingTop: '20px', paddingRight: '20px', marginRight: '5px' }}>
            {events.map(event => (
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

export default Filtersearch;
