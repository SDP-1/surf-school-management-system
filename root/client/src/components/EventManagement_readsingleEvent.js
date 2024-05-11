import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function ReadSingleEvents() {

    const [event, setEvent] = useState(null); // Change 'events' to 'event'
    const { Title } = useParams(); // Use useParams to get route parameters
    const [userData, setUserData] = useState(null);
  useEffect(() => {
    const getSessionData = () => {
       
  
      const userData = sessionStorage.getItem("userData");
      return userData ? JSON.parse(userData) : null;
    };

    const data = getSessionData();
    setUserData(data);

  }, []);


   

    useEffect(() => {
        async function getEvent() {
            try {
                const response = await axios.get(`http://localhost:4000/event/get/${Title}`);
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
        <div  style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '20px', backgroundColor: '#f8f8f8' }}>
            <h4>{event.Title}</h4>
            {event.Image && <img src={event.Image} alt="Event Image" style={{ maxWidth: '800px', height: '400px', paddingBottom: '10px' }} />}
            <div className="event-details">
                <p>Location: {event.Location}</p>
                <p>Capacity: {event.Capacity}</p>
                <p>Description: {event.Description}</p>
                <p>Ticket Price $: {event.Price}</p>

                <div>
                {userData && userData.status !== "Ref" && (   
                    <>
                <Link
                to={`/Event/deleteEvent/${encodeURIComponent(event.Title)}`}
                id="delete"
                style={{
                  color:'red',
                  textDecoration: 'none'
                 }}
                >
                Delete
                </Link>
                

                <Link
                to={`/Event/updateEvent/${encodeURIComponent(event.Title)}`}
                id="update"
                style={{
                  color:'green',
                  textDecoration: 'none',
                  marginLeft: '20px'
                 }}
                >
                Update
                </Link>
                </>
                )}
                </div>

                <Link
                to={`/Event/Purchaseform/${encodeURIComponent(event.Title)}/${encodeURIComponent(parseFloat(event.Price ||0 ))}`}
                style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}
                >
                purchase
                </Link>




            </div>
       </div>
    );
}

export default ReadSingleEvents;
