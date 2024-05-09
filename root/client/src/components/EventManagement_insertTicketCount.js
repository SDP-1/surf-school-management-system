import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function generateRandomId() {
    const timestamp = new Date().getTime();
    const randomNum = Math.floor(Math.random() * 10000); // Adjust as needed for desired length
    return `E${timestamp}${randomNum}`;
  }

function InsertTicket() {
    const { Title, ticketCount } = useParams(); // Extract 'ticketCount' from URL parameters
    const navigate = useNavigate();

    // Convert 'ticketCount' to a number
    const Count = parseInt(ticketCount);

    const randomId = generateRandomId();

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
                navigate(`/Event/?pticket=${Title}&id=${randomId}`);//passing to finance
            } catch (error) {
                alert(error.message);
            }
        };
        sendData();
    }, [Title, Count]);

    return null;
}

export default InsertTicket;
