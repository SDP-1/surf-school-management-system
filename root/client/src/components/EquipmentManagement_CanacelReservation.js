import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function CancelReservation() {
  const { reservationId } = useParams();

  const [cancelReservation, setCancelReservation] = useState(null);

  useEffect(() => {
    async function handleCancelReservation() {
      try {
        const dreservation = await axios.delete(
          `http://localhost:4000/cancelReservation/${reservationId}`
        );
        setCancelReservation(dreservation.data);
        alert("Equipment Reservation Cancelled successfully");
        // Redirect to the home page using window.location
        window.location.href = "/allReservation"; // Redirect to the home page
      } catch (err) {
        console.error(err);
      }
    }

    handleCancelReservation();
  }, [reservationId]);

  // Since we're using window.location for redirection, no return is necessary
  return null;
}