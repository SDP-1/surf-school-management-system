import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function InsertTicket() {
    const { Title, ticketCount } = useParams(); // Extract 'ticketCount' from URL parameters
    const navigate = useNavigate();

    // Convert 'ticketCount' to a number
    const Count = parseInt(ticketCount);
  
   

    console.log("ticketCount:", ticketCount); // Add this line to log the value of ticketCount

    useEffect(() => {
        const sendData = async () => {
            try {
                const updatedEvent = {
                    Title,
                    Count,
                };
                await axios.put(`http://localhost:4000/event/update/${encodeURIComponent(Title)}/${encodeURIComponent(Count)}`, updatedEvent);
                alert("Purchased");
                navigate(`/Event/`);//passing to home
            } catch (error) {
                alert(error.message);
            }
        };
        sendData();
    }, [Title, Count]);

    return null;
}

export default InsertTicket;
