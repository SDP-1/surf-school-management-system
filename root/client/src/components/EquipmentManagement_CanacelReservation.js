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
        
        window.location.href = "/allReservation"; 
      } catch (err) {
        console.error(err);
      }
    }

    handleCancelReservation();
  }, [reservationId]);


  return null;
}