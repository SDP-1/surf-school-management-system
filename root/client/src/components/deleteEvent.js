import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function DeleteEvents() {
    const [deletedEvent, setDeletedEvent] = useState(null);
    const { Title } = useParams();

    useEffect(() => {
        async function deleteEvent() {
            try {
                const response = await axios.delete(`http://localhost:8070/event/delete/${Title}`);
                setDeletedEvent(response.data);
                alert("Deleted event");
                // Redirect to the home page using window.location
                window.location.href = "/"; // Redirect to the home page
            } catch (error) {
                console.error(error);
                
            }
        }

        deleteEvent();
    }, [Title]);

    // Since we're using window.location for redirection, no return is necessary
    return null;
}

export default DeleteEvents;
